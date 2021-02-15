const globals = require('../game-data/globals')

const TILE_STATUS_INVALID = "INVALID";
const TILE_STATUS_BLOCKED = "BLOCKED";
const TILE_STATUS_VALID = "VALID";

const DIRECTION_NORTH = "NORTH";
const DIRECTION_EAST = "EAST";
const DIRECTION_SOUTH = "SOUTH";
const DIRECTION_WEST = "WEST";

let colsInGrid;
let rowsInGrid;

let visitedTilesList;

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
 * @class GridLocation
 * Used in pathfinding algorithm
 */
class GridLocation {
    constructor( row, column, index, status = null ) {
        this.row = row;
        this.column = column;
        this.path = [];
        this.status = status;
        this.index = index;
    }
}

/**
 * @function determineShortestPath
 * Check all tiles from the startingpoint to determine a viable path
 * All props to gregtrowbridge.com for explaining the algorithm
 */
const determineShortestPath = ( startingTile, targetTile, grid, isFlying ) => {
    visitedTilesList = [];
    colsInGrid = grid.cols;
    rowsInGrid = grid.rows;

    let location = new GridLocation( startingTile.row, startingTile.col, startingTile.index, "START" )
    const queue = [ location ];

    while ( queue.length > 0 ) {
        const currentLocation = queue.shift( );

        if ( currentLocation.row != 1 ) {
            var newLocation = exploreInDirection( currentLocation, DIRECTION_NORTH, isFlying )
            if ( newLocation.index == targetTile.index ) {
                return newLocation.path;
            }
            else if ( newLocation.status == TILE_STATUS_VALID ) {
                queue.push(newLocation);
            }            
        }

        if ( currentLocation.column != colsInGrid ) {
            var newLocation = exploreInDirection( currentLocation, DIRECTION_EAST, isFlying )
            if ( newLocation.index == targetTile.index  ) {
                return newLocation.path;
            }
            else if ( newLocation.status == TILE_STATUS_VALID ) {
                queue.push(newLocation);
            }

        }

        if ( currentLocation.row != rowsInGrid ) {
            var newLocation = exploreInDirection( currentLocation, DIRECTION_SOUTH, isFlying )
            if ( newLocation.index == targetTile.index ) {
                return newLocation.path;
            }
            else if ( newLocation.status == TILE_STATUS_VALID ) {
                queue.push(newLocation);
            }            
        }

        if  ( currentLocation.column != 1 ) {
            var newLocation = exploreInDirection( currentLocation, DIRECTION_WEST, isFlying )
            if ( newLocation.index == targetTile.index  ) {
                return newLocation.path;
            }
            else if ( newLocation.status == TILE_STATUS_VALID ) {
                queue.push(newLocation);
            }            
        }
    }

    return false;    
}

/**
 * @function getLocationStatus 
 * @param {GridLocation} location 
 * @param {boolean} isFlying 
 * Check if a location can be traversed. Used in pathfinding algorithm
 */
const getLocationStatus = ( location, isFlying  ) => {
    if ( location.row < 1 || location.column < 1 || location.row > rowsInGrid || location.col > colsInGrid ) {
        return TILE_STATUS_INVALID;
    } else if ( 
        ( !isFlying && ( globals.GAME.getTileOnCanvasAtIndex( "FRONT", location.index ).isBlocked || globals.GAME.getTileOnCanvasAtIndex( "BACK",location.index ).isBlocked ) )
        || visitedTilesList.indexOf(location.index) > -1 ) {
        return TILE_STATUS_BLOCKED;
    } else {
        return TILE_STATUS_VALID;
    }
}

/**
 * @function exploreInDirection
 * @param {GridLocation} location 
 * @param {string} direction 
 * @param {boolean} isFlying 
 * Get a tile in a direction from the currentLocation and check its status
 */
const exploreInDirection = ( currentLocation, direction, isFlying  ) => {
    let newPath = currentLocation.path.slice( );
    let row = currentLocation.row;
    let col = currentLocation.column;

    switch( direction ) {
        case DIRECTION_NORTH :
            row -= 1;
            break;
        case DIRECTION_EAST :
            col += 1;
            break;
        case DIRECTION_SOUTH :
            row += 1;
            break;
        case DIRECTION_WEST :
            col -= 1;
            break;
        default:
            console.log('Direction ' + direction + " not recognized" );
    }

    let index = getCellIndex( row, col )
    newPath.push(index);
    const newLocation = new GridLocation( row, col, index );
    newLocation.path = newPath;
    newLocation.status = getLocationStatus( newLocation, isFlying  );

    if ( newLocation.status === TILE_STATUS_VALID ) {
        visitedTilesList.push( newLocation.index )
    }

    return newLocation;
}

const getCellIndex = ( row, column ) => {
    return ( ( row * colsInGrid ) - ( colsInGrid - column ) ) - 1
}

module.exports = {
    getOppositeDirection,
    determineShortestPath
}