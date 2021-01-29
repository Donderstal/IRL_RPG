const I_Hitbox      = require('../../interfaces/I_Hitbox').I_Hitbox
const I_Sprite      = require('../../interfaces/I_Sprite').Sprite
const globals       = require('../../../game-data/globals')
const canvasHelpers = require('../../../helpers/canvasHelpers')
const MapAction     = require('./MapAction').MapAction

const mapObjectResources = require('../../../resources/mapObjectResources')
const { GRID_BLOCK_PX, GRID_BLOCK_IN_SHEET_PX, MOVEMENT_SPEED, FRAME_LIMIT } = require('../../../game-data/globals')
const { HitboxGroup } = require('./HitboxGroup')
const checkForCollision = require('../map-ui/movementChecker').checkForCollision

class MapObject extends I_Sprite {
    constructor ( tile ){
        const objectResource = mapObjectResources[tile.spriteData.type]
        const src = "/static/sprite-assets/" + objectResource.src

        const spriteDimensionsInBlocks = getSpriteDimensions( objectResource, tile.spriteData.direction );

        const dimensionsInMap = {
            "width": spriteDimensionsInBlocks.hori * GRID_BLOCK_PX,
            "height": spriteDimensionsInBlocks.vert * GRID_BLOCK_PX 
        }
        const dimensionsInSheet = { 
            'width': spriteDimensionsInBlocks.hori * GRID_BLOCK_IN_SHEET_PX,
            'height': spriteDimensionsInBlocks.vert * GRID_BLOCK_IN_SHEET_PX 
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

    get currentTileFront( ) { return globals.GAME.getTileOnCanvasAtIndex( "FRONT", this.activeTileIndexes[0]) };
    get nextTileFront( ) { return globals.GAME.getTileOnCanvasAtIndex( "FRONT", this.nextTileIndex ) };

    initMovingSprite( spriteData ) {
        this.movingToDestination = true;
        this.movementSpeed = MOVEMENT_SPEED * ( Math.random( ) + 1 );
        this.destination = spriteData.destination;
        this.frames = this.objectResource["movement_frames"];
        this.direction = globals[spriteData.direction]
        this.destinationTile = globals.GAME.getTileOnCanvasAtCell( "FRONT", this.destination.col, this.destination.row )
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
        else {
            this.hitboxGroups.push( new HitboxGroup( this.x, this.y + GRID_BLOCK_PX, this.direction, this.spriteDimensionsInBlocks ) )
        }
    }

    updateHitboxes( ) {
        this.hitboxes = []
        this.hitboxGroups.forEach( ( group, index ) => {
            if ( this.direction == globals["FACING_UP"] || this.direction == globals["FACING_DOWN"] ) {
                group.updateHitboxes( this.x + GRID_BLOCK_PX * index , this.y)
            }
            else {
                group.updateHitboxes( this.x, this.y + GRID_BLOCK_PX * index )
            }

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
        const isFacingUp = this.direction == globals["FACING_UP"]
          this.hitboxGroups.forEach( ( group ) => {
            if ( !isFacingUp && group.isAtIntersection && !this.turning ) {
                group.currentTileFront.intersectingDirections.forEach( ( direction ) => {
                    if ( globals[direction] != this.direction && !this.turning ) {
                        this.turning = true;
                        this.switchDirections( direction, group.currentTileFront );
                    }
                })
            }
            else if ( isFacingUp && group.isOnIntersection  && !this.turning ) {
                group.middleTileFront.intersectingDirections.forEach( ( direction ) => {
                    if ( globals[direction] != this.direction && !this.turning ) {
                        this.turning = true;
                        this.switchDirections( direction, group.middleTileFront );
                    }
                })
            }
        })
    }

    switchDirections( newDirection, intersectionTile ) {
        this.hitboxGroups.forEach( ( group ) => {
            group.clearTileIndexes( )
        })
        this.direction = globals[newDirection];
        super.setSpriteToGrid( intersectionTile, true ) 
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

        this.destinationTile    = globals.GAME.getTileOnCanvasAtCell( "FRONT", this.destination.col, this.destination.row );
    }

    goToDestination( ) {
        this.moving = false
        if ( this.destinationIsLeft && this.direction == globals["FACING_LEFT"] ) {
            this.x -= this.movementSpeed
            this.moving = true;
            this.direction = globals["FACING_LEFT"]
        }
        else if ( this.destinationIsUp && this.direction == globals["FACING_UP"] ) {
            this.y -= this.movementSpeed
            this.moving = true;
            this.direction = globals["FACING_UP"]
        }
        else if ( this.destinationIsRight  && this.direction == globals["FACING_RIGHT"]  ) {
            this.x += this.movementSpeed
            this.moving = true;
            this.direction = globals["FACING_RIGHT"];
        }
        else if ( this.destinationIsDown && this.direction == globals["FACING_DOWN"]  ) {
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
        
        this.sheetFrameLimit = this.activeFrames.length
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