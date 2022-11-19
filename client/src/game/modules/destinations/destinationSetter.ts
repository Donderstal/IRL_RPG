import type { DestinationCellModel } from "../../../models/DestinationCellModel";
import type { Sprite } from "../../core/Sprite";
import { Destination } from "../../map/map-classes/Destination";
import { addDestinationToRegistry, clearDestinationsRegistry, removeDestinationFromRegistry } from "./destinationRegistry";

export const initializeSpriteDestination = ( sprite: Sprite, destinationCell: DestinationCellModel ): void => {
    const id = sprite.spriteId;
    const destination = new Destination( destinationCell, sprite );
    addDestinationToRegistry( id, destination );
}
export const destroySpriteDestination = ( id: string ): void => {
    removeDestinationFromRegistry( id );
}
export const clearSpriteDestinations = (): void => {
    clearDestinationsRegistry();
}