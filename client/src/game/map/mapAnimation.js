const globals = require('../../game-data/globals')
const { GRID_BLOCK_PX, CANVAS_WIDTH, CANVAS_HEIGHT, NPC_MOVE_TYPE_FLYING } = require('../../game-data/globals')
const canvas = require('../../helpers/canvasHelpers')
const mapControls = require('./mapControls')

let carGenerationLimit = 10000;
let randomCarLimit = 0;
let millisecondCounter = 0;

let lastTimeStamp = 0;
let newTimeStamp = 0;

const handleMapAnimations = ( GAME ) => {

    drawSpritesInOrder( GAME )

    clearMargins( GAME );      
    
    if ( GAME.FRONT.roads.length > 0 ) {
        handleCarGeneration( GAME );
    }

    if ( GAME.PLAYER != undefined && !GAME.paused ) {
        mapControls.handleMovementKeys( );  
    }

    GAME.PLAYER.pathIsBlocked = false;

    if ( GAME.bubbleIsActive ) {
        GAME.activeBubble.drawTextBox( )
    }
}

const handleCarGeneration = ( GAME ) => {
    let addDifferenceToCounter = false;

    if ( randomCarLimit == 0 ) {
        randomCarLimit = Math.ceil(Math.random( ) * carGenerationLimit )
    }

    if ( newTimeStamp != 0 ) {
        lastTimeStamp = newTimeStamp
        addDifferenceToCounter = true
    }

    newTimeStamp = Date.now( );

    if ( addDifferenceToCounter ) {
        millisecondCounter += ( newTimeStamp - lastTimeStamp );
    }

    if ( millisecondCounter > randomCarLimit ) {
        GAME.FRONT.generateCar( );
        millisecondCounter = 0;
        randomCarLimit = 0;
    }
}

const clearMargins = ( GAME ) => {
    const grid = GAME.FRONT.grid;
    const overflowX = ( grid.overflowColumns * GRID_BLOCK_PX ) / 2
    const overflowY = ( grid.overflowRows * GRID_BLOCK_PX ) / 2 
    GAME.front.ctx.clearRect( 
        0, 0, 
        overflowX, CANVAS_HEIGHT 
        );
    GAME.front.ctx.clearRect( 
        overflowX + ( grid.columns * GRID_BLOCK_PX ), 0, 
        overflowX, CANVAS_HEIGHT 
    );
    GAME.front.ctx.clearRect( 
        0, 0, 
        CANVAS_WIDTH, overflowY 
    );
    GAME.front.ctx.clearRect( 
        0, overflowY + ( grid.rows * GRID_BLOCK_PX ), 
        CANVAS_WIDTH, overflowY
    );
}

const drawSpritesInOrder = ( GAME ) => {
    GAME.FRONT.allSprites.sort( ( a, b ) => {
        if ( a.row > b.row || a.row === b.row && a.y > b.y ) {
            return 1 
        }
        else if (b.row > a.row || b.row === a.row && b.y > a.y ) {
            return -1
        }
        else {
            return 0
        }          
    })

    canvas.clearEntireCanvas("FRONT")

    const flyingSprites = []
    if ( !GAME.paused ) {
        GAME.FRONT.allSprites.forEach( (e) => {
            if ( GAME.paused || e.deleted ) {
                return;
            }
            if ( e.spriteId == 'PLAYER' || !( e.movementAnimation == NPC_MOVE_TYPE_FLYING && e.movingToDestination && !e.pathIsBlocked ) ) {
                e.drawSprite( );
            } else if ( e.movementAnimation == NPC_MOVE_TYPE_FLYING ) {
                flyingSprites.push( e );     
            }
        })      

        flyingSprites.forEach( ( e ) => {
            e.drawSprite( );
        })
    } 
}

module.exports = {
    handleMapAnimations
}