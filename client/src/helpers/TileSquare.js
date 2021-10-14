const globals = require("../game-data/globals");
const { GRID_BLOCK_PX } = require('../game-data/globals');
const { cloneInstance } = require('./utilFunctions');

class TileSquare {
    constructor( tileList ) {
        this.tileList = [];
        this.setTileList( tileList );
        this.setSquareDimensions( );
        console.log(this);
    }

    get leftColumn( ) { return Math.min.apply(Math, this.tileList.map( (tile) => { return tile.col; } )); };
    get topRow( ) { return Math.min.apply(Math, this.tileList.map( (tile) => { return tile.row; } )); };
    get rightColumn( ) { return Math.max.apply(Math, this.tileList.map( (tile) => { return tile.col; } )); };
    get bottomRow( ) { return Math.max.apply(Math, this.tileList.map( (tile) => { return tile.row; } )); };
 
    setTileList( list ) {
        list.forEach( ( tile ) => { 
            this.tileList.push( cloneInstance(tile) )
        })
    }

    setSquareDimensions( ) {
        this.left   = Math.min.apply(Math, this.tileList.map( (tile) => { return tile.x; } ));
        this.top    = Math.min.apply(Math, this.tileList.map( (tile) => { return tile.y; } ));
        this.right  = Math.max.apply(Math, this.tileList.map( (tile) => { return tile.x; } )) + GRID_BLOCK_PX; 
        this.bottom = Math.max.apply(Math, this.tileList.map( (tile) => { return tile.y; } )) + GRID_BLOCK_PX;
        
        this.width  = this.right - this.left;
        this.height = this.bottom - this.top;
    }

    spriteIsInTileSquare( sprite ) {
        return this.spriteInHorizontalRange( sprite ) && this.spriteInVerticalRange( sprite );
    }

    spriteInHorizontalRange( sprite ) {
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

    spriteInVerticalRange( sprite ) {
        if ( sprite.top > this.top && sprite.top < this.bottom ) {
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
}

module.exports = {
    TileSquare
}