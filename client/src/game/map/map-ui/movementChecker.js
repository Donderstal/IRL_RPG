const state = require('../../../game-data/state')

const globals = require('../../../game-data/globals')

/**
 * @param {string} direction - string representing direction
 * @param {object} sprite - instance of the MapSprite class from initMapSprite.js
 * 
 * Take the blockedXyValues prop from the current map, generated in initMap.js
 * Dependending on the direction the sprite is facing...
 * Check if x or y of sprite is equal to map border
 * Check if x or y of sprite is equal to a forbidden x or y
 * And check if the location of sprite relative to blocked tile
 * 
 * @return {boolean} - expressing wether movement is allowed
 */

const checkIfMovementAllowed = ( sprite, direction ) => {
    const activeBackgroundTile = globals.BACKGROUND.grid.array[sprite.activeTileIndex];
    const activeForegroundTile = globals.FOREGROUND.grid.array[sprite.activeTileIndex];
    sprite.hasMoved = false;

    if ( sprite.nextTileIndex >= globals.BACKGROUND.grid.array.length || sprite.nextTileIndex < 0 ) {
        console.log('stop!')
        return false;
    }

    if ( direction == 'FACING_UP' && activeBackgroundTile.row == 1 ){
        console.log('stop!')
        return false;
    }   

    if ( direction == 'FACING_DOWN' && activeBackgroundTile.row == globals.BACKGROUND.grid.rows ) {
        console.log('stop!')
        return false;
    }
    
    const nextBackgroundTile = globals.BACKGROUND.grid.array[sprite.nextTileIndex];
    const nextForegroundTile = globals.FOREGROUND.grid.array[sprite.nextTileIndex];

    if ( direction == 'FACING_LEFT' && nextBackgroundTile.row != activeBackgroundTile.row ) {
        console.log('stop!')
        return false;
    }    

    if ( direction == 'FACING_RIGHT'&& nextBackgroundTile.row != activeBackgroundTile.row  ) {
        console.log('stop!')
        return false;
    }

    if ( nextBackgroundTile.blocked || nextForegroundTile.hasSprite ) {
        console.log('stop!')
        return false;
    }

    if ( nextBackgroundTile.hasEvent && nextBackgroundTile.eventType == "DOOR" ) {
        console.log("DOOR!")
        console.log(nextBackgroundTile.eventData)
    }

    if ( nextBackgroundTile.hasEvent && nextBackgroundTile.eventType == "ACTION" ) {
        console.log("ACTION!")
        console.log(nextBackgroundTile.eventData)
    }
    
    return true
}

module.exports = {
    checkIfMovementAllowed
}