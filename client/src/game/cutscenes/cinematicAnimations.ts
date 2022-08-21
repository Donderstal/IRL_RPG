import { clearEntireCanvas } from '../../helpers/canvasHelpers';
import { mobileAgent } from '../../helpers/screenOrientation';
import { cameraFocus } from '../cameraFocus';
import { drawBubbles } from '../controllers/bubbleController';
import { drawSpritesInOrder, handleRoadNetworkFuncs, handleNpcCounter } from '../map/mapAnimation';

export const handleCinematicAnimations = ( GAME ): void => {
    const PLAYER = GAME.PLAYER;
    clearEntireCanvas("FRONT");

    if ( mobileAgent ) {
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

    drawBubbles();

    if ( cameraFocus.movingToNewFocus ) {
        cameraFocus.moveToNewFocus( );
    }
}