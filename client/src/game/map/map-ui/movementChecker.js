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

    const npcBlockedXy = []
        
    if ( state.currentMap.NPCs ) {
        state.currentMap.NPCs.forEach( ( NPC) => {
            npcBlockedXy.push(NPC.blocked)
        } )
    }

    const blockedXyValues = [ ...state.currentMap.blockedXyValues, ...npcBlockedXy ]

    if ( blockedXyValues === undefined ) {
        return true
    }

    const activeMapData = state.currentMap.mapData
    const activeMapBorders = state.currentMap.borders

    const spriteLeft = sprite.x + ( globals.GRID_BLOCK_PX * .25 )
    const spriteRight = sprite.x + ( sprite.width - ( globals.GRID_BLOCK_PX * .25 ) )

    // a sprite is higher than a grid block
    // this needs to be corrected when calculating position
    const spriteTop = sprite.y + globals.GRID_BLOCK_PX
    const spriteBottom = sprite.y + sprite.height

    const spriteVerticalMiddle = spriteBottom - ( globals.GRID_BLOCK_PX * .5 )

    if ( direction == 'FACING_LEFT' ) {
        if ( activeMapBorders.left >= sprite.x ) {
            if ( !activeMapData.outdoors ) {
                return false
            }
            if ( !activeMapData.neighbours.left ) {
                return false
            }
        }
        for ( var i = 0; i < blockedXyValues.length; i++ ) {
            const blockedTile = blockedXyValues[i]
            if ( spriteLeft < blockedTile['RIGHT'] + 2
                 && spriteRight > blockedTile['RIGHT']
                 && spriteBottom >= blockedTile['TOP'] + 1
                 && spriteVerticalMiddle <= blockedTile['BOTTOM']
                ) {
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
        for ( var i = 0; i < blockedXyValues.length; i++ ) {
            const blockedTile = blockedXyValues[i]
            if ( spriteRight > blockedTile['LEFT'] - 2
                && spriteLeft < blockedTile['LEFT']
                && spriteBottom >= blockedTile['TOP'] + 1
                && spriteVerticalMiddle <= blockedTile['BOTTOM']
                ) {
                return false
            }
        }
    }

    if ( direction == 'FACING_UP' ){
        if ( activeMapBorders.top >= sprite.y ) {
            return false
        }
        for ( var i = 0; i < blockedXyValues.length; i++ ) {
            const blockedTile = blockedXyValues[i]
            if ( spriteTop <= blockedTile['BOTTOM'] + 2
                && spriteBottom > blockedTile['BOTTOM'] 
                && spriteLeft <= blockedTile['RIGHT']
                && spriteRight >= blockedTile['LEFT']
            ) {
                return false
            }
        }
    }   

    if ( direction == 'FACING_DOWN' ) {
        if ( activeMapBorders.bottom <= sprite.y ) {
            return false
        }
        for ( var i = 0; i < blockedXyValues.length; i++ ) {
            const blockedTile = blockedXyValues[i]
            if ( spriteBottom >= blockedTile['TOP'] - 2 
                && spriteTop < blockedTile['TOP']
                && spriteLeft <= blockedTile['RIGHT']
                && spriteRight >= blockedTile['LEFT']
                ) {
                return false
            }
        }
    }
    
    return true
}

module.exports = {
    checkIfMovementAllowed
}