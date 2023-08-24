import type { MapModel } from '../../models/MapModel';
import type { TilesheetModel } from '../../models/TilesheetModel';
import { CanvasGrid } from '../core/CanvasGrid';
import type { CanvasTypeEnum } from '../../enumerables/CanvasTypeEnum';
import type { CellPosition } from '../../models/CellPositionModel';
import { EventType } from '../../enumerables/EventType';

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
        this.unblockedCells = [];
    };

    setMapName( mapName: string ): void {
        this.mapName = mapName;
    }

    setUnblockedTiles( tileList: CellPosition[] ): void {
        tileList.forEach( ( e ) => {
            this.unblockedCells.push( e )
        } )
    }

    setNeighbourhood( neighbourhood: string ): void {
        this.neighbourhood = neighbourhood
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
        if ( sheetModel.blocked )
            this.setBlockedTiles( sheetModel.blocked );
        if ( this.model.triggers ) {
            this.setUnblockedTiles( this.model.triggers.filter( e => e.eventType === EventType.door ) );
        }
    }

    clearMap(): void {
        this.grid = null;
        this.blockedTiles = [ ];
    }
};