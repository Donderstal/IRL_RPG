const state         = require('../../../game-data/state')
const canvas        = require('../../../helpers/canvasHelpers')
const utility       = require('../../../helpers/utilFunctions')
const animation     = require('../../animationFrameController')
const drawGrid      = require('../../map/map-init/drawGrid')
const globals       = require('../../../game-data/globals')
const text          = require('../../map/map-ui/displayText')
const initChar      = require('../../character/character-init/initCharacter')

// classes
const BattleSprite  = require('./BattleSprite').BattleSprite
const Sound         = require('../../interfaces/I_Sound').Sound

const startBattle = (  ) => {
    state.battleState.requestingBattle = false
    state.currentMap.mapMusic.pause()     
    animation.startCinematicAnimation()   

    let sfx = new Sound( "battle-march.wav", true )
    sfx.play()

    getBattleStartscreen( )

    utility.fetchJSONWithCallback( '/static/maps/battle-maps/battle_map1.json', getBattleMap )
}

const getBattleStartscreen = ( ) => {
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

const getBattleMap = ( battleMapJson ) => {
    let battleMap = {};
    battleMap.mapData = battleMapJson;

    setTimeout( ( ) => {
        drawGrid.generateMap( battleMap )
    }, 800)

    setTimeout( ( ) => {
        state.battleState.player.sprite = new BattleSprite( { 'row': 5, 'col': 19 }, '/static/sprites/neckbeard.png', 1, true )
        state.battleState.player.character = state.playerCharacter.stats

        state.battleState.opponent.sprite = new BattleSprite( { 'row': 5, 'col': 5 }, '/static/sprites/influencer.png', 2 )
        state.battleState.opponent.character = initChar.getCharWithClass( 'Influencer', 'Pauline' )


        text.getTextContainer( "Choose your move!" )
        animation.startBattleAnimation( )
    }, 2400)
}

const stopBattle = ( ) => {
    canvas.clearBothCanvases( )
    state.animation.battleMode = false

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

    setTimeout( ( ) => {
        drawGrid.generateMap( state.currentMap )
    }, 800)

    setTimeout( ( ) => {
        state.currentMap.mapMusic.play()
        animation.startOverworldAnimation( )
    }, 2000)
}

module.exports = {
    startBattle,
    stopBattle
}