const { Sprite }     = require('../../interfaces/I_Sprite')
const { drawFromImageToCanvas } = require('../../../helpers/canvasHelpers')
const { MapAction }    = require('./MapAction')
const { GRID_BLOCK_PX, GRID_BLOCK_IN_SHEET_PX } = require('../../../game-data/globals')
const { Counter } = require('../../../helpers/Counter')

const globals       = require('../../../game-data/globals')
const mapObjectResources = require('../../../resources/mapObjectResources')

/**
 * A MapObject is a sprite extension instantiated from an object in a mapResources.js mapObjects array.
 * Their sizes can vary from the standard sprite sizes.
 * They can also contain a MapAction instance.
 * Larger MapObject sprites have a HitboxGroup instead of a single hitbox for collision and location detection.
 */
class MapObject extends Sprite {
    constructor ( tile, spriteId ){
        const objectResource = mapObjectResources[tile.spriteData.type]
        const src = "/static/sprite-assets/" + objectResource.src
        const intialDirection = globals[ 'direction' in tile.spriteData ? tile.spriteData.direction : "FACING_DOWN"]
        const spriteDimensionsInBlocks = getSpriteDimensions( objectResource, tile.spriteData.direction );
        const dimensionsInMap = {
            "width": spriteDimensionsInBlocks.hori * GRID_BLOCK_PX,
            "height": spriteDimensionsInBlocks.vert * GRID_BLOCK_PX 
        }

        super( tile, dimensionsInMap, src, intialDirection )

        this.objectResource = objectResource;
        this.onBackground   = objectResource.on_background
        this.groundedAtBase = objectResource.grounded_at_bottom
        this.notGrounded    = objectResource.not_grounded
        this.widthInSheet   = spriteDimensionsInBlocks.hori * GRID_BLOCK_IN_SHEET_PX;
        this.heightInSheet  = spriteDimensionsInBlocks.vert * GRID_BLOCK_IN_SHEET_PX;
        this.spriteDimensionsInBlocks = spriteDimensionsInBlocks;
        this.hasAction  = tile.spriteData.hasAction;
        this.spriteId = spriteId;
        this.type = "object"

        if ( this.hasAction ) {
            this.hitbox = new MapAction( this.x + ( this.width * .5 ), this.y + ( this.height * .5 ), tile.spriteData.action )
            this.action = tile.spriteData.action
        }

        if ( !this.onBackground && !this.notGrounded && this.width > GRID_BLOCK_PX && !objectResource.isCar ) {
            for( var i = 1; i < ( this.width / GRID_BLOCK_PX ); i++ ) {
                const tileToBlock = globals.GAME.getTileOnCanvasAtIndex( "FRONT", tile.index + i )
                tileToBlock.setSpriteData( 'filler', {} );
                tileToBlock.spriteId = this.spriteId;                    
            }
        }
        if ( !this.onBackground && !this.notGrounded && this.height > GRID_BLOCK_PX && !this.groundedAtBase && !objectResource.isCar ) {
            for( var i = 1; i < ( this.height / GRID_BLOCK_PX ) - 1; i++ ) {
                const tileToBlock = globals.GAME.getTileOnCanvasAtIndex( "FRONT", tile.index - ( globals.GAME.FRONT.grid.cols * i ) )
                tileToBlock.setSpriteData( 'filler', {} );
                tileToBlock.spriteId = this.spriteId;             
            }
        } 

        if ( this.notGrounded || this.onBackground ) {
            tile.clearSpriteData( )
        }

        if ( objectResource.idle_animation ) {
            this.hasIdleAnimation = true;
            this.idleAnimationCounter = new Counter( 5000, true );
        }
    }
    /**
     * Call this.setActiveFrames to determine which frames to draw.
     * Then, draw the sprite to canvas and update its' borders.
     * If sprite is moving, call updateHitboxes, checkForCollision, checkForIntersection and goToDestination.
     * Finally, countFrame if still sprite is still moving.
     */
    drawSprite( ) {
        if ( this.hasAction ) {
            this.hitbox.updateXy( this.x + ( this.width * .5 ), this.y + ( this.height * .5 ) );            
        }
        if ( this.hasActiveEffect ) {
            this.activeEffect.drawBack( this.x - ( this.width / 2 ), this.y + ( this.height * 0.15 ) )
        }
        drawFromImageToCanvas(
            "FRONT",
            this.sheet,
            this.movingToDestination ? this.activeFrames[this.sheetPosition].x : this.sheetPosition * this.widthInSheet, 
            this.movingToDestination ? this.activeFrames[this.sheetPosition].y : this.direction * this.heightInSheet, 
            this.widthInSheet, this.heightInSheet,
            this.x, this.y, this.width, this.height
        )
        if ( this.hasActiveEffect ) {
            this.activeEffect.drawFront( this.x - ( this.width / 2 ), this.y + ( this.height * 0.15 ) )
        }

        if ( this.inIdleAnimation ) {
            this.countIdleAnimationFrame( )            
        }
        else if ( this.hasIdleAnimation ) {
            if ( this.idleAnimationCounter.countAndCheckLimit( ) ) {
                this.setIdleObjectAnimation( );
            }
        }

        this.updateSpriteBorders( )
    }
    /**
     * Increment idleAnimationFrame and check if it is over limit
     * If over limit, restore sheetposition and set inIdleAnimation to false
     */
    countIdleAnimationFrame( ) {
        this.idleAnimationFrame++
        if ( this.idleAnimationFrame > this.idleAnimationFrameLimit ) {
            this.inIdleAnimation = false;
            this.sheetPosition -= 1;
        }
    }
    /**
     * Set inIdleAnimation to true. Increment sheetposition.
     * Inititalise animationFrame and animationFrameLimit
     */
    setIdleObjectAnimation( ) {
        this.inIdleAnimation = true;
        this.sheetPosition += 1;
        this.idleAnimationFrame = 0;
        this.idleAnimationFrameLimit = 10;
    }
    /**
     * Set the width and height of this sprite in sheet and canvas when facing given direction.
     * @param {String} direction String representing a direction
     */
    setObjectDimensionsBasedOnDirection( direction ) {
        const spriteDimensionsInBlocks = getSpriteDimensions( this.objectResource, direction );     
        this.spriteDimensionsInBlocks = spriteDimensionsInBlocks;  
        this.width = spriteDimensionsInBlocks.hori * GRID_BLOCK_PX;
        this.height = spriteDimensionsInBlocks.vert * GRID_BLOCK_PX; 
        this.widthInSheet   = spriteDimensionsInBlocks.hori * GRID_BLOCK_IN_SHEET_PX;
        this.heightInSheet  = spriteDimensionsInBlocks.vert * GRID_BLOCK_IN_SHEET_PX;
    }
}
/**
 * Return the sprites' dimensions expressed as GRID_BLOCKs as an object.
 * @param {Object} objectResource object with information about the sprites dimensions
 * @param {String} spriteDirection direction the sprite is facing
 */
const getSpriteDimensions = ( objectResource, spriteDirection ) => {
    const spriteDimensionsInBlocks = { "hori": 0, "vert": 0 };

    if ( objectResource.dimensional_alignment == "STANDARD" ) {
        spriteDimensionsInBlocks.hori = objectResource.width_blocks;
        spriteDimensionsInBlocks.vert = objectResource.height_blocks
    } 
    else if ( objectResource.dimensional_alignment == "HORI_VERT" ) {
        if ( spriteDirection == "FACING_LEFT" || spriteDirection == "FACING_RIGHT" ) {
            spriteDimensionsInBlocks.hori = objectResource.hori_width_blocks;
            spriteDimensionsInBlocks.vert = objectResource.hori_height_blocks
        }
        else if ( spriteDirection == "FACING_UP" || spriteDirection == "FACING_DOWN" ) {
            spriteDimensionsInBlocks.hori = objectResource.vert_width_blocks;
            spriteDimensionsInBlocks.vert = objectResource.vert_height_blocks
        }
    } 

    return spriteDimensionsInBlocks;
}

module.exports = {
    MapObject
}