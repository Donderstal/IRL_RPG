const { EVENT_DOOR } = require('../../game-data/conditionGlobals');
const { GRID_BLOCK_PX, CANVAS_WIDTH, CANVAS_HEIGHT, NPC_MOVE_TYPE_FLYING, STATE_MOVING, DISPLAY_MODE_PORTRAIT } = require('../../game-data/globals')
const canvas = require('../../helpers/canvasHelpers');
const { tryCatch } = require('../../helpers/errorHelpers');
const mapControls = require('./mapControls');

/**
 * Wrapper function that runs on each animation frame if the game is in Map mode.
 * Call drawSpritesInOrder() and clearMargins().
 * If there are roads on the current map, call handleCarGeneration()
 * If the game is not paused and there is a player sprite, check for movement key input
 * If there is a speech bubble active, draw it.
 * @param {Game} GAME Instance of the Game class in Game.js
 */
const handleMapAnimations = ( GAME ) => {
    const PLAYER = GAME.PLAYER;
    canvas.clearEntireCanvas("FRONT");

    if ( DISPLAY_MODE_PORTRAIT ) {
        canvas.clearEntireCanvas("SPEECH");
    }

    drawSpritesInOrder( GAME )

    clearMargins( GAME );      

    GAME.BACK.backgroundActions.forEach( ( e ) => { 
        e.updateXy( e.x, e.y )
    })
    
    handleRoadNetworkFuncs(GAME)
    handleNpcCounter(GAME)

    if ( GAME.PLAYER != undefined && !GAME.paused ) {
        mapControls.handleMovementKeys( );  
    }

    GAME.FRONT.activeEffects.forEach( ( e ) => {
        e.drawAndMove( );
    })

    if ( GAME.FRONTGRID.hasFrontGrid ) {
        canvas.clearEntireCanvas("FRONT_GRID");
        GAME.FRONTGRID.drawMapFromGridData( GAME.FRONTGRID.sheetImage );
    }

    GAME.speechBubbleController.drawBubbles( );

    GAME.BACK.grid.array.forEach( ( e ) => { 
        if ( e.hasEvent && e.eventType == EVENT_DOOR ) {
            if ( e.event.direction == PLAYER.direction && PLAYER.hitbox.checkForDoorRange( e.event, PLAYER.direction ) ) {
                e.event.handle( );
            }
        }
    })
}

const handleRoadNetworkFuncs = ( GAME ) => {
    if ( GAME.FRONT.roadNetwork != null ) {
        GAME.FRONT.roadNetwork.handleCarCounter()
        GAME.FRONT.roadNetwork.handleRoadIntersections();
        GAME.FRONT.roadNetwork.handleRoadCrossings();
    }
}

const handleNpcCounter = ( GAME ) => {
    GAME.activeNeighbourhood.handleNPCCounter( );
}
/**
 * Clear the edges of the front canvas that are not currently in the active Grids' borders.
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
        else if ( sprite.movementType == NPC_MOVE_TYPE_FLYING && sprite.State.is( STATE_MOVING ) ) {
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

    const cars = GAME.FRONT.allSprites.filter((e) => {return e.isCar;});
    cars.forEach((car)=>{car.State.decideStateFromPendingStateChanges( )});
}

const drawSpritesInArray = ( array, GAME ) => {
    if ( !GAME.paused ) {
        array.forEach( ( sprite ) => {
            tryCatch((GAME, sprite)=> {
                if ( GAME.paused || sprite.deleted ) {
                    return;
                }
                sprite.drawSprite( );
            }, [GAME, sprite])
        })
    }
}

module.exports = {
    handleMapAnimations
}