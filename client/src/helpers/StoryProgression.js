const { STORY_EVENTS } = require('../resources/storyChapters')
const { ScriptedEvent } = require('../game/cutscenes/ScriptedEvent');
const { FACING_RIGHT, FACING_LEFT, FACING_UP, FACING_DOWN } = require("../game-data/globals")
const { 
    ON_POSITION
}  = require('../game-data/conditionGlobals');
const { conditionIsTrue } = require('./conditionalHelper');
const globals = require("../game-data/globals")

class StoryProgression {
    constructor( ) { 
        this.events = STORY_EVENTS.map((e)=>{ return new ScriptedEvent(e)})
    }

    get activeMapEvents() { return this.events.filter((e)=>{return e.mapName == globals.GAME.activeMapName;}); }

    checkForEventTrigger( trigger, args = null ) {
        const activeMapStoryEvent = this.activeMapEvents.filter((e)=>{
            return e.trigger == trigger && conditionIsTrue(e.condition.type, e.condition.value) && !e.fired;
        })[0];
        if ( activeMapStoryEvent && ( trigger != ON_POSITION || this.checkForPositionTrigger( activeMapStoryEvent ) ) ) {
            activeMapStoryEvent.fireEvent( args );
        }
    }

    checkForPositionTrigger( activeEvent ){
        const position = activeEvent.position;
        const PLAYER = globals.GAME.PLAYER
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