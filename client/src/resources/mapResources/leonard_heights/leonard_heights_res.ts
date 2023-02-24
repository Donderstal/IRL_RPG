const appendToLHNeighbourhoodKey = ( string ) => {
    return `${LH_KEY}/${string}`;
}
export const removeLHNeighbourhoodKey = ( string ) => {
    return string.split( '/' )[1];
}

export const LH_KEY = "leonard_heights";

export const LH_NAME = "Leonard Heights";
export const LH_MAP_KEY = appendToLHNeighbourhoodKey( LH_KEY );

// CLUB SHELTER (B4)
    export const LH_CLUB_SHELTER_NAME = "Club Shelter";
    export const LH_CLUB_SHELTER_ENTRANCE_KEY = appendToLHNeighbourhoodKey( "club-shelter-entrance" );
    export const LH_CLUB_SHELTER_KEY = appendToLHNeighbourhoodKey( "club-shelter" );
    export const LH_CLUB_SHELTER_TOILETS_KEY = appendToLHNeighbourhoodKey( "club-shelter-toilets" );
//

// YUM MART (C4)
    export const LH_YUM_MART_NAME = "Yum Mart";
    export const LH_YUM_MART_STORE_KEY = appendToLHNeighbourhoodKey( "yum-mart-store" );
    export const LH_YUM_MART_STORAGE_KEY = appendToLHNeighbourhoodKey( "yum-mart-storage" );
    export const LH_YUM_MART_OFFICE_KEY = appendToLHNeighbourhoodKey( "yum-mart-office" );
//

// NEWTOWN APPARTMENTS (C2)
    export const LH_NEWTOWN_APP_NAME = "Newtown Appartments";
    export const LH_NEWTOWN_APP_HALL_KEY = appendToLHNeighbourhoodKey( "Newtown-Hall" );
    export const LH_NEWTOWN_APP_1_KEY = appendToLHNeighbourhoodKey( "Newtown-appartment-1" );
    export const LH_NEWTOWN_APP_2_KEY = appendToLHNeighbourhoodKey( "Newtown-appartment-2" );
    export const LH_NEWTOWN_APP_3_KEY = appendToLHNeighbourhoodKey( "Newtown-appartment-3" );
    export const LH_NEWTOWN_APP_4_KEY = appendToLHNeighbourhoodKey( "Newtown-appartment-4" );
    export const LH_NEWTOWN_APP_5_KEY = appendToLHNeighbourhoodKey( "Newtown-appartment-5" );
//

// HOTEL TWO TOWERS (A3)
    export const LH_HOTEL_TWO_TOWERS_NAME = "Hotel 'The Two Towers'";
    export const LH_HOTEL_TWO_TOWERS_LOBBY_KEY = appendToLHNeighbourhoodKey( "Two-Towers-Lobby" );
//

//CAR SHACK (C3)
    export const LH_CAR_SHACK_NAME = "The Car Shack";
    export const LH_CAR_SHACK_KEY = appendToLHNeighbourhoodKey( "Car-Shack" )
//

//SARDINE STUDIOS (D2)
    export const LH_SARDINE_STUDIOS_NAME = "Sardine Studios";
    // Sardine ground floor
    export const LH_SARDINE_STUDIOS_STAIRS_BOTTOM_KEY = appendToLHNeighbourhoodKey( "Sardine-Studios-stairs-bottom" );
    export const LH_SARDINE_STUDIOS_COMMON_AREA_KEY = appendToLHNeighbourhoodKey( "Sardine-Studios-common-area" );

    // Sardine floor 1
    export const LH_SARDINE_STUDIOS_STAIRS_FLOOR1_KEY = appendToLHNeighbourhoodKey( "Sardine-Studios-stairs-floor1" );
    export const LH_SARDINE_STUDIOS_FLOOR1_HALL_KEY = appendToLHNeighbourhoodKey( "Sardine-Studios-floor1-hall" );
    export const LH_SARDINE_STUDIOS_FLOOR1_APP1_KEY = appendToLHNeighbourhoodKey( "Sardine-Studios-floor1-app1" );
    export const LH_SARDINE_STUDIOS_FLOOR1_APP2_KEY = appendToLHNeighbourhoodKey( "Sardine-Studios-floor1-app2" );
    export const LH_SARDINE_STUDIOS_FLOOR1_APP3_KEY = appendToLHNeighbourhoodKey( "Sardine-Studios-floor1-app3" );

    // Sardine floor 2
    export const LH_SARDINE_STUDIOS_STAIRS_FLOOR2_KEY = appendToLHNeighbourhoodKey( "Sardine-Studios-stairs-floor2" );
    export const LH_SARDINE_STUDIOS_STAIRS_TOP_KEY = appendToLHNeighbourhoodKey( "Sardine-Studios-stairs-top" );
//

//The Grey Building (E3)
    export const LH_GREY_BUILDING_NAME = "The Grey Building";

    // Grey building ground floor
    export const LH_GREY_BUILDING_GF_LOBBY = appendToLHNeighbourhoodKey( "LH_GREY_GF_LOBBY" );
    export const LH_GREY_BUILDING_GF_HALL_LEFT = appendToLHNeighbourhoodKey( "LH_GREY_GF_HALL_LEFT" );
    export const LH_GREY_BUILDING_GF_HALL_RIGHT = appendToLHNeighbourhoodKey( "LH_GREY_GF_HALL_RIGHT" );
        // Grey building GF Appartments
        export const LH_GREY_BUILDING_GF_APT1 = appendToLHNeighbourhoodKey( "LH_GREY_BUILDING_GF_APT1" );
        export const LH_GREY_BUILDING_GF_APT1_TOILET = appendToLHNeighbourhoodKey( "LH_GREY_BUILDING_GF_APT1_TOILET" );
        export const LH_GREY_BUILDING_GF_APT1_BEDROOM = appendToLHNeighbourhoodKey( "LH_GREY_BUILDING_GF_APT1_BEDROOM" );

        export const LH_GREY_BUILDING_GF_APT2 = appendToLHNeighbourhoodKey( "LH_GREY_BUILDING_GF_APT2" );
        export const LH_GREY_BUILDING_GF_APT2_TOILET = appendToLHNeighbourhoodKey( "LH_GREY_BUILDING_GF_APT2_TOILET" );
        export const LH_GREY_BUILDING_GF_APT2_BEDROOM = appendToLHNeighbourhoodKey( "LH_GREY_BUILDING_GF_APT2_BEDROOM" );

        export const LH_GREY_BUILDING_GF_APT3 = appendToLHNeighbourhoodKey( "LH_GREY_BUILDING_GF_APT3" );
        export const LH_GREY_BUILDING_GF_APT3_TOILET = appendToLHNeighbourhoodKey( "LH_GREY_BUILDING_GF_APT3_TOILET" );
        export const LH_GREY_BUILDING_GF_APT3_BEDROOM = appendToLHNeighbourhoodKey( "LH_GREY_BUILDING_GF_APT3_BEDROOM" );

        export const LH_GREY_BUILDING_GF_APT4 = appendToLHNeighbourhoodKey( "LH_GREY_BUILDING_GF_APT4" );
        export const LH_GREY_BUILDING_GF_APT4_TOILET = appendToLHNeighbourhoodKey( "LH_GREY_BUILDING_GF_APT4_TOILET" );
        export const LH_GREY_BUILDING_GF_APT4_BEDROOM = appendToLHNeighbourhoodKey( "LH_GREY_BUILDING_GF_APT4_BEDROOM" );

        export const LH_GREY_BUILDING_GF_APT5 = appendToLHNeighbourhoodKey( "LH_GREY_BUILDING_GF_APT5" );
        export const LH_GREY_BUILDING_GF_APT5_TOILET = appendToLHNeighbourhoodKey( "LH_GREY_BUILDING_GF_APT5_TOILET" );
        export const LH_GREY_BUILDING_GF_APT5_BEDROOM = appendToLHNeighbourhoodKey( "LH_GREY_BUILDING_GF_APT5_BEDROOM" );

        export const LH_GREY_BUILDING_GF_APT6 = appendToLHNeighbourhoodKey( "LH_GREY_BUILDING_GF_APT6" );
        export const LH_GREY_BUILDING_GF_APT6_TOILET = appendToLHNeighbourhoodKey( "LH_GREY_BUILDING_GF_APT6_TOILET" );
        export const LH_GREY_BUILDING_GF_APT6_BEDROOM = appendToLHNeighbourhoodKey( "LH_GREY_BUILDING_GF_APT6_BEDROOM" );

    // Grey building floor 1
    export const LH_GREY_BUILDING_F1_LOBBY = appendToLHNeighbourhoodKey( "LH_GREY_F1_LOBBY" );
    export const LH_GREY_BUILDING_F1_HALL_LEFT = appendToLHNeighbourhoodKey( "LH_GREY_F1_HALL_LEFT" );
    export const LH_GREY_BUILDING_F1_HALL_RIGHT = appendToLHNeighbourhoodKey( "LH_GREY_F1_HALL_RIGHT" );
        // Grey building floor 1 Appartments
        export const LH_GREY_BUILDING_F1_APT1 = appendToLHNeighbourhoodKey( "LH_GREY_BUILDING_F1_APT1" );
        export const LH_GREY_BUILDING_F1_APT1_TOILET = appendToLHNeighbourhoodKey( "LH_GREY_BUILDING_F1_APT1_TOILET" );
        export const LH_GREY_BUILDING_F1_APT1_BEDROOM = appendToLHNeighbourhoodKey( "LH_GREY_BUILDING_F1_APT1_BEDROOM" );

        export const LH_GREY_BUILDING_F1_APT2 = appendToLHNeighbourhoodKey( "LH_GREY_BUILDING_F1_APT2" );
        export const LH_GREY_BUILDING_F1_APT2_TOILET = appendToLHNeighbourhoodKey( "LH_GREY_BUILDING_F1_APT2_TOILET" );
        export const LH_GREY_BUILDING_F1_APT2_BEDROOM = appendToLHNeighbourhoodKey( "LH_GREY_BUILDING_F1_APT2_BEDROOM" );

        export const LH_GREY_BUILDING_F1_APT3 = appendToLHNeighbourhoodKey( "LH_GREY_BUILDING_F1_APT3" );
        export const LH_GREY_BUILDING_F1_APT3_TOILET = appendToLHNeighbourhoodKey( "LH_GREY_BUILDING_F1_APT3_TOILET" );
        export const LH_GREY_BUILDING_F1_APT3_BEDROOM = appendToLHNeighbourhoodKey( "LH_GREY_BUILDING_F1_APT3_BEDROOM" );

        export const LH_GREY_BUILDING_F1_APT4 = appendToLHNeighbourhoodKey( "LH_GREY_BUILDING_F1_APT4" );
        export const LH_GREY_BUILDING_F1_APT4_TOILET = appendToLHNeighbourhoodKey( "LH_GREY_BUILDING_F1_APT4_TOILET" );
        export const LH_GREY_BUILDING_F1_APT4_BEDROOM = appendToLHNeighbourhoodKey( "LH_GREY_BUILDING_F1_APT4_BEDROOM" );

        export const LH_GREY_BUILDING_F1_APT5 = appendToLHNeighbourhoodKey( "LH_GREY_BUILDING_F1_APT5" );
        export const LH_GREY_BUILDING_F1_APT5_TOILET = appendToLHNeighbourhoodKey( "LH_GREY_BUILDING_F1_APT5_TOILET" );
        export const LH_GREY_BUILDING_F1_APT5_BEDROOM = appendToLHNeighbourhoodKey( "LH_GREY_BUILDING_F1_APT5_BEDROOM" );

        export const LH_GREY_BUILDING_F1_APT6 = appendToLHNeighbourhoodKey( "LH_GREY_BUILDING_F1_APT6" );
        export const LH_GREY_BUILDING_F1_APT6_TOILET = appendToLHNeighbourhoodKey( "LH_GREY_BUILDING_F1_APT6_TOILET" );
        export const LH_GREY_BUILDING_F1_APT6_BEDROOM = appendToLHNeighbourhoodKey( "LH_GREY_BUILDING_F1_APT6_BEDROOM" );

    // Grey building floor 2
    export const LH_GREY_BUILDING_F2_LOBBY = appendToLHNeighbourhoodKey( "LH_GREY_F2_LOBBY" );
    export const LH_GREY_BUILDING_F2_HALL_LEFT = appendToLHNeighbourhoodKey( "LH_GREY_F2_HALL_LEFT" );

    // Grey building floor 2 Appartments
        export const LH_GREY_BUILDING_F2_APT1 = appendToLHNeighbourhoodKey( "LH_GREY_BUILDING_F2_APT1" );
        export const LH_GREY_BUILDING_F2_APT1_TOILET = appendToLHNeighbourhoodKey( "LH_GREY_BUILDING_F2_APT1_TOILET" );
        export const LH_GREY_BUILDING_F2_APT1_BEDROOM = appendToLHNeighbourhoodKey( "LH_GREY_BUILDING_F2_APT1_BEDROOM" );

        export const LH_GREY_BUILDING_F2_APT2 = appendToLHNeighbourhoodKey( "LH_GREY_BUILDING_F2_APT2" );
        export const LH_GREY_BUILDING_F2_APT2_TOILET = appendToLHNeighbourhoodKey( "LH_GREY_BUILDING_F2_APT2_TOILET" );
        export const LH_GREY_BUILDING_F2_APT2_BEDROOM = appendToLHNeighbourhoodKey( "LH_GREY_BUILDING_F2_APT2_BEDROOM" );

        export const LH_GREY_BUILDING_F2_APT3 = appendToLHNeighbourhoodKey( "LH_GREY_BUILDING_F2_APT3" );
        export const LH_GREY_BUILDING_F2_APT3_TOILET = appendToLHNeighbourhoodKey( "LH_GREY_BUILDING_F2_APT3_TOILET" );
        export const LH_GREY_BUILDING_F2_APT3_BEDROOM = appendToLHNeighbourhoodKey( "LH_GREY_BUILDING_F2_APT3_BEDROOM" );

    // Grey building floor 3
    export const LH_GREY_BUILDING_F3_LOBBY = appendToLHNeighbourhoodKey( "LH_GREY_F3_LOBBY" );
    export const LH_GREY_BUILDING_F3_HALL_LEFT = appendToLHNeighbourhoodKey( "LH_GREY_F3_HALL_LEFT" );
    export const LH_GREY_BUILDING_F3_HALL_RIGHT = appendToLHNeighbourhoodKey( "LH_GREY_F3_HALL_RIGHT" );
        // Grey building floor 3 Appartments
        export const LH_GREY_BUILDING_F3_APT1 = appendToLHNeighbourhoodKey( "LH_GREY_BUILDING_F3_APT1" );
        export const LH_GREY_BUILDING_F3_APT1_TOILET = appendToLHNeighbourhoodKey( "LH_GREY_BUILDING_F3_APT1_TOILET" );
        export const LH_GREY_BUILDING_F3_APT1_BEDROOM = appendToLHNeighbourhoodKey( "LH_GREY_BUILDING_F3_APT1_BEDROOM" );

        export const LH_GREY_BUILDING_F3_APT2 = appendToLHNeighbourhoodKey( "LH_GREY_BUILDING_F3_APT2" );
        export const LH_GREY_BUILDING_F3_APT2_TOILET = appendToLHNeighbourhoodKey( "LH_GREY_BUILDING_F3_APT2_TOILET" );
        export const LH_GREY_BUILDING_F3_APT2_BEDROOM = appendToLHNeighbourhoodKey( "LH_GREY_BUILDING_F3_APT2_BEDROOM" );

        export const LH_GREY_BUILDING_F3_APT3 = appendToLHNeighbourhoodKey( "LH_GREY_BUILDING_F3_APT3" );
        export const LH_GREY_BUILDING_F3_APT3_TOILET = appendToLHNeighbourhoodKey( "LH_GREY_BUILDING_F3_APT3_TOILET" );
        export const LH_GREY_BUILDING_F3_APT3_BEDROOM = appendToLHNeighbourhoodKey( "LH_GREY_BUILDING_F3_APT3_BEDROOM" );

        export const LH_GREY_BUILDING_F3_APT4 = appendToLHNeighbourhoodKey( "LH_GREY_BUILDING_F3_APT4" );
        export const LH_GREY_BUILDING_F3_APT4_TOILET = appendToLHNeighbourhoodKey( "LH_GREY_BUILDING_F3_APT4_TOILET" );
        export const LH_GREY_BUILDING_F3_APT4_BEDROOM = appendToLHNeighbourhoodKey( "LH_GREY_BUILDING_F3_APT4_BEDROOM" );

        export const LH_GREY_BUILDING_F3_APT5 = appendToLHNeighbourhoodKey( "LH_GREY_BUILDING_F3_APT5" );
        export const LH_GREY_BUILDING_F3_APT5_TOILET = appendToLHNeighbourhoodKey( "LH_GREY_BUILDING_F3_APT5_TOILET" );
        export const LH_GREY_BUILDING_F3_APT5_BEDROOM = appendToLHNeighbourhoodKey( "LH_GREY_BUILDING_F3_APT5_BEDROOM" );

        export const LH_GREY_BUILDING_F3_APT6 = appendToLHNeighbourhoodKey( "LH_GREY_BUILDING_F3_APT6" );
        export const LH_GREY_BUILDING_F3_APT6_TOILET = appendToLHNeighbourhoodKey( "LH_GREY_BUILDING_F3_APT6_TOILET" );
        export const LH_GREY_BUILDING_F3_APT6_BEDROOM = appendToLHNeighbourhoodKey( "LH_GREY_BUILDING_F3_APT6_BEDROOM" );

    // Grey building floor 4
    export const LH_GREY_BUILDING_F4_LOBBY = appendToLHNeighbourhoodKey( "LH_GREY_F4_LOBBY" );
//

// Master Rooms
    export const LH_MASTER_ROOMS_LOCATION_NAME = "Master rooms";
    export const LH_CHARACTERS_MASTER_ROOM_KEY = appendToLHNeighbourhoodKey( "characters-master-room" );
    export const LH_CARS_MASTER_ROOM_KEY = appendToLHNeighbourhoodKey( "cars-master-room" );
//
