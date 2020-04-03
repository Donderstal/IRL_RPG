const init          = require('./battle-init/initBattle')
const state         = require('../../game-data/state')
const globals       = require('../../game-data/globals')
const Sound         = require('./../interfaces/I_Sound').Sound
const initChar      = require('./../character/character-init/initCharacter')
const BattleSprite  = require('./battle-init/battleSprite').BattleSprite
const text          = require('./battle-ui/battleText')
const drawGrid      = require('./../map/map-init/drawGrid')
const utility       = require('./../../helpers/utilFunctions')

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

    let player = state.battleState.player;
    let opponent = state.battleState.opponent;

    setTimeout( ( ) => {
        drawGrid.generateMap( battleMap )
    }, 800)

    
    setTimeout( ( ) => {
        text.initTextContainer( true )
        text.initTextContainer()
    }, 2000) 

    setTimeout( ( ) => {
        player.sprite = new BattleSprite( { 'row': 5, 'col': 19 }, '/static/sprites/neckbeard.png', 1, true )
        player.character = state.playerCharacter.stats

        opponent.sprite = new BattleSprite( { 'row': 5, 'col': 5 }, '/static/sprites/influencer.png', 2 )
        opponent.character = initChar.getCharWithClass( 'Influencer', 'Pauline' )

        decideWhoStarts( player, opponent )
    }, 2400)
}

const decideWhoStarts = ( player, opponent ) => {
    if ( opponent.character.traits.AGI > player.character.traits.AGI ) { 
        opponent.hasTurn = true;
    }
    else if ( opponent.character.traits.AGI < player.character.traits.AGI ) {
        player.hasTurn = true;
    }
    else if ( opponent.character.traits.AGI == player.character.traits.AGI ) {
        ( Math.floor( Math.random( ) ) > .5 ) ? opponent.hasTurn = true : player.hasTurn = true;
    }

    state.battleState.battlePhase = globals['PHASE_BEGIN_BATTLE']
}

const stopBattle = ( ) => {
    init.getBattleStopScreen()
}

module.exports = {
    startBattle,
    stopBattle
}