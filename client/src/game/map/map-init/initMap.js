const state         = require('../../../game-data/state')
const createCharInstance = require('../../createCharInstance')
const Sound         = require('../../interfaces/I_Sound').Sound
const NPCController           = require('./NPCController')
const setMapAttributes  = require('./setMapAttributes')
const drawGrid          = require('./drawGrid')
const util              = require('../../../helpers/utilFunctions')

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
        state.currentMap.NPCs = NPCController.generateCharactersFromSave( state.currentMap.NPCs )

        state.playerCharacter = createCharInstance.getCharacter( state.playerCharacter.className, state.playerCharacter.name, playerSpriteStart, 'XY' )
    }, 500)
}


const getMapAttributes = ( BOOT_STATUS ) => {
    setTimeout(() => {
        setMapAttributes.setMapAttributes( );        
        NPCController.generateCharacters( );
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
    util.fetchJSONWithCallback( '/static/tilesets/' + mapJson.tileSet + '/' + mapJson.tileSet + '.json', passTilesheet, BOOT_STATUS)
}

const passTilesheet = ( sheetJson, BOOT_STATUS ) => {
    console.log(BOOT_STATUS)
    drawGrid.generateMap( state.currentMap, sheetJson )    

    getMapMusic( BOOT_STATUS );
    
    ( BOOT_STATUS === "SAVE_GAME" ) ? getMapAttributesFromSave( BOOT_STATUS ) : getMapAttributes( BOOT_STATUS )
}


module.exports = {
    initializeMap,
    initMapFromBattle
}
