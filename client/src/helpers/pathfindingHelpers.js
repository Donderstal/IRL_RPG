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
 * Helper class to log a visited location in the pathfinding algorithm
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
 * Instantiate a GridLocation for the startingTile and push it to the queue array.
 * For each GridLocation in the queue array, check if neighbouring cells are valid locations.
 * If they are valid but not the destination, push them to the queue array. 
 * If they are the destination, return the GridLocations' path property.
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
 * Return a TILE_STATUS string representing wether the tile is valid, invalid or blocked.
 * @param {GridLocation} location 
 * @param {Boolean} isFlying 
 */
const getLocationStatus = ( location, isFlying  ) => {
    if ( location.row < 1 || location.column < 1 || location.row > rowsInGrid || location.col > colsInGrid ) {
        return TILE_STATUS_INVALID;
    } else if ( 
        (!isFlying && 
        ( globals.GAME.getTileOnCanvasAtIndex( "BACK", location.index ).isBlocked || globals.GAME.FRONT.tileHasBlockingSprite( location.index )  ))
        || visitedTilesList.indexOf(location.index) > -1 ) {
        return TILE_STATUS_BLOCKED;
    } else {
        return TILE_STATUS_VALID;
    }
}

/**
 * Get the position that is next to the currentLocation at given direction.
 * Call get CellIndex to determine the new positions index.
 * Instiate a new GridLocation for this position and check its status with getLocationStatus.
 * Then return the GridLocation.
 * @param {GridLocation} location 
 * @param {string} direction 
 * @param {boolean} isFlying 
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
/**
 * Return the index of the tile at given row and column in the current grid.
 * @param {Number} row 
 * @param {Number} column 
 */
const getCellIndex = ( row, column ) => {
    return ( ( row * colsInGrid ) - ( colsInGrid - column ) ) - 1
}

module.exports = {
    determineShortestPath
}