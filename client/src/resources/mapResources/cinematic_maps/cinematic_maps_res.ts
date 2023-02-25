const appendToCMNeighbourhoodKey = ( string ) => {
    return `${CM_KEY}/${string}`;
}

export const CM_KEY = "cinematic-maps";
export const CM_NAME = "Cinematic maps"

export const CM_INTRO_CINEMATIC_MAP_1 = appendToCMNeighbourhoodKey( "intro-cinematic-map-1" );
export const CM_INTRO_CINEMATIC_MAP_2 = appendToCMNeighbourhoodKey( "intro-cinematic-map-2" );