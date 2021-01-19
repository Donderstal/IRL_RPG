const globals = require('../../game-data/globals')
const { GRID_BLOCK_PX, CANVAS_WIDTH, CANVAS_HEIGHT } = require('../../game-data/globals')
const canvas = require('../../helpers/canvasHelpers')
const mapControls = require('./mapControls')

let carGenerationLimit = 10000;
let randomCarLimit = 0;
let millisecondCounter = 0;

let lastTimeStamp = 0;
let newTimeStamp = 0;

const handleMapAnimations = ( ) => {
    const foreground = globals.GAME.front.class;

    drawSpritesInOrder( )

    clearMargins( foreground );      
    
    if ( foreground.roads.length > 0 ) {
        handleCarGeneration( foreground.roads );
    }

    if ( globals.GAME.PLAYER != undefined && !globals.GAME.paused ) {
        mapControls.handleMovementKeys( );  
    }

    globals.GAME.PLAYER.pathIsBlocked = false;

    if ( globals.GAME.bubbleIsActive ) {
        globals.GAME.activeBubble.drawTextBox( )
    }
}

const handleCarGeneration = ( roads ) => {
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
        globals.GAME.front.class.generateCar( );
        millisecondCounter = 0;
        randomCarLimit = 0;
    }
}

const clearMargins = ( foreground ) => {
    let grid = foreground.grid;
    const overflowX = ( grid.overflowColumns * GRID_BLOCK_PX ) / 2
    const overflowY = ( grid.overflowRows * GRID_BLOCK_PX ) / 2 
    globals.GAME.front.ctx.clearRect( 
        0, 0, 
        overflowX, CANVAS_HEIGHT 
        );
    globals.GAME.front.ctx.clearRect( 
        overflowX + ( grid.columns * GRID_BLOCK_PX ), 0, 
        overflowX, CANVAS_HEIGHT 
    );
    globals.GAME.front.ctx.clearRect( 
        0, 0, 
        CANVAS_WIDTH, overflowY 
    );
    globals.GAME.front.ctx.clearRect( 
        0, overflowY + ( grid.rows * GRID_BLOCK_PX ), 
        CANVAS_WIDTH, overflowY
    );
}

const drawSpritesInOrder = ( ) => {
    globals.GAME.front.class.allSprites.sort( ( a, b ) => {
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
    if ( !globals.GAME.paused ) {
        globals.GAME.front.class.allSprites.forEach( (e) => {
            if ( globals.GAME.paused || e.deleted ) {
                return;
            }
            if ( e.spriteId == 'PLAYER' || e.type != 'flying' ) {
                e.drawSprite( );
            } else if ( e.type == 'flying' ) {
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