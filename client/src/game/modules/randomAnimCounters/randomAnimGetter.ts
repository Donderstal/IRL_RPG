import { getAllRandomCounters } from "./randomAnimRegistry";

export const getAssociatedRandomCounter = ( spriteId: string ): Counter => {
    const counterDictionary = getAllRandomCounters();
    return counterDictionary[spriteId];
};