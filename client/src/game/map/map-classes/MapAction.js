const globals       = require('../../../game-data/globals')
const I_Hitbox      = require('../../interfaces/I_Hitbox').I_Hitbox
const displayText   = require('../map-ui/displayText')
/**
 * A Mapaction is a I_Hitbox extension that has an event tied to it.
 * If the player is in the action range of the MapAction and hits space, the event is triggered.
 */
class MapAction extends I_Hitbox {
    constructor ( x, y, action, speaker = null ) {
        let radius = globals.GRID_BLOCK_PX / 2;
        super( x, y, radius )

        this.name = speaker

        if ( action.character ) {
            this.character = action.character
        }
        this.type       = action.type
        this.text       = action.text
        this.sfx        = action.sfx
        this.direction  = action.direction
        this.to         = action.to
        this.arcColor   = "#FF0000";

        this.needsConfirmation = ( this.type == "BUS" )
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
                break;
        }

        globals.GAME.activeAction = null;
    }
    /**
     * Play the sound effect at the location of this.sfx. Call displayText.getSpeechBubble with this as argument
     */
    displayActionText( ) {
        globals.GAME.sound.playEffect( this.sfx );
        displayText.getSpeechBubble( this )
    } 
}

module.exports = {
    MapAction
}