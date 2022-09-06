import { CanvasGrid } from "../core/CanvasGrid";
import globals from '../../game-data/globals';
import type { Tile } from "../core/Tile";
import type { MapModel } from "../../models/MapModel";
import type { TilesheetModel } from "../../models/TilesheetModel";
import type { CanvasTypeEnum } from "../../enumerables/CanvasTypeEnum";
import { getPlayer } from "../controllers/spriteController";

export class FrontTileGrid extends CanvasGrid {
    hasFrontGrid: boolean;
    lastTileList: Tile[];
    constructor( x: number, y: number, canvas: HTMLCanvasElement, type: CanvasTypeEnum ) {
        super( x, y, canvas, type );
        this.hasFrontGrid = false;
        this.lastTileList = null;
    }   

    get playerVisionBox() { return getPlayer().visionbox;  }

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
        if ( this.playerVisionBox != undefined ) {
            super.drawMapFromGridData( )
            this.playerVisionBox.clearArc( );            
        }
    }

    drawTilesAndClearArc( tiles ): void {
        if ( this.lastTileList ) {
            this.lastTileList.forEach( (e) => {
                e.drawTileInMap( this.sheetImage )
            })            
        }
        this.lastTileList = tiles;
        this.playerVisionBox.clearArc( );
    }

    clearMap(): void {
        this.grid = null;
        this.hasFrontGrid = false;
        this.lastTileList = null;
    }
}