const canvas = require( '../../helpers/canvasHelpers' )
const state = require( '../../game-data/state' )
const globals = require( '../../game-data/globals' )

const getSpeechBubble = ( action ) => {
    state.currentMap.activeBubble = new SpeechBubble( action )
    state.currentMap.bubbleIsActive = true
}

class SpeechBubble {
    constructor( action ) {
        this.text = action.text
        
        if ( action.top ) {
            this.y = ( ( action.top - globals.STRD_SPRITE_HEIGHT) ) 
        }
        else {
            this.y = (action.y - (globals.STRD_SPRITE_HEIGHT * 2)) 
        }
        if ( action.left ) {
            this.x = action.left
        }
        else {
            this.x = action.x
        }
        this.speaker = 'Neckbeard'

        this.drawBubble( )
    }

    drawBubble( ) {
        drawSpeechBubble( this.text, this.x, this.y )   
    }
}

const drawSpeechBubble = ( text, x ,y ) => {
    let ctx = canvas.getFrontCanvasContext()

    const textRect = {
        'width': globals.MIN_BUBBLE_WIDTH,
        'left': x,
        'right': x + globals.MIN_BUBBLE_WIDTH,
        'height': 80,
        'top': y,
        'horiMiddle': 0
    }
    const borderRect = {   
        'width': textRect.width + 4,
        'left': textRect.left - 2,
        'height': textRect.height + 4,
        'top': textRect.top - 2
    }

    canvas.setFont('LARGE')

    const textWidthAboveMin = ctx.measureText( text ).width > globals.MIN_BUBBLE_WIDTH;
    const textWidthAboveMax = ctx.measureText( text ).width > globals.MAX_BUBBLE_WIDTH

    if ( textWidthAboveMin && !textWidthAboveMax ) {
        textRect.width = ctx.measureText( text ).width + 8;
        borderRect.width = textRect.width + 4;
        textRect.right = textRect.left + textRect.width
    }
    else if ( textWidthAboveMax ) {
        textRect.width = ctx.measureText( text ).width + 8;
        borderRect.width = textRect.width + 4;
        textRect.right = textRect.left + textRect.width
    }

    textRect.horiMiddle = textRect.left + textRect.width * .5

    if ( textRect.right > state.currentMap.borders.right ) {
        textRect.right -= ( textRect.right - state.currentMap.borders.right ) ;
    }

    //Body
    canvas.drawRect( borderRect.left, borderRect.top, borderRect.width, borderRect.height );
    canvas.drawRect( textRect.left, textRect.top, textRect.width, textRect.height, '#1a1423' );

    //Header
    canvas.writeTextLine( "Player says:", textRect.left + 5, textRect.top + 16, 'SMALL' )
    canvas.drawLineOnXAxis( textRect.left, textRect.top + 24, textRect.right )

    //Main text
    canvas.writeTextLine( text, textRect.left + 5, textRect.top + 44, "LARGE", "#586f7c" )
    canvas.drawLineOnXAxis( textRect.left, textRect.top + 52, textRect.right )

    //Bottom buttons
    canvas.drawLineOnYAxis( textRect.top + 52, textRect.horiMiddle, textRect.top + 80 )
    canvas.writeTextLine( "(Q) Ask again", textRect.left + 5, textRect.top + 70, "SMALL" )
    canvas.writeTextLine( "(E) Dismiss", textRect.horiMiddle + 5, textRect.top + 70, "SMALL" )
}

const setTextGlobals = ( ) => {
    // the text globals should be set dynamically
    // to make the game more accessible to players
    // on all kinds of screen sizes
}

module.exports = {
    getSpeechBubble
}