const canvas = require( '../../../helpers/canvasHelpers' )
const state = require( '../../../game-data/state' )
const globals = require( '../../../game-data/globals' )

const initTextContainer = ( ) => {
    state.battleState.textContainer = new TextContainer( )        
}

class TextContainer {
    constructor( text = "", showUI = true ) {
        this.animationFrame = 0

        this.width      = globals.CANVAS_WIDTH / 2
        this.height     = globals.CANVAS_HEIGHT / 6
        this.x          = globals.CANVAS_WIDTH / 4
        this.y          = (globals.CANVAS_HEIGHT / 6) * 5     
        this.isMoveMenu = false;       

        this.text           = text
        this.waiting        = false;
        this.buttonColor    = "black"

        this.drawContainer( showUI )
    }

    drawContainer( showUI ) {
        this.animationFrame++
        if ( this.animationFrame > ( globals.FRAME_LIMIT * 2 ) ) {
            this.switchButtonColor()
            this.animationFrame = 0
        }

        canvas.drawRect( "FRONT", this.x - 2, this.y - 2, this.width + 4, this.height + 4, "rgba(0,0,0, 0.66)" );
        canvas.drawRect( "FRONT", this.x, this.y, this.width, this.height, 'rgba(255,255,255, 0.66)' );
        canvas.writeTextLine( this.text, this.x + globals.LARGE_FONT_SIZE, this.y + ( globals.LARGE_FONT_SIZE * 2 ), 'LARGE', "black" )  
        canvas.writeTextLine("(Q) Ok", this.x + globals.LARGE_FONT_SIZE, this.y + this.height - globals.SMALL_FONT_SIZE, "SMALL", this.buttonColor)                  
        canvas.writeTextLine("(E) Back",  this.x + ( this.width / 2 ) + globals.LARGE_FONT_SIZE, this.y + this.height - globals.SMALL_FONT_SIZE, "SMALL", this.buttonColor) 
    }
    
    setMoveMenu( ) {
        this.isMoveMenu = true;
    }

    unsetMoveMenu( ) {
        this.isMoveMenu = false
    }

    switchButtonColor( ) {
        this.buttonColor = ( this.buttonColor == "black" ) ? "#800020" : "black"
    }

    setText( text ) {
        this.text = text
    }
}

module.exports = {
    initTextContainer
}