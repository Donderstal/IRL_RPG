import { CanvasTypeEnum } from '../../enumerables/CanvasTypeEnum';
import { DirectionEnum } from '../../enumerables/DirectionEnum';
import { Counter } from '../../helpers/Counter';
import { getValidCarDestination } from '../../helpers/roadPathfindingHelpers';
import { TileSquare } from '../../helpers/TileSquare';
import { getUniqueId } from '../../helpers/utilFunctions';
import type { CellPosition } from '../../models/CellPositionModel';
import type { RoadModel } from '../../models/RoadModel';
import { cameraFocus } from '../cameraFocus';
import { getBackSpritesGrid, getTileOnCanvasByCell } from '../canvas/canvasGetter';
import { setSpriteAndSpriteModules } from '../modules/moduleSetter';
import { getNeighbourhoodModel } from '../neighbourhoodModule';
import { Crossing } from './roads/Crossing';
import { Intersection } from './roads/Intersection';
import { Road } from './roads/Road';

export class RoadNetwork {
    canvas: OffscreenCanvas;

    roads: Road[];
    roadIds: string[];
    intersections: Intersection[];
    intersectionIds: string[];
    crossings: Crossing[];
    roadDestinations: CellPosition[];
    carCounter: Counter;
    pendingIntersections: { roads: Road[]; roadIds: string[]; directions: DirectionEnum[]; square: TileSquare }[]
    pendingCrossings: { road: Road; square: TileSquare; location: CellPosition[] }[]
    constructor( roads: RoadModel[], canvas: OffscreenCanvas ) {
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
        this.crossings = [];
        this.setCrossings();
        this.carCounter = new Counter( getNeighbourhoodModel().carSpawnRate, true );
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

    handleRoadCrossings( ): void {
        this.crossings.forEach( ( intersection ) => { intersection.updateCrossingStatus( ); })
    }

    handleCarCounter(): void {
        if ( this.carCounter.countAndCheckLimit() ) {
            const validRoads = this.roads.filter( ( e ) => { return e.model.hasStart; } );
            const randomRoad = validRoads[Math.floor( Math.random() * validRoads.length )];
            this.generateCar( randomRoad );
        }
    }

    getValidCarStart(): CellPosition {
        const validRoads = this.roads.filter( ( e ) => { return e.model.hasStart; } );
        const allStarts = validRoads.map( ( e ) => { return e.getRoadStartPosition(); } );
        const validStarts = allStarts.filter( ( e ) => {
            const tile = getTileOnCanvasByCell( { column: e.column, row: e.row }, CanvasTypeEnum.background );
            return !tile.isBlocked && !getBackSpritesGrid().tileHasBlockingSprite( tile.index ) && !cameraFocus.xyValueIsInView( tile.x, tile.y ); 
        } )
        return validStarts[Math.floor( Math.random() * validStarts.length )];
    }

    generateCar( road: Road ): void {
        const carObjectModel = road.getRandomCarObjectModel();
        const startLocation = this.getValidCarStart();
        if ( startLocation === null || startLocation === undefined ) return;

        const destination = getValidCarDestination( startLocation, road );
        if ( destination !== null && destination !== undefined ) {
            carObjectModel.destination = destination;
            setSpriteAndSpriteModules( carObjectModel, CanvasTypeEnum.backSprites );
        }
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
                ], this.canvas )
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

    setCrossings( ): void {
        const backSprites = getBackSpritesGrid();
        this.roads.forEach( ( e ) => { 
            if ( e.crossings ) {
                let road = e
                road.crossings.forEach( ( crossing ) => {
                    this.pendingCrossings.push( {
                        'road': road,
                        'location' : crossing,
                        'square': new TileSquare( [
                            backSprites.getTileAtCell( road.isHorizontal ? crossing[0] : road.model.primaryColumn, road.isHorizontal ? crossing[0] : road.model.primaryRow ),
                            backSprites.getTileAtCell( road.isHorizontal ? crossing[0] : road.model.secondaryColumn, road.isHorizontal ? crossing[0] : road.model.secondaryRow ),
                            backSprites.getTileAtCell( road.isHorizontal ? crossing[1] : road.model.primaryColumn, road.isHorizontal ? crossing[1] : road.model.primaryRow ),
                            backSprites.getTileAtCell( road.isHorizontal ? crossing[1] : road.model.secondaryColumn, road.isHorizontal ? crossing[1] : road.model.secondaryRow )
                        ], this.canvas )
                    } )                     
                });
            };
        });

        this.checkPendingCrossings( );
    }

    checkPendingCrossings( ): void {
        while ( this.pendingCrossings.length > 0 ) {
            const pendingCrossing = this.pendingCrossings.shift( );
            const pendingRoad = pendingCrossing.road;
            let filteredCrossings = this.pendingCrossings.filter( ( e ) => { 
                return e.road !== pendingRoad && e.road.model.alignment == pendingRoad.model.alignment && JSON.stringify(e.location) == JSON.stringify(pendingCrossing.location)
                    && ( e.road.isHorizontal
                    ? ( e.road.model.primaryRow == pendingRoad.model.secondaryRow + 1 || e.road.model.secondaryRow == pendingRoad.model.primaryRow - 1)
                    : (e.road.model.primaryColumn == pendingRoad.model.secondaryColumn + 1 || e.road.model.secondaryColumn == pendingRoad.model.primaryColumn - 1)
                );
            })

            filteredCrossings.forEach( ( e ) => {
                let index =  this.pendingCrossings.indexOf( e );
                this.pendingCrossings.splice( index, 1 )
            })
            this.crossings.push( new Crossing([ ...filteredCrossings, pendingCrossing]))
        }
    }
}