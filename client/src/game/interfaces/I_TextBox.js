const canvas = require( '../../helpers/canvasHelpers' )
const { 
    LARGE_FONT_LINE_HEIGHT, SMALL_FONT_LINE_HEIGHT, LARGE_FONT_SIZE, 
    SMALL_FONT_SIZE, OUTER_TEXTBOX_RGBA, INNER_TEXTBOX_RGBA, FRAME_LIMIT, GRID_BLOCK_PX
} = require( '../../game-data/globals' );
const globals = require( '../../game-data/globals' );
const { TypeWriter } = require('../../helpers/TypeWriter');

const bubbleStartOpenRightBottom = "/static/ui/bubble-template-open-right-bottom.png";
const bubbleStartOpenRightTop = "/static/ui/bubble-template-open-right-top.png";
const bubbleStartOpenRightBottomTop = "/static/ui/bubble-template-open-right-bottom-top.png";
const bubbleStartOpenRight = "/static/ui/bubble-template-open-right.png";

const bubbleMiddleOpenBottom = "/static/ui/bubble-template-middle-open-bottom.png";
const bubbleMiddleOpenTop = "/static/ui/bubble-template-middle-open-top.png";
const bubbleMiddle = "/static/ui/bubble-template-middle.png";

const bubbleEndOpenBottom = "/static/ui/bubble-template-end-open-bottom.png";
const bubbleEndOpenTop = "/static/ui/bubble-template-end-open-top.png";
const bubbleEnd = "/static/ui/bubble-template-end.png";

const singleCharacterBubble = "/static/ui/bubble-template.png";
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

        this.text           = text
        this.buttonsText    = ( buttonsText == null ) ? [ "( Space ) OK" ] : buttonsText;
        this.buttonColor    = "white";
        this.animationFrame = 0;
        canvas.setFont(this.fontSize);
        this.drawTextBox( );
    }
    set text( text ) {             
        this.typeWriter = new TypeWriter( text );
    }
    get text( ) {
        const fullTextArray = canvas.breakTextIntoLines( this.typeWriter.fullText, LARGE_FONT_SIZE );
        const currentTextArray = canvas.breakTextIntoLines( this.typeWriter.activeText, LARGE_FONT_SIZE );

        let returner = [];
        fullTextArray.forEach( ( line, index ) => {
            returner.push( typeof currentTextArray[index] === 'undefined' ? " " : currentTextArray[index]  )
        })

        return returner;
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

    drawBubblePart( name, x, y ) {
        let pngs = globals.PNG_DICTIONARY;
        canvas.drawFromImageToCanvas( 
            "FRONT", pngs[name],
            0, 0,
            GRID_BLOCK_PX, GRID_BLOCK_PX,
            x, y, 
            GRID_BLOCK_PX, GRID_BLOCK_PX
        )
    }
    /**
     * Call canvas.drawRect twice to draw the I_Textbox background.
     */
    drawBox( ) {
        let index = 0;
        let accumulator = 0;
        for ( var i = 0; i < this.text.length; i++ ) {
            const start = this.text.length == 1 ? bubbleStartOpenRight : 
                i == 0 ? bubbleStartOpenRightBottom : 
                i == this.text.length -1 ? bubbleStartOpenRightTop : bubbleStartOpenRightBottomTop;
            const middle = this.text.length == 1 ? bubbleMiddle : 
                i == 0 ? bubbleMiddleOpenBottom : bubbleMiddleOpenTop;
            const end = this.text.length == 1 ? bubbleEnd : 
                i == 0 ? bubbleEndOpenBottom : bubbleEndOpenTop;
            while( accumulator < globals.GAME.front.ctx.measureText(this.typeWriter.fullText).width + (GRID_BLOCK_PX*2) && accumulator < globals.MAX_BUBBLE_WIDTH) {
                if ( index == 0 ) {
                    this.drawBubblePart( start, this.x + (GRID_BLOCK_PX*index), this.y + (GRID_BLOCK_PX*i));
                }
                else {
                    this.drawBubblePart( middle, this.x + (GRID_BLOCK_PX*index), this.y + (GRID_BLOCK_PX*i));
                }
                index++;
                accumulator += GRID_BLOCK_PX;
            }
            this.drawBubblePart( end, this.x + (GRID_BLOCK_PX*index), this.y + (GRID_BLOCK_PX*i));
            index = 0;
            accumulator = 0;
        }
    }
    /**
     * Set this.fontSize as the activeFont.
     * Get the yPosition of the text in the textbox.
     * Then, loop through the text lines and draw them below eachother in the textbox.
     */
    writeText( ) {
        canvas.setFont(this.fontSize);
        let yPositionInBox = this.y + this.lineHeight;

        if ( this.hasHeader ) {
            yPositionInBox += LARGE_FONT_SIZE;
        }

        for ( var i = 0; i < this.text.length; i++ ) {
            canvas.writeTextLine( 
                this.text[i], this.x + (GRID_BLOCK_PX * .66), 
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