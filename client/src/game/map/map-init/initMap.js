const state         = require('../../../game-data/state')
const globals = require('../../../game-data/globals')
const triggerEvent  = require('../../../game-data/triggerEvents').triggerEvent
const tilesheets        = require('../../../resources/tilesheetResources').sheets
const createCharInstance = require('../../createCharInstance')
const Sound         = require('../../interfaces/I_Sound').Sound
const NPCController           = require('./NPCController')
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
    drawGrid.generateMap( state.currentMap, tilesheets[state.currentMap.mapData.tileSet] )
    setTimeout(() => {
        state.currentMap.mapMusic.play() 
    }, 1000)
}

const initializeMap = ( mapData, BOOT_STATUS, setAttributes = true ) => {    
    globals.BACKGROUND.initGrid( mapData.rows, mapData.columns );
    globals.FOREGROUND.initGrid( mapData.rows, mapData.columns );

    const sheetData = tilesheets[mapData.tileSet];

    globals.BACKGROUND.setBackgroundData( mapData )
    globals.BACKGROUND.loadImageWithCallback( '/static/tilesets/' + sheetData.src, globals.BACKGROUND.drawMapFromGridData );
}


module.exports = {
    initializeMap,
    initMapFromBattle
}
