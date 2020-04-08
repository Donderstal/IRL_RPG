const state         = require('../../game-data/state')
const res           = require('../../resources/resourceStrings')
const globals       = require('../../game-data/globals')
const canvas        = require('../../helpers/canvasHelpers')
const Sound         = require('./../interfaces/I_Sound').Sound

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

    handlePhase( battleText, playerSprite, opponentSprite )

}

const handlePhase = ( battleText, playerSprite, opponentSprite ) => {
    const battleState = state.battleState
    const phase = battleState.battlePhase

    let playerHasTurn = battleState.player.hasTurn
    let playerCharacter = battleState.player.character;
    let opponentCharacter = battleState.opponent.character;

    switch ( phase ) {
        case globals['PHASE_BEGIN_TURN'] :
            let name = ( playerHasTurn ) ? playerCharacter.name : opponentCharacter.name   
            battleText.setText( name + "s turn begins!" )
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
                if ( !opponentSprite.moving ) {
                    const sfx = new Sound( "battle-baba.mp3", true )
                    sfx.play()
                    opponentSprite.animateAttack( "PUNCH" )
                    opponentSprite.setShout( res.getBattleShout(opponentCharacte.className, "FIGHT") )
                    playerSprite.animateHit( )
                    opponentCharacter.moves.attack( opponentCharacter, playerCharacter )
                    battleState.moveResultText = playerCharacter.name + " takes "+ battleState.currentMoveDamage +" damage!!!"                    
                }
            }
            else {
                battleText.setText( res.getBattleResString('BATTLE_USE_MOVE', { name: playerCharacter.name, move: "punch" } ) )
                battleState.moveResultText = opponentCharacter.name + " takes "+ battleState.currentMoveDamage +" damage!!!"  
                playerSprite.hasActiveButton = false;
                playerSprite.buttonSprites.forEach( (e) => { e.setActive( false ) } )
            }
            break;
        case globals['PHASE_STAT_CHECK'] :
            playerSprite.moving = false;
            opponentSprite.moving = false;
            battleText.setText( battleState.moveResultText )
            break;
        case "END" : 
            
    }
}

module.exports = {
    handleBattleAnimations
}