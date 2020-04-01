const init          = require('./battle-init/initBattle')
const state         = require('../../game-data/state')
const Sound         = require('./../interfaces/I_Sound').Sound
const initChar      = require('./../character/character-init/initCharacter')
const BattleSprite  = require('./battle-init/battleSprite').BattleSprite
const text          = require('./battle-ui/battleText')
const drawGrid      = require('./../map/map-init/drawGrid')
const utility       = require('./../../helpers/utilFunctions')
const animation     = require('./../animationFrameController')

const startBattle = (  ) => {
    state.battleState.requestingBattle = false
    state.currentMap.mapMusic.pause()     

    let sfx = new Sound( "battle-march.wav", true )
    sfx.play()

    init.getBattleStartScreen( )

    utility.fetchJSONWithCallback( '/static/maps/battle-maps/battle_map1.json', initBattleMapAndSprites )
}

const initBattleMapAndSprites = ( battleMapJson ) => {
    let battleMap = {};
    battleMap.mapData = battleMapJson;

    setTimeout( ( ) => {
        drawGrid.generateMap( battleMap )
    }, 800)

    
    setTimeout( ( ) => {
        text.initTextContainer()
    }, 2000) 

    setTimeout( ( ) => {
        state.battleState.player.sprite = new BattleSprite( { 'row': 5, 'col': 19 }, '/static/sprites/neckbeard.png', 1, true )
        state.battleState.player.character = state.playerCharacter.stats

        state.battleState.opponent.sprite = new BattleSprite( { 'row': 5, 'col': 5 }, '/static/sprites/influencer.png', 2 )
        state.battleState.opponent.character = initChar.getCharWithClass( 'Influencer', 'Pauline' )

    }, 2400)
}

const stopBattle = ( ) => {
    state.battleMode = false
    init.getBattleStopScreen()

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