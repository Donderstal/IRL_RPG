const CharacterBlueprint      = require('./character/character-init/characterBlueprint').CharacterBlueprint
const initMapSprite = require('./map/map-init/mapSprite')

const getCharacter = ( className, name, playerStart, typeOfStart ) => {
    let mapSpritesFolder = '/static/sprites/';
    let spriteSrc = mapSpritesFolder + className.toLowerCase() + '.png'
    return {      
        stats : new CharacterBlueprint( name, className ),
        sprite : new initMapSprite.MapSprite( playerStart, spriteSrc, typeOfStart )               
    }
 
}

module.exports = {
    getCharacter
}