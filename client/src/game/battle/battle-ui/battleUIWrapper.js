const globals   = require('../../../game-data/globals');

class BattleUIWrapper {
    constructor(  ) {
        this.slots = [ ];
        this.slotXValues = [
            globals.CANVAS_WIDTH - ( globals.BATTLE_UI_CHAR_WIDTH * 4 ),
            globals.CANVAS_WIDTH - ( globals.BATTLE_UI_CHAR_WIDTH * 3 ),
            globals.CANVAS_WIDTH - ( globals.BATTLE_UI_CHAR_WIDTH * 2 ),
            globals.CANVAS_WIDTH - ( globals.BATTLE_UI_CHAR_WIDTH * 1 ) 
        ];
        this.y = globals.CANVAS_HEIGHT - globals.BATTLE_UI_CHAR_HEIGHT;
    }

    draw( ) {
        this.slots.forEach( slot => slot.draw( ) );
    }

    switchSlots( BattleMenuSlotIndex ) {
        let newIndex; 
        if ( BattleMenuSlotIndex == 0 || BattleMenuSlotIndex == 1 ) {
            newIndex = BattleMenuSlotIndex + 1; 
        }
        else if ( BattleMenuSlotIndex == 2 ) {
            newIndex = 0;
        }
        else {
            console.log(BattleMenuSlotIndex + " is not a valid slot to switch from ")
        }

        let spriteToSwitchOut = this.slots[newIndex];
        let battleMenu = this.slots[BattleMenuSlotIndex];

        this.slots[BattleMenuSlotIndex] = spriteToSwitchOut;
        this.slots[newIndex] = battleMenu
 
        this.slots[BattleMenuSlotIndex].setXy( this.slotXValues[BattleMenuSlotIndex], this.y );
        this.slots[newIndex].setXy( this.slotXValues[newIndex], this.y );
    
        console.log(this.slots)
    }
}

module.exports = {
    BattleUIWrapper
}