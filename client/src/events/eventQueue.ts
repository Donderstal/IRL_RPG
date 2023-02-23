import type { CinematicEvent } from "./CinematicEvent";

let queuedEvent: CinematicEvent = null;

export const clearQueuedEvent = (): void => {
    queuedEvent = null;
}

export const getQueuedEvent = (): CinematicEvent => {
    return queuedEvent != null ? { ...queuedEvent } : null;
}

export const setQueuedEvent = (event: CinematicEvent): void => {
    queuedEvent = event;
}