const canvas = require( '../../../helpers/canvasHelpers' )
const state = require( '../../../game-data/state' )
const globals = require( '../../../game-data/globals' )

const I_TextBox = require( '../../interfaces/I_TextBox' ).I_TextBox

const getSpeechBubble = ( action ) => {
    state.currentMap.activeBubble = new SpeechBubble( action )
    state.currentMap.bubbleIsActive = true
}

const getSpeechBubbleXy = ( action, dimensions ) => {
    return {
        'x': ( action.top ? action.top : action.y ) - dimensions.height,
        'y': ( action.left ? action.left : action.x ) - dimensions.width
    }
}

const getSpeechBubbleDimensions = ( action ) => {
    var text = canvas.breakTextIntoLines( action.text, 'LARGE' )    
    canvas.setFont( "LARGE" )

    if ( action.name ) {
        return {
            'width' : ( text.length == 0 ) ? canvas.getFrontCanvasContext().measureText( text ).width : globals.MAX_BUBBLE_WIDTH,
            'height': globals.LARGE_FONT_LINE_HEIGHT + ( text.length * globals.LARGE_FONT_LINE_HEIGHT ) + globals.LARGE_FONT_LINE_HEIGHT
        }
    }

    return {
        'width' : ( text.length == 0 ) ? canvas.getFrontCanvasContext().measureText( text ).width : globals.MAX_BUBBLE_WIDTH,
        'height': globals.LARGE_FONT_LINE_HEIGHT + ( text.length * globals.LARGE_FONT_LINE_HEIGHT )
    }
}

class SpeechBubble extends I_TextBox {
    constructor( action ) {
        const dimensions = getSpeechBubbleDimensions( action );

        super( getSpeechBubbleXy( action, dimensions ), dimensions, 'LARGE', action.text )
        if ( action.name ) {
            this.setHeader( action.name + ": " )
        } 
    }
}

module.exports = {
    getSpeechBubble
}