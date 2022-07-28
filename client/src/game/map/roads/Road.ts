import globals from '../../../game-data/globals';
import { DirectionEnum } from "../../../enumerables/DirectionEnum";
import { Counter } from "../../../helpers/Counter";
import type { CanvasObjectModel } from "../../../models/CanvasObjectModel";
import type { CellPosition } from "../../../models/CellPositionModel";
import type { RoadModel } from "../../../models/RoadModel";
import { getDataModelByKey } from "../../../resources/spriteDataResources";
import type { Sprite } from "../../core/Sprite";
import type { Tile } from "../../core/Tile";
import type { I_Junction } from "./I_Junction";

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
    carCounter: Counter;
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
        this.carCounter = new Counter( globals.GAME.activeNeighbourhood.model.carSpawnRate, true );

        if ( this.hasBusLine ) {
            this.setBusStopLocation( )
        }
    }

    get startCellIsBlocked( ): boolean { 
        let FRONT = globals.GAME.FRONT;
        let firstTile = globals.GAME.getTileOnCanvasAtCell( "FRONT", this.model.primaryColumn, this.model.primaryRow )
        let secondTile = globals.GAME.getTileOnCanvasAtCell( "FRONT", this.isHorizontal ? this.model.primaryColumn : this.model.secondaryColumn, this.isHorizontal ? this.model.secondaryRow : this.model.primaryRow )
        return FRONT.tileHasBlockingSprite( firstTile.index ) || FRONT.tileHasBlockingSprite( secondTile.index )
    }

    get carsOnRoad( ): Sprite[] {
        return this.activeCarIds.map( ( id ) => { return globals.GAME.FRONT.spriteDictionary[id]; })
    }

    handleCarCounter( ): void {
        if ( this.model.hasStart && this.carCounter.countAndCheckLimit( ) ) {
            this.generateCar( );
            this.carCounter.resetCounter( );
        }
    }

    generateCar(): void {
        if ( !this.startCellIsBlocked ) {
            globals.GAME.FRONT.setVehicleToTile( this.getCarDataForTile( ) )
        }
    }

    setMovementCostToRoadTiles(): void {
        const tiles = this.getTilesInRoad();
        tiles.forEach( tile => tile.setMovementCost(5) );
    }

    getTilesInRoad(): Tile[] {
        if ( this.isHorizontal ) {
            return globals.GAME.BACK.grid.array.filter( ( e ) => {
                return ( ( e.column >= this.model.primaryColumn || e.column <= this.model.secondaryColumn )
                    && ( e.row === this.model.primaryRow || e.row === this.model.secondaryRow ) );
            } )
        }
        else {
            return globals.GAME.BACK.grid.array.filter( ( e ) => {
                return ( ( e.row >= this.model.primaryRow || e.row <= this.model.secondaryRow )
                    && ( e.column === this.model.primaryColumn || e.column === this.model.secondaryColumn ) );
            } )
        }

    }

    getCarDataForTile( isBus = false ): CanvasObjectModel {
        const carNames = globals.GAME.activeNeighbourhood.model.carTypes;
        let randomIndex = Math.floor(Math.random() * carNames.length);
        let model: CanvasObjectModel = {
            direction: this.model.direction,
            type: isBus ? "bus" : carNames[randomIndex],
            spriteDataModel: getDataModelByKey( isBus ? "bus" : carNames[randomIndex] ),
            column: this.model.primaryColumn,
            row: this.model.primaryRow,
            destination: { 
                column: this.model.direction === DirectionEnum.left
                    ? 0 : this.model.direction === DirectionEnum.right
                        ? globals.GAME.BACK.grid.columns + 1 : this.model.primaryColumn, 
                row: this.model.direction === DirectionEnum.up
                    ? 0 : this.model.direction === DirectionEnum.down
                        ? globals.GAME.BACK.grid.rows + 1 : this.model.secondaryRow, 
            },
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