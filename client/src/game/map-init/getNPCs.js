const GamePiece     = require('./initGamePiece')
const globals       = require('../../game-data/globals');
const actionHelpers    = require('../../helpers/actionHelpers');

/**
* EXPORT @function generateCharacters
 * 
 * @param {mapJson} currentMap - JSON of new map
 * 
 * Iterate over characters if they are present
 * 
 */
const generateCharacters = ( currentMap ) => {
    const characters = currentMap.mapData.characters
    if ( characters ) {
        characters.forEach( ( character ) => {
            pushCharacterActions( character, currentMap );
            const sprite = new NPC( character.row, character.col, character.sprite )
            sprite.direction = globals[character.direction]
            character.sprite = sprite
            pushCharacterSpriteToMapState( character, currentMap )
            sprite.calcXyFromCell( )
            pushCharacterCollision( character, currentMap )
        } )
    }
}

const pushCharacterCollision = ( character ) => {
    character.blocked = { 
        "BOTTOM": character.sprite.bottom,
        "LEFT": character.sprite.left,
        "RIGHT": character.sprite.right,
        "TOP": character.sprite.cell.y              
    }
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

const pushCharacterSpriteToMapState = ( character, currentMap ) => {
    if ( currentMap.NPCs ) {
        currentMap.NPCs.push( character  )        
    }
    else {
       currentMap.NPCs = [ character ]
    }
}

class NPC extends GamePiece.gamePiece {
    constructor( row, col, src ) {
        src = '/static/sprites/'+ src
        super( row, col, src )        
    }

    updateActionXy( NPCAction ) {
        let actionDirection;

        if ( this.direction === 0 ) {
            actionDirection = 'FACING_UP'
        }
        if ( this.direction === 1 ) {
            actionDirection = 'FACING_RIGHT'
        }
        if ( this.direction === 2 ) {
            actionDirection = 'FACING_LEFT'
        }
        if ( this.direction === 3 ) {
            actionDirection = 'FACING_DOWN'
        }

        NPCAction = actionHelpers.generateAction( 
            'UPDATE_NPC', 
            NPCAction, 
            { 'x': this.cell.x, 'y': this.cell.y }, 
            actionDirection 
        )
    }

    updateBlockedXy( ) {
        const newBlockedTile = { 
            "BOTTOM": this.bottom,
            "LEFT": this.left,
            "RIGHT": this.right,
            "TOP": this.cell.y              
        }
        
        return newBlockedTile
    }
}

module.exports = {
    generateCharacters
}