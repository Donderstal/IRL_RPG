const canvas = require( '../../helpers/canvasHelpers' );
const globals = require( '../../game-data/globals' );
const { 
    MAX_BUBBLE_WIDTH, GRID_BLOCK_PX, STRD_SPRITE_HEIGHT, BUBBLE_INNER_PADDING, GRID_BLOCK_IN_SHEET_PX,
    STRD_SPRITE_WIDTH, LARGE_FONT_SIZE, SMALL_FONT_SIZE, LARGE_FONT_LINE_HEIGHT, SMALL_FONT_LINE_HEIGHT
} = require( '../../game-data/globals' );
const { 
    BUBBLE_YES, BUBBLE_NO, BUBBLE_UNSELECTED, BUBBLE_LEFT_TOP, BUBBLE_LEFT_BOTTOM, 
    BUBBLE_TOP, BUBBLE_BOTTOM, BUBBLE_RIGHT_TOP, BUBBLE_RIGHT_BOTTOM, BUBBLE_LEFT, BUBBLE_RIGHT, BUBBLE_MIDDLE 
} = require('../../game-data/textboxGlobals');
const { TypeWriter } = require('../../helpers/TypeWriter');
const { SPEAK_YES_NO } = require('../../game-data/conditionGlobals');
const { INTERACTION_YES, INTERACTION_NO } = require('../../game-data/interactionGlobals');

const getSpeechBubbleXy = ( spawnLocation, dimensions ) => {
    let bubbleLocation = {
        'x': globals.SCREEN.MOBILE ? ( 0 + ( MAX_BUBBLE_WIDTH - dimensions.width ) / 2 ) : spawnLocation.x,
        'y': globals.SCREEN.MOBILE ? 0 : spawnLocation.y - dimensions.height,
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
    const ctx = globals.SCREEN.MOBILE ? canvas.getBubbleCanvasContext() : canvas.getFrontCanvasContext()  
    let textHeightAcc = text.length * LARGE_FONT_LINE_HEIGHT + (contents.name != undefined ? SMALL_FONT_LINE_HEIGHT : 0);
    let firstLineWidth = ctx.measureText(text[0]).width + (BUBBLE_INNER_PADDING * 2);
    return {
        'textLines' : text.length,
        'width' : text.length > 1 ? MAX_BUBBLE_WIDTH : Math.ceil(firstLineWidth / GRID_BLOCK_PX) * GRID_BLOCK_PX,
        'height': (Math.ceil(textHeightAcc / GRID_BLOCK_PX) * GRID_BLOCK_PX < GRID_BLOCK_PX * 2) ? GRID_BLOCK_PX * 2  : Math.ceil(textHeightAcc / GRID_BLOCK_PX) * GRID_BLOCK_PX
    }
}

class SpeechBubble {
    constructor( location, contents, id, type, subtitleBubble = false ) {
        const dimensions = subtitleBubble
            ? { textLines: 1, width: globals.SCREEN.MOBILE ? GRID_BLOCK_PX * 8 : globals.CANVAS_WIDTH / 2, height: GRID_BLOCK_PX }
            : getSpeechBubbleDimensions( contents );
        const xyPosition = subtitleBubble
            ?  { 'x': globals.SCREEN.MOBILE ? GRID_BLOCK_PX * 2 : globals.CANVAS_WIDTH / 4, 'y': globals.SCREEN.MOBILE ? screen.height : globals.CANVAS_HEIGHT, 'position': "UP-RIGHT" }
            : getSpeechBubbleXy( location, dimensions );

        this.x              = xyPosition.x;
        this.y              = xyPosition.y;
        this.position       = xyPosition.position;
        this.id             = id;
        this.type           = type;
        this.subtitleBubble = subtitleBubble;

        this.width          = dimensions.width;
        this.height         = dimensions.height;
        this.textLines      = dimensions.textLines;
        this.text           = contents.text;

        this.columns        = this.width / GRID_BLOCK_PX;
        this.rows           = this.height / GRID_BLOCK_PX;

        this.innerCanvas = document.createElement('canvas');
        this.innerCanvas.width = this.width;
        this.innerCanvas.height = this.height;
        this.innerCtx = this.innerCanvas.getContext('2d');

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
        if ( subtitleBubble ) {
            this.setMoveToY( this.y - this.height );            
        }

        this.draw( );
    }
    set text( text ) {             
        this.typeWriter = new TypeWriter( text, !this.subtitleBubble );
    }
    get text( ) {
        return this.typeWriter.activeText;
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

    getBubblePart( col, row ) {
        if ( col == 1 && row == 1 ) {
            return BUBBLE_LEFT_TOP;
        }
        else if ( col == this.columns && row == 1 ) {
            return BUBBLE_RIGHT_TOP;
        }
        else if ( row == 1 ) {
            return BUBBLE_TOP
        }

        if ( col == 1 && row != 1 && row != this.rows ) {
            return BUBBLE_LEFT;
        }
        else if ( col == this.columns && row != 1 && row != this.rows ) {
            return BUBBLE_RIGHT;
        }
        else if ( row != 1 && row != this.rows  ) {
            return BUBBLE_MIDDLE;
        }

        if ( col == 1 && row == this.rows ) {
            return BUBBLE_LEFT_BOTTOM;
        }
        else if ( col == this.columns && row == this.rows ) {
            return BUBBLE_RIGHT_BOTTOM;
        }
        else if ( row == this.rows  ) {
            return BUBBLE_BOTTOM
        }

        console.log('no bubble part for position at col ' + col + ' , row ' + row)
    }

    drawBox( ) {
        for( let row = 1; row <= this.rows; row++ ) {
            for( let col = 1; col <= this.columns; col++ ) {
                this.drawBubblePart( this.getBubblePart( col, row ), (GRID_BLOCK_PX * col) - GRID_BLOCK_PX, (GRID_BLOCK_PX * row) - GRID_BLOCK_PX );
            }
        }
    }

    writeHeader( ) {
        canvas.writeTextLine( 
            this.headerText, this.textX, this.headerY, SMALL_FONT_SIZE, globals.SCREEN.MOBILE ? canvas.getBubbleCanvasContext() : canvas.getFrontCanvasContext()
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
        if ( this.moving ) {
            this.moveTo( );
        }
    }

    setMoveToY( y ) {
        this.moving = true;
        this.destinationY = y;
        this.destinationYIsUp = this.y > this.destinationY;
    }

    moveTo( ) {
        if ( this.y > this.destinationY && this.destinationYIsUp ) {
            this.y -= (GRID_BLOCK_PX / 8);          
        }
        else if ( this.y < this.destinationY && !this.destinationYIsUp ) {
            this.y += (GRID_BLOCK_PX / 8);                      
        }
        else {
            this.unsetMoveTo( );
        }
    }

    unsetMoveTo( ) {
        this.y = this.destinationY;
        this.moving = false;
        this.destinationY = false;
    }

    writeText( ) {
        const canvasCtx = globals.SCREEN.MOBILE ? canvas.getBubbleCanvasContext() : canvas.getFrontCanvasContext();
        canvas.setFont(LARGE_FONT_SIZE, canvasCtx);

        let textLineX = this.textX;
        let textLineY = this.textY;
        let sentenceWidth = BUBBLE_INNER_PADDING * 2;
        for ( var i = 0; i < this.text.length; i++ ) {
            let activeWord = this.text[i];
            canvas.writeTextLine( activeWord.activeWord, textLineX, textLineY, LARGE_FONT_SIZE, canvasCtx, activeWord.color );
            let wordWidth = canvasCtx.measureText(activeWord.activeWord).width;
            textLineX += wordWidth;
            sentenceWidth += wordWidth;
            if ( sentenceWidth + wordWidth > this.width ) {
                textLineX = this.textX;
                textLineY += LARGE_FONT_LINE_HEIGHT;  
                sentenceWidth = BUBBLE_INNER_PADDING * 2;
            }
        }
    }

    drawButtons( ) {
        let pngs = globals.PNG_DICTIONARY;
        let frontCtx = globals.SCREEN.MOBILE ? canvas.getBubbleCanvasContext() : canvas.getFrontCanvasContext()
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
        let frontCtx = globals.SCREEN.MOBILE ? canvas.getBubbleCanvasContext() : canvas.getFrontCanvasContext()
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