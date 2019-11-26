/**
 * @function checkIfMovementAllowed
 * 
 * @param {string} direction - string representing direction
 * @param {object} sprite - instance of the gamePiece class from initGamePiece.js
 * 
 * Take the blockedXyValues prop from the current map, generated in initMap.js
 * Dependending on the direction the sprite is facing...
 * Check if x or y of sprite is equal to map border
 * Check if x or y of sprite is equal to a forbidden x or y
 * And check if the location of sprite relative to blocked tile
 * 
 * I know this function is a ugly mess of ifs and forsw
 * But I had difficulty thinking of a different way to do this
 * Let met know what you think
 * 
 * @return {boolean} - expressing wether movement is allowed
 */

const checkIfMovementAllowed = ( sprite, direction ) => {

    const blockedXyValues = state.currentMap.blockedXyValues

    if ( blockedXyValues === undefined ) {
        return true
    }

    const spriteLeft = sprite.x + ( globals.GRID_BLOCK_PX * .25 )
    const spriteRight = sprite.x + ( sprite.width - ( globals.GRID_BLOCK_PX * .25 ) )

    // a sprite is higher than a grid block
    // this needs to be corrected when calculating position
    const spriteTop = sprite.y + ( sprite.height / 3 ) 
    const spriteBottom = sprite.y + sprite.height

    const spriteVerticalMiddle = spriteBottom - ( globals.GRID_BLOCK_PX * .5 )

    if ( direction == 'FACING_LEFT' ) {
        if (state.currentMap.borders.left >= sprite.x ) {
            return false
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
        if (state.currentMap.borders.right <= sprite.x ) {
            return false
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
        if ( state.currentMap.borders.top >= sprite.y ) {
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
        if ( state.currentMap.borders.bottom <= sprite.y ) {
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