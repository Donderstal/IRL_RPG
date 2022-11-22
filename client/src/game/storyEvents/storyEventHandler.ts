import { CinematicTrigger } from "../../enumerables/CinematicTriggerEnum";
import { DirectionEnum } from "../../enumerables/DirectionEnum";
import { conditionIsTrue } from "../../helpers/conditionalHelper";
import type { CellPosition } from "../../models/CellPositionModel";
import { setActiveCinematic } from "../controllers/cinematicController";
import type { Sprite } from "../core/Sprite";
import type { ScriptedEvent } from "../cutscenes/ScriptedEvent";
import { inDisableStoryGameState } from "../gameState/gameStateGetter";
import { getPlayer, getSpriteById } from "../modules/sprites/spriteGetter";
import { getStoryEventsOnActiveMap, storyEventHasBeenTriggered } from "./storyEventGetter";
import { markStoryEventAsTriggered } from "./storyEventRegistry";

export const checkForEventTrigger = ( trigger: CinematicTrigger, args: any[] = null ): boolean => {
    const events = getStoryEventsOnActiveMap();
    if ( inDisableStoryGameState() || events.length < 1 ) {
        return false;
    }
    const activeMapStoryEvent = events.filter( ( e ) => {
        return e.trigger == trigger && conditionIsTrue( e.condition.type, e.condition.value ) && !storyEventHasBeenTriggered(e.id);
    } )[0];
    if ( activeMapStoryEvent && ( trigger !== CinematicTrigger.position || checkForPositionTrigger( activeMapStoryEvent ) ) ) {
        let triggerEvent = true;
        if ( trigger === CinematicTrigger.position ) {
            triggerEvent = checkForPositionTrigger( activeMapStoryEvent );
        }
        if ( trigger === CinematicTrigger.interaction ) {
            triggerEvent = checkForNPCInteractionType( activeMapStoryEvent, args[0] );
        }
        if ( triggerEvent && !activeMapStoryEvent.fired ) {
            activeMapStoryEvent.fireEvent( );
            markStoryEventAsTriggered( activeMapStoryEvent.id );
            setActiveCinematic( activeMapStoryEvent.action, activeMapStoryEvent.trigger, args );
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