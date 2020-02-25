const GamePiece     = require('./initGamePiece')
const globals       = require('../../game-data/globals');
const actionHelpers    = require('../../helpers/actionHelpers');
const state         = require('../../game-data/state')

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
            pushCharacterCollision( character )
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

const pushCharacterSpriteToMapState = ( character ) => {
    if ( state.currentMap.NPCs ) {
        state.currentMap.NPCs.push( character  )        
    }
    else {
        state.currentMap.NPCs = [ character ]
    }
}

class NPC extends GamePiece.gamePiece {
    constructor( startPos, src, typeOfStart, spriteDirection = 0 ) {
        if( src[0] != '/' ) {
            src = '/static/sprites/'+ src
        }
        super( startPos, src, typeOfStart, spriteDirection )        
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
    generateCharacters,
    generateCharactersFromSave
}