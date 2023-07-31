import { getAllDoors } from "./doorRegistry";
import type { Sprite } from "../../core/Sprite";

export const updateSpriteAssociatedDoor = ( sprite: Sprite ): void => {
    const doors = getAllDoors();
    const door = doors[sprite.spriteId];
    if ( door !== null && door !== undefined ) {
        door.updateXy( sprite.x, sprite.y );
    }
};
