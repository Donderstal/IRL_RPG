const canvas        = require('../../helpers/canvasHelpers')

const handleBattleAnimations = ( ) => {
    canvas.clearEntireCanvas("FRONT")

    const playerParty     = globals.GAME.BATTLE.playerParty
    const opponentParty   = globals.GAME.BATTLE.opponentParty
    const UI        = globals.GAME.BATTLE.UI;

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