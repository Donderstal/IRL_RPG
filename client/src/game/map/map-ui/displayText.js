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
        'x': ( x - MAX_BUBBLE_WIDTH < 0 ) ? x : x - MAX_BUBBLE_WIDTH,
        'y': ( y - dimensions.height < 0 ) ? y : y - dimensions.height
    }
}

const getSpeechBubbleDimensions = ( action ) => {
    var text = canvas.breakTextIntoLines( action.text, globals.LARGE_FONT_SIZE )    
    return {
        'width' : MAX_BUBBLE_WIDTH ,
        'height': LARGE_FONT_LINE_HEIGHT + ( text.length * LARGE_FONT_LINE_HEIGHT ) + ( action.name ? SMALL_FONT_LINE_HEIGHT : 0 )
    }
}

class SpeechBubble extends I_TextBox {
    constructor( action ) {
        const dimensions = getSpeechBubbleDimensions( action );

        super( getSpeechBubbleXy( action.x, action.y, dimensions ), dimensions, 'LARGE', action.text, action.options )
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