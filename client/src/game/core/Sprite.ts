import { drawFromImageToCanvas } from '../../helpers/canvasHelpers'
import globals, { GRID_BLOCK_IN_SHEET_PX } from '../../game-data/globals'
import { getEffect } from '../../helpers/effectHelpers'
import { getAnimationByName } from '../../resources/animationResources'
import { GRID_BLOCK_PX, MOVEMENT_SPEED, FRAME_LIMIT } from '../../game-data/globals'
import { checkForCollision } from '../map/map-ui/movementChecker'
import { Destination } from '../map/map-classes/Destination'
import { SpriteState } from '../../helpers/SpriteState'
import { faceTowardsTarget } from '../../helpers/utilFunctions'
import { DirectionEnum } from '../../enumerables/DirectionEnum'
import type { AnimationScriptModel } from '../../models/AnimationScriptModel'
import { SceneAnimationType } from '../../enumerables/SceneAnimationTypeEnum'
import { AnimationTypeEnum } from '../../enumerables/AnimationTypeEnum'
import { SpriteStateEnum } from '../../enumerables/SpriteStateEnum'
import { MovementType } from '../../enumerables/MovementTypeEnum'
import type { GridCellModel } from '../../models/GridCellModel'
import type { SpriteFrameModel } from '../../models/SpriteFrameModel'
import type { Tile } from './Tile'
import type { SpriteDataModel } from '../../models/SpriteDataModel'
import { SpriteSheetAlignmentEnum } from '../../enumerables/SpriteSheetAlignmentEnum'
import { VisionBox } from '../map/map-classes/VisionBox'
import { initializeHitboxForSprite, updateAssociatedHitbox } from '../modules/hitboxModule'
import type { CanvasObjectModel } from '../../models/CanvasObjectModel'
import { initializeActionForSprite, updateSpriteAssociatedAction } from '../modules/actionModule'
import { initializeDoorForSprite, updateSpriteAssociatedDoor } from '../modules/doorModule'
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

    model: SpriteDataModel;
    activeFrames: SpriteFrameModel[];

    sheetFrameLimit: number;
    frameCount: number;
    sheetPosition: number;
    direction: DirectionEnum;
    previousDirection: DirectionEnum;
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
    hasDoor: boolean;
    hasAction: boolean;
    speed: number;
    type: string;
    sfx: string;
    isCar: boolean;

    visionbox: VisionBox;
    currentTileBack: Tile;
    nextTileBack: Tile;

    plugins: {
        movement: { set: boolean, active: boolean },
        carMovement: { set: boolean, active: boolean },
        idleAnimation: { set: boolean, active: boolean },
        randomAnimation: { set: boolean, active: boolean },
        hitbox: { set: boolean, active: boolean },
        mapAction: { set: boolean, active: boolean },
        door: { set: boolean, active: boolean },
        collision: { set: boolean, active: boolean },
        animation: { set: boolean, active: boolean }
    }

    constructor( tile: Tile, canvasObjectModel: CanvasObjectModel, spriteId: string, isPlayer = false ) {   
        this.plugins = {
            movement: { set: false, active: false },
            carMovement: { set: false, active: false },
            idleAnimation: { set: false, active: false },
            randomAnimation: { set: false, active: false },
            hitbox: { set: false, active: false },
            mapAction: { set: false, active: false },
            door: { set: false, active: false },
            collision: { set: false, active: false },
            animation: { set: false, active: false }
        }
        this.model = canvasObjectModel.spriteDataModel;
        this.setDimensions();
        this.spriteId       = spriteId;
        this.State          = new SpriteState( );
        this.sheetFrameLimit= 4
        this.sheetPosition  = 0
        this.frameCount     = 0
        this.direction      = canvasObjectModel.direction != null ? canvasObjectModel.direction : 0;
        this.previousDirection = canvasObjectModel.direction != null ? canvasObjectModel.direction : 0;
        this.destination    = null;
        this.activeEffect   = { active: false };
        this.isPlayer       = isPlayer;
        this.hasDoor        = canvasObjectModel.hasDoor;
        this.hasAction      = canvasObjectModel.hasAction;
        this.speed          = this.isPlayer ? MOVEMENT_SPEED : MOVEMENT_SPEED * (Math.random() * (.75 - .5) + .5);
        this.setSpriteToGrid( tile );
        this.setPlugins( canvasObjectModel );
        if ( this.isPlayer ) {
            this.visionbox = new VisionBox( this.centerX, this.baseY );
        }
    }

    get isInCameraFocus(): boolean { return globals.GAME.cameraFocus.focusSpriteId == this.spriteId;}
    get activeAnimationFrame(): SpriteFrameModel { return this.animationScript.frames[this.animationScript.index]; }

    get centerX(): number { return this.x + ( this.width / 2 ); };
    get baseY(): number { return this.bottom - ( GRID_BLOCK_PX / 2 ); };
    get topY(): number{ return this.top + ( GRID_BLOCK_PX / 2 ); };

    get left(): number { return this.x; };
    get top(): number { return this.y; };
    get right(): number { return this.x + this.width; };
    get bottom(): number { return this.y + this.height; };

    get standing(): boolean { return this.model.groundedAtBottom || (this.type != "object" && this.type != 'car') };
    get dynamicTop(): number { return this.standing ? this.baseY - this.speed : this.topY };

    get isInCenterFacingLeft() { return this.centerX < ( this.currentTileBack.x + ( GRID_BLOCK_PX * .45 ) ); }
    get isInCenterFacingRight() { return this.centerX > ( this.currentTileBack.x + ( GRID_BLOCK_PX * .55 ) ); }
    get isInCenterFacingUp() { return this.baseY < ( this.currentTileBack.y + ( GRID_BLOCK_PX * .45 ) ); }
    get isInCenterFacingDown() { return this.baseY > ( this.currentTileBack.y + ( GRID_BLOCK_PX * .55 ) ); }

    get noCollision(): boolean {
        return this.model.onBackground || this.model.notGrounded || ( this.movementType == MovementType.flying && this.State.is( SpriteStateEnum.moving ) )
    }

    pluginIsRunning( pluginConfig: { set: boolean, active: boolean } ) {
        return pluginConfig.set && pluginConfig.active;
    }

    setPlugins( canvasObjectModel: CanvasObjectModel ): void {
        let model = this.model;
        if ( model.idleAnimation ) {
            this.plugins.idleAnimation.set = true;
        }

        if ( !this.isPlayer && this.model.isCharacter ) {
            this.plugins.randomAnimation.set = true;
        }

        if ( model.canMove && model.isCar ) {
            this.plugins.carMovement.set = true;
        }
        else if ( model.canMove ) {
            this.plugins.movement.set = true;
            this.plugins.movement.active = true;
        }

        if ( this.hasDoor ) {
            this.plugins.door.set = true;
            this.plugins.door.active = true;
            initializeDoorForSprite( this, canvasObjectModel.door );
        }
        else if ( this.hasAction ) {
            this.plugins.mapAction.set = true;
            this.plugins.mapAction.active = true;
            initializeActionForSprite( this, canvasObjectModel.action );
        }
        else {
            this.plugins.hitbox.set = true;
            this.plugins.hitbox.active = true;
            initializeHitboxForSprite( this );
        }

        if ( this.model.canMove || this.model.idleAnimation ) {
            this.plugins.animation.set = true;
        }
    }

    handlePlugins(): void {
        let plugins = this.plugins
        if ( this.isPlayer ) {
            updateAssociatedHitbox( this );
        }
        if ( this.pluginIsRunning( plugins.movement ) ) {
            if ( this.pluginIsRunning( plugins.door ) ) {
                updateSpriteAssociatedDoor
            }
            else if ( this.pluginIsRunning( plugins.mapAction ) ) {
                updateSpriteAssociatedAction( this )
            }
            else {
                updateAssociatedHitbox( this );
            }
        }
    }

    changeDirection( direction: DirectionEnum ): void {
        this.previousDirection = this.direction;
        this.direction = direction;
        if ( direction !== this.previousDirection && this.model.dimensionalAlignment !== SpriteSheetAlignmentEnum.standard ) {
            this.setDimensions();
        }
    }

    setDimensions(): void {
        let model: SpriteDataModel = this.model;
        switch ( model.dimensionalAlignment ) {
            case SpriteSheetAlignmentEnum.standard:
                this.width = model.widthBlocks * GRID_BLOCK_PX;
                this.height = model.heightBlocks * GRID_BLOCK_PX;
                this.spriteWidthInSheet = model.widthBlocks * GRID_BLOCK_IN_SHEET_PX;
                this.spriteHeightInSheet = model.heightBlocks * GRID_BLOCK_IN_SHEET_PX;
                break;
            case SpriteSheetAlignmentEnum.horiVert:
                if ( this.direction === DirectionEnum.up || this.direction === DirectionEnum.down ) {
                    this.width = model.vertWidthBlocks * GRID_BLOCK_PX;
                    this.height = model.vertHeightBlocks * GRID_BLOCK_PX;
                    this.spriteWidthInSheet = model.vertWidthBlocks * GRID_BLOCK_IN_SHEET_PX;
                    this.spriteHeightInSheet = model.vertHeightBlocks * GRID_BLOCK_IN_SHEET_PX;
                }
                else {
                    this.width = model.horiWidthBlocks * GRID_BLOCK_PX;
                    this.height = model.horiHeightBlocks * GRID_BLOCK_PX;
                    this.spriteWidthInSheet = model.horiWidthBlocks * GRID_BLOCK_IN_SHEET_PX;
                    this.spriteHeightInSheet = model.horiHeightBlocks * GRID_BLOCK_IN_SHEET_PX;
                }
                break;
        }
    }

    setActiveFrames(): void {
        switch ( this.direction ) {
            case DirectionEnum.left:
                this.activeFrames = this.model.movementFrames[this.direction];
                break;
            case DirectionEnum.up:
                this.activeFrames = this.model.movementFrames[this.direction];
                break;
            case DirectionEnum.right:
                this.activeFrames = this.model.movementFrames[this.direction];
                break;
            case DirectionEnum.down:
                this.activeFrames = this.model.movementFrames[this.direction];
                break;
            default:
                break;
        }

        this.sheetFrameLimit = this.activeFrames.length
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
        this.column = cell.column;
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
        this.updateState();
        this.handlePlugins();
        if ( this.isPlayer ) {
            this.visionbox.updateXy( this.centerX, this.baseY );
        }
        if ( this.hasActiveEffect ) {
            this.activeEffect.drawBack( this.x - ( GRID_BLOCK_PX * 0.9375 ), this.y + ( this.height * 0.25  ) )
        }
        drawFromImageToCanvas(
            "FRONT", this.model.image,
            this.sheetPosition * this.spriteWidthInSheet, this.direction * this.spriteHeightInSheet, 
            this.spriteWidthInSheet, this.spriteHeightInSheet,
            this.x, this.y, this.width, this.height
        )
        if ( this.hasActiveEffect ) {
            this.activeEffect.drawFront( this.x - ( GRID_BLOCK_PX * 0.9375 ), this.y + ( this.height * 0.25  ) )
        }
        this.checkForMoveToDestination( );
        this.checkForAnimation( );

        this.updateCell()
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
        if ( this.State.is( SpriteStateEnum.moving ) && !this.State.inAnimation && this.destination !== null ) {
            this.destination.goTo( );   
            this.countFrame( ); 
        }
    }

    setDestination( destination: GridCellModel, deleteWhenDestinationReached: false ): void {
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
            this.setDestination( animation.destination, false );
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

        const animationModel = getAnimationByName( animation.animName, this.width, this.height, this.direction );
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
        this.changeDirection( direction );
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
        return checkForCollision( this ) ;
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