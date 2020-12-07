const state = require('../../game-data/state')
const globals = require('../../game-data/globals')
const canvas = require('../../helpers/canvasHelpers')
const mapControls = require('./mapControls')
const mapController = require('./mapController')

const handleMapAnimations = ( ) => {
    const foreground = globals.FOREGROUND;
    const background = globals.BACKGROUND;
    const player     = foreground.playerSprite
    state.currentMap.layeredSprites = [];

    if ( state.mapTransition != null ) {
        mapController.switchMap( state.mapTransition )
        state.transitioning = true;
        state.mapTransition = null
    }

    drawSpritesInOrder( )

    if ( player != undefined ) {
        setActiveTile( );
        mapControls.handleMovementKeys( );  

        if ( state.currentMap.mapActions ) {     
            state.currentMap.mapActions.forEach( (action) => {
                action.checkForActionRange( );
            })
        }  
        
        if ( background.activePlayerTile.hasEvent && background.activePlayerTile.eventType == "DOOR" ) {     
            console.log('on door!')
            background.activePlayerTile.event.checkForBlockedRange( );
        }  
    }

    if ( state.currentMap.bubbleIsActive ) {
        state.currentMap.activeBubble.drawTextBox( )
    }
}

const setActiveTile = ( ) => {
    globals.BACKGROUND.setActiveTile( globals.FOREGROUND.playerSprite.centerX( ), globals.FOREGROUND.playerSprite.baseY( ) )
    globals.FOREGROUND.playerSprite.row = globals.BACKGROUND.activeTile.row;
    globals.FOREGROUND.playerSprite.col = globals.BACKGROUND.activeTile.col;
}

const drawSpritesInOrder = ( ) => {
    globals.FOREGROUND.allSprites.sort( ( a, b ) => {
        if ( a.row > b.row || a.row === b.row && a.y > b.y ) {
            return 1 
        }
        else if (b.row > a.row || b.row === a.row && b.y > a.y ) {
            return -1
        }
        else {
            return 0
        }          
    })

    canvas.clearEntireCanvas("FRONT")

    globals.FOREGROUND.allSprites.forEach( (e) => {
        e.drawSprite()
    })       
}

module.exports = {
    handleMapAnimations
}