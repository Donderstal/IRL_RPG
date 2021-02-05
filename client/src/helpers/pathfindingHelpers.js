const globals = require('../game-data/globals')

const TILE_STATUS_INVALID = "INVALID";
const TILE_STATUS_BLOCKED = "BLOCKED";
const TILE_STATUS_VISITED = "VISITED";
const TILE_STATUS_VALID = "VALID";
const TILE_STATUS_EMPTY = "EMPTY";
const TILE_STATUS_GOAL = "GOAL";

const DIRECTION_NORTH = "NORTH";
const DIRECTION_EAST = "EAST";
const DIRECTION_SOUTH = "SOUTH";
const DIRECTION_WEST = "WEST";

let colsInGrid;
let rowsInGrid;

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

/**
 * @function determineShortestPath
 * All props to gregtrowbridge.com for explaining and sharing this algorithm
 */
const determineShortestPath = ( startingTile, targetTile, grid ) => {
    colsInGrid = grid.cols;
    rowsInGrid = grid.rows;
    let tileList = grid.array;

    grid.array[targetTile.index] = new GridLocation( targetTile.row, targetTile.col, targetTile.index, "GOAL" )
    let location = new GridLocation( startingTile.row, startingTile.col, startingTile.index, "START" )
    const queue = [ location ];

    while ( queue.length > 0 ) {
        const currentLocation = queue.shift( );

        if ( currentLocation.row != 1 ) {
            var newLocation = exploreInDirection( currentLocation, DIRECTION_NORTH, tileList )
            if ( newLocation.status == TILE_STATUS_GOAL ) {
                return newLocation.path;
            }
            else if ( newLocation.status == TILE_STATUS_VALID ) {
                queue.push(newLocation);
            }            
        }

        if ( currentLocation.column != colsInGrid ) {
            var newLocation = exploreInDirection( currentLocation, DIRECTION_EAST, tileList )
            if ( newLocation.status == TILE_STATUS_GOAL ) {
                return newLocation.path;
            }
            else if ( newLocation.status == TILE_STATUS_VALID ) {
                queue.push(newLocation);
            }

        }

        if ( currentLocation.row != rowsInGrid ) {
            var newLocation = exploreInDirection( currentLocation, DIRECTION_SOUTH, tileList )
            if ( newLocation.status == TILE_STATUS_GOAL ) {
                return newLocation.path;
            }
            else if ( newLocation.status == TILE_STATUS_VALID ) {
                queue.push(newLocation);
            }            
        }

        if  ( currentLocation.column != 1 ) {
            var newLocation = exploreInDirection( currentLocation, DIRECTION_WEST, tileList )
            if ( newLocation.status == TILE_STATUS_GOAL ) {
                return newLocation.path;
            }
            else if ( newLocation.status == TILE_STATUS_VALID ) {
                queue.push(newLocation);
            }            
        }
    }

    return false;    
}

class GridLocation {
    constructor( row, column, index, status = null ) {
        this.row = row;
        this.column = column;
        this.path = [];
        this.status = status;
        this.index = index;
    }
}
const getLocationStatus = ( location, tileList ) => {
    if ( location.row < 1 || location.column < 1 || location.row > rowsInGrid || location.col > colsInGrid ) {
        return TILE_STATUS_INVALID;
    } else if ( tileList[location.index].status == TILE_STATUS_GOAL ) {
        return TILE_STATUS_GOAL;
    } else if ( 
        globals.GAME.getTileOnCanvasAtIndex( "FRONT", location.index ).isBlocked 
        || globals.GAME.getTileOnCanvasAtIndex( "BACK", location.index ).isBlocked 
        || tileList[location.index].status ==  TILE_STATUS_VISITED ) {
        return TILE_STATUS_BLOCKED;
    } else {
        return TILE_STATUS_VALID;
    }
}

const exploreInDirection = ( currentLocation, direction, tileList ) => {
    let newPath = currentLocation.path.slice( );
    newPath.push(direction);

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
    const newLocation = new GridLocation( row, col, index );
    newLocation.path = newPath;
    newLocation.status = getLocationStatus( newLocation, tileList );

    if ( newLocation.status === TILE_STATUS_VALID ) {
        tileList[newLocation.index].status = TILE_STATUS_VISITED;
    }

    return newLocation;
}

const getCellIndex = ( row, column ) => {
    return ( ( row * colsInGrid ) - ( colsInGrid - column ) ) - 1
}

module.exports = {
    getOppositeDirection,
    determineShortestPath,
    determinePath
}