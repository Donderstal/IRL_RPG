const MapSprite     = require('./mapSprite').MapSprite
const globals       = require('../../../game-data/globals');
const actionHelpers = require('../../../helpers/actionHelpers');
const state         = require('../../../game-data/state')

/** 
 * Iterate over characters if they are present
 * 
 */
const generateCharacters = ( ) => {
    const characters = state.currentMap.mapData.characters

    if ( characters ) {
        characters.forEach( ( character ) => {
            const sprite = new NPC( { 'row': character.row, 'col': character.col }, character.sprite, 'CELL' )
            pushCharacterActions( character );
            sprite.direction = globals[character.direction]
            character.sprite = sprite
            pushCharacterSpriteToMapState( character )
            sprite.calcXyFromCell( )
        } )
    }
}

const generateCharactersFromSave = ( savedNPCs ) => {
    let newNPCs = []
    savedNPCs.forEach( ( savedNPC ) => {
        let toMapNPC = { ...savedNPC }  
        toMapNPC.sprite = new NPC( 
            { 'x': savedNPC.sprite.x, 'y': savedNPC.sprite.y }, 
            savedNPC.sprite.sheetSrc, 'XY', savedNPC.sprite.direction 
        )

        newNPCs.push(toMapNPC)
    } )

    return newNPCs
}

const pushCharacterActions = ( character ) => {
    if ( character.action ) {
        let currentAction = { 
            "row": character.row, 
            "col": character.col,
            ...character.action
        }

        character.action = actionHelpers.generateAction( 'NPC', currentAction )
    }
}

const pushCharacterSpriteToMapState = ( character ) => {
    if ( state.currentMap.NPCs ) {
        state.currentMap.NPCs.push( character  )        
    }
    else {
        state.currentMap.NPCs = [ character ]
    }
}

class NPC extends MapSprite {
    constructor( startPos, src, typeOfStart, spriteDirection = 0 ) {
        if( src[0] != '/' ) {
            src = '/static/sprites/'+ src
        }
        super( startPos, src, typeOfStart, spriteDirection )        
    }

}

module.exports = {
    generateCharacters,
    generateCharactersFromSave
}