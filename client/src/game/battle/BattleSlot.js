const {     
    LEFT_BATTLE_POSITION_1, LEFT_BATTLE_POSITION_2, LEFT_BATTLE_POSITION_3,
    RIGHT_BATTLE_POSITION_1, RIGHT_BATTLE_POSITION_2, RIGHT_BATTLE_POSITION_3,
    SHEET_ROW_BATTLE_LEFT, SHEET_ROW_BATTLE_RIGHT
} = require('../../game-data/battleGlobals');
/**
 * A BattleSlot represents one of 6 available slots for a character in a Battle
 * The player characters are on the left, the opponent characters are on the right
 */
class BattleSlot {
    constructor( index, side ) {
        this.index  = index;
        this.side   = side;
        this.tilePosition   = this.setTilePosition( );
    }

    /**
     * Return the cell position of this slot based on this.index and this.side
     * This decides where to draw a sprite if one is loaded to the slot.
     */
    setTilePosition( ) {
        if ( this.side == "LEFT" ) {
            switch( this.index ) {
                case 0:
                    return LEFT_BATTLE_POSITION_1;
                case 1:
                    return LEFT_BATTLE_POSITION_2;
                case 2:
                    return LEFT_BATTLE_POSITION_3;
            }
        }
        else if ( this.side == "RIGHT" ) {
            switch( this.index ) {
                case 0:
                    return RIGHT_BATTLE_POSITION_1;
                case 1:
                    return RIGHT_BATTLE_POSITION_2;
                case 2:
                    return RIGHT_BATTLE_POSITION_3;
            }
        }
    }
}

module.exports = {
    BattleSlot
}