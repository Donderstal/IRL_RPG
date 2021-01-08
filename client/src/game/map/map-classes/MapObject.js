const I_Hitbox      = require('../../interfaces/I_Hitbox').I_Hitbox
const I_Sprite      = require('../../interfaces/I_Sprite').Sprite
const globals       = require('../../../game-data/globals')
const canvasHelpers = require('../../../helpers/canvasHelpers')
const MapAction     = require('./MapAction').MapAction

const mapObjectResources = require('../../../resources/mapObjectResources')
const checkForCollision = require('../map-ui/movementChecker').checkForCollision

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
        this.spriteDimensionsInBlocks = spriteDimensionsInBlocks;
        this.hasAction  = tile.spriteData.hasAction;
        this.type = "object"

        if ( this.hasAction ) {
            this.hitbox = new MapAction( this.x + ( this.width * .5 ), this.y + ( this.height  *  .5  ), tile.spriteData.action )
            this.action = tile.spriteData.action
        }
        else {
            this.hitbox = new I_Hitbox( this.x + ( this.width * .5 ), this.y + ( this.height  * .5 ), this.width / 2 );
        }

        if ( tile.spriteData.moving ) {
            this.movingToDestination = true;
            this.destination = tile.spriteData.destination;
            this.frames = objectResource["movement_frames"];
            this.direction = globals[tile.spriteData.direction]
            this.destinationTile = globals.GAME.front.class.grid.getTileAtCell( this.destination.row, this.destination.col )
            this.activeTileIndexes = [ ];
            this.previousTileIndex;
            this.nextTileIndex
        }
    }

    get previousTileFront( ) { return globals.GAME.front.class.grid.array[this.previousTileIndex] };
    get currentTileFront( ) { return globals.GAME.front.class.grid.array[this.activeTileIndexes[0]] };
    get nextTileFront( ) { return globals.GAME.front.class.grid.array[this.nextTileIndex] };

    drawSprite( ) {
        if ( this.movingToDestination ) {
            this.blocked = false;
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
            this.hitbox.draw( this.x  + ( this.width * .5 ), this.y + ( this.height  * .5 ) );
            globals.GAME.front.class.allSprites.forEach( ( e ) => {
                if ( !e.deleted && this.hitbox.checkForWideRange( e.hitbox, this.direction )  ) {
                    console.log('omg blocked!')
                    this.blocked = checkForCollision( this, false );  
                }
            } )     

            if ( !this.blocked ) {
                this.goToDestination( );  
                this.updateTileIndexes( );              
            }
        }

        if ( this.movingToDestination ) {
            this.countFrame( );
        }
    }

    updateTileIndexes( ) {
        const tile = this.getLeftCornerTileBasedOnDirection( );
        if ( tile == undefined ) {
            return;
        }
        if ( ( this.activeTileIndexes.length < 1 && tile != undefined ) || tile.index != this.activeTileIndexes[0] ) {
            this.activeTileIndexes.unshift( tile.index )
            this.setActiveTileIndex( tile );
        }

        if ( this.activeTileIndexes.length > this.spriteDimensionsInBlocks.hori ) {
            let previousTile = globals.GAME.back.class.grid.array[this.activeTileIndexes.pop( )]
            previousTile.clearSpriteData( )
            previousTile.spriteId = null;
        }
    }

    getLeftCornerTileBasedOnDirection( ) {
        switch ( this.direction ) {
            case globals["FACING_UP"] :
                return globals.GAME.front.class.getTileAtXY( this.x, this.y );
            case globals["FACING_RIGHT"] :
                return globals.GAME.front.class.getTileAtXY( this.x + this.width, this.y + ( this.height / 2 ) );
            case globals["FACING_DOWN"] :
                return globals.GAME.front.class.getTileAtXY( this.x + this.width, this.y + this.height );
            case globals["FACING_LEFT"] :
                return globals.GAME.front.class.getTileAtXY( this.x, this.y + ( this.height / 2 ) );
            default:
                console.log('error! Direction + ' + this.direction + ' is not recognized')
        }
    }

    setActiveTileIndex( tile ) {
        this.activeTileIndex = ( tile.index >= globals.GAME.back.class.grid.array.length || tile.index < 0 ) ? this.activeTileIndex : tile.index;
        this.row = tile.row;
        this.col = tile.col;
        tile.setSpriteData( 'object', null )
        tile.spriteId = this.spriteId;
        this.setNextTileIndex( tile )
    }

    setNextTileIndex( activeTile ) {
        switch ( this.direction ) {
            case globals["FACING_UP"] :
                this.nextTileIndex = activeTile.row != 1 ? activeTile.index - globals.GAME.back.class.grid.cols : undefined;
                break;
            case globals["FACING_RIGHT"] :
                this.nextTileIndex = activeTile.col != globals.GAME.activeMap.columns ? activeTile.index + 1 : undefined;
                break;
            case globals["FACING_DOWN"] :
                this.nextTileIndex = activeTile.row != globals.GAME.activeMap.rows ? activeTile.index + globals.GAME.back.class.grid.cols : undefined;
                break;
            case globals["FACING_LEFT"] :
                this.nextTileIndex = activeTile.col != 1 ? activeTile.index - 1 : undefined;
                break;
        }

        this.nextTileDirection = this.direction;
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