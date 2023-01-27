import { getAllBlockedCounters } from "./blockedCounterRegistry";
import type { Counter } from '../../../helpers/Counter';

export const spriteHasBlockedCounter = ( id: string ): boolean => {
    const counters = getAllBlockedCounters();
    return id in counters;
}
export const getAssociatedBlockedSpriteCounter = ( id: string ): Counter => {
    const counters = getAllBlockedCounters();
    return counters[id];
}