const globals       = require('../../../game-data/globals')
const I_Hitbox      = require('../../interfaces/I_Hitbox').I_Hitbox

class MapAction extends I_Hitbox {
    constructor ( x, y, action, speaker = null ) {
        let radius = globals.GRID_BLOCK_PX / 2;
        super( x, y, radius )

        this.name = speaker

        if ( action.character ) {
            this.character = action.character
        }
        this.type       = action.type
        this.text       = action.text
        this.sfx        = action.sfx
        this.direction  = action.direction
        this.to         = action.to
        this.arcColor   = "#FF0000";
        
    }
}

module.exports = {
    MapAction
}