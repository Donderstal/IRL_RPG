const { Cinematic } = require('./Cinematic')
const { LOAD_MAP } = require('../../game-data/conditionGlobals');
const { addEventToRegistry } = require('../../helpers/interactionRegistry');
const globals = require("../../game-data/globals");
const { loadCinematicMap, initCinematicGrids, loadMapToCanvases, setPlayerToCellInNewMap, getCinematicFront, clearMapFromCanvases } = require('../../helpers/loadMapHelpers');


class ScriptedCinematic extends Cinematic{
    constructor( scenes, trigger, args, action ) {
        globals.GAME.usingCinematicMap = true;
        initCinematicGrids( )
        super( scenes, trigger, args );
        this.action = action;

        if ( !this.activeScene.containsAnimationType(LOAD_MAP) ) {
            getCinematicFront().playerSprite = globals.GAME.front.class.playerSprite;
            loadCinematicMap( globals.GAME._activeNeighbourhood.activeMapKey );
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
        if ( GAME.cinematicNeighbourhood.activeMapKey == GAME._activeNeighbourhood.activeMapKey ) {
            GAME.front.class.allSprites = getCinematicFront().allSprites;
        }
        globals.GAME.front.class.playerSprite = getCinematicFront().playerSprite;
        clearMapFromCanvases( )
        loadMapToCanvases( false, GAME.back.class, GAME.front.class, GAME.frontgrid.class, GAME._activeNeighbourhood.activeMap );
        setPlayerToCellInNewMap(
            this.initialPlayerLocation, GAME.PLAYER.direction, GAME.front.class
        )

        super.handleEndOfCinematicTrigger( );
    }
}

module.exports = {
    ScriptedCinematic
}