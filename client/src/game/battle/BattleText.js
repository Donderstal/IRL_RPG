const battleGlobals = require( '../../game-data/battleGlobals' );
const canvas = require( '../../helpers/canvasHelpers' );
const globals = require( '../../game-data/globals' );
const { I_TextBox } = require( '../interfaces/I_TextBox' );

class BattleText extends I_TextBox {
    constructor( ) {
        super( battleGlobals.TEXTBOX_XY, battleGlobals.TEXTBOX_DIMENSIONS, "LARGE", "" )  
        this.waiting    = false;        
        this.header     = false;

        this.setText( globals.GAME.activeText )
    }
    
    setText( text ) {
        this.text = canvas.breakTextIntoLines( text, 'LARGE', this.width )  
        super.setText(this.text)
    }

    drawTextBox( ) {
        this.setText( globals.GAME.activeText )
        this.drawBox( );
        this.writeText( );
        if ( this.hasHeader ) {
            this.writeHeader( );
        }
    }
}

module.exports = {
    BattleText
}