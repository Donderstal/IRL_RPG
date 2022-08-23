import { resetDoors } from '../controllers/doorController';
import type { DoorModel } from '../../models/DoorModel';
import type { MapActionModel } from '../../models/MapActionModel';
import type { MapModel } from '../../models/MapModel';
import type { TilesheetModel } from '../../models/TilesheetModel';
import { CanvasWithGrid } from '../core/CanvasWithGrid';
import { Savepoint } from '../map/map-classes/SavePoint';
import { initializeActionForTile } from '../modules/actionModule';
import { initializeDoorForTile } from '../modules/doorModule';
import type { CanvasTypeEnum } from '../../enumerables/CanvasTypeEnum';

export class BackTilesCanvas extends CanvasWithGrid {
    model: MapModel;
    mapName: string;
    neighbourhood: string;
    hasActions: boolean;
    hasDoors: boolean;
    savepoint: Savepoint;
    blockedTiles: number[];
    constructor( x: number, y: number, canvas: HTMLCanvasElement, type: CanvasTypeEnum ) {
        super( x, y, canvas, type );
        this.savepoint = null;
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
        this.hasActions = true;
    }

    setDoors( doors: DoorModel[] ): void {
        doors.forEach( ( door ) => {
            const tile = this.getTileAtCell( door.column, door.row );
            initializeDoorForTile( tile, door );
        } )
        this.hasDoors = true;
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
    }

    setSavepoint( savepointData: any ): void {
        const tile = this.getTileAtCell( savepointData.col, savepointData.row )
        this.savepoint = new Savepoint( tile );
    }

    clearMap(): void {
        resetDoors();
        this.grid = null;
        this.hasDoors = false;
        this.hasActions = false;
        this.blockedTiles = [ ];
        this.backgroundActions = [];
        this.savepoint = null;
    }
};