const state = require('../../../game-data/state')
const globals = require('../../../game-data/globals')
const displayText   = require('./displayText')
const soundHelper = require('../../interfaces/I_Sound')

const handleActionButton = ( ) => {
    const sprite = state.playerCharacter.sprite
    const direction = sprite.direction

    const npcActions = []

    if ( state.currentMap.bubbleIsActive ) {
        state.currentMap.activeBubble = {}
        state.currentMap.bubbleIsActive = false
    }
    
    if ( state.currentMap.NPCs ) {
        state.currentMap.NPCs.forEach( ( NPC) => {
            npcActions.push(NPC.action)
        } )
    }

    const allActions = [ ...state.currentMap.mapActions, ...npcActions ]
    allActions.forEach( ( action ) => {
        let fireAction;

        if ( direction === globals['FACING_LEFT'] && action.direction === 'FACING_LEFT' ) {
            if ( action.x >= sprite.left ) {
                if ( sprite.cell.y > action.top && sprite.cell.y < action.bottom)                
                fireAction = true
            }
        }

        if ( direction === globals['FACING_RIGHT'] && action.direction === 'FACING_RIGHT' ) {
            if ( action.x <= sprite.right ) {
                if ( sprite.cell.y > action.top && sprite.cell.y < action.bottom )
                fireAction = true
            }
        }

        if ( direction === globals['FACING_UP'] && action.direction === 'FACING_UP' ) {
            if ( action.y >= sprite.cell.y ) {
                if ( sprite.cell.x > action.left && sprite.cell.x < action.right)
                fireAction = true
            }
        }

        if ( direction === globals['FACING_DOWN'] && action.direction === 'FACING_DOWN' ) {

            if ( action.y <= sprite.bottom ) {
                if ( sprite.cell.x > action.left && sprite.cell.x < action.right)
                fireAction = true
            }
        }

        if ( fireAction ) {
            handleAction( action )
        }

    } )
}

const handleAction = ( action ) => {
    switch ( action.type ) {
        case "TEXT" :
            displayActionText( action )

            break            
        case "BATTLE" :
            displayActionText( action )
            state.battleState.requestingBattle = true
            break            
        }
}

const displayActionText = ( action ) => {
    if ( !document.getElementById(action.sfx) ) {
        const sfx = new soundHelper.Sound( action.sfx, true )
        sfx.play()
        setTimeout( () => {
            document.getElementById(action.sfx).remove()                    
        }, 1500)
    } 
    displayText.getSpeechBubble( action )
}
module.exports = {
    handleActionButton
}