const MapSprite     = require('./mapSprite').MapSprite
const globals       = require('../../../game-data/globals');
const state         = require('../../../game-data/state')
const  anim         = require('../../../resources/animationResources')
const MapAction     = require('./setMapAttributes').MapAction

class NPC extends MapSprite {
    constructor( startPos, src, typeOfStart, spriteDirection = 0, character ) {
        if( src[0] != '/' ) {
            src = '/static/sprites/'+ src
        }
        super( startPos, src, typeOfStart, spriteDirection, true )   
        this.hitbox = new MapAction( this.centerX( ), this.y, character.action, character.name );
        this.type = character.type
        this.name = character.name
        this.action = character.action
        this.action.name = this.name
        if ( character.type == "walking" ) {
            this.path = character.path
            this.lastPosition = character.lastPosition
        }
        this.calcXyFromCell( )

        state.currentMap.NPCs.push( this )     
    }

    drawSprite( ) {
        super.drawSprite( )
        this.hitbox.checkForActionRange( );
        this.handleNPCAnimation( )  ;          
    }

    handleNPCAnimation( ) {
        if ( this.inScriptedAnimation ) {
            this.doScriptedAnimation( );
            return
        }
        if ( this.type === "idle" ) {
            this.handleIdleNPCAnimation( )
        }
        if ( this.type === "walking" ) {
            this.handleWalkingNPCAnimation( )
        }
    }

    handleIdleNPCAnimation( ){
        this.frameCount++
        if ( this.frameCount >= ( globals.FRAME_LIMIT * 2 ) ) {
        
            this.frameCount = 0;
            this.sheetPosition = ( this.sheetPosition === 0 ) ? 1 : 0
        }   
    }

    handleWalkingNPCAnimation() {
        this.getNextNPCPosition( )
        this.gotToNextDirection()
        this.countFrame( )
        this.checkForAnimationPath( )
    }

    getNextNPCPosition( ) {
        for ( var i = 0; i < this.path.length; i++ ) {
            let currentPath = this.path[i]
            
            if ( this.lastPosition.id == currentPath.id ) {
                let index = i
                let pathIterator = i + 1
                let pathLength = this.path.length -1

                this.nextPosition = ( index == pathLength ) ? this.path[0] : this.path[pathIterator]
            }
        }
    }
}

/** 
 * Iterate over characters if they are present
 * 
 */
const generateCharacters = ( ) => {
    const characters = state.currentMap.mapData.characters
    state.currentMap.NPCs = []

    if ( characters ) {
        characters.forEach( ( character ) => {
            new NPC( { 'row': character.row, 'col': character.col }, 
                character.sprite, 'CELL', 
                globals[character.direction], character 
            )
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

module.exports = {
    generateCharacters,
    generateCharactersFromSave
}