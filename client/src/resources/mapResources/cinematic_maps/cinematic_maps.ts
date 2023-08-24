import { LOCATION_NAMES } from "../locationNames";
import { MAP_IDS } from "../mapIds";
import { NEIGHBOURHOOD_IDS } from "../neighbourhoodIds";
import introCinematicMap1 from "./story-cinematic-1/intro-cinematic-map-1";
import introCinematicMap2 from "./story-cinematic-1/intro-cinematic-map-2";

export default {
    "key": NEIGHBOURHOOD_IDS.CINEMATIC_MAPS,
    "location": LOCATION_NAMES.CINEMATIC_MAPS,
    "horizontal_slots": [],
    "vertical_slots": [],
    "music": "Theme_Overworld_1_HDR.mp3",
    "cars": [],
    "cars_spawn_rate": null,
    "characters": [],
    "characters_spawn_rate": null,
    "spawnable_actions": [],

    "mapDictionary": {
        [MAP_IDS.CINEMATIC_MAPS.CINEMATIC_INTRO_MAP_1]: introCinematicMap1,
        [MAP_IDS.CINEMATIC_MAPS.CINEMATIC_INTRO_MAP_2]: introCinematicMap2
    }
}