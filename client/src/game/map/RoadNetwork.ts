import { RoadAlignmentEnum } from '../../enumerables/RoadAlignmentEnum';
import { Counter } from '../../helpers/Counter';
import { getUniqueId } from '../../helpers/utilFunctions';
import type { CanvasObjectModel } from '../../models/CanvasObjectModel';
import type { CellPosition } from '../../models/CellPositionModel';
import type { DirectionXy } from '../../models/DirectionXyModel';
import type { RoadModel } from '../../models/RoadModel';
import { Road } from './roads/Road';

export class RoadNetwork {
    canvas: OffscreenCanvas;
    roads: Road[];
    roadIds: string[];
    carCounter: Counter;
    constructor( roadModels: RoadModel[], canvas: OffscreenCanvas, carSpawnRate: number ) {
        this.canvas = canvas;

        this.roads = [];
        this.roadIds = [];

        this.initRoads( roadModels );
        this.registerIntersectingRoads();
        this.roads.forEach( ( e ) => { this.setRoadPaths( e ); } )
        this.carCounter = new Counter( carSpawnRate, true );
    }

    get horizontalRoads() { return this.roads.filter( ( e ) => { return e.model.alignment === RoadAlignmentEnum.horizontal; } ) }
    get verticalRoads() { return this.roads.filter( ( e ) => { return e.model.alignment === RoadAlignmentEnum.vertical; } ) }

    getRoadById( id: string ): Road {
        return this.roads.filter((e) => {return e.id==id;})[0];
    }

    initRoads( roads: RoadModel[] ): void {
        roads.forEach( ( road ) => {
            const id = getUniqueId( this.roadIds );
            const roadInstance =  new Road( road, id )
            this.roads.push( roadInstance );
            this.roadIds.push( id );
        });
    }

    handleCarCounter(): CanvasObjectModel {
        return null;
    }

    getValidCarStart(): CellPosition {
        const validRoads = this.roads.filter( ( e ) => { return e.hasUnoccupiedStart(); } );
        const validStarts = validRoads.map( ( e ) => { return e.getRoadStartPosition(); } );

        return validStarts[Math.floor( Math.random() * validStarts.length )];
    }

    generateCar( road: Road ): CanvasObjectModel {
        const carObjectModel = road.getRandomCarObjectModel();
        const startLocation = this.getValidCarStart();
        if ( startLocation === null || startLocation === undefined ) return;

        return carObjectModel;
    }

    registerIntersectingRoads() {
        this.roads.forEach( ( currentRoad: Road ) => {
            const rightAngledRoads = currentRoad.model.alignment === RoadAlignmentEnum.horizontal ? this.verticalRoads : this.horizontalRoads;
            const possibleIntersectingRoads = rightAngledRoads.filter( ( e: Road ) => { return !e.intersectingRoadIds.includes(currentRoad.id); })
            possibleIntersectingRoads.forEach( ( rightAngledRoad: Road ) => { this.registerIntersectionIfRoadsIntersect( currentRoad, rightAngledRoad ); } );
        } );
    }

    registerIntersectionIfRoadsIntersect( baseRoad: Road, possibleIntersector: Road ) {
        if ( !this.roadsIntersect( baseRoad, possibleIntersector ) ) return;
        baseRoad.registerIntersectingRoad( possibleIntersector );
        possibleIntersector.registerIntersectingRoad( baseRoad );
    }

    roadsIntersect( roadOne: Road, roadTwo: Road ): boolean {
        const horizontalRoad = roadOne.model.alignment === RoadAlignmentEnum.horizontal ? roadOne : roadTwo;
        const verticalRoad = roadOne.model.alignment === RoadAlignmentEnum.vertical ? roadOne : roadTwo;
        return ( Math.min( horizontalRoad.model.primaryColumn, horizontalRoad.model.secondaryColumn ) <= verticalRoad.model.primaryColumn )
            && ( Math.max( horizontalRoad.model.primaryColumn, horizontalRoad.model.secondaryColumn ) >= verticalRoad.model.secondaryColumn )
            && ( Math.min( verticalRoad.model.primaryRow, verticalRoad.model.secondaryRow ) <= horizontalRoad.model.primaryRow )
            && ( Math.max( verticalRoad.model.primaryRow, verticalRoad.model.secondaryRow ) >= horizontalRoad.model.secondaryRow );
    }

    setRoadPaths( road: Road ): void {
        const roadPaths = []
        const visitedRoads = []
        let pathRoadIdStack: string[][] = [ [ road.id ] ]
        let pathXyStack: DirectionXy[][] = [ [ road.startingPosition.getDirectionXy() ] ];

        while ( pathRoadIdStack.length > 0 && pathXyStack.length > 0 ) {
            const currentIdPath = pathRoadIdStack.shift();
            const currentXyPath = pathXyStack.shift();

            const latestRoadIdInPath = currentIdPath[currentIdPath.length - 1];
            const latestXyInPath = currentXyPath[currentXyPath.length - 1];

            const latestStepRoad = this.getRoadById( latestRoadIdInPath );
            const possibleTurns = latestStepRoad.getPossibleRoadTurnsFromXy( latestXyInPath );
            const possibleTurnRoadIds = Object.keys( possibleTurns ).filter( ( e ) => { return visitedRoads.indexOf( latestRoadIdInPath ) == -1 });

            possibleTurnRoadIds.forEach( ( e ) => {
                const otherRoad = this.getRoadById( e );
                const fromTurnPosition = otherRoad.turnFromIntersectingRoadPositions[latestRoadIdInPath];
                pathRoadIdStack.push( [...currentIdPath, e] );
                pathXyStack.push( [...currentXyPath, possibleTurns[e].getDirectionXy(), fromTurnPosition.getDirectionXy() ] );
            } );

            roadPaths.push( [...currentXyPath, latestStepRoad.endPosition.getDirectionXy()] );
            visitedRoads.push( latestRoadIdInPath )
        }
        road.paths = roadPaths;
    }
}