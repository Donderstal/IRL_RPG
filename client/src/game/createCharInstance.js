const CharacterBlueprint      = require('./character/character-init/characterBlueprint').CharacterBlueprint
const initMapSprite = require('./map/map-init/mapSprite')

const getCharacter = ( className, name, playerStart, typeOfStart ) => {
    return {
        
        // entry point for creating a character
        // is called from GfxContainer.svelte
        // posssible third property for usage in story state?
        
        stats : new CharacterBlueprint( name, className ),
        sprite : new initMapSprite.MapSprite( playerStart, '/static/sprites/neckbeard.png', typeOfStart )               
    }
 
}

module.exports = {
    getCharacter
}