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
        this.hitbox = new MapAction( this.centerX( ), this.y, character.action );
        this.type = character.type
        this.action = character.action
        if ( character.type == "dynamic" ) {
            this.path = character.path
            this.lastPosition = character.lastPosition
        }
        this.calcXyFromCell( )

        state.currentMap.NPCs.push( this )     
    }

    drawSprite( ) {
        super.drawSprite( )
        this.hitbox.checkForActionRange( );
        
        ( this.inScriptedAnimation ) 
            ? this.doScriptedAnimation( ) 
            : this.handleNPCAnimation( )            
    }

    handleNPCAnimation( ) {
        if ( this.type === "static" ) {
            this.handleStaticNPCAnimation( )
        }
        if ( this.type === "dynamic" ) {
            this.setScriptedAnimation( anim.TURN_SINGLE_CIRCLE, true, globals.FRAME_LIMIT * .5, 4 )
            //this.handleDynamicNPCAnimation( )
        }
    }

    handleStaticNPCAnimation( ){
        this.frameCount++
        if ( this.frameCount >= ( globals.FRAME_LIMIT * 2 ) ) {
        
            this.frameCount = 0;
            this.sheetPosition = ( this.sheetPosition === 0 ) ? 1 : 0
        }   
    }

    handleDynamicNPCAnimation() {
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

    gotToNextDirection( ) {
        const NPC_speed = globals.MOVEMENT_SPEED * 0.5
        if ( this.nextPosition.row > this.row && this.nextPosition.col === this.col ) {
            this.y += NPC_speed  
            this.direction = globals["FACING_DOWN"]
        }
        if ( this.nextPosition.row < this.row && this.nextPosition.col === this.col ) {
            this.y -= NPC_speed    
            this.direction = globals["FACING_UP"]
        }
        if (this.nextPosition.col > this.col && this.nextPosition.row === this.row ) {
            this.x += NPC_speed    
            this.direction = globals["FACING_RIGHT"]
        }
        if ( this.nextPosition.col < this.col && this.nextPosition.row === this.row ) {
            this.x -= NPC_speed   
            this.direction = globals["FACING_LEFT"]
        }
    }

    checkForAnimationPath ( ) {
        this.calcCellFromXy()
    
        if ( this.nextPosition.row === this.row && this.nextPosition.col === this.col ) {
            this.lastPosition = this.nextPosition
            this.getNextNPCPosition( )
        }
    }

    countFrame ( ) {
        this.frameCount++;  
    
        if ( this.frameCount >= globals.FRAME_LIMIT) {
            this.frameCount = 0;
            this.sheetPosition++;
    
            if (this.sheetPosition >= 4) {
                this.sheetPosition = 0;
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