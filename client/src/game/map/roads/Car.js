const { MapObject, getSpriteDimensions } = require("../map-classes/MapObject");
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

        this.visitedIntersectionIds = [];
        this.crossedIntersectionIds = [];
        this.activeIntersectionId = null;
        this.turnInNextFrame = false;
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
    
    drawSprite() {
        this.updateState( );
        super.drawSprite( )
        this.checkForMoveToDestination( );
        this.handleSoundEffects( )
        this.handleBlockedTimeCounter( )
        if ( !this.State.is(globals.STATE_MOVING) ) {
            this.countFrame( );            
        }
        if ( this.activeIntersectionId !== null ) {
            this.turnInNextFrame = this.checkForTurn();
            this.activeIntersectionId = null;
        }
    }

    checkForMoveToDestination() {
        if ( this.turnInNextFrame ) {
            if ( !checkForCollision( this ) ) {
                let turnAction = this.intersectionActions[this.activeIntersectionId];
                let newRoad = this.activeIntersection.getRoadByDirection( turnAction.direction );
                this.turnToDirection( turnAction.direction, newRoad, turnAction.square, this.spriteId );
            }
            else {
                this.State.set( globals.STATE_WAITING );
            }
        }
        else {
            super.checkForMoveToDestination();
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

        this.turningPosition = {};
        this.turnInNextFrame = false;
        this.activeIntersectionId = null;

        this.initHitbox( );
        this.setDestination( road.endCell, true );
    }

    isOnIntersection( id ) {
        this.activeIntersectionId = id;
        if ( this.visitedIntersectionIds.indexOf(id) == -1 ) {
            this.visitedIntersectionIds.push( id );
            let directionsOut = this.activeIntersection.directionsOut.filter( ( e ) => { return e !== getOppositeDirection( this.direction ) } );
            let newDirection = directionsOut[Math.floor( Math.random() * directionsOut.length )];
            if ( newDirection !== this.direction ) {
                this.setTurningSquareOnActiveIntersection( newDirection );
            }
            else {
                this.intersectionActions[this.activeIntersectionId] = false;
            }
        }
    }

    setTurningSquareOnActiveIntersection( turningDirection ) {
        if ( ( turningDirection === FACING_LEFT || turningDirection === FACING_UP )
            && ( this.direction === FACING_LEFT || this.direction === FACING_UP ) ) {
            this.intersectionActions[this.activeIntersectionId] = {
                direction: turningDirection,
                square: this.activeIntersection.leftUpSquare
            };
        }
        else if ( ( turningDirection === FACING_RIGHT || turningDirection === FACING_UP )
            && ( this.direction === FACING_RIGHT || this.direction === FACING_UP ) ) {
            this.intersectionActions[this.activeIntersectionId] = {
                direction: turningDirection,
                square: this.activeIntersection.rightUpSquare,
            };
        }
        else if ( ( turningDirection === FACING_LEFT || turningDirection === FACING_DOWN )
            && ( this.direction === FACING_LEFT || this.direction === FACING_DOWN ) ) {
            this.intersectionActions[this.activeIntersectionId] = {
                direction: turningDirection,
                square: this.activeIntersection.leftDownSquare,
            };
        }
        else if ( ( turningDirection === FACING_RIGHT || turningDirection === FACING_DOWN )
            && ( this.direction === FACING_RIGHT || this.direction === FACING_DOWN ) ) {
            this.intersectionActions[this.activeIntersectionId] = {
                direction: turningDirection,
                square: this.activeIntersection.rightDownSquare,
            };
        }

        this.setTurningPosition();
    }

    checkForTurn() {
        let turnAction = this.intersectionActions[this.activeIntersectionId];
        if ( turnAction === false || this.crossedIntersectionIds.indexOf(this.activeIntersectionId) > -1 ) {
            return;
        }
        else {
            switch ( this.direction ) {
            case FACING_LEFT:
                return turnAction.square.left > this.left - ( this.speed / 2 ) && turnAction.square.left < this.left + ( this.speed / 2 );
            case FACING_UP:
                return turnAction.square.top > this.top - ( this.speed / 2 ) && turnAction.square.top < this.top + ( this.speed / 2 );
            case FACING_RIGHT:
                return turnAction.square.right > this.right - (this.speed / 2) && turnAction.square.right < this.right + (this.speed / 2);
            case FACING_DOWN:
                return turnAction.square.bottom > this.bottom - ( this.speed / 2 ) && turnAction.square.bottom < this.bottom + ( this.speed / 2 );
            }
        }
    }

    setTurningPosition() {
        let turnAction = this.intersectionActions[this.activeIntersectionId];

        const dimensions = getSpriteDimensions( this.objectResource, turnAction.direction );
        const nextWidth = dimensions.hori * GRID_BLOCK_PX;
        const nextHeight = dimensions.vert * GRID_BLOCK_PX;

        this.turningPosition = {
            width: nextWidth,
            height: nextHeight,
        }

        switch ( turnAction.direction ) {
        case FACING_LEFT:
            this.turningPosition.x = turnAction.square.right - nextWidth;
            this.turningPosition.y = turnAction.square.top;
            break;
        case FACING_UP:
            this.turningPosition.x = turnAction.square.left;
            this.turningPosition.y = turnAction.square.bottom - nextHeight;
            break;
        case FACING_RIGHT:
            this.turningPosition.x = turnAction.square.left;
            this.turningPosition.y = turnAction.square.top;
            break;
        case FACING_DOWN:
            this.turningPosition.x = turnAction.square.left;
            this.turningPosition.y = turnAction.square.top;
            break;
        }
    }
}

module.exports = {
    Car
}