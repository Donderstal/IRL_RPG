const globals = require('../../game-data/globals')

let frameCount = 0;
let playerCharacter;
let frontContext;
let pressedKeys = {};
let hasMoved;

// this function gets called by Window.requestAnimationFrame about 60 times per second
// The pressedKeys variable is manipulated in GfxContainer with Eventlisteners

const movementController = ( ) => {   

    hasMoved = false

    frontContext = playerCharacter.ctx

    if ( pressedKeys.w ) {
        clearRect( playerCharacter )
        moveInDirection( 'FACING_UP' )
    }
    if ( pressedKeys.a ) {
        clearRect( playerCharacter )
        moveInDirection( 'FACING_LEFT' )
    }
    if ( pressedKeys.s ) {
        clearRect( playerCharacter )
        moveInDirection( 'FACING_DOWN' )
    }
    if ( pressedKeys.d ) {
        clearRect( playerCharacter )
        moveInDirection( 'FACING_RIGHT' )
    }    

    if (hasMoved) {
        countFrame()
        redrawSprite()
    }

    window.requestAnimationFrame(movementController)
}

const moveInDirection = ( direction ) => {

    if ( direction == 'FACING_RIGHT' ) {
        playerCharacter.xy.x += globals.MOVEMENT_SPEED        
    }

    if ( direction == 'FACING_LEFT' ) {
        playerCharacter.xy.x -= globals.MOVEMENT_SPEED        
    }
    
    if ( direction == 'FACING_DOWN' ) {
        playerCharacter.xy.y += globals.MOVEMENT_SPEED        
    }

    if ( direction == 'FACING_UP' ) {
        playerCharacter.xy.y -= globals.MOVEMENT_SPEED        
    }

    playerCharacter.direction = globals[direction]
    hasMoved = true;
}

const clearRect = () => {

    frontContext.clearRect( 
        playerCharacter.xy.x, playerCharacter.xy.y, 
        playerCharacter.width, playerCharacter.height
    )
}

const countFrame = () => {
    
    frameCount++;
    
    if (frameCount >= globals.FRAME_LIMIT) {
        frameCount = 0;
        playerCharacter.animIterator++;

        if (playerCharacter.animIterator >= playerCharacter.animLoop.length) {
            playerCharacter.animIterator = 0;
        }

    }
}

const redrawSprite = (  ) => {

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