import { registerNewContract } from '../../contracts/contractRegistry';
import { DestinationType } from '../../enumerables/DestinationType';
import { RoadAlignmentEnum } from '../../enumerables/RoadAlignmentEnum';
import { getCreateSpriteContract } from '../../factories/contractFactory';
import { Counter } from '../../helpers/Counter';
import { getUniqueId, isInArray } from '../../helpers/utilFunctions';
import type { CanvasObjectModel } from '../../models/CanvasObjectModel';
import type { DirectionXy } from '../../models/DirectionXyModel';
import type { RoadModel } from '../../models/RoadModel';
import { initializeSpriteMovement } from '../modules/moduleSetter';
import { getSpriteById } from '../modules/sprites/spriteGetter';
import { getSpriteIds } from '../modules/sprites/spriteRegistry';
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
        if ( this.carCounter.countAndCheckLimit() ) {
            this.spawnCarWithRandomDestination();
        }
        return null;
    }

    spawnCarWithRandomDestination(): void {
        const validRoads = this.roads.filter( ( e ) => { return e.hasUnoccupiedStart(); } );
        const randomRoad = validRoads[Math.floor( Math.random() * validRoads.length )];
        const randomPath = randomRoad.getRandomPath();

        const carModel = randomRoad.getRandomCarObjectModel();
        const id = getUniqueId( getSpriteIds() );
        carModel.id = id;

        const createSpriteContract = getCreateSpriteContract( carModel );
        registerNewContract( createSpriteContract );

        const sprite = getSpriteById( id );
        initializeSpriteMovement( randomPath, DestinationType.randomGeneratedSprite, sprite );
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
            const possibleTurnRoadIds = Object.keys( possibleTurns ).filter( ( e ) => { return !isInArray( visitedRoads, e ); });

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

    findPathFromDirectionXy( directionXy: DirectionXy ): DirectionXy[] {
        const activeRoad = this.getRoadById( directionXy.id );
        const possiblePaths = activeRoad.paths.map( ( path ) => {
            const index = path.findIndex( step => step.x === directionXy.x && step.y === directionXy.y && step.direction === directionXy.direction );
            if ( index === - 1 ) return null;
            return path.slice( index );
        } ).filter( ( path ) => { return path !== null && path.length > 1 } );
        return possiblePaths[Math.floor( Math.random() * possiblePaths.length )]
    }
}