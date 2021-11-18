const { MapObject } = require("../map-classes/MapObject");
const globals       = require('../../../game-data/globals')
const checkForCollision = require('../map-ui/movementChecker').checkForCollision
const { GRID_BLOCK_PX, MOVEMENT_SPEED, FACING_RIGHT, FACING_LEFT, FACING_UP, FACING_DOWN } = require('../../../game-data/globals');
const { Counter } = require("../../../helpers/Counter");

class Car extends MapObject {
    constructor( tile, spriteData, spriteId ) {
        super( tile, spriteData, spriteId );
        this.name = spriteData.name
        this.isCar = true;
        this.movementSoundEffect = globals.GAME.sound.getSpatialEffect( "car-engine.wav", true );
        this.movementSoundEffect.mute( );
        this.carHornSoundEffect = globals.GAME.sound.getSpatialEffect( "car-horn.wav", false );
        this.carHornSoundEffect.mute( );
        this.blockedCounter = new Counter( 5000, false );
        this.crossedIntersectionIds = [];
        this.carPath = spriteData.carPath;
        this.carPathIndex = 0;
        this.speed          = MOVEMENT_SPEED * (Math.random() * (1.25 - .75) + .75);
        this.roadId;

        globals.GAME.FRONT.roadNetwork.roads.forEach( ( road ) => { 
            if ( road.startCell.col == tile.col && road.startCell.row == tile.row ) {
                road.activeCarIds.push( this.spriteId );
                this.roadId = road.id;
            }
        })
    }
    
    get nextRoadId( ) { return this.carPath[this.carPathIndex+1]; };
    get currentTileFront( ) { return this.hitboxGroups[0].currentTileFront };
    get middleTileFront( ) { return this.hitboxGroups[0].middleTileFront };
    get nextTileFront( ) { return this.hitboxGroups[0].nextTileFront };
    get secondNextTileFront( ) { return this.hitboxGroups[0].secondNextTileFront };
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
        this.updateState( );
        super.drawSprite( );
        this.checkForCollision( );
        
        if ( !this.isBus ) {
            this.checkForIntersection( );            
        }
        this.checkForMoveToDestination( );
        this.handleSoundEffects( )
        this.handleBlockedTimeCounter( )
        if ( !this.State.is(globals.STATE_MOVING) ) {
            this.countFrame( );            
        }
    }

    handleSoundEffects( ) {
        if (this.movementSoundEffect != undefined && this.carHornSoundEffect != undefined) {
            this.carHornSoundEffect.setVolumeAndPan( this )
            this.movementSoundEffect.setVolumeAndPan( this )                 
        }
        if (this.movementSoundEffect != undefined &&( this.movementSoundEffect.isPaused || this.movementSoundEffect.hasEnded )) { 
            this.movementSoundEffect.reset( );
        }        
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
        globals.GAME.FRONT.roadNetwork.roads.forEach( ( e ) => {
            if ( e.id === this.roadId ) {
                e.activeCarIds.splice( e.activeCarIds.indexOf( this.spriteId ), 1 )                
            }
        });
        this.roadId = road.id;
        road.activeCarIds.push(this.spriteId);
        this.crossedIntersectionIds.push( id );
        this.direction = newDirection;
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
        this.carPathIndex++;
        this.initHitboxGroups( );
        this.setDestination( road.endCell, true );
    }

    isOnSquare( square ) {
        let isOnSquare = true;
        let firstTileMiddle = this.hitboxGroups[0].middleTileFront;
        let secondTileMiddle = this.hitboxGroups[1].middleTileFront;
        [firstTileMiddle, secondTileMiddle].forEach( ( tile ) => {
            if ( !square.tileIsIncluded(tile) )
                isOnSquare = false;
        })

        return isOnSquare;
    }
}

module.exports = {
    Car
}