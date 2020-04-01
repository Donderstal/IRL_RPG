const state         = require('../../../game-data/state')
const createCharInstance = require('../../createCharInstance')
const Sound         = require('../../interfaces/I_Sound').Sound
const getNPCs           = require('./getNPCs')
const setMapAttributes  = require('./setMapAttributes')
const drawGrid          = require('./drawGrid')

const getMapMusic = ( ) => {
    if ( state.currentMap.mapMusic && !state.currentMap.mapMusic.sound.src.includes(state.currentMap.mapData.music) ) {
        state.currentMap.mapMusic.stop()  
    }
    if ( !state.currentMap.mapMusic || !state.currentMap.mapMusic.sound.src.includes(state.currentMap.mapData.music) ) {
        state.currentMap.mapMusic = new Sound(state.currentMap.mapData.music)     
        state.currentMap.mapMusic.play()  
    }
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


const initializeMap = ( mapJson, previousMapName = null, savedState = null ) => {    
    state.currentMap.mapData = mapJson;
    state.currentMap.blockedXyValues = []    
    drawGrid.generateMap( state.currentMap )    

    getMapMusic();
    
    ( previousMapName === "SAVE_GAME" ) ? getMapAttributesFromSave( savedState ) : getMapAttributes( previousMapName )
}


module.exports = {
    initializeMap
}
