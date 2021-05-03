const { MapObject } = require("./MapObject");
const { HitboxGroup } = require('./HitboxGroup')
const globals       = require('../../../game-data/globals')
const checkForCollision = require('../map-ui/movementChecker').checkForCollision
const { GRID_BLOCK_PX, MOVEMENT_SPEED } = require('../../../game-data/globals')

class Car extends MapObject {
    constructor( tile, spriteId ) {
        super( tile, spriteId );

        this.initMovingSprite( tile.spriteData )
        this.initHitboxGroups( );
    }
    
    get currentTileFront( ) { return globals.GAME.getTileOnCanvasAtIndex( "FRONT", this.activeTileIndexes[0]) };
    get nextTileFront( ) { return globals.GAME.getTileOnCanvasAtIndex( "FRONT", this.nextTileIndex ) };
    get destinationIsLeft( ) { 
        return this.destinationTile.x - this.width < this.left;
    }
    get destinationIsRight( ) { 
        return this.destinationTile.x + GRID_BLOCK_PX + this.width > this.right;
    }
    get destinationIsUp( ) { 
        return this.destinationTile.y - this.height < this.top;
    }    
    get destinationIsDown( ) { 
        return this.destinationTile.y + GRID_BLOCK_PX + this.height > this.bottom;
    }
    
    drawSprite( ) {
        this.blocked = false;
        this.setActiveFrames( );

        super.drawSprite( );

        this.updateHitboxes( );
        this.checkForCollision( );
        this.checkForIntersection( );

        if ( !this.blocked ) {
            this.goToDestination( );     
        }
        this.countFrame( );
    }
         /**
     * Set the Sprites' location on the grid and xy axis depending on given I_Tile
     * @param {I_TIle} tile instance of I_Tile Class
     * @param {Boolean} isCar true if this is a car sprite
     */
    setSpriteToGrid( tile ) {
        this.row = tile.row;
        this.col = tile.col;
        
        this.x = this.direction == globals["FACING_RIGHT"] ? tile.x - this.width : tile.x;
        this.y = ( this.direction == globals["FACING_UP"] ) ? tile.y + GRID_BLOCK_PX + this.height : tile.y - ( this.height - GRID_BLOCK_PX )
    }
    /**
     * Set this.movingToDestination to true. 
     * If given speed is not null, set it to this.movementSpeed.
     * Else, set MOVEMENT_SPEED. Add random variation to speed if this.isCar.
     * @param {Number} speed optional. movement speed of the sprite in pixels
     */
    initMovement( speed = null ) {
        this.movingToDestination = true;
        this.movementSpeed = MOVEMENT_SPEED * ( Math.random( ) + 1 );
    }
    /**
     * Override of base method to set Car destination as single tile
     */
    setDestinationList( ) {
        this.destinationTile = globals.GAME.getTileOnCanvasAtCell( "FRONT", this.destination.col, this.destination.row );
    }
    /**
     * TODO: more dynamic movement frames fetching
     * Call this.initMovement and assign frames to this.frames.
     * Then, call setDestination with spriteData.destination as argument
     * @param {Object} spriteData 
     */
    initMovingSprite( spriteData ) {
        this.initMovement( );
        this.frames = this.objectResource["movement_frames"];
        this.setDestination( spriteData.destination );
    }
    /**
     * TODO: The hitboxgroups instantiation should be more dynamic
     * Instantiate on or more I_Hitboxgroup depending on the sprites alignment.
     * Push these instances to the this.hitBoxGroups array.
     */
    initHitboxGroups( ) {
        this.hitboxGroups = [ ]

        this.hitboxGroups = [
            new HitboxGroup( this.x, this.y, this.direction, this.spriteDimensionsInBlocks, this.spriteId )
        ]
        if ( this.direction == globals["FACING_UP"] || this.direction == globals["FACING_DOWN"] ) {
            this.hitboxGroups.push( new HitboxGroup( this.x + GRID_BLOCK_PX, this.y, this.direction, this.spriteDimensionsInBlocks, this.spriteId ) )
        }
        else {
            this.hitboxGroups.push( new HitboxGroup( this.x, this.y + GRID_BLOCK_PX, this.direction, this.spriteDimensionsInBlocks, this.spriteId ) )
        }
    }
        /**
     * Empty the this.hitboces array.
     * Loop through this.hitboxGroups.
     * For each, call updateHitboxes.
     * Then, push all hitboxes in the current group to this.hitboxes.
     */
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
    /**
     * Set the value of this.blocked to the return value of the checkForCollision, passing the first group in this.hitboxGroups as argument.
     * If not blocked and there is another hitboxGroup, set this.blocked to the return value of checkForCollision with the second group as argument.
     */
    checkForCollision( ) {
        this.blocked = checkForCollision( this.hitboxGroups[0], false )
        if ( !this.blocked && this.hitboxGroups.length > 1 ) {
            this.blocked = checkForCollision( this.hitboxGroups[1], false )
        }        
    }
        /**
     * Check if the sprite is currently facing up to determine which I_Tile to check for intersection.
     * Loop through the Hitboxes. If not turning and group is at intersection, loop through the 
     * intersectingDirection in the intersection I_Tile. If a valid direction is found, call this.switchDirections.
     */
    checkForIntersection( ) {
        const isFacingUp = this.direction == globals["FACING_UP"];
          this.hitboxGroups.forEach( ( group ) => {
            if ( group.isAtIntersection && !this.turning && !isFacingUp ) {
                this.handleIntersection(  group.currentTileFront );
            }
            else if ( group.middleIsOnIntersection && !this.turning && isFacingUp ) {
                this.handleIntersection( group.middleTileFront );
            }
        })
    }
    /**
     * Handle the intersection at the current tile and call switchDirection
     * @param {I_Tile} intersectionTile 
     */
    handleIntersection( intersectionTile ) {
        intersectionTile.intersectingDirections.forEach( ( direction ) => {
            if ( globals[direction] != this.direction && !this.turning ) {
                this.turning = true;
                this.switchDirections( direction, intersectionTile );
            }
        })
    }
    /**
     * 
     * @param {String} newDirection direction to switch to as string
     * @param {I_Tile} intersectionTile grid tile with intersection
     */
    switchDirections( newDirection, intersectionTile ) {
        this.hitboxGroups.forEach( ( group ) => {
            group.clearTileIndexes( )
        })
        this.direction = globals[newDirection];
        super.setSpriteToGrid( intersectionTile ) 
        this.setObjectDimensionsBasedOnDirection( newDirection )
        this.initHitboxGroups( );

        globals.GAME.front.class.roads.forEach( ( road ) => {
            if ( road.direction == newDirection) {
                this.destination = road.endCell;
            }
        })

        this.destinationTile = globals.GAME.getTileOnCanvasAtCell( "FRONT", this.destination.col, this.destination.row );
    }
        /**
     * Depending on what direction the destination is, move on the x or y axis.
     * If No move is possible, call endGoToAnimation and set this.deleted to true.
     */
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
            this.deleted = true;
        }
    }
    /**
     * Set the value of this.activeFrames, depending on this.direction.
     * Then, set sheetFrameLimit to this.activeFrames.length.
     */
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

module.exports = {
    Car
}