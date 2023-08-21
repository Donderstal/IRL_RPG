import { EventType } from "../../enumerables/EventType";
import { getDefaultCondition } from "../../factories/conditionFactory";
import { createElevatorEventDto } from "../../factories/eventFactory";
import type { EventModel } from "../../models/events/EventModel";
import { MAP_IDS } from "../mapResources/mapIds";
import { ELEVATOR_IDS } from "./elevatorIds";

const ELEVATOR_FLOORS_SARDINE_STUDIO = {
    "Top floor": MAP_IDS.SARDINE_STUDIOS_HALL_F3,
    "Second floor": MAP_IDS.SARDINE_STUDIOS_HALL_F2,
    "First floor": MAP_IDS.SARDINE_STUDIOS_HALL_F1,
    "Ground floor": MAP_IDS.SARDINE_STUDIOS_HALL_GF,
}

const ELEVATOR_FLOORS_GREY_BUILDING = {
    "Top floor": MAP_IDS.GREY_BUILDING_F4_LOBBY,
    "Third floor": MAP_IDS.GREY_BUILDING_F3_LOBBY,
    "Second floor": MAP_IDS.GREY_BUILDING_F2_LOBBY,
    "First floor": MAP_IDS.GREY_BUILDING_F1_LOBBY,
    "Ground floor": MAP_IDS.GREY_BUILDING_GF_LOBBY,
}

export const ELEVATOR_EVENTS: { [key in string]: EventModel } = {
    [ELEVATOR_IDS.SARDINE_STUDIOS]: {
        eventType: EventType.elevator,
        triggerableEvents: [
            { event: createElevatorEventDto( ELEVATOR_FLOORS_SARDINE_STUDIO ), condition: getDefaultCondition() }
        ]
    },
    [ELEVATOR_IDS.GREY_BUILDING]: {
        eventType: EventType.elevator,
        triggerableEvents: [
            { event: createElevatorEventDto( ELEVATOR_FLOORS_GREY_BUILDING ), condition: getDefaultCondition() }
        ]
    }
}