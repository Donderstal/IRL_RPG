const globals = require('../../game-data/globals')
const util = require('../../helpers/utilFunctions')
const state = require('../../game-data/state')
const mapHelpers = require('../mapHelpers')

let frameCount = 0;
let sprite;
let frontContext;
let pressedKeys = {};

/**
 * EXPORT @function initMovement
 * Listen for keypresses
 * and pass them to 
 */
const listenForKeyPress = () => {
    window.addEventListener('keydown', (event) => {
        pressedKeys[event.key] = true
    })
    window.addEventListener('keyup', () => {
        pressedKeys[event.key] = false
    })
}

/**
 * EXPORT @function initMovement
 * Is called when player sprite is rendered
 * 
 * Passes @function playerMovementController as callback
 * to requestAnimationFrame
 */
const initPlayerMovement = (character) => {

    sprite = character
    sprite.getCurrentCellCoordinates
    frontContext = util.getFrontCanvasContext( )
    window.requestAnimationFrame(playerMovementController)
}

/**
 * @function playerMovementController
 * Gets called +/- 60 times per second with requestAnimationFrame
 * 
 * If the player is pressing d-pad or wasd...
 * Call @function handleMovementOfSprite
 */
const playerMovementController = ( ) => {   

    if ( pressedKeys.w || pressedKeys.ArrowUp ) {
        handleMovementOfSprite('FACING_UP')
    }
    if ( pressedKeys.a || pressedKeys.ArrowLeft ) {
        handleMovementOfSprite('FACING_LEFT')
    }
    if ( pressedKeys.s || pressedKeys.ArrowDown ) {
        handleMovementOfSprite('FACING_DOWN')
    }
    if ( pressedKeys.d || pressedKeys.ArrowRight ) {
        handleMovementOfSprite('FACING_RIGHT')
    }    

    window.requestAnimationFrame(playerMovementController)
}

/**
 * @function handleMovementOfSprite
 * Call functions in order to move sprite
 * @param {string} direction - string representing direction
 * 
 * Call @function clearRect to clear old sprite
 * Call @function moveInDirection to update sprite xy and direction
 * Call @function countFrame to update animationIterator and framecount
 * Call @function redrawSprite to draw sprite in new location and/or pose
 */
const handleMovementOfSprite = ( direction ) => {

    clearSprite( )
    moveInDirection( direction )
    countFrame( )
    redrawSprite( )
}

/**
 * @function clearSprite
 * Call clearRect to clear sprite Of its location
 */
const clearSprite = () => {
    
    frontContext.clearRect( 
        0, 0, 
        globals.CANVAS_WIDTH, globals.CANVAS_HEIGHT
    )
}

/**
 * @function moveInDirection
 * @param {string} direction - string representing direction
 * 
 * Check map borders to see if movement is allowd
 * Update sprite x or y with movement speed based on direction
 * Update sprite direction prop based on direction globals
 */
const moveInDirection = ( direction ) => {

    const movementIsAllowed = checkIfMovementAllowed( sprite, direction )

    if (movementIsAllowed) {

        if ( direction == 'FACING_RIGHT' && state.currentMap.borders.right > sprite.x ) {
            sprite.x += globals.MOVEMENT_SPEED        
        }

        if ( direction == 'FACING_LEFT' && state.currentMap.borders.left < sprite.x ) {
            sprite.x -= globals.MOVEMENT_SPEED        
        }
        
        if ( direction == 'FACING_DOWN' && state.currentMap.borders.bottom > sprite.y ) {
            sprite.y += globals.MOVEMENT_SPEED        
        }

        if ( direction == 'FACING_UP' && state.currentMap.borders.top < sprite.y ){
            sprite.y -= globals.MOVEMENT_SPEED        
        }        
    }


    sprite.direction = globals[direction]        
}

/**
 * @function checkIfMovementAllowed
 * 
 * 
 */

const checkIfMovementAllowed = ( sprite, direction ) => {

    const forbiddenTiles = state.currentMap.mapData.blocked
    const locationInGrid = mapHelpers.getCellOfXY(sprite.x, sprite.y)
    let nextTile = {};

    if ( direction == 'FACING_RIGHT' && locationInGrid.col < state.currentMap.mapData.columns ) {
        nextTile.id = mapHelpers.getTileIdOfCell( locationInGrid.row, locationInGrid.col + 1 )
        nextTile.xy = mapHelpers.getXYOfCell( locationInGrid.row, locationInGrid.col + 1 )

        console.log("sprite x: " + sprite.x, "sprite y:" + sprite.y)
        console.log("nexttile id: " + nextTile.id, "nexttile xy: " + nextTile.xy)

        for ( var i = 0; i < forbiddenTiles.length; i++) {
            if ( forbiddenTiles[i] === nextTile.id ) {
                        
                return false
            }
        }
    }

    if ( direction == 'FACING_LEFT' && locationInGrid.col > 0 ) {
        nextTile.id = mapHelpers.getTileIdOfCell( locationInGrid.row, locationInGrid.col - 1 )
        nextTile.xy = mapHelpers.getXYOfCell( locationInGrid.row, locationInGrid.col - 1 )
        
        console.log("sprite x: " + sprite.x, "sprite y:" + sprite.y)
        console.log("nexttile id: " + nextTile.id, "nexttile xy: " + nextTile.xy)


        for ( var i = 0; i < forbiddenTiles.length; i++) {
            if ( forbiddenTiles[i] === nextTile.id )  {
                        
                return false
            }
        }
    }
    
    if ( direction == 'FACING_DOWN' && locationInGrid.row < state.currentMap.mapData.rows ) {
        nextTile.id = mapHelpers.getTileIdOfCell( locationInGrid.row + 1, locationInGrid.col )     
        nextTile.xy = mapHelpers.getXYOfCell( locationInGrid.row + 1, locationInGrid.col )
        
        console.log("sprite x: " + sprite.x, "sprite y:" + sprite.y)
        console.log("nexttile id: " + nextTile.id, "nexttile xy: " + nextTile.xy)


        for ( var i = 0; i < forbiddenTiles.length; i++) {
            if ( forbiddenTiles[i] === nextTile.id ) {
                        
                return false
            }
        }
    }

    if ( direction == 'FACING_UP' && locationInGrid.row > 0 ){
        nextTile.id = mapHelpers.getTileIdOfCell( locationInGrid.row - 1, locationInGrid.col )        
        nextTile.xy = mapHelpers.getXYOfCell( locationInGrid.row - 1, locationInGrid.col )
        
        console.log("sprite x: " + sprite.x, "sprite y:" + sprite.y)
        console.log("nexttile id: " + nextTile.id, "nexttile xy: " + nextTile.xy)


        for ( var i = 0; i < forbiddenTiles.length; i++) {
            if ( forbiddenTiles[i] === nextTile.id ) {
                        
                return false
            }
        } 
    }    
    
    return true
}

/**
 * @function countFrame
 * Update frame count every time requestAnimationFrame fires callback
 * Update sprite's animIterator every time FRAME_LIMIT is equal to framecount 
 * Reset animIterator to zero if necessary
 */
const countFrame = () => {
    
    frameCount++;
    
    if (frameCount >= globals.FRAME_LIMIT) {
        frameCount = 0;
        sprite.animIterator++;

        if (sprite.animIterator >= sprite.animLoop.length) {
            sprite.animIterator = 0;
        }
    }
}

/**
 * @function redrawSprite
 * Call drawImage to render sprite in updated location and/or position
 */
const redrawSprite = (  ) => {

    // see sr/helpers/docs.js for a description of drawImage's parameters
    frontContext.drawImage(
        sprite.image,
        sprite.animLoop[sprite.animIterator] * globals.GRID_BLOCK_PX, 
        sprite.direction * globals.GRID_BLOCK_PX, 
        globals.GRID_BLOCK_PX, globals.GRID_BLOCK_PX,
        sprite.x, sprite.y, sprite.width, sprite.height
    );
}

module.exports = {
    listenForKeyPress,
    initPlayerMovement
}