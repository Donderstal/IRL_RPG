const state         = require('../../../game-data/state')
const createCharInstance = require('../../createCharInstance')

const getNPCs           = require('./getNPCs')
const setMapAttributes  = require('./setMapAttributes')
const drawGrid          = require('./drawGrid')

const initializeMap = ( mapJson, previousMapName = null, savedState = null ) => {    
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
        if ( previousMapName == null ) {
            state.playerCharacter = createCharInstance.getCharacter( 'Neckbeard', 'Dildoboy', state.currentMap.mapData.playerStart, 'CELL' )
        } 
    }, 1000)
}

module.exports = {
    initializeMap
}
