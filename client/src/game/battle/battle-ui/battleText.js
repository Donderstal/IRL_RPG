const battleGlobals = require( '../battleGlobals' )
const canvas = require( '../../../helpers/canvasHelpers' )
const state = require( '../../../game-data/state' )
const globals = require( '../../../game-data/globals' )
const I_TextBox = require( '../../interfaces/I_TextBox' ).I_TextBox

class TextContainer extends I_TextBox {
    constructor( text = "" ) {
        super( battleGlobals.TEXTBOX_XY, battleGlobals.TEXTBOX_DIMENSIONS, "LARGE", text )  
        this.isMoveMenu = false;       
        this.waiting    = false;        
        this.header     = false;

        this.setText( "A fight breaks out in the streets!" )
    }
    
    setText( text ) {
        this.text = canvas.breakTextIntoLines( text, 'LARGE', this.width )  
        super.setText(this.text)
    }

    drawTextBox( ) {
        const battle = state.battleState
        this.drawBox( );
        this.writeText( );
        if ( this.hasHeader ) {
            this.writeHeader( );
        }
        if ( battle.actionButtonAllowed ) {
            canvas.writeTextLine( 
                "Press [ space ] to confirm", 
                this.x + this.fontSize, 
                ( this.y + this.height ) - globals.SMALL_FONT_LINE_HEIGHT, 
                "SMALL"
            );
        }
        if ( battle.selectingTarget ) {
            canvas.writeTextLine( 
                "Press [ z ] to return", 
                ( this.x + ( this.width / 2 ) ) + this.fontSize, 
                ( this.y + this.height ) - globals.SMALL_FONT_LINE_HEIGHT, 
                "SMALL"
            );
        }
    }
}

module.exports = {
    TextContainer
}