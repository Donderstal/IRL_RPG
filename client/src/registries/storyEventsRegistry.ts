import { CinematicTrigger } from "../enumerables/CinematicTriggerEnum";
import { DirectionEnum } from "../enumerables/DirectionEnum";
import { getPlayer, getSpriteById } from "../game/controllers/spriteController";
import type { Sprite } from "../game/core/Sprite";
import { ScriptedEvent } from "../game/cutscenes/ScriptedEvent";
import { conditionIsTrue } from "../helpers/conditionalHelper";
import { initInteractionModel } from "../helpers/modelFactory";
import type { CellPosition } from "../models/CellPositionModel";
import type { StoryEventModel } from "../models/StoryEventModel";
import { STORY_EVENTS } from "../resources/storyChapters";

let events: ScriptedEvent[] = [];
export let activeMapEvents: ScriptedEvent[] = [];
let triggeredEventKeys: string[] = [];
let disableStoryMode: boolean;

export const setStoryRegistry = ( disableStoryMode: boolean, eventIdList: string[] = [] ): void => {
    disableStoryMode = disableStoryMode;
    events = STORY_EVENTS.map( ( e ) => {
        let model: StoryEventModel = {
            id: e.id,
            trigger: e.trigger as CinematicTrigger,
            mapName: e.mapName,
            interaction: e.interaction.map( initInteractionModel )
        }
        return new ScriptedEvent( model );
    } );
    triggeredEventKeys = eventIdList;
}

export const setMapEvents = ( activeMapKey: string ): void => {
    activeMapEvents = events.filter( ( e ) => { return e.mapName == activeMapKey; } );
}

export const checkForEventTrigger = ( trigger: CinematicTrigger, args: any[] = null ): boolean => {
    if ( disableStoryMode ) {
        return false;
    }
    const activeMapStoryEvent = activeMapEvents.filter( ( e ) => {
        return e.trigger == trigger && conditionIsTrue( e.condition.type, e.condition.value ) && triggeredEventKeys.indexOf( e.id ) == -1;
    } )[0];
    if ( activeMapStoryEvent && ( trigger !== CinematicTrigger.position || checkForPositionTrigger( activeMapStoryEvent ) ) ) {
        let triggerEvent = true;
        if ( trigger === CinematicTrigger.position ) {
            triggerEvent = checkForPositionTrigger( activeMapStoryEvent );
        }
        if ( trigger === CinematicTrigger.interaction ) {
            triggerEvent = checkForNPCInteractionType( activeMapStoryEvent, args[0] );
        }
        if ( triggerEvent ) {
            activeMapStoryEvent.fireEvent( args );
            triggeredEventKeys.push( activeMapStoryEvent.id );
        }
        return true;
    }
    return false;
}

export const checkForNPCInteractionType = ( activeEvent: ScriptedEvent, NPCid: string ): boolean => {
    const NPC: Sprite = getSpriteById( NPCid );
    return ( activeEvent.name == NPC.name );
}

export const checkForPositionTrigger = ( activeEvent: ScriptedEvent ): boolean => {
    const position: CellPosition = activeEvent.position;
    const player: Sprite = getPlayer();
    if ( position.direction === player.direction ) {
        if ( position.direction === DirectionEnum.right || position.direction === DirectionEnum.left ) {
            return player.column === position.column;
        }
        if ( position.direction === DirectionEnum.up || position.direction === DirectionEnum.down ) {
            return player.row === position.row;
        }
    }

    return false;
}