import { DirectionEnum } from "../../../enumerables/DirectionEnum";
import type { CanvasObjectModel } from "../../../models/CanvasObjectModel";
import type { CellPosition } from "../../../models/CellPositionModel";
import type { RoadModel } from "../../../models/RoadModel";
import { getDataModelByKey } from "../../../resources/spriteDataResources";
import type { Tile } from "../../core/Tile";
import type { I_Junction } from "./I_Junction";
import { getNeighbourhoodModel } from '../../neighbourhoodModule';
import { getBackSpritesGrid, getBackTilesGrid, getTileOnCanvasByCell } from '../../canvas/canvasGetter';
import { CanvasTypeEnum } from '../../../enumerables/CanvasTypeEnum';

export class Road {
    id: string;
    model: RoadModel;
    startCell: CellPosition;
    secondCell: CellPosition;
    endCell: CellPosition
    busStopLocation: CellPosition;
    intersections: { [key in DirectionEnum]: I_Junction[] };
    activeCarIds: string[];
    hasBusLine: boolean;
    isHorizontal: boolean
    crossings: [];
    constructor ( roadModel: RoadModel, id: string ) {
        this.id = id;
        this.model = roadModel;

        this.isHorizontal = roadModel.alignment == "HORI";
        this.startCell = {};
        this.secondCell = {}
        this.endCell = {};

        this.setMovementCostToRoadTiles( )

        this.intersections = { 
            [DirectionEnum.left]: [],
            [DirectionEnum.up]: [],
            [DirectionEnum.right]: [],
            [DirectionEnum.down]: []
        };

        this.activeCarIds = [];

        if ( this.hasBusLine ) {
            this.setBusStopLocation( )
        }
    }

    get startCellIsBlocked( ): boolean { 
        let backSprites = getBackSpritesGrid();
        let firstTile = getTileOnCanvasByCell( { "column": this.model.primaryColumn, "row": this.model.primaryRow } , CanvasTypeEnum.backSprites )
        let secondTile = getTileOnCanvasByCell( {
            "column": this.isHorizontal ? this.model.primaryColumn : this.model.secondaryColumn,
            "row": this.isHorizontal ? this.model.secondaryRow : this.model.primaryRow
        }, CanvasTypeEnum.backSprites )
        return backSprites.tileHasBlockingSprite( firstTile.index ) || backSprites.tileHasBlockingSprite( secondTile.index )
    }

    setMovementCostToRoadTiles(): void {
        const tiles = this.getTilesInRoad();
        tiles.forEach( tile => tile.setMovementCost(5) );
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

    cellIsInRoad( cellPosition: CellPosition ): boolean {
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

    getRoadEndPosition(): CellPosition {
        const model: CellPosition = {
            column: this.isHorizontal ? this.model.secondaryColumn : this.model.primaryColumn,
            row: this.isHorizontal ? this.model.primaryRow : this.model.secondaryRow,
            direction: this.model.direction
        };
        return model;
    }

    getRoadStartPosition(): CellPosition {
        const model: CellPosition = {
            column: this.model.primaryColumn,
            row: this.model.primaryRow,
            direction: this.model.direction
        };
        return model;
    }

    getRandomCarObjectModel( isBus = false ): CanvasObjectModel {
        const carNames = getNeighbourhoodModel().carTypes;
        const startLocation = this.getRoadStartPosition();
        let randomIndex = Math.floor(Math.random() * carNames.length);
        let model: CanvasObjectModel = {
            direction: startLocation.direction,
            type: isBus ? "bus" : carNames[randomIndex],
            spriteDataModel: getDataModelByKey( isBus ? "bus" : carNames[randomIndex] ),
            column: startLocation.column,
            row: startLocation.row,
            hasCondition: false,
            hasDoor: false,
            hasAction: false
        }
        return model;
    }

    setBusStopLocation( ): void {
        this.busStopLocation = ( this.isHorizontal ) ? { row: this.startCell.row, column: this.busStopLocation.column as number + 3 } : { row: this.busStopLocation.row, column: this.startCell.column }
    }
}