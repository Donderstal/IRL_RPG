const canvas = require( '../../helpers/canvasHelpers' )
const { 
    LARGE_FONT_LINE_HEIGHT, SMALL_FONT_LINE_HEIGHT, LARGE_FONT_SIZE, 
    SMALL_FONT_SIZE, OUTER_TEXTBOX_RGBA, INNER_TEXTBOX_RGBA, FRAME_LIMIT
} = require( '../../game-data/globals' )
/**
 * The Textbox interface is the base class for displaying in-game textboxes, excluding the MainMenu
 */
class I_TextBox {
    constructor( xy, dimensions, fontSize, text, buttonsText = null ) {
        this.fontSize       = ( fontSize == "LARGE" ) ? LARGE_FONT_SIZE : SMALL_FONT_SIZE;
        this.lineHeight     = ( fontSize == "LARGE" ) ? LARGE_FONT_LINE_HEIGHT : SMALL_FONT_LINE_HEIGHT;

        this.x              = xy.x;
        this.y              = xy.y;
        this.width          = dimensions.width + this.fontSize * 2;
        this.height         = dimensions.height;

        this.innerBoxX      = xy.x - ( LARGE_FONT_SIZE * .125 );
        this.innerBoxY      = xy.y - ( LARGE_FONT_SIZE * .125 );
        this.innerBoxWidth  = dimensions.width + ( LARGE_FONT_SIZE * .25 )  + this.fontSize * 2;
        this.innerBoxHeight = dimensions.height + ( LARGE_FONT_SIZE * .25 );

        this.text           = canvas.breakTextIntoLines( text, this.fontSize )
        this.buttonsText    = ( buttonsText == null ) ? [ "( Space ) OK" ] : buttonsText;
        this.buttonColor    = "white";
        this.animationFrame = 0;

        canvas.setFont(this.fontSize);
        this.drawTextBox( );
    }
    /**
     * Increment this.animationFrame
     * Call drawBox(), writeText() and drawButtons()
     * If a header is set, call writeHeader()
     */
    drawTextBox( ) {
        this.animationFrame++;

        this.drawBox( );
        if ( this.hasHeader ) {
            this.writeHeader( );
        }
        this.writeText( );
        this.drawButtons( );
    }
    /**
     * Call canvas.drawRect twice to draw the I_Textbox background.
     */
    drawBox( ) {
        canvas.drawRect( 
            "FRONT", this.x, this.y, 
            this.width, this.height, OUTER_TEXTBOX_RGBA
        );
        canvas.drawRect( 
            "FRONT", this.innerBoxX, this.innerBoxY, 
            this.innerBoxWidth, this.innerBoxHeight, INNER_TEXTBOX_RGBA
        );
        const front = canvas.getFrontCanvasContext( )
        front.beginPath( )
        front.strokeStyle = "white";
        front.rect( this.x, this.y, this.width, this.height )
        front.stroke( )
    }
    /**
     * Set this.fontType as the activeFont.
     * Get the yPosition of the text in the textbox.
     * Then, loop through the text lines and draw them below eachother in the textbox.
     */
    writeText( ) {
        canvas.setFont(this.fontType);
        let yPositionInBox = this.y + this.lineHeight;

        if ( this.hasHeader ) {
            yPositionInBox += LARGE_FONT_SIZE;
        }

        for ( var i = 0; i < this.text.length; i++ ) {
            canvas.writeTextLine( 
                this.text[i], this.x + this.fontSize, 
                yPositionInBox + ( this.lineHeight * i ), this.fontSize
            );
        }
    }
    /**
     * Write the text set to this.headerText at the top of the textbox
     */
    writeHeader( ) {
        canvas.writeTextLine( 
            this.headerText, this.x + this.fontSize, 
            this.y + SMALL_FONT_LINE_HEIGHT, SMALL_FONT_SIZE
        );
    }
    /**
     * For each String in the this.buttonsText array, draw write the buttonText at the bottom of the textbox
     */
    drawButtons( ) {
        let buttonX     = this.x + LARGE_FONT_SIZE;
        let buttonsY    = (this.y + this.height) - ( LARGE_FONT_SIZE * .5 );

        this.buttonsText.forEach( (buttonText) => {
            canvas.writeTextLine(
                buttonText, buttonX, buttonsY, SMALL_FONT_SIZE, this.buttonColor
            )
            buttonX += ( this.width / 2 ) ;
        });
    }
    /**
     * If this.animationFrame is over the FRAME_LIMIT * 2, toggle this.buttonColor and reset this.animationFrame
     */
    doButtonAnimation( ) {
        if ( this.animationFrame > ( FRAME_LIMIT * 2 ) ) {
            this.buttonColor = ( this.buttonColor == "black" ) ? "#800020" : "black";
            this.animationFrame = 0;
        }
    }
    /**
     * Set given text to the this.text property
     * @param {String} text 
     */
    setText( text ) {
        this.text = text;
    }
    /**
     * Set given text to the this.headerText property. Set this.hasHeader to true
     * @param {String} text 
     */
    setHeader( text ) {
        this.hasHeader  = true;
        this.headerText = text;
    }
}

module.exports = {
    I_TextBox
}