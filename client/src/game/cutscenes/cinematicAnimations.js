const globals = require('../../game-data/globals');
const canvas = require('../../helpers/canvasHelpers');
const { drawSpritesInOrder, handleRoadNetworkFuncs, handleNpcCounter } = require('../map/mapAnimation');

const handleCinematicAnimations = ( GAME ) => {
    const PLAYER = GAME.PLAYER;
    canvas.clearEntireCanvas("FRONT");

    if ( globals.SCREEN.MOBILE ) {
        canvas.clearEntireCanvas("SPEECH");
    }

    drawSpritesInOrder( GAME )   
    handleRoadNetworkFuncs(GAME)
    handleNpcCounter(GAME)

    GAME.FRONT.activeEffects.forEach( ( e ) => {
        e.drawAndMove( );
    })

    if ( GAME.FRONTGRID.hasFrontGrid ) {
        const tilesFront = PLAYER.visionbox.getFrontGridTilesInArc( GAME.FRONTGRID );
        GAME.FRONTGRID.drawTilesAndClearArc( tilesFront );
    }

    GAME.speechBubbleController.drawBubbles( );

    if ( GAME.cameraFocus.movingToNewFocus ) {
        GAME.cameraFocus.moveToNewFocus( );
    }
}

module.exports = {
    handleCinematicAnimations
}