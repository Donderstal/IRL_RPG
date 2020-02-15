const canvasHelpers = require( '../../helpers/canvasHelpers' )
const state = require( '../../game-data/state' )

const getSpeechBubble = ( action ) => {
    state.currentMap.activeBubble = new SpeechBubble( action )
    state.currentMap.bubbleIsActive = true
}

class SpeechBubble {
    constructor( action ) {
        console.log(action)
        this.text = action.text
        this.y = action.y
        if ( action.left ) {
            this.x = action.left
        }
        else {
            this.x = action.x
        }
        this.speaker = 'Neckbeard'

        this.drawText()
    }

    drawBubble( ) {

    }

    drawText( ) {
        canvasHelpers.writeToTextCanvas( this.text )
    }
}

module.exports = {
    getSpeechBubble
}