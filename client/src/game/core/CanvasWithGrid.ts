import type { OutOfMapEnum } from '../../enumerables/OutOfMapEnum';
import type { TileModel } from '../../models/TileModel';
import { Grid } from './Grid';
import type { Tile } from './Tile';
/**
 * The game at its core consists out of two HTML5 Canvases: the Background and Foreground.
 * Both are instantiated as an extension of the base CanvasWithGrid class and contain an Grid instance with an array of Tile instances
 * CanvasWithGrid contains core functionalities for interacting with the canvas context based on a Grid instance.
 * These include locating and returning a tile from the grid and instantiating a new grid.
 */
export class CanvasWithGrid {
    x: number;
    y: number;
    ctx: CanvasRenderingContext2D;
    grid: Grid;
    sheetImage: HTMLImageElement;
    constructor( x: number, y: number, ctx: CanvasRenderingContext2D ) {
        this.x = x;
        this.y = y;
        this.ctx = ctx;
    };

    initGrid( rows: number, cols: number ): void {
        this.grid       = new Grid( rows, cols, this.ctx );
    };

    setTileGrid( tileModelArray: TileModel[] ): void {
        this.grid.setTileGridToArray( tileModelArray );
    }

    getTileAtIndex( index: number ): Tile {
        return this.grid.array[index];
    }

    getTileAtXY( x: number, y: number ): Tile {
        return this.grid.getTileAtXY( x, y );
    };
 
    getTileAtCell( column: number | OutOfMapEnum, row: number | OutOfMapEnum ): Tile {
        return this.grid.getTileAtCell( column, row );
    };

    drawMapFromGridData( image: HTMLImageElement ): void {
        this.sheetImage = image;
        this.grid.drawMap( this.sheetImage );
    }    
};