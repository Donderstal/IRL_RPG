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

const fetchMapJsonWithCallback = ( worldName, previousMap ) => {
    fetch('/static/maps/' + worldName +'.json')
        .then( (response) => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json()
        })
        .then( (json) => {
            state.currentMap.mapData = json;

            drawGrid.generateMap( state.currentMap, previousMap )

            if ( previousMap === "NO" ) {
                state.playerCharacter = createCharInstance.getCharacter( 'Neckbeard', 'John', state.currentMap.mapData.playerStart )     
            }
            else {
                initPlayerSpriteInNewMap()
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
    canvasHelpers.clearBothCanvases()

    fetchMapJsonWithCallback( newMap, oldMap )   
}


/**
 * EXPORT @function initPlayerSpriteInNewMap
 * 
 * call @clearEntireCanvas from canvasHelpers
 */
const initPlayerSpriteInNewMap = () => {
    canvasHelpers.clearBothCanvases()
    state.playerCharacter.sprite.calcXyFromCell()
    state.playerCharacter.sprite.drawSprite() 
    movementController.startPlayerMovement()
 }

module.exports = {
    fetchMapJsonWithCallback,
    initPlayerSpriteInNewMap,
    initNewMapAfterClearingOld
}
