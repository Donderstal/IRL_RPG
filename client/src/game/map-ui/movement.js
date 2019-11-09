const globals = require('../../game-data/globals')

let frameCount = 0;
let sprite;
let frontContext;
let pressedKeys = {};
let hasMoved;

// this function gets called by Window.requestAnimationFrame about 60 times per second
// The pressedKeys variable is manipulated in GfxContainer with Eventlisteners

/**
 * @function initMovement
 * MAIN FUNCTION
 * 
 * Is called when sprite is rendered
 * 
 */
const initMovement = (character) => {

    sprite = character
    window.requestAnimationFrame(movementController)
}

const movementController = ( ) => {   

    hasMoved = false

    frontContext = sprite.ctx

    if ( pressedKeys.w ) {
        clearRect( sprite )
        moveInDirection( 'FACING_UP' )
    }
    if ( pressedKeys.a ) {
        clearRect( sprite )
        moveInDirection( 'FACING_LEFT' )
    }
    if ( pressedKeys.s ) {
        clearRect( sprite )
        moveInDirection( 'FACING_DOWN' )
    }
    if ( pressedKeys.d ) {
        clearRect( sprite )
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
        sprite.x += globals.MOVEMENT_SPEED        
    }

    if ( direction == 'FACING_LEFT' ) {
        sprite.x -= globals.MOVEMENT_SPEED        
    }
    
    if ( direction == 'FACING_DOWN' ) {
        sprite.y += globals.MOVEMENT_SPEED        
    }

    if ( direction == 'FACING_UP' ) {
        sprite.y -= globals.MOVEMENT_SPEED        
    }

    sprite.direction = globals[direction]
    hasMoved = true;
}

const clearRect = () => {

    frontContext.clearRect( 
        sprite.x, sprite.y, 
        sprite.width, sprite.height
    )
}

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

const redrawSprite = (  ) => {

    // see helpers/docs.js for a description of drawImage's parameters
    frontContext.drawImage(
        sprite.image,
        sprite.animLoop[sprite.animIterator] * globals.GRID_BLOCK_PX, 
        sprite.direction * globals.GRID_BLOCK_PX, 
        globals.GRID_BLOCK_PX, globals.GRID_BLOCK_PX,
        sprite.x, sprite.y, sprite.width, sprite.height
    );
}

module.exports = {
    pressedKeys,
    initMovement
}