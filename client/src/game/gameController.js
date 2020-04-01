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

const startMap = ( ) => {
    map.initMap()
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

const stopCurrentMode = ( ) => {
    if ( state.overworldMode ) {
        stopMap()
    }
    else if ( state.battleMode ) {
        stopBattle()
    }
    else if ( state.cinematicMode ) {
        stopCinematic()
    }
}

module.exports = {
    startBattle,
    stopBattle,
    startMap,
    stopMap,
    startCinematic,
    stopCinematic,
    stopCurrentMode
}