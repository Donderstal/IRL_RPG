import { initNeighbourhoodModel } from "../helpers/modelFactory";
import lennartMaps from './mapResources/leonard_heights/leonard_heights';
import type { NeighbourhoodModel } from "../models/NeighbourhoodModel";
import test_maps from "./mapResources/test_maps/test_maps";

const mapResources = {
    "leonard_heights": lennartMaps,
    "test-maps": test_maps
}

export const getNeighbourhood = ( fullMapName: string ): NeighbourhoodModel => {
    const mapNameArray = fullMapName.split( '/' );
    const neighbourhoodName = mapNameArray[0];

    return initNeighbourhoodModel( mapResources[neighbourhoodName] );
}