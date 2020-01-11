const state         = require('../../game-data/state')
const drawGrid      = require('./drawGrid')
const canvasHelpers = require('../../helpers/canvasHelpers')
const createCharInstance = require('../createCharInstance')
const movementController = require('../map-ui/movementController')

/** 
 * EXPORTED @function fetchMapJsonWithCallback
 * Fetch JSON file with data based on path relative to Maps folder
 * 
 * @param {string} worldName - Name of Map written as follows: 'path/to/Map'
 * @callback generateMap - Start Map rendering with JSON data when fetch succeeds
 */

const fetchMapJsonWithCallback = ( worldName, previousMapName  ) => {
    fetch('/static/maps/' + worldName +'.json')
        .then( (response) => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json()
        })
        .then( (json) => {
            state.currentMap.mapData = json;
            canvasHelpers.clearBothCanvases()
            drawGrid.generateMap( state.currentMap, previousMapName  )

            if ( previousMapName  === "NO" ) {
                state.playerCharacter = createCharInstance.getCharacter( 'Influencer', 'Johanna', state.currentMap.mapData.playerStart )     
            }
            else {
                initPlayerSpriteInNewMap(previousMapName )
            }
    })    
}

/**
 * EXPORT @function initNewMapAfterClearingOld
 * 
 * Call @stopMovementAndKeyListen from utilFunctions
 * Call @clearBothCanvases from @namespace canvasHelpers
 * Get the loading screen
 * Then fetch the new map
 */
const initNewMapAfterClearingOld = ( newMap, oldMap ) => {
    canvasHelpers.getLoadingScreen()
    movementController.stopPlayerMovement()

    fetchMapJsonWithCallback( newMap, oldMap )   
}


/**
 * EXPORT @function initPlayerSpriteInNewMap
 * 
 * call @clearEntireCanvas from canvasHelpers
 */
const initPlayerSpriteInNewMap = ( previousMapName ) => {

    canvasHelpers.clearBothCanvases()

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
    fetchMapJsonWithCallback,
    initPlayerSpriteInNewMap,
    initNewMapAfterClearingOld
}
