const battleGlobals = require( '../battleGlobals' )
const canvas = require( '../../../helpers/canvasHelpers' )
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
        this.drawBox( );
        this.writeText( );
        if ( this.hasHeader ) {
            this.writeHeader( );
        }
    }
}

module.exports = {
    TextContainer
}