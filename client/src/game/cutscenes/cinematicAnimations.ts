import { CanvasTypeEnum } from '../../enumerables/CanvasTypeEnum';
import { mobileAgent } from '../../helpers/screenOrientation';
import { cameraFocus } from '../cameraFocus';
import { drawBubbles } from '../controllers/bubbleController';
import { clearCanvasOfType } from '../controllers/gridCanvasController';
import { drawSpritesInOrder, handleRoadNetworkFuncs, handleNpcCounter } from '../map/mapAnimation';

export const handleCinematicAnimations = ( GAME ): void => {
    const PLAYER = GAME.PLAYER;
    clearCanvasOfType( CanvasTypeEnum.backSprites );

    if ( mobileAgent ) {
        clearCanvasOfType( CanvasTypeEnum.overview );
    }

    drawSpritesInOrder( GAME )   
    handleRoadNetworkFuncs(GAME)
    handleNpcCounter(GAME)

    //GAME.FRONT.activeEffects.forEach( ( e ) => {
    //    e.drawAndMove( );
    //})

    if ( GAME.FRONTGRID.hasFrontGrid && GAME.PLAYER.visionbox != undefined ) {
        const tilesFront = PLAYER.visionbox.getFrontGridTilesInArc( GAME.FRONTGRID );
        GAME.FRONTGRID.drawTilesAndClearArc( tilesFront );
    }

    drawBubbles();

    if ( cameraFocus.movingToNewFocus ) {
        cameraFocus.moveToNewFocus( );
    }
}