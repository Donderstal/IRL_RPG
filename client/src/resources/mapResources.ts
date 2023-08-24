import { initNeighbourhoodModel } from "../factories/modelFactory";
import lennartMaps from './mapResources/leonard_heights/leonard_heights';
import type { NeighbourhoodModel } from "../models/NeighbourhoodModel";
import test_maps from "./mapResources/test_maps/test_maps";
import cinematic_maps from "./mapResources/cinematic_maps/cinematic_maps";
import { NEIGHBOURHOOD_IDS } from "./mapResources/neighbourhoodIds";

const mapResources = {
    [NEIGHBOURHOOD_IDS.LEONARD_HEIGHTS]: lennartMaps,
    [NEIGHBOURHOOD_IDS.MASTER_ROOMS]: test_maps,
    [NEIGHBOURHOOD_IDS.CINEMATIC_MAPS]: cinematic_maps
}

export const getNeighbourhood = ( neighbourhoodName: string ): NeighbourhoodModel => {
    return initNeighbourhoodModel( mapResources[neighbourhoodName] );
}