const { FACING_LEFT, FACING_UP, FACING_RIGHT, FACING_DOWN, GRID_BLOCK_PX } = require("../../../game-data/globals");
const { I_Junction } = require("./I_Junction");
const { TileSquare } = require("../../../helpers/TileSquare");
const globals = require("../../../game-data/globals");

class Intersection extends I_Junction {
    constructor( pendingIntersections, id ) {
        super( );

        this.id = id;
        this.laneDepth = 2;
        this.initIntersectionFromPendingList( pendingIntersections );
        this.setLanes( );
        this.setTurns( );
        this.roadIds = this.roads.map((e)=>{return e.id;});
    }

    get hasLeftUpTurn( ) { return this.leftFacingLane != false && this.upFacingLane != false; };
    get hasRightUpTurn( ) { return this.rightFacingLane != false && this.upFacingLane != false; };
    get hasLeftDownTurn( ) { return this.leftFacingLane != false && this.downFacingLane != false; };
    get hasRightDownTurn( ) { return this.rightFacingLane != false && this.downFacingLane != false; };

    get leftRoadEndsAtInterSection( ) { 
        return this.core.leftColumn == this.leftFacingRoad.endCol;
    }

    get upRoadEndsAtInterSection( ) { 
        return this.core.topRow == this.upFacingRoad.endRow;
    }

    get rightRoadEndsAtInterSection( ) { 
        return this.core.rightColumn == this.rightFacingRoad.endCol;
    }

    get downRoadEndsAtInterSection( ) { 
        return this.core.bottomRow == this.downFacingRoad.endRow;
    }

    roadDirectionEndsAtIntersection( direction ) {
        switch( direction ) {
            case FACING_LEFT:
                return this.leftRoadEndsAtInterSection;
            case FACING_UP:
                return this.upRoadEndsAtInterSection;
            case FACING_RIGHT:
                return this.rightRoadEndsAtInterSection;
            case FACING_DOWN:
                return this.downRoadEndsAtInterSection;
            default:
                console.log('direction ' + direction + ' not recognized' )
        }
    }

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
    }

    updateIntersectionStatus( ) {
        this.intersectionCars = [];
        Object.keys(this.openLanes).forEach( (key) => { 
            this.openLanes[key] = true;
        })

        this.checkForCarsOnIntersection( );
        this.setCarsToWaitIfLaneIsClosed( );
        this.checkIfCarsCanTurn( );
    }

    checkForCarsOnIntersection( ) {
        let leftCars = this.leftFacingLane ? this.leftFacingRoad.carsOnRoad : this.leftFacingLane;
        let upCars = this.upFacingLane ? this.upFacingRoad.carsOnRoad : this.upFacingLane;
        let rightCars = this.rightFacingLane ? this.rightFacingRoad.carsOnRoad : this.rightFacingLane;
        let downCars = this.downFacingLane ? this.downFacingRoad.carsOnRoad : this.downFacingLane;

        if (leftCars && (this.checkForCarsOnSquare(leftCars, this.leftFacingLane) || this.checkForCarsOnSquare(leftCars, this.core))) {
            this.closeLane( FACING_DOWN );
        }
        if (upCars && (this.checkForCarsOnSquare(upCars, this.upFacingLane) || this.checkForCarsOnSquare(upCars, this.core))) {
            this.closeLane( FACING_RIGHT );
        }
        if (rightCars && (this.checkForCarsOnSquare(rightCars, this.rightFacingLane) || this.checkForCarsOnSquare(rightCars, this.core))) {
            this.closeLane( FACING_UP );
        }
        if (downCars && (this.checkForCarsOnSquare(downCars, this.downFacingLane) || this.checkForCarsOnSquare(downCars, this.core))) {
            this.closeLane( FACING_LEFT );              
        }
    }

    setCarsToWaitIfLaneIsClosed( ) {
        this.intersectionCars.forEach( ( car ) => {
            if ( this.leftFacingLane && car.direction == FACING_LEFT && !this.core.spriteIsInTileSquare(car)
                && this.leftFacingLane.spriteIsInTileSquare(car) && this.squareHasNoCars(this.downFacingRoad.carsOnRoad, this.leftDownSquare) && !this.openLanes[FACING_LEFT]) {
                car.setWaitAtIntersection( );
            }
            else if ( this.upFacingLane && car.direction == FACING_UP && !this.core.spriteIsInTileSquare(car)
                && this.upFacingLane.spriteIsInTileSquare(car) && this.squareHasNoCars(this.leftFacingRoad.carsOnRoad, this.leftUpSquare) && !this.openLanes[FACING_UP]) {
                car.setWaitAtIntersection( );
            }
            else if ( this.rightFacingLane && car.direction == FACING_RIGHT && !this.core.spriteIsInTileSquare(car)
                && this.rightFacingLane.spriteIsInTileSquare(car) && this.squareHasNoCars(this.upFacingRoad.carsOnRoad, this.rightUpSquare) && !this.openLanes[FACING_RIGHT]) {
                car.setWaitAtIntersection( );
            }
            else if ( this.downFacingLane && car.direction == FACING_DOWN && !this.core.spriteIsInTileSquare(car)
                && this.downFacingLane.spriteIsInTileSquare(car) && this.squareHasNoCars(this.rigfhtFacingRoad.carsOnRoad, this.rightDownSquare) && !this.openLanes[FACING_DOWN]) {
                car.setWaitAtIntersection( ); 
            }
            else {
                car.unsetWaitAtIntersection( );
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
            globals.GAME.BACK.ctx.fillStyle = 'yellow';
            globals.GAME.BACK.ctx.fillRect(
                this.leftUpSquare.left, this.leftUpSquare.top, GRID_BLOCK_PX * 2, GRID_BLOCK_PX * 2
            );
        }
        if ( this.hasRightUpTurn ) {
            this.rightUpSquare = new TileSquare( this.getTilesFromCoreList(
                this.core.rightColumn, this.core.bottomRow, 
                this.core.rightColumn - 1, this.core.bottomRow - 1
            ) );
            globals.GAME.BACK.ctx.fillStyle = 'red';
            globals.GAME.BACK.ctx.fillRect(
                this.rightUpSquare.left, this.rightUpSquare.top, GRID_BLOCK_PX * 2, GRID_BLOCK_PX * 2
            );
        }
        if ( this.hasLeftDownTurn ) {
            this.leftDownSquare = new TileSquare( this.getTilesFromCoreList(
                this.core.leftColumn, this.core.topRow, 
                this.core.leftColumn + 1, this.core.topRow + 1
            ) );
            globals.GAME.BACK.ctx.fillStyle = 'pink';
            globals.GAME.BACK.ctx.fillRect(
                this.leftDownSquare.left, this.leftDownSquare.top, GRID_BLOCK_PX * 2, GRID_BLOCK_PX * 2
            );
        }
        if ( this.hasRightDownTurn ) {
            this.rightDownSquare = new TileSquare( this.getTilesFromCoreList(
                this.core.leftColumn, this.core.bottomRow, 
                this.core.leftColumn + 1, this.core.bottomRow - 1
            ) );
            globals.GAME.BACK.ctx.fillStyle = 'purple';
            globals.GAME.BACK.ctx.fillRect(
                this.rightDownSquare.left, this.rightDownSquare.top, GRID_BLOCK_PX * 2, GRID_BLOCK_PX * 2
            );
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
                    else if ( this.hasLeftDownTurn && car.isOnSquare( this.leftDownSquare ) && car.nextRoadId == this.downFacingRoad.id 
                    && this.squareHasNoCars(this.rightFacingRoad.carsOnRoad, this.rightDownSquare) && this.squareHasNoCars(this.rightFacingRoad.carsOnRoad, this.rightFacingLane)) {
                        car.unsetWaitAtIntersection( );
                        car.turnToDirection(FACING_DOWN, this.downFacingRoad, this.leftDownSquare,this.id)
                    }
                    else if ( car.nextRoadId == this.upFacingRoad.id ) {
                        car.setWaitAtIntersection( );
                    }
                    break;
                case FACING_UP:
                    if ( this.hasRightUpTurn && car.isOnSquare( this.rightUpSquare ) && car.nextRoadId == this.rightFacingRoad.id) {
                        car.turnToDirection(FACING_RIGHT, this.rightFacingRoad, this.rightUpSquare,this.id);
                    }
                    else if ( this.hasLeftUpTurn && car.isOnSquare( this.leftUpSquare ) && car.nextRoadId == this.leftFacingRoad.id 
                    && this.squareHasNoCars(this.downFacingRoad.carsOnRoad, this.leftDownSquare) && this.squareHasNoCars(this.downFacingRoad.carsOnRoad, this.downFacingLane)) {
                        car.unsetWaitAtIntersection( );
                        car.turnToDirection(FACING_LEFT, this.leftFacingRoad, this.leftUpSquare,this.id);
                    }
                    else if ( car.nextRoadId == this.rightFacingRoad.id ){
                        car.setWaitAtIntersection( );
                    }
                    break;
                case FACING_RIGHT:
                    if ( this.hasRightDownTurn && car.isOnSquare( this.rightDownSquare ) && car.nextRoadId == this.downFacingRoad.id) {
                        car.turnToDirection(FACING_DOWN, this.downFacingRoad, this.rightDownSquare,this.id)
                    }
                    else if ( this.hasRightUpTurn && car.isOnSquare( this.rightUpSquare ) && car.nextRoadId == this.upFacingRoad.id 
                    && this.squareHasNoCars(this.leftFacingRoad.carsOnRoad, this.leftUpSquare) && this.squareHasNoCars(this.leftFacingRoad.carsOnRoad, this.leftFacingLane)) {
                        car.unsetWaitAtIntersection( );
                        car.turnToDirection(FACING_UP, this.upFacingRoad, this.rightUpSquare,this.id)
                    }
                    else if ( car.nextRoadId == this.upFacingRoad.id ) {
                        car.setWaitAtIntersection( );
                    }
                    break;
                case FACING_DOWN:
                    if ( this.hasLeftDownTurn && car.isOnSquare( this.leftDownSquare ) && car.nextRoadId == this.leftFacingRoad.id) {
                        car.turnToDirection(FACING_LEFT, this.leftFacingRoad, this.leftDownSquare,this.id);
                    }
                    else if ( this.hasRightDownTurn && car.isOnSquare( this.rightDownSquare ) && car.nextRoadId == this.rightFacingRoad.id 
                    && this.squareHasNoCars(this.upFacingRoad.carsOnRoad, this.rightUpSquare) && this.squareHasNoCars(this.upFacingRoad.carsOnRoad, this.upFacingLane)) {
                        car.unsetWaitAtIntersection( );
                        car.turnToDirection(FACING_RIGHT, this.rightFacingRoad, this.rightDownSquare,this.id);
                    }
                    else if ( car.nextRoadId == this.rightFacingRoad.id ) {
                        car.setWaitAtIntersection( );
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

    getIntersectingRoadIds( roadId ) {
        let intersectingRoadIds = [];
        const road = this.getRoadById( roadId );
        if (road.direction == FACING_DOWN | road.direction == FACING_UP){
            if (this.rightFacingLane && !this.rightRoadEndsAtInterSection)
                intersectingRoadIds.push(this.rightFacingRoad.id);
            if (this.leftFacingLane && !this.leftRoadEndsAtInterSection)
                intersectingRoadIds.push(this.leftFacingRoad.id);
        }
        else if (road.direction == FACING_RIGHT | road.direction == FACING_LEFT) {
            if (this.upFacingLane && !this.upRoadEndsAtInterSection )
                intersectingRoadIds.push(this.upFacingRoad.id);
            if (this.downFacingLane && !this.downRoadEndsAtInterSection)
                intersectingRoadIds.push(this.downFacingRoad.id);
        }
        return intersectingRoadIds;
    }
}

module.exports = {
    Intersection
}