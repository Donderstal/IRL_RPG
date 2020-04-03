const state         = require('../../game-data/state')
const res           = require('../../resources/resourceStrings')
const globals       = require('../../game-data/globals')
const canvas        = require('../../helpers/canvasHelpers')

const handleBattleAnimations = ( ) => {
    canvas.clearEntireCanvas("FRONT")

    let playerSprite        = state.battleState.player.sprite
    let opponentSprite      = state.battleState.opponent.sprite
    let playerStatBar       = state.battleState.player.statsBar
    let opponentStatsBar    = state.battleState.opponent.statsBar
    
    const battleText    = state.battleState.textContainer
    const debugText = state.battleState.debugText

    if ( playerSprite != undefined ) {
        playerSprite.drawSprite()       
        playerStatBar.drawStats()
    }
    if ( opponentSprite != undefined ) {
        opponentSprite.drawSprite() 
        opponentStatsBar.drawStats()
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
                playerSprite.activateUI( true )
            }
            break;
        case globals['PHASE_DO_MOVE'] :
            if ( !playerHasTurn ) {
                battleText.setText( res.getBattleResString('BATTLE_USE_MOVE', { name: opponentCharacter.name, move: "punch" } ) )
                if ( !state.battleState.opponent.sprite.moving ) {
                    state.battleState.opponent.sprite.animateAttack( "PUNCH" )
                    playerSprite.animateHit( )
                    opponentCharacter.moves.attack( opponentCharacter, playerCharacter )
                    state.battleState.moveResultText = playerCharacter.name + " takes "+ state.battleState.currentMoveDamage +" damage!!!"                    
                }
            }
            else {
                battleText.setText( res.getBattleResString('BATTLE_USE_MOVE', { name: playerCharacter.name, move: "punch" } ) )
                state.battleState.moveResultText = opponentCharacter.name + " takes "+ state.battleState.currentMoveDamage +" damage!!!"  
                playerSprite.hasActiveButton = false;
                playerSprite.buttonSprites.forEach( (e) => { e.setActive( false ) } )
            }
            break;
        case globals['PHASE_STAT_CHECK'] :
            state.battleState.opponent.sprite.moving = false;
            battleText.setText( state.battleState.moveResultText )
            break;
    }
}

module.exports = {
    handleBattleAnimations
}