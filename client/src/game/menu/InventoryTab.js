const { MenuTab } = require('../interfaces/I_MenuTab')
const globals = require('../../game-data/globals')

class InventoryMenuTab extends MenuTab {
    constructor( ) {
        super( "INVENTORY", "VERT_HORI", 20 )
        this.setButtonHeight( this.height / 10 );
        this.setButtonWidth( this.width / 2 );
        this.itemSubMenuOptions = [ "USE", "EQUIP", "DISCARD", "RETURN" ]
        this.activeOption;
    }

    setButtons( ) {
        const activeItems = globals.GAME.PLAYER_ITEMS.filter( ( Item ) => { return Item.Quantity > 0 } )
        if ( this.buttons[this.activeButton] != undefined ) {
            this.buttons[this.activeButton].deActivate( );
            this.buttons = [];            
        }
        if ( this.activeButton >= activeItems.length ) {
            this.activeButton = activeItems.length - 1;
        }
        this.setButtonsInColumn( 0, activeItems );

        super.activateButtonAndSetSubMenuPosition( );
        this.buttons.forEach( ( button, index ) => {
            button.updateContent( activeItems[index] )
        })

        this.setDisabledOptionsForItem( );
    }

    activateNextButtonInList( ) {
        super.activateNextButtonInList( )
        this.setDisabledOptionsForItem( );
    }

    activatePreviousButtonInList( ) {
        super.activatePreviousButtonInList( )
        this.setDisabledOptionsForItem( );
    }
    /**
     * Depending on the Category prop of this.activeItem, decide which options to disable
     */
    setDisabledOptionsForItem( ) {
        let optionsToDisable = [];
        if ( !this.activeItem.canBeEquipped ) {
            optionsToDisable.push( "EQUIP" );
        }
        if ( !this.activeItem.canBeUsed ) {
            optionsToDisable.push( "USE" );
        }        
        this.itemSubMenu.disableOptions( optionsToDisable );
    }

    doActiveModalOption( ) {
        if ( this.activeOption == "USE" && this.modal.activeButton.item != undefined  ) {
            console.log(this.activeItem)
            const selectedCharacter = globals.GAME.PARTY_MEMBERS[this.modal.activeButton.item.index]
            console.log(selectedCharacter.Name)
        }
        if ( this.activeOption == "EQUIP" && this.modal.activeButton.item != undefined ) {
            const selectedCharacter = globals.GAME.PARTY_MEMBERS[this.modal.activeButton.item.index];
            const itemToUnequip = selectedCharacter.Equipment.returnItemAtSlotOfGivenItem( this.activeItem );
            if ( itemToUnequip ) {
                globals.GAME.PLAYER_INVENTORY.unequipItem( selectedCharacter, itemToUnequip.ItemTypeId );                
            }
            globals.GAME.PLAYER_INVENTORY.equipItem( selectedCharacter, this.activeItem.ItemTypeId );
        }
        if ( this.activeOption == "DISCARD" && this.modal.activeButton.text == "YES" ) {
            globals.GAME.PLAYER_INVENTORY.removeItemsFromInnerListByID( [ this.activeItem.ItemTypeId ] )
        }
        this.unsetModal( );
        this.setButtons( );
    }

    selectCharacterForItem( ) {
        this.activeOption = this.itemSubMenuOptions[0];
        this.setModal(
            "Who should use a " + this.activeItem.Name + "?",
            this.activeOption
        )
    }

    selectCharacterForEquipment( ) {
        this.activeOption = this.itemSubMenuOptions[1];
        this.setModal(
            "Who should equip a " + this.activeItem.Name + "?",
            this.activeOption
        )
    }

    dismissItem( ) {
        this.activeOption = this.itemSubMenuOptions[2];
        this.setModal(
            "Throw away a " + this.activeItem.Name + "? This action can not be reversed!",
            this.activeOption
        )
    }
}

module.exports = { 
    InventoryMenuTab
}