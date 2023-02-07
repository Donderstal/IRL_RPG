import type { DeleteSpriteModel } from "../../../models/DeleteSpriteModel";
import { getSpriteById } from "./spriteGetter";
import { getSpriteDeletionOptions } from "./spriteRegistry"
import { removeSpriteById } from "./spriteSetter";

export const handleSpritesScheduledForDelete = (): void => {
    const spritesScheduledForDeleteOptions = getSpriteDeletionOptions();
    if ( spritesScheduledForDeleteOptions === undefined ) return;
    spritesScheduledForDeleteOptions.forEach( tryDeleteSprite )
}

const tryDeleteSprite = ( model: DeleteSpriteModel ): void => {
    const sprite = getSpriteById( model.id );
    if ( model.force || ( model.deleteWhenInvisible && !sprite.isVisible() ) || model.attempts > 5 ) {
        removeSpriteById( model.id, true );
    }
    else {
        model.attempts++
    }
}