const canvas        = require('../../../helpers/canvasHelpers')
const globals       = require('../../../game-data/globals')
const Sound         = require('../../interfaces/I_Sound').Sound

const getBattleStartScreen = ( ) => {
    canvas.clearBothCanvases( )

    for( var i = 0; i <= globals.CANVAS_COLUMNS; i++ ) {
        let key = i
        setTimeout(( ) => {
            canvas.drawRect( "FRONT", 
            globals.GRID_BLOCK_PX * key, 0, 
            globals.GRID_BLOCK_PX, globals.CANVAS_HEIGHT, 
            "#800020" 
        )
        }, 25 * key) 
    }
    setTimeout(( ) => {
        let FightSheet = new Image();
        FightSheet.onload = () => {
            canvas.drawFromImageToCanvas( 
                "FRONT", FightSheet, 
                0, 0, 200, 200,  
                globals.CANVAS_WIDTH * 0.5 - 200, globals.CANVAS_HEIGHT * 0.5 - 200,
                400, 400
            )
        }
        FightSheet.src = '/static/battle_gfx/fight.png'
    }, 800 ) 

    
    let sfx = new Sound( 'boxing-bell.wav', true )
    sfx.play()

    for( var i = 0; i <= globals.CANVAS_COLUMNS; i++ ) {
        let key = i + 1
        setTimeout(( ) => {
            canvas.getFrontCanvasContext().clearRect( globals.CANVAS_WIDTH - ( globals.GRID_BLOCK_PX * key) , 0, globals.GRID_BLOCK_PX, globals.CANVAS_HEIGHT )
        }, 1500 + (25 * key)) 
    }
}

const getBattleStopScreen = ( ) => {
    canvas.clearBothCanvases( )

    for( var i = 0; i <= globals.CANVAS_COLUMNS; i++ ) {
        let key = i
        setTimeout(( ) => {
            canvas.drawRect( "FRONT", 
            globals.GRID_BLOCK_PX * key, 0, 
            globals.GRID_BLOCK_PX, globals.CANVAS_HEIGHT, 
            "#800020" 
        )
        }, 25 * key) 
    }

    for( var i = 0; i <= globals.CANVAS_COLUMNS; i++ ) {
        let key = i + 1
        setTimeout(( ) => {
            canvas.getFrontCanvasContext().clearRect( globals.CANVAS_WIDTH - ( globals.GRID_BLOCK_PX * key) , 0, globals.GRID_BLOCK_PX, globals.CANVAS_HEIGHT )
        }, 1400 + (25 * key)) 
    }
}

module.exports = {
    getBattleStartScreen,
    getBattleStopScreen
}