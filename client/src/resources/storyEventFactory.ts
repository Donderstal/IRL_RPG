import { CinematicTrigger } from "../enumerables/CinematicTriggerEnum";
import type { CellPosition } from "../models/CellPositionModel";
import type { InteractionModel } from "../models/InteractionModel";
import type { StoryEventModel } from "../models/StoryEventModel";
const getBaseStoryEvent = ( trigger: CinematicTrigger, mapName: string, id: string ): StoryEventModel => {
    return {
        id: id,
        trigger: trigger,
        mapName: mapName,
        interaction: []
    };
};
export const getOnEnterStoryEvent = ( mapName: string, id: string, interaction: InteractionModel[] ): StoryEventModel => {
    const event = getBaseStoryEvent( CinematicTrigger.enter, mapName, id );
    return {
        ...event,
        interaction: interaction
    };
};
export const getOnLeaveStoryEvent = ( mapName: string, id: string, interaction: InteractionModel[] ): StoryEventModel => {
    const event = getBaseStoryEvent( CinematicTrigger.leave, mapName, id );
    return {
        ...event,
        interaction: interaction
    };
};
export const getOnPositionStoryEvent = ( mapName: string, id: string, interaction: InteractionModel[], position: CellPosition ): StoryEventModel => {
    const event = getBaseStoryEvent( CinematicTrigger.position, mapName, id );
    return {
        ...event,
        interaction: interaction,
        position: position
    };
};
export const getOnInteractionStoryEvent = ( mapName: string, id: string, interaction: InteractionModel[], spriteName: string ): StoryEventModel => {
    const event = getBaseStoryEvent( CinematicTrigger.interaction, mapName, id );
    return {
        ...event,
        interaction: interaction,
        name: spriteName
    };
};