const { FACING_LEFT, FACING_UP, FACING_RIGHT, FACING_DOWN } = require("../../../game-data/globals");
const { I_Junction } = require("./I_Junction");
const { TileSquare } = require("../../../helpers/TileSquare");

class Intersection extends I_Junction {
    constructor( pendingIntersections ) {
        super( );

        this.laneDepth = 2;
        this.initIntersectionFromPendingList( pendingIntersections );
        this.setLanes( );
        this.setTurns( );
    }

    get hasLeftUpTurn( ) { return this.leftFacingLane && this.upFacingLane; };
    get hasRightUpTurn( ) { return this.rightFacingLane && this.upFacingLane; };
    get hasLeftDownTurn( ) { return this.leftFacingLane && this.downFacingLane; };
    get hasRightDownTurn( ) { return this.rightFacingLane && this.downFacingLane; };

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
                this.core.leftColumn, this.core.topRow, 
                this.core.leftColumn + 1, this.core.topRow + 1
            ) );
        }
        if ( this.hasRightUpTurn ) {
            this.rightUpSquare = new TileSquare( this.getTilesFromCoreList(
                this.core.leftColumn, this.core.bottomRow, 
                this.core.leftColumn + 1, this.core.bottomRow - 1
            ) );
        }
        if ( this.hasLeftDownTurn ) {
            this.leftDownSquare = new TileSquare( this.getTilesFromCoreList(
                this.core.rightColumn, this.core.topRow, 
                this.core.rightColumn - 1, this.core.topRow + 1
            ) );
        }
        if ( this.hasRightDownTurn ) {
            this.rightDownSquare = new TileSquare( this.getTilesFromCoreList(
                this.core.rightColumn, this.core.bottomRow, 
                this.core.rightColumn - 1, this.core.bottomRow - 1
            ) );
        }
    }

    getTilesFromCoreList( col1, row1, col2, row2 ) {
        return this.core.tileList.filter( ( e ) => {
            return ( e.col == col1 || e.col == col2 ) 
            && ( e.row == row1 || e.row == row2 ) 
        });
    }
}

module.exports = {
    Intersection
}