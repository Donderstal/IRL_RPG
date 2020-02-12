const state         = require('../../game-data/state')
const globals = require('../../game-data/globals')

/**
 * 
 */
const NPCController = () => {
    if ( state.currentMap.NPCs ) {
        state.currentMap.NPCs.forEach( ( NPC) => {
            pushJsonNPCToState(NPC)
        })        
    }
}

const pushJsonNPCToState = ( NPC ) => {
    if ( NPC.type === "static" ) {
        handleStaticNPCAnimation( NPC )
    }
    if ( NPC.type === "dynamic" ) {
        handleDynamicNPCAnimation( NPC )
    }
    state.currentMap.layeredSprites.push( NPC.sprite )   
}

const handleStaticNPCAnimation = ( NPC ) => {
    NPC.sprite.frameCount++
    if ( NPC.sprite.frameCount >= ( globals.FRAME_LIMIT * 2 ) ) {
    
        NPC.sprite.frameCount = 0;
        if ( NPC.sprite.animIterator === 0 ) {
            NPC.sprite.animIterator = 1
        }
        else if ( NPC.sprite.animIterator === 1 ) {
            NPC.sprite.animIterator = 0
        }

    }
       
}

const handleDynamicNPCAnimation = ( NPC ) => {
    getNextNPCPosition( NPC )
    countFrame( NPC )

    checkForAnimationPath( NPC )

    NPC.blocked = NPC.sprite.updateBlockedXy( )
    NPC.sprite.updateActionXy( NPC.action )
}

const checkForAnimationPath =  ( NPC ) => {
    NPC.sprite.calcCellFromXy()

    if ( NPC.nextPosition.row === NPC.sprite.row && NPC.nextPosition.col === NPC.sprite.col ) {
        NPC.lastPosition = NPC.nextPosition
        getNextNPCPosition( NPC )
    }
}

const getNextNPCPosition = ( NPC ) => {
    for ( var i = 0; i < NPC.path.length; i++ ) {
        let currentPath = NPC.path[i]
        
        if ( NPC.lastPosition.id == currentPath.id ) {
            let index = i
            let pathIterator = i + 1
            let pathLength = NPC.path.length -1

            if ( index == pathLength ) {
                NPC.nextPosition = NPC.path[0] 
            }
            else {
                NPC.nextPosition = NPC.path[pathIterator]
            }
        }
    }

    NPC.sprite.direction = globals[NPC.nextPosition.direction]
}

const countFrame = ( NPC ) => {
    NPC.sprite.frameCount++;
    const NPC_speed = globals.MOVEMENT_SPEED * 0.5
    if ( NPC.nextPosition.direction == 'FACING_RIGHT' ) {
        NPC.sprite.x += NPC_speed        
    }

    if ( NPC.nextPosition.direction == 'FACING_LEFT' ) {
        NPC.sprite.x -= NPC_speed    
    }
    
    if ( NPC.nextPosition.direction == 'FACING_DOWN' ) {
        NPC.sprite.y += NPC_speed        
    }

    if ( NPC.nextPosition.direction == 'FACING_UP' ){
        NPC.sprite.y -= NPC_speed        
    }    

    NPC.sprite.updateSpriteBorders( )
    NPC.sprite.updateSpriteCellXy( )

    if ( NPC.sprite.frameCount >= globals.FRAME_LIMIT) {
        NPC.sprite.frameCount = 0;
        NPC.sprite.animIterator++;

        if (NPC.sprite.animIterator >= NPC.sprite.animLoop.length) {
            NPC.sprite.animIterator = 0;
        }
    }
}

module.exports = {
    NPCController
}