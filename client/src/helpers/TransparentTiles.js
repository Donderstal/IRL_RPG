const globals = require("../game-data/globals");
const { TileSquare } = require("./TileSquare");

class TransparentTiles extends TileSquare {
    constructor( tileIndexList ) { 
        let FRONT = globals.GAME.FRONT;
        let BACK = globals.GAME.BACK;
        let tileList = tileIndexList.map((index)=>{return FRONT.getTileAtIndex(index)})
        console.log(tileList);
        super( tileList );
        this.sheetImage = BACK.sheetImage;
    }

    draw( ) {
        this.tileList.forEach((tile)=>{
            tile.ctx = globals.GAME.FRONT.ctx;
            let backTile = globals.GAME.BACK.getTileAtIndex(tile.index);
            tile.ID = backTile.ID
            tile.drawTileInMap( this.sheetImage );
        })
    }
}

module.exports = {
    TransparentTiles
}