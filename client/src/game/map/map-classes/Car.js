const { MapObject } = require("./MapObject");
const globals       = require('../../../game-data/globals')
const checkForCollision = require('../map-ui/movementChecker').checkForCollision
const { GRID_BLOCK_PX, MOVEMENT_SPEED, FACING_RIGHT, FACING_LEFT, FACING_UP, FACING_DOWN } = require('../../../game-data/globals');
const { Counter } = require("../../../helpers/Counter");

class Car extends MapObject {
    constructor( tile, spriteData, spriteId ) {
        super( tile, spriteData, spriteId );
        this.frames = this.objectResource["movement_frames"];
        this.name = spriteData.name
        this.isCar = true;
        this.initMovingSprite( spriteData )
        this.movementSoundEffect = globals.GAME.sound.getSpatialEffect( "car-engine.wav", true );
        this.movementSoundEffect.mute( );
        this.blockedCounter = new Counter( 2000 * Math.random( ), false );
        this.waitingAtIntersection = false;

        globals.GAME.FRONT.roadNetwork.roads.forEach( ( road ) => { 
            if ( road.startCell.col == tile.col && road.startCell.row == tile.row ) {
                road.activeCarIds.push( this.spriteId );
            }
        })
    }
    
    get currentTileFront( ) { return this.hitboxGroups[0].currentTileFront };
    get middleTileFront( ) { return this.hitboxGroups[0].middleTileFront };
    get nextTileFront( ) { return this.hitboxGroups[0].nextTileFront };
    get secondNextTileFront( ) { return this.hitboxGroups[0].secondNextTileFront };
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
    get isOffScreen( ) {
        if ( this.direction == FACING_LEFT ) {
            return ( this.left + this.width ) < 0;
        }
        else if ( this.direction == FACING_UP ) {
            return ( this.top + this.height ) < 0;
        }
        else if ( this.direction == FACING_RIGHT ) {
            return this.right - this.width > globals.GAME.FRONT.grid.width;
        }
        else if ( this.direction == FACING_DOWN ) {
            return this.bottom - this.height > globals.GAME.FRONT.grid.height;
        }
    }
    get isBus( ) {
        return this.sheetSrc.includes('bus');
    }

    handleBlockedTimeCounter( ) {
        if ( this.blocked ) {
            if ( this.blockedCounter.countAndCheckLimit( ) ) {
                this.carHornSoundEffect = globals.GAME.sound.getSpatialEffect( "car-horn.wav", false );
                this.carHornSoundEffect.setVolumeAndPan( this )
                this.carHornSoundEffect.play( );
            } 
        }
        else {
            this.blockedCounter.resetCounter( );
        }       
    }
    
    drawSprite( ) {
        this.blocked = false;
        this.setActiveFrames( );

        super.drawSprite( );
        this.checkForCollision( );
        
        if ( !this.isBus ) {
            this.checkForIntersection( );            
        }
        if ( !this.blocked && !this.waitingAtIntersection && this.movingToDestination ) {
            this.goToDestination( );     
            if (this.movementSoundEffect != undefined)
                this.movementSoundEffect.setVolumeAndPan( this )
        }
        else if (this.movementSoundEffect != undefined &&( this.movementSoundEffect.isPaused || this.movementSoundEffect.hasEnded )) { 
            this.movementSoundEffect.reset( );
        }
        this.handleBlockedTimeCounter( )
        this.countFrame( );
    }

    setWaitAtIntersection( ) {
        this.waitingAtIntersection = true;
    }

    unsetWaitAtIntersection( ) {
        this.waitingAtIntersection = false;
    }
         /**
     * Set the Sprites' location on the grid and xy axis depending on given I_Tile
     * @param {I_TIle} tile instance of I_Tile Class
     * @param {Boolean} isCar true if this is a car sprite
     */
    setSpriteToGrid( tile, inConstructor = true ) {
        this.row = tile.row;
        this.col = tile.col;
        
        this.x = this.direction == FACING_RIGHT ? tile.x - this.width : tile.x;
        this.y = ( this.direction == FACING_UP && inConstructor ) ? tile.y + GRID_BLOCK_PX + this.height : tile.y - ( this.height - GRID_BLOCK_PX )

        switch ( this.direction ) { 
            case FACING_LEFT: 
                this.y += GRID_BLOCK_PX
                if ( !inConstructor ) {
                    this.x -= GRID_BLOCK_PX * 2;                    
                }
                break;
            case FACING_UP: 
                this.x -= GRID_BLOCK_PX;
                break;
            case FACING_DOWN:
                this.y += GRID_BLOCK_PX
                break;
            case FACING_RIGHT: 
                this.x += GRID_BLOCK_PX;
                break;
        }
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
     * Override of base method to set Car destination as single tile instead of a list of tiles
     */
    setDestinationList( ) {
        this.destinationTile = globals.GAME.getTileOnCanvasAtCell( "FRONT", this.destination.col, this.destination.row );
    }
    /**
     * Call this.initMovement and assign frames to this.frames.
     * Then, call setDestination with spriteData.destination as argument
     * @param {Object} spriteData 
     */
    initMovingSprite( spriteData ) {
        if ( spriteData.destination ) {
            this.setDestination( spriteData.destination );      
            this.initMovement( );    
        }
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
          this.hitboxGroups.forEach( ( group ) => {
            if ( group.middleIsOnIntersection && !this.handlingIntersection && group.middleTileFront.intersectionFrom == this.direction) {
                this.handleIntersection( group.middleTileFront );
            }
        })
    }
    /**
     * Handle the intersection at the current tile and call switchDirection
     * @param {I_Tile} intersectionTile 
     */
    handleIntersection( intersectionTile ) {
        const tile = Object.assign(Object.create(Object.getPrototypeOf(intersectionTile)), intersectionTile);
        const directionFrom = intersectionTile.intersectionFrom;
        const directionTo = intersectionTile.intersectionTo;
        
        if ( directionFrom == FACING_LEFT && directionTo == FACING_UP ) {
            tile.x += GRID_BLOCK_PX;
        }
        else if ( directionFrom == FACING_UP && directionTo == FACING_RIGHT ) {
            tile.y += GRID_BLOCK_PX;
        }
        else if ( directionFrom == FACING_RIGHT && directionTo == FACING_DOWN ) {
            tile.x -= GRID_BLOCK_PX;
        }
        else if ( directionFrom == FACING_DOWN && directionTo == FACING_LEFT ) {
            tile.y -= GRID_BLOCK_PX;
        }

        this.handlingIntersection = true;
        Math.random( ) > .5 ? this.switchDirections( directionTo, tile ) : setTimeout(( )=> {this.handlingIntersection = false}, 500);
    }
    /**
     * Clear the hitboxGroups tile indexes and set the newDirection to Car
     * Set the sprite to gridd at the intersectionTile and check for new spritesheet dimensions
     * Then, initialize new HitboxGroups and set the destination tile of the new road as destination
     * @param {String} newDirection direction to switch to as string
     * @param {I_Tile} intersectionTile grid tile with intersection
     */
    switchDirections( newDirection, intersectionTile ) {
        this.direction = newDirection;
        this.setSpriteToGrid( intersectionTile, false ) 
        this.setObjectDimensionsBasedOnDirection( newDirection )
        this.initHitboxGroups( );

        globals.GAME.FRONT.roadNetwork.roads.forEach( ( road ) => {
            if ( road.direction == newDirection ) {
                this.destination = road.endCell;
            }
        })

        this.setDestinationList( );
        setTimeout( ( )=> {
            this.handlingIntersection = false;
        }, 500 )
    }
        /**
     * Depending on what direction the destination is, move on the x or y axis.
     * If No move is possible, call endGoToAnimation and set this.deleted to true.
     */
    goToDestination( ) {
        this.moving = false
        if ( this.destinationIsLeft && this.direction == FACING_LEFT ) {
            this.x -= this.movementSpeed
            this.moving = true;
            this.direction = FACING_LEFT
        }
        else if ( this.destinationIsUp && this.direction == FACING_UP ) {
            this.y -= this.movementSpeed
            this.moving = true;
            this.direction = FACING_UP
        }
        else if ( this.destinationIsRight  && this.direction == FACING_RIGHT  ) {
            this.x += this.movementSpeed
            this.moving = true;
            this.direction = FACING_RIGHT;
        }
        else if ( this.destinationIsDown && this.direction == FACING_DOWN  ) {
            this.y += this.movementSpeed
            this.moving = true;
            this.direction = FACING_DOWN
        }
        
        if ( !this.moving ) {
            if ( globals.GAME.activeCinematic != undefined && this.name == globals.GAME.activeCinematic.activeScene.spriteName )
            {
                globals.GAME.activeCinematic.activeScene.walkingToDestination = false;
            }

            if ( this.isOffScreen ) {
                this.deleted = true;
                globals.GAME.FRONT.deleteSprite( this.spriteId );
            }
        }
    }
    /**
     * Set the value of this.activeFrames, depending on this.direction.
     * Then, set sheetFrameLimit to this.activeFrames.length.
     */
    setActiveFrames( ) {
        switch ( this.direction ) {
            case FACING_LEFT :
                this.activeFrames = this.frames[FACING_LEFT];
                break;
            case FACING_UP :
                this.activeFrames = this.frames[FACING_UP];
                break;
            case FACING_RIGHT :
                this.activeFrames = this.frames[ FACING_RIGHT];
                break;
            case FACING_DOWN : 
                this.activeFrames = this.frames[ FACING_DOWN];
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