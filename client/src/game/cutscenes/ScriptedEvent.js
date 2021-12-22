const { Cinematic } = require('./Cinematic')
const { 
    ON_POSITION
} = require('../../game-data/conditionGlobals');
const { getAction } = require('../../helpers/actionDtoFactory');
const { addEventToRegistry } = require('../../helpers/interactionRegistry');

class ScriptedEvent {
    constructor( scriptedEventData ) {
        this.mapName        = scriptedEventData.mapName;
        this.trigger        = scriptedEventData.trigger;
        this.passScene      = scriptedEventData.passScene;
        const eventScript   = getAction(scriptedEventData.condition, scriptedEventData.scenes);
        this.action         = eventScript.action;
        this.condition      = eventScript.condition;
        this.fired          = false;

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

class ScriptedCinematic extends Cinematic{
    constructor( scenes, trigger, args, action ) {
        super( scenes, trigger, args );
        this.action = action
    }

    handleEndOfCinematicTrigger( ) {
        if ( this.action.shouldBeRegistered ) {
            if ( this.registeredSelection != false ) {
                addEventToRegistry( this.action.registryKey, this.registeredSelection )
            }
            else {
                addEventToRegistry( this.action.registryKey )  
            }
        }
        super.handleEndOfCinematicTrigger( );
    }
}

module.exports = {
    ScriptedEvent
}