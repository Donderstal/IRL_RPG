import { I_Junction } from "./I_Junction";
import { TileSquare } from "../../../helpers/TileSquare";
import { DirectionEnum } from "../../../enumerables/DirectionEnum";
import type { Road } from "./Road";

export class Intersection extends I_Junction {
    id: string;
    roadIds: string[];
    leftUpSquare: TileSquare;
    rightUpSquare: TileSquare;
    leftDownSquare: TileSquare;
    rightDownSquare: TileSquare;
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

    get hasLeftUpTurn( ) { return this.hasDirection(DirectionEnum.up) && this.hasDirection(DirectionEnum.left); };
    get hasRightUpTurn( ) { return this.hasDirection(DirectionEnum.up) && this.hasDirection(DirectionEnum.right); };
    get hasLeftDownTurn( ) { return this.hasDirection(DirectionEnum.down) && this.hasDirection(DirectionEnum.left); };
    get hasRightDownTurn( ) { return this.hasDirection(DirectionEnum.down) && this.hasDirection(DirectionEnum.right); };

    initIntersectionFromPendingList( pendingList: { roads: Road[], directions: DirectionEnum[], square: TileSquare }[] ) {
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

    setTurns(): void {
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

    getTilesFromCoreList( col1: number, row1: number, col2: number, row2: number ) {
        return this.core.tileList.filter( ( e ) => {
            return ( e.column === col1 || e.column === col2 ) 
            && ( e.row === row1 || e.row === row2 ) 
        });
    }

    getRoadById( id: string ): Road {
        return this.roads.filter((e)=>{return e.id == id;})[0];
    }

    getRoadByDirection( direction: DirectionEnum ): Road {
        return this.roads.filter( ( e ) =>{ return e.model.direction === direction; })[0];
    }

    getDirectionInLane( direction: DirectionEnum ): TileSquare {
        switch( direction ) {
            case DirectionEnum.left:
                return this.leftFacingInLane;
            case DirectionEnum.up:
                return this.upFacingInLane;
            case DirectionEnum.right:
                return this.rightFacingInLane;
            case DirectionEnum.down:
                return this.downFacingInLane;
        }
    }

    getDirectionOutLane( direction: DirectionEnum ): TileSquare {
        switch( direction ) {
            case DirectionEnum.left:
                return this.leftFacingOutLane;
            case DirectionEnum.up:
                return this.upFacingOutLane;
            case DirectionEnum.right:
                return this.rightFacingOutLane;
            case DirectionEnum.down:
                return this.downFacingOutLane;
        }
    }

    getIntersectingRoadIds( roadId: string ): string[] {
        const intersectingRoadIds = [];
        const road = this.getRoadById( roadId );
        if (road.model.direction === DirectionEnum.down || road.model.direction === DirectionEnum.up){
            if (this.hasDirection(DirectionEnum.right) && !this.directionEnds(DirectionEnum.right))
                intersectingRoadIds.push(this.rightFacingRoad.id);
                if (this.hasDirection(DirectionEnum.left) && !this.directionEnds(DirectionEnum.left))
                intersectingRoadIds.push(this.leftFacingRoad.id);
        }
        else if (road.model.direction === DirectionEnum.right || road.model.direction === DirectionEnum.left) {
            if (this.hasDirection(DirectionEnum.up) && !this.directionEnds(DirectionEnum.up))
                intersectingRoadIds.push(this.upFacingRoad.id);
                if (this.hasDirection(DirectionEnum.down) && !this.directionEnds(DirectionEnum.down))
                intersectingRoadIds.push(this.downFacingRoad.id);
        }
        return intersectingRoadIds;
    }
}