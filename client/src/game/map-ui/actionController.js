const controls = require('./controls')
const state = require('../../game-data/state')
const globals = require('../../game-data/globals')
const canvasHelpers = require('../../helpers/canvasHelpers')
const soundHelper   = require('../../helpers/soundHelpers')
const soundClass    = soundHelper.soundClass

let pressedKeys = controls.pressedKeys
let actionIsActive = false

const handleActionButton = ( ) => {
    if ( pressedKeys.spaceBar ) {
        const sprite = state.playerCharacter.sprite
        const direction = sprite.direction

        state.currentMap.mapActions.forEach( ( action ) => {
            let fireAction;

            if ( direction === globals['FACING_LEFT'] ) {
                if ( direction == globals[action.direction] && action.x >= sprite.left ) {
                    if ( sprite.cell.y > action.top && sprite.cell.y < action.bottom)
                    fireAction = true
                }
            }
    
            if ( direction === globals['FACING_RIGHT'] ) {
                if ( direction == globals[action.direction] && action.x <= sprite.right ) {
                    console.log( sprite.cell.y > action.top && sprite.cell.y < action.bottom)
                    if ( sprite.cell.y > action.top && sprite.cell.y < action.bottom )
                    fireAction = true
                }
            }
    
            if ( direction === globals['FACING_UP'] ) {
                if ( direction == globals[action.direction] && action.y >= sprite.cell.y ) {
                    if ( sprite.cell.x > action.left && sprite.cell.x < action.right)
                    fireAction = true
                }
            }
    
            if ( direction === globals['FACING_DOWN'] ) {
                if ( direction == globals[action.direction] && action.y <= sprite.bottom ) {
                    if ( sprite.cell.x > action.left && sprite.cell.x < action.right)
                    fireAction = true
                }
            }
    
            if ( fireAction ) {
                handleAction(action)
            }

        } )
    }
}

const handleAction = (action) => {
    switch ( action.type ) {
        case "TEXT" :
            if ( !document.getElementById(action.sfx) ) {
                const sfx = new soundClass( action.sfx, true )
                sfx.play()
                setTimeout( () => {
                    document.getElementById(action.sfx).remove()                    
                }, 1500)
            } 
            canvasHelpers.writeToTextCanvas( action.text )
            break            
        }
}
module.exports = {
    handleActionButton
}