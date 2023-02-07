import type { GridCellModel } from "../../../models/GridCellModel";
import type { Destination } from "../../map/map-classes/Destination";

let destinations: { [key in string]: Destination } = {};
let destinationTiles: { [key in string]: GridCellModel } = {};

export const addDestinationToRegistry = ( id: string, destination: Destination, destinationCell: GridCellModel  ): void => {
    destinations[id] = destination;
    if ( destinationCell !== null ) {
        destinationTiles[id] = destinationCell;
    }
}
export const removeDestinationFromRegistry = ( id: string ): void => {
    delete destinations[id];
}
export const getActiveDestinations = (): { [key in string]: Destination } => {
    return destinations;
}
export const getActiveDestinationTiles = (): { [key in string]: GridCellModel } => {
    return destinationTiles;
}
export const clearDestinationsRegistry = (): void => {
    destinations = {};
    destinationTiles = {};
}