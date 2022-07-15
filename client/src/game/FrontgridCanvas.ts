import { CanvasWithGrid } from "./core/CanvasWithGrid";
import globals from '../game-data/globals';
import type { Tile } from "./core/Tile";
import type { MapModel } from "../models/MapModel";
import type { TilesheetModel } from "../models/TilesheetModel";

export class FrontgridCanvas extends CanvasWithGrid {
    hasFrontGrid: boolean;
    lastTileList: Tile[];
    constructor( x: number, y: number, ctx: CanvasRenderingContext2D ) {
        super( x, y, ctx );
        this.hasFrontGrid = false;
        this.lastTileList = null;
    }   

    setFrontgridData( mapModel: MapModel, sheetData: TilesheetModel ): void {
        this.model = mapModel;
        this.sheetModel = sheetData;
        if ( this.model.frontGrid ) {
            this.hasFrontGrid = true;
            this.setTileGrid( this.model.frontGrid );
            this.drawMapFromGridData( );
        }
    }

    drawMapFromGridData( ): void {
        if ( globals.GAME.PLAYER.visionbox != undefined ) {
            super.drawMapFromGridData( )
            globals.GAME.PLAYER.visionbox.clearArc( );            
        }
    }

    drawTilesAndClearArc( tiles ): void {
        if ( this.lastTileList ) {
            this.lastTileList.forEach( (e) => {
                e.drawTileInMap( this.sheetImage )
            })            
        }
        this.lastTileList = tiles;
        globals.GAME.PLAYER.visionbox.clearArc( );
    }

    clearMap(): void {
        this.grid = null;
        this.hasFrontGrid = false;
        this.lastTileList = null;
    }
}