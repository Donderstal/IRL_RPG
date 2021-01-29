const globals       = require('../../../game-data/globals')
const I_Hitbox      = require('../../interfaces/I_Hitbox').I_Hitbox
const displayText   = require('../map-ui/displayText')

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

    confirm( ) {
        switch ( this.type ) {
            case "BUS" :
                globals.GAME.switchMap( this.to, "BUS" );
                globals.GAME.sound.playEffect( "misc/random5.wav" );
                break;
        }

        globals.GAME.activeAction = null;
    }

    displayActionText( ) {
        globals.GAME.sound.playEffect( this.sfx );
        displayText.getSpeechBubble( this )
    } 
}

module.exports = {
    MapAction
}