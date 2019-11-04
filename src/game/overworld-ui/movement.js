const globals = require('../../game-data/globals')

let frameCount = 0;
let playerCharacter;
let pressedKeys = {};

const initMovement = (character) => {
    playerCharacter = character
    window.requestAnimationFrame(movementController)
}

// this function gets called by Window.requestAnimationFrame about 60 times per second
// The pressedKeys variable is manipulated in GfxContainer with Eventlisteners

const movementController = ( ) => {    
    
    let frontContext = playerCharacter.ctx
        
    frontContext.clearRect( 
        playerCharacter.xy.x, playerCharacter.xy.y, 
        playerCharacter.width, playerCharacter.height
    )

    let hasMoved = false;

    if ( pressedKeys.d ) {
        playerCharacter.xy.x += globals.MOVEMENT_SPEED
        playerCharacter.direction = globals.FACING_RIGHT
        hasMoved = true;
    }
    if ( pressedKeys.a ) {
        playerCharacter.xy.x  -= globals.MOVEMENT_SPEED
        playerCharacter.direction = globals.FACING_LEFT
        hasMoved = true;
    }
    if ( pressedKeys.w ) {
        playerCharacter.xy.y  -= globals.MOVEMENT_SPEED
        playerCharacter.direction = globals.FACING_UP
        hasMoved = true;
    }
    if ( pressedKeys.s ) {
        playerCharacter.xy.y  += globals.MOVEMENT_SPEED
        playerCharacter.direction = globals.FACING_DOWN
        hasMoved = true;
    }

    if (hasMoved) {

        frameCount++;
    
        if (frameCount >= globals.FRAME_LIMIT) {
            frameCount = 0;
            playerCharacter.animIterator++;

            if (playerCharacter.animIterator >= playerCharacter.animLoop.length) {
                playerCharacter.animIterator = 0;
            }
        }
    }
    
    // see helpers/docs.js for a description of drawImage's parameters
    frontContext.drawImage(
        playerCharacter.sprite,
        playerCharacter.animLoop[playerCharacter.animIterator] * globals.GRID_BLOCK_PX, 
        playerCharacter.direction * globals.GRID_BLOCK_PX, 
        globals.GRID_BLOCK_PX, globals.GRID_BLOCK_PX,
        playerCharacter.xy.x, playerCharacter.xy.y, playerCharacter.width, playerCharacter.height
    );

    window.requestAnimationFrame(movementController)
}

const getCell = (x, y) => {

}

module.exports = {
    pressedKeys,
    initMovement
}