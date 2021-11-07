const canvas = require( '../../helpers/canvasHelpers' );
const globals = require( '../../game-data/globals' );
const { MAX_BUBBLE_WIDTH, GRID_BLOCK_PX } = require( '../../game-data/globals' );
const { I_TextBox } = require( '../interfaces/I_TextBox' );

const getSpeechBubbleXy = ( location, dimensions ) => {
    return {
        'x': location.x,
        'y': location.y - dimensions.height
    }
}

const getSpeechBubbleDimensions = ( contents ) => {
    var text = canvas.breakTextIntoLines( contents.text, globals.LARGE_FONT_SIZE )    
    return {
        'width' : MAX_BUBBLE_WIDTH,
        'height': text.length * GRID_BLOCK_PX
    }
}

class SpeechBubble extends I_TextBox {
    constructor( contents, location ) {
        const dimensions = getSpeechBubbleDimensions( contents );

        super( getSpeechBubbleXy( location, dimensions ), dimensions, 'LARGE', contents.text, contents.options )
        if ( contents.sfx ) {
            globals.GAME.sound.playEffect( contents.sfx );
        }

        this.action = contents;
        if ( contents.name ) {
            this.setHeader( contents.name + ": " )
        } 
    }
}

module.exports = {
    SpeechBubble
}