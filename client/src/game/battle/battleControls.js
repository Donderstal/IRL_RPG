const res           = require('../../resources/resourceStrings')
const state         = require('../../game-data/state')
const globals       = require('../../game-data/globals')
const changeMode    = require('../../game-data/changeMode')

const battleState   = state.battleState
const battleText    = battleState.textContainer

const handleBattleKeyPress = ( event ) => {
    const keyIsNumberInMenu = event.key == "1" || event.key == "2" || event.key == "3" || event.key == "4" || event.key == "5"
    const playerCanChooseMove = battleState.player.hasTurn && battleState.battlePhase == globals['PHASE_SELECT_MOVE']

    if ( event.key == "Escape" || event.key == "Esc" ) {
        changeMode.requestModeChange( 'OVERWORLD' )
    }
    if ( keyIsNumberInMenu && playerCanChooseMove ) {
        battleState.player.sprite.setButtonAsActive( event.key )
    }
    if ( event.key == "q" ) {
        handleActionButton(  )
    }

    else {
        state.pressedKeys[event.key] = true        
    }
}

const handleActionButton = ( playerCanChooseMove ) => {
    if ( playerCanChooseMove ) {
        handleBattleMenuClick( )
    }
    else {
        passPhase( )
    }
}

const handleBattleMenuClick = ( ) => {
    battleState.player.sprite.buttonSprites.forEach( (button) => {
        if ( button.active ) {
            if ( button.text.includes("1") ) {
                battleState.player.sprite.moveSpriteToPlace( battleState.opponent.sprite.right )   
                battleText.setText( 
                    res.getBattleResString('BATTLE_USE_MOVE', { name: battleState.player.character.name, move: "punch" } ) 
                )
            }
            if ( button.text.includes("2") ) {
  
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

const passPhase = ( ) => {
    let playerHasTurn = state.battleState.player.hasTurn

    switch ( state.battleState.battlePhase ) {
        case globals['PHASE_BEGIN_TURN'] :
            state.battleState.battlePhase = globals['PHASE_SELECT_MOVE'];
            break;
        case globals['PHASE_SELECT_MOVE'] :
            state.battleState.battlePhase = globals['PHASE_DO_MOVE'];
            state.battleState.player.sprite.activateUI( false )
            break;
        case globals['PHASE_DO_MOVE'] :
            state.battleState.battlePhase = globals['PHASE_STAT_CHECK'];
            break;
        case globals['PHASE_STAT_CHECK'] :
            state.battleState.player.hasTurn = ( playerHasTurn ) ? false : true
            state.battleState.opponent.hasTurn = ( playerHasTurn ) ? false : true
            state.battleState.battlePhase = globals['PHASE_BEGIN_TURN'];
            break;
    }
}

module.exports = {
    handleBattleKeyPress
}