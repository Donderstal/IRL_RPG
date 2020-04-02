const state     = require('../../game-data/state')
const NPCs      = require('../map/map-ui/NPCs')
const globals       = require('../../game-data/globals')
const canvas    = require('../../helpers/canvasHelpers')

const handleBattleAnimations = ( ) => {
    canvas.clearEntireCanvas("FRONT")

    let playerSprite = state.battleState.player.sprite
    let opponentSprite = state.battleState.opponent.sprite

    let playerHasTurn = state.battleState.player.hasTurn

    let playerCharacter = state.battleState.player.character;
    let opponentCharacter = state.battleState.opponent.character;

    let battleText = state.battleState.textContainer

    if ( playerSprite != undefined ) {
        if ( !playerSprite.moving ) {
            NPCs.handleStaticNPCAnimation( state.battleState.player )            
        }
        playerSprite.drawSprite()         
    }
    if ( opponentSprite != undefined ) {
        if ( !opponentSprite.moving ) {
            NPCs.handleStaticNPCAnimation( state.battleState.opponent )
        }
        opponentSprite.drawSprite() 
    }

    if ( battleText != undefined ) {
        battleText.drawContainer()    
    }

    switch ( state.battleState.battlePhase ) {
        case globals['PHASE_BEGIN_BATTLE'] :
            let name = ( playerHasTurn ) ? playerCharacter.name : opponentCharacter.name   
            battleText.setText( name + " begins!" )
            break;
        case globals['PHASE_SELECT_MOVE'] :
            if ( !playerHasTurn ) {
                battleText.setText( opponentCharacter.name + " is thinking..." )
            }
            else if ( playerHasTurn ) {
                battleText.setText( "Choose your move with one of the number keys!" )
            }
            break;
        case globals['PHASE_DO_MOVE'] :
            break;
        case globals['PHASE_STAT_CHECK'] :
            break;
        case globals['PHASE_CHANGE_TURN'] :
            break;
        case globals['PHASE_END_BATTLE'] :
            break;
    }

}

module.exports = {
    handleBattleAnimations
}