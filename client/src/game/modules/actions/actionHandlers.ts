import type { Sprite } from "../../core/Sprite";
import { getSpriteActionById } from "./actionGetter";
import { getSavePoint } from "./actionRegistry";

export const updateSpriteAssociatedAction = ( sprite: Sprite ): void => {
    const action = getSpriteActionById(sprite.spriteId);
    if ( action !== null && action !== undefined ) {
        action.updateXy( sprite.x, sprite.y );
    }
};
export const drawSavePoint = (): void => {
    const savePoint = getSavePoint()
    if ( savePoint !== null ) {
        savePoint.draw()
    }
}