const {     
    LEFT_BATTLE_POSITION_1, LEFT_BATTLE_POSITION_2, LEFT_BATTLE_POSITION_3,
    RIGHT_BATTLE_POSITION_1, RIGHT_BATTLE_POSITION_2, RIGHT_BATTLE_POSITION_3,
    SHEET_ROW_BATTLE_FACING_LEFT, SHEET_ROW_BATTLE_FACING_RIGHT
} = require('../../game-data/battleGlobals');
const globals = require('../../game-data/globals');
const { Sprite } = require('../interfaces/I_Sprite');
/**
 * A BattleSlot represents one of 6 available slots for a character in a Battle
 * The player characters are on the left, the opponent characters are on the right
 */
class BattleSlot {
    constructor( index, side ) {
        this.index  = index;
        this.side   = side;
        this.tile   = [ ];
        this.sprite = null;
        this.tilePosition   = this.setTilePosition( );
        this.tile = globals.GAME.FRONT.battleGrid.getTileAtCell( this.tilePosition.column, this.tilePosition.row );
    }

    /**
     * Return the cell position of this slot based on this.index and this.side
     * This decides where to draw a sprite if one is loaded to the slot.
     */
    setTilePosition( ) {
        if ( this.side == "LEFT" ) {
            this.startingDirection = SHEET_ROW_BATTLE_FACING_RIGHT;
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
            this.startingDirection = SHEET_ROW_BATTLE_FACING_LEFT;
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
    /**
     * Initialize a battlesprite based on the given character
     * @param {Character} character - Character instance that will do battle
     */
    initializeSpriteInSlot( character ) {
        this.sprite = new Sprite( this.tile, 'LARG', character.Sprite.src, this.startingDirection );
    }
    /**
     * If there is a sprite in the slot, draw it
     */
    drawSpriteInSlot( ) {
        if ( this.sprite != null ) {
            this.sprite.drawSprite( );            
        }
    }
}

module.exports = {
    BattleSlot
}