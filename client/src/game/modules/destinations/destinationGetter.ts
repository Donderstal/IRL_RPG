import type { Destination } from "../../map/map-classes/Destination";
import { getActiveDestinations } from "./destinationRegistry"

export const spriteHasDestination = ( id: string ): boolean => {
    const destinations = getActiveDestinations();
    return id in destinations;
}

export const getSpriteDestination = ( id: string ): Destination => {
    const destinations = getActiveDestinations();
    return destinations[id];
}