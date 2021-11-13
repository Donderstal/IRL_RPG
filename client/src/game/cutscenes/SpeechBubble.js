const canvas = require( '../../helpers/canvasHelpers' );
const globals = require( '../../game-data/globals' );
const { 
    MAX_BUBBLE_WIDTH, GRID_BLOCK_PX, STRD_SPRITE_HEIGHT, BUBBLE_INNER_PADDING,
    STRD_SPRITE_WIDTH, LARGE_FONT_SIZE, SMALL_FONT_SIZE, LARGE_FONT_LINE_HEIGHT, SMALL_FONT_LINE_HEIGHT
} = require( '../../game-data/globals' );
const { 
    BUBBLE_START, BUBBLE_START_OPEN_BOTTOM, BUBBLE_START_OPEN_TOP, BUBBLE_START_OPEN_BOTTOM_TOP, BUBBLE_MIDDLE, 
    BUBBLE_MIDDLE_OPEN_BOTTOM, BUBBLE_MIDDLE_OPEN_TOP, BUBBLE_END, BUBBLE_END_OPEN_BOTTOM, BUBBLE_END_OPEN_TOP 
} = require('../../game-data/textboxGlobals');
const { TypeWriter } = require('../../helpers/TypeWriter');

const getSpeechBubbleXy = ( spawnLocation, dimensions ) => {
    let bubbleLocation = {
        'x': spawnLocation.x,
        'y': spawnLocation.y - dimensions.height,
        'position': "UP-RIGHT"
    };
    if ( bubbleLocation.x + dimensions.width > 24 * GRID_BLOCK_PX ) {
        bubbleLocation.x = (spawnLocation.x - dimensions.width) + STRD_SPRITE_WIDTH;
        bubbleLocation.position = "UP-LEFT";
    }
    if ( bubbleLocation.y < 0 ) {
        bubbleLocation.y = spawnLocation.y + STRD_SPRITE_HEIGHT;
        bubbleLocation.position = bubbleLocation.position == "UP-RIGHT" ? "DOWN-RIGHT" : "DOWN-LEFT";
    }
    return bubbleLocation;
}

const getSpeechBubbleDimensions = ( contents ) => {
    const text = canvas.breakTextIntoLines( contents.text, LARGE_FONT_SIZE )
    const ctx = canvas.getFrontCanvasContext();   
    let textHeightAcc = text.length * LARGE_FONT_LINE_HEIGHT + (contents.name != undefined ? SMALL_FONT_LINE_HEIGHT : 0);
    let firstLineWidth = ctx.measureText(text[0]).width + (BUBBLE_INNER_PADDING * 2);
    return {
        'width' : text.length > 1 ? MAX_BUBBLE_WIDTH : Math.ceil(firstLineWidth / GRID_BLOCK_PX) * GRID_BLOCK_PX,
        'height': Math.ceil(textHeightAcc / GRID_BLOCK_PX) * GRID_BLOCK_PX
    }
}

class SpeechBubble {
    constructor( location, contents ) {
        const dimensions = getSpeechBubbleDimensions( contents );
        const xyPosition = getSpeechBubbleXy( location, dimensions )

        this.x              = xyPosition.x;
        this.position       = xyPosition.position;
        this.y              = xyPosition.y;

        this.width          = dimensions.width + (GRID_BLOCK_PX*33);
        this.height         = dimensions.height;
        this.text           = contents.text;

        this.innerCanvas = document.createElement('canvas');
        this.innerCanvas.width = this.width;
        this.innerCanvas.height = this.height;
        this.innerCtx = this.innerCanvas.getContext('2d');

        if ( contents.sfx ) {
            globals.GAME.sound.playEffect( contents.sfx );
        }

        this.action = contents;
        if ( contents.name ) {
            this.setHeader( contents.name + ": " )
        } 
        this.draw( );
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
    get horiFlip() { return this.position.includes("LEFT") };
    get vertFlip() { return this.position.includes("DOWN") };

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

    draw( ) {
        this.drawBox( );
        this.copyBubbleToGameCanvas( );
        if ( this.hasHeader ) {
            this.writeHeader( );
        }
        this.writeText( );
    }

    writeText( ) {
        canvas.setFont(LARGE_FONT_SIZE);
        for ( var i = 0; i < this.text.length; i++ ) {
            canvas.writeTextLine( 
                this.text[i], this.textX, this.textY + (LARGE_FONT_LINE_HEIGHT * i), LARGE_FONT_SIZE
            );
        }
    }

    copyBubbleToGameCanvas( ) {
        let frontCtx = canvas.getFrontCanvasContext()
        frontCtx.save( );
        frontCtx.scale( this.horiFlip ? -1 : 1, this.vertFlip ? -1 : 1 );
        frontCtx.drawImage(
            this.innerCanvas, 
            this.horiFlip ? (-this.width - this.x) + (GRID_BLOCK_PX / 2) : this.x, 
            this.vertFlip ? -this.height - this.y : this.y
        );
        frontCtx.restore( );
    }
}

module.exports = {
    SpeechBubble
}