const I_Hitbox      = require('../../interfaces/I_Hitbox').I_Hitbox
const I_Sprite      = require('../../interfaces/I_Sprite').Sprite
const globals       = require('../../../game-data/globals')
const canvasHelpers = require('../../../helpers/canvasHelpers')
const MapAction     = require('./MapAction').MapAction

const mapObjectResources = require('../../../resources/mapObjectResources')

class MapObject extends I_Sprite {
    constructor ( tile ){
        const objectResource = mapObjectResources[tile.spriteData.type]
        const src = "/static/sprite-assets/" + objectResource.src

        const spriteDimensionsInBlocks = getSpriteDimensions( objectResource, tile.spriteData.direction );

        const dimensionsInMap = {
            "width": spriteDimensionsInBlocks.hori * globals.GRID_BLOCK_PX,
            "height": spriteDimensionsInBlocks.vert * globals.GRID_BLOCK_PX 
        }
        const dimensionsInSheet = { 
            'width': spriteDimensionsInBlocks.hori * globals.GRID_BLOCK_IN_SHEET_PX,
            'height': spriteDimensionsInBlocks.vert * globals.GRID_BLOCK_IN_SHEET_PX 
        }

        super( tile, dimensionsInMap, src )

        this.widthInSheet   = dimensionsInSheet.width;
        this.heightInSheet  = dimensionsInSheet.height;
        this.hasAction  = tile.spriteData.hasAction;

        if ( this.hasAction ) {
            this.hitbox = new MapAction( this.x + (globals.GRID_BLOCK_PX * .25), this.y + (this.height - globals.GRID_BLOCK_PX), tile.spriteData.action )
            this.action = tile.spriteData.action
        }
        else {
            this.hitbox = new I_Hitbox( this.x + (globals.GRID_BLOCK_PX * .25), this.y + (this.height - globals.GRID_BLOCK_PX), this.width / 2 );
        }

        if ( tile.spriteData.moving ) {
            this.movingToDestination = true;
            this.destination = tile.spriteData.destination;
            this.frames = objectResource["movement_frames"];
            this.direction = globals[tile.spriteData.direction]
            this.destinationTile = globals.GAME.front.class.grid.getTileAtCell( this.destination.row, this.destination.col )
        }
    }

    drawSprite( ) {
        if ( this.movingToDestination ) {
            this.setActiveFrames( );
        }

        canvasHelpers.drawFromImageToCanvas(
            "FRONT",
            this.sheet,
            this.movingToDestination ? this.activeFrames[this.sheetPosition].x : this.sheetPosition * this.widthInSheet, 
            this.movingToDestination ? this.activeFrames[this.sheetPosition].y : this.direction * this.heightInSheet, 
            this.widthInSheet, this.heightInSheet,
            this.x, this.y, this.width, this.height
        )

        this.updateSpriteBorders( )

        if ( this.hasAction ) {
            this.hitbox.checkForActionRange( );        
        }

        if ( this.movingToDestination ) {
            this.goToDestination( );
        }

        if ( this.movingToDestination ) {
            this.countFrame( );
        }
    }

    goToDestination( ) {
        const destIsLeftOfSprite = (this.destinationTile.x - this.width) < this.left;
        const destIsRightOfSprite = ( this.destinationTile.x + globals.GRID_BLOCK_PX + this.width ) > this.right;
        const destIsAboveSprite = this.destinationTile.y - this.height < this.top;
        const destIsBelowSprite = this.destinationTile.y + globals.GRID_BLOCK_PX + this.height > this.bottom;

        this.moving = false
        if ( destIsLeftOfSprite && this.direction == globals["FACING_LEFT"] ) {
            this.x -= globals.MOVEMENT_SPEED * 2;
            this.moving = true;
            this.direction = globals["FACING_LEFT"]
        }
        else if ( destIsAboveSprite && this.direction == globals["FACING_UP"] ) {
            this.y -= globals.MOVEMENT_SPEED * 2;
            this.moving = true;
            this.direction = globals["FACING_UP"]
        }
        else if ( destIsRightOfSprite  && this.direction == globals["FACING_RIGHT"]  ) {
            this.x += globals.MOVEMENT_SPEED * 2;
            this.moving = true;
            this.direction = globals["FACING_RIGHT"];
        }
        else if ( destIsBelowSprite && this.direction == globals["FACING_DOWN"]  ) {
            this.y += globals.MOVEMENT_SPEED * 2; 
            this.moving = true;
            this.direction = globals["FACING_DOWN"]
        }
        
        if ( !this.moving ) {
            super.endGoToAnimation( );
            this.movingToDestination = false;
            this.deleted = true;
        }
    }

    setActiveFrames( ) {
        switch ( this.direction ) {
            case globals["FACING_LEFT"] :
                this.activeFrames = this.frames["FACING_LEFT"];
                break;
            case globals["FACING_UP"] :
                this.activeFrames = this.frames["FACING_UP"];
                break;
            case globals["FACING_RIGHT"] :
                this.activeFrames = this.frames[ "FACING_RIGHT"];
                break;
            case globals["FACING_DOWN"] : 
                this.activeFrames = this.frames[ "FACING_DOWN"];
                break;
            default :
                break;
        }  
    }

    countFrame( ) {
        this.frameCount++;

        if ( this.frameCount >= globals.FRAME_LIMIT) {
            this.frameCount = 0;
            this.sheetPosition++;

            if ( this.sheetPosition >= this.activeFrames.length ) {
                this.sheetPosition = 0;
            }
        }
    }
}

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