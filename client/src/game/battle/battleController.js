const initBattle = require('./battle-init/initBattle')

const handleBattleKeyPress = ( event ) => {
    if ( event.key == "Escape" || event.key == "Esc" ) {
        initBattle.stopBattle()
    }
    if ( event.key == "1" || event.key == "2" || event.key == "3" || event.key == "4" || event.key == "5" ) {
        state.battleState.player.sprite.setButtonAsActive( event.key )
    }
    if ( event.key == "q" ) {
        state.battleState.player.sprite.buttonSprites.forEach( (button) => {
            if ( button.active ) {

            }
        })
    }

    else {
        state.pressedKeys[event.key] = true        
    }
}