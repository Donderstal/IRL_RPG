const state         = require('../../game-data/state')
const drawGrid      = require('./drawGrid')
const canvasHelpers = require('../../helpers/canvasHelpers')
const soundHelper   = require('../../helpers/soundHelpers')
const utility       = require('../../helpers/utilFunctions')
const soundClass    = soundHelper.soundClass
const createCharInstance = require('../createCharInstance')
const movementController = require('../map-ui/movementController')

const initializeMap = ( mapJson, previousMapName ) => {
    state.currentMap.mapData = mapJson;
    canvasHelpers.clearBothCanvases()

    if ( state.currentMap.mapMusic && !state.currentMap.mapMusic.sound.src.includes(state.currentMap.mapData.music) ) {
        state.currentMap.mapMusic.stop()  
    }

    setTimeout(() => {
        drawGrid.generateMap( state.currentMap, previousMapName  )               
    }, 500)

    setTimeout(() => {
        if ( !state.currentMap.mapMusic || !state.currentMap.mapMusic.sound.src.includes(state.currentMap.mapData.music) ) {
            state.currentMap.mapMusic = new soundClass(state.currentMap.mapData.music)     
            state.currentMap.mapMusic.play()         
        }

        if ( previousMapName  === null ) {
            state.playerCharacter = createCharInstance.getCharacter( 'Influencer', 'Johanna', state.currentMap.mapData.playerStart )     
        }
        else {
            initPlayerSpriteInNewMap(previousMapName )
        }          
    }, 1000)
}

/**
 * Get the loading screen, stop player controls and fetch the new map
 */
const initNewMapAfterClearingOld = ( newMap, oldMap ) => {
    canvasHelpers.getLoadingScreen()
    state.currentMap.NPCs = []
    movementController.stopPlayerMovement()

    utility.fetchJSONWithCallback( '/static/maps/' + newMap +'.json', initializeMap, oldMap )
}


/**
 * Call front and back canvas.
 * Update player sprite locations and draw.
 * Start player controls
 */
const initPlayerSpriteInNewMap = ( previousMapName ) => {
    setCharacterLocationInNewMap( previousMapName )
    state.playerCharacter.sprite.calcXyFromCell()
    state.playerCharacter.sprite.drawSprite() 
    
    movementController.startPlayerMovement()
 }

/**
 * @function setCharacterLocationInNewMap
 */
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

module.exports = {
    initializeMap,
    initPlayerSpriteInNewMap,
    initNewMapAfterClearingOld
}
