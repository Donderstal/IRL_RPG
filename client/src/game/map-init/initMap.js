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
            canvasHelpers.clearBothCanvases()
            drawGrid.generateMap( state.currentMap, previousMap )

            if ( previousMap === "NO" ) {
                state.playerCharacter = createCharInstance.getCharacter( 'Influencer', 'Johanna', state.currentMap.mapData.playerStart )     
            }
            else {
                initPlayerSpriteInNewMap()
            }
    })    
}

/**
 * Get the loading screen, stop player controls and fetch the new map
 */
const initNewMapAfterClearingOld = ( newMap, oldMap ) => {
    canvasHelpers.getLoadingScreen()
    movementController.stopPlayerMovement()

    fetchMapJsonWithCallback( newMap, oldMap )   
}


/**
 * Call front and back canvas.
 * Update player sprite locations and draw.
 * Start player controls
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
