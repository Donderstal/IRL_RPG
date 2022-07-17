import { InteractionType } from '../enumerables/InteractionType';
import { resetDoors } from '../helpers/doorController';
import type { DoorModel } from '../models/DoorModel';
import type { InteractionModel } from '../models/InteractionModel';
import type { MapModel } from '../models/MapModel';
import type { TilesheetModel } from '../models/TilesheetModel';
import { CanvasWithGrid } from './core/CanvasWithGrid';
import type { Tile } from './core/Tile';
import type { ActionSelector } from './map/map-classes/ActionSelector';
import { Savepoint } from './map/map-classes/SavePoint';

/**
 * The game at its core consists out of two HTML5 Canvases: the Background and Foreground.
 * Both are instantiated as an extension of the base CanvasWithGrid class and contain an Grid instance with an array of Tile instances
 * The BackgroundCanvas will contain all static elements of the current map and draw them if necessary.
 */
export class BackgroundCanvas extends CanvasWithGrid {
    model: MapModel;
    backgroundActions: ActionSelector[];
    mapName: string;
    neighbourhood: string;
    actions: { column: number, row: number, action: InteractionModel }[];
    hasActions: boolean;
    doors: DoorModel[];
    hasDoors: boolean;
    savepoint: Tile;
    blockedTiles: number[];
    constructor( x: number, y: number, ctx: CanvasRenderingContext2D ) {
        super( x, y, ctx );
        this.backgroundActions = [];
        this.savepoint = null;
    };

    setMapName( mapName: string ): void {
        this.mapName = mapName;
    }

    setNeighbourhood( neighbourhood: string ): void {
        this.neighbourhood = neighbourhood
    }

    setActions( actions: { column: number, row: number, action: InteractionModel }[] ): void {
        this.actions = actions;
        this.hasActions = true;
    }

    setDoors( doors: DoorModel[] ): void {
        this.doors = doors;
        this.hasDoors = true;
    }

    setBlockedTiles( blockedTiles: number[] ): void {
        this.blockedTiles = blockedTiles
    }

    setBackgroundData( mapModel: MapModel, sheetModel: TilesheetModel ): void {
        this.model = mapModel;
        this.sheetModel = sheetModel;
        if ( this.model.doors )
            this.setDoors( this.model.doors );
        if ( this.model.actions )
            this.setActions( this.model.actions );
        if ( this.model.savepoint ) 
            this.setSavepoint( this.model.savepoint );
        if ( sheetModel.blocked ) 
            this.setBlockedTiles( sheetModel.blocked );
        let oneDimensionalMapGrid = this.model.grid.flat(1);
        this.setTileGrid( oneDimensionalMapGrid );
    }

    setEventsDoorsAndBlockedToTilesInGrid( ): void {
        this.grid.array.forEach( ( tile ) => {
            if ( this.hasDoors ) {
                this.doors.forEach( ( door ) => {
                    if ( tile.row == door.row && tile.column == door.column ) {
                        tile.setEventData( InteractionType.door, door );
                    }
                } )
            }
            if ( this.hasActions ) {
                this.actions.forEach( ( action ) => {
                    if ( tile.row == action.row && tile.column == action.column ) {
                        tile.setEventData( action.action.type, action );
                        this.backgroundActions.push( tile.event as unknown as ActionSelector )
                    }
                } )
            }
            this.blockedTiles.forEach( blockedId => {
                if ( tile.model.id == blockedId ) {
                    tile.blocked = true;
                }
            } )
        } );
    }

    setSavepoint( savepointData: any ): void {
        const tile = this.getTileAtCell( savepointData.col, savepointData.row )
        tile.hasEvent = true;
        tile.event = new Savepoint( tile );
        this.savepoint = tile;
    }

    clearMap( ): void {
        resetDoors( );
        this.grid = null;
        this.doors = [ ];
        this.hasDoors = false;
        this.actions = null;
        this.hasActions = false;
        this.blockedTiles = [ ];
        this.backgroundActions = [];
        this.savepoint = null;
    }
};