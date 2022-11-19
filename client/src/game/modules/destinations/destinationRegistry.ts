import type { Destination } from "../../map/map-classes/Destination";

let destinations: { [key in string]: Destination } = {};

export const addDestinationToRegistry = ( id: string, destination: Destination ): void => {
    destinations[id] = destination;
}
export const removeDestinationFromRegistry = ( id: string ): void => {
    delete destinations[id];
}
export const getActiveDestinations = (): { [key in string]: Destination } => {
    return destinations;
}
export const clearDestinationsRegistry = (): void => {
    destinations = { };
}