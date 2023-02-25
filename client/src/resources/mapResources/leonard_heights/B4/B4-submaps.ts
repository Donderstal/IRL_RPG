import { LH_CLUB_SHELTER_ENTRANCE_KEY, LH_CLUB_SHELTER_KEY, LH_CLUB_SHELTER_TOILETS_KEY } from "../leonard_heights_res";
import clubShelter from "./club-shelter/club-shelter";
import clubShelterEntrance from "./club-shelter/club-shelter-entrance";
import clubShelterToilets from "./club-shelter/club-shelter-toilets";

export default {
    // Club shelter
    [LH_CLUB_SHELTER_ENTRANCE_KEY]: clubShelterEntrance,
    [LH_CLUB_SHELTER_KEY]: clubShelter,
    [LH_CLUB_SHELTER_TOILETS_KEY]: clubShelterToilets,
    //
}