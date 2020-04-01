const state         = require('../../../game-data/state')
const canvasHelpers = require('../../../helpers/canvasHelpers')
const createCharInstance = require('../../createCharInstance')

const getNPCs           = require('./getNPCs')
const setMapAttributes  = require('./setMapAttributes')
const drawGrid          = require('./drawGrid')

const initializeMap = ( mapJson, previousMapName = null, savedState = null ) => {    
    canvasHelpers.clearBothCanvases();
    state.currentMap.mapData = mapJson;
    state.currentMap.blockedXyValues = []    
    drawGrid.generateMap( state.currentMap )    

    if ( state.currentMap.mapMusic && !state.currentMap.mapMusic.sound.src.includes(state.currentMap.mapData.music) ) {
        state.currentMap.mapMusic.stop()  
    }
    
    ( previousMapName === "SAVE_GAME" ) ? getMapAttributesFromSave( savedState ) : getMapAttributes( previousMapName )
}

const getMapAttributesFromSave = ( savedGame ) => {
    const playerSpriteStart = { 'x' : savedGame.playerCharacter.sprite.x, 'y' : savedGame.playerCharacter.sprite.y }
    setTimeout( ( ) => {
        state.currentMap.doors = savedGame.currentMap.doors
        state.currentMap.mapActions = savedGame.currentMap.mapActions
        state.currentMap.NPCs = getNPCs.generateCharactersFromSave( savedGame.currentMap.NPCs )

        state.playerCharacter = createCharInstance.getCharacter( 'Neckbeard', 'Dildoboy', playerSpriteStart, 'XY' )
    }, 500)
}


const getMapAttributes = ( previousMapName ) => {
    setTimeout(() => {
        getNPCs.generateCharacters( );
        setMapAttributes.setMapAttributes( previousMapName );
    }, 500)

    setTimeout(() => {
        if ( previousMapName != null ) {
            initPlayerSpriteInNewMap( previousMapName )
        }     
        else {
            state.playerCharacter = createCharInstance.getCharacter( 'Neckbeard', 'Dildoboy', state.currentMap.mapData.playerStart, 'CELL' )
        } 
    }, 1000)
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

module.exports = {
    initializeMap,
    initPlayerSpriteInNewMap
}
