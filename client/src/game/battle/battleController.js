const init          = require('./battle-init/initBattle')
const state         = require('../../game-data/state')
const globals       = require('../../game-data/globals')
const Sound         = require('./../interfaces/I_Sound').Sound
const text          = require('./battle-ui/battleText')
const canvas        = require('./../../helpers/canvasHelpers')
const BattleChar    = require('./BattleChar').BattleChar

const startBattle = (  ) => {
    state.battleState.requestingBattle = false
    state.currentMap.mapMusic.pause()     

    let sfx = new Sound( "battle-march.wav", true )
    sfx.play()

    if ( state.battleState.battleMusic ) {
        state.battleState.battleMusic.play()  
    }
    else {
        state.battleState.battleMusic = new Sound( "Rydeen.mp3", false, true )
        state.battleState.battleMusic.play()
    }

    init.getBattleStartScreen( )
    initBattleMapAndSprites()
}

const initBattleMapAndSprites = ( ) => {
    let battleMap;

    setTimeout( ( ) => {
        battleMap = new Image();    
        battleMap.src = '/static/battlemaps/city_fight_level.png'
        battleMap.onload = ( ) => {    
            canvas.drawFromImageToCanvas( "BACK", battleMap, 0, 0, 1296, 846, 0, 0, globals.CANVAS_WIDTH, globals.CANVAS_HEIGHT )
        }
    }, 800)

    
    setTimeout( ( ) => {
        text.initTextContainer( ) // real text
        if ( state.debug.battle == true ) {
            text.initTextContainer(state.debug.battle)   
        }

    }, 2000) 

    setTimeout( ( ) => {
        initializeBattleCharacter( state.battleState.opponent )

        decideWhoStarts( state.battleState.player, state.battleState.opponent )
    }, 2400)
}

const decideWhoStarts = ( player, opponent ) => {
    if ( opponent.character.stats.Speed > player.character.stats.Speed ) { 
        opponent.hasTurn = true;
    }
    else if ( opponent.character.stats.Speed < player.character.stats.Speed ) {
        player.hasTurn = true;
    }
    else if ( opponent.character.stats.Speed == player.character.stats.Speed ) {
        ( Math.random( ) > .5 ) ? opponent.hasTurn = true : player.hasTurn = true;
    }

    state.battleState.battlePhase = globals['PHASE_BEGIN_TURN']
}

const initializeBattleCharacter = ( opponent ) => {
    const mapBattleAction = opponent.action

    let playerXy = {
        'x': (globals.CANVAS_WIDTH * .25) - ( globals.BATTLE_SPRITE_WIDTH  * .5 ),
        'y': (globals.CANVAS_HEIGHT * .35) - ( globals.BATTLE_SPRITE_HEIGHT * .5 )
    }
    let playerXy2 = {
        'x': (globals.CANVAS_WIDTH * .30) - ( globals.BATTLE_SPRITE_WIDTH  * .5 ),
        'y': (globals.CANVAS_HEIGHT * .5) - ( globals.BATTLE_SPRITE_HEIGHT * .5 )
    }
    let playerXy3 = {
        'x': (globals.CANVAS_WIDTH * .25) - ( globals.BATTLE_SPRITE_WIDTH  * .5 ),
        'y': (globals.CANVAS_HEIGHT * .65) - ( globals.BATTLE_SPRITE_HEIGHT * .5 )
    }

    let opponentXy = {
        'x': (globals.CANVAS_WIDTH * .75) - ( globals.BATTLE_SPRITE_WIDTH * .5 ),
        'y': (globals.CANVAS_HEIGHT * .35) - ( globals.BATTLE_SPRITE_HEIGHT * .5 )
    }
    let opponentXy2 = {
        'x': (globals.CANVAS_WIDTH * .70) - ( globals.BATTLE_SPRITE_WIDTH * .5 ),
        'y': (globals.CANVAS_HEIGHT * .5) - ( globals.BATTLE_SPRITE_HEIGHT * .5 )
    }
    let opponentXy3 = {
        'x': (globals.CANVAS_WIDTH * .75) - ( globals.BATTLE_SPRITE_WIDTH * .5 ),
        'y': (globals.CANVAS_HEIGHT * .65) - ( globals.BATTLE_SPRITE_HEIGHT * .5 )
    }

    state.battleState.player = new BattleChar( true, state.playerCharacter.stats.name, state.playerCharacter.stats.className, playerXy )
    state.battleState.player2 = new BattleChar( true, state.playerCharacter.stats.name, state.playerCharacter.stats.className, playerXy2 )
    state.battleState.player3 = new BattleChar( true, state.playerCharacter.stats.name, state.playerCharacter.stats.className, playerXy3 )

    state.battleState.playerParty = [ state.battleState.player, state.battleState.player2, state.battleState.player3 ]

    state.battleState.opponent = new BattleChar( false, mapBattleAction.name, mapBattleAction.character.class, opponentXy )
    state.battleState.opponent2 = new BattleChar( false, mapBattleAction.name, mapBattleAction.character.class, opponentXy2 )
    state.battleState.opponent3 = new BattleChar( false, mapBattleAction.name, mapBattleAction.character.class, opponentXy3 )

    state.battleState.opponentParty = [ state.battleState.opponent, state.battleState.opponent2, state.battleState.opponent3 ]
}

const stopBattle = ( ) => {
    init.getBattleStopScreen()
    let sfx = new Sound( "battle-march.wav", true )
    sfx.play()
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