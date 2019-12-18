const state         = require('../../game-data/state')
const globals = require('../../game-data/globals')

let NPC_FrameCount = 0;

const NPCController = () => {
    if ( state.currentMap.mapData.NPCs ) {
        state.currentMap.mapData.NPCs.forEach( ( NPC) => {
            pushJsonNPCToState(NPC)
        })        
    }
}

const pushJsonNPCToState = ( NPC ) => {
    if ( NPC.type === "static" ) {
        state.currentMap.layeredSprites.push( NPC.sprite )        
    }
    if ( NPC.type === "dynamic" ) {
        handleNPCAnimation( NPC )
    }
}

const handleNPCAnimation = ( NPC ) => {
    getNextNPCPosition( NPC )
    countFrame( NPC )

    checkForAnimationPath( NPC )
    state.currentMap.layeredSprites.push( NPC.sprite )
}

const checkForAnimationPath =  (NPC ) => {
    NPC.sprite.calcCellFromXy()

    if ( NPC.nextPosition.row === NPC.sprite.row && NPC.nextPosition.col === NPC.sprite.col ) {
        NPC.lastPosition = NPC.nextPosition
        getNextNPCPosition(NPC)
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
    NPC.sprite.clearSprite()
    NPC_FrameCount++;
    const NPC_speed = globals.MOVEMENT_SPEED / 2
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

    if ( NPC_FrameCount >= globals.FRAME_LIMIT) {
        
        NPC_FrameCount = 0;
        NPC.sprite.animIterator++;

        if (NPC.sprite.animIterator >= NPC.sprite.animLoop.length) {
            NPC.sprite.animIterator = 0;
        }
    }
}

module.exports = {
    NPCController
}