import { drawBubbles } from '../controllers/bubbleController';
import { drawSpritesInOrder } from '../map/mapAnimation';
import { clearSpriteCanvasGrids, clearUICanvasGrids } from '../canvas/canvasSetter';

export const handleCinematicAnimations = ( ): void => {
    clearSpriteCanvasGrids();
    clearUICanvasGrids();
    drawSpritesInOrder();
    drawBubbles();
}