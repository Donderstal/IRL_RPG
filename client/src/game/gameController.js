const state     = require('../game-data/state')
const battle    = require('./battle/battleController')
const map       = require('./map/mapController')

const startBattle = ( ) => {
    state.battleMode = true;    

    battle.initBattle()
}

const stopBattle = ( ) => {
    state.battleMode = false;

    battle.stopBattle()
}

const startMap = ( ) => {
    state.overworldMode = true;

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

module.exports = {
    startBattle,
    stopBattle,
    startMap,
    stopMap,
    startCinematic,
    stopCinematic
}