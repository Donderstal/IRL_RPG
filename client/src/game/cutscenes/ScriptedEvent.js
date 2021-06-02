const { Cinematic } = require('./Cinematic')
/**
 * The ScriptedEvent class is no longer implemented and need to be reworked to the new Grid system
 */
class ScriptedEvent {
    constructor( scriptedEventData, eventScript ) {
        this.mapName        = scriptedEventData.mapName;
        this.trigger        = scriptedEventData.trigger;
        this.passScene      = scriptedEventData.passScene;

        this.eventScript    = eventScript;
        this.fired          = false;

        if ( scriptedEventData.trigger == "ON_POSITION" ) {
            this.position = scriptedEventData.position
        }
    }

    fireEvent( args = null ) {
        if ( !this.fired ) {
            new Cinematic( this.eventScript, this.trigger, args );
            this.fired = true;            
        }
    }
}

module.exports = {
    ScriptedEvent
}