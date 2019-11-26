const initChar      = require('./character-init/initCharacter')
const initGamePiece = require('./map-init/initGamePiece')

const getCharacter = ( className, name, gender ) => {
    return {
        
        // entry point for creating a character
        // is called from GfxContainer.svelte

        stats : initChar.getCharWithClass( className, name ),
        sprite : new initGamePiece.gamePiece( 2, 1, '/static/sprites/neckbeard.png' )               
    }
 
}

module.exports = {
    getCharacter
}