const res           = require('../../resources/resourceStrings')
const battleText    = state.battleState.textContainer
const state         = require('../../game-data/state')
const globals       = require('../../game-data/globals')
const changeMode        = require('../../game-data/changeMode')

const handleBattleKeyPress = ( event ) => {
    if ( event.key == "Escape" || event.key == "Esc" ) {
        changeMode.requestModeChange( 'OVERWORLD' )
    }
    if ( event.key == "1" || event.key == "2" || event.key == "3" || event.key == "4" || event.key == "5" ) {
        state.battleState.player.sprite.setButtonAsActive( event.key )
    }
    if ( event.key == "q" ) {
        handleActionButton(  )
    }

    else {
        state.pressedKeys[event.key] = true        
    }
}

const handleActionButton = (  ) => {
    if ( state.battleState.player.hasTurn && state.battleState.battlePhase == globals['PHASE_SELECT_MOVE'] ) {
        state.battleState.player.sprite.buttonSprites.forEach( (button) => {
            if ( button.active ) {
                if ( button.text.includes("1") ) {
                    state.battleState.player.sprite.moveSpriteToPlace( state.battleState.opponent.sprite.right )   
                    battleText.setText( 
                        res.getBattleResString('BATTLE_USE_MOVE', { name: state.battleState.player.character.name, move: "punch" } ) 
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
        })
    }
}

module.exports = {
    handleBattleKeyPress
}