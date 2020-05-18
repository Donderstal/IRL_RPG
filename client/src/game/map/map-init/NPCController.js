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
        toMapthis = new NPC( 
            { 'x': savedthis.x, 'y': savedthis.y }, 
            savedthis.sheetSrc, 'XY', savedthis.direction 
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
        this.type = action.type
        this.calcXyFromCell( )

        state.currentMap.NPCs.push( this )     
    }

    drawSprite( ) {
        super.drawSprite( )
        this.hitbox.checkForActionRange( )
        this.handleNPCAnimation( )
    }

    handleNPCAnimation( ) {
        this.handleStaticNPCAnimation( )
    }

    handleStaticNPCAnimation( ){
        this.frameCount++
        if ( this.frameCount >= ( globals.FRAME_LIMIT * 2 ) ) {
        
            this.frameCount = 0;
            if ( this.animIterator === 0 ) {
                this.animIterator = 1
            }
            else if ( this.animIterator === 1 ) {
                this.animIterator = 0
            }
        }   
    }
}

module.exports = {
    generateCharacters,
    generateCharactersFromSave
}