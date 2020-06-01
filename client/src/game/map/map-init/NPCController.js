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
            new NPC( { 'row': character.row, 'col': character.col }, character.sprite, 'CELL', globals[character.direction], character )
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
        this.hitbox.checkForActionRange( )
        this.handleNPCAnimation( )
    }

    handleNPCAnimation( ) {
        if ( this.type === "static" ) {
            this.handleStaticNPCAnimation( )
        }
        if ( this.type === "dynamic" ) {
            this.handleDynamicNPCAnimation( )
        }
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

    handleDynamicNPCAnimation() {
        this.getNextNPCPosition( )
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
    
                if ( index == pathLength ) {
                    this.nextPosition = this.path[0] 
                }
                else {
                    this.nextPosition = this.path[pathIterator]
                }
            }
        }
    
        this.direction = globals[this.nextPosition.direction]
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
        const NPC_speed = globals.MOVEMENT_SPEED * 0.5
        if ( this.nextPosition.direction == 'FACING_RIGHT' ) {
            this.x += NPC_speed        
        }
    
        if ( this.nextPosition.direction == 'FACING_LEFT' ) {
            this.x -= NPC_speed    
        }
        
        if ( this.nextPosition.direction == 'FACING_DOWN' ) {
            this.y += NPC_speed        
        }
    
        if ( this.nextPosition.direction == 'FACING_UP' ){
            this.y -= NPC_speed        
        }    
    
        if ( this.frameCount >= globals.FRAME_LIMIT) {
            this.frameCount = 0;
            this.animIterator++;
    
            if (this.animIterator >= this.animLoop.length) {
                this.animIterator = 0;
            }
        }
    }
}

module.exports = {
    generateCharacters,
    generateCharactersFromSave
}