const { Cinematic } = require('./Cinematic')
const { addEventToRegistry } = require('../../helpers/interactionRegistry');
const globals = require("../../game-data/globals");
const { initCinematicGrids, clearCinematicGrids, clearMapFromCanvases } = require('../../helpers/loadMapHelpers');


class ScriptedCinematic extends Cinematic{
    constructor( scenes, trigger, args, action ) {      
        globals.GAME.usingCinematicMap = true;
        initCinematicGrids( );
        super( scenes, trigger, args );
        this.action = action;
    }

    handleEndOfCinematicTrigger( ) {
        const GAME = globals.GAME;
        GAME.usingCinematicMap = false;
        clearMapFromCanvases(GAME)
        if ( this.action.shouldBeRegistered ) {
            if ( this.registeredSelection != false ) {
                addEventToRegistry( this.action.registryKey, this.registeredSelection )
            }
            else {
                addEventToRegistry( this.action.registryKey )  
            }
        }

        clearCinematicGrids( );

        super.handleEndOfCinematicTrigger( );
    }
}

module.exports = {
    ScriptedCinematic
}