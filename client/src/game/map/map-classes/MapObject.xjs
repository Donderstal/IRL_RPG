import { Sprite } from '../../core/Sprite'
import { drawFromImageToCanvas } from '../../../helpers/canvasHelpers'
import globals from '../../../game-data/globals'
import { GRID_BLOCK_PX, GRID_BLOCK_IN_SHEET_PX } from '../../../game-data/globals'
import { Counter } from '../../../helpers/Counter'
import { ActionSelector } from './ActionSelector'
import { getDataModelByKey } from '../../../resources/spriteDataResources'
import { BlockedArea } from './BlockedArea'
import { initDoorWithId } from '../../../helpers/doorController'
import { Hitbox } from '../../core/Hitbox'
import { DirectionEnum } from '../../../enumerables/DirectionEnum'
import { SpriteSheetAlignmentEnum } from '../../../enumerables/SpriteSheetAlignmentEnum'
import type { SpriteDataModel } from '../../../models/SpriteDataModel'

/**
 * A MapObject is a sprite extension instantiated from an object in a mapResources.js mapObjects array.
 * Their sizes can vary from the standard sprite sizes.
 * They can also contain a MapAction instance.
 */
export class MapObject extends Sprite {
    model: SpriteDataModel;

    actionSelector: ActionSelector;
    hitbox: Hitbox;
    hasDoor: boolean;
    blockedArea: BlockedArea;
    idleAnimationCounter: Counter;

    widthInSheet: number;
    heightInSheet: number;

    inIdleAnimation: boolean;
    idleAnimationFrame: number;
    idleAnimationFrameLimit: number;
    idleAnimationFramePosition: number;
    constructor ( tile, spriteData, spriteId ){
        const model = getDataModelByKey( spriteData.type );
        const spriteDimensionsInBlocks = getSpriteDimensions( model, spriteData.hasDoor ? null : spriteData.direction );
        const dimensionsInMap = {
            "width": spriteDimensionsInBlocks.hori * GRID_BLOCK_PX,
            "height": spriteDimensionsInBlocks.vert * GRID_BLOCK_PX 
        }
        const hasAction = ( spriteData.action !== undefined );

        super( tile, dimensionsInMap, globals.PNG_DICTIONARY["/static/sprite-assets/" +model.src], spriteData.hasDoor ? null : spriteData.direction, false )
        this.model = model;
        this.widthInSheet   = spriteDimensionsInBlocks.hori * GRID_BLOCK_IN_SHEET_PX;
        this.heightInSheet  = spriteDimensionsInBlocks.vert * GRID_BLOCK_IN_SHEET_PX;
        this.hitbox = null;
        this.hasDoor = spriteData.hasDoor;
        this.spriteId = spriteId;
        this.name = spriteData.name;
        this.type = "object"

        if ( hasAction ) {
            if ( !this.model.groundedAtBottom ) {
                this.actionSelector = new ActionSelector( this.x + ( this.width * .5 ), this.y + ( this.height * .5 ), spriteData.action, spriteId )
            }
            else {
                this.actionSelector = new ActionSelector( this.x + ( this.width * .5 ), ( this.y + this.height ) - (GRID_BLOCK_PX / 2), spriteData.action, spriteId )
            }            
            this.hitbox = this.actionSelector.activeAction;
        }  
        else if ( spriteData.hasDoor ) {
            this.hitbox = initDoorWithId( this.x + ( ( GRID_BLOCK_PX * .75 ) / 2 ), this.y, spriteData )
            for ( var i = 1; i == Math.floor( this.width  / GRID_BLOCK_PX); i++ ) {
                let tileBack = globals.GAME.BACK.getTileAtXY( this.x + ( i * GRID_BLOCK_PX ) , this.y + this.height );
                tileBack.blockedException = true;                
            }
        }
        else {
            this.initHitbox( );
        }
        
        if ( model.hasOwnProperty("blockedArea") ) {
            this.blockedArea = new BlockedArea(this, model.blockedArea)
        }

        if ( model.idleAnimation ) {
            this.idleAnimationCounter = new Counter( 5000, true );
        }
    }

    drawSprite( ): void {
        if ( this.model.movementFrames ) {
            this.setActiveFrames( );            
        }

        if ( this.hitbox !== null ) {
            this.updateHitbox( );            
        }

        if ( this.hasActiveEffect ) {
            this.activeEffect.drawBack( this.x - ( this.width / 2 ), this.y + ( this.height * 0.15 ) )
        }
        if ( this.sheet == undefined ) {
            console.log(this)
            console.log(this.model)
        }
        drawFromImageToCanvas(
            "FRONT",
            this.sheet,
            this.model.movementFrames ? this.activeFrames[this.sheetPosition].x : this.sheetPosition * this.widthInSheet, 
            this.model.movementFrames ? this.activeFrames[this.sheetPosition].y : this.direction * this.heightInSheet, 
            this.widthInSheet, this.heightInSheet,
            this.x, this.y, this.width, this.height
        )
        if ( this.hasDoor ) {
            this.hitbox.updateXy( this.centerX, this.baseY );  
            this.hitbox.checkForBlockedRange( globals.GAME.PLAYER.hitbox, globals.GAME.PLAYER.direction );
        }
        if ( this.hasActiveEffect ) {
            this.activeEffect.drawFront( this.x - ( this.width / 2 ), this.y + ( this.height * 0.15 ) )
        }

        if ( this.inIdleAnimation ) {
            this.countIdleAnimationFrame( )            
        }
        else if ( this.model.idleAnimation ) {
            if ( this.idleAnimationCounter.countAndCheckLimit( ) ) {
                this.setIdleObjectAnimation( );
            }
        }

        this.updateCell( )
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
            default :
                break;
        }                  
        
        this.sheetFrameLimit = this.activeFrames.length
    }   

    initHitbox(): void {
        if ( this.model.groundedAtBottom ) {
            this.hitbox = new Hitbox( this.x + (this.width / 2), (this.y + this.height) - ( GRID_BLOCK_PX / 2 ), GRID_BLOCK_PX / 2 )
        }
        else {
            this.hitbox = new Hitbox( this.x + (this.width / 2), this.y + (this.height / 2), (this.width > this.height ? this.width : this.height) /2 )     
        }

    }

    updateHitbox(): void {      
        if ( this.model.groundedAtBottom ) {
            this.hitbox.updateXy( this.x + (this.width / 2), (this.y + this.height) - ( GRID_BLOCK_PX / 2 ) )
        }
        else {
            this.hitbox.updateXy( this.x + (this.width / 2), this.y + (this.height / 2) )    
        }  
    }

    countIdleAnimationFrame( ): void {
        this.idleAnimationFrame++
        if ( this.idleAnimationFrame > this.idleAnimationFrameLimit ) {
            if ( this.model.idleAnimationFrames.length == this.idleAnimationFramePosition ) {
                this.inIdleAnimation = false;
                this.sheetPosition = 0;
            }
            else {
                this.sheetPosition += 1;
                this.idleAnimationFramePosition += 1;
            }

        }
    }

    setIdleObjectAnimation( ): void {
        this.inIdleAnimation = true;
        this.sheetPosition += 1;
        this.idleAnimationFrame = 0;
        this.idleAnimationFrameLimit = 20;
        this.idleAnimationFramePosition = 1;
    }

    setObjectDimensionsBasedOnDirection( direction: DirectionEnum ): void {
        const spriteDimensionsInBlocks = getSpriteDimensions( this.model, direction );     
        this.width = spriteDimensionsInBlocks.hori * GRID_BLOCK_PX;
        this.height = spriteDimensionsInBlocks.vert * GRID_BLOCK_PX; 
        this.widthInSheet   = spriteDimensionsInBlocks.hori * GRID_BLOCK_IN_SHEET_PX;
        this.heightInSheet  = spriteDimensionsInBlocks.vert * GRID_BLOCK_IN_SHEET_PX;
    }
}

export const getSpriteDimensions = ( model: MapObjectSpriteModel, spriteDirection: DirectionEnum ): { hori: number, vert: number } => {
    const spriteDimensionsInBlocks = { "hori": 0, "vert": 0 };

    if ( model.dimensionalAlignment == SpriteSheetAlignmentEnum.standard ) {
        spriteDimensionsInBlocks.hori = model.widthBlocks;
        spriteDimensionsInBlocks.vert = model.heightBlocks;
    } 
    else if ( model.dimensionalAlignment == SpriteSheetAlignmentEnum.horiVert ) {
        if ( spriteDirection == DirectionEnum.left || spriteDirection == DirectionEnum.right ) {
            spriteDimensionsInBlocks.hori = model.horiWidthBlocks;
            spriteDimensionsInBlocks.vert = model.horiHeightBlocks;
        }
        else if ( spriteDirection == DirectionEnum.up || spriteDirection == DirectionEnum.down ) {
            spriteDimensionsInBlocks.hori = model.vertWidthBlocks;
            spriteDimensionsInBlocks.vert = model.vertHeightBlocks;
        }
    } 

    return spriteDimensionsInBlocks;
}

module.exports = {
    MapObject,
    getSpriteDimensions
}