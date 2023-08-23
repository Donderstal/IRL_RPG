let spriteTriggerRelationRegistry: { [key in string]: string } = {};

export const registerSpriteTriggerRelation = ( spriteId: string, triggerId: string, eventId: string ): void => {
    if ( spriteTriggerRelationExists( spriteId ) ) {
        console.warn( `A spriteTriggerRelation already exists for sprite ${spriteId}. Failed to register trigger ${eventId}` )
        return;
    }

    spriteTriggerRelationRegistry[spriteId] = triggerId;
}
export const unregisterSpriteTriggerRelation = ( spriteId: string ): void => {
    if ( !spriteTriggerRelationExists( spriteId ) ) {
        console.warn( `Trying to delete sprite ${spriteId}'s spriteTriggerRelation, but no relation was found.` )
        return;
    }

    delete spriteTriggerRelationRegistry[spriteId];
}
export const clearSpriteTriggerRelationRegistry = (): void => {
    spriteTriggerRelationRegistry = {};
}
export const spriteTriggerRelationExists = ( spriteId: string ): boolean => {
    return spriteId in spriteTriggerRelationRegistry;
}
export const getSpriteRelatedTriggerId = ( spriteId: string ): string => {
    return spriteTriggerRelationRegistry[spriteId];
}