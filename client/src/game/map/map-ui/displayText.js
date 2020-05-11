const canvas = require( '../../../helpers/canvasHelpers' )
const state = require( '../../../game-data/state' )
const globals = require( '../../../game-data/globals' )

const I_TextBox = require( '../../interfaces/I_TextBox' ).I_TextBox

const getSpeechBubble = ( action ) => {
    state.currentMap.activeBubble = new SpeechBubble( action )
    state.currentMap.bubbleIsActive = true
}

const getSpeechBubbleXy = ( action, dimensions ) => {
    let xy = {
        'x': getSpeechBubbleX( action, dimensions ),
        'y': getSpeechBubbleY( action, dimensions )
    }

    return xy
}

const getSpeechBubbleX = ( action, dimensions ) => {
    let x = ( action.left ? action.left : action.x );

    if ( x - dimensions.width < 0 ) {
        return ( action.right ? action.right : action.x )
    }
    else {
        return x - dimensions.width 
    }
}

const getSpeechBubbleY = ( action, dimensions ) => {
    let y = ( action.top ? action.top : action.y );

    if ( y - dimensions.height < 0 ) {
        return ( action.bottom ? action.bottom : action.y )
    }
    else {
        return y - dimensions.height
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

        super( getSpeechBubbleXy( action, dimensions ), dimensions, 'LARGE', action.text )
        this.action = action;
        if ( action.name ) {
            this.setHeader( action.name + ": " )
        } 
    }
}

module.exports = {
    getSpeechBubble
}