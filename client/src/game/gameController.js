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
    const previousMode = stopCurrentMode()

    if ( state.changeRequest == 'OVERWORLD' ) {
        if ( previousMode == 'BATTLE' ) {
            startMap("FROM_BATTLE")            
        }
    }
    else if ( state.changeRequest == 'BATTLE' ) {
        startBattle()
    }
    else if ( state.changeRequest == 'CINEMATIC' ) {
        startCinematic()
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
    else if ( state.cinematicMode ) {
        stopCinematic()
        return "CINEMATIC"
    }
}

module.exports = {
    switchMode,
    startMap
}