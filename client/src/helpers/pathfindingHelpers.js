const state = require('../game-data/state')
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


module.exports = {
    getOppositeDirection,

}