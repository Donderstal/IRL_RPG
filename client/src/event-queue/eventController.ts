import { EventType } from "../enumerables/EventType";
import type { CutsceneEventDto } from "../models/events/CutsceneEventDto";
import type { DoorEventDto } from "../models/events/DoorEventDto";
import type { ElevatorEventDto } from "../models/events/ElevatorEventDto";
import type { EventModel } from "../models/events/EventModel";
import type { SavePointEventDto } from "../models/events/SavePointEventDto";
import { setInEventState } from "../state/stateSetter";

let activeEvent: EventModel;

export const startEvent = ( event: EventModel ): void => {
    setInEventState( true );
    activeEvent = event;
    let eventScript = event.triggerableEvents[event.selectedEventIndex];

    switch ( event.eventType ) {
        case EventType.cutscene:
            triggerCutsceneEvent( eventScript.event as CutsceneEventDto );
            break;
        case EventType.door:
            triggerDoorEvent( eventScript.event as DoorEventDto );
            break;
        case EventType.elevator:
            triggerElevatorEvent( eventScript.event as ElevatorEventDto );
            break;
        case EventType.save_point:
            triggerSavepointEvent( eventScript.event as SavePointEventDto );
            break;
        default:
            console.error( `Tried to set event but eventType ${event.eventType} was not recognized` );
            break;
    }
}

export const endEvent = (): void => {
    setInEventState( false );
    activeEvent = null;
}

const triggerCutsceneEvent = ( cutscene: CutsceneEventDto ): void => {

}
const triggerDoorEvent = ( door: DoorEventDto ): void => {

}
const triggerElevatorEvent = ( elevator: ElevatorEventDto ): void => {

}
const triggerSavepointEvent = ( savepoint: SavePointEventDto ): void => {

}