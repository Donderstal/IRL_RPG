import { INTERACTION_RANDOM_ENCOUNTER_1, INTERACTION_RANDOM_ENCOUNTER_2, INTERACTION_RANDOM_ENCOUNTER_3, INTERACTION_RANDOM_ENCOUNTER_4, INTERACTION_RANDOM_ENCOUNTER_5, INTERACTION_RANDOM_ENCOUNTER_6 } from '../../interactionResources';
import { BALD_BEER_BELLY_GUY, BLACK_PONY_TAIL_LADY, BLONDE_BEER_BELLY_GUY, BLONDE_NERD_LADY, BURLY_GUY, DARK_HAIR_NERD_LADY, DORKY_GUY, FAT_BUFF_GUY, FAT_FEDORA_GUY, GRANNY, GREEN_HAIR_LADY, PINK_HAIR_NERD_LADY, STRONG_GUY, TOUGH_GUY, TOUGH_GUY_WITH_DARK_HAIR, WHITE_PONY_TAIL_LADY } from '../../spriteTypeResources';
import { DirectionEnum } from '../../../enumerables/DirectionEnum';
import { RoadAlignmentEnum } from '../../../enumerables/RoadAlignmentEnum';
import {
    LH_CAR_SHACK_KEY,
    LH_CLUB_SHELTER_ENTRANCE_KEY, LH_CLUB_SHELTER_KEY, LH_CLUB_SHELTER_TOILETS_KEY,
    LH_HOTEL_TWO_TOWERS_LOBBY_KEY,
    LH_KEY, LH_NAME,
    LH_NEWTOWN_APP_1_KEY, LH_NEWTOWN_APP_2_KEY, LH_NEWTOWN_APP_3_KEY, LH_NEWTOWN_APP_4_KEY, LH_NEWTOWN_APP_5_KEY, LH_NEWTOWN_APP_HALL_KEY,
    LH_SARDINE_STUDIOS_STAIRS_BOTTOM_KEY,
    LH_SARDINE_STUDIOS_COMMON_AREA_KEY,
    LH_YUM_MART_OFFICE_KEY, LH_YUM_MART_STORE_KEY,
    removeLHNeighbourhoodKey,
    LH_SARDINE_STUDIOS_STAIRS_FLOOR1_KEY,
    LH_SARDINE_STUDIOS_STAIRS_FLOOR2_KEY,
    LH_SARDINE_STUDIOS_STAIRS_TOP_KEY,
    LH_SARDINE_STUDIOS_FLOOR1_HALL_KEY,
    LH_SARDINE_STUDIOS_FLOOR1_APP1_KEY,
    LH_SARDINE_STUDIOS_FLOOR1_APP2_KEY,
    LH_SARDINE_STUDIOS_FLOOR1_APP3_KEY,
    LH_CHARACTERS_MASTER_ROOM_KEY,
    LH_CARS_MASTER_ROOM_KEY
} from './leonard_heights_res';

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

import NewtownHall from './C2/Newtown-Appartments/Newtown-Hall';
import NewtownAppartment1 from './C2/Newtown-Appartments/Newtown-left-bottom';
import NewtownAppartment2 from './C2/Newtown-Appartments/Newtown-left-top';
import NewtownAppartment3 from './C2/Newtown-Appartments/Newtown-top';
import NewtownAppartment4 from './C2/Newtown-Appartments/Newtown-right-top';
import NewtownAppartment5 from './C2/Newtown-Appartments/Newtown-right-bottom';

import YumMartGroundFloor from './C4/yum-mart/yum-mart-ground';
import YumMartFloor1 from './C4/yum-mart/yum-mart-floor-1';

import ClubShelter from './B4/club-shelter/club-shelter';
import ClubShelterEntrance from './B4/club-shelter/club-shelter-entrance';
import ClubShelterToilets from './B4/club-shelter/club-shelter-toilets';

import TwoTowersLobby from './A3/Hotel-Two-Towers/Two-Towers-Lobby';

import CarShack from './C3/Car-Shack/car-shack';

import SardineStudiosStairsBottom from './D2/Sardine-Studios/Sardine-Studios-stairs-bottom';
import SardineStudiosCommunalSpace from './D2/Sardine-Studios/Sardine-Studios-communal-space';
import SardineStudiosStairsFloor1 from './D2/Sardine-Studios/Sardine-studios-stairs-floor-1';
import SardineStudiosFloor1Hall from './D2/Sardine-Studios/Sardine-Studios-floor1-hall';
import SardineStudiosFloor1App1 from './D2/Sardine-Studios/Sardine-Studios-floor1-app1';
import SardineStudiosFloor1App2 from './D2/Sardine-Studios/Sardine-Studios-floor1-app2';
import SardineStudiosFloor1App3 from './D2/Sardine-Studios/Sardine-Studios-floor1-app3';
import SardineStudioStairsFloor2 from './D2/Sardine-Studios/Sardine-Studio-stairs-floor-2';
import SardineStudioStairsTop from './D2/Sardine-Studios/Sardine-Studio-stairs-top';
import characterMasterRoom from './hiddenRooms/characterMasterRoom';
import carMasterRoom from './hiddenRooms/carMasterRoom';

export default {
    "key": LH_KEY,
    "location": LH_NAME,
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
        INTERACTION_RANDOM_ENCOUNTER_1, INTERACTION_RANDOM_ENCOUNTER_2, INTERACTION_RANDOM_ENCOUNTER_3,
        INTERACTION_RANDOM_ENCOUNTER_4, INTERACTION_RANDOM_ENCOUNTER_5, INTERACTION_RANDOM_ENCOUNTER_6
    ],
    
    "mapDictionary": {
        // MAIN MAPS
        "A1": A1,
        "A2": A2,
        "A3": A3,
        "A4": A4,
        "B1": B1,
        "B2": B2,
        "B3": B3,
        "B4": B4,
        "C1": C1,
        "C2": C2,
        "C3": C3,
        "C4": C4,
        "D1": D1,
        "D2": D2,
        "D3": D3,
        "D4": D4,
        "E3": E3,
        "E4": E4,

        // A3 submap
            // Hotel Two Towers
                [removeLHNeighbourhoodKey( LH_HOTEL_TWO_TOWERS_LOBBY_KEY )]: TwoTowersLobby,
            //
        //

        // B4 submap
            // Club shelter
                [removeLHNeighbourhoodKey(LH_CLUB_SHELTER_ENTRANCE_KEY)]: ClubShelterEntrance,
                [removeLHNeighbourhoodKey( LH_CLUB_SHELTER_KEY )]: ClubShelter,
                [removeLHNeighbourhoodKey(LH_CLUB_SHELTER_TOILETS_KEY)]: ClubShelterToilets,
            //
        //

        // C2 submaps
            // Newtown appartments.
                [removeLHNeighbourhoodKey( LH_NEWTOWN_APP_HALL_KEY )]: NewtownHall,
                [removeLHNeighbourhoodKey( LH_NEWTOWN_APP_1_KEY )]: NewtownAppartment1,
                [removeLHNeighbourhoodKey( LH_NEWTOWN_APP_2_KEY )]: NewtownAppartment2,
                [removeLHNeighbourhoodKey( LH_NEWTOWN_APP_3_KEY )]: NewtownAppartment3,
                [removeLHNeighbourhoodKey( LH_NEWTOWN_APP_4_KEY )]: NewtownAppartment4,
                [removeLHNeighbourhoodKey( LH_NEWTOWN_APP_5_KEY )]: NewtownAppartment5,
            //
        //

        //C3 submaps
            // Car shack
                [removeLHNeighbourhoodKey( LH_CAR_SHACK_KEY )]: CarShack,
            //
        //

        // C4 submaps
            // Yum Mart
                [removeLHNeighbourhoodKey( LH_YUM_MART_STORE_KEY )]: YumMartGroundFloor,
                [removeLHNeighbourhoodKey( LH_YUM_MART_OFFICE_KEY )]: YumMartFloor1,
            //
        //

        // D2 Submaps
            // Sardine Studios
                [removeLHNeighbourhoodKey( LH_SARDINE_STUDIOS_STAIRS_BOTTOM_KEY )]: SardineStudiosStairsBottom,
                [removeLHNeighbourhoodKey( LH_SARDINE_STUDIOS_COMMON_AREA_KEY )]: SardineStudiosCommunalSpace,

                /// Sardine f1
                    [removeLHNeighbourhoodKey( LH_SARDINE_STUDIOS_STAIRS_FLOOR1_KEY )]: SardineStudiosStairsFloor1,
                    [removeLHNeighbourhoodKey( LH_SARDINE_STUDIOS_FLOOR1_HALL_KEY )]: SardineStudiosFloor1Hall,
                    [removeLHNeighbourhoodKey( LH_SARDINE_STUDIOS_FLOOR1_APP1_KEY )]: SardineStudiosFloor1App1,
                    [removeLHNeighbourhoodKey( LH_SARDINE_STUDIOS_FLOOR1_APP2_KEY )]: SardineStudiosFloor1App2,
                    [removeLHNeighbourhoodKey( LH_SARDINE_STUDIOS_FLOOR1_APP3_KEY )]: SardineStudiosFloor1App3,
                //

                [removeLHNeighbourhoodKey( LH_SARDINE_STUDIOS_STAIRS_FLOOR2_KEY )]: SardineStudioStairsFloor2,
                [removeLHNeighbourhoodKey( LH_SARDINE_STUDIOS_STAIRS_TOP_KEY )]: SardineStudioStairsTop,
            //
        //

        // Master rooms
        [removeLHNeighbourhoodKey( LH_CHARACTERS_MASTER_ROOM_KEY )]: characterMasterRoom,
        [removeLHNeighbourhoodKey( LH_CARS_MASTER_ROOM_KEY )]: carMasterRoom
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