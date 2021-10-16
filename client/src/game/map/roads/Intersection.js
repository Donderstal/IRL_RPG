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

    closeLane( direction ) {
        this.openLanes[direction] = false;
    }

    openLane( direction ) {
        this.openLanes[direction] = true;
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
                    if ( this.hasLeftDownTurn && car.isOnSquare( this.leftDownSquare )) {
                        car.turnToDirection(FACING_DOWN, this.downFacingRoad, this.leftDownSquare,this.id)
                    }
                    if ( this.hasLeftUpTurn && car.isOnSquare( this.leftUpSquare )) {
                        car.turnToDirection(FACING_UP, this.upFacingRoad, this.leftUpSquare,this.id)
                    }
                    break;
                case FACING_UP:
                    if ( this.hasLeftUpTurn && car.isOnSquare( this.leftUpSquare )) {
                        car.turnToDirection(FACING_LEFT, this.leftFacingRoad, this.leftUpSquare,this.id);
                    }
                    if ( this.hasRightUpTurn && car.isOnSquare( this.rightUpSquare )) {
                        car.turnToDirection(FACING_RIGHT, this.rightFacingRoad, this.rightUpSquare,this.id);
                    }
                    break;
                case FACING_RIGHT:
                    if ( this.hasRightDownTurn && car.isOnSquare( this.rightDownSquare )) {
                        car.turnToDirection(FACING_DOWN, this.downFacingRoad, this.rightDownSquare,this.id)
                    }
                    if ( this.hasRightUpTurn && car.isOnSquare( this.rightUpSquare )) {
                        car.turnToDirection(FACING_UP, this.upFacingRoad, this.rightUpSquare,this.id)
                    }
                    break;
                case FACING_DOWN:
                    if ( this.hasLeftDownTurn && car.isOnSquare( this.leftDownSquare )) {
                        car.turnToDirection(FACING_LEFT, this.leftFacingRoad, this.leftDownSquare,this.id);
                    }
                    if ( this.hasRightDownTurn && car.isOnSquare( this.rightDownSquare )) {
                        car.turnToDirection(FACING_RIGHT, this.rightFacingRoad, this.rightDownSquare,this.id);
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
            if (this.rightFacingLane)
                intersectingRoadIds.push(this.rightFacingRoad.id);
            if (this.leftFacingLane)
                intersectingRoadIds.push(this.leftFacingRoad.id);
        }
        else if (road.direction == FACING_RIGHT | road.direction == FACING_LEFT) {
            if (this.upFacingLane)
                intersectingRoadIds.push(this.upFacingRoad.id);
            if (this.downFacingLane)
                intersectingRoadIds.push(this.downFacingRoad.id);
        }
        return intersectingRoadIds;
    }
}

module.exports = {
    Intersection
}