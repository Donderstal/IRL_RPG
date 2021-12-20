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
    
    get activeRoadId( ) { return this.carPath[this.carPathIndex]; };
    get nextRoadId( ) { return this.carPath[this.carPathIndex+1]; };
    get activeIntersection( ) { return globals.GAME.FRONT.roadNetwork.getIntersectionById(this.activeIntersectionId) }
    get currentTileFront( ) { return this.hitboxGroups[0].currentTileFront };
    get middleTileFront( ) { return this.hitboxGroups[0].middleTileFront };
    get nextTileFront( ) { return this.hitboxGroups[0].nextTileFront };
    get secondNextTileFront( ) { return this.hitboxGroups[0].secondNextTileFront };

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
        if ( this.activeIntersectionId != null ) {
            this.checkForIntersectionAction( )
        }
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

    checkForCollision( ) {
        this.blocked = checkForCollision( this.hitboxGroups[0], false )
        if ( !this.blocked && this.hitboxGroups.length > 1 ) {
            this.blocked = checkForCollision( this.hitboxGroups[1], false )
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

    checkForIntersectionAction( ) {
        let carCanCross;
        let turningSquare;
        let nextDirection;
        switch(this.intersectionActions[this.activeIntersectionId]) {
            case INTERSECTION_STRAIGHT:
                carCanCross = this.checkIfCarCanCrossStraight( );
                break;
            case INTERSECTION_LEFT:
                carCanCross = this.checkIfCarCanTurnLeft( );
                nextDirection = getRelativeLeft(this.direction)
                turningSquare = this.activeIntersection.getTurningSquare( this.direction, nextDirection);
                break;
            case INTERSECTION_RIGHT:
                carCanCross = this.checkIfCarCanTurnRight( );
                nextDirection = getRelativeRight(this.direction);
                turningSquare = this.activeIntersection.getTurningSquare( this.direction, nextDirection);
                break;
            default:
                console.log(this.intersectionActions[this.activeIntersectionId] 
                    + " not recognized as intersection action")
                break;
        }
        if ( !carCanCross ) {
            this.State.addToPendingStateChanges(globals.STATE_WAITING);
        }
        else {
            this.State.addToPendingStateChanges(globals.STATE_MOVING);
            if ( (this.intersectionActions[this.activeIntersectionId] == INTERSECTION_RIGHT || this.intersectionActions[this.activeIntersectionId] == INTERSECTION_LEFT) 
            && turningSquare != undefined && turningSquare != false
            && this.isOnSquare( turningSquare ) && this.crossedIntersectionIds.indexOf(this.activeIntersectionId) == -1 ) {
                this.turnToDirection(nextDirection, this.activeIntersection.getRoadByDirection(nextDirection), turningSquare, this.activeIntersectionId );
            }
        }
    }

    checkIfCarCanCrossStraight( ) {
        let inLane = this.activeIntersection.getDirectionInLane(this.direction)
        if ( this.checkForCarsComingFromRelativeRight( this.direction ) && this.isOnSquare(inLane) && !this.isOnSquare(this.activeIntersection.core)) {
            return false;
        }
        if ( this.checkForCarsComingFromRelativeLeft( this.direction ) && this.isOnSquare(inLane) && !this.isOnSquare(this.activeIntersection.core)) {
            return false;
        }
        return true;
    }

    checkIfCarCanTurnLeft( ) {
        let inLane = this.activeIntersection.getDirectionInLane(this.direction)
        let outLane = this.activeIntersection.getDirectionOutLane(getRelativeLeft(this.direction))
        let turningSquare = this.activeIntersection.getTurningSquare(this.direction, getRelativeLeft(this.direction))
        if ( this.checkForCarsComingFromRelativeLeft( this.direction ) && this.isOnSquare(inLane) && !this.isOnSquare(this.activeIntersection.core)) {
            return false;
        }
        if ( this.checkForCarsComingFromRelativeRight( this.direction ) && this.isOnSquare(inLane) && !this.isOnSquare(this.activeIntersection.core)) {
            return false;
        }
        if ( this.checkForSpritesOnTurningLocation( outLane ) && this.isOnSquare(turningSquare) ) {
            return false;
        }
        if ( this.checkForSpritesFromOppositeDirection( this.direction, outLane ) && this.isOnSquare(turningSquare) ) {
            return false;
        }
        return true;
    }

    checkIfCarCanTurnRight( ) {
        let inLane = this.activeIntersection.getDirectionInLane(this.direction)
        let outLane = this.activeIntersection.getDirectionOutLane(getRelativeRight(this.direction))
        let turningSquare = this.activeIntersection.getTurningSquare(this.direction, getRelativeRight(this.direction))
        if ( this.checkForCarsComingFromRelativeLeft( this.direction ) && this.isOnSquare(inLane) && !this.isOnSquare(this.activeIntersection.core)) {
            return false;
        }
        if ( this.checkForSpritesOnTurningLocation( outLane ) && this.isOnSquare(turningSquare) ) {
            return false;
        }
        return true;
    }

    checkForCarsComingFromRelativeRight( direction ) {
        const relativeRight = getRelativeRight(direction);
        const relativeRightInLane = this.activeIntersection.getDirectionInLane( relativeRight );
        let carComingFromRightLane = false;
        if ( relativeRightInLane ) {
            this.activeIntersection.intersectionCars.forEach((car)=>{
                if ( (car.isOnSquare(relativeRightInLane) ) && car.spriteId != this.spriteId ) {
                    carComingFromRightLane = true;
                }
            });        
        }
        return carComingFromRightLane;
    }

    checkForCarsComingFromRelativeLeft( direction ) {
        const relativeLeft = getRelativeLeft(direction);
        const relativeLeftInLane = this.activeIntersection.getDirectionInLane( relativeLeft );
        let carComingFromLeftLane = false;
        if ( relativeLeftInLane ) {
            this.activeIntersection.intersectionCars.forEach((car)=>{
                if ( car.isOnSquare(this.activeIntersection.core) && car.direction == relativeLeft && car.spriteId != this.spriteId ) {
                    carComingFromLeftLane = true;
                }
            });           
        }
        return carComingFromLeftLane;
    }

    checkForSpritesOnTurningLocation( outLane ) {
        let carInOutLane = false;
        if ( outLane && this.crossedIntersectionIds.indexOf(this.activeIntersectionId) == -1 ) {
            this.activeIntersection.intersectionCars.forEach((car)=>{
                if ( car.isOnSquare(outLane) && car.spriteId != this.spriteId ) {
                    carInOutLane = true;
                }
            });
        }
        return carInOutLane;
    } 

    checkForSpritesFromOppositeDirection( direction, outLane ) {
        const oppositeDirection = getOppositeDirection(direction);
        const oppositeInLane = this.activeIntersection.getDirectionInLane( oppositeDirection );
        const oppositeFacingCars = this.activeIntersection.intersectionCars.filter((e)=>{return e.direction == oppositeDirection})
        let carInOppositeInLane = false;
        if ( oppositeFacingCars.length > 0 && this.crossedIntersectionIds.indexOf(this.activeIntersectionId) == -1 ) {
            oppositeFacingCars.forEach((car)=>{
                if ( car.isOnSquare(this.activeIntersection.core) || car.isOnSquare(oppositeInLane) ) {
                    carInOppositeInLane = true;
                }
            });
        }
        return carInOppositeInLane;
    }
}

module.exports = {
    Car
}