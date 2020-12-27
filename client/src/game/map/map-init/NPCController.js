const MapSprite     = require('./mapSprite').MapSprite
const globals       = require('../../../game-data/globals');
const state         = require('../../../game-data/state')
const MapAction     = require('./setMapAttributes').MapAction

class NPC extends MapSprite {
    constructor( tile ) {
        const hasAction = ( tile.spriteData.action !== undefined );
        let src = '/static/sprites/'+ tile.spriteData.sprite;
        super( tile, "STRD", src )   
        
        this.type = tile.spriteData.type
        this.name = tile.spriteData.name

        if ( hasAction ) {
            this.hitbox = new MapAction( this.centerX( ), this.y, tile.spriteData.action, tile.spriteData.name );
            this.action = tile.spriteData.action
            this.action.name = this.name
        }

        if ( tile.spriteData.type == "walking" ) {
            this.path = tile.spriteData.path
            this.lastPosition = tile.spriteData.lastPosition
        }
    }

    drawSprite( ) {
        super.drawSprite( )
        
        if ( !this.inScriptedAnimation && !this.inMovementAnimation ) {
            this.handleNPCAnimation( );                      
        }
    }

    handleNPCAnimation( ) {
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

    gotToNextDirection( countFrame = true) {
        const NPC_speed = globals.MOVEMENT_SPEED * .5;
        if ( this.nextPosition.row > this.row ) {
            this.y += NPC_speed  
            this.direction = globals["FACING_DOWN"]
        }
        if ( this.nextPosition.row < this.row ) {
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

        if ( countFrame ) {
            this.countFrame( );
        }
    }

    checkForAnimationPath ( ) {
        const cell = globals.GAME.front.class.getTileAtXY( this.centerX( ), this.baseY( ) );
        this.row = cell.row;
        this.col = cell.col
    
        if ( this.nextPosition.row === this.row && this.nextPosition.col === this.col ) {
            this.lastPosition = this.nextPosition
            this.getNextNPCPosition( )
        }
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

    handleWalkingNPCAnimation( ) {
        this.getNextNPCPosition( );

        if ( !this.pathIsBlocked ) {
            this.gotToNextDirection( );            
        } else {
            this.sheetPosition = 0;
        }

        this.checkForAnimationPath( );
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
    generateCharactersFromSave,
    NPC
}