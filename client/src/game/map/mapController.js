const state = require('../../game-data/state')
const utility       = require('../../helpers/utilFunctions')
const canvasHelpers = require('../../helpers/canvasHelpers')

const getMap = require('./map-init/initMap').initializeMap

let initializingMap = false;

const initMap = ( json, previousMapName = null, savedState = null ) =>{
    initializingMap = true

    getMap( json, previousMapName, savedState )

    setTimeout( ( ) => {
        initializingMap = false;
    }, 1000)
}

const switchMap = ( ) => {
    const urlToNewMap   = state.mapTransition.urlToNewMap
    const oldMapName    = state.mapTransition.oldMapName
    state.mapTransition = null
    

    if ( !initializingMap ) {
        canvasHelpers.clearBothCanvases();
        initNewMapAfterClearingOld(urlToNewMap, oldMapName)        
    }
}

const initNewMapAfterClearingOld = ( newMap, oldMap ) => {
    initializingMap = true;
    state.currentMap.NPCs = []
    state.paused = true;
    utility.fetchJSONWithCallback( '/static/maps/' + newMap +'.json', initMap, oldMap )

    setTimeout( () => {
        initPlayerSpriteInNewMap( oldMap )
    }, 1000)
}

const initPlayerSpriteInNewMap = ( previousMapName ) => {
    setCharacterLocationInNewMap( previousMapName )
    state.playerCharacter.sprite.calcXyFromCell()
    state.playerCharacter.sprite.drawSprite() 
    
    state.paused = false;
}

const setCharacterLocationInNewMap = ( previousMapName  ) => {
    const currentMapData = state.currentMap.mapData
    const playerSprite = state.playerCharacter.sprite

    if ( currentMapData.outdoors == true ) {
        for ( var adjacentMap in currentMapData.neighbours ) {
            setPositionFromNeighbour( playerSprite, currentMapData, previousMapName, adjacentMap );
        }
    }
}

const setPositionFromNeighbour = ( playerSprite, currentMapData, previousMapName, adjacentMap  ) => {
    if ( currentMapData.neighbours[adjacentMap] == previousMapName ) {
        playerSprite.calcCellFromXy()
        
        if ( adjacentMap == "right") {
            playerSprite.setCell( { 'row': playerSprite.row, 'col': 24 } )                    
        }

        if ( adjacentMap == "left") {
            playerSprite.setCell( { 'row': playerSprite.row, 'col': -1 } )                    
        }
    } 
}

const stopMap = ( ) => {
    state.battleState.requestingBattle = false
    state.currentMap.mapMusic.pause()     
}

module.exports = {
    initMap,
    stopMap,
    switchMap
}