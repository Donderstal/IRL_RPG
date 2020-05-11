const canvas = require( '../../helpers/canvasHelpers' )
const globals = require( '../../game-data/globals' )

class TextBox {
    constructor( xy, dimensions, fontSize, text, buttonsText = null ) {
        this.x              = xy.x;
        this.y              = xy.y;
        this.width          = dimensions.width;
        this.height         = dimensions.height;

        this.fontSize       = ( fontSize == "LARGE" ) ? globals.LARGE_FONT_SIZE : globals.SMALL_FONT_SIZE;
        this.lineHeight     = ( fontSize == "LARGE" ) ? globals.LARGE_FONT_LINE_HEIGHT : SMALL_FONT_LINE_HEIGHT;

        this.innerBoxX      = xy.x - ( globals.LARGE_FONT_SIZE * .125 );
        this.innerBoxY      = xy.y - ( globals.LARGE_FONT_SIZE * .125 );
        this.innerBoxWidth  = dimensions.width + ( globals.LARGE_FONT_SIZE * .25 );
        this.innerBoxHeight = dimensions.height + ( globals.LARGE_FONT_SIZE * .25 );

        this.text           = this.setText( text )
        this.buttonsText    = ( buttonsText == null ) ? [ "(Q) Continue", "(E) Back"] : buttonsText;
        this.buttonColor    = "black";
        this.animationFrame = 0

        drawTextBox( )
    }

    drawTextBox( ) {
        this.animationFrame++

        this.drawBox( );
        this.writeText( );
        this.drawButtons( ) 
    }
    
    drawBox( ) {
        canvas.drawRect( 
            "FRONT", this.x, this.y, 
            this.width, this.height, globals.OUTER_TEXTBOX_RGBA
        );
        canvas.drawRect( 
            "FRONT", this.innerBoxX, this.innerBoxY, 
            this.innerBoxWidth, this.innerBoxHeight, globals.INNER_TEXTBOX_RGBA
        );
    }

    drawText( ) {
        canvas.writeTextLine( 
            this.text, this.x + this.fontSize, 
            this.y + this.lineHeight, this.fontSize 
        )
    }

    drawButtons( ) {
        let buttonX     = this.x + globals.LARGE_FONT_SIZE;
        let buttonsY    = this.y + this.height - globals.SMALL_FONT_LINE_HEIGHT;
        
        this.buttonsText.forEach( (buttonText) => {
            canvas.writeTextLine(
                buttonText, buttonX, buttonsY, "SMALL", this.buttonColor
            )
            buttonX += ( this.width / 2 ) 
        })
    }

    doButtonAnimation( ) {
        if ( this.animationFrame > ( globals.FRAME_LIMIT * 2 ) ) {
            this.buttonColor = ( this.buttonColor == "black" ) ? "#800020" : "black"
            this.animationFrame = 0
        }
    }
}