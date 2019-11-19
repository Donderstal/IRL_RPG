const state = require('../game-data/state')
const globals = require('../game-data/globals')

const getCellFromXY = (x, y) => {
    const topLeftCell = state.currentMap.topLeftCell    
    let col = topLeftCell.col + Math.floor( (x - topLeftCell.x) / globals.GRID_BLOCK_PX )
    let row = topLeftCell.row + Math.floor( (y - topLeftCell.y) / globals.GRID_BLOCK_PX )


    // top row of indoors houses are walls and impassable
    if ( state.currentMap.mapData.location === "indoors") {
        row += 1
    }

    // some checks for edgecases 
    if ( col < 0 ) {
        col = 0
    }

    if ( row < 0 ) {
        row = 0
    }
    return { 
        'row': row ,
        'col': col
    }
}

const getXYFromCell = (row, col) => {
    const topLeftCell = state.currentMap.topLeftCell
    console.log( row, col, topLeftCell )
}

/**
 * @function getTopLeftCellOfGridInCanvas
 * 
 * The Top Left Cell will be used as a checkpoint
 * To find out where characters and tiles are relative to the map
 * 
 * @return {object} - holding x and y of top left cell and its position in the map grid
 */

const getTopLeftCellOfGridInCanvas = ( ) => {
    let row = 0
    let col = 0
    let x = state.currentMap.startingPosition.x 
    let y = state.currentMap.startingPosition.y

    // if map is larger than the canvas, x or y will be negative dividing 
    // the negative x / y with the negative size of a single block will return
    // the cell offset between top-left of canvas and top left of entire map

    if ( x < 0 ) {
        col = x / -globals.GRID_BLOCK_PX
        x = 0
    }

    if ( y < 0 ) {
        row  = y / -globals.GRID_BLOCK_PX
        y = 0
    }
    
    return {
        x: x,
        y: y,
        row: row,
        col: col

    }
}

module.exports = {
    getCellFromXY, 
    getXYFromCell,
    getTopLeftCellOfGridInCanvas
}