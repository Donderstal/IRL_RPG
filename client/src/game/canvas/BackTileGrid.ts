import { resetDoors } from '../controllers/doorController';
import type { DoorModel } from '../../models/DoorModel';
import type { MapActionModel } from '../../models/MapActionModel';
import type { MapModel } from '../../models/MapModel';
import type { TilesheetModel } from '../../models/TilesheetModel';
import { CanvasGrid } from '../core/CanvasGrid';
import { initializeDoorForTile } from '../modules/doors/doorSetter';
import type { CanvasTypeEnum } from '../../enumerables/CanvasTypeEnum';
import { initializeActionForTile, initializeSavePoint } from '../modules/actions/actionSetter';
import type { GridCellModel } from '../../models/GridCellModel';
import type { ElevatorModel } from '../../models/ElevatorModel';

export class BackTileGrid extends CanvasGrid {
    model: MapModel;
    mapName: string;
    neighbourhood: string;
    blockedTiles: number[];
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
        doors.forEach( ( door ) => {
            const tile = this.getTileAtCell( door.column, door.row );
            initializeDoorForTile( tile, door );
        } )
    }

    setBlockedTiles( blockedTileIndexes: number[] ): void {
        this.grid.array.forEach(
            ( tile ) => {
                if ( blockedTileIndexes.indexOf( tile.model.id ) > - 1 )
                    tile.blocked = true;
            }
        )
    }

    setBackgroundData( mapModel: MapModel, sheetModel: TilesheetModel ): void {
        this.model = mapModel;
        this.sheetModel = sheetModel;
        let oneDimensionalMapGrid = this.model.grid.flat( 1 );
        this.setTileGrid( oneDimensionalMapGrid );

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
            console.log( e );
        } )
    }

    clearMap(): void {
        resetDoors();
        this.grid = null;
        this.blockedTiles = [ ];
    }
};