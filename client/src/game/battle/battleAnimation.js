const state = require('../../game-data/state')
const NPCs = require('../map/map-ui/NPCs')
const canvas = require('../../helpers/canvasHelpers')

const handleBattleAnimations = ( ) => {
    canvas.clearEntireCanvas("FRONT")

    let playerSprite = state.battleState.player.sprite
    let oppoSprite = state.battleState.opponent.sprite

    if ( playerSprite != undefined ) {
        if ( !playerSprite.animating ) {
            NPCs.handleStaticNPCAnimation( state.battleState.player )               
        }
        else {
            oppoSprite.moveSpriteToPlace( ) 
        }
        playerSprite.drawSprite()         
    }
    if ( oppoSprite != undefined ) {
        if ( !oppoSprite.animating ) {
            NPCs.handleStaticNPCAnimation( state.battleState.opponent )
        }
        else {
            oppoSprite.moveSpriteToPlace() 
        }
        oppoSprite.drawSprite() 
    }

    state.battleState.textContainer.drawContainer()    
}

module.exports = {
    handleBattleAnimations
}