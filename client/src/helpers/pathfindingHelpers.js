const globals = require('../game-data/globals')

/**
 * @function getOppositeDirection
 * 
 * @param {integer} direction - integer
 * Down = 0, Left = 1, Right = 2, Top = 3
 * @return {integer} - opposite of input
 */

const getOppositeDirection = ( direction ) => {
    if ( direction == globals["FACING_DOWN"] ) {
        return globals["FACING_UP"];
    }
    if ( direction == globals["FACING_UP"] ) {
        return globals["FACING_DOWN"];
    }
    if ( direction == globals["FACING_LEFT"] ) {
        return globals["FACING_RIGHT"];
    }
    if ( direction == globals["FACING_RIGHT"] ) {
        return globals["FACING_LEFT"];
    }
}

/**
 * @function determinePath
 */

const determinePath = ( startingTile, destinationTile ) => {
    const columnDifference = Math.abs(startingTile.col - destinationTile.col);
    const rowDifference = Math.abs(startingTile.row - destinationTile.row);
    let returnArray = [];    

    if ( columnDifference > rowDifference ) {
        returnArray.push( { 'row': startingTile.row, 'col': destinationTile.col, 'alignment': "horizontal" } )
        returnArray.push( { 'row': destinationTile.row, 'col': destinationTile.col, 'alignment': "vertical" } )
    }
    else {
        returnArray.push( { 'row': destinationTile.row, 'col': startingTile.col, 'alignment': "vertical" } )
        returnArray.push( { 'row': destinationTile.row, 'col': destinationTile.col, 'alignment': "horizontal" } )
    }

    return returnArray;
}

module.exports = {
    getOppositeDirection,
    determinePath
}