import { getAllDoors } from "./doorRegistry";

export const updateSpriteAssociatedDoor = ( sprite: Sprite ): void => {
    const doors = getAllDoors();
    const door = doors[sprite.spriteId];
    if ( door !== null && door !== undefined ) {
        door.updateXy( sprite.centerX, sprite.baseY );
    }
};
