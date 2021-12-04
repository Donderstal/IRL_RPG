const canvas = require( '../../helpers/canvasHelpers' );
const globals = require( '../../game-data/globals' );
const { 
    MAX_BUBBLE_WIDTH, GRID_BLOCK_PX, STRD_SPRITE_HEIGHT, BUBBLE_INNER_PADDING, GRID_BLOCK_IN_SHEET_PX,
    STRD_SPRITE_WIDTH, LARGE_FONT_SIZE, SMALL_FONT_SIZE, LARGE_FONT_LINE_HEIGHT, SMALL_FONT_LINE_HEIGHT
} = require( '../../game-data/globals' );
const { 
    BUBBLE_START, BUBBLE_START_OPEN_BOTTOM, BUBBLE_START_OPEN_TOP, BUBBLE_MIDDLE, 
    BUBBLE_MIDDLE_OPEN_BOTTOM, BUBBLE_MIDDLE_OPEN_TOP, BUBBLE_END, BUBBLE_END_OPEN_BOTTOM, BUBBLE_END_OPEN_TOP, BUBBLE_YES, BUBBLE_NO, BUBBLE_UNSELECTED 
} = require('../../game-data/textboxGlobals');
const { TypeWriter } = require('../../helpers/TypeWriter');
const { SPEAK_YES_NO } = require('../../game-data/conditionGlobals');
const { INTERACTION_YES, INTERACTION_NO } = require('../../game-data/interactionGlobals');

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
        'textLines' : text.length,
        'width' : text.length > 1 ? MAX_BUBBLE_WIDTH : Math.ceil(firstLineWidth / GRID_BLOCK_PX) * GRID_BLOCK_PX,
        'height': (Math.ceil(textHeightAcc / GRID_BLOCK_PX) * GRID_BLOCK_PX) < (GRID_BLOCK_PX * 2 ) ? (GRID_BLOCK_PX * 2 ) : (Math.ceil(textHeightAcc / GRID_BLOCK_PX) * GRID_BLOCK_PX)
    }
}

class SpeechBubble {
    constructor( location, contents, id, type ) {
        const dimensions = getSpeechBubbleDimensions( contents );
        const xyPosition = getSpeechBubbleXy( location, dimensions )

        this.x              = xyPosition.x;
        this.y              = xyPosition.y;
        this.position       = xyPosition.position;
        this.id             = id;
        this.type           = type;

        this.width          = dimensions.width;
        this.height         = dimensions.height;
        this.textLines      = dimensions.textLines;
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
        if ( this.type == SPEAK_YES_NO ) {
            this.bubbleY    = this.y + this.height;
            this.middleX    = this.x + (this.width / 2);
            this.yesBubbleX = this.middleX - GRID_BLOCK_PX;
            this.noBubbleX  = this.middleX + GRID_BLOCK_PX;
            this.activeButton = INTERACTION_YES;
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

    get textX() { return this.x + BUBBLE_INNER_PADDING; };
    get headerY() { return this.y + ( this.hasHeader ? SMALL_FONT_LINE_HEIGHT : 0 ) + ( this.vertFlip ? 8 : 0 ); }
    get textY() { return this.headerY + LARGE_FONT_LINE_HEIGHT };
    get horiFlip() { return this.position.includes("LEFT") };
    get vertFlip() { return this.position.includes("DOWN") };

    setWidth( width ) {
        this.width = width;
        this.innerCanvas.width = width;
    }

    drawBubblePart( name, x, y ) {
        let pngs = globals.PNG_DICTIONARY;
        this.innerCtx.drawImage(
            pngs[name],
            0, 0,
            GRID_BLOCK_IN_SHEET_PX, GRID_BLOCK_IN_SHEET_PX,
            x, y, 
            GRID_BLOCK_PX, GRID_BLOCK_PX
        );
    }

    drawBox( ) {
        let index = 0;
        let accumulator = 0;
        for ( var i = 0; i < this.height/GRID_BLOCK_PX; i++ ) {
            const start = i == 0 ? BUBBLE_START_OPEN_BOTTOM : BUBBLE_START_OPEN_TOP;
            const middle = i == 0 ? BUBBLE_MIDDLE_OPEN_BOTTOM : BUBBLE_MIDDLE_OPEN_TOP;
            const end = i == 0 ? BUBBLE_END_OPEN_BOTTOM : BUBBLE_END_OPEN_TOP;
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
            this.innerCtx.clearRect(GRID_BLOCK_PX*(index-1), GRID_BLOCK_PX*i, GRID_BLOCK_PX, GRID_BLOCK_PX)
            this.drawBubblePart( end, GRID_BLOCK_PX*(index-1), GRID_BLOCK_PX*i);
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
        if ( this.type == SPEAK_YES_NO && !this.typeWriter.isWriting ) {
            this.drawButtons( );
        }
    }

    writeText( ) {
        canvas.setFont(LARGE_FONT_SIZE);
        for ( var i = 0; i < this.text.length; i++ ) {
            canvas.writeTextLine( 
                this.text[i], this.textX, this.textY + (LARGE_FONT_LINE_HEIGHT * i), LARGE_FONT_SIZE
            );
        }
    }

    drawButtons( ) {
        let pngs = globals.PNG_DICTIONARY;
        let frontCtx = canvas.getFrontCanvasContext()
        frontCtx.drawImage(
            this.activeButton == INTERACTION_YES ? pngs[BUBBLE_YES] : pngs[BUBBLE_UNSELECTED],
            0, 0,
            globals.GRID_BLOCK_IN_SHEET_PX, globals.GRID_BLOCK_IN_SHEET_PX,
            this.yesBubbleX, this.bubbleY,
            GRID_BLOCK_PX, GRID_BLOCK_PX
        );
        frontCtx.drawImage(
            this.activeButton == INTERACTION_NO ? pngs[BUBBLE_NO] : pngs[BUBBLE_UNSELECTED],
            0, 0,
            globals.GRID_BLOCK_IN_SHEET_PX, globals.GRID_BLOCK_IN_SHEET_PX,
            this.noBubbleX, this.bubbleY,
            GRID_BLOCK_PX, GRID_BLOCK_PX
        );
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

    moveCursor( ) {
        this.activeButton = this.activeButton == INTERACTION_YES ? INTERACTION_NO : INTERACTION_YES;
    }
}

module.exports = {
    SpeechBubble
}