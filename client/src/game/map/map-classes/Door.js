const globals           = require('../../../game-data/globals')
const { GRID_BLOCK_PX } = require('../../../game-data/globals')
const I_Hitbox          = require('../../interfaces/I_Hitbox').I_Hitbox
/**
 * I_Hitbox extension that trigger the GAME.switchMap function if the player is in blockedRange
 * this.to stores the name of the map where the door leads to.
 */
class Door extends I_Hitbox {
    constructor( x, y, door ) {
        super( x, y, GRID_BLOCK_PX)
        this.to             = door.to;
        this.directionIn    = door.directionIn
        this.directionOut   = door.directionOut
        this.locked         = door.locked
        this.arcColor       = "#FFFFFF";

    }
    /**
     * Override of the base checkForBlockedRange.
     * If super.checkForBlockedRange, call GAME.switchMap to go the the map in the this.to prop.
     * @param {I_Hitbox} targetHitbox 
     * @param {String} targetDirection 
     */
    checkForBlockedRange( targetHitbox, targetDirection ) {
        if ( super.checkForBlockedRange( targetHitbox, targetDirection ) ) {
            globals.GAME.switchMap( this.to, "DOOR" );
            globals.GAME.sound.playEffect( "misc/random5.wav" );
        }
    }
}

module.exports = {
    Door
}