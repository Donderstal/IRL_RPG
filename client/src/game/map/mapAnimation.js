const state = require('../../game-data/state')
const globals = require('../../game-data/globals')
const canvas = require('../../helpers/canvasHelpers')
const mapControls = require('./mapControls')
const mapController = require('./mapController')

const handleMapAnimations = ( ) => {
    const foreground = globals.GAME.front.class;
    const background = globals.GAME.back.class;
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
    }

    player.pathIsBlocked = false;

    if ( state.currentMap.bubbleIsActive ) {
        state.currentMap.activeBubble.drawTextBox( )
    }
}

const setActiveTile = ( ) => {
    globals.GAME.back.class.setActiveTile( globals.GAME.front.class.playerSprite.centerX( ), globals.GAME.front.class.playerSprite.baseY( ) )
    globals.GAME.front.class.playerSprite.row = globals.GAME.back.class.activeTile.row;
    globals.GAME.front.class.playerSprite.col = globals.GAME.back.class.activeTile.col;
}

const drawSpritesInOrder = ( ) => {
    globals.GAME.front.class.allSprites.sort( ( a, b ) => {
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

    globals.GAME.front.class.allSprites.forEach( (e) => {
        e.drawSprite()
    })       
}

module.exports = {
    handleMapAnimations
}