const init          = require('./battle-init/initBattle')
const state         = require('../../game-data/state')
const globals       = require('../../game-data/globals')
const Sound         = require('./../interfaces/I_Sound').Sound
const initChar      = require('./../character/character-init/initCharacter')
const BattleSprite  = require('./battle-init/battleSprite').BattleSprite
const text          = require('./battle-ui/battleText')
const canvas        = require('./../../helpers/canvasHelpers')
const BattleStats      = require('./battle-ui/battleStats').BattleStats

const startBattle = (  ) => {
    state.battleState.requestingBattle = false
    state.currentMap.mapMusic.pause()     

    let sfx = new Sound( "battle-march.wav", true )
    sfx.play()
    state.battleState.battleMusic = new Sound( "Rydeen.mp3", false, true )
    state.battleState.battleMusic.play()

    init.getBattleStartScreen( )
    initBattleMapAndSprites()
}

const initBattleMapAndSprites = ( ) => {
    let battleMap;

    let player = state.battleState.player;
    let opponent = state.battleState.opponent;

    setTimeout( ( ) => {
        battleMap = new Image();    
        battleMap.src = '/static/battlemaps/city_fight_level.png'
        battleMap.onload = ( ) => {    
            canvas.drawFromImageToCanvas( "BACK", battleMap, 0, 0, 1296, 846, 0, 0, globals.CANVAS_WIDTH, globals.CANVAS_HEIGHT )
        }
    }, 800)

    
    setTimeout( ( ) => {
        text.initTextContainer( true )
        text.initTextContainer()
    }, 2000) 

    setTimeout( ( ) => {
        let playerXy = {
            'x': (globals.CANVAS_WIDTH * .25) - ( globals.BATTLE_SPRITE_WIDTH  * .5 ),
            'y': (globals.CANVAS_HEIGHT * .5) - ( globals.BATTLE_SPRITE_HEIGHT * .5 )
        }

        let opponentXy = {
            'x': (globals.CANVAS_WIDTH * .75) - ( globals.BATTLE_SPRITE_WIDTH * .5 ),
            'y': (globals.CANVAS_HEIGHT * .5) - ( globals.BATTLE_SPRITE_HEIGHT * .5 )
        }

        player.sprite = new BattleSprite( playerXy, '/static/battlesprites/neckbeard_fight_L.png', 0, true )
        player.character = state.playerCharacter.stats
        player.statsBar = new BattleStats( player.character, true )

        opponent.sprite = new BattleSprite( opponentXy, '/static/battlesprites/neckbeard_fight_R.png', 1 )
        opponent.character = initChar.getCharWithClass( 'Neckbeard', 'N00bpwner' )
        opponent.statsBar = new BattleStats( opponent.character, false )

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

    state.battleState.battlePhase = globals['PHASE_BEGIN_TURN']
}

const stopBattle = ( ) => {
    state.battleState.battleMusic.stop()
    init.getBattleStopScreen()
    state.battleState = {
        player  : { hasTurn : false },
        opponent   : { hasTurn : false },
        battlePhase : null
    }
}

module.exports = {
    startBattle,
    stopBattle
}