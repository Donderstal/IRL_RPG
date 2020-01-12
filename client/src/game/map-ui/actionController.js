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
        const spriteRow = state.playerCharacter.sprite.row
        const spriteCol = state.playerCharacter.sprite.col
        const direction = state.playerCharacter.sprite.direction

        state.currentMap.mapData.actions.forEach( ( action ) => {
            if ( spriteCol === action.col && spriteRow === action.row && direction === globals[action.direction] ) {
                handleAction(action)
            }
        } )
    }
}

const handleAction = (action) => {
    switch ( action.type ) {
        case "TEXT" :
            const sfx = new soundClass( action.sfx, true )
            sfx.play()
            canvasHelpers.writeToTextCanvas( action.text )
            break
            
    }
}
module.exports = {
    handleActionButton
}