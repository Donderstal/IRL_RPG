const globals       = require('../../../game-data/globals')
const I_Hitbox      = require('../../interfaces/I_Hitbox').I_Hitbox
const displayText   = require('../map-ui/displayText')
const { Cinematic }     = require('../../cutscenes/Cinematic')
/**
 * A Mapaction is a I_Hitbox extension that has an event tied to it.
 * If the player is in the action range of the MapAction and hits space, the event is triggered.
 */
class MapAction extends I_Hitbox {
    constructor ( x, y, action, speaker = null ) {
        let radius = globals.GRID_BLOCK_PX / 2;
        super( x, y, radius )

        this.name = speaker

        if ( action.party ) {
            this.party = action.party
        }
        if ( action.hasEvent ) {
            this.hasEvent   = true;
            this.events     = action.events
        }
        this.type       = action.type
        this.text       = action.text
        this.sfx        = action.sfx
        this.direction  = action.direction
        this.to         = action.to
        this.arcColor   = "#FF0000";

        this.needsConfirmation = ( this.type == "BUS" || this.type == "BATTLE" )
    }
    /**
     * Handle and in-range actionbutton click by the player based on the this.type prop
     */
    handle( ) {
        switch ( this.type ) {
            case "TEXT" :
            case "BUS" :
            case "BATTLE" :
                this.displayActionText( )
                break;            
        }

        if ( !this.needsConfirmation ) {
            globals.GAME.activeAction = null;
        }
    }
    /**
     * Confirm that the globals.GAME.activeAction set in the this.handle method should be triggered
     */
    confirm( ) {
        switch ( this.type ) {
            case "BUS" :
                globals.GAME.switchMap( this.to, "BUS" );
                globals.GAME.sound.playEffect( "misc/random5.wav" );
                globals.GAME.activeAction = null;
                break;
            case "BATTLE" : 
                if ( this.hasEvent ) {
                    this.events.forEach( ( e ) => {
                        if ( e["trigger"] == "ON_BATTLE_START" ) {
                            new Cinematic( e, e.trigger, [ this.party, this.name ] );                            
                        }
                    } )

                }
                else {
                    globals.GAME.initializeBattle( this.party, this.name );                    
                };
        }
        console.log(globals.GAME.activeAction)
    }
    /**
     * Play the sound effect at the location of this.sfx. Call displayText.getSpeechBubble with this as argument
     */
    displayActionText( ) {
        globals.GAME.sound.playEffect( this.sfx );
        displayText.getSpeechBubble( this )
    } 
    checkForEventOnBattleEnd( ) {
        this.events.forEach( ( e ) => {
            if ( e["trigger"] == "ON_BATTLE_END" ) {
                new Cinematic( e, e.trigger, [ this.party, this.name ] );                            
            }
        } )
    }
}

module.exports = {
    MapAction
}