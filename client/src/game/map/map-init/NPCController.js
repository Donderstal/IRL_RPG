const MapSprite     = require('./mapSprite').MapSprite
const globals       = require('../../../game-data/globals');
const state         = require('../../../game-data/state')
const MapAction     = require('./setMapAttributes').MapAction

/** 
 * Iterate over characters if they are present
 * 
 */
const generateCharacters = ( ) => {
    const characters = state.currentMap.mapData.characters
    state.currentMap.NPCs = []

    if ( characters ) {
        characters.forEach( ( character ) => {
            new NPC( { 'row': character.row, 'col': character.col }, character.sprite, 'CELL', globals[character.direction], character.action )
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

class NPC extends MapSprite {
    constructor( startPos, src, typeOfStart, spriteDirection = 0, action ) {
        if( src[0] != '/' ) {
            src = '/static/sprites/'+ src
        }
        super( startPos, src, typeOfStart, spriteDirection, true )   
        
        this.hitbox = new MapAction( this.centerX( ), this.y, action );
        this.calcXyFromCell( )

        state.currentMap.NPCs.push( this )     
    }

    drawSprite( ) {
        super.drawSprite( )
        this.hitbox.checkForActionRange( )
    }
}

module.exports = {
    generateCharacters,
    generateCharactersFromSave
}