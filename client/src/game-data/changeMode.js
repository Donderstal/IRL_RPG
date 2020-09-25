const state = require('./state')
const toggleLetterBoxDivs = require('../helpers/utilFunctions').toggleLetterBoxDivs

module.exports = {
    requestModeChange( newMode ) {
        state.changeRequest = newMode
        if ( newMode == 'CINEMATIC' || newMode == 'CINEMATIC_END' ) {
            toggleLetterBoxDivs( );
        }
    }
}