const { GRID_BLOCK_PX, CANVAS_WIDTH, CANVAS_HEIGHT, NPC_MOVE_TYPE_FLYING } = require('../../game-data/globals')
const canvas = require('../../helpers/canvasHelpers')
const mapControls = require('./mapControls');
const { Counter } = require('../../helpers/Counter');

const carCounter = new Counter( 5000, true );
const npcCounter = new Counter( 5000, true );
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

    GAME.BACK.backgroundActions.forEach( ( e ) => { 
        e.updateXy( e.x, e.y )
    })
    
    handleCarCounter(GAME)
    handleNpcCounter(GAME)
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

const handleCarCounter = ( GAME ) => {
    if ( GAME.FRONT.roads.length > 0 ) {
        if ( carCounter.countAndCheckLimit( ) ) {
            GAME.FRONT.generateCar( );
        }
    }
    else {
        carCounter.resetCounter( );
    }
}

const handleNpcCounter = ( GAME ) => {
    if ( GAME.activeMap.spawnPoints != undefined ) {
        if ( npcCounter.countAndCheckLimit( ) && GAME.activeMap.spawnPoints.length > 0) {
            GAME.FRONT.generateWalkingNPC( GAME.activeMap.spawnPoints );
        }
    }
    else {
        npcCounter.resetCounter( );
    }
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

    if ( GAME.debugMode ) {
        GAME.BACK.grid.array.forEach( ( tile ) => { 
            if ( tile.hasEvent ) {
                tile.event.updateXy( tile.event.x, tile.event.y );
            }
        })
    }

    const backgroundSprites = [];
    const standardSprites   = [];
    const foregroundSprites = [];
    const flyingSprites     = [];

    GAME.FRONT.allSprites.forEach( ( sprite )  => {
        if ( sprite.onBackground ) {
            backgroundSprites.push( sprite );
        }
        else if ( sprite.notGrounded ) {
            foregroundSprites.push( sprite );
        }
        else if ( sprite.movementType == NPC_MOVE_TYPE_FLYING && sprite.moving ) {
            flyingSprites.push( sprite );
        }
        else {
            standardSprites.push( sprite );
        }
    })
    
    if ( GAME.BACK.savepoint ) {
        GAME.BACK.savepoint.event.draw( )
    }
    
    drawSpritesInArray( backgroundSprites, GAME );
    drawSpritesInArray( standardSprites, GAME );
    drawSpritesInArray( foregroundSprites, GAME );
    drawSpritesInArray( flyingSprites, GAME );
}

const drawSpritesInArray = ( array, GAME ) => {
    if ( !GAME.paused ) {
        array.forEach( ( sprite ) => {
            if ( GAME.paused || sprite.deleted ) {
                return;
            }
            sprite.drawSprite( );
        })
    }
}

module.exports = {
    handleMapAnimations
}