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
        
        const battleMenu = state.battleState.battleMenu;
        const playerParty = state.battleState.playerParty
        const partyMembers = playerParty.members
        let slotItemsArray = [ 
            battleMenu, partyMembers[0].statsBar, partyMembers[1].statsBar, partyMembers[2].statsBar 
        ];
        this.setSlots( slotItemsArray )
    }

    switchSlot( modifier ) {
        const battleMenu = state.battleState.battleMenu;
        const playerParty = state.battleState.playerParty
        const activeIndex = ( modifier == "NEXT" ) ? playerParty.activeMemberIndex : -playerParty.activeMemberIndex;
        const partyMembers = playerParty.members
        const slotItemsArray = this.goToNextSlot( activeIndex, partyMembers, battleMenu );

        this.setSlots( slotItemsArray )
    }

    goToNextSlot( activeIndex, partyMembers, battleMenu ) {
        switch ( activeIndex ) {
            case  0: 
            case -2:
                return [ 
                    partyMembers[0].statsBar, battleMenu, partyMembers[1].statsBar, partyMembers[2].statsBar 
                ];
            case  1: 
                return [ 
                    partyMembers[0].statsBar, partyMembers[1].statsBar, battleMenu, partyMembers[2].statsBar 
                ];
            case  2:
            case -1: 
                return [ 
                    battleMenu, partyMembers[0].statsBar, partyMembers[1].statsBar, partyMembers[2].statsBar 
                ];
            default:
                console.log('huilie')
                break;
        }
    }

    setSlots( slotItemsArray ) {
        for ( var i = 0; i < slotItemsArray.length; i++ ) {
            console.log(slotItemsArray[i])
            slotItemsArray[i].setXy(this.slotXValues[i], this.y)
        }
    }
}

module.exports = {
    BattleUIWrapper
}