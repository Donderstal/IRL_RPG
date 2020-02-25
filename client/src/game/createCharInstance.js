const initChar      = require('./character-init/initCharacter')
const initGamePiece = require('./map-init/initGamePiece')

const getCharacter = ( className, name, playerStart, typeOfStart ) => {
    return {
        
        // entry point for creating a character
        // is called from GfxContainer.svelte
        // posssible third property for usage in story state?
        
        stats : initChar.getCharWithClass( className, name ),
        sprite : new initGamePiece.gamePiece( playerStart, '/static/sprites/neckbeard.png', typeOfStart )               
    }
 
}

module.exports = {
    getCharacter
}