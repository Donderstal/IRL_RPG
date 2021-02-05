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

/**
 * @function determineShortestPath
 * All props to gregtrowbridge.com for explaining and sharing this algorithm
 */
const determineShortestPath = ( startingTile, grid ) => {
    let location = new GridLocation( startingTile.row, startingTile.col, "START" )
    const queue = [ location ];

    while ( queue.length > 0 ) {
        const currentLocation = queue.shift( );

        var newLocation = exploreInDirection( currentLocation, 'NORTH', grid )
        if ( newLocation.status == 'GOAL' ) {
            return newLocation.path;
        }
        else if ( newLocation.status == 'VALID' ) {
            queue.push(newLocation);
        }

        var newLocation = exploreInDirection( currentLocation, 'EAST', grid )
        if ( newLocation.status == 'GOAL' ) {
            return newLocation.path;
        }
        else if ( newLocation.status == 'VALID' ) {
            queue.push(newLocation);
        }

        var newLocation = exploreInDirection( currentLocation, 'SOUTH', grid )
        if ( newLocation.status == 'GOAL' ) {
            return newLocation.path;
        }
        else if ( newLocation.status == 'VALID' ) {
            queue.push(newLocation);
        }

        var newLocation = exploreInDirection( currentLocation, 'WEST', grid )
        if ( newLocation.status == 'GOAL' ) {
            return newLocation.path;
        }
        else if ( newLocation.status == 'VALID' ) {
            queue.push(newLocation);
        }

        return false;
    }
}

class GridLocation {
    constructor( row, column, status = null ) {
        this.row = row;
        this.column = column;
        this.path = [];
        this.status = status;
    }
}
const getLocationStatus = ( location, grid ) => {
    const rowsInGrid;
    const colsInGrid;

    if ( location.row < 0 || location.column < 0 || location.row > rowsInGrid || location.col > colsInGrid ) {
        return "INVALID";
    } else if ( grid[location] == "GOAL" ) {
        return 'GOAL';
    } else if ( grid[location] !== "EMPTY" ) {
        return 'BLOCKED';
    } else {
        return "VALID";
    }
}

const exploreInDirection = ( currentLocation, direction, grid ) => {
    let newPath = currentLocation.path.slice( );
    newPath.push(direction);

    let row = currentLocation.row;
    let col = currentLocation.col;

    switch( direction ) {
        case "NORTH" :
            break;
        case "EAST" :
            break;
        case "SOUTH" :
            break;
        case "WEST" :
            break;
        default:
            console.log('Direction ' + direction + " not recognized" );
    }

    const newLocation = new GridLocation( row, col );
    newLocation.status = getLocationStatus( newLocation, grid );

    if (  newLocation.status === "VALID" ) {
        grid[newLocation] == 'VISITED'
    }

    return newLocation;
}

module.exports = {
    getOppositeDirection,
    determineShortestPath,
    determinePath
}