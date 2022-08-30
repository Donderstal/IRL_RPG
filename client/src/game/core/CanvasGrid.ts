import type { CanvasTypeEnum } from '../../enumerables/CanvasTypeEnum';
import type { MapModel } from '../../models/MapModel';
import type { TileModel } from '../../models/TileModel';
import type { TilesheetModel } from '../../models/TilesheetModel';
import { Grid } from './Grid';
import type { Sprite } from './Sprite';
import type { Tile } from './Tile';
/**
 * The game at its core consists out of two HTML5 Canvases: the Background and Foreground.
 * Both are instantiated as an extension of the base CanvasWithGrid class and contain an Grid instance with an array of Tile instances
 * CanvasWithGrid contains core functionalities for interacting with the canvas context based on a Grid instance.
 * These include locating and returning a tile from the grid and instantiating a new grid.
 */
export class CanvasGrid {
    x: number;
    y: number;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    type: CanvasTypeEnum;
    grid: Grid;
    sheetImage: HTMLImageElement;
    sheetModel: TilesheetModel;
    model: MapModel;
    playerSprite: Sprite;
    allSprites: Sprite[];
    constructor( x: number, y: number, canvas: HTMLCanvasElement, type: CanvasTypeEnum ) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
    };

    initGrid( columns: number, rows: number  ): void {
        this.grid       = new Grid( columns, rows, this.ctx, this.type );
    };

    setTileGrid( tileModelArray: TileModel[] ): void {
        this.grid.setTileGridToArray( tileModelArray );
    }

    getTileAtIndex( index: number  ): Tile {
        return this.grid.array[index];
    }

    getTileAtXY( x: number, y: number ): Tile {
        return this.grid.getTileAtXY( x, y );
    };
 
    getTileAtCell( column: number, row: number ): Tile {
        return this.grid.getTileAtCell( column, row );
    };

    drawMapFromGridData( ): void {
        this.grid.drawMap( this.sheetModel.image );
    }    

    clearMap() { }
};