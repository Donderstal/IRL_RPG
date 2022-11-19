import { getAllIdleCounters } from "./idleAnimRegistry"
import type { Counter } from '../../../helpers/Counter';

export const spriteHasIdleCounter = ( id: string ): boolean => {
    const counters = getAllIdleCounters;
    return id in counters;
}
export const getAssociatedIdleSpriteCounter = ( id: string ): Counter => {
    const counters = getAllIdleCounters();
    return counters[id];
}