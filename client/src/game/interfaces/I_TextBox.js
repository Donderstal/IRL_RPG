const canvas = require( '../../helpers/canvasHelpers' )
const globals = require( '../../game-data/globals' );
const { TypeWriter } = require('../../helpers/TypeWriter');
const { 
    LARGE_FONT_LINE_HEIGHT, SMALL_FONT_LINE_HEIGHT, LARGE_FONT_SIZE, 
    SMALL_FONT_SIZE, FRAME_LIMIT, GRID_BLOCK_PX, BUBBLE_INNER_PADDING
} = require( '../../game-data/globals' );
const { 
    BUBBLE_START, BUBBLE_START_OPEN_BOTTOM, BUBBLE_START_OPEN_TOP, BUBBLE_START_OPEN_BOTTOM_TOP, BUBBLE_MIDDLE, 
    BUBBLE_MIDDLE_OPEN_BOTTOM, BUBBLE_MIDDLE_OPEN_TOP, BUBBLE_END, BUBBLE_END_OPEN_BOTTOM, BUBBLE_END_OPEN_TOP 
} = require('../../game-data/textboxGlobals');
/**
 * The Textbox interface is the base class for displaying in-game textboxes, excluding the MainMenu
 */
class I_TextBox {
    constructor( xy, dimensions, fontSize, text ) {
        this.x              = xy.x;
        this.y              = xy.y;
        this.width          = dimensions.width + (GRID_BLOCK_PX*33);
        this.height         = dimensions.height;
        this.text           = text
    }
    set text( text ) {             
        this.typeWriter = new TypeWriter( text );
    }
    get text( ) {
        const fullTextArray = canvas.breakTextIntoLines( this.typeWriter.fullText, LARGE_FONT_SIZE );
        const currentTextArray = canvas.breakTextIntoLines( this.typeWriter.activeText, LARGE_FONT_SIZE );

        let returner = [];
        fullTextArray.forEach( ( e, index ) => {
            returner.push( typeof currentTextArray[index] === 'undefined' ? " " : currentTextArray[index]  )
        })

        return returner;
    }
    get textX() { return this.x + BUBBLE_INNER_PADDING - (this.horiFlip ? GRID_BLOCK_PX / 2 : 0); };
    get headerY() { return this.y + ( this.hasHeader ? SMALL_FONT_LINE_HEIGHT : 0 ) + ( this.vertFlip ? 8 : 0 ); }
    get textY() { return this.headerY + SMALL_FONT_LINE_HEIGHT };

    drawBubblePart( name, x, y ) {
        let pngs = globals.PNG_DICTIONARY;
        this.innerCtx.drawImage(
            pngs[name],
            0, 0,
            GRID_BLOCK_PX, GRID_BLOCK_PX,
            x, y, 
            GRID_BLOCK_PX, GRID_BLOCK_PX
        );
    }

    drawBox( ) {
        let index = 0;
        let accumulator = 0;
        for ( var i = 0; i < this.height/GRID_BLOCK_PX; i++ ) {
            const start = this.text.length == 1 ? BUBBLE_START : i == 0 ? BUBBLE_START_OPEN_BOTTOM : BUBBLE_START_OPEN_TOP;
            const middle = this.text.length == 1 ? BUBBLE_MIDDLE : i == 0 ? BUBBLE_MIDDLE_OPEN_BOTTOM : BUBBLE_MIDDLE_OPEN_TOP;
            const end = this.text.length == 1 ? BUBBLE_END : i == 0 ? BUBBLE_END_OPEN_BOTTOM : BUBBLE_END_OPEN_TOP;
            while( accumulator < globals.GAME.front.ctx.measureText(this.typeWriter.fullText).width + (GRID_BLOCK_PX*2) && accumulator < globals.MAX_BUBBLE_WIDTH) {
                if ( index == 0 ) {
                    this.drawBubblePart( start, GRID_BLOCK_PX*index, GRID_BLOCK_PX*i);
                }
                else {
                    this.drawBubblePart( middle, GRID_BLOCK_PX*index, GRID_BLOCK_PX*i);
                }
                index++;
                accumulator += GRID_BLOCK_PX;
            }
            this.drawBubblePart( end, GRID_BLOCK_PX*index, GRID_BLOCK_PX*i);
            index = 0;
            accumulator = 0;
        }
    }

    writeHeader( ) {
        canvas.writeTextLine( 
            this.headerText, this.textX, this.headerY, SMALL_FONT_SIZE
        );
    }

    setHeader( text ) {
        this.hasHeader  = true;
        this.headerText = text;
    }
}

module.exports = {
    I_TextBox
}