const res           = require('../../resources/resourceStrings')
const state         = require('../../game-data/state')
const globals       = require('../../game-data/globals')
const changeMode    = require('../../game-data/changeMode')
const Sound         = require('./../interfaces/I_Sound').Sound

const handleBattleKeyPress = ( event ) => {
    const battleState   = state.battleState
    const battleText    = battleState.textContainer

    const keyIsNumberInMenu = event.key == "1" || event.key == "2" || event.key == "3" || event.key == "4" || event.key == "5"
    const playerCanChooseMove = battleState.player.hasTurn && battleState.battlePhase == globals['PHASE_SELECT_MOVE']

    if ( event.key == "Escape" || event.key == "Esc" ) {
        state.battleState.battleMusic.stop()
        changeMode.requestModeChange( 'OVERWORLD' )
    }
    if ( keyIsNumberInMenu && playerCanChooseMove ) {
        battleState.player.sprite.setButtonAsActive( event.key )
    }
    if ( event.key == "q" ) {
        handleActionButton( playerCanChooseMove, battleState, battleText )
    }
    if ( event.key == "e" && battleState.menuIsActive ) {
        unsetMoveMenu( battleState, battleText )
    }
    else {
        state.pressedKeys[event.key] = true        
    }
}

const handleActionButton = ( playerCanChooseMove, battleState, battleText ) => {
    if ( playerCanChooseMove ) {
        handleBattleMenuClick( battleState, battleText )
    }
    else if ( battleState.menuIsActive ) {
        
    }
    else {
        passPhase( battleState, battleText )
    }
}

const handleBattleMenuClick = ( battleState, battleText ) => {
    const playerUiButtons = battleState.player.sprite.buttonSprites

    playerUiButtons.forEach( (button) => {
        if ( button.active ) {
            if ( button.text.includes("1") ) {
                handlePunch( battleState, battleText )
            }
            if ( button.text.includes("2") ) {
                battleState.player.setMoveMenu( )
            }
            if ( button.text.includes("3") ) {
          
            }
            if ( button.text.includes("4") ) {
        
            }
            if ( button.text.includes("5") ) {
            
            }
        }
    } )
}

const passPhase = ( battleState, battleText ) => {
    const player    = battleState.player
    const opponent  = battleState.opponent

    switch ( battleState.battlePhase ) {
        case globals['PHASE_BEGIN_TURN'] :
            battleState.battlePhase = globals['PHASE_SELECT_MOVE'];
            break;
        case globals['PHASE_SELECT_MOVE'] :
            battleState.battlePhase = globals['PHASE_DO_MOVE'];
            player.activateUI( false )
            break;
        case globals['PHASE_DO_MOVE'] :
            battleState.battlePhase = globals['PHASE_STAT_CHECK'];
            break;
        case globals['PHASE_STAT_CHECK'] :
            if ( checkForDeath(battleState, battleText) ) {
                battleState.battlePhase = "END"
            }
            else {
                player.hasTurn = ( player.hasTurn ) ? false : true
                opponent.hasTurn = ( player.hasTurn ) ? false : true
                battleState.battlePhase = globals['PHASE_BEGIN_TURN'];
            }
            break;
        case "END":
            battleState.battleMusic.stop()
            changeMode.requestModeChange( 'OVERWORLD' )
    }
}

const setMoveMenu = ( battleState, battleText ) => {
    battleState.menuIsActive = true;
    battleText.setMoveMenu( )
    battleState.player.sprite.initBattleMovesMenu( battleState.player.character.moves )
}

const unsetMoveMenu = ( battleState, battleText ) => {
    battleState.menuIsActive = false;;
    battleText.unsetMoveMenu(  )
}

const checkForDeath = ( battleState, battleText ) => {
    if ( battleState.player.character.stats.Health <= 0 ) {
        return handleBattleDeath( battleState.player, battleState.opponent, battleText )
    }
    else if ( battleState.opponent.character.stats.Health <= 0 ) {
        return handleBattleDeath( battleState.opponent, battleState.player, battleText )
    }
    else {
        return false        
    }
}

const handleBattleDeath = ( loser, winner, battleText ) => {
    battleText.setText( 
        loser.character.name + " has been wrecked..." 
    )
    loser.sprite.fadeOut()
    winner.sprite.setShout( 
        res.getBattleShout( winner.character.className, "VICTORY"), true 
    );
    return true
}

const handlePunch = ( battleState, battleText ) => {
    battleText.setText( 
        res.getBattleResString('BATTLE_USE_MOVE', { name: battleState.player.character.name, move: "punch" } ) 
    )
    const sfx = new Sound( "battle-baba.mp3", true )
    sfx.play()
    passPhase( battleState )
    setTimeout( ( ) => {
        battleState.player.standardAttack( )
        battleState.opponent.animateHit( )
    }, 500 )
}

module.exports = {
    handleBattleKeyPress
}