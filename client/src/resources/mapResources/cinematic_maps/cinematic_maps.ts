import { CM_INTRO_CINEMATIC_MAP_1, CM_INTRO_CINEMATIC_MAP_2, CM_KEY, CM_NAME, removeCMNeighbourhoodKey } from "./cinematic_maps_res";
import introCinematicMap1 from "./story-cinematic-1/intro-cinematic-map-1";
import introCinematicMap2 from "./story-cinematic-1/intro-cinematic-map-2";

export default {
    "key": CM_KEY,
    "location": CM_NAME,
    "horizontal_slots": [],
    "vertical_slots": [],
    "music": "Theme_Overworld_1_HDR.mp3",
    "cars": [],
    "cars_spawn_rate": null,
    "characters": [],
    "characters_spawn_rate": null,
    "spawnable_actions": [],

    "mapDictionary": {
        [removeCMNeighbourhoodKey( CM_INTRO_CINEMATIC_MAP_1 )]: introCinematicMap1,
        [removeCMNeighbourhoodKey(CM_INTRO_CINEMATIC_MAP_2) ]: introCinematicMap2
    }
}