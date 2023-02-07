import type { GridCellModel } from "../../../models/GridCellModel";
import type { Destination } from "../../map/map-classes/Destination";
import { getActiveDestinations, getActiveDestinationTiles } from "./destinationRegistry"

export const spriteHasDestination = ( id: string ): boolean => {
    const destinations = getActiveDestinations();
    return id in destinations;
}

export const getSpriteDestination = ( id: string ): Destination => {
    const destinations = getActiveDestinations();
    return destinations[id];
}

export const spriteHasDestinationCell = ( id: string ): boolean => {
    const destinationCells = getActiveDestinationTiles();
    return id in destinationCells;
} 

export const getSpriteDestinationCell = ( id: string ): GridCellModel => {
    const destinationCells = getActiveDestinationTiles();
    return destinationCells[id];
}