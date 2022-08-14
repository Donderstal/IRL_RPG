import { drawFromImageToCanvas } from '../../helpers/canvasHelpers'
import globals, { GRID_BLOCK_IN_SHEET_PX } from '../../game-data/globals'
import { getEffect } from '../../helpers/effectHelpers'
import { GRID_BLOCK_PX, MOVEMENT_SPEED, FRAME_LIMIT } from '../../game-data/globals'
import { checkForCollision } from '../map/map-ui/movementChecker'
import { SpriteState } from '../../helpers/SpriteState'
import { faceTowardsTarget } from '../../helpers/utilFunctions'
import { DirectionEnum } from '../../enumerables/DirectionEnum'
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
import { handleSpriteMovement, initializeSpriteMovement } from '../modules/spriteMovementModule'
import { handleRandomAnimationCounter, initializeRandomAnimationCounter, resetRandomAnimationCounter } from '../modules/randomAnimationModule'
import { handleSpriteAnimation, initializeSpriteAnimation } from '../modules/animationModule'
import type { AnimateSpriteScene } from '../../models/SceneAnimationModel'
import { handleIdleAnimationCounter, initializeIdleAnimationCounter, resetIdleAnimationCounter } from '../modules/idleAnimationModule'
import { setNewBubble, setNewEmote } from '../controllers/bubbleController'
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
    initialRow: number;
    initialColumn: number;
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

    activeEffect: any;
    hasActiveEffect: boolean;
    animationType: AnimationTypeEnum;
    movementType: MovementType;
    animationName: string;
    activeFrame: SpriteFrameModel;

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
    plugins: {
        movement: { set: boolean, active: boolean },
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
            idleAnimation: { set: false, active: false },
            randomAnimation: { set: false, active: false },
            hitbox: { set: false, active: false },
            mapAction: { set: false, active: false },
            door: { set: false, active: false },
            collision: { set: false, active: false },
            animation: { set: false, active: false }
        }

        this.model          = canvasObjectModel.spriteDataModel;
        this.animationType  = canvasObjectModel.animationType;
        this.movementType   = canvasObjectModel.movementType;
        this.animationName  = canvasObjectModel.animationName;

        this.spriteId       = spriteId;
        this.State          = new SpriteState( );
        this.sheetFrameLimit= 4
        this.sheetPosition  = 0
        this.frameCount     = 0
        this.setDirection( canvasObjectModel.direction ?? 0, tile );

        this.activeEffect   = { active: false };
        this.isPlayer       = isPlayer;
        this.hasDoor        = canvasObjectModel.hasDoor;
        this.hasAction  = canvasObjectModel.hasAction;
        this.isCar = this.model.isCar;
        this.speed = this.isPlayer ? MOVEMENT_SPEED : MOVEMENT_SPEED * ( Math.random() * ( .75 - .5 ) + .5 );

        this.initialColumn = canvasObjectModel.column;
        this.initialRow = canvasObjectModel.row;
        this.setSpriteToGrid( tile );
        this.setPlugins( canvasObjectModel );
        if ( this.isPlayer ) {
            this.visionbox = new VisionBox( this.centerX, this.baseY );
        }
        if ( canvasObjectModel.destination && this.animationType !== AnimationTypeEnum.movingLoop ) {
            initializeSpriteMovement( this, canvasObjectModel.destination as GridCellModel, true );
        }
    }

    get isInCameraFocus(): boolean { return globals.GAME.cameraFocus.focusSpriteId == this.spriteId;}

    get centerX(): number { return this.x + ( this.width / 2 ); };
    get baseY(): number { return this.bottom - ( GRID_BLOCK_PX / 2 ); };
    get topY(): number{ return this.top + ( GRID_BLOCK_PX / 2 ); };

    get left(): number { return this.x; };
    get top(): number { return this.y; };
    get right(): number { return this.x + this.width; };
    get bottom(): number { return this.y + this.height; };

    get standing(): boolean { return this.model.groundedAtBottom || (this.type != "object" && this.type != 'car') };
    get dynamicTop(): number { return this.standing ? this.baseY - this.speed : this.topY };

    get noCollision(): boolean {
        return this.model.onBackground || this.model.notGrounded || ( this.movementType == MovementType.flying && this.State.is( SpriteStateEnum.moving ) )
    }

    pluginIsRunning( pluginConfig: { set: boolean, active: boolean } ) {
        return pluginConfig.set && pluginConfig.active;
    }

    setPlugins( canvasObjectModel: CanvasObjectModel ): void {
        let model = this.model;
        if ( model.idleAnimation && !this.model.isCharacter ) {
            this.plugins.idleAnimation.set = true;
            this.plugins.idleAnimation.active = true;
            initializeIdleAnimationCounter( this );
        }

        if ( this.model.isCharacter && this.animationType !== AnimationTypeEnum.movingLoop
            && this.animationType !== AnimationTypeEnum.animationLoop ) {
            this.plugins.randomAnimation.set = true;
            this.plugins.randomAnimation.active = true;
            initializeRandomAnimationCounter( this );
        }

        if ( model.canMove ) {
            this.plugins.movement.set = true;
        }

        if ( this.hasDoor ) {
            this.plugins.door.set = true;
            initializeDoorForSprite( this, canvasObjectModel.door );
        }
        else if ( this.hasAction ) {
            this.plugins.mapAction.set = true;
            initializeActionForSprite( this, canvasObjectModel.action );
        }
        else {
            this.plugins.hitbox.set = true;
            initializeHitboxForSprite( this );
        }

        if ( this.model.canMove || this.model.idleAnimation ) {
            this.plugins.animation.set = true;
            if ( this.animationType === AnimationTypeEnum.animationLoop ) {
                initializeSpriteAnimation( this, this.animationName, { looped: true, loops: 0 } );
            }
        }
    }

    handlePlugins(): void {
        let plugins = this.plugins
        if ( this.isPlayer ) {
            updateAssociatedHitbox( this );
        }
        if ( this.pluginIsRunning( plugins.movement ) ) {
            if ( this.pluginIsRunning( plugins.door ) ) {
                updateSpriteAssociatedDoor( this )
            }
            else if ( this.pluginIsRunning( plugins.mapAction ) ) {
                updateSpriteAssociatedAction( this )
            }
            else {
                updateAssociatedHitbox( this );
            }

            handleSpriteMovement( this );
            this.resetCounters();
        }
        if ( this.pluginIsRunning( plugins.animation ) ) {
            handleSpriteAnimation( this );
            this.resetCounters();
        }
        if ( this.pluginIsRunning( plugins.idleAnimation ) && !this.pluginIsRunning( plugins.movement ) && !this.pluginIsRunning( plugins.animation ) ) {
            handleIdleAnimationCounter( this );
        }
        if ( this.pluginIsRunning( plugins.randomAnimation ) && !this.pluginIsRunning( plugins.movement ) && !this.pluginIsRunning( plugins.animation ) ) {
            handleRandomAnimationCounter( this );
        }
    }

    resetCounters() {
        if ( this.pluginIsRunning( this.plugins.idleAnimation ) ) {
            resetIdleAnimationCounter( this.spriteId );
        }
        if ( this.pluginIsRunning( this.plugins.randomAnimation ) ) {
            resetRandomAnimationCounter( this.spriteId );
        }
    }

    setDirection( direction: DirectionEnum, tile: Tile ): void {
        this.previousDirection = this.direction;
        this.direction = direction;
        if ( direction !== this.previousDirection ) {
            this.setDimensions();
            this.setActiveFrames();
            if ( this.isCar ) {
                let tileCopy = { x: tile.x, y: tile.y };
                if ( direction === DirectionEnum.down ) {
                    tileCopy.y -= GRID_BLOCK_PX
                }
                this.setCarToGrid( tileCopy );
            }
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
        if ( !this.model.canMove ) {
            this.activeFrames = [{ x: 0, y: 0, width: this.spriteWidthInSheet, height: this.spriteHeightInSheet }];
        }
        else {
            if ( Symbol.iterator in Object( this.model.movementFrames[this.direction] ) ) {
                this.activeFrames = [...this.model.movementFrames[this.direction]];
                this.activeFrames.forEach( ( e ) => { e.width = this.spriteWidthInSheet; e.height = this.spriteHeightInSheet; })
                this.sheetFrameLimit = this.activeFrames.length;
            }
            else {
                console.log( this.model.movementFrames )
            }
        }

        this.setActiveFrame();
    }

    setSpriteToGrid( tile: Tile ): void {
        this.row = tile.row;
        this.column = tile.column;

        if ( this.isCar ) {
            this.setCarToGrid( tile );
        }
        else {
            this.x = tile.x;
            this.y = tile.y - ( this.height - GRID_BLOCK_PX );
        }
    }

    setCarToGrid( tile: {x: number, y: number} ): void {
        switch ( this.direction ) {
            case DirectionEnum.left:
                this.x = tile.x;
                this.y = ( tile.y + GRID_BLOCK_PX ) - this.height;
                break;
            case DirectionEnum.up:
                this.x = tile.x;
                this.y = tile.y;
                break;
            case DirectionEnum.right:
                this.x = ( tile.x + GRID_BLOCK_PX ) - this.width;
                this.y = ( tile.y + GRID_BLOCK_PX ) - this.height;
                break;
            case DirectionEnum.down:
                this.x = tile.x;
                this.y = ( tile.y + GRID_BLOCK_PX ) - this.height;
                break;
        }
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
            this.activeFrame.x, this.activeFrame.y, 
            this.activeFrame.width, this.activeFrame.height,
            this.x, this.y, this.width, this.height
        )
        if ( this.hasActiveEffect ) {
            this.activeEffect.drawFront( this.x - ( GRID_BLOCK_PX * 0.9375 ), this.y + ( this.height * 0.25  ) )
        }

        this.updateCell()
    }

    updateState(): void {
        let plugins = this.plugins
        if ( ( this.State.is( SpriteStateEnum.idle ) && this.pluginIsRunning( plugins.movement ) && !this.State.inCinematic ) ) {
            this.State.set( SpriteStateEnum.moving );
        }
        else if ( this.State.is( SpriteStateEnum.moving ) && !this.pluginIsRunning( plugins.movement ) ) {
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

    movementFrameCounter() {
        this.countFrame();
        this.checkFrameLimit();
        this.checkSheetLimit();
        this.setActiveFrame();
    }

    countFrame( ): void {
        this.frameCount++;  
    }

    checkFrameLimit(): void {
        if ( this.frameCount >= FRAME_LIMIT ) {
            this.frameCount = 0;
            this.sheetPosition++;
        }
    }

    checkSheetLimit(): void {
        if ( this.sheetPosition >= this.sheetFrameLimit ) {
            this.sheetPosition = 0;
        }
    }

    setActiveFrame( frame = this.activeFrames[this.sheetPosition] ) {
        this.activeFrame = frame;
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
            setNewEmote( { x: this.x, y: this.y }, animation.src );
        }
        if ( animation.is( SceneAnimationType.move ) ) {
            initializeSpriteMovement( this, animation.destination, false );
        }
        if ( animation.is( SceneAnimationType.animation ) ) {
            const animateSpriteScene = animation as AnimateSpriteScene;
            const options = { looped: animateSpriteScene.loop, loops: 0 };
            initializeSpriteAnimation( this, animateSpriteScene.animationName, options );
        }
    }

    speak( text: string, sfx: string, type: SceneAnimationType ): void {
        setNewBubble( 
            {'x': this.x, 'y': this.y}, 
            {'text': text, 'name': this.name, 'sfx': sfx ?? this.sfx},
            type
        );   
        if ( this.animationType != AnimationTypeEnum.animationLoop ) {
            initializeSpriteAnimation( this, "TALK", { looped: true, loops: 0 } );    
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

    activateMovementModule( direction: DirectionEnum ): void {
        this.direction = direction;
        this.setActiveFrames();
        this.State.set( SpriteStateEnum.moving );
        this.plugins.movement.active = true;
    }

    deactivateMovementModule() {
        this.plugins.movement.active = false;
        this.sheetPosition = 0;
        this.setActiveFrame();
    }

    activateAnimationModule() {
        this.plugins.animation.active = true;
    }

    deactivateAnimationModule() {
        this.plugins.animation.active = false;
        this.sheetPosition = 0;
        this.setActiveFrames();
    }
}