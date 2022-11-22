import { cameraFocus } from '../cameraFocus';
import { drawBubbles } from '../controllers/bubbleController';
import { getSpriteById, getPlayer } from "../modules/sprites/spriteGetter";
import { drawSpritesInOrder, handleRoadNetworkFuncs, handleNpcCounter } from '../map/mapAnimation';
import { clearSpriteCanvasGrids, clearUICanvasGrids } from '../canvas/canvasSetter';
import { getFrontTilesGrid } from '../canvas/canvasGetter';

export const handleCinematicAnimations = ( ): void => {
    clearSpriteCanvasGrids();
    clearUICanvasGrids()

    const frontTiles = getFrontTilesGrid();

    drawSpritesInOrder( )   
    //handleRoadNetworkFuncs()
    //handleNpcCounter()

    //GAME.FRONT.activeEffects.forEach( ( e ) => {
    //    e.drawAndMove( );
    //})

    if ( frontTiles.hasFrontGrid && getPlayer().visionbox != undefined ) {
        const tilesFront = getPlayer().visionbox.getFrontGridTilesInArc( frontTiles );
        frontTiles.drawTilesAndClearArc( tilesFront );
    }

    drawBubbles();

    if ( cameraFocus.movingToNewFocus ) {
        const spriteInFocus = getSpriteById( cameraFocus.focusSpriteId );
        cameraFocus.moveToNewFocus( spriteInFocus );
    }
}