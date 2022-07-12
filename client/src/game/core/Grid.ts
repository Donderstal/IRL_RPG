import { GRID_BLOCK_PX, CANVAS_ROWS, CANVAS_COLUMNS, OUT_LEFT, OUT_UP, OUT_RIGHT, OUT_DOWN } from '../../game-data/globals';
import { OutOfMapEnum } from '../../enumerables/OutOfMapEnum';
import { Tile } from './Tile';
import type { TileModel } from '../../models/TileModel';
/**
 * The Grid class is a structured way of interacting with the two HTML5 Canvases that display the game.
 * It divides the canvas up in a grid of equally sized blocks, represented by an Tile instance.
 * These Tile instances are stored in the this.array property and are retrievable by array index, xy location and column-row location.
 * These tiles in turn register the presence of sprites, doors, action or blocked areas in said tile.
 * This setup is the bases of all interactivity on the game canvases.
 */
export class Grid {
    x: number;
    y: number;
    columns: number;
    rows: number;
    overflowColumns: number;
    overflowRows: number;

    ctx: CanvasRenderingContext2D
    array: Tile[]
    constructor( columns: number, rows: number, ctx: CanvasRenderingContext2D ) {

        this.rows = rows;
        this.columns = columns;        
        this.overflowColumns = CANVAS_COLUMNS - this.columns;
        this.overflowRows = CANVAS_ROWS - this.rows;
        this.x = this.getXOffset( );
        this.y = this.getYOffset( );
        this.array = [];
        this.ctx = ctx;

        this.initializeGrid( );
    };

    get width( ): number { return this.columns * GRID_BLOCK_PX }
    get height( ): number { return this.rows * GRID_BLOCK_PX }

    initializeGrid( ): void {
        const limit = this.rows * this.columns
        let tileX = this.getXOffset( );
        let tileY = this.getYOffset( );
        let row = 1;
        let col = 1;

        for( let i = 0; i < limit; i++ ) {
            this.array.push( new Tile( i, tileX, tileY, this.ctx, row, col ) )

            if ( ( i + 1 ) % this.columns === 0 ) {
                tileX = this.getXOffset( );
                tileY += GRID_BLOCK_PX;
                col = 1;
                row += 1;
            } else {
                tileX += GRID_BLOCK_PX
                col += 1
            }
        };
    };

    getXOffset( ): number {
        return ( this.overflowColumns * GRID_BLOCK_PX ) / 2;
    }

    getYOffset(): number {
        return ( this.overflowRows * GRID_BLOCK_PX ) / 2;
    }

    drawMap( tileSheet: HTMLImageElement ): void {
        for ( let i = 0; i < this.array.length; i += this.columns ) {
            const row = this.array.slice( i, i + this.columns )
            this.drawRowInMap( row, tileSheet )
        }
    }

    drawRowInMap( currentRow: number, tileSheet: HTMLImageElement ) {
        for ( let j = 0; j < this.columns; j++ ) {
            const currentTile = currentRow[j]
            currentTile.drawTileInMap( tileSheet )
        }
    }

    getTileAtXY( x: number, y: number ): Tile {
        const column = Math.ceil( ( x - this.x ) / GRID_BLOCK_PX);
        const row = Math.ceil( ( y - this.y )  / GRID_BLOCK_PX);
        if ( x > this.x + this.columns * GRID_BLOCK_PX || y > this.y + this.rows * GRID_BLOCK_PX || x <= this.x || y <= this.y ) {
            return this.getDummyTile( 
                x <= this.x ? OutOfMapEnum.left : x > this.x + this.columns * GRID_BLOCK_PX ? OutOfMapEnum.right : column,
                y <= this.y ? OutOfMapEnum.up : y > this.y + this.rows * GRID_BLOCK_PX ? OUT_DOWN : OutOfMapEnum.down
            );
        }

        return this.getTileAtCell( column, row );
    }

    getTileAtCell( column: number|OutOfMapEnum, row: number|OutOfMapEnum ): Tile {
        if ( column === OutOfMapEnum.left || row === OutOfMapEnum.up || column === OutOfMapEnum.right || row === OutOfMapEnum.down ){
            return this.getDummyTile( column, row );
        }
        const tileIndex = ( ( (row as number ) * this.columns ) - ( this.columns - (column as number)) ) - 1;
        return this.array[tileIndex]
    }

    setTileGridToArray( tileGrid: TileModel[] ): void {
        this.array.forEach( ( e, index ) => {
            e.setTileID( tileGrid[index].id );
            e.setSettings( { 'mirrored': tileGrid[index].mirrored, 'angle': tileGrid[index].angle } )
        })
    }

    getDummyTile( column: number | OutOfMapEnum, row: number | OutOfMapEnum ): Tile {
        let tile;
        if ( column == OutOfMapEnum.left ){
            tile = new Tile( OutOfMapEnum.left, -GRID_BLOCK_PX, ( row as number - 1 ) * GRID_BLOCK_PX, this.ctx, row as number, 0 )
        }
        else if ( row == OutOfMapEnum.up ) {
            tile = new Tile( OutOfMapEnum.up, ( column as number - 1 ) * GRID_BLOCK_PX, -GRID_BLOCK_PX, this.ctx, 0, column as number )
        }
        else if ( column == OutOfMapEnum.right ) {
            tile = new Tile( OutOfMapEnum.right, this.width + GRID_BLOCK_PX, ( row as number - 1 ) * GRID_BLOCK_PX, this.ctx, row as number, this.columns + 1 )
        }
        else if ( row == OutOfMapEnum.down ) {
            tile = new Tile( OutOfMapEnum.down, ( column as number - 1 ) * GRID_BLOCK_PX, this.height + GRID_BLOCK_PX, this.ctx, this.rows + 1, column as number )
        }
        tile.offScreen = true;
        return tile;
    }
}