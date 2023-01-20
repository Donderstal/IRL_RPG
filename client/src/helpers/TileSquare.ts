import { GRID_BLOCK_PX } from '../game-data/globals';
import { drawRect } from './canvasHelpers';
import { cloneInstance } from './utilFunctions';
import type { Tile } from '../game/core/Tile';
import type { Sprite } from '../game/core/Sprite';

export class TileSquare {
    tileList: Tile[];

    left: number;
    top: number;
    right: number;
    bottom: number;

    width: number;
    height: number;
    constructor( tileList: Tile[] ) {
        this.tileList = [];
        this.setTileList( tileList );
        this.setSquareDimensions( );
    }

    get leftColumn( ): number { return Math.min.apply(Math, this.tileList.map( (tile) => { return tile.column; } )); };
    get topRow(): number { return Math.min.apply(Math, this.tileList.map( (tile) => { return tile.row; } )); };
    get rightColumn(): number { return Math.max.apply(Math, this.tileList.map( (tile) => { return tile.column; } )); };
    get bottomRow(): number { return Math.max.apply(Math, this.tileList.map( (tile) => { return tile.row; } )); };
 
    draw( color: string, context: OffscreenCanvasRenderingContext2D ): void {
        context.fillStyle = color;
        context.fillRect( this.left, this.top, this.width, this.height)
    }

    setTileList( list: Tile[] ): void {
        list.forEach( ( tile ) => { 
            this.tileList.push( cloneInstance(tile) )
        })
    }

    setSquareDimensions( ): void {
        this.left   = Math.min.apply(Math, this.tileList.map( (tile) => { return tile.x; } ));
        this.top    = Math.min.apply(Math, this.tileList.map( (tile) => { return tile.y; } ));
        this.right  = Math.max.apply(Math, this.tileList.map( (tile) => { return tile.x; } )) + GRID_BLOCK_PX; 
        this.bottom = Math.max.apply(Math, this.tileList.map( (tile) => { return tile.y; } )) + GRID_BLOCK_PX;
        
        this.width  = this.right - this.left;
        this.height = this.bottom - this.top;
    }

    spriteIsInTileSquare( sprite: Sprite ): boolean{
        return this.spriteInHorizontalRange( sprite ) && this.spriteInVerticalRange( sprite );
    }

    spriteInHorizontalRange( sprite: Sprite ): boolean {
        if ( sprite.left > this.left && sprite.left < this.right ) {
            return true;
        }
        else if ( sprite.right > this.left && sprite.right < this.right ) {
            return true;
        }
        else if ( sprite.right >= this.right && sprite.left <= this.left ) {
            return true;
        }
        return false;
    }

    spriteInVerticalRange( sprite: Sprite ): boolean {
        if ( sprite.isCar ? sprite.top > this.top && sprite.top < this.bottom : sprite.baseY > this.top && sprite.baseY < this.bottom ) {
            return true;
        }
        else if ( sprite.bottom > this.top && sprite.bottom < this.bottom ) {
            return true;
        }
        else if ( sprite.bottom >= this.bottom && sprite.top <= this.top ) {
            return true;
        }
        return false;
    }

    tileIsIncluded( tile: Tile ): boolean {
        if ( tile == undefined )
            return false;
        let isIncluded = false;
        this.tileList.forEach( ( tileInList) => { 
            if ( tile.index == tileInList.index ) 
                isIncluded = true;
        });
        return isIncluded;
    }
}