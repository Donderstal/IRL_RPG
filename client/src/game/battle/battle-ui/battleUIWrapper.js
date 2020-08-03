const globals   = require('../../../game-data/globals');
const state     = require('../../../game-data/state');
const { BattleChar } = require('../battle-init/battleChar');

const slotXValues = [
    globals.CANVAS_WIDTH - ( globals.BATTLE_UI_CHAR_WIDTH * 4 ),
    globals.CANVAS_WIDTH - ( globals.BATTLE_UI_CHAR_WIDTH * 3 ),
    globals.CANVAS_WIDTH - ( globals.BATTLE_UI_CHAR_WIDTH * 2 ),
    globals.CANVAS_WIDTH - ( globals.BATTLE_UI_CHAR_WIDTH * 1 ) 
];

const slotY = globals.CANVAS_HEIGHT - globals.BATTLE_UI_CHAR_HEIGHT;

class BattleUIWrapper {
    constructor(  ) {
        this.playerParty    = state.battleState.playerParty;

        this.battleMenu     = state.battleState.battleMenu;
        this.textbox        = state.battleState.textContainer;
        this.getInitialSlotContent( 
            this.battleMenu,
            this.playerParty.members
         );

        this.totalSlots = slotContentArray.length;
        this.activeCharIndex = 1;
        this.battleMenuIndex = 0;
        this.initializeSlots( );
        this.activateSlot( );
    }

    getInitialSlotContent( battleMenu, partyMembers ) {
        this.initialContentArray = [ 
            battleMenu
        ];

        partyMembers.forEach( ( member ) => {
            this.initialContentArray.push( member.statsBar )
        } );
    }

    initializeSlots( ) {
        this.slots = [] 
        this.initialContentArray.forEach( ( element, index ) => {
            this.slots.push( new UISLot(  element, index ) )
        } );
    }

    activateSlot( ) {
        if ( this.activeCharacter ) {
            this.activeCharacter.deActivate( );
        }

        this.slots[this.activeCharIndex].setAsActiveChar( this.activeCharIndex );
    }

    drawUI(  ) {
        this.textbox.drawTextBox( );
        this.slots.forEach( ( element ) => {
            element.draw( );
        } );
    }

    resetSlots( ) {
        this.slots.forEach( ( element, index ) => {
            element.setContent( this.initialContentArray[index] );
        } );

        this.activeCharIndex = 1;
        this.battleMenuIndex = 0;
    }

    setCharacterAsActive( character ) {
        if ( !character instanceof BattleChar ) {
            console.log("Error: character name " + character.name + " is not an instance of BattleChar")
        }

        this.activeCharacter = character
        this.battleMenu.activeCharacter = character
    }

    switchSlot( modifier ) {
        modifier == "NEXT" ? this.switchToNextSlot( ) : this.switchToPreviousSlot( );
        this.battleMenu.resetMenu( );

        this.slots[this.battleMenuIndex].setContent( this.battleMenu, this.battleMenuIndex );
        this.slots[this.activeCharIndex].setContent( this.activeChar.statsBar, this.activeCharIndex );
    }

    switchToNextSlot( ) {
        this.activeCharIndex -= 1;
        this.battleMenuIndex += 1;
    }

    switchToPreviousSlot( ) {
        this.activeCharIndex += 1;
        this.battleMenuIndex -= 1;        
    }

    setText( text ) {
        this.textbox.setText( text );
    }
}

class UISLot {
    constructor( index, content ) {
        this.x          = slotXValues[index];
        this.y          = slotY;
        this.isActive   = index == 1;

        this.setContent( content )
    }

    setContent( content, index ) {
        this.content    = content;
        this.isMenu     = content instanceof BattleMenu;
        this.content.setXy( this.x[index], this.y );
    }

    draw( ) {
        this.content.draw( );
    }
}

module.exports = {
    BattleUIWrapper
}