const state = require('../../../game-data/state')

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
        
    if ( state.currentMap.NPCs ) {        
        for( var i = 0; i < state.currentMap.NPCs.length; i++ ) {
            if ( state.currentMap.NPCs[i].hitbox.checkForBlockedRange( ) ) {
                return false;
            }
        }
    }

    if ( state.currentMap.blockedXyValues ) {
        for( var i = 0; i < state.currentMap.blockedXyValues.length; i++ ) {
            if ( state.currentMap.blockedXyValues[i].checkForBlockedRange( ) ) {
                return false;
            }
        }
    }

    const activeMapData = state.currentMap.mapData
    const activeMapBorders = state.currentMap.borders

    if ( direction == 'FACING_LEFT' ) {
        if ( activeMapBorders.left >= sprite.x ) {
            if ( !activeMapData.outdoors ) {
                return false
            }
            if ( !activeMapData.neighbours.left ) {
                return false
            }
        }
    }    

    if ( direction == 'FACING_RIGHT' ) {
        if ( activeMapBorders.right <= sprite.x ) {
            if ( !activeMapData.outdoors ) {
                return false
            }
            if ( !activeMapData.neighbours.right ) {
                return false
            }
        }
    }

    if ( direction == 'FACING_UP' ){
        if ( activeMapBorders.top >= sprite.y ) {
            if ( !activeMapData.outdoors ) {
                return false
            }
            if ( !activeMapData.neighbours.up ) {
                return false
            }
        }
    }   

    if ( direction == 'FACING_DOWN' ) {
        if ( activeMapBorders.bottom <= sprite.y ) {
            if ( !activeMapData.outdoors ) {
                return false
            }
            if ( !activeMapData.neighbours.down ) {
                return false
            }
        }
    }
    
    return true
}

module.exports = {
    checkIfMovementAllowed
}