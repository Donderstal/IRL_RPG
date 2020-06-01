class I_ScriptedEvent {
    constructor( scriptedEventData, eventScript ) {
        this.mapName        = scriptedEventData.mapName;
        this.trigger        = scriptedEventData.trigger;
        this.passScene      = scriptedEventData.passScene;

        this.eventScript    = eventScript;
        this.fired          = false;
        console.log(typeof this)
    }

    fireEvent() {
        if ( !this.fired ) {
            console.log(this.eventScript)
            this.fired = true;            
        }
    }
}

module.exports = {
    I_ScriptedEvent
}