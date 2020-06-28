const state             = require('../../game-data/state')
const globals           = require('../../game-data/globals')
const mapHelpers        = require('../../helpers/mapHelpers')
const canvasHelpers     = require('../../helpers/canvasHelpers')
const getMapData        = require('../../resources/mapResources').getMapData

const triggerEvent      = require('../../game-data/triggerEvents').triggerEvent
const Sound             = require('./../interfaces/I_Sound').Sound
const getMap            = require('./map-init/initMap').initializeMap
const initMapFromBattle = require('./map-init/initMap').initMapFromBattle
const getScriptedEventsForMap  = require('../../game-data/storyProgression').getScriptedEventsForMap

let initializingMap = false;

const initMap = ( json, BOOT_STATUS ) =>{
    getScriptedEventsForMap(json.mapName)

    initializingMap = true;

    ( BOOT_STATUS == "FROM_BATTLE" ) ? initMapFromBattle( ) : getMap( json, BOOT_STATUS )        

    setTimeout( ( ) => {
        initializingMap = false;
    }, 1000)
}

const switchMap = ( transition ) => {
    const urlToNewMap   = transition.urlToNewMap
    const oldMapName    = transition.oldMapName    

    if ( !initializingMap ) {
        triggerEvent("ON_LEAVE", [ urlToNewMap, oldMapName ] )

        if ( state.activeCinematic == null ) {
            clearStateAndCanvasBeforeNewMap(urlToNewMap, oldMapName)                 
        }
    }
}

const clearStateAndCanvasBeforeNewMap = (urlToNewMap, oldMapName)  => {
    state.currentMap = { 
        blockedXyValues: [], 
        mapMusic: state.currentMap.mapMusic
    }
    canvasHelpers.clearBothCanvases();
    initNewMapAfterClearingOld(urlToNewMap, oldMapName)      
}

const initNewMapAfterClearingOld = ( newMap, previousMapName ) => {
    let BOOT_STATUS = "DOOR";
    let prevMapArray = previousMapName.split('/')
    let newMapArray = newMap.split('/')
    const sameArea = ( newMapArray[0] == prevMapArray[0] )
    const sameName = newMapArray[2].split('-')[0] == prevMapArray[2].split('-')[0]

    if  ( sameArea == sameName ) {
        BOOT_STATUS = "NEIGHBOUR";
    }

    initializingMap, state.paused = true;

    const newMapdata = getMapData(newMap)
    initMap( newMapdata, BOOT_STATUS )

    setTimeout( () => {
        initPlayerSpriteInNewMap( previousMapName )
        state.transitioning = false;
    }, 660)
}

const initPlayerSpriteInNewMap = ( previousMapName ) => {
    setCharacterLocationInNewMap( previousMapName )
    state.playerCharacter.sprite.drawSprite() 
    state.playerCharacter.sprite.calcCellFromXy()

    state.paused = false;
}

const setCharacterLocationInNewMap = ( previousMapName ) => {
    const currentMapData = state.currentMap.mapData
    const playerSprite = state.playerCharacter.sprite

    if ( state.currentMap.mapData.doors ) {
        const mapDoors = state.currentMap.mapData.doors

        for ( var i = 0; i < mapDoors.length; i++ ) {
            const door = mapDoors[i]

            if ( previousMapName === door.to) {
                const sfx = new Sound( "misc/random6.wav", true )
                sfx.play()
                setSpritePositionForNewMap(door)
            }
        }
    }
    if ( currentMapData.outdoors == true ) {
        for ( var adjacentMap in currentMapData.neighbours ) {
            setPositionFromNeighbour( playerSprite, currentMapData, previousMapName, adjacentMap );
        }
    }
}

const setSpritePositionForNewMap = (door) => {
    const doorXy = mapHelpers.getXYOfCell(door.row, door.col)
    if ( door.directionOut == "FACING_UP" ) {
        doorXy.y -= globals.GRID_BLOCK_PX
    }
    state.playerCharacter.sprite.initSpriteFromXy( doorXy )
    state.playerCharacter.sprite.direction = globals[door.directionOut]
 }

const setPositionFromNeighbour = ( playerSprite, currentMapData, previousMapName, adjacentMap  ) => {
    if ( currentMapData.neighbours[adjacentMap] == previousMapName ) {        
        if ( adjacentMap == "right") {
            playerSprite.initSpriteFromXy( { 'y': playerSprite.y, 'x': ( state.currentMap.borders.right + ( playerSprite.width * .5 ) ) } )               
        }

        if ( adjacentMap == "left") {
            playerSprite.initSpriteFromXy( { 'y': playerSprite.y, 'x': ( state.currentMap.borders.left - ( playerSprite.width * .5 ) ) } )          
        }

        if ( adjacentMap == "top") {
            playerSprite.initSpriteFromXy( { 'y': ( state.currentMap.borders.top + ( playerSprite.height * .5 ) ), 'x': playerSprite.x } )               
        }

        if ( adjacentMap == "bottom") {
            playerSprite.initSpriteFromXy( { 'y': ( state.currentMap.borders.bottom - ( playerSprite.height * .5 ) ), 'x': playerSprite.x } )          
        }
    } 
}

const stopMap = ( ) => {
    state.battleState.requestingBattle = false
    state.currentMap.mapMusic.stop()     
}

module.exports = {
    initMap,
    stopMap,
    switchMap
}