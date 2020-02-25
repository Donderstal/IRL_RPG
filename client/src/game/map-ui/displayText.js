const canvas = require( '../../helpers/canvasHelpers' )
const state = require( '../../game-data/state' )
const globals = require( '../../game-data/globals' )

const getSpeechBubble = ( action ) => {
    state.currentMap.activeBubble = new SpeechBubble( action )
    state.currentMap.bubbleIsActive = true
}

class SpeechBubble {
    constructor( action ) {
        this.text = canvas.breakTextIntoLines( action.text, 'LARGE' )
        this.textHeight = Array.isArray( this.text ) ? ((this.text.length * globals.LARGE_FONT_SIZE) - globals.LARGE_FONT_SIZE) : 0
        
        this.y = action.top ? action.top - globals.STRD_SPRITE_HEIGHT : (action.y - (globals.STRD_SPRITE_HEIGHT * 2) ) 
        this.x = action.left ? action.left : action.x

        this.speaker = 'Neckbeard'
        this.textRect = setTextBoxRect(this.text, this.x, this.y, this.textHeight)
        this.borderRect = {   
            'width': this.textRect.width + 4,
            'left': this.textRect.left - 2,
            'height': this.textRect.height + 4,
            'top': this.textRect.top - 2
        }

        this.drawBubble( )
    }

    drawBubble( ) {
        drawSpeechBubble( this.text, this.textHeight, this.textRect, this.borderRect )   
    }
}

const drawSpeechBubble = ( text, totalTextHeight, textRect, borderRect ) => {
    //Body
    canvas.drawRect( borderRect.left, borderRect.top, borderRect.width, borderRect.height );
    canvas.drawRect( textRect.left, textRect.top, textRect.width, textRect.height, '#989898' );

    //Header
    let headerBottomY = textRect.top + 24
    canvas.writeTextLine( "Player says:", textRect.left + 5, textRect.top + 16, 'SMALL' )
    canvas.drawLineOnXAxis( textRect.left, headerBottomY, textRect.right )

    //Main text
    let mainTextBottomY = headerBottomY + 28;
    if ( !Array.isArray(text) ) {
        canvas.writeTextLine( text, textRect.left + 5, textRect.top + 44, "LARGE", "#000000" )
    }
    else {
        mainTextBottomY = drawMultipleLines( textRect.left + 5, headerBottomY, text,  );
    }
    canvas.drawLineOnXAxis( textRect.left, mainTextBottomY, textRect.right )

    //Bottom buttons
    canvas.drawLineOnYAxis( mainTextBottomY, textRect.horiMiddle, textRect.top + textRect.height )
    canvas.writeTextLine( "(Q) Ask again", textRect.left + 5, mainTextBottomY + globals.SMALL_FONT_SIZE, "SMALL" )
    canvas.writeTextLine( "(E) Dismiss", textRect.horiMiddle + 5, mainTextBottomY + globals.SMALL_FONT_SIZE , "SMALL" )
}

const setTextBoxRect = ( text, x, y, totalTextHeight ) => {
    let ctx = canvas.getFrontCanvasContext()
    canvas.setFont('LARGE')
    let textRect = {
        'width': globals.MIN_BUBBLE_WIDTH,
        'left': x,
        'right': x + globals.MIN_BUBBLE_WIDTH,
        'height': 80,
        'top': y,
        'horiMiddle': 0,
    }

    const textWidthAboveMin = ctx.measureText( text ).width > globals.MIN_BUBBLE_WIDTH;
    const textWidthAboveMax = ctx.measureText( text ).width > ( globals.MAX_BUBBLE_WIDTH - 10 )

    if ( textWidthAboveMin && !textWidthAboveMax ) {
        textRect.width = ctx.measureText( text ).width + 8;
        textRect.right = textRect.left + textRect.width
    }
    else if ( textWidthAboveMax ) {
        textRect.width = globals.MAX_BUBBLE_WIDTH;
        textRect.right = textRect.left + globals.MAX_BUBBLE_WIDTH
        textRect.height += totalTextHeight
    }

    textRect.horiMiddle = textRect.left + textRect.width * .5
    return textRect
}

const drawMultipleLines = ( startingX, startingY, linesArray ) => {
    linesArray.forEach( (e) => {
        startingY += globals.LARGE_FONT_SIZE
        canvas.writeTextLine( e, startingX, startingY, "LARGE", "#586f7c" )
    })

    return startingY + 8
}

const setTextGlobals = ( ) => {
    // the text globals should be set dynamically
    // to make the game more accessible to players
    // on all kinds of screen sizes
}

module.exports = {
    getSpeechBubble
}