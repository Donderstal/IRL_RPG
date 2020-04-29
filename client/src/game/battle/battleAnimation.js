const state         = require('../../game-data/state')
const res           = require('../../resources/resourceStrings')
const globals       = require('../../game-data/globals')
const canvas        = require('../../helpers/canvasHelpers')

const handleBattleAnimations = ( ) => {
    canvas.clearEntireCanvas("FRONT")

    let player          = state.battleState.player
    let opponent        = state.battleState.opponent
    const battleText    = state.battleState.textContainer
    const debugText     = state.battleState.debugText

    if ( state.battleState.playerParty != undefined && state.battleState.opponentParty != undefined ) {
        state.battleState.playerParty.members.forEach( (e) => { e.draw() })
        state.battleState.opponentParty.members.forEach( (e) => { e.draw() })
    }

    if ( battleText != undefined ) {
        battleText.drawContainer()    
    }
    if ( debugText != undefined ) {
        debugText.drawContainer()    
    }

    handlePhase( battleText, player, opponent )

}

const handlePhase = ( battleText, player, opponent ) => {
    const battleState = state.battleState
    
    switch ( battleState.battlePhase ) {
        case globals['PHASE_BEGIN_TURN'] :
            battleText.setText( player.hasTurn ? player.name : opponent.name  + "s turn begins!" )
            break;
        case globals['PHASE_SELECT_MOVE'] :
            if ( !player.hasTurn ) {
                battleText.setText( opponent.name + " is thinking..." )
            }
            else if ( player.hasTurn && !player.sprite.hasActiveButton ) {
                battleText.setText( "Choose your move with one of the number keys!" )
                player.activateUI( true )
            }
            break;
        case globals['PHASE_DO_MOVE'] :
            if ( !player.hasTurn ) {
                battleText.setText( res.getBattleResString('BATTLE_USE_MOVE', { name: opponent.name, move: "punch" } ) )
                if ( !opponent.sprite.moving ) {
                    opponent.standardAttack( )
                    player.animateHit( )
                    battleState.moveResultText = player.name + " takes "+ battleState.currentMoveDamage +" damage!!!"                    
                }
            }
            else {
                battleText.setText( res.getBattleResString('BATTLE_USE_MOVE', { name: player.name, move: "punch" } ) )
                battleState.moveResultText = opponent.name + " takes "+ battleState.currentMoveDamage +" damage!!!"  
                player.deActivateUi( );
            }
            break;
        case globals['PHASE_STAT_CHECK'] :
            player.sprite.moving = false;
            opponent.sprite.moving = false;
            battleText.setText( battleState.moveResultText )
            break;
        case "END" : 
            
    }
}

module.exports = {
    handleBattleAnimations
}