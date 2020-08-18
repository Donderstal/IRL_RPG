const state         = require('../../game-data/state')
const canvas        = require('../../helpers/canvasHelpers')

const handleBattleAnimations = ( ) => {
    canvas.clearEntireCanvas("FRONT")

    const playerParty     = state.battleState.playerParty
    const opponentParty   = state.battleState.opponentParty
    const UI        = state.battleState.UI;

    if ( playerParty != undefined && opponentParty != undefined ) {
        playerParty.members.forEach( (e) => { e.draw() })
        opponentParty.members.forEach( (e) => { e.draw() })
    }
    if ( UI != undefined ) {
        UI.drawUI( );
    }
}

module.exports = {
    handleBattleAnimations
}