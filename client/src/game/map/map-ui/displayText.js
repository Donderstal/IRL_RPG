const canvas = require( '../../../helpers/canvasHelpers' )
const state = require( '../../../game-data/state' )
const globals = require( '../../../game-data/globals' )

const I_TextBox = require( '../../interfaces/I_TextBox' ).I_TextBox

const getSpeechBubble = ( action ) => {
    state.currentMap.activeBubble = new SpeechBubble( action )
    state.currentMap.bubbleIsActive = true
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
                ? globals.MAX_BUBBLE_WIDTH 
                : ( textWidth < globals.MIN_BUBBLE_WIDTH ) 
                    ? globals.MIN_BUBBLE_WIDTH 
                    : textWidth + globals.LARGE_FONT_LINE_HEIGHT,
            'height': globals.LARGE_FONT_LINE_HEIGHT + ( text.length * globals.LARGE_FONT_LINE_HEIGHT ) + globals.SMALL_FONT_LINE_HEIGHT
        }
    }

    return {
        'width' : ( text.length != 1 ) 
            ? globals.MAX_BUBBLE_WIDTH 
            : ( textWidth < globals.MIN_BUBBLE_WIDTH ) 
                ? globals.MIN_BUBBLE_WIDTH 
                : textWidth + globals.LARGE_FONT_LINE_HEIGHT,
        'height': globals.LARGE_FONT_LINE_HEIGHT + ( text.length * globals.LARGE_FONT_LINE_HEIGHT )
    }
}

class SpeechBubble extends I_TextBox {
    constructor( action ) {
        const dimensions = getSpeechBubbleDimensions( action );

        super( getSpeechBubbleXy( action.x, action.y, dimensions ), dimensions, 'LARGE', action.text )
        this.action = action;
        if ( action.name ) {
            this.setHeader( action.name + ": " )
        } 
    }
}

module.exports = {
    getSpeechBubble
}