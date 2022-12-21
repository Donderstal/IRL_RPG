import { GRID_BLOCK_IN_SHEET_PX } from '../../game-data/globals'
import { getEffect } from '../../helpers/effectHelpers'
import { GRID_BLOCK_PX, MOVEMENT_SPEED, FRAME_LIMIT } from '../../game-data/globals'
import { isHorizontal, spriteIsPlayer } from '../../helpers/utilFunctions'
import { DirectionEnum } from '../../enumerables/DirectionEnum'
import type { AnimationTypeEnum } from '../../enumerables/AnimationTypeEnum'
import { MovementType } from '../../enumerables/MovementTypeEnum'
import type { GridCellModel } from '../../models/GridCellModel'
import type { SpriteFrameModel } from '../../models/SpriteFrameModel'
import type { Tile } from './Tile'
import type { SpriteDataModel } from '../../models/SpriteDataModel'
import { SpriteSheetAlignmentEnum } from '../../enumerables/SpriteSheetAlignmentEnum'
import { VisionBox } from '../map/map-classes/VisionBox'
import type { CanvasObjectModel } from '../../models/CanvasObjectModel'
import { BlockedArea } from '../map/map-classes/BlockedArea'
import { drawFromImageToCanvas } from '../../helpers/canvasHelpers'
import { getTileOnCanvasByCell, getTileOnCanvasByXy } from '../canvas/canvasGetter'
import { CanvasTypeEnum } from '../../enumerables/CanvasTypeEnum'
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
    blockedArea: BlockedArea;
    activeFrames: SpriteFrameModel[];

    sheetFrameLimit: number;
    frameCount: number;
    sheetPosition: number;
    direction: DirectionEnum;
    previousDirection: DirectionEnum;
    spriteWidthInSheet: number;
    spriteHeightInSheet: number;

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

    constructor( tile: Tile, canvasObjectModel: CanvasObjectModel, spriteId: string ) {   
        this.model          = canvasObjectModel.spriteDataModel;
        this.animationType  = canvasObjectModel.animationType;
        this.movementType   = canvasObjectModel.movementType;
        this.animationName  = canvasObjectModel.animationName;

        this.spriteId       = spriteId;
        this.name           = canvasObjectModel.name
        this.sheetFrameLimit= 4
        this.sheetPosition  = 0
        this.frameCount     = 0
        this.setDirection( canvasObjectModel.direction ?? 0, tile );

        this.activeEffect   = { active: false };
        this.isPlayer       = spriteIsPlayer( spriteId );
        this.hasDoor        = canvasObjectModel.hasDoor;
        this.hasAction      = canvasObjectModel.hasAction;
        this.isCar          = this.model.isCar;
        this.speed          = this.isPlayer ? MOVEMENT_SPEED : MOVEMENT_SPEED * ( Math.random() * ( .75 - .5 ) + .5 );

        this.initialColumn = canvasObjectModel.column;
        this.initialRow = canvasObjectModel.row;
        this.setSpriteToGrid( tile );
        if ( this.model.hasBlockedArea ) {
            this.blockedArea = new BlockedArea( this, this.model.blockedArea );
        }
        if ( this.isPlayer ) {
            this.visionbox = new VisionBox( this.centerX, this.baseY );
        }
    }

    get centerX(): number { return this.x + ( this.width / 2 ); };
    get baseY(): number { return (this.isCar && !isHorizontal(this.direction) ) ? this.bottom - ( this.height / 2): this.bottom - ( GRID_BLOCK_PX / 2 ); };
    get topY(): number{ return this.top + ( GRID_BLOCK_PX / 2 ); };

    get left(): number { return this.x; };
    get top(): number { return this.y; };
    get right(): number { return this.x + this.width; };
    get bottom(): number { return this.y + this.height; };

    get standing(): boolean { return this.model.groundedAtBottom };
    get dynamicTop(): number { return this.standing ? this.baseY - this.speed : this.topY };

    get noCollision(): boolean {
        return this.model.onBackground || this.model.notGrounded || this.movementType == MovementType.flying;
    }

    setDirection( direction: DirectionEnum, tile: Tile = null ): void {
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
            if ( this.model.tileAlignment === DirectionEnum.right ) {
                this.x = ( tile.x + GRID_BLOCK_PX ) - this.width;
            }
            else if ( this.model.tileAlignment === DirectionEnum.down ) {
                this.y = ( tile.y + GRID_BLOCK_PX ) - this.height;
            }

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
        let newTile = getTileOnCanvasByCell( cell, CanvasTypeEnum.backSprites );
        this.direction = direction;
        this.setSpriteToGrid( newTile );
    }

    updateCell( ): void {
        let cell = getTileOnCanvasByXy( { "x": this.centerX, "y": this.baseY }, CanvasTypeEnum.backSprites )
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
        if ( this.isPlayer ) {
            this.visionbox.updateXy( this.centerX, this.baseY );
        }
        if ( this.hasActiveEffect ) {
            this.activeEffect.drawBack( this.x - ( GRID_BLOCK_PX * 0.9375 ), this.y + ( this.height * 0.25  ) )
        }
        drawFromImageToCanvas(
            this.model.image,
            this.activeFrame.x, this.activeFrame.y, 
            this.activeFrame.width, this.activeFrame.height,
            this.x, this.y, this.width, this.height
        )
        if ( this.hasActiveEffect ) {
            this.activeEffect.drawFront( this.x - ( GRID_BLOCK_PX * 0.9375 ), this.y + ( this.height * 0.25  ) )
        }

        this.updateCell()
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

    getTilesBlockedBySprite(): number[] {
        let tileIndexes = [];
        let originalX =  this.x + (GRID_BLOCK_PX / 2);
        let x = originalX;
        let y = this.y + ( GRID_BLOCK_PX / 2 );

        if ( this.isCar && (this.direction === DirectionEnum.left || this.direction === DirectionEnum.right) ) {
            y += GRID_BLOCK_PX;
        }
        if ( !this.isCar && this.standing ) {
            y = ( this.y + this.height ) - ( GRID_BLOCK_PX / 2 );
        }

        while ( y <= ( this.y + this.height ) ) {
            while ( x < ( this.x + this.width ) ) {
                const tile = getTileOnCanvasByXy( { "x": x, "y": y }, CanvasTypeEnum.backSprites );
                if ( tile !== undefined ) {
                    tileIndexes.push( tile.index );
                } 
                x += GRID_BLOCK_PX;
            }
            x = originalX;
            y += GRID_BLOCK_PX;
        }

        return tileIndexes;
    }

    activateMovementModule( direction: DirectionEnum ): void {
        this.direction = direction;
        this.setDirection( direction );
        this.setActiveFrames();
    }

    deactivateMovementModule() {
        this.sheetPosition = 0;
        this.setActiveFrame();
    }

    deactivateAnimationModule() {
        this.sheetPosition = 0;
        this.setActiveFrames();
    }
}