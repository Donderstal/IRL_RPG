const state = require('../../game-data/state')
const Sound         = require('./../interfaces/I_Sound').Sound
const anim          = require( './../animationFrameController')
const utility       = require('../../helpers/utilFunctions')

//EXPORTED
const getMap = require('./map-init/initMap').initializeMap

const initMap = ( json, previousMapName = null, savedState = null ) =>{
    getMap( json, previousMapName )

    setTimeout( ( ) => {
        if ( !state.currentMap.mapMusic || !state.currentMap.mapMusic.sound.src.includes(state.currentMap.mapData.music) ) {
            state.currentMap.mapMusic = new Sound(state.currentMap.mapData.music)     
            state.currentMap.mapMusic.play()  
        }

        anim.startRequestingFrame()
    }, 1000)
}

/**
 * Get the loading screen, stop player controls and fetch the new map
 */
const initNewMapAfterClearingOld = ( newMap, oldMap ) => {
    state.mapTransition = null
    state.currentMap.NPCs = []
    state.paused = true;
    utility.fetchJSONWithCallback( '/static/maps/' + newMap +'.json', initMap, oldMap )
}

const stopMap = ( ) => {
    state.battleState.requestingBattle = false
    state.currentMap.mapMusic.pause()     
}

module.exports = {
    initMap,
    stopMap,
    initNewMapAfterClearingOld
}