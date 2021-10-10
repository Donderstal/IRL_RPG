const { GRID_BLOCK_PX } = require('../game-data/globals');
const { cloneInstance } = require('./utilFunctions');

class TileSquare {
    constructor( tileList ) {
        this.tileList = [];
        this.setTileList( tileList );
        this.setSquareDimensions( );
        console.log(this);
    }

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
        let spriteIsOnTiles = false;
        if ( sprite.left > this.left && sprite.left < this.right ) {
            spriteIsOnTiles = true;
        }
        else if ( sprite.right > this.left && sprite.right < this.right ) {
            spriteIsOnTiles = true;
        }
        else if ( sprite.top > this.top && sprite.top < this.top ) {
            spriteIsOnTiles = true;
        }
        else if ( sprite.bottom > this.top && sprite.top < this.top ) {
            spriteIsOnTiles = true;
        }
        return spriteIsOnTiles;
    }
}

module.exports = {
    TileSquare
}