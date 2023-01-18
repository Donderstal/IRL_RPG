import { DirectionEnum } from '../../enumerables/DirectionEnum';
import { Counter } from '../../helpers/Counter';
import { getValidCarDestination } from '../../helpers/roadPathfindingHelpers';
import { TileSquare } from '../../helpers/TileSquare';
import { getUniqueId } from '../../helpers/utilFunctions';
import type { CanvasObjectModel } from '../../models/CanvasObjectModel';
import type { CellPosition } from '../../models/CellPositionModel';
import type { RoadModel } from '../../models/RoadModel';
import { getBackSpritesGrid } from '../canvas/canvasGetter';
import { Intersection } from './roads/Intersection';
import { Road } from './roads/Road';

export class RoadNetwork {
    canvas: OffscreenCanvas;

    roads: Road[];
    roadIds: string[];
    intersections: Intersection[];
    intersectionIds: string[];
    roadDestinations: CellPosition[];
    carCounter: Counter;
    pendingIntersections: { roads: Road[]; roadIds: string[]; directions: DirectionEnum[]; square: TileSquare }[]
    pendingCrossings: { road: Road; square: TileSquare; location: CellPosition[] }[]
    constructor( roads: RoadModel[], canvas: OffscreenCanvas, carSpawnRate: number ) {
        this.canvas = canvas;

        this.roads = [];
        this.roadIds = [];
        this.roadDestinations = [];
        this.initRoads( roads );

        this.pendingIntersections = [];
        this.intersections = [];
        this.intersectionIds = [];
        this.setIntersections( );

        this.pendingCrossings = [];
        this.carCounter = new Counter( carSpawnRate, true );
    }

    getRoadById( id: string ): Road {
        return this.roads.filter((e) => {return e.id==id;})[0];
    }

    getIntersectionById( id: string ): Intersection {
        return this.intersections.filter((e) => {return e.id==id;})[0];
    }

    areItemsInList( list: any[], item1: any, item2: any ): boolean {
        return list.indexOf( item1 ) > -1 && list.indexOf( item2 ) > -1
    }

    initRoads( roads: RoadModel[] ): void {
        roads.forEach( ( road ) => {
            const id = getUniqueId( this.roadIds );
            const roadInstance =  new Road( road, id )
            this.roads.push( roadInstance );
            this.roadIds.push( id );
            this.roadDestinations.push( roadInstance.getRoadEndPosition() );
        });
    }

    handleCarCounter(): CanvasObjectModel {
        if ( this.carCounter.countAndCheckLimit() ) {
            const validRoads = this.roads.filter( ( e ) => { return e.model.hasStart; } );
            const randomRoad = validRoads[Math.floor( Math.random() * validRoads.length )];
            return this.generateCar( randomRoad );
        }
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

        const destination = getValidCarDestination( startLocation, road );
        if ( destination !== null && destination !== undefined ) {
            carObjectModel.destination = destination;
        }
        return carObjectModel;
    }

    roadsIntersect( horizontalRoad: Road, verticalRoad: Road ): boolean {
        return ( Math.min( horizontalRoad.model.primaryColumn, horizontalRoad.model.secondaryColumn ) <= verticalRoad.model.primaryColumn )
            && ( Math.max( horizontalRoad.model.primaryColumn, horizontalRoad.model.secondaryColumn ) >= verticalRoad.model.secondaryColumn )
            && ( Math.min( verticalRoad.model.primaryRow, verticalRoad.model.secondaryRow ) <= horizontalRoad.model.primaryRow )
            && ( Math.max( verticalRoad.model.primaryRow, verticalRoad.model.secondaryRow ) >= horizontalRoad.model.secondaryRow );
    }

    setIntersections( ): void {
        this.roads.forEach( ( e ) => { 
            let currentRoad = e;
            let otherRoads = this.roads.filter( ( e ) => { return e.model.alignment != currentRoad.model.alignment; })
            otherRoads.forEach( ( otherRoad ) => {
                if ( this.roadsIntersect( currentRoad.isHorizontal ? currentRoad : otherRoad, currentRoad.isHorizontal ? otherRoad : currentRoad ) ) {
                    this.addPendingIntersection( currentRoad.isHorizontal ? currentRoad : otherRoad, currentRoad.isHorizontal ? otherRoad : currentRoad );
                }
            })
        })
        this.checkPendingIntersections( );
    }

    addPendingIntersection( horizontalRoad: Road, verticalRoad: Road ): void {
        let backSprites = getBackSpritesGrid();
        let skip = false;
        this.pendingIntersections.forEach( ( e ) => {
            if ( this.areItemsInList( e.roadIds, horizontalRoad.id, verticalRoad.id )) {
                skip = true;
            }
        })
        if ( !skip ) {
            this.pendingIntersections.push( {
                'roads': [ verticalRoad, horizontalRoad ],
                'roadIds': [ verticalRoad.id, horizontalRoad.id ],
                'directions': [verticalRoad.model.direction, horizontalRoad.model.direction ],
                'square': new TileSquare( [
                    backSprites.getTileAtCell( verticalRoad.model.primaryColumn, horizontalRoad.model.primaryRow ),
                    backSprites.getTileAtCell( verticalRoad.model.secondaryColumn, horizontalRoad.model.primaryRow ),
                    backSprites.getTileAtCell( verticalRoad.model.primaryColumn, horizontalRoad.model.secondaryRow ),
                    backSprites.getTileAtCell( verticalRoad.model.secondaryColumn, horizontalRoad.model.secondaryRow )
                ] )
            } )                            
        }
    }

    checkPendingIntersections( ): void {
        while ( this.pendingIntersections.length > 0 ) {
            const pendingIntersection = this.pendingIntersections.shift();
            const currentDirections = pendingIntersection.directions;
            const pendingSquare = pendingIntersection.square;
            let filteredIntersections = [];

            if ( this.areItemsInList( currentDirections, DirectionEnum.down, DirectionEnum.left ) ) {
                filteredIntersections = this.pendingIntersections.filter( ( e ) => {
                    return (
                        ( this.areItemsInList( e.directions, DirectionEnum.up, DirectionEnum.left ) && e.square.leftColumn == pendingSquare.rightColumn + 1 && e.square.bottomRow == pendingSquare.bottomRow )
                        || ( this.areItemsInList( e.directions, DirectionEnum.down, DirectionEnum.right ) && e.square.topRow == pendingSquare.bottomRow + 1 && e.square.rightColumn == pendingSquare.rightColumn )
                        || ( this.areItemsInList( e.directions, DirectionEnum.up, DirectionEnum.right ) && e.square.top == pendingSquare.bottom + 1 && e.square.leftColumn == pendingSquare.rightColumn + 1 )
                    )
                } );
                if ( filteredIntersections.length == 1 && this.areItemsInList( currentDirections, DirectionEnum.down, DirectionEnum.left )
                    && this.areItemsInList( filteredIntersections[0].directions, DirectionEnum.up, DirectionEnum.right ) ) {
                    filteredIntersections = [];
                }
            }
            else if ( this.areItemsInList( currentDirections, DirectionEnum.down, DirectionEnum.right ) ) {
                filteredIntersections = this.pendingIntersections.filter( ( e ) => {
                    return (
                        ( this.areItemsInList( e.directions, DirectionEnum.up, DirectionEnum.left ) && e.square.bottomRow == pendingSquare.topRow - 1 && e.square.leftColumn == pendingSquare.rightColumn + 1 )
                        || ( this.areItemsInList( e.directions, DirectionEnum.down, DirectionEnum.left ) && e.square.bottomRow == pendingSquare.topRow + 1 && e.square.rightColumn == pendingSquare.rightColumn )
                        || ( this.areItemsInList( e.directions, DirectionEnum.up, DirectionEnum.right ) && e.square.leftColumn == pendingSquare.rightColumn + 1 && e.square.bottomRow == pendingSquare.bottomRow )
                    )
                } );
                if ( filteredIntersections.length == 1 && this.areItemsInList( currentDirections, DirectionEnum.down, DirectionEnum.right )
                    && this.areItemsInList( filteredIntersections[0].directions, DirectionEnum.up, DirectionEnum.left ) ) {
                    filteredIntersections = [];
                }
            }
            else if ( this.areItemsInList( currentDirections, DirectionEnum.up, DirectionEnum.left ) ) {
                filteredIntersections = this.pendingIntersections.filter( ( e ) => {
                    return (
                        ( this.areItemsInList( e.directions, DirectionEnum.down, DirectionEnum.left ) && e.square.rightColumn == pendingSquare.leftColumn - 1 && e.square.bottomRow == pendingSquare.bottomRow )
                        || ( this.areItemsInList( e.directions, DirectionEnum.down, DirectionEnum.right ) && e.square.topRow == pendingSquare.bottomRow + 1 && e.square.rightColumn == pendingSquare.leftColumn - 1 )
                        || ( this.areItemsInList( e.directions, DirectionEnum.up, DirectionEnum.right ) && e.square.topRow == pendingSquare.bottomRow + 1 && e.square.rightColumn == pendingSquare.rightColumn )
                    )
                } );
                if ( filteredIntersections.length == 1 && this.areItemsInList( currentDirections, DirectionEnum.up, DirectionEnum.left )
                    && this.areItemsInList( filteredIntersections[0].directions, DirectionEnum.down, DirectionEnum.right ) ) {
                    filteredIntersections = [];
                }
            }
            else if ( this.areItemsInList( currentDirections, DirectionEnum.up, DirectionEnum.right ) ) {
                filteredIntersections = this.pendingIntersections.filter( ( e ) => {
                    return (
                        ( this.areItemsInList( e.directions, DirectionEnum.up, DirectionEnum.left ) && e.square.bottomRow == pendingSquare.topRow - 1 && e.square.rightColumn == pendingSquare.rightColumn )
                        || ( this.areItemsInList( e.directions, DirectionEnum.down, DirectionEnum.left ) && e.square.bottomRow == pendingSquare.topRow - 1 && e.square.rightColumn == pendingSquare.leftColumn - 1 )
                        || ( this.areItemsInList( e.directions, DirectionEnum.down, DirectionEnum.right ) && e.square.rightColumn == pendingSquare.leftColumn - 1 && e.square.bottomRow == pendingSquare.bottomRow )
                    )
                } );
                if ( filteredIntersections.length == 1 && this.areItemsInList( currentDirections, DirectionEnum.up, DirectionEnum.right )
                    && this.areItemsInList( filteredIntersections[0].directions, DirectionEnum.down, DirectionEnum.left ) ) {
                    filteredIntersections = [];
                }
            } 

            filteredIntersections.forEach( ( e ) => {
                let index =  this.pendingIntersections.indexOf( e );
                this.pendingIntersections.splice( index, 1 )
            })
            const id = getUniqueId(this.intersectionIds);
            this.intersections.push( new Intersection([ ...filteredIntersections, pendingIntersection], id))
            this.intersectionIds.push(id);
        }
    }
}