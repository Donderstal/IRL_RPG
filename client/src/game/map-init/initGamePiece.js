const canvasHelpers = require('../../helpers/canvasHelpers')
const globals = require('../../game-data/globals')

// The gamePiece class will be assigned to all map characters in the game

class gamePiece {
    constructor ( ) {

        this.x       =  370, 
        this.y       =  185,

        this.width   = globals.STRD_SPRITE_WIDTH;
        this.height  = globals.STRD_SPRITE_HEIGHT;

        this.animLoop      = [ 0, 1, 2, 3]
        this.animIterator  = 0
        this.direction     = 0;

        this.image         = getSprite( this.x, this.y, this.width, this.height, '/static/sprites/neckbeard.png' )    
    }
}

const getSprite = ( x, y, width, height, spriteSrc ) => {
    let newSprite = new Image()

    newSprite.onload = ( ) => {
        canvasHelpers.drawSprite( newSprite, 0, 0, 37, 37, x, y, width, height )                
    }

    newSprite.src = spriteSrc

    return newSprite
}

module.exports = {
    gamePiece
}