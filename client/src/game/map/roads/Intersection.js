const { FACING_LEFT, FACING_UP, FACING_RIGHT, FACING_DOWN, STATE_WAITING, STATE_MOVING } = require("../../../game-data/globals");
const { I_Junction } = require("./I_Junction");
const { TileSquare } = require("../../../helpers/TileSquare");

class Intersection extends I_Junction {
    constructor( pendingIntersections, id ) {
        super( );

        this.id = id;
        this.laneDepth = 2;
        this.initIntersectionFromPendingList( pendingIntersections );
        this.checkIfRoadsEndOrStartAtIntersection( );
        this.setLanes( );
        this.setTurns( );
        this.roadIds = this.roads.map((e)=>{return e.id;});
    }

    get hasLeftUpTurn( ) { return this.hasDirection(FACING_UP) && this.hasDirection(FACING_LEFT); };
    get hasRightUpTurn( ) { return this.hasDirection(FACING_UP) && this.hasDirection(FACING_RIGHT); };
    get hasLeftDownTurn( ) { return this.hasDirection(FACING_DOWN) && this.hasDirection(FACING_LEFT); };
    get hasRightDownTurn( ) { return this.hasDirection(FACING_DOWN) && this.hasDirection(FACING_RIGHT); };

    initIntersectionFromPendingList( pendingList ) {
        let tileList = [];

        pendingList.forEach( ( pending ) => {
            pending.directions.forEach( ( e ) => {
                if ( !(this.directions.indexOf( e ) > -1) ) {
                    this.directions.push(e);
                }
            }); 
            pending.roads.forEach( ( road ) => {
                if ( !(this.roads.indexOf( road ) > -1) ) {
                    this.roads.push(road);
                }
            });
            tileList = [ ...pending.square.tileList, ...tileList ]
        });

        this.core = new TileSquare( tileList );
        this.core.draw('white')
    }

    updateIntersectionStatus( ) {
        this.intersectionCars = [];
        Object.keys(this.openLanes).forEach( (key) => { 
            this.openLanes[key] = true;
        })

        this.checkForCarsOnIntersection( );
        this.intersectionCars.forEach((car)=>{
            car.isOnIntersection(this.id, this.roadIds);
        })
    }

    checkForCarsOnIntersection( ) {
        let leftCars = this.hasDirection(FACING_LEFT) ? this.leftFacingRoad.carsOnRoad : false;
        let upCars = this.hasDirection(FACING_UP) ? this.upFacingRoad.carsOnRoad : false;
        let rightCars = this.hasDirection(FACING_RIGHT) ? this.rightFacingRoad.carsOnRoad : false;
        let downCars = this.hasDirection(FACING_DOWN) ? this.downFacingRoad.carsOnRoad : false;

        if (leftCars && this.leftFacingInLane) {
            this.intersectionCars.push( ...leftCars.filter((car) => {return this.carIsOnIntersection(car, this.leftFacingInLane)}));
        }
        if (upCars && this.upFacingInLane) {
            this.intersectionCars.push( ...upCars.filter((car) => {return this.carIsOnIntersection(car, this.upFacingInLane)}));
        }
        if (rightCars && this.rightFacingInLane) {
            this.intersectionCars.push( ...rightCars.filter((car) => {return this.carIsOnIntersection(car, this.rightFacingInLane)}));
        }
        if (downCars && this.downFacingInLane) {
            this.intersectionCars.push( ...downCars.filter((car) => {return this.carIsOnIntersection(car, this.downFacingInLane)}));       
        }
    }

    carIsOnIntersection( car, lane ) {
        return this.checkForCarsOnSquare([car], lane) || this.checkForCarsOnSquare([car], this.core)
    }

    setCarsToWaitIfLaneIsClosed( ) {
        this.intersectionCars.forEach( ( car ) => {
            if (this.leftFacingInLane && car.direction == FACING_LEFT && !this.core.spriteIsInTileSquare(car)
                && this.leftFacingInLane.spriteIsInTileSquare(car) && (this.downFacingRoad != undefined && !this.squareHasNoCars(this.downFacingRoad.carsOnRoad, this.leftDownSquare))) {
                car.State.addToPendingStateChanges(STATE_WAITING);
            }
            else if (this.upFacingInLane && car.direction == FACING_UP && !this.core.spriteIsInTileSquare(car)
                && this.upFacingInLane.spriteIsInTileSquare(car) && (this.leftFacingRoad != undefined && !this.squareHasNoCars(this.leftFacingRoad.carsOnRoad, this.leftUpSquare))) {
                car.State.addToPendingStateChanges(STATE_WAITING);
            }
            else if (this.rightFacingInLane && car.direction == FACING_RIGHT && !this.core.spriteIsInTileSquare(car)
                && this.rightFacingInLane.spriteIsInTileSquare(car) && (this.upFacingRoad != undefined && !this.squareHasNoCars(this.upFacingRoad.carsOnRoad, this.rightUpSquare))) {
                car.State.addToPendingStateChanges(STATE_WAITING);
            }
            else if (this.downFacingInLane && car.direction == FACING_DOWN && !this.core.spriteIsInTileSquare(car)
                && this.downFacingInLane.spriteIsInTileSquare(car) && ( this.rightFacingRoad != undefined && !this.squareHasNoCars(this.rightFacingRoad.carsOnRoad, this.rightDownSquare))) {
                car.State.addToPendingStateChanges(STATE_WAITING);
            }
            else {
                car.State.addToPendingStateChanges(STATE_MOVING);
            }
        });
    }

    closeLane( direction ) {
        this.openLanes[direction] = false;
    }

    openLane( direction ) {
        this.openLanes[direction] = true;
    }

    squareHasNoCars( cars, squareToCross ) {
        let canTurn = true;
        if ( cars == undefined ) {
            return canTurn;
        }
        cars.forEach( (e) => {
            if ( e.isOnSquare( squareToCross )) {
                canTurn = false;
            }
        })
        return canTurn;
    }

    setTurns( ) {
        if ( this.hasLeftUpTurn ) {
            this.leftUpSquare = new TileSquare( this.getTilesFromCoreList(
                this.core.rightColumn, this.core.topRow, 
                this.core.rightColumn - 1, this.core.topRow + 1
            ) );
        }
        if ( this.hasRightUpTurn ) {
            this.rightUpSquare = new TileSquare( this.getTilesFromCoreList(
                this.core.rightColumn, this.core.bottomRow, 
                this.core.rightColumn - 1, this.core.bottomRow - 1
            ) );
        }
        if ( this.hasLeftDownTurn ) {
            this.leftDownSquare = new TileSquare( this.getTilesFromCoreList(
                this.core.leftColumn, this.core.topRow, 
                this.core.leftColumn + 1, this.core.topRow + 1
            ) );
        }
        if ( this.hasRightDownTurn ) {
            this.rightDownSquare = new TileSquare( this.getTilesFromCoreList(
                this.core.leftColumn, this.core.bottomRow, 
                this.core.leftColumn + 1, this.core.bottomRow - 1
            ) );
        }
    }

    getTilesFromCoreList( col1, row1, col2, row2 ) {
        return this.core.tileList.filter( ( e ) => {
            return ( e.col == col1 || e.col == col2 ) 
            && ( e.row == row1 || e.row == row2 ) 
        });
    }

    checkIfCarsCanTurn( ) {
        const turnableCars = this.intersectionCars.filter( (car) => {return car.crossedIntersectionIds.indexOf(this.id) == -1})
        turnableCars.forEach( ( car ) => {
            switch( car.direction ) {
                case FACING_LEFT:
                    if ( this.hasLeftUpTurn && car.isOnSquare( this.leftUpSquare ) && car.nextRoadId == this.upFacingRoad.id) {
                        car.turnToDirection(FACING_UP, this.upFacingRoad, this.leftUpSquare,this.id)
                    }
                    else if ( this.hasLeftDownTurn && car.isOnSquare( this.leftDownSquare ) && car.nextRoadId == this.downFacingRoad.id ) {
                        if (this.rightFacingRoad != undefined && !(this.squareHasNoCars(this.rightFacingRoad.carsOnRoad, this.rightDownSquare) || this.squareHasNoCars(this.rightFacingRoad.carsOnRoad, this.rightFacingInLane))) {
                            car.State.addToPendingStateChanges(STATE_WAITING);
                        }
                        else {
                            car.State.addToPendingStateChanges(STATE_MOVING);
                            car.turnToDirection(FACING_DOWN, this.downFacingRoad, this.leftDownSquare,this.id)
                        }
                    }
                    break;
                case FACING_UP:
                    if ( this.hasRightUpTurn && car.isOnSquare( this.rightUpSquare ) && car.nextRoadId == this.rightFacingRoad.id) {
                        car.turnToDirection(FACING_RIGHT, this.rightFacingRoad, this.rightUpSquare,this.id);
                    }
                    else if (this.hasLeftUpTurn && car.isOnSquare( this.leftUpSquare ) && car.nextRoadId == this.leftFacingRoad.id) {
                        if (this.downFacingRoad != undefined && !(this.squareHasNoCars(this.downFacingRoad.carsOnRoad, this.leftDownSquare) || this.squareHasNoCars(this.downFacingRoad.carsOnRoad, this.downFacingInLane))) {
                            car.State.addToPendingStateChanges(STATE_WAITING);
                        }
                        else {
                            car.State.addToPendingStateChanges(STATE_MOVING);
                            car.turnToDirection(FACING_LEFT, this.leftFacingRoad, this.leftUpSquare,this.id);
                        }
                    }
                    break;
                case FACING_RIGHT:
                    if ( this.hasRightDownTurn && car.isOnSquare( this.rightDownSquare ) && car.nextRoadId == this.downFacingRoad.id) {
                        car.turnToDirection(FACING_DOWN, this.downFacingRoad, this.rightDownSquare,this.id)
                    }
                    else if (this.hasRightUpTurn && car.isOnSquare( this.rightUpSquare ) && car.nextRoadId == this.upFacingRoad.id) {
                        if (this.leftFacingRoad != undefined && !(this.squareHasNoCars(this.leftFacingRoad.carsOnRoad, this.leftUpSquare) || this.squareHasNoCars(this.leftFacingRoad.carsOnRoad, this.leftFacingInLane))) {
                            car.State.addToPendingStateChanges(STATE_WAITING);
                        }
                        else {
                            car.State.addToPendingStateChanges(STATE_MOVING);
                            car.turnToDirection(FACING_UP, this.upFacingRoad, this.rightUpSquare,this.id)
                        }
                    }
                    break;
                case FACING_DOWN:
                    if ( this.hasLeftDownTurn && car.isOnSquare( this.leftDownSquare ) && car.nextRoadId == this.leftFacingRoad.id) {
                        car.turnToDirection(FACING_LEFT, this.leftFacingRoad, this.leftDownSquare,this.id);
                    }
                    else if (this.hasRightDownTurn && car.isOnSquare( this.rightDownSquare ) && car.nextRoadId == this.rightFacingRoad.id ) {
                        if (this.upFacingRoad != undefined && !(this.squareHasNoCars(this.upFacingRoad.carsOnRoad, this.rightUpSquare) || this.squareHasNoCars(this.upFacingRoad.carsOnRoad, this.upFacingInLane))) {
                            car.State.addToPendingStateChanges(STATE_WAITING);
                        }
                        else {
                            car.State.addToPendingStateChanges(STATE_MOVING);
                            car.turnToDirection(FACING_RIGHT, this.rightFacingRoad, this.rightDownSquare,this.id);
                        }
                    }
                    break;
                default:
                    console.log("direction " + car.direction + " not recognized");
            }
        });
    }

    getRoadById( id ) {
        return this.roads.filter((e)=>{return e.id == id;})[0];
    }

    getRoadByDirection( direction ) {
        return this.roads.filter((e)=>{return e.direction== direction;})[0];
    }

    getDirectionInLane( direction ) {
        switch( direction ) {
            case FACING_LEFT:
                return this.leftFacingInLane;
            case FACING_UP:
                return this.upFacingInLane;
            case FACING_RIGHT:
                return this.rightFacingInLane;
            case FACING_DOWN:
                return this.downFacingInLane;
        }
    }

    getDirectionOutLane( direction ) {
        switch( direction ) {
            case FACING_LEFT:
                return this.leftFacingOutLane;
            case FACING_UP:
                return this.upFacingOutLane;
            case FACING_RIGHT:
                return this.rightFacingOutLane;
            case FACING_DOWN:
                return this.downFacingOutLane;
        }
    }

    getTurningSquare( currentDirection, nextDirection ) {
        if ( (currentDirection == FACING_LEFT && nextDirection == FACING_UP) 
        || (currentDirection == FACING_UP && nextDirection == FACING_LEFT)) {
            return this.leftUpSquare;
        }
        else if ( (currentDirection == FACING_LEFT && nextDirection == FACING_DOWN) 
        || (currentDirection == FACING_DOWN && nextDirection == FACING_LEFT)) {
            return this.leftDownSquare;
        }
        else if ( (currentDirection == FACING_RIGHT && nextDirection == FACING_UP) 
        || (currentDirection == FACING_UP && nextDirection == FACING_RIGHT)) {
            return this.rightUpSquare;
        }
        else if ( (currentDirection == FACING_RIGHT && nextDirection == FACING_DOWN) 
        || (currentDirection == FACING_DOWN && nextDirection == FACING_RIGHT)) {
            return this.rightDownSquare;
        }
        return false;
    }

    getIntersectingRoadIds( roadId ) {
        let intersectingRoadIds = [];
        const road = this.getRoadById( roadId );
        if (road.direction == FACING_DOWN || road.direction == FACING_UP){
            if (this.hasDirection(FACING_RIGHT) && !this.directionEnds(FACING_RIGHT))
                intersectingRoadIds.push(this.rightFacingRoad.id);
                if (this.hasDirection(FACING_LEFT) && !this.directionEnds(FACING_LEFT))
                intersectingRoadIds.push(this.leftFacingRoad.id);
        }
        else if (road.direction == FACING_RIGHT || road.direction == FACING_LEFT) {
            if (this.hasDirection(FACING_UP) && !this.directionEnds(FACING_UP))
                intersectingRoadIds.push(this.upFacingRoad.id);
                if (this.hasDirection(FACING_DOWN) && !this.directionEnds(FACING_DOWN))
                intersectingRoadIds.push(this.downFacingRoad.id);
        }
        return intersectingRoadIds;
    }
}

module.exports = {
    Intersection
}