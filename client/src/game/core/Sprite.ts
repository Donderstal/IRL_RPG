import canvasHelpers from '../../helpers/canvasHelpers'
import globals from '../../game-data/globals'
import { getEffect } from '../../helpers/effectHelpers'
import { getAnimationByName } from '../../resources/animationResources'
import { STRD_SPRITE_WIDTH, STRD_SPRITE_HEIGHT, GRID_BLOCK_PX, MOVEMENT_SPEED, FRAME_LIMIT } from '../../game-data/globals'
import { checkForCollision } from '../map/map-ui/movementChecker'
import { Destination } from '../map/map-classes/Destination'
import { SpriteState } from '../../helpers/SpriteState'
import { faceTowardsTarget } from '../../helpers/utilFunctions'
import { DirectionEnum } from '../../enumerables/DirectionEnum'
import type { AnimationScriptModel } from '../../models/AnimationScriptModel'
import { SceneAnimationType } from '../../enumerables/SceneAnimationTypeEnum'
import { AnimationTypeEnum } from '../../enumerables/AnimationTypeEnum'
import { SpriteStateEnum } from '../../enumerables/SpriteStateEnum'
import type { MapObjectSpriteModel } from '../../models/MapObjectSpriteModel'
import { MovementType } from '../../enumerables/MovementTypeEnum'
import type { GridCellModel } from '../../models/GridCellModel'
import type { SpriteFrameModel } from '../../models/SpriteFrameModel'
import type { Tile } from './Tile'
/**
 * The Sprite serves as a base class for all sprites in the game.
 * The Class contains base functionalities concerning drawing a sprite, looping through a spritesheet,
 *  and movement to a destination.
 */
export class Sprite {
    x: number;
    y: number;
    row: number;
    column: number;
    width: number;
    height: number;

    sheetFrameLimit: number;
    frameCount: number;
    sheetPosition: number;
    direction: DirectionEnum;
    spriteWidthInSheet: number;
    spriteHeightInSheet: number;

    State: SpriteState;
    sheet: HTMLImageElement;

    destination: Destination;
    animationScript: AnimationScriptModel;
    activeEffect: any;
    hasActiveEffect: boolean;
    animationType: AnimationTypeEnum
    movementType: MovementType

    name: string;
    spriteId: string;
    isPlayer: boolean;
    speed: number;
    type: string;
    sfx: string;
    isCar: boolean;
    model: {};

    constructor( tile: Tile, spriteSize: any, image: HTMLImageElement, direction: DirectionEnum, isPlayer: boolean ) {   
        if ( spriteSize == "STRD" ) {
            this.width   = STRD_SPRITE_WIDTH;
            this.height  = STRD_SPRITE_HEIGHT;            
        }
        else {
            this.width  = spriteSize.width;
            this.height = spriteSize.height;
        }

        this.State          = new SpriteState( );
        this.sheetFrameLimit= 4
        this.sheetPosition  = 0
        this.frameCount     = 0
        this.direction      = direction != null ? direction : 0
        this.sheet          = image;
        this.destination    = false;
        this.animationScript= null;;
        this.activeEffect   = { active: false };
        this.isPlayer       = isPlayer;
        this.speed          = this.isPlayer ? MOVEMENT_SPEED : MOVEMENT_SPEED * (Math.random() * (.75 - .5) + .5);
        this.type           = "sprite"

        this.setSpriteToGrid( tile )
    }

    get isInCameraFocus(): boolean { return globals.GAME.cameraFocus.focusSpriteId == this.spriteId;}
    get activeAnimationFrame(): SpriteFrameModel { return this.animationScript.frames[this.animationScript.index]; }
    get centerX(): number { return this.x + ( this.width / 2 ); };
    get baseY(): number { return this.bottom - ( GRID_BLOCK_PX / 2 ); };
    get topY(): number{ return this.top + ( GRID_BLOCK_PX / 2 ); };
    get left: number { return this.x; };
    get top: number { return this.y; };
    get right: number { return this.x + this.width; };
    get bottom: number { return this.y + this.height; };
    get standing(): boolean { return ( this.model as MapObjectSpriteModel ).groundedAtBottom || (this.type != "object" && this.type != 'car') };
    get dynamicTop( ): number { return this.standing ? this.baseY - this.speed : this.topY };
    get noCollision(): boolean {
        return ( this.model as MapObjectSpriteModel ).onBackground || ( this.model as MapObjectSpriteModel ).notGrounded
            || ( this.movementType == MovementType.flying && this.State.is( SpriteStateEnum.moving ) )
    }


    setSpriteToGrid( tile: Tile ): void {
        this.row = tile.row;
        this.column = tile.column;
        
        this.x = tile.x;
        this.y = tile.y - ( this.height - GRID_BLOCK_PX )
    }

    setGraphicalEffect( name ): void {
        this.hasActiveEffect= true;
        this.activeEffect   = getEffect( name, this.x, this.y );
    }

    unsetGraphicalEffect( ): void {
        this.hasActiveEffect= false;
        this.activeEffect   = null;
    }

    setNewLocationInGrid( cell: GridCellModel, direction: DirectionEnum ): void {
        let newTile = globals.GAME.getTileOnCanvasAtCell( 'FRONT', cell.column, cell.row )
        this.direction = direction;
        this.setSpriteToGrid( newTile );
    }

    updateCell( ): void {
        let cell = globals.GAME.getTileOnCanvasAtXY( "FRONT", this.centerX, this.baseY )
        this.row = cell.row;
        this.column = cell.col;
    }

    nextPosition( direction: DirectionEnum = this.direction ):number {
        switch( direction ) {
            case DirectionEnum.left:
                return this.left - this.speed;
            case DirectionEnum.up:
                return this.dynamicTop - this.speed;
            case DirectionEnum.right:
                return this.right + this.speed;
            case DirectionEnum.down:
                return this.bottom + this.speed;
        }
    }
    
    drawSprite(): void {
        this.updateState( );
        if ( this.hasActiveEffect ) {
            this.activeEffect.drawBack( this.x - ( GRID_BLOCK_PX * 0.9375 ), this.y + ( this.height * 0.25  ) )
        }
        canvasHelpers.drawFromImageToCanvas(
            "FRONT", this.sheet,
            this.sheetPosition * this.spriteWidthInSheet, this.direction * this.spriteHeightInSheet, 
            this.spriteWidthInSheet, this.spriteHeightInSheet,
            this.x, this.y, this.width, this.height
        )
        if ( this.hasActiveEffect ) {
            this.activeEffect.drawFront( this.x - ( GRID_BLOCK_PX * 0.9375 ), this.y + ( this.height * 0.25  ) )
        }
        this.checkForMoveToDestination( );
        this.checkForAnimation( );

        this.updateCell( )
    }

    updateState(): void {
        if ( (this.State.is( SpriteStateEnum.idle ) && this.destination && this.destination.path) && !this.State.inCinematic ) {
            this.State.set( SpriteStateEnum.moving );
        }
        else if ( this.State.is( SpriteStateEnum.moving ) && (!this.destination || !this.destination.path) ) {
            this.State.set( SpriteStateEnum.idle );
        }
        else if ( this.State.is( SpriteStateEnum.moving ) && this.checkForCollision( ) ) {
            this.State.set( SpriteStateEnum.blocked );
            this.sheetPosition = 0;
        }
        else if ( this.State.is( SpriteStateEnum.blocked ) && !this.checkForCollision( ) ) {
            this.State.set( SpriteStateEnum.moving );
        }
    }

    checkForAnimation(): void {
        if ( this.State.inAnimation ) {
            this.doScriptedAnimation( );
        }
    }

    checkForMoveToDestination(): void {
        if ( this.State.is( SpriteStateEnum.moving ) && !this.State.inAnimation && this.destination != false ) {
            this.destination.goTo( );   
            this.countFrame( ); 
        }
    }

    setDestination( destination: GridCellModel, deleteWhenDestinationReached: boolean = false ): void {
        if ( !this.isCar ) {
            this.State.set( SpriteStateEnum.pathfinding );
        }
        else {
            this.State.set( SpriteStateEnum.moving );
        }

        this.updateCell( );
        this.destination = new Destination( destination.column, destination.row, this.spriteId, deleteWhenDestinationReached );
    }

    countFrame( ): void {
        this.frameCount++;  
    
        if ( this.frameCount >= FRAME_LIMIT) {
            this.frameCount = 0;
            this.sheetPosition++;
    
            if (this.sheetPosition >= this.sheetFrameLimit) {
                this.sheetPosition = 0;
            }
        }
    }

    setAnimation( animation: any ): void {
        if ( ( animation.is( SceneAnimationType.speakYesNo ) || animation.is( SceneAnimationType.speak ) || animation.is( SceneAnimationType.emote )) && animation.speakWith ) {
            const otherSprite = animation.getSpriteByName( animation.speakWith );
            this.direction = this.spriteId == otherSprite.spriteId ? this.direction : faceTowardsTarget( this, otherSprite );
        }
        if ( animation.is( SceneAnimationType.speakYesNo ) ) {
            this.speak( animation.text, ( animation.sfx ?? "medium-text-blip.ogg" ), SceneAnimationType.speakYesNo )
        }
        if ( animation.is( SceneAnimationType.speak ) ) {
            this.speak( animation.text, ( animation.sfx ?? "medium-text-blip.ogg" ), SceneAnimationType.speak )
        }
        if ( animation.is( SceneAnimationType.emote ) ) {
            globals.GAME.speechBubbleController.setNewEmote( { x: this.x, y: this.y }, animation.src );
        }
        if ( animation.is( SceneAnimationType.move ) ) {
            this.setDestination( animation.destination );
        }
        if ( animation.is( SceneAnimationType.animation ) ) {
            this.setScriptedAnimation( animation, FRAME_LIMIT )
        }
    }

    speak( text: string, sfx: string, type: SceneAnimationType ): void {
        globals.GAME.speechBubbleController.setNewBubble( 
            {'x': this.x, 'y': this.y}, 
            {'text': text, 'name': this.name, 'sfx': sfx ?? this.sfx},
            type
        );   
        if ( this.animationType != AnimationTypeEnum.animationLoop ) {
            this.setScriptedAnimation( { animName: "TALK", loop: true }, FRAME_LIMIT )            
        }
    }

    setScriptedAnimation( animation: any, frameRate: number, numberOfLoops: number = null ): void {
        if ( this.State.inAnimation )
            this.unsetScriptedAnimation();

        const animationModel = getAnimationByName( animation.animName, this.direction );
        this.animationScript = {
            loop: animation.loop,
            frames: animationModel.frames,
            index: 0,
            numberOfFrames: animationModel.frames.length,
            frameRate: frameRate,
            numberOfLoops: numberOfLoops,
            currentLoop: 0
        }
       
        this.sheetPosition  = this.activeAnimationFrame.column;
        this.direction      = this.activeAnimationFrame.row;

        this.State.animationOn( this.direction, this.sheetPosition );
    }

    doScriptedAnimation( ): void {
        this.frameCount++;  
    
        if ( this.animationScript.frames != undefined &&this.frameCount >= this.animationScript.frameRate ) {
            this.frameCount = 0;
            this.updateAnimationIndex( );
        }
    }

    updateAnimationIndex( ): void {
        if ( this.animationScript.index + 1 == this.animationScript.numberOfFrames ) {
            this.checkForLoop()
        }
        else {
            let currentAnimation = this.animationScript.frames[this.animationScript.index];

            this.sheetPosition  = currentAnimation.column;
            this.direction      = currentAnimation.row;   
            this.animationScript.index++ 
        }               
    }

    checkForLoop( ): void {
        const currentLoopIsLast = this.animationScript.numberOfLoops == this.animationScript.currentLoop

        if ( this.animationScript.loop && ( !this.animationScript.numberOfLoops || !currentLoopIsLast ) ) {
            this.animationScript.currentLoop++
            this.animationScript.index = 0;
        }
        else {
            this.unsetScriptedAnimation( );
        }
    }

    unsetScriptedAnimation( ): void {
        if ( this.hasActiveEffect ) {
            this.unsetGraphicalEffect( );
        }
        this.animationScript = null;
        this.State.animationOff( this );  
    }

    moveSprite( direction: DirectionEnum, movementSpeed: number = this.speed ): void {
        this.direction = direction;
        if ( direction == DirectionEnum.left ) {
            this.x -= movementSpeed;
        }
        if ( direction == DirectionEnum.up ) {
            this.y -= movementSpeed;
        }
        if ( direction == DirectionEnum.right ) {
            this.x += movementSpeed;
        }
        if ( direction == DirectionEnum.down ) {
            this.y += movementSpeed;
        }
        if ( this.isInCameraFocus && !globals.GAME.cameraFocus.movingToNewFocus ) {
            globals.GAME.cameraFocus.centerOnXY( this.centerX, this.baseY );
        }
    }

    checkForCollision( ): boolean {
        return checkForCollision( this, false ) ;
    }

    getBlockedTiles( ): number[] {
        let x = this.x;
        let y = this.dynamicTop;
        let tileIndexes = [];

        while( y <= this.bottom ) {
            while( x <= this.right ) {
                const tile = globals.GAME.FRONT.getTileAtXY( x, y );
                x = (x + GRID_BLOCK_PX) > this.right && x != this.right ? this.right : x + GRID_BLOCK_PX;
                if ( tileIndexes.indexOf( tile.index ) == -1 ) {
                    tileIndexes.push( tile.index )
                }
            }
            y = (y + GRID_BLOCK_PX) > this.bottom && y != this.bottom ? this.bottom : y + GRID_BLOCK_PX;
        }
        return tileIndexes;
    }
}