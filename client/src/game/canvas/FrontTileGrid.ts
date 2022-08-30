import { CanvasGrid } from "../core/CanvasGrid";
import globals from '../../game-data/globals';
import type { Tile } from "../core/Tile";
import type { MapModel } from "../../models/MapModel";
import type { TilesheetModel } from "../../models/TilesheetModel";
import type { CanvasTypeEnum } from "../../enumerables/CanvasTypeEnum";

export class FrontTileGrid extends CanvasGrid {
    hasFrontGrid: boolean;
    lastTileList: Tile[];
    constructor( x: number, y: number, canvas: HTMLCanvasElement, type: CanvasTypeEnum ) {
        super( x, y, canvas, type );
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