import { drawBubbles } from '../controllers/bubbleController';
import { drawSpritesInOrder } from '../map/mapAnimation';
import { clearSpriteCanvasGrids, clearUICanvasGrids } from '../canvas/canvasSetter';
import { handleSpritesScheduledForDelete } from '../modules/sprites/spriteHandler';

export const handleCinematicAnimations = ( ): void => {
    clearSpriteCanvasGrids();
    clearUICanvasGrids();
    handleSpritesScheduledForDelete();
    drawSpritesInOrder();
    drawBubbles();
}