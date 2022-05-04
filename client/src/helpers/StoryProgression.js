const { STORY_EVENTS } = require('../resources/storyChapters')
const { ScriptedEvent } = require('../game/cutscenes/ScriptedEvent');
const { FACING_RIGHT, FACING_LEFT, FACING_UP, FACING_DOWN } = require("../game-data/globals")
const { 
    ON_POSITION, ON_NPC_INTERACTION
}  = require('../game-data/conditionGlobals');
const { conditionIsTrue } = require('./conditionalHelper');
const globals = require("../game-data/globals")

class StoryProgression {
    constructor( eventIdList = [] ) { 
        this.events = STORY_EVENTS.map((e)=>{ return new ScriptedEvent(e)});
        this.triggeredEvents = eventIdList;
    }

    get activeMapEvents() { return this.events.filter((e)=>{return e.mapName == globals.GAME.activeMapName;}); }

    checkForEventTrigger( trigger, args = null ) {
        const activeMapStoryEvent = this.activeMapEvents.filter((e)=>{
            return e.trigger == trigger && conditionIsTrue(e.condition.type, e.condition.value) && this.triggeredEvents.indexOf(e.id) == -1;
        })[0];
        if ( activeMapStoryEvent && ( trigger != ON_POSITION || this.checkForPositionTrigger( activeMapStoryEvent ) ) ) {
            var triggerEvent = true;
            if ( trigger == ON_POSITION ) {
                triggerEvent = this.checkForPositionTrigger( activeMapStoryEvent );
            }
            if ( trigger == ON_NPC_INTERACTION ) {
                triggerEvent = this.checkForNPCInteractionTrigger( activeMapStoryEvent, args[0] );
            }
            if (triggerEvent) {
                activeMapStoryEvent.fireEvent( args );
                this.triggeredEvents.push(activeMapStoryEvent.id);                
            }
            return true;            
        }
        return false;
    }

    checkForNPCInteractionTrigger( activeEvent, NPCid ) {
        const NPC = globals.GAME.FRONT.spriteDictionary[NPCid];
        return ( activeEvent.name == NPC.name);
    }

    checkForPositionTrigger( activeEvent ){
        const position = activeEvent.position;
        const PLAYER = globals.GAME.PLAYER;
        if ( position.direction == PLAYER.direction ) {
            if ( position.direction == FACING_RIGHT || position.direction == FACING_LEFT ) {
                return PLAYER.col == position.col;
            }
            if ( position.direction == FACING_UP || position.direction == FACING_DOWN ) {
                return PLAYER.row == position.row;
            }
        }
    
        return false;
    }
}

module.exports = {
    StoryProgression
}