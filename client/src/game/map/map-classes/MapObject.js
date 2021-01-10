const I_Hitbox      = require('../../interfaces/I_Hitbox').I_Hitbox
const I_Sprite      = require('../../interfaces/I_Sprite').Sprite
const globals       = require('../../../game-data/globals')
const canvasHelpers = require('../../../helpers/canvasHelpers')
const MapAction     = require('./MapAction').MapAction

const mapObjectResources = require('../../../resources/mapObjectResources')
const { GRID_BLOCK_PX } = require('../../../game-data/globals')
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

        super( tile, dimensionsInMap, src, true )

        this.widthInSheet   = dimensionsInSheet.width;
        this.heightInSheet  = dimensionsInSheet.height;
        this.spriteDimensionsInBlocks = spriteDimensionsInBlocks;
        this.hasAction  = tile.spriteData.hasAction;
        this.type = "object"

        if ( this.hasAction ) {
            this.hitbox = new MapAction( this.x + ( this.width * .5 ), this.y + ( this.height  *  .5  ), tile.spriteData.action )
            this.action = tile.spriteData.action
        }
        else if ( this.width == globals.GRID_BLOCK_PX ) {
            this.hitbox = new I_Hitbox( this.x + ( this.width * .5 ), this.y + ( this.height  * .5 ), this.width / 2 );
        }
        else {
            this.initHitboxes( ) 
        }

        if ( tile.spriteData.moving ) {
            this.movingToDestination = true;
            this.destination = tile.spriteData.destination;
            this.frames = objectResource["movement_frames"];
            this.direction = globals[tile.spriteData.direction]
            this.destinationTile = globals.GAME.front.class.grid.getTileAtCell( this.destination.row, this.destination.col )
            this.activeTileIndexes = [ ];
            this.previousTileIndex;
            this.nextTileIndex;
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
            const radius = globals.GRID_BLOCK_PX / 2;
            let xyValues = this.getHitboxXYValues( );
    
            this.hitboxes.forEach( ( hitbox, index ) => {
                hitbox.draw( xyValues[index].x, xyValues[index].y, radius )
            } )

            this.updateTileIndexes( xyValues )

            this.blocked = checkForCollision( this, false );

            if ( !this.blocked ) {
                this.goToDestination( );     
            }
        }

        if ( this.movingToDestination ) {
            this.countFrame( );
        }
    }
    
    initHitboxes( ) {
        this.hitboxes = [];
        const radius = globals.GRID_BLOCK_PX / 2;
        let xyValues = this.getHitboxXYValues( );

        xyValues.forEach( ( xy ) => {
            this.hitboxes.push( new I_Hitbox( xy.x, xy.y, radius ) );
        })
    }

    getHitboxXYValues( ) {
        const spriteIsAlignedVertically = this.direction == globals["FACING_UP"] || this.direction == globals["FACING_DOWN"]

        let startingX = this.x + ( globals.GRID_BLOCK_PX * .5 );
        let startingY = this.y + ( globals.GRID_BLOCK_PX * .5 );
        let xyCounter = { 'x': startingX, 'y': startingY };

        if ( !spriteIsAlignedVertically ) {
            xyCounter.y += globals.GRID_BLOCK_PX;
        }

        let xyValues = spriteIsAlignedVertically ? this.getVerticalXYValues( xyCounter, startingY ) : this.getHorizontalXYValues( xyCounter, startingX );
        
        if ( this.direction == globals["FACING_DOWN"] || this.direction == globals["FACING_RIGHT"] ) {
            xyValues = xyValues.reverse( );
        }

        return xyValues;
    }

    getHorizontalXYValues( xyCounter, startingX ) {
        let xyValues = [];

        for ( var j = 0; j < this.spriteDimensionsInBlocks.hori; j++) {
            xyValues.push( { 'x' : xyCounter.x, 'y': xyCounter.y } );
            xyCounter.x += globals.GRID_BLOCK_PX;
        }
        
        return xyValues;
    }

    getVerticalXYValues( xyCounter, startingY ) {
        let xyValues = []

        for ( var j = 0; j < this.spriteDimensionsInBlocks.vert; j++) {
            xyValues.push( { 'x' : xyCounter.x, 'y': xyCounter.y } );
            xyCounter.y += globals.GRID_BLOCK_PX;
        }

        return xyValues;
    }

    updateTileIndexes( hitboxesXY ) {
        const frontClass = globals.GAME.front.class
        const previousTile = this.getPreviousTile( hitboxesXY, frontClass )
        if ( previousTile != undefined ) {
            this.previousTileIndex = previousTile.index;
            this.previousTileFront.clearSpriteData( )
            this.previousTileFront.spriteId = null;            
        }

        let activeTiles = [];
        hitboxesXY.forEach( ( hitboxXY ) => {
            let tileAtHitbox = frontClass.getTileAtXY( hitboxXY.x, hitboxXY.y )
            if ( tileAtHitbox != undefined ) {
                activeTiles.push( tileAtHitbox )                
            }
            if ( activeTiles.length < 1 && previousTile != undefined ) {
                activeTiles.push( previousTile )    
            }
        })

        this.activeTileIndexes = [ ]
        activeTiles.forEach( ( activeTile ) => {
            this.activeTileIndexes.push( activeTile.index )
            activeTile.setSpriteData( 'object', null )
            activeTile.spriteId = this.spriteId;
        })

        const nextTile = this.getNextTile( hitboxesXY, frontClass )

        this.nextTileIndex = nextTile == undefined ? undefined : nextTile.index;
    }

    getPreviousTile( hitboxesXY, frontClass  ) {
        let previousTile;
        switch ( this.direction ) {
            case globals["FACING_LEFT"]:
                previousTile = frontClass.getTileAtXY( hitboxesXY[hitboxesXY.length - 1].x + GRID_BLOCK_PX, hitboxesXY[0].y );
                break;
            case globals["FACING_UP"]:
                previousTile = frontClass.getTileAtXY( hitboxesXY[0].x, hitboxesXY[hitboxesXY.length - 1].y + GRID_BLOCK_PX );
                break;
            case globals["FACING_RIGHT"]: 
            previousTile = frontClass.getTileAtXY( hitboxesXY[hitboxesXY.length - 1].x - GRID_BLOCK_PX, hitboxesXY[0].y );
                break;
            case globals["FACING_DOWN"]:
                previousTile = frontClass.getTileAtXY( hitboxesXY[0].x, hitboxesXY[hitboxesXY.length - 1].y - GRID_BLOCK_PX );
                break;
        }
        return previousTile
    }

    getNextTile( hitboxesXY, frontClass  ) {
        let nextTile;
        switch ( this.direction ) {
            case globals["FACING_LEFT"]:
                nextTile = frontClass.getTileAtXY( hitboxesXY[0].x - GRID_BLOCK_PX, hitboxesXY[0].y );
                break;
            case globals["FACING_UP"]:
                nextTile = frontClass.getTileAtXY( hitboxesXY[0].x, hitboxesXY[0].y - GRID_BLOCK_PX );
                break;
            case globals["FACING_RIGHT"]: 
                nextTile = frontClass.getTileAtXY( hitboxesXY[0].x + GRID_BLOCK_PX, hitboxesXY[0].y );
                break;
            case globals["FACING_DOWN"]:
                nextTile = frontClass.getTileAtXY( hitboxesXY[0].x, hitboxesXY[0].y + GRID_BLOCK_PX );
                break;
        }
        return nextTile;
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