const state         = require('../../game-data/state')
const res           = require('../../resources/resourceStrings')
const globals       = require('../../game-data/globals')
const canvas        = require('../../helpers/canvasHelpers')

const handleBattleAnimations = ( ) => {
    canvas.clearEntireCanvas("FRONT")

    const playerParty     = state.battleState.playerParty
    const opponentParty   = state.battleState.opponentParty
    const battleText    = state.battleState.textContainer
    const debugText     = state.battleState.debugText

    if ( playerParty != undefined && opponentParty != undefined ) {
        playerParty.members.forEach( (e) => { e.draw() })
        opponentParty.members.forEach( (e) => { e.draw() })
    }
    if ( battleText != undefined ) {
        battleText.drawContainer()    
    }
    if ( debugText != undefined ) {
        debugText.drawContainer()    
    }

    handlePhase( battleText, playerParty, opponentParty )

}

const handlePhase = ( battleText, playerParty, opponentParty ) => {
    const battleState = state.battleState
    
    switch ( battleState.battlePhase ) {
        case globals['PHASE_BEGIN_BATTLE'] :
            battleText.setText( "A fight breaks out in the streets!" )
            break;
        case globals['PHASE_SELECT_MOVE'] :
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