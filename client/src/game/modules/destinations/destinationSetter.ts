import type { DestinationType } from "../../../enumerables/DestinationType";
import type { DirectionXy } from "../../../models/DirectionXyModel";
import type { GridCellModel } from "../../../models/GridCellModel";
import type { Sprite } from "../../core/Sprite";
import { Destination } from "../../map/map-classes/Destination";
import { addDestinationToRegistry, clearDestinationsRegistry, removeDestinationFromRegistry } from "./destinationRegistry";

export const initializeSpriteDestination = ( path: DirectionXy[], type: DestinationType, sprite: Sprite, destinationCell: GridCellModel ): void => {
    const id = sprite.spriteId;
    const destination = new Destination( path, type, sprite );
    addDestinationToRegistry( id, destination, destinationCell );
}
export const destroySpriteDestination = ( id: string ): void => {
    removeDestinationFromRegistry( id );
}
export const clearSpriteDestinations = (): void => {
    clearDestinationsRegistry();
}