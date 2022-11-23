import { getAllRandomCounters } from "./randomAnimRegistry";
import type { Counter } from '../../../helpers/Counter';

export const getAssociatedRandomCounter = ( spriteId: string ): Counter => {
    const counterDictionary = getAllRandomCounters();
    return counterDictionary[spriteId];
};