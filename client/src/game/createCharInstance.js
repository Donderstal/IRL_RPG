const initChar      = require('./character-init/initCharacter')
const initGamePiece = require('./overworld-init/initGamePiece')
const globals       = require('../game-data/globals')

const getCharacter = ( className, name, gender ) => {
    return {
        
        // entry point for creating a character
        // is called from GfxContainer.svelte

        characterState : initChar.getCharWithClass( className, name, gender ),
        characterPiece : initGamePiece.initGamePiece(globals.GRID_BLOCK_PX)               
    }
 
}

module.exports = {
    getCharacter
}