import type { DirectionXy } from "../../../models/DirectionXyModel";
import type { GridCellModel } from "../../../models/GridCellModel";
import type { Sprite } from "../../core/Sprite";
import { Destination } from "../../map/map-classes/Destination";
import { addDestinationToRegistry, clearDestinationsRegistry, removeDestinationFromRegistry } from "./destinationRegistry";

export const initializeSpriteDestination = ( path: DirectionXy[], destinationCell: GridCellModel, sprite: Sprite, contractId: string ): void => {
    const id = sprite.spriteId;
    const destination = new Destination( path, destinationCell, sprite, contractId );
    addDestinationToRegistry( id, destination, destinationCell );
}
export const destroySpriteDestination = ( id: string ): void => {
    removeDestinationFromRegistry( id );
}
export const clearSpriteDestinations = (): void => {
    clearDestinationsRegistry();
}