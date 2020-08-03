const state         = require('../../game-data/state')
const canvas        = require('../../helpers/canvasHelpers')

const handleBattleAnimations = ( ) => {
    canvas.clearEntireCanvas("FRONT")

    const playerParty     = state.battleState.playerParty
    const opponentParty   = state.battleState.opponentParty
    const battleText      = state.battleState.textContainer
    const battleMenu      = state.battleState.battleMenu

    if ( playerParty != undefined && opponentParty != undefined ) {
        playerParty.members.forEach( (e) => { e.draw() })
        opponentParty.members.forEach( (e) => { e.draw() })
    }
    if ( battleText != undefined ) {
        battleText.drawTextBox( )    
    }

    if ( battleMenu != undefined ) {
        state.battleState.battleMenu.draw( );
    }
}

module.exports = {
    handleBattleAnimations
}