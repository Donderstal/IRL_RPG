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
    return {
        x: x,
        y: y,
        row: 0,
        col: 0
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
    let col = topLeftCell.col + Math.floor( (x - topLeftCell.x) / globals.GRID_BLOCK_PX )
    let row = topLeftCell.row + Math.floor( (y - topLeftCell.y) / globals.GRID_BLOCK_PX )
    
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
    const x = topLeftCell.x + ( ( col - topLeftCell.col ) * globals.GRID_BLOCK_PX )
    const y = topLeftCell.y + ( ( row - topLeftCell.row ) * globals.GRID_BLOCK_PX )

    return  { 
        'x': x,
        'y': y
    }

}

/**
 * @function findNamedCharacterOnMap
 * 
 * @param {string} nameToFind
 *      Check if nameToFind is 'Player'
 *      If not, loop through NPCs for nameToFind
 * 
 * @return {MapSprite}
 */
const findNamedCharacterOnMap = ( nameToFind ) => {
    return { }
}

module.exports = {
    getTopLeftCellOfGridInCanvas,
    findNamedCharacterOnMap,
    getCellOfXY, 
    getXYOfCell
}