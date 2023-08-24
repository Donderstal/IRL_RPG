import { MAP_IDS } from "../../mapIds";
import clubShelter from "./club-shelter/club-shelter";
import clubShelterEntrance from "./club-shelter/club-shelter-entrance";
import clubShelterToilets from "./club-shelter/club-shelter-toilets";

export default {
    // Club shelter
    [MAP_IDS.LEONARD_HEIGHTS.CLUB_SHELTER_ENTRANCE]: clubShelterEntrance,
    [MAP_IDS.LEONARD_HEIGHTS.CLUB_SHELTER_MAIN]: clubShelter,
    [MAP_IDS.LEONARD_HEIGHTS.CLUB_SHELTER_TOILETS]: clubShelterToilets,
    //
}