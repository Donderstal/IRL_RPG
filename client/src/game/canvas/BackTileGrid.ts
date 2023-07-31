import type { DoorModel } from '../../models/DoorModel';
import type { MapActionModel } from '../../models/MapActionModel';
import type { MapModel } from '../../models/MapModel';
import type { TilesheetModel } from '../../models/TilesheetModel';
import { CanvasGrid } from '../core/CanvasGrid';
import { initializeDoorForTile } from '../modules/doors/doorSetter';
import type { CanvasTypeEnum } from '../../enumerables/CanvasTypeEnum';
import { initializeActionForTile, initializeSavePoint, initializeElevator } from '../modules/actions/actionSetter';
import type { GridCellModel } from '../../models/GridCellModel';
import type { ElevatorModel } from '../../models/ElevatorModel';
import type { CellPosition } from '../../models/CellPositionModel';

export class BackTileGrid extends CanvasGrid {
    model: MapModel;
    mapName: string;
    neighbourhood: string;
    blockedTiles: number[];

    mapSpecificBlockedTiles: number[];
    mapSpecificUnblockedTiles: number[];

    unblockedCells: CellPosition[];
    constructor( x: number, y: number, canvas: OffscreenCanvas, type: CanvasTypeEnum ) {
        super( x, y, canvas, type );
    };

    setMapName( mapName: string ): void {
        this.mapName = mapName;
    }

    setNeighbourhood( neighbourhood: string ): void {
        this.neighbourhood = neighbourhood
    }

    setActions( actions: MapActionModel[] ): void {
        actions.forEach( ( action ) => {
            const tile = this.getTileAtCell( action.column, action.row );
            initializeActionForTile( tile, action.action )
        } )
    }

    setDoors( doors: DoorModel[] ): void {
        this.unblockedCells = [];
        doors.forEach( ( door ) => {
            const tile = this.getTileAtCell( door.column, door.row );
            this.unblockedCells.push( { 'column': door.column, 'row': door.row }  )
            initializeDoorForTile( tile, door );
        } )
    }

    setBlockedTiles( blockedTileIndexes: number[] ): void {
        let blockedIndexes = blockedTileIndexes.filter( ( e ) => { return this.mapSpecificUnblockedTiles.indexOf( e ) === -1; } )
        blockedIndexes = [...blockedIndexes, ...this.mapSpecificBlockedTiles];
        this.grid.array.forEach( ( tile ) => {
            if ( blockedIndexes.indexOf( tile.model.id ) > - 1 || tile.model.id  == null) {
                tile.blocked = true;
            }
            if ( this.unblockedCells.filter( ( e ) => { return e.column === tile.column && e.row === tile.row; } ).length > 0 ) {
                tile.blocked = false;
            }
        } );
    }

    setBackgroundData( mapModel: MapModel, sheetModel: TilesheetModel ): void {
        this.model = mapModel;
        this.sheetModel = sheetModel;
        let oneDimensionalMapGrid = this.model.grid.flat( 1 );
        this.setTileGrid( oneDimensionalMapGrid );

        if ( this.model.blockedTileIds )
            this.mapSpecificBlockedTiles = [...this.model.blockedTileIds];
        if ( this.model.unblockedTileIds )
            this.mapSpecificUnblockedTiles = [...this.model.unblockedTileIds];

        if ( this.model.doors )
            this.setDoors( this.model.doors );
        if ( this.model.actions )
            this.setActions( this.model.actions );
        if ( this.model.savepoint )
            this.setSavepoint( this.model.savepoint );
        if ( sheetModel.blocked )
            this.setBlockedTiles( sheetModel.blocked );
        if ( this.model.elevators )
            this.setElevators( this.model.elevators );
    }

    setSavepoint( savepointData: GridCellModel ): void {
        const tile = this.getTileAtCell( savepointData.column, savepointData.row );
        initializeSavePoint( tile );
    }

    setElevators( elevators: ElevatorModel[] ): void {
        elevators.forEach( ( e ) => {
            const tile = this.getTileAtCell( e.column, e.row );
            initializeElevator( tile, e );
        } )
    }

    clearMap(): void {
        this.grid = null;
        this.blockedTiles = [ ];
    }
};