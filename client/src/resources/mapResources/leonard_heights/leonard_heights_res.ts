const appendToNeighbourhoodKey = ( string ) => {
    return `${LH_KEY}/${string}`;
}
export const removeNeighbourhoodKey = ( string ) => {
    return string.split( '/' )[1];
}

export const LH_KEY = "leonard_heights";

export const LH_NAME = "Leonard Heights";
export const LH_MAP_KEY = appendToNeighbourhoodKey( LH_KEY );

// CLUB SHELTER (B4)
    export const LH_CLUB_SHELTER_NAME = "Club Shelter";
    export const LH_CLUB_SHELTER_ENTRANCE_KEY = appendToNeighbourhoodKey( "club-shelter-entrance" );
    export const LH_CLUB_SHELTER_KEY = appendToNeighbourhoodKey( "club-shelter" );
    export const LH_CLUB_SHELTER_TOILETS_KEY = appendToNeighbourhoodKey( "club-shelter-toilets" );
//

// YUM MART (C4)
    export const LH_YUM_MART_NAME = "Yum Mart";
    export const LH_YUM_MART_STORE_KEY = appendToNeighbourhoodKey( "yum-mart-store" );
    export const LH_YUM_MART_STORAGE_KEY = appendToNeighbourhoodKey( "yum-mart-storage" );
    export const LH_YUM_MART_OFFICE_KEY = appendToNeighbourhoodKey( "yum-mart-office" );
//

// NEWTOWN APPARTMENTS (C2)
    export const LH_NEWTOWN_APP_NAME = "Newtown Appartments";
    export const LH_NEWTOWN_APP_HALL_KEY = appendToNeighbourhoodKey( "Newtown-Hall" );
    export const LH_NEWTOWN_APP_1_KEY = appendToNeighbourhoodKey( "Newtown-appartment-1" );
    export const LH_NEWTOWN_APP_2_KEY = appendToNeighbourhoodKey( "Newtown-appartment-2" );
    export const LH_NEWTOWN_APP_3_KEY = appendToNeighbourhoodKey( "Newtown-appartment-3" );
    export const LH_NEWTOWN_APP_4_KEY = appendToNeighbourhoodKey( "Newtown-appartment-4" );
    export const LH_NEWTOWN_APP_5_KEY = appendToNeighbourhoodKey( "Newtown-appartment-5" );
//

// HOTEL TWO TOWERS (A3)
    export const LH_HOTEL_TWO_TOWERS_NAME = "Hotel 'The Two Towers'";
    export const LH_HOTEL_TWO_TOWERS_LOBBY_KEY = appendToNeighbourhoodKey( "Two-Towers-Lobby" );
//

//CAR SHACK (C3)
    export const LH_CAR_SHACK_NAME = "The Car Shack";
    export const LH_CAR_SHACK_KEY = appendToNeighbourhoodKey( "Car-Shack" )
//

//SARDINE STUDIOS (D2)
    export const LH_SARDINE_STUDIOS_NAME = "Sardine Studios";
    // Sardine ground floor
    export const LH_SARDINE_STUDIOS_STAIRS_BOTTOM_KEY = appendToNeighbourhoodKey( "Sardine-Studios-stairs-bottom" );
    export const LH_SARDINE_STUDIOS_COMMON_AREA_KEY = appendToNeighbourhoodKey( "Sardine-Studios-common-area" );

    // Sardine floor 1
    export const LH_SARDINE_STUDIOS_STAIRS_FLOOR1_KEY = appendToNeighbourhoodKey( "Sardine-Studios-stairs-floor1" );
    export const LH_SARDINE_STUDIOS_FLOOR1_HALL_KEY = appendToNeighbourhoodKey( "Sardine-Studios-floor1-hall" );
    export const LH_SARDINE_STUDIOS_FLOOR1_APP1_KEY = appendToNeighbourhoodKey( "Sardine-Studios-floor1-app1" );
    export const LH_SARDINE_STUDIOS_FLOOR1_APP2_KEY = appendToNeighbourhoodKey( "Sardine-Studios-floor1-app2" );
    export const LH_SARDINE_STUDIOS_FLOOR1_APP3_KEY = appendToNeighbourhoodKey( "Sardine-Studios-floor1-app3" );

    // Sardine floor 2
    export const LH_SARDINE_STUDIOS_STAIRS_FLOOR2_KEY = appendToNeighbourhoodKey( "Sardine-Studios-stairs-floor2" );
    export const LH_SARDINE_STUDIOS_STAIRS_TOP_KEY = appendToNeighbourhoodKey( "Sardine-Studios-stairs-top" );
//

// Master Rooms
    export const LH_MASTER_ROOMS_LOCATION_NAME = "Master rooms";
    export const LH_CHARACTERS_MASTER_ROOM_KEY = appendToNeighbourhoodKey( "characters-master-room" );
    export const LH_CARS_MASTER_ROOM_KEY = appendToNeighbourhoodKey( "cars-master-room" );
//
