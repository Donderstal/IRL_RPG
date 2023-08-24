import { cameraFocus } from '../cameraFocus';
import { drawBubbles } from '../controllers/bubbleController';
import { getSpriteById } from "../modules/sprites/spriteGetter";
import { drawSpritesInOrder } from '../map/mapAnimation';
import { clearSpriteCanvasGrids, clearUICanvasGrids } from '../canvas/canvasSetter';
import { handleSpritesScheduledForDelete } from '../modules/sprites/spriteHandler';

export const handleCinematicAnimations = ( ): void => {
    clearSpriteCanvasGrids();
    clearUICanvasGrids();
    handleSpritesScheduledForDelete();
    drawSpritesInOrder();
    drawBubbles();

    if ( cameraFocus.movingToNewFocus ) {
        const spriteInFocus = getSpriteById( cameraFocus.focusSpriteId );
        cameraFocus.moveToNewFocus( spriteInFocus );
    }
}