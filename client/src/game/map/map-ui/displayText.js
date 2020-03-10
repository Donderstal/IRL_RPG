const canvas = require( '../../../helpers/canvasHelpers' )
const state = require( '../../../game-data/state' )
const globals = require( '../../../game-data/globals' )

const getSpeechBubble = ( action ) => {
    state.currentMap.activeBubble = new SpeechBubble( action )
    state.currentMap.bubbleIsActive = true
}

class SpeechBubble {
    constructor( action ) {
        this.text = canvas.breakTextIntoLines( action.text, 'LARGE' )
        this.textHeight = Array.isArray( this.text ) ? ((this.text.length * globals.LARGE_FONT_SIZE + 8 ) - globals.LARGE_FONT_SIZE) : 0
        
        this.y = action.top ? action.top - globals.STRD_SPRITE_HEIGHT : (action.y - (globals.STRD_SPRITE_HEIGHT * 2) ) 
        this.x = action.left ? action.left : action.x

        this.speaker = 'SELF'
        if ( action.name ) {
            this.speaker = action.name
        }
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
        drawSpeechBubble( this.text, this.speaker, this.textRect, this.borderRect )   
    }
} 

const getTextContainer = ( text ) => {
    state.battleState.textContainer = new TextContainer( text )
}

class TextContainer {
    constructor( text ) {
        this.width  = globals.CANVAS_WIDTH / 2
        this.height = globals.CANVAS_HEIGHT / 6

        this.x      = globals.CANVAS_WIDTH / 4
        this.y      = ( globals.CANVAS_HEIGHT / 3 ) * 2

        this.text   = text

        this.drawContainer()
    }

    drawContainer( ) {
        canvas.drawRect( "FRONT", this.x - 2, this.y - 2, this.width + 4, this.height + 4, "rgba(0,0,0, 0.66)" );
        canvas.drawRect( "FRONT", this.x, this.y, this.width, this.height, 'rgba(255,255,255, 0.66)' );
        canvas.writeTextLine( this.text, this.x + globals.LARGE_FONT_SIZE, this.y + ( globals.LARGE_FONT_SIZE * 2 ), 'LARGE', "black" )  
    }

    setText( text ) {
        this.text = text
    }
}

const drawSpeechBubble = ( text, speaker, textRect, borderRect ) => {
    //Body
    canvas.drawRect( "FRONT", borderRect.left, borderRect.top, borderRect.width, borderRect.height, "rgba(0,0,0, 0.66)" );
    canvas.drawRect( "FRONT",textRect.left, textRect.top, textRect.width, textRect.height, 'rgba(255,255,255, 0.66)' );

    //Header
    let headerBottomY = textRect.top + 24
    if ( speaker != "SELF" ) {
        canvas.writeTextLine( speaker + ":", textRect.left + 5, textRect.top + 16, 'SMALL', "black" )        
    }

    //Main text
    let mainTextBottomY = headerBottomY + 28;
    if ( !Array.isArray(text) ) {
        canvas.writeTextLine( text, textRect.left + 5, textRect.top + 44, "LARGE", "black" )
    }
    else {
        mainTextBottomY = drawMultipleLines( textRect.left + 5, headerBottomY, text,  );
    }

    //Bottom buttons
    canvas.writeTextLine( "(Q) Continue", textRect.left + 5, mainTextBottomY + globals.SMALL_FONT_SIZE, "SMALL", "black" )
    canvas.writeTextLine( "(E) Dismiss", textRect.horiMiddle + 16, mainTextBottomY + globals.SMALL_FONT_SIZE , "SMALL", "black" )
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
        textRect.left -= ( textRect.width / 2 )
        textRect.right = textRect.left + textRect.width
    }
    else if ( textWidthAboveMax ) {
        textRect.width = globals.MAX_BUBBLE_WIDTH;
        textRect.left -= ( textRect.width / 2 )
        textRect.right = textRect.left + globals.MAX_BUBBLE_WIDTH
        textRect.height += totalTextHeight
    }

    textRect.horiMiddle = textRect.left + textRect.width * .5
    return textRect
}

const drawMultipleLines = ( startingX, startingY, linesArray ) => {
    linesArray.forEach( (e) => {
        startingY += globals.LARGE_FONT_SIZE + 8
        canvas.writeTextLine( e, startingX, startingY, "LARGE", "black" )
    })

    return startingY + 12
}

const setTextGlobals = ( ) => {
    // the text globals should be set dynamically
    // to make the game more accessible to players
    // on all kinds of screen sizes
}

module.exports = {
    getSpeechBubble,
    getTextContainer
}