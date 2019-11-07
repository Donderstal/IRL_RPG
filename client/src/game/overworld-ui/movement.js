const globals = require('../../game-data/globals')

let frameCount = 0;
let playerCharacter;
let frontContext;
let pressedKeys = {};
let hasMoved = false;

// this function gets called by Window.requestAnimationFrame about 60 times per second
// The pressedKeys variable is manipulated in GfxContainer with Eventlisteners

const movementController = ( ) => {   

    frontContext = playerCharacter.ctx

    if ( pressedKeys.d ) {
        clearRect( )
        playerCharacter.xy.x += globals.MOVEMENT_SPEED
        playerCharacter.direction = globals.FACING_RIGHT
        hasMoved = true;
    }
    if ( pressedKeys.a ) {
        clearRect( playerCharacter )
        playerCharacter.xy.x  -= globals.MOVEMENT_SPEED
        playerCharacter.direction = globals.FACING_LEFT
        hasMoved = true;
    }
    if ( pressedKeys.w ) {
        clearRect( playerCharacter )
        playerCharacter.xy.y  -= globals.MOVEMENT_SPEED
        playerCharacter.direction = globals.FACING_UP
        hasMoved = true;
    }
    if ( pressedKeys.s ) {
        moveInDirection( 'FACING_DOWN' )
    }

    if (hasMoved) {
        redrawSprite()
    }

    window.requestAnimationFrame(movementController)
}

const moveInDirection = ( direction ) => {

    clearRect( playerCharacter )
    playerCharacter.xy.y  += globals.MOVEMENT_SPEED
    playerCharacter.direction = globals[direction]
    hasMoved = true;
}

const clearRect = () => {

    frontContext.clearRect( 
        playerCharacter.xy.x, playerCharacter.xy.y, 
        playerCharacter.width, playerCharacter.height
    )
}

const redrawSprite = (  ) => {

    frameCount++;
    
        if (frameCount >= globals.FRAME_LIMIT) {
            frameCount = 0;
            playerCharacter.animIterator++;

            if (playerCharacter.animIterator >= playerCharacter.animLoop.length) {
                playerCharacter.animIterator = 0;
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
}

const initMovement = (character) => {
    playerCharacter = character
    window.requestAnimationFrame(movementController)
}


module.exports = {
    pressedKeys,
    initMovement
}