import { CanvasTypeEnum } from '../../enumerables/CanvasTypeEnum';
import { cameraFocus } from '../cameraFocus';
import { drawBubbles } from '../controllers/bubbleController';
import { clearGridCanvasOfType } from '../controllers/gridCanvasController';
import { getSpriteById, getPlayer } from "../modules/sprites/spriteGetter";
import { clearUtilityCanvasOfType } from '../controllers/utilityCanvasController';
import { drawSpritesInOrder, handleRoadNetworkFuncs, handleNpcCounter } from '../map/mapAnimation';

export const handleCinematicAnimations = ( GAME ): void => {
    const PLAYER = GAME.PLAYER;
    clearGridCanvasOfType( CanvasTypeEnum.backSprites );
    clearUtilityCanvasOfType( CanvasTypeEnum.speechBubbleCanvas );

    drawSpritesInOrder( GAME )   
    //handleRoadNetworkFuncs(GAME)
    //handleNpcCounter(GAME)

    //GAME.FRONT.activeEffects.forEach( ( e ) => {
    //    e.drawAndMove( );
    //})

    if ( GAME.FRONTGRID.hasFrontGrid && getPlayer().visionbox != undefined ) {
        const tilesFront = getPlayer().visionbox.getFrontGridTilesInArc( GAME.FRONTGRID );
        GAME.FRONTGRID.drawTilesAndClearArc( tilesFront );
    }

    drawBubbles();

    if ( cameraFocus.movingToNewFocus ) {
        const spriteInFocus = getSpriteById( cameraFocus.focusSpriteId );
        cameraFocus.moveToNewFocus( spriteInFocus );
    }
}