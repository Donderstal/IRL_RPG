const I_Hitbox      = require('../../interfaces/I_Hitbox').I_Hitbox
const I_Sprite      = require('../../interfaces/I_Sprite').Sprite
const globals       = require('../../../game-data/globals')
const canvasHelpers = require('../../../helpers/canvasHelpers')
const MapAction     = require('./MapAction').MapAction

const mapObjectResources = require('../../../resources/mapObjectResources')
const { GRID_BLOCK_PX, GRID_BLOCK_IN_SHEET_PX } = require('../../../game-data/globals')
const { HitboxGroup } = require('./HitboxGroup')
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

        this.objectResource = objectResource;
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
            this.initHitboxGroups( );
        }

        if ( tile.spriteData.moving ) {
            this.initMovingSprite( tile.spriteData )
        }
    }

    get previousTileFront( ) { return globals.GAME.front.class.grid.array[this.previousTileIndex] };
    get currentTileFront( ) { return globals.GAME.front.class.grid.array[this.activeTileIndexes[0]] };
    get nextTileFront( ) { return globals.GAME.front.class.grid.array[this.nextTileIndex] };

    initMovingSprite( spriteData ) {
        this.movingToDestination = true;
        this.movementSpeed = globals.MOVEMENT_SPEED * ( Math.random( ) + 1 );
        this.destination = spriteData.destination;
        this.frames = this.objectResource["movement_frames"];
        this.direction = globals[spriteData.direction]
        this.destinationTile = globals.GAME.front.class.grid.getTileAtCell( this.destination.row, this.destination.col )
    }

    drawSprite( ) {
        if ( this.movingToDestination ) {
            this.hitboxGroups.forEach( ( group ) => {
                group.spriteId = this.spriteId
            })
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
            this.updateHitboxes( );
            this.checkForCollision( );
            this.checkForIntersection( );

            if ( !this.blocked ) {
                this.goToDestination( );     
            }
        }

        if ( this.movingToDestination ) {
            this.countFrame( );
        }
    }
    
    initHitboxGroups( ) {
        this.hitboxGroups = [ ]

        this.hitboxGroups = [
            new HitboxGroup( this.x, this.y, this.direction, this.spriteDimensionsInBlocks )
        ]
        if ( this.direction == globals["FACING_UP"] || this.direction == globals["FACING_DOWN"] ) {
            this.hitboxGroups.push( new HitboxGroup( this.x + GRID_BLOCK_PX, this.y, this.direction, this.spriteDimensionsInBlocks ) )
        }
    }

    updateHitboxes( ) {
        this.hitboxes = []
        this.hitboxGroups.forEach( ( group, index ) => {
            group.updateHitboxes( this.x + GRID_BLOCK_PX * index , this.y)
            group.hitboxes.forEach( ( hitbox ) => {
                this.hitboxes.push( hitbox )
            } );
        })
    }
    
    checkForCollision( ) {
        this.blocked = checkForCollision( this.hitboxGroups[0], false )
        if ( !this.blocked && this.hitboxGroups.length > 1 ) {
            this.blocked = checkForCollision( this.hitboxGroups[1], false )
        }        
    }

    checkForIntersection( ) {
        this.hitboxGroups.forEach( ( group ) => {
            if ( group.isAtIntersection ) {
                console.log( group.currentTileFront )
                group.currentTileFront.intersectingDirections.forEach( ( direction ) => {
                    if ( direction != this.direction ) {
                        this.switchDirections( direction, group.currentTileFront );
                    }
                })
            }
        })
    }

    switchDirections( newDirection, intersectionTile ) {
        super.setSpriteToGrid( intersectionTile, true ) 
        this.direction = globals[newDirection];
        const spriteDimensionsInBlocks = getSpriteDimensions( this.objectResource, newDirection );      
        this.spriteDimensionsInBlocks = spriteDimensionsInBlocks;  
        this.width = spriteDimensionsInBlocks.hori * GRID_BLOCK_PX;
        this.height = spriteDimensionsInBlocks.vert * GRID_BLOCK_PX; 
        this.widthInSheet   = spriteDimensionsInBlocks.hori * GRID_BLOCK_IN_SHEET_PX;
        this.heightInSheet  = spriteDimensionsInBlocks.vert * GRID_BLOCK_IN_SHEET_PX;

        this.initHitboxGroups( );

        globals.GAME.front.class.roads.forEach( ( road ) => {
            if ( road.direction == newDirection) {
                this.destination = road.endCell;

            }
        })

        this.destinationTile    = globals.GAME.front.class.grid.getTileAtCell( this.destination.row, this.destination.col );
    }

    goToDestination( ) {
        const destIsLeftOfSprite = (this.destinationTile.x - this.width) < this.left;
        const destIsRightOfSprite = ( this.destinationTile.x + globals.GRID_BLOCK_PX + this.width ) > this.right;
        const destIsAboveSprite = this.destinationTile.y - this.height < this.top;
        const destIsBelowSprite = this.destinationTile.y + globals.GRID_BLOCK_PX + this.height > this.bottom;

        this.moving = false
        if ( destIsLeftOfSprite && this.direction == globals["FACING_LEFT"] ) {
            this.x -= this.movementSpeed
            this.moving = true;
            this.direction = globals["FACING_LEFT"]
        }
        else if ( destIsAboveSprite && this.direction == globals["FACING_UP"] ) {
            this.y -= this.movementSpeed
            this.moving = true;
            this.direction = globals["FACING_UP"]
        }
        else if ( destIsRightOfSprite  && this.direction == globals["FACING_RIGHT"]  ) {
            this.x += this.movementSpeed
            this.moving = true;
            this.direction = globals["FACING_RIGHT"];
        }
        else if ( destIsBelowSprite && this.direction == globals["FACING_DOWN"]  ) {
            this.y += this.movementSpeed
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