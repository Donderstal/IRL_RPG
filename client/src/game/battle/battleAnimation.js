const state     = require('../../game-data/state')
const res           = require('../../resources/resourceStrings')
const globals       = require('../../game-data/globals')
const canvas    = require('../../helpers/canvasHelpers')

const handleBattleAnimations = ( ) => {
    canvas.clearEntireCanvas("FRONT")

    let playerSprite = state.battleState.player.sprite
    let opponentSprite = state.battleState.opponent.sprite

    
    const battleText    = state.battleState.textContainer
    const debugText = state.battleState.debugText

    if ( playerSprite != undefined ) {
        playerSprite.drawSprite()         
    }
    if ( opponentSprite != undefined ) {
        opponentSprite.drawSprite() 
    }
    if ( battleText != undefined ) {
        battleText.drawContainer()    
    }
    if ( debugText != undefined ) {
        debugText.drawContainer()    
    }

    handlePhase( battleText, playerSprite )

}

const handlePhase = ( battleText, playerSprite ) => {
    const phase = state.battleState.battlePhase
    let playerHasTurn = state.battleState.player.hasTurn

    let playerCharacter = state.battleState.player.character;
    let opponentCharacter = state.battleState.opponent.character;

    switch ( phase ) {
        case globals['PHASE_BEGIN_TURN'] :
            let name = ( playerHasTurn ) ? playerCharacter.name : opponentCharacter.name   
            battleText.setText( name + "'s turn begins!" )
            break;
        case globals['PHASE_SELECT_MOVE'] :
            if ( !playerHasTurn ) {
                battleText.setText( opponentCharacter.name + " is thinking..." )
            }
            else if ( playerHasTurn && !playerSprite.hasActiveButton ) {
                battleText.setText( "Choose your move with one of the number keys!" )
                state.battleState.player.sprite.activateUI( true )
            }
            break;
        case globals['PHASE_DO_MOVE'] :
            if ( !playerHasTurn ) {
                battleText.setText( res.getBattleResString('BATTLE_USE_MOVE', { name: opponentCharacter.name, move: "punch" } ) )
                state.battleState.moveResultText = playerCharacter.name + " takes 5 damage"
            }
            else {
                playerSprite.hasActiveButton = false;
                battleText.setText( res.getBattleResString('BATTLE_USE_MOVE', { name: playerCharacter.name, move: "punch" } ) )
                state.battleState.moveResultText = opponentCharacter.name + " takes 5 damage"
            }
            break;
        case globals['PHASE_STAT_CHECK'] :
            battleText.setText( state.battleState.moveResultText )
            break;
    }
}

module.exports = {
    handleBattleAnimations
}