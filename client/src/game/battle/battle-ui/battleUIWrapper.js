const globals   = require('../../../game-data/globals');
const state     = require('../../../game-data/state');
const { BattleChar } = require('../battle-init/battleChar');
const { BattleMenu } = require('./battleMenu');
const initTextContainer = require('./battleText').initTextContainer;

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
        this.textbox        = initTextContainer( );
        this.battleMenu     = new BattleMenu( );

        this.getInitialSlotContent( 
            this.battleMenu,
            this.playerParty.members
        );

        this.activeContentArray = []

        this.totalSlots = this.initialContentArray.length;
        this.activeCharIndex = 1;
        this.battleMenuIndex = 0;
        this.initializeSlots( );
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

    drawUI(  ) {
        this.textbox.drawTextBox( );
        this.slots.forEach( ( element ) => {
            element.draw( );
        } );
    }

    resetSlots( ) {
        this.slots.forEach( ( element, index ) => {
            element.setContent( this.initialContentArray[index], index );
        } );
    }

    setCharacterAsActive( character ) {
        if ( !character instanceof BattleChar ) {
            console.log("Error: character name " + character.name + " is not an instance of BattleChar")
        }

        this.activeCharacter = character
        this.battleMenu.activeCharacter = character
    }

    switchSlot( newMenuIndex, party ) {
        this.activeContentArray = Object.assign( [], party );
        this.activeContentArray.splice( newMenuIndex, 0, this.battleMenu );

        console.log("ACTIVE CONTENT ARRAY");
        console.log(this.activeContentArray);

        this.slots.forEach( ( element, index ) => {
            const newContent = index == newMenuIndex ? this.activeContentArray[index] : this.activeContentArray[index].statsBar;
            element.setContent( newContent, index );
        } );

        this.activateMenu( );

    }

    setText( text ) {
        this.textbox.setText( text );
    }

    setHeader( text ) {
        this.textbox.setHeader( text );
    }

    getMoveMenu( ) {
        this.battleMenu.getMoveMenu( );
    }

    getStandardMenu( ) {
        this.battleMenu.getStandardMenu( );
    }

    activateMenu( ) {
        this.activateButtonAtIndex( 1 );
    }

    activateButtonAtIndex( index ) {
        this.battleMenu.activateButtonAtIndex( index, this )
    }
}

class UISLot {
    constructor( content, index ) {
        this.x          = slotXValues[index];
        this.y          = slotY;
        this.isActive   = index == 1;

        this.setContent( content, index )
    }

    setContent( content, index ) {
        console.log( "new slot content!" )
        console.log(content)
        console.log(index)
        this.content    = content;
        this.isMenu     = content instanceof BattleMenu;
        this.content.setXy( slotXValues[index], this.y );
    }

    draw( ) {
        this.content.draw( );
    }
}

module.exports = {
    BattleUIWrapper
}