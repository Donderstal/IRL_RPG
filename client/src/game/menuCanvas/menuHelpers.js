const globals = require( '../../game-data/globals' );
const { 
    GRID_BLOCK_PX, GRID_BLOCK_IN_SHEET_PX
} = require( '../../game-data/globals' );

const drawBubblePart = ( name, tile, ctx ) => {
    let pngs = globals.PNG_DICTIONARY;
    ctx.drawImage(
        pngs[name],
        0, 0,
        GRID_BLOCK_IN_SHEET_PX, GRID_BLOCK_IN_SHEET_PX,
        tile.x, tile.y, 
        GRID_BLOCK_PX, GRID_BLOCK_PX
    );
}

module.exports = {
    drawBubblePart
}