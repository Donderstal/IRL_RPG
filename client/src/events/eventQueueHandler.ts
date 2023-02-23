import type { CinematicEvent } from "./CinematicEvent";
import { clearQueuedEvent, getQueuedEvent } from "./eventQueue";

export const checkForQueuedEvent = (): CinematicEvent => {
    const queuedEvent = getQueuedEvent();
    clearQueuedEvent();
    return queuedEvent;
}