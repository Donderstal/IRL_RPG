const state = require('../game-data/state')
const globals = require('../game-data/globals')

/**
 * @function getTopLeftCellOfGridInCanvas
 * 
 * The top left cell will be included in the game state and will used as..
 * a measuring point for other functionalities. It is the connecting point..
 * of the canvas x and y and the map grid columns and rows
 * @return {object} - x and y of top left cell and row and column in the grid
 */

const getTopLeftCellOfGridInCanvas = ( x, y ) => {

    // if map is not larger than canvas, row and col are always 0
    let row = 0
    let col = 0

    // if map is wider than canvas, the most left cell...
    // currently displayed must have a x of 0
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

/**
 * @function getCellOfXY 
 * 
 * @param {integer} x - x axis within canvas
 * @param {integer} y - y axis within canvas
 * Get row and column of a map grid cell based on x and y
 * @return {object} - with row and column as props
 */
const getCellOfXY = (x, y) => {
    const topLeftCell = state.currentMap.topLeftCell    
    let col = topLeftCell.col + Math.floor( (x - topLeftCell.x) / globals.GRID_BLOCK_PX )
    let row = topLeftCell.row + Math.floor( (y - topLeftCell.y) / globals.GRID_BLOCK_PX )


    // top row of indoors houses are walls and impassables
    if ( !state.currentMap.mapData.outdoors) {
        row += 1
    }

    // there is no row or column -1
    if ( col < 0 ) {
        col = 0
    }
    if ( row < 0 ) {
        row = 0
    }  

    return { 
        'row': row,
        'col': col
    }
}

/**
 * @function getXYOfCell
 * 
 * @param {integer} row - row in map grid
 * @param {integer} col - column in map grid
 * Get top-left x an y of a cell 
 * @return {object} - with x and y as props
 */
const getXYOfCell = (row, col) => {
    const topLeftCell = state.currentMap.topLeftCell
    const x = topLeftCell.x + ( ( col - topLeftCell.col ) * globals.GRID_BLOCK_PX )
    const y = topLeftCell.y +( ( row - topLeftCell.row ) * globals.GRID_BLOCK_PX )

    return  { 
        'x': x,
        'y': y
    }

}

/**
 * @function getTileIdOfCell
 * 
 * @param {integer} row - row of map grid
 * @param {integer} col - col of map grid
 * Get Id of Tile displayed in requested cell..
 * within the map grid stored in the map state
 *  
 * @return {integer} - tile id
 */
const getTileIdOfCell = ( row, col ) => {
    const gridRow = state.currentMap.mapData.grid[row]
    return gridRow[col]
}

module.exports = {
    getTopLeftCellOfGridInCanvas,
    getCellOfXY, 
    getXYOfCell,
    getTileIdOfCell
}