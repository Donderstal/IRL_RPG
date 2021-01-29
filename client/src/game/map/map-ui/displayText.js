const canvas = require( '../../../helpers/canvasHelpers' )
const globals = require( '../../../game-data/globals' )

const { MAX_BUBBLE_WIDTH, MIN_BUBBLE_WIDTH, LARGE_FONT_LINE_HEIGHT, SMALL_FONT_LINE_HEIGHT} = require( '../../../game-data/globals' )

const I_TextBox = require( '../../interfaces/I_TextBox' ).I_TextBox

const getSpeechBubble = ( action ) => {
    globals.GAME.activeBubble = new SpeechBubble( action )
    globals.GAME.bubbleIsActive = true
}

const getSpeechBubbleXy = ( x, y, dimensions ) => {
    return {
        'x': ( x - dimensions.width < 0 ) ? x : x - dimensions.width,
        'y': ( y - dimensions.height < 0 ) ? y : y - dimensions.height
    }
}

const getSpeechBubbleDimensions = ( action ) => {
    var text = canvas.breakTextIntoLines( action.text, 'LARGE' )    
    canvas.setFont( "LARGE" )
    var textWidth = canvas.getFrontCanvasContext().measureText( text ).width
    if ( action.name ) {
        return {
            'width' : ( text.length != 1 ) 
                ? MAX_BUBBLE_WIDTH 
                : ( textWidth < MIN_BUBBLE_WIDTH ) 
                    ? MIN_BUBBLE_WIDTH 
                    : textWidth + LARGE_FONT_LINE_HEIGHT,
            'height': LARGE_FONT_LINE_HEIGHT + ( text.length * LARGE_FONT_LINE_HEIGHT ) + SMALL_FONT_LINE_HEIGHT
        }
    }

    return {
        'width' : ( text.length != 1 ) 
            ? MAX_BUBBLE_WIDTH 
            : ( textWidth < MIN_BUBBLE_WIDTH ) 
                ? MIN_BUBBLE_WIDTH 
                : textWidth + LARGE_FONT_LINE_HEIGHT,
        'height': LARGE_FONT_LINE_HEIGHT + ( text.length * LARGE_FONT_LINE_HEIGHT )
    }
}

class SpeechBubble extends I_TextBox {
    constructor( action ) {
        const dimensions = getSpeechBubbleDimensions( action );

        super( getSpeechBubbleXy( action.x, action.y, dimensions ), dimensions, 'LARGE', action.text )
        if ( action.sfx ) {
            globals.GAME.sound.playEffect( action.sfx );
        }

        this.action = action;
        if ( action.name ) {
            this.setHeader( action.name + ": " )
        } 
    }
}

module.exports = {
    getSpeechBubble
}