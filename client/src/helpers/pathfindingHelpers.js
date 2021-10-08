const TILE_STATUS_INVALID = "INVALID";
const TILE_STATUS_BLOCKED = "BLOCKED";
const TILE_STATUS_VALID = "VALID";

const DIRECTION_NORTH = "NORTH";
const DIRECTION_EAST = "EAST";
const DIRECTION_SOUTH = "SOUTH";
const DIRECTION_WEST = "WEST";

let colsInGrid, rowsInGrid, tiles;
let queue, visitedTilesList, foundPath;

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
const determineShortestPath = ( startingTile, targetTile, grid ) => {
    visitedTilesList = [];
    colsInGrid = grid.cols;
    rowsInGrid = grid.rows;
    tiles = grid.tiles;
    foundPath = false;

    let location = new GridLocation( startingTile.row, startingTile.col, startingTile.index, "START" )
    queue = [ location ];

    while ( queue.length > 0 ) {
        const currentLocation = queue.shift( );

        if ( currentLocation.row != 1 ) {
            addTileInDirectionToQueueIfValid( currentLocation, DIRECTION_NORTH, targetTile )   
        }
        if ( currentLocation.column != colsInGrid ) {
            addTileInDirectionToQueueIfValid( currentLocation, DIRECTION_EAST, targetTile ) 
        }
        if ( currentLocation.row != rowsInGrid ) {
            addTileInDirectionToQueueIfValid( currentLocation, DIRECTION_SOUTH, targetTile )   
        }
        if  ( currentLocation.column != 1 ) {
            addTileInDirectionToQueueIfValid( currentLocation, DIRECTION_WEST, targetTile )            
        }

        if ( foundPath != false )
            return foundPath;
    } 

    return false;    
}

const addTileInDirectionToQueueIfValid = ( currentLocation, direction, targetTile ) => {
    var newLocation = exploreInDirection( currentLocation, direction )
    if ( newLocation.index == targetTile.index  ) {
        foundPath = newLocation.path;
    }
    else if ( newLocation.status == TILE_STATUS_VALID ) {
        queue.push(newLocation);
    }   
}

/**
 * Return a TILE_STATUS string representing wether the tile is valid, invalid or blocked.
 * @param {GridLocation} location 
 */
const getLocationStatus = ( location ) => {
    if ( location.row < 1 || location.column < 1 || location.row > rowsInGrid || location.col > colsInGrid ) {
        return TILE_STATUS_INVALID;
    } else if ( visitedTilesList.indexOf(location.index) > -1 ) {
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
const exploreInDirection = ( currentLocation, direction  ) => {
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

    let tileInList = false;
    let index;
    tiles.forEach( ( e ) => { 
        if ( e.col == col && e.row == row ) {
            tileInList = true;
            index = e.index
        }
    })

    if ( !tileInList )
        return { index: 'x', status: TILE_STATUS_INVALID };

    const newLocation = new GridLocation( row, col, index );
    newLocation.path = [...currentLocation.path.slice( ), index];
    newLocation.status = getLocationStatus( newLocation  );

    if ( newLocation.status === TILE_STATUS_VALID )
        visitedTilesList.push( newLocation.index )

    return newLocation;
}

module.exports = {
    determineShortestPath
}