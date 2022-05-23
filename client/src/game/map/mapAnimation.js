const globals = require('../../game-data/globals')
const { NPC_MOVE_TYPE_FLYING, STATE_MOVING } = require('../../game-data/globals')
const canvas = require('../../helpers/canvasHelpers');
const { getActiveDoors, unsetPendingDoor, setDoorAsPending, getPendingDoor } = require('../../helpers/doorController');
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

    if ( globals.SCREEN.MOBILE ) {
        canvas.clearEntireCanvas("SPEECH");
    }

    drawSpritesInOrder( GAME )

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
        const tilesFront = GAME.PLAYER.visionbox.getFrontGridTilesInArc( GAME.FRONTGRID );
        GAME.FRONTGRID.drawTilesAndClearArc( tilesFront );
    }

    GAME.speechBubbleController.drawBubbles( );

    const doors = getActiveDoors( )
    let inDoorRange = false;

    doors.forEach( ( door ) => { 
        if ( PLAYER.hitbox.checkForDoorRange( door ) ) {
            let pendingDoor = getPendingDoor( );
            inDoorRange = true;
            if ( door.direction == PLAYER.direction && pendingDoor.id != door.id && pendingDoor.destination != door.destination ) {
                setDoorAsPending( door.id, door.destination )
                door.handle( );
            }
        }
    })

    if ( !inDoorRange ) {
        unsetPendingDoor( );
    }

    if ( GAME.cameraFocus.movingToNewFocus ) {
        GAME.cameraFocus.moveToNewFocus( );
    }
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
 * First, sort GAME.FRONT.allSprites based on their location on the front canvas.
 * Then, clear the front Canvas.
 * Afterwards, draw allSprites in the sorted order, drawing flying sprites last. This gives the player the illusion of depth on the screen.
 * @param {Game} GAME Instance of the Game class in Game.js
 */
const drawSpritesInOrder = ( GAME ) => {
    GAME.FRONT.allSprites.sort( ( a, b ) => {
        if ( a.row > b.row || a.row === b.row && a.bottom > b.bottom ) {
            return 1 
        }
        else if (b.row > a.row || b.row === a.row && b.bottom > a.bottom ) {
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

    GAME.FRONT.tilesBlockedBySprites = [];

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
            GAME.FRONT.getTilesBlockedBySprite( sprite );
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
            if ( GAME.paused || sprite.deleted ) {
                return;
            }
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
    handleMapAnimations,
    drawSpritesInOrder,
    handleRoadNetworkFuncs,
    handleNpcCounter
}