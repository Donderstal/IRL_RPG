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
                initPlayerSpriteInNewMap(previousMap)
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
const initPlayerSpriteInNewMap = ( previousMap ) => {
    canvasHelpers.clearBothCanvases()
    console.log('before...')
    console.log(state.playerCharacter.sprite)
    setCharacterLocationInNewMap( previousMap  )
    state.playerCharacter.sprite.calcXyFromCell()
    state.playerCharacter.sprite.drawSprite() 
    movementController.startPlayerMovement()
    console.log(state)
 }

/**
 * @function setCharacterLocationInNewMap
 */
const setCharacterLocationInNewMap = ( previousMap ) => {
    const currentMapData = state.currentMap.mapData
    const playerSprite = state.playerCharacter.sprite

    if ( currentMapData.outdoors == true ) {

        for ( var adjacentMap in currentMapData.neighbours ) {
            console.log(adjacentMap)
            console.log( previousMap)
            console.log(currentMapData.neighbours)
            if ( currentMapData.neighbours[adjacentMap] == previousMap) {
                playerSprite.calcCellFromXy()
                console.log(adjacentMap )
                console.log(adjacentMap == "right")
                if ( adjacentMap == "right") {
                    console.log( 'right' )
                    playerSprite.setCell( { 'row': playerSprite.row, 'col': 24 } )                    
                }

                if ( adjacentMap == "left") {
                    console.log( 'left' )
                    playerSprite.setCell( { 'row': playerSprite.row, 'col': -1 } )                    
                }

            } 
        }
    }
}


module.exports = {
    fetchMapJsonWithCallback,
    initPlayerSpriteInNewMap,
    initNewMapAfterClearingOld
}
