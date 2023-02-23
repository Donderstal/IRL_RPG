import type { CinematicTrigger } from "../enumerables/CinematicTriggerEnum";
import type { InteractionModel } from "../models/InteractionModel";
import { CinematicEvent } from "./CinematicEvent";
import { getQueuedEvent, setQueuedEvent } from "./eventQueue";

export const queueEvent = ( interaction: InteractionModel, trigger: CinematicTrigger, options: any[] ): void => {
    if ( getQueuedEvent() !== null ) return;
    const event = new CinematicEvent( interaction, trigger, options );
    setQueuedEvent( event );
}