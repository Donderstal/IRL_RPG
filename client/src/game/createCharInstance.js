const initChar      = require('./character-init/initCharacter')
const initGamePiece = require('./map-init/initGamePiece')

const getCharacter = ( className, name, gender ) => {
    return {
        
        // entry point for creating a character
        // is called from GfxContainer.svelte

        characterState : initChar.getCharWithClass( className, name, gender ),
        characterPiece : new initGamePiece.gamePiece( )               
    }
 
}

module.exports = {
    getCharacter
}