const state = require('../../game-data/state')
const utilFunctions = require('../../helpers/utilFunctions')
const initMap = require('../map-init/initMap')
const mapHelpers = require('../../helpers/mapHelpers')
const canvasHelpers = require('../../helpers/canvasHelpers')
const globals = require('../../game-data/globals')

let newMap;
let oldMap;


/**
 * EXPORT @function checkIfDoor
 * 
 * @param {string} direction - string representing direction
 * @param {object} sprite - instance of the GamePiece class from initGamePiece.js
 * 
 * Render new map if player is passing through
 */

const checkIfDoor = ( sprite, direction ) => {
    const doors = state.currentMap.doors

    const spriteGridLocation = mapHelpers.getCellOfXY( ( sprite.x + ( sprite.width / 2 ) ), ( sprite.y + ( sprite.height / 3 ) ) )
    for( var i = 0; i < doors.length; i++ ) {
        const currentDoor = doors[i]
        if ( currentDoor.row === spriteGridLocation.row 
            && currentDoor.col === spriteGridLocation.col 
            && !currentDoor.locked 
            && direction === currentDoor.directionIn) {

            newMap = currentDoor.to 
            oldMap = state.currentMap.mapData.mapName

            return true
        }
    }
}

/**
 * EXPORT @function getNewMap
 * 
 * Master function for generating a map after door entry
 */
const getNewMap = ( ) => {
    utilFunctions.stopMovementAndKeyListen()
    state.playerCharacter.sprite.clearSprite()
    canvasHelpers.clearBothCanvases()
    canvasHelpers.getLoadingScreen()

    initMap.fetchMapJsonWithCallback( newMap, oldMap )   
}    

/**
 * EXPORT @function initPlayerSpriteInNewMap
 */

 const initPlayerSpriteInNewMap = () => {
    canvasHelpers.clearEntireCanvas( "FRONT" )
    state.playerCharacter.sprite.calcXyFromCell()
    state.playerCharacter.sprite.drawSprite() 
    utilFunctions.startMovementAndKeyListen()
 }

 /**
  * EXPORT @function getDoors
  */

const getDoors = ( previousMap ) => {
    state.currentMap.doors = []
    const mapDoors = state.currentMap.mapData.doors

    for ( var i = 0; i < mapDoors.length; i++ ) {

        const door = mapDoors[i]
        const doorXy = mapHelpers.getXYOfCell( door.row, door.col )
        door.x = doorXy.x
        door.y = doorXy.y
        state.currentMap.doors.push(
            {...door}
        )

        if ( previousMap === door.to) {
            state.playerCharacter.sprite.setCell( { 'row': door.row, 'col': door.col } )
            state.playerCharacter.sprite.direction = globals[door.directionOut]
        }

    }
}


module.exports = {
    checkIfDoor,
    getNewMap,
    initPlayerSpriteInNewMap,
    getDoors
}
