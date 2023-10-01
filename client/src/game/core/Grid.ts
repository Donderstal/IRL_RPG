import { GRID_BLOCK_PX, CANVAS_ROWS, CANVAS_COLUMNS} from '../../game-data/globals';
import { Tile } from './Tile';
import type { TileModel } from '../../models/TileModel';
import type { CanvasTypeEnum } from '../../enumerables/CanvasTypeEnum';
import type { TilesheetModel } from '../../models/TilesheetModel';
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
    canvasType: CanvasTypeEnum;
    ctx: OffscreenCanvasRenderingContext2D;
    array: Tile[]
    constructor( columns: number, rows: number, ctx: OffscreenCanvasRenderingContext2D, canvasType: CanvasTypeEnum ) {
        this.canvasType = canvasType;
        this.rows = rows;
        this.columns = columns;        
        this.overflowColumns = this.columns >= CANVAS_COLUMNS ? 0 : CANVAS_COLUMNS - this.columns;
        this.overflowRows = this.rows >= CANVAS_ROWS ? 0 : CANVAS_ROWS - this.rows;
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
            this.array.push( new Tile( i, tileX, tileY, this.ctx, row, col, this.canvasType ) )

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

    drawMap( tilesheetModel: TilesheetModel ): void {
        for ( let i = 0; i < this.array.length; i += this.columns ) {
            const row = this.array.slice( i, i + this.columns )
            this.drawRowInMap( row, tilesheetModel )
        }
    }

    drawRowInMap( currentRow: Tile[], tilesheetModel: TilesheetModel ) {
        for ( let j = 0; j < this.columns; j++ ) {
            const currentTile = currentRow[j]
            if ( currentTile.isVisible() ) {
                currentTile.drawTileInMap( tilesheetModel );
            }
        }
    }

    getTileAtXY( x: number, y: number ): Tile {
        const column = Math.ceil( ( x - this.x ) / GRID_BLOCK_PX);
        const row = Math.ceil( ( y - this.y )  / GRID_BLOCK_PX);

        return this.getTileAtCell( column, row );
    }

    getTileAtCell( column: number, row: number ): Tile {
        const tileIndex = ( ( (row as number ) * this.columns ) - ( this.columns - (column as number)) ) - 1;
        return this.array[tileIndex]
    }

    setTileGridToArray( tileGrid: TileModel[] ): void {
        this.array.forEach( ( e, index ) => {
            e.setTileID( tileGrid[index].id );
            e.setSettings( { 'mirrored': tileGrid[index].mirrored, 'angle': tileGrid[index].angle } )
        })
    }
}