const { Cinematic } = require('./Cinematic')
const { LOAD_MAP } = require('../../game-data/conditionGlobals');
const { addEventToRegistry } = require('../../helpers/interactionRegistry');
const globals = require("../../game-data/globals");
const { loadCinematicMap, initCinematicGrids, loadMapToCanvases, setPlayerToCellInNewMap, getCinematicFront } = require('../../helpers/loadMapHelpers');


class ScriptedCinematic extends Cinematic{
    constructor( scenes, trigger, args, action ) {
        globals.GAME.usingCinematicMap = true;
        initCinematicGrids( )
        super( scenes, trigger, args );
        this.action = action;

        if ( !this.activeScene.containsAnimationType(LOAD_MAP) ) {
            loadCinematicMap( globals.GAME.activeNeighbourhood.activeMapKey, true );
        }
    }

    handleEndOfCinematicTrigger( ) {
        const GAME = globals.GAME;
        GAME.usingCinematicMap = false;
        if ( this.action.shouldBeRegistered ) {
            if ( this.registeredSelection != false ) {
                addEventToRegistry( this.action.registryKey, this.registeredSelection )
            }
            else {
                addEventToRegistry( this.action.registryKey )  
            }
        }
        if ( GAME.activeNeighbourhood.activeMapKey == GAME._activeNeighbourhood.activeMapKey ) {
            GAME.front.class.allSprites = getCinematicFront().allSprites;
        }
        else {
            loadMapToCanvases( false, GAME.BACK, GAME.FRONT, GAME.FRONTGRID, GAME._activeNeighbourhood.activeMap );
            setPlayerToCellInNewMap(
                this.initialPlayerLocation, GAME.PLAYER.direction, GAME.FRONT
            )
        }

        super.handleEndOfCinematicTrigger( );
    }
}

module.exports = {
    ScriptedCinematic
}