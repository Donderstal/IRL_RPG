const initChar      = require('./character-init/initCharacter')
const initGamePiece = require('./overworld-init/initGamePiece')

module.exports = {
    getCharacter : ( className, name, gender ) => {
        return {
            
            // entry point for creating a character
            // is called from GfxContainer.svelte
            

            characterState : initChar.getCharWithClass( className, name, gender ),
            characterPiece : initGamePiece.initGamePiece(37, 37, 37)               
        }
     
    }

}