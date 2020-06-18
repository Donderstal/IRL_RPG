const state     = require('../game-data/state')
const battle    = require('./battle/battleController')
const map       = require('./map/mapController')

const startBattle = ( ) => {
    battle.startBattle()
}

const stopBattle = ( ) => {
    state.battleMode = false;
    battle.stopBattle()
}

const startMap = ( BOOT_STATUS, json = null, isSavedGame ) => {
    if ( BOOT_STATUS == "NEW_GAME" || BOOT_STATUS == "SAVE_GAME" ) {
        map.initMap( json, BOOT_STATUS )
    }
    if ( BOOT_STATUS == "FROM_BATTLE" ) {
        map.initMap( state.currentMap.mapData, "FROM_BATTLE" )
    }
}

const stopMap = ( ) => {
    state.overworldMode = false;

    map.stopMap()
}

const startCinematic = ( ) => {
    state.cinematicMode = true;

}

const stopCinematic = ( ) => {
    state.cinematicMode = false;

}

const switchMode = ( ) => {
    if ( state.changeRequest == 'OVERWORLD' ) {
        stopCurrentMode( );
        startMap( "FROM_BATTLE" );
    }
    else if ( state.changeRequest == 'BATTLE' ) {
        stopCurrentMode( );
        startBattle( );
    }
    else if ( state.changeRequest == 'CINEMATIC' ) {
        startCinematic( );
    }
    else if ( state.changeRequest == 'CINEMATIC_END' ) {
        stopCinematic( );
    }
}

const stopCurrentMode = ( ) => {
    if ( state.overworldMode ) {
        stopMap()
        return "OVERWORLD"
    }
    else if ( state.battleMode ) {
        stopBattle()
        return "BATTLE"
    }
}

module.exports = {
    switchMode,
    startMap
}