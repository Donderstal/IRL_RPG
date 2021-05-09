const { GRID_BLOCK_PX, CANVAS_WIDTH, CANVAS_HEIGHT, NPC_MOVE_TYPE_FLYING } = require('../../game-data/globals')
const canvas = require('../../helpers/canvasHelpers')
const mapControls = require('./mapControls');
const { Counter } = require('../../helpers/Counter');

const carCounter = new Counter( 10000, true );
/**
 * Wrapper function that runs on each animation frame if the game is in Map mode.
 * Call drawSpritesInOrder() and clearMargins().
 * If there are roads on the current map, call handleCarGeneration()
 * If the game is not paused and there is a player sprite, check for movement key input
 * If there is a speech bubble active, draw it.
 * @param {Game} GAME Instance of the Game class in Game.js
 */
const handleMapAnimations = ( GAME ) => {
    drawSpritesInOrder( GAME )

    clearMargins( GAME );      
    
    if ( GAME.FRONT.roads.length > 0 ) {
        if ( carCounter.countAndCheckLimit( ) ) {
            GAME.FRONT.generateCar( );
        }
    }
    else {
        carCounter.resetCounter( );
    }

    if ( GAME.PLAYER != undefined && !GAME.paused && !GAME.bubbleIsActive ) {
        mapControls.handleMovementKeys( );  
    }

    GAME.PLAYER.pathIsBlocked = false;

    if ( GAME.bubbleIsActive ) {
        GAME.activeBubble.drawTextBox( )
    }

    GAME.FRONT.activeEffects.forEach( ( e ) => {
        e.drawAndMove( );
    })
}

/**
 * Clear the edges of the front canvas that are not currently in the active I_Grids' borders.
 * @param {Game} GAME Instance of the Game class in Game.js
 */
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
/**
 * First, sort GAME.FRONT.allSprites based on their location on the front canvas.
 * Then, clear the front Canvas.
 * Afterwards, draw allSprites in the sorted order, drawing flying sprites last. This gives the player the illusion of depth on the screen.
 * @param {Game} GAME Instance of the Game class in Game.js
 */
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
            if ( e.onBackground ) {
                e.drawSprite( );
            } 
        }) 

        GAME.FRONT.allSprites.forEach( (e) => {
            if ( GAME.paused || e.deleted ) {
                return;
            }
            if ( !e.onBackground && (e.spriteId == 'PLAYER' || !( e.movementType == NPC_MOVE_TYPE_FLYING && e.movingToDestination && !e.pathIsBlocked )) ) {
                e.drawSprite( );
            } else if ( e.movementType == NPC_MOVE_TYPE_FLYING ) {
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