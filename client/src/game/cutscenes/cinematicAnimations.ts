import globals from '../../game-data/globals';
import { clearEntireCanvas } from '../../helpers/canvasHelpers';
import { drawSpritesInOrder, handleRoadNetworkFuncs, handleNpcCounter } from '../map/mapAnimation';

export const handleCinematicAnimations = ( GAME ): void => {
    const PLAYER = GAME.PLAYER;
    clearEntireCanvas("FRONT");

    if ( globals.SCREEN.MOBILE ) {
        clearEntireCanvas("SPEECH");
    }

    drawSpritesInOrder( GAME )   
    handleRoadNetworkFuncs(GAME)
    handleNpcCounter(GAME)

    GAME.FRONT.activeEffects.forEach( ( e ) => {
        e.drawAndMove( );
    })

    if ( GAME.FRONTGRID.hasFrontGrid && GAME.PLAYER.visionbox != undefined ) {
        const tilesFront = PLAYER.visionbox.getFrontGridTilesInArc( GAME.FRONTGRID );
        GAME.FRONTGRID.drawTilesAndClearArc( tilesFront );
    }

    GAME.speechBubbleController.drawBubbles( );

    if ( GAME.cameraFocus.movingToNewFocus ) {
        GAME.cameraFocus.moveToNewFocus( );
    }
}