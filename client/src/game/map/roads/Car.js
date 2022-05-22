const { MapObject } = require("../map-classes/MapObject");
const globals       = require('../../../game-data/globals')
const checkForCollision = require('../map-ui/movementChecker').checkForCollision
const { GRID_BLOCK_PX, MOVEMENT_SPEED, FACING_RIGHT, FACING_LEFT, FACING_UP, FACING_DOWN } = require('../../../game-data/globals');
const { Counter } = require("../../../helpers/Counter");
const { getRelativeLeft, getRelativeRight, getOppositeDirection } = require("../../../helpers/utilFunctions");
const { INTERSECTION_STRAIGHT, INTERSECTION_LEFT, INTERSECTION_RIGHT } = require("../../../game-data/conditionGlobals");

class Car extends MapObject {
    constructor( tile, spriteData, spriteId ) {
        super( tile, spriteData, spriteId );
        this.name = spriteData.name
        this.isCar = true;
        this.movementSoundEffect = globals.GAME.sound.getSpatialEffect( "car-engine.wav", true );
        this.movementSoundEffect.mute( );
        this.carHornSoundEffect = globals.GAME.sound.getSpatialEffect( "car-horn.wav", false );
        this.carHornSoundEffect.mute( );
        this.blockedCounter = new Counter( 5000, false, false );
        this.crossedIntersectionIds = [];
        this.activeIntersectionId = null;
        this.intersectionActions = {};
        this.speed          = (MOVEMENT_SPEED * 2) * ((Math.random() * 0.5) + .75);
        this.roadId;
        this.type = 'car'

        globals.GAME.FRONT.roadNetwork.roads.forEach( ( road ) => { 
            if ( road.startCell.col == tile.col && road.startCell.row == tile.row ) {
                road.activeCarIds.push( this.spriteId );
                this.roadId = road.id;
            }
        })
    }
    
    get activeIntersection( ) { return globals.GAME.FRONT.roadNetwork.getIntersectionById(this.activeIntersectionId) }
    get nextTileFront( ) { return this.hitbox.nextTileFront };
    get baseY( ) { return this.y + ( this.height / 2 )};

    handleBlockedTimeCounter( ) {
        if ( this.checkForCollision( ) ) {
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
        super.drawSprite( )
        this.checkForMoveToDestination( );
        this.handleSoundEffects( )
        this.handleBlockedTimeCounter( )
        if ( !this.State.is(globals.STATE_MOVING) ) {
            this.countFrame( );            
        }
        this.activeIntersectionId = null;
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
        this.initHitbox( );
        this.setDestination( road.endCell, true );
    }

    isOnIntersection( id, intersectionRoadIds ) {
        this.activeIntersectionId = id;
        if ( this.crossedIntersectionIds.indexOf(id) == -1 && Object.keys(this.intersectionActions).indexOf(id) == -1 ) {
            if ( intersectionRoadIds.indexOf(this.nextRoadId) == -1 ) {
                this.intersectionActions[id] = INTERSECTION_STRAIGHT;
                this.crossedIntersectionIds.push( id );
            }
            else {
                const road = globals.GAME.FRONT.roadNetwork.getRoadById(this.nextRoadId);
                if ( road.direction == getRelativeLeft(this.direction) ) {
                    this.intersectionActions[id] = INTERSECTION_LEFT;
                }
                else if ( road.direction == getRelativeRight(this.direction) ) {
                    this.intersectionActions[id] = INTERSECTION_RIGHT;
                }
            }
        }
    }
}

module.exports = {
    Car
}