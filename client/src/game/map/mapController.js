const state         = require('../../game-data/state')
const globals       = require('../../game-data/globals')
const mapHelpers = require('../../helpers/mapHelpers')
const utility       = require('../../helpers/utilFunctions')
const canvasHelpers = require('../../helpers/canvasHelpers')
const Sound         = require('./../interfaces/I_Sound').Sound

const getMap = require('./map-init/initMap').initializeMap
const initMapFromBattle = require('./map-init/initMap').initMapFromBattle

let initializingMap = false;

const initMap = ( json, BOOT_STATUS ) =>{
    initializingMap = true

    if ( BOOT_STATUS == "FROM_BATTLE" ) {
        initMapFromBattle( )
    }
    else {
        getMap( json, BOOT_STATUS )        
    }


    setTimeout( ( ) => {
        initializingMap = false;
    }, 1000)
}

const switchMap = ( transition ) => {
    const urlToNewMap   = transition.urlToNewMap
    const oldMapName    = transition.oldMapName    

    if ( !initializingMap ) {
        canvasHelpers.clearBothCanvases();
        initNewMapAfterClearingOld(urlToNewMap, oldMapName)        
    }
}

const initNewMapAfterClearingOld = ( newMap, previousMapName ) => {
    initializingMap = true;
    state.currentMap.NPCs = []
    state.paused = true;
    utility.fetchJSONWithCallback( '/static/maps/' + newMap +'.json', initMap, "MAP_TO_MAP" )

    setTimeout( () => {
        initPlayerSpriteInNewMap( previousMapName )
        state.transitioning = false;
    }, 660)
}

const initPlayerSpriteInNewMap = ( previousMapName ) => {
    setCharacterLocationInNewMap( previousMapName )
    state.playerCharacter.sprite.drawSprite() 
    
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