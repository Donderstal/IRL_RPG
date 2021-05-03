const battleGlobals = require( '../../game-data/battleGlobals' );
const canvas = require( '../../helpers/canvasHelpers' );
const globals = require( '../../game-data/globals' );
const { I_TextBox } = require( '../interfaces/I_TextBox' );
/**
 * Class for the main textbox in Battles.
 * Sets globals.GAME.activeText as inner text in each frame.
 */
class BattleText extends I_TextBox {
    constructor( ) {
        super( battleGlobals.TEXTBOX_XY, battleGlobals.TEXTBOX_DIMENSIONS, "LARGE", "" )  
        this.waiting    = false;        
        this.header     = false;

        this.setText( globals.GAME.activeText )
    }
    /**
     * Break given text into lines if it is longer than the text box width and assign it to this.text
     * Then, call super.setText with this.text
     * @param {String} text 
     */
    setText( text ) {
        this.text = canvas.breakTextIntoLines( text, 'LARGE', this.width )  
        super.setText(this.text)
    }
    /**
     * Call this.setText with GAME.activeText as argument.
     * Then, call drawBox, writeText and writeHeader in order
     */
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