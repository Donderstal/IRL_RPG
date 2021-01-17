const canvas = require( '../../helpers/canvasHelpers' )
const { 
    LARGE_FONT_LINE_HEIGHT, SMALL_FONT_LINE_HEIGHT, LARGE_FONT_SIZE, 
    SMALL_FONT_SIZE, OUTER_TEXTBOX_RGBA, INNER_TEXTBOX_RGBA, FRAME_LIMIT
} = require( '../../game-data/globals' )

class I_TextBox {
    constructor( xy, dimensions, fontSize, text, buttonsText = null ) {
        this.x              = xy.x;
        this.y              = xy.y;
        this.width          = dimensions.width;
        this.height         = dimensions.height;

        this.fontType       = fontSize 
        this.fontSize       = ( fontSize == "LARGE" ) ? LARGE_FONT_SIZE : SMALL_FONT_SIZE;
        this.lineHeight     = ( fontSize == "LARGE" ) ? LARGE_FONT_LINE_HEIGHT : SMALL_FONT_LINE_HEIGHT;

        this.innerBoxX      = xy.x - ( LARGE_FONT_SIZE * .125 );
        this.innerBoxY      = xy.y - ( LARGE_FONT_SIZE * .125 );
        this.innerBoxWidth  = dimensions.width + ( LARGE_FONT_SIZE * .25 );
        this.innerBoxHeight = dimensions.height + ( LARGE_FONT_SIZE * .25 );

        this.text           = canvas.breakTextIntoLines( text, 'LARGE' )
        this.buttonsText    = ( buttonsText == null ) ? [ "(Q) Continue", "(E) Back"] : buttonsText;
        this.buttonColor    = "white";
        this.animationFrame = 0;

        canvas.setFont(fontSize);
        this.drawTextBox( );
    }

    drawTextBox( ) {
        this.animationFrame++;

        this.drawBox( );
        if ( this.hasHeader ) {
            this.writeHeader( );
        }
        this.writeText( );
        this.drawButtons( );
    }
    
    drawBox( ) {
        canvas.drawRect( 
            "FRONT", this.x, this.y, 
            this.width, this.height, OUTER_TEXTBOX_RGBA
        );
        canvas.drawRect( 
            "FRONT", this.innerBoxX, this.innerBoxY, 
            this.innerBoxWidth, this.innerBoxHeight, INNER_TEXTBOX_RGBA
        );
    }

    writeText( ) {
        canvas.setFont(this.fontType);
        let yPositionInBox = this.y + this.lineHeight;

        if ( this.hasHeader ) {
            yPositionInBox += SMALL_FONT_LINE_HEIGHT;
        }

        for ( var i = 0; i < this.text.length; i++ ) {
            canvas.writeTextLine( 
                this.text[i], this.x + this.fontSize, 
                yPositionInBox + ( this.lineHeight * i ), this.fontType
            );
        }
    }

    writeHeader( ) {
        canvas.writeTextLine( 
            this.headerText, this.x + this.fontSize, 
            this.y + SMALL_FONT_LINE_HEIGHT, "SMALL"
        );
    }

    drawButtons( ) {
        let buttonX     = this.x + LARGE_FONT_SIZE;
        let buttonsY    = this.y + this.height;

        this.buttonsText.forEach( (buttonText) => {
            canvas.writeTextLine(
                buttonText, buttonX, buttonsY, "SMALL", this.buttonColor
            )
            buttonX += ( this.width / 2 ) ;
        });
    }

    doButtonAnimation( ) {
        if ( this.animationFrame > ( FRAME_LIMIT * 2 ) ) {
            this.buttonColor = ( this.buttonColor == "black" ) ? "#800020" : "black";
            this.animationFrame = 0;
        }
    }

    setText( text ) {
        this.text = text;
    }

    setHeader( text ) {
        this.hasHeader  = true;
        this.headerText = text;
    }
}

module.exports = {
    I_TextBox
}