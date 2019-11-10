const util = require('../../helpers/utilFunctions')
const state = require('../../game-data/state')

// The gamePiece class will be assigned to all map characters in the game

class gamePiece {
    constructor ( cellSize ) {

        this.x       =  370, 
        this.y       =  185,

        this.width   = cellSize;
        this.height  = cellSize * 1.5;

        this.animLoop      = [ 0, 1, 2, 3]
        this.animIterator  = 0
        this.direction     = 0;

        this.image         = getSprite( this.x, this.y, this.width, this.height, '/static/sprites/neckbeard.png' )    
    }
}

const setCurrentCellCoordinates = ( x, y ) => {
    console.log(state)
    /* console.log(state.mapState.mapData.rows)
    console.log(state.mapState.mapData.columns)
    console.log(state.mapState.borders.top)
    console.log(state.mapState.borders.left) */
    console.log( x, y )
}

const getSprite = ( x, y, width, height, spriteSrc ) => {
    let newSprite = new Image()

    newSprite.onload = ( ) => {
        var ctx = util.getFrontCanvasContext( ) 
        ctx.drawImage(newSprite, 0, 0, 37, 37, x, y, width, height)                
    }

    newSprite.src = spriteSrc

    return newSprite
}

module.exports = {
    gamePiece
}