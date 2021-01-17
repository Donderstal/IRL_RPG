const globals           = require('../../../game-data/globals')
const { GRID_BLOCK_PX } = require('../../../game-data/globals')
const Sound             = require('../../interfaces/I_Sound').Sound
const I_Hitbox          = require('../../interfaces/I_Hitbox').I_Hitbox

class Door extends I_Hitbox {
    constructor( x, y, door ) {
        super( x, y, GRID_BLOCK_PX)
        this.to             = door.to;
        this.directionIn    = door.directionIn
        this.directionOut   = door.directionOut
        this.locked         = door.locked
        this.arcColor       = "#FFFFFF";

    }

    checkForBlockedRange( targetHitbox, targetDirection ) {
        if ( super.checkForBlockedRange( targetHitbox, targetDirection ) ) {
            globals.GAME.switchMap( this.to, "DOOR" );
            const sfx = new Sound( "misc/random5.wav", true )
            sfx.play()
        }
    }
}

module.exports = {
    Door
}