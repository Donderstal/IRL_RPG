const { MapObject } = require("../map-classes/MapObject");
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
        this.carHornSoundEffect = globals.GAME.sound.getSpatialEffect( "car-horn.wav", false );
        this.carHornSoundEffect.mute( );
        this.blockedCounter = new Counter( 5000, false );
        this.waitingAtIntersection = false;
        this.crossedIntersectionIds = [];

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
                this.carHornSoundEffect.play( );
            } 
        }
        else {
            this.blockedCounter.resetCounter( );
            if ( this.carHornSoundEffect != undefined ) {
                this.carHornSoundEffect.reset( );                
            }
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
        if (this.movementSoundEffect != undefined && this.carHornSoundEffect != undefined) {
            this.carHornSoundEffect.setVolumeAndPan( this )
            this.movementSoundEffect.setVolumeAndPan( this )                 
        }
        if ( !this.blocked && !this.waitingAtIntersection && this.movingToDestination ) {
            this.goToDestination( );     
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

    initMovement( speed = null ) {
        this.movingToDestination = true;
        this.movementSpeed = MOVEMENT_SPEED * ( Math.random( ) + 1 );
    }

    setDestinationList( ) {
        this.destinationTile = globals.GAME.getTileOnCanvasAtCell( "FRONT", this.destination.col, this.destination.row );
    }

    initMovingSprite( spriteData ) {
        if ( spriteData.destination ) {
            this.setDestination( spriteData.destination );      
            this.initMovement( );    
        }
    }

    checkForCollision( ) {
        this.blocked = checkForCollision( this.hitboxGroups[0], false )
        if ( !this.blocked && this.hitboxGroups.length > 1 ) {
            this.blocked = checkForCollision( this.hitboxGroups[1], false )
        }        
    }

    checkForIntersection( ) {
          this.hitboxGroups.forEach( ( group ) => {
            if ( group.middleIsOnIntersection && !this.handlingIntersection && group.middleTileFront.intersectionFrom == this.direction) {
                this.handleIntersection( group.middleTileFront );
            }
        })
    }

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

    turnToDirection( newDirection, road, turn, id ) {
        this.crossedIntersectionIds.push( id );
        this.direction = newDirection;
        this.destination = road.endCell;
        this.setObjectDimensionsBasedOnDirection( newDirection );
        switch( newDirection ) {
            case FACING_LEFT:
                this.x = turn.right - this.width;
                this.y = turn.top - (this.height - turn.height);;
                break;
            case FACING_UP:
                this.x = turn.left;
                this.y = turn.bottom - this.height;
                break;
            case FACING_RIGHT:
                this.x = turn.left;
                this.y = turn.top - (this.height - turn.height);
                break;
            case FACING_DOWN:
                this.x = turn.left;
                this.y = turn.top;
                break;
        }
        this.initHitboxGroups( );
        this.setDestinationList( );
    }

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

    isOnSquare( square ) {
        let isOnSquare = true;
        let firstFront = this.hitboxGroups[0].currentTileFront;
        let secondTileFront = this.hitboxGroups[1].currentTileFront;
        let firstTileMiddle = this.hitboxGroups[0].middleTileFront;
        let secondTileMiddle = this.hitboxGroups[1].middleTileFront;
        [firstFront, secondTileFront, firstTileMiddle, secondTileMiddle].forEach( ( tile ) => {
            if ( !square.tileIsIncluded(tile) )
                isOnSquare = false;
        })

        return isOnSquare;
    }
}

module.exports = {
    Car
}