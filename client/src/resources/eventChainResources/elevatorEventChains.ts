import { createElevatorEventChain } from "../../factories/eventFactory";
import type { ElevatorEventChain } from "../../models/eventChains/ElevatorEventChain";
import { MAP_IDS } from "../mapResources/mapIds";
import { ELEVATOR_IDS } from "./elevatorIds";

const ELEVATOR_FLOORS_SARDINE_STUDIO = {
    "Top floor": MAP_IDS.LEONARD_HEIGHTS.SARDINE_STUDIOS_HALL_F3,
    "Second floor": MAP_IDS.LEONARD_HEIGHTS.SARDINE_STUDIOS_HALL_F2,
    "First floor": MAP_IDS.LEONARD_HEIGHTS.SARDINE_STUDIOS_HALL_F1,
    "Ground floor": MAP_IDS.LEONARD_HEIGHTS.SARDINE_STUDIOS_HALL_GF,
}

const ELEVATOR_FLOORS_GREY_BUILDING = {
    "Top floor": MAP_IDS.LEONARD_HEIGHTS.GREY_BUILDING_F4_LOBBY,
    "Third floor": MAP_IDS.LEONARD_HEIGHTS.GREY_BUILDING_F3_LOBBY,
    "Second floor": MAP_IDS.LEONARD_HEIGHTS.GREY_BUILDING_F2_LOBBY,
    "First floor": MAP_IDS.LEONARD_HEIGHTS.GREY_BUILDING_F1_LOBBY,
    "Ground floor": MAP_IDS.LEONARD_HEIGHTS.GREY_BUILDING_GF_LOBBY,
}

export const ELEVATOR_EVENT_CHAINS: { [key in string]: ElevatorEventChain } = {
    [ELEVATOR_IDS.SARDINE_STUDIOS]: createElevatorEventChain( ELEVATOR_FLOORS_SARDINE_STUDIO ),
    [ELEVATOR_IDS.GREY_BUILDING]: createElevatorEventChain( ELEVATOR_FLOORS_GREY_BUILDING )
}