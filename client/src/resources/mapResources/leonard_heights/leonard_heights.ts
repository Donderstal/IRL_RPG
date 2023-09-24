import { BALD_BEER_BELLY_GUY, BLACK_PONY_TAIL_LADY, BLONDE_BEER_BELLY_GUY, BLONDE_NERD_LADY, BURLY_GUY, DARK_HAIR_NERD_LADY, DORKY_GUY, FAT_BUFF_GUY, FAT_FEDORA_GUY, GRANNY, GREEN_HAIR_LADY, PINK_HAIR_NERD_LADY, STRONG_GUY, TOUGH_GUY, TOUGH_GUY_WITH_DARK_HAIR, WHITE_PONY_TAIL_LADY } from '../../spriteTypeResources';
import { DirectionEnum } from '../../../enumerables/DirectionEnum';
import { RoadAlignmentEnum } from '../../../enumerables/RoadAlignmentEnum';

import A1 from './A1/A1';
import A2 from './A2/A2';
import A3 from './A3/A3';
import A4 from './A4/A4';
import B1 from './B1/B1';
import B2 from './B2/B2';
import B3 from './B3/B3';
import B4 from './B4/B4';
import C1 from './C1/C1';
import C2 from './C2/C2';
import C3 from './C3/C3';
import C4 from './C4/C4';
import D1 from './D1/D1';
import D2 from './D2/D2';
import D3 from './D3/D3';
import D4 from './D4/D4';
import E3 from './E3/E3';
import E4 from './E4/E4';

import A3Submaps from './A3/A3-submaps';
import B4Submaps from './B4/B4-submaps';
import C2Submaps from './C2/C2-submaps';
import C3Submaps from './C3/C3-submaps';
import C4Submaps from './C4/C4-submaps';
import D2Submaps from './D2/D2-submaps';
import E3Submaps from './E3/E3-submaps';
import { LOCATION_NAMES } from '../locationNames';
import { CUTSCENE_IDS } from '../../eventChainResources/cutsceneIds';
import { NEIGHBOURHOOD_IDS } from '../neighbourhoodIds';

export default {
    "key": NEIGHBOURHOOD_IDS.LEONARD_HEIGHTS,
    "location": LOCATION_NAMES.LEONARD_HEIGHTS,
    "horizontal_slots": ["A", "B", "C", "D", "E"], 
    "vertical_slots": ["1", "2", "3", "4"],
    "music": "Theme_Overworld_1_HDR.mp3",
    "cars": [ "car_b", "car_c", "bus" ], 
    "cars_spawn_rate" : 5000,
    "characters" : [
        TOUGH_GUY, STRONG_GUY, BURLY_GUY, GREEN_HAIR_LADY,
        DORKY_GUY, GRANNY, TOUGH_GUY_WITH_DARK_HAIR, FAT_BUFF_GUY,
        BALD_BEER_BELLY_GUY, BLONDE_BEER_BELLY_GUY, FAT_FEDORA_GUY, WHITE_PONY_TAIL_LADY,
        BLACK_PONY_TAIL_LADY, PINK_HAIR_NERD_LADY, BLONDE_NERD_LADY, DARK_HAIR_NERD_LADY
    ],
    "characters_spawn_rate": 10000,
    "spawnable_actions": [
        CUTSCENE_IDS.RANDOM_ENCOUNTER_1, CUTSCENE_IDS.RANDOM_ENCOUNTER_2, CUTSCENE_IDS.RANDOM_ENCOUNTER_3,
        CUTSCENE_IDS.RANDOM_ENCOUNTER_4, CUTSCENE_IDS.RANDOM_ENCOUNTER_5, CUTSCENE_IDS.RANDOM_ENCOUNTER_6
    ],
    
    "mapDictionary": {
        // MAIN MAPS
        "A1": A1,
        ...A3Submaps,
        "A2": A2,
        "A3": A3,
        "A4": A4,
        "B1": B1,
        "B2": B2,
        "B3": B3,
        "B4": B4,
        ...B4Submaps,
        "C1": C1,
        "C2": C2,
        ...C2Submaps,
        "C3": C3,
        ...C3Submaps,
        "C4": C4,
        ...C4Submaps,
        "D1": D1,
        "D2": D2,
        ...D2Submaps,
        "D3": D3,
        "D4": D4,
        "E3": E3,
        ...E3Submaps,
        "E4": E4,
    /////
    },
    "spawnPoints": [
        {
            "column": 4,
            "row": 60,
            "direction": DirectionEnum.down
        },
        //
        {
            "column": 21,
            "row": 39,
            "direction": DirectionEnum.down
        },
        {
            "column": 24,
            "row": 56,
            "direction": DirectionEnum.down
        },
        {
            "column": 29,
            "row": 4,
            "direction": DirectionEnum.down
        },
        //
        {
            "column": 37,
            "row": 56,
            "direction": DirectionEnum.down
        },
        {
            "column": 41,
            "row": 56,
            "direction": DirectionEnum.down
        },
        {
            "column": 42,
            "row": 56,
            "direction": DirectionEnum.down
        },
        //
        {
            "column": 48,
            "row": 24,
            "direction": DirectionEnum.down
        },
        {
            "column": 54,
            "row": 24,
            "direction": DirectionEnum.down
        },
        //
        {
            "column": 59,
            "row": 40,
            "direction": DirectionEnum.down
        },
        {
            "column": 88,
            "row": 55,
            "direction": DirectionEnum.down
        },
        {
            "column": 107,
            "row": 38,
            "direction": DirectionEnum.down
        }
    ],
    //////
    "roads": [
        // Baker street / A2 - D2
        {
            "name": `Baker street ${DirectionEnum.left}`,
            "direction": DirectionEnum.left,
            "alignment": RoadAlignmentEnum.horizontal,
            "hasStart": true,
            "primaryRow": 29,
            "secondaryRow": 28,
            "primaryColumn": 86,
            "secondaryColumn": 5
        },
        {
            "name": `Baker street ${DirectionEnum.right}`,
            "direction": DirectionEnum.right,
            "alignment": RoadAlignmentEnum.horizontal,
            "hasStart": true,
            "primaryRow": 31,
            "secondaryRow": 30,
            "primaryColumn": 7,
            "secondaryColumn": 84
        },

        // Morgan street / D2 - D4
        {
            "name": `Morgan street A ${DirectionEnum.up}`,
            "direction": DirectionEnum.up,
            "alignment": RoadAlignmentEnum.vertical,
            "hasStart": true,
            "primaryColumn": 85,
            "secondaryColumn": 86,
            "primaryRow": 48,
            "secondaryRow": 28
        },
        {
            "name": `Morgan street A ${DirectionEnum.down}`,
            "direction": DirectionEnum.down,
            "alignment": RoadAlignmentEnum.vertical,
            "hasStart": true,
            "primaryColumn": 83,
            "secondaryColumn": 84,
            "primaryRow": 30,
            "secondaryRow": 46
        },

        {
            "name": `Morgan street B ${DirectionEnum.left}`,
            "direction": DirectionEnum.left,
            "alignment": RoadAlignmentEnum.horizontal,
            "hasStart": false,
            "primaryRow": 46,
            "secondaryRow": 45,
            "primaryColumn": 84,
            "secondaryColumn": 79
        },
        {
            "name": `Morgan street B ${DirectionEnum.right}`,
            "direction": DirectionEnum.right,
            "alignment": RoadAlignmentEnum.horizontal,
            "hasStart": false,
            "primaryRow": 48,
            "secondaryRow": 47,
            "primaryColumn": 81,
            "secondaryColumn": 86
        },

        {
            "name": `Morgan street C ${DirectionEnum.up}`,
            "direction": DirectionEnum.up,
            "alignment": RoadAlignmentEnum.vertical,
            "hasStart": false,
            "primaryColumn": 81,
            "secondaryColumn": 82,
            "primaryRow": 64,
            "secondaryRow": 47
        },
        {
            "name": `Morgan street C ${DirectionEnum.down}`,
            "direction": DirectionEnum.down,
            "alignment": RoadAlignmentEnum.vertical,
            "hasStart": true,
            "primaryColumn": 79,
            "secondaryColumn": 80,
            "primaryRow": 45,
            "secondaryRow": 64
        },

        // Hotel street / D3 - E3
        {
            "name": `Hotel street ${DirectionEnum.left}`,
            "direction": DirectionEnum.left,
            "alignment": RoadAlignmentEnum.horizontal,
            "hasStart": true,
            "primaryRow": 41,
            "secondaryRow": 40,
            "primaryColumn": 105,
            "secondaryColumn": 83
        },
        {
            "name": `Hotel street ${DirectionEnum.right}`,
            "direction": DirectionEnum.right,
            "alignment": RoadAlignmentEnum.horizontal,
            "hasStart": false,
            "primaryRow": 43,
            "secondaryRow": 42,
            "primaryColumn": 83,
            "secondaryColumn": 105
        },

        // South Leonard Drive / D3 - E3
        {
            "name": `South Leonard Drive ${DirectionEnum.left}`,
            "direction": DirectionEnum.left,
            "alignment": RoadAlignmentEnum.horizontal,
            "hasStart": true,
            "primaryRow": 62,
            "secondaryRow": 61,
            "primaryColumn": 101,
            "secondaryColumn": 17
        },
        {
            "name": `South Leonard Drive ${DirectionEnum.right}`,
            "direction": DirectionEnum.right,
            "alignment": RoadAlignmentEnum.horizontal,
            "hasStart": false,
            "primaryRow": 64,
            "secondaryRow": 63,
            "primaryColumn": 15,
            "secondaryColumn": 101
        },
        {
            "name": `South Leonard Drive ${DirectionEnum.up}`,
            "direction": DirectionEnum.up,
            "alignment": RoadAlignmentEnum.vertical,
            "hasStart": true,
            "primaryColumn": 17,
            "secondaryColumn": 18,
            "primaryRow": 61,
            "secondaryRow": 44
        },
        {
            "name": `South Leonard Drive ${DirectionEnum.down}`,
            "direction": DirectionEnum.down,
            "alignment": RoadAlignmentEnum.vertical,
            "hasStart": false,
            "primaryColumn": 15,
            "secondaryColumn": 16,
            "primaryRow": 44,
            "secondaryRow": 63
        },

        // West Leonard Drive / B1 - B3
        {
            "name": `West Leonard Drive ${DirectionEnum.up}`,
            "direction": DirectionEnum.up,
            "alignment": RoadAlignmentEnum.vertical,
            "hasStart": false,
            "primaryColumn": 37,
            "secondaryColumn": 38,
            "primaryRow": 47,
            "secondaryRow": 6
        },
        {
            "name": `West Leonard Drive ${DirectionEnum.down}`,
            "direction": DirectionEnum.down,
            "alignment": RoadAlignmentEnum.vertical,
            "hasStart": true,
            "primaryColumn": 35,
            "secondaryColumn": 36,
            "primaryRow": 6,
            "secondaryRow": 45
        },

        // Boxing street / A2 - A3
        {
            "name": `Boxing street ${DirectionEnum.up}`,
            "direction": DirectionEnum.up,
            "alignment": RoadAlignmentEnum.vertical,
            "hasStart": true,
            "primaryColumn": 7,
            "secondaryColumn": 8,
            "primaryRow": 45,
            "secondaryRow": 30
        },
        {
            "name": `Boxing street ${DirectionEnum.down}`,
            "direction": DirectionEnum.down,
            "alignment": RoadAlignmentEnum.vertical,
            "hasStart": true,
            "primaryColumn": 5,
            "secondaryColumn": 6,
            "primaryRow": 28,
            "secondaryRow": 47
        },

        // Towers street / A3 - B3
        {
            "name": `Towers street ${DirectionEnum.left}`,
            "direction": DirectionEnum.left,
            "alignment": RoadAlignmentEnum.horizontal,
            "hasStart": true,
            "primaryRow": 45,
            "secondaryRow": 44,
            "primaryColumn": 36,
            "secondaryColumn": 7
        },
        {
            "name": `Towers street ${DirectionEnum.right}`,
            "direction": DirectionEnum.right,
            "alignment": RoadAlignmentEnum.horizontal,
            "hasStart": true,
            "primaryRow": 47,
            "secondaryRow": 46,
            "primaryColumn": 5,
            "secondaryColumn": 38
        },
    ],
}