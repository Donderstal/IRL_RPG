import { STORY_EVENTS } from '../resources/storyChapters';
import { ScriptedEvent } from '../game/cutscenes/ScriptedEvent';
import { conditionIsTrue } from './conditionalHelper';
import globals from "../game-data/globals";
import { CinematicTrigger } from '../enumerables/CinematicTriggerEnum';
import { DirectionEnum } from '../enumerables/DirectionEnum';
import type { StoryEventModel } from '../models/StoryEventModel';
import type { Sprite } from '../game/core/Sprite';
import { initInteractionModel } from './modelFactory';
import type { CellPosition } from '../models/CellPositionModel';
import { getPlayer, getSpriteById } from '../game/controllers/spriteController';

export class StoryProgression {
    events: ScriptedEvent[];
    triggeredEvents: string[];
    constructor( eventIdList = [] ) { 
        this.events = STORY_EVENTS.map( ( e ) => {
            let model: StoryEventModel = {
                id: e.id,
                trigger: e.trigger as CinematicTrigger,
                mapName: e.mapName,
                interaction: e.interaction.map(initInteractionModel)
            }
            return new ScriptedEvent( model );
        } );
        this.triggeredEvents = eventIdList;
    }

    get activeMapEvents(): ScriptedEvent[] { return this.events.filter((e)=>{return e.mapName == globals.GAME.activeMapKey;}); }

    checkForEventTrigger( trigger: CinematicTrigger, args: any[] = null ): boolean {
        if ( globals.GAME.disableStoryMode ) {
            return false;
        }
        const activeMapStoryEvent = this.activeMapEvents.filter((e)=>{
            return e.trigger == trigger && conditionIsTrue(e.condition.type, e.condition.value) && this.triggeredEvents.indexOf(e.id) == -1;
        })[0];
        if ( activeMapStoryEvent && ( trigger !== CinematicTrigger.position || this.checkForPositionTrigger( activeMapStoryEvent ) ) ) {
            let triggerEvent = true;
            if ( trigger === CinematicTrigger.position ) {
                triggerEvent = this.checkForPositionTrigger( activeMapStoryEvent );
            }
            if ( trigger === CinematicTrigger.interaction ) {
                triggerEvent = this.checkForNPCInteractionType( activeMapStoryEvent, args[0] );
            }
            if (triggerEvent) {
                activeMapStoryEvent.fireEvent( args );
                this.triggeredEvents.push(activeMapStoryEvent.id);                
            }
            return true;            
        }
        return false;
    }

    checkForNPCInteractionType( activeEvent: ScriptedEvent, NPCid: string ): boolean {
        const NPC: Sprite = getSpriteById( NPCid );
        return ( activeEvent.name == NPC.name);
    }

    checkForPositionTrigger( activeEvent: ScriptedEvent ): boolean {
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
}