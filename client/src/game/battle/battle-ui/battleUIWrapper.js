const battleGlobals   = require('../battleGlobals');
const { BattleMenu } = require('./battleMenu');
const TextContainer = require('./battleText').TextContainer;

class BattleUIWrapper {
    constructor( playerPartyMembers, oppoPartyMembers ) {
        this.textbox        = new TextContainer( );
        this.battleMenu     = new BattleMenu( playerPartyMembers[0] );

        this.getInitialSlotContent( playerPartyMembers );

        this.activeContentArray = []

        this.totalSlots = this.initialContentArray.length;
        this.activeCharIndex = 1;
        this.battleMenuIndex = 0;
        this.initializeSlots( );
    }

    get activeButtonText( ) { return this.battleMenu.activeButton.text; }
    get activeButtonMove( ) { return this.battleMenu.activeButton.move; }
    get activeButtonIndex( ) { return this.battleMenu.activeButton.index }
    get inMoveMenu( ) { return this.battleMenu.inMoveMenu; }
    get inItemMenu( ) { return this.battleMenu.inItemMenu; }

    setText( text ) 
        { this.textbox.setText( text ); };
    setHeader( text ) 
        { this.textbox.setHeader( text ); };
    getMoveMenu( ) 
        { this.battleMenu.getMoveMenu( ); };
    getStandardMenu( ) 
        { this.battleMenu.getStandardMenu( ); };
    activateMenu( ) 
        { this.activateButtonAtIndex( 1 ); };
    activateButtonAtIndex( index ) 
        { this.battleMenu.activateButtonAtIndex( index, this ); };
    setCharacterAsActive( character ) 
        { this.battleMenu.activeCharacter = character; };

    getInitialSlotContent( partyMembers ) {
        this.initialContentArray = [ this.battleMenu ];
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

    switchSlot( newMenuIndex, party ) {
        this.activeContentArray = Object.assign( [], party );
        this.activeContentArray.splice( newMenuIndex, 0, this.battleMenu );

        this.slots.forEach( ( element, index ) => {
            const newContent = index == newMenuIndex ? this.activeContentArray[index] : this.activeContentArray[index].statsBar;
            element.setContent( newContent, index );
        } );

        this.activateMenu( );
    }

}

class UISLot {
    constructor( content, index ) {
        this.x          = battleGlobals.UI_SLOT_X_ARRAY[index];
        this.y          = battleGlobals.UI_SLOT_Y;
        this.isActive   = index == 1;

        this.setContent( content, index )
    }

    setContent( content, index ) {
        this.content    = content;
        this.isMenu     = content instanceof BattleMenu;
        this.content.setXy( battleGlobals.UI_SLOT_X_ARRAY[index], this.y );
    }

    draw( ) {
        this.content.draw( );
    }
}

module.exports = {
    BattleUIWrapper
}