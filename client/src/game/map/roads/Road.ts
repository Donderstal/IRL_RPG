import { DirectionEnum } from "../../../enumerables/DirectionEnum";
import type { CanvasObjectModel } from "../../../models/CanvasObjectModel";
import type { RoadModel } from "../../../models/RoadModel";
import { getDataModelByKey } from "../../../resources/spriteDataResources";
import type { Tile } from "../../core/Tile";
import { getNeighbourhoodModel } from '../../neighbourhoodModule';
import { getBackTilesGrid } from '../../canvas/canvasGetter';
import { RoadPosition } from "./RoadPosition";
import { getHorizontalRoadEndTileList, getVerticalRoadStartTileList, getHorizontalRoadStartTileList, getVerticalRoadEndTileList, hasTurnToIntersectingRoad, hasTurnFromIntersectingRoad } from "./roadPositionHelpers";
import { RoadAlignmentEnum } from "../../../enumerables/RoadAlignmentEnum";
import type { DirectionXy } from "../../../models/DirectionXyModel";
import type { GridCellModel } from "../../../models/GridCellModel";

export class Road {
    id: string;
    model: RoadModel;
    hasBusLine: boolean;
    isHorizontal: boolean

    startingPosition: RoadPosition;
    endPosition: RoadPosition;

    intersectingRoads: { [key in string]: RoadModel };
    intersectingRoadIds: string[];

    turnToIntersectingRoadPositions: { [key in string]: RoadPosition };
    turnFromIntersectingRoadPositions: { [key in string]: RoadPosition };
    paths: DirectionXy[][];
    constructor ( roadModel: RoadModel, id: string ) {
        this.id = id;
        this.model = roadModel;

        this.isHorizontal = roadModel.alignment === RoadAlignmentEnum.horizontal;
        this.setMovementCostToRoadTiles( )

        this.setRoadStartPosition( roadModel );
        this.setRoadEndPosition( roadModel );

        this.intersectingRoads = {};
        this.intersectingRoadIds = [];
        this.turnToIntersectingRoadPositions = {};
        this.turnFromIntersectingRoadPositions = {};
    }

    getRandomPath(): DirectionXy[] {
        return this.paths[Math.floor( Math.random() * this.paths.length )]
    }

    registerIntersectingRoad( road: Road ) {
        this.intersectingRoads[road.id] = road.model;
        this.intersectingRoadIds.push( road.id );
        this.setIntersectionPositions( road );
    }

    setMovementCostToRoadTiles(): void {
        const tiles = this.getTilesInRoad();
        tiles.forEach( tile => tile.setMovementCost(5) );
    }

    setRoadStartPosition( model: RoadModel ) {
        const tileList = this.isHorizontal
            ? getHorizontalRoadStartTileList( model.primaryColumn, model.secondaryRow, model.primaryRow, model.direction )
            : getVerticalRoadStartTileList( model.primaryRow, model.primaryColumn, model.secondaryColumn, model.direction );
        this.startingPosition = new RoadPosition( tileList, this.model, this.id );
    }

    setRoadEndPosition( model: RoadModel ) {
        const tileList = this.isHorizontal
            ? getHorizontalRoadEndTileList( model.secondaryColumn, model.secondaryRow, model.primaryRow, model.direction )
            : getVerticalRoadEndTileList( model.secondaryRow, model.primaryColumn, model.secondaryColumn, model.direction );
        this.endPosition = new RoadPosition( tileList, this.model, this.id );
    }

    setIntersectionPositions( intersectingRoad: Road ) {
        let turnToTileList: Tile[];
        let turnFromTileList: Tile[];

        if ( this.isHorizontal ) {
            const turnToIntersectingRoadColumn = this.model.direction === DirectionEnum.left ? intersectingRoad.model.primaryColumn : intersectingRoad.model.secondaryColumn;
            const turnFromIntersectingRoadColumn = this.model.direction === DirectionEnum.left ? intersectingRoad.model.secondaryColumn : intersectingRoad.model.primaryColumn;
            turnToTileList = hasTurnToIntersectingRoad( this, intersectingRoad ) ? getHorizontalRoadEndTileList( turnToIntersectingRoadColumn, this.model.secondaryRow, this.model.primaryRow, this.model.direction ) : null;
            turnFromTileList = hasTurnFromIntersectingRoad( this, intersectingRoad ) ? getHorizontalRoadStartTileList( turnFromIntersectingRoadColumn, this.model.secondaryRow, this.model.primaryRow, this.model.direction ) : null;
        }
        else {
            const turnToIntersectingRoadRow = this.model.direction === DirectionEnum.down ? intersectingRoad.model.primaryRow : intersectingRoad.model.secondaryRow;
            const turnFromIntersectingRoadRow = this.model.direction === DirectionEnum.down ? intersectingRoad.model.secondaryRow : intersectingRoad.model.primaryRow;
            turnToTileList = hasTurnToIntersectingRoad( this, intersectingRoad ) ? getVerticalRoadEndTileList( turnToIntersectingRoadRow, this.model.primaryColumn, this.model.secondaryColumn, this.model.direction ) : null;
            turnFromTileList = hasTurnFromIntersectingRoad( this, intersectingRoad ) ? getVerticalRoadStartTileList( turnFromIntersectingRoadRow, this.model.primaryColumn, this.model.secondaryColumn, this.model.direction ) : null;
        }

        if ( turnToTileList !== null ) {
            this.turnToIntersectingRoadPositions[intersectingRoad.id] = new RoadPosition( turnToTileList, this.model, this.id );
        }

        if ( turnFromTileList !== null ) {
            this.turnFromIntersectingRoadPositions[intersectingRoad.id] = new RoadPosition( turnFromTileList, this.model, this.id );
        }
    }

    getPossibleRoadTurnsFromXy( directionXy: DirectionXy ) {
        let possibleTurns = {};
        let possibleTurnRoadIds;
        let allTurnRoadIds = Object.keys( this.turnToIntersectingRoadPositions );
        switch ( this.model.direction ) {
            case DirectionEnum.left:
                possibleTurnRoadIds = allTurnRoadIds.filter( ( e ) => {
                    return this.turnToIntersectingRoadPositions[e].left < directionXy.x;
                } );
                break;
            case DirectionEnum.up:
                possibleTurnRoadIds = allTurnRoadIds.filter( ( e ) => {
                    return this.turnToIntersectingRoadPositions[e].top < directionXy.y;
                } );
                break;
            case DirectionEnum.right:
                possibleTurnRoadIds = allTurnRoadIds.filter( ( e ) => {
                    return this.turnToIntersectingRoadPositions[e].right > directionXy.x;
                } );
                break;
            case DirectionEnum.down:
                possibleTurnRoadIds = allTurnRoadIds.filter( ( e ) => {
                    return this.turnToIntersectingRoadPositions[e].bottom > directionXy.y;
                } );
                break;
        }
        possibleTurnRoadIds.forEach( ( e ) => { possibleTurns[e] = this.turnToIntersectingRoadPositions[e]; } )
        return possibleTurns;
    } 

    getTilesInRoad(): Tile[] { 
        const backTiles = getBackTilesGrid();
        if ( this.isHorizontal ) {
            return backTiles.grid.array.filter( ( e ) => {
                return ( ( e.column >= this.model.primaryColumn || e.column <= this.model.secondaryColumn )
                    && ( e.row === this.model.primaryRow || e.row === this.model.secondaryRow ) );
            } )
        }
        else {
            return backTiles.grid.array.filter( ( e ) => {
                return ( ( e.row >= this.model.primaryRow || e.row <= this.model.secondaryRow )
                    && ( e.column === this.model.primaryColumn || e.column === this.model.secondaryColumn ) );
            } )
        }
    }

    cellIsInRoad( cellPosition: GridCellModel ): boolean {
        let model = this.model;
        let inColumns = false;
        let inRows = false;

        if ( this.isHorizontal ) {
            inRows = ( cellPosition.row === model.primaryRow || cellPosition.row === model.secondaryRow );
            inColumns = ( model.direction === DirectionEnum.left )
                ? ( cellPosition.column >= model.secondaryColumn && cellPosition.column <= model.primaryColumn )
                : ( cellPosition.column <= model.secondaryColumn && cellPosition.column >= model.primaryColumn );
        }
        else {
            inColumns = ( cellPosition.column === model.primaryColumn || cellPosition.column === model.secondaryColumn );
            inRows = ( model.direction === DirectionEnum.up )
                ? ( cellPosition.row >= model.secondaryRow && cellPosition.row <= model.primaryRow )
                : ( cellPosition.row <= model.secondaryRow && cellPosition.row >= model.primaryRow );
        }
        return inColumns && inRows;
    }

    getRoadStartPosition(): GridCellModel {
        return this.startingPosition.getRelativeStartingCell();
    }

    getRoadEndPosition(): GridCellModel {
        return this.endPosition.getRelativeEndingCell();
    }

    hasUnoccupiedStart(): boolean {
        return this.model.hasStart && this.startingPosition.isNotOccupied() && !this.startingPosition.isVisible();
    }

    getRandomCarObjectModel( destination: GridCellModel ): CanvasObjectModel {
        const carNames = getNeighbourhoodModel().carTypes;
        const startLocation = this.getRoadStartPosition();
        let randomIndex = Math.floor(Math.random() * carNames.length);
        let model: CanvasObjectModel = {
            direction: startLocation.direction,
            type: carNames[randomIndex],
            spriteDataModel: getDataModelByKey( carNames[randomIndex] ),
            column: startLocation.column,
            row: startLocation.row,
            hasCondition: false,
            destination: destination
        }
        return model;
    }
}