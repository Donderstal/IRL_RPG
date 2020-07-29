const globals   = require('../../../game-data/globals');
const state     = require('../../../game-data/state');

class BattleUIWrapper {
    constructor(  ) {
        this.slotXValues = [
            globals.CANVAS_WIDTH - ( globals.BATTLE_UI_CHAR_WIDTH * 4 ),
            globals.CANVAS_WIDTH - ( globals.BATTLE_UI_CHAR_WIDTH * 3 ),
            globals.CANVAS_WIDTH - ( globals.BATTLE_UI_CHAR_WIDTH * 2 ),
            globals.CANVAS_WIDTH - ( globals.BATTLE_UI_CHAR_WIDTH * 1 ) 
        ];
        this.y = globals.CANVAS_HEIGHT - globals.BATTLE_UI_CHAR_HEIGHT;
    }

    switchSlots( ) {
        const battleMenu = state.battleState.battleMenu;
        const playerParty = state.battleState.playerParty
        let activeIndex = playerParty.activeMemberIndex;  
        switch ( activeIndex ) {
            case 0: 
                playerParty.members[0].statsBar.setXy(this.slotXValues[0], this.y)
                battleMenu.setXy(this.slotXValues[1], this.y)
                playerParty.members[1].statsBar.setXy(this.slotXValues[2], this.y)
                playerParty.members[2].statsBar.setXy(this.slotXValues[3], this.y)
                break;
            case 1: 
                playerParty.members[0].statsBar.setXy(this.slotXValues[0], this.y)
                playerParty.members[1].statsBar.setXy(this.slotXValues[1], this.y)
                battleMenu.setXy(this.slotXValues[2], this.y)
                playerParty.members[2].statsBar.setXy(this.slotXValues[3], this.y)
                break;
            case 2:
                battleMenu.setXy(this.slotXValues[0], this.y)
                playerParty.members[0].statsBar.setXy(this.slotXValues[1], this.y)
                playerParty.members[1].statsBar.setXy(this.slotXValues[2], this.y)
                playerParty.members[2].statsBar.setXy(this.slotXValues[3], this.y)
                break; 
            default:
                console.log('huilie')
                break;
        }
    }
}

module.exports = {
    BattleUIWrapper
}