const state         = require('../../../game-data/state')
const createCharInstance = require('../../createCharInstance')
const Sound         = require('../../interfaces/I_Sound').Sound
const getNPCs           = require('./getNPCs')
const setMapAttributes  = require('./setMapAttributes')
const drawGrid          = require('./drawGrid')

const getMapMusic = ( BOOT_STATUS ) => {
    if ( BOOT_STATUS == "NEW_GAME" || BOOT_STATUS == "SAVE_GAME" ) {
        state.currentMap.mapMusic = new Sound(state.currentMap.mapData.music)     
        state.currentMap.mapMusic.play()  
    }        
    else if ( BOOT_STATUS == "DOOR" ) {
        state.currentMap.mapMusic.stop() 
        state.currentMap.mapMusic = new Sound(state.currentMap.mapData.music)     
        state.currentMap.mapMusic.play()      
    }
}

const getMapAttributesFromSave = ( ) => {
    const playerSpriteStart = { 'x' : state.playerCharacter.sprite.x, 'y' : state.playerCharacter.sprite.y }
    setTimeout( ( ) => {
        state.currentMap.NPCs = getNPCs.generateCharactersFromSave( state.currentMap.NPCs )

        state.playerCharacter = createCharInstance.getCharacter( state.playerCharacter.className, state.playerCharacter.name, playerSpriteStart, 'XY' )
    }, 500)
}


const getMapAttributes = ( BOOT_STATUS ) => {
    setTimeout(() => {
        getNPCs.generateCharacters( );
        setMapAttributes.setMapAttributes( );
    }, 500)

    setTimeout(() => {
        if ( BOOT_STATUS == "NEW_GAME" ) {
            state.playerCharacter = createCharInstance.getCharacter( 
                state.playerCharacter.className, state.playerCharacter.name, 
                state.currentMap.mapData.playerStart, 'CELL' 
            )
        } 
    }, 1000)
}

const initMapFromBattle = ( ) => {
    drawGrid.generateMap( state.currentMap )
    setTimeout(() => {
        state.currentMap.mapMusic.play() 
    }, 1000)
}

const initializeMap = ( mapJson, BOOT_STATUS ) => {    
    state.currentMap.mapData = mapJson;
    state.currentMap.blockedXyValues = []    
    drawGrid.generateMap( state.currentMap )    

    getMapMusic( BOOT_STATUS );
    
    ( BOOT_STATUS === "SAVE_GAME" ) ? getMapAttributesFromSave( BOOT_STATUS ) : getMapAttributes( BOOT_STATUS )
}


module.exports = {
    initializeMap,
    initMapFromBattle
}
