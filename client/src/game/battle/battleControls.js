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
    if ( keyIsNumberInMenu && playerCanChooseMove && !battleState.menuIsActive ) {
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
                setMoveMenu( battleState, battleText )
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
    const playerHasTurn = battleState.player.hasTurn

    switch ( battleState.battlePhase ) {
        case globals['PHASE_BEGIN_TURN'] :
            battleState.battlePhase = globals['PHASE_SELECT_MOVE'];
            break;
        case globals['PHASE_SELECT_MOVE'] :
            battleState.battlePhase = globals['PHASE_DO_MOVE'];
            battleState.player.sprite.activateUI( false )
            break;
        case globals['PHASE_DO_MOVE'] :
            battleState.battlePhase = globals['PHASE_STAT_CHECK'];
            break;
        case globals['PHASE_STAT_CHECK'] :
            if ( checkForDeath(battleState, battleText) ) {
                battleState.battlePhase = "END"
            }
            else {
                battleState.player.hasTurn = ( playerHasTurn ) ? false : true
                battleState.opponent.hasTurn = ( playerHasTurn ) ? false : true
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
    battleText.setMoveMenu(  )
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
        battleState.player.sprite.animateAttack( "PUNCH" )
        battleState.opponent.sprite.animateHit( )
        battleState.player.sprite.setShout( res.getBattleShout( battleState.player.character.className, "FIGHT" ) )
        battleState.player.character.standardAttack( battleState.player.character, battleState.opponent.character )
    }, 500 )
}

module.exports = {
    handleBattleKeyPress
}