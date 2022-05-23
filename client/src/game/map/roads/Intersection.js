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
        this.roadIds = this.roads.map( ( e ) => { return e.id; } );
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
    }

    closeLane( direction ) {
        this.openLanes[direction] = false;
    }

    openLane( direction ) {
        this.openLanes[direction] = true;
    }

    setTurns() {
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