const globals = require('../../game-data/globals')

let frameCount = 0;
let playerCharacter;
let pressedKeys = {};

const initMovement = (character) => {
    playerCharacter = character
    window.requestAnimationFrame(movementController)
}

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
        console.log(playerCharacter.xy.cell)

        frameCount++;
    
        if (frameCount >= globals.FRAME_LIMIT) {
            frameCount = 0;
            playerCharacter.animIterator++;

            if (playerCharacter.animIterator >= playerCharacter.animLoop.length) {
                playerCharacter.animIterator = 0;
            }
        }
    }
        
    frontContext.drawImage(
        playerCharacter.sprite,
        playerCharacter.animLoop[playerCharacter.animIterator] * 48, ( playerCharacter.direction * 64 ), 48, 64,
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