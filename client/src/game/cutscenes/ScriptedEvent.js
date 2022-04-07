const { ON_POSITION } = require('../../game-data/conditionGlobals');
const { getAction } = require('../../helpers/actionDtoFactory');
const { ScriptedCinematic } = require('./ScriptedCinematic');

class ScriptedEvent {
    constructor( scriptedEventData ) {
        this.mapName        = scriptedEventData.mapName;
        this.trigger        = scriptedEventData.trigger;
        this.passScene      = scriptedEventData.passScene;
        const eventScript   = getAction(scriptedEventData.condition, scriptedEventData.scenes);
        this.action         = eventScript.action;
        this.condition      = eventScript.condition;
        this.fired          = false;
        this.id        = scriptedEventData.id;

        if ( scriptedEventData.trigger == ON_POSITION ) {
            this.position = scriptedEventData.position
        }
    }

    fireEvent( args = null ) {
        if ( !this.fired ) {
            new ScriptedCinematic( this.action.scenes, this.trigger, args, this.action );
            this.fired = true;           
        }
    }
}

module.exports = {
    ScriptedEvent
}