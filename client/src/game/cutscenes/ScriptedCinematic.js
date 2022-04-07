const { Cinematic } = require('./Cinematic')
const { LOAD_MAP } = require('../../game-data/conditionGlobals');
const { addEventToRegistry } = require('../../helpers/interactionRegistry');
const globals = require("../../game-data/globals");
const { Neighbourhood } = require('../Neighbourhood');


class ScriptedCinematic extends Cinematic{
    constructor( scenes, trigger, args ) {
        super( scenes, trigger, args );
        this.action = action;
        this.activeNeighbourhood = {};
        this.back = {};
        this.front = {};
        this.frontGrid = {};        
        this.usingCinematicMap = true;
        
        this.initCinematicMap( );
    }

    setNeighbourhoodAndMap(mapName) {
        if ( this.activeNeighbourhood == undefined || !mapName.includes(this.activeNeighbourhood.key) ) {
            this.activeNeighbourhood = new Neighbourhood(mapName);
        }
        else {
            this.activeNeighbourhood.activateMap(mapName);
        }
    }

    initCinematicMap( ) {
        let GAME = globals.GAME;

        GAME.initCanvas( 'BACK', this.back );
        GAME.initCanvas( 'FRONT', this.front );
        GAME.initCanvas( 'FRONT_GRID', this.frontGrid );
        if ( this.scenes[0].type != LOAD_MAP ) {
            this.loadMap( globals.GAME.activeNeighbourhood.activeMapKey, true )
        }
    }

    loadMap( mapName, setPlayer = false ) {
        let GAME = globals.GAME;
        GAME.sound.clearActiveSoundEffects( );
        this.setNeighbourhoodAndMap(mapName);
        GAME.loadMapToCanvases( );
        if ( setPlayer ) {
            GAME.PLAYER.setNewLocationInGrid( {'row': GAME.PLAYER.row, 'col': GAME.PLAYER.col}, GAME.PLAYER.direction )
            GAME.cameraFocus.centerOnXY( GAME.PLAYER.centerX(), GAME.PLAYER.baseY() )
            GAME.FRONT.allSprites.push( GAME.PLAYER );
            GAME.FRONT.spriteDictionary["PLAYER"] = GAME.PLAYER
        }
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
        if ( globals.GAME.activeNeighbourhood.activeMapKey == this.activeNeighbourhood.activeMapKey ) {
            globals.GAME.front.class.allSprites = this.front.class.allSprites;
        }

        super.handleEndOfCinematicTrigger( );
    }
}

module.exports = {
    ScriptedCinematic
}