const state = require('./state')

module.exports = {
    requestModeChange( newMode ) {
        state.changeRequest = newMode
    }
}