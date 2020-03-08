const initChar      = require('./character-init/initCharacter')
const initMapSprite = require('./map-init/initMapSprite')

const getCharacter = ( className, name, playerStart, typeOfStart ) => {
    return {
        
        // entry point for creating a character
        // is called from GfxContainer.svelte
        // posssible third property for usage in story state?
        
        stats : initChar.getCharWithClass( className, name ),
        sprite : new initMapSprite.MapSprite( playerStart, '/static/sprites/neckbeard.png', typeOfStart )               
    }
 
}

module.exports = {
    getCharacter
}