const state = require('../../game-data/state')
const globals = require('../../game-data/globals')
const canvas = require('../../helpers/canvasHelpers')
const mapControls = require('./mapControls')

const handleMapAnimations = ( ) => {
    const foreground = globals.GAME.front.class;
    const player     = foreground.playerSprite

    drawSpritesInOrder( )

    clearMargins( foreground );        

    if ( player != undefined && !globals.GAME.paused ) {
        setActiveTile( );
        mapControls.handleMovementKeys( );  
    }

    player.pathIsBlocked = false;

    if ( state.currentMap.bubbleIsActive ) {
        state.currentMap.activeBubble.drawTextBox( )
    }
}

const clearMargins = ( foreground ) => {
    let grid = foreground.grid;
    const overflowX = ( grid.overflowColumns * globals.GRID_BLOCK_PX ) / 2
    const overflowY = ( grid.overflowRows * globals.GRID_BLOCK_PX ) / 2 
    globals.GAME.front.ctx.clearRect( 
        0, 0, 
        overflowX, globals.CANVAS_HEIGHT 
        );
    globals.GAME.front.ctx.clearRect( 
        overflowX + ( grid.columns * globals.GRID_BLOCK_PX ), 0, 
        overflowX, globals.CANVAS_HEIGHT 
    );
    globals.GAME.front.ctx.clearRect( 
        0, 0, 
        globals.CANVAS_WIDTH, overflowY 
    );
    globals.GAME.front.ctx.clearRect( 
        0, overflowY + ( grid.rows * globals.GRID_BLOCK_PX ), 
        globals.CANVAS_WIDTH, overflowY
    );
}

const setActiveTile = ( ) => {
    globals.GAME.back.class.setActiveTile( globals.GAME.front.class.playerSprite.centerX( ), globals.GAME.front.class.playerSprite.baseY( ) )
    globals.GAME.front.class.playerSprite.row = globals.GAME.back.class.activeTile.row;
    globals.GAME.front.class.playerSprite.col = globals.GAME.back.class.activeTile.col;
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
    else {
        console.log('paused')
    }

}

module.exports = {
    handleMapAnimations
}