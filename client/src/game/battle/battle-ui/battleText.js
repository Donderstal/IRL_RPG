const state = require( '../../../game-data/state' )
const globals = require( '../../../game-data/globals' )
const canvas = require( '../../../helpers/canvasHelpers' )

const I_TextBox = require( '../../interfaces/I_TextBox' ).I_TextBox

const initTextContainer = ( ) => {
    state.battleState.textContainer = new TextContainer( )        
}

const getBattleTextXy = ( ) => {
    return { "x": globals.CANVAS_WIDTH * .25, "y": (globals.CANVAS_HEIGHT / 6) * 5 }
}

const getBattleTextDimensions = ( ) => {
    return { "width": globals.CANVAS_WIDTH / 2, "height": globals.CANVAS_HEIGHT / 6}
}

class TextContainer extends I_TextBox {
    constructor( text = "" ) {
        super( getBattleTextXy( ), getBattleTextDimensions( ), "LARGE", text )  
        this.isMoveMenu = false;       
        this.waiting    = false;        
    }
    
    setMoveMenu( ) {
        this.isMoveMenu = true;
    }

    unsetMoveMenu( ) {
        this.isMoveMenu = false
    }

    setText(text) {
        this.text = canvas.breakTextIntoLines( text, 'LARGE', this.width )  
        super.setText(this.text)
    }

    drawTextBox( ) {
        this.writeText( );
    }
}

module.exports = {
    initTextContainer
}