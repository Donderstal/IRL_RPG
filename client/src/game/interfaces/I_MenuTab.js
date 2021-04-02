const { CANVAS_WIDTH, CANVAS_HEIGHT, GRID_BLOCK_PX } = require('../../game-data/globals');
const globals = require('../../game-data/globals');
const { getNextIndexInArray, getPreviousIndexInArray } = require('../../helpers/utilFunctions');
const { Modal } = require("./I_Modal");
const { ItemSubMenu } = require('./I_ItemSubMenu');
const { MenuItem } = require('./I_MenuItem');
/**
 * MenuTab is the interface for all MenuTab classes found in the menu folder.
 * The in-game menu can be opened by pressing tab and contains five different MenuTabs
 * A menu tab consists out of a background, a set of MenuItems instances and a ItemSubMenu instance.
 * When selecting a menu action, a Modal class can also be instantiated.
 */
class MenuTab {
    constructor( tabName, alignment, maxButtons ) {
        this.tabName = tabName;
        this.alignment = alignment;
        this.height = CANVAS_HEIGHT - ( GRID_BLOCK_PX * 4 );
        this.width = CANVAS_WIDTH;
        this.margin = GRID_BLOCK_PX * .25;
        this.description = "This is the " + alignment + " tab.";
        this.activeButton = 0;
        this.itemSubMenu = new ItemSubMenu( );
        this.modal = false;
        this.buttons = [];
        this.itemSubMenuOptions = [];

        this.maxButtons;
    }
    /**
     * Call the draw method in each ModalButton instance in this.buttons
     * If there is a modal or submenu active, call draw them too
     */
    draw( ) {
        this.buttons.forEach( ( button ) => { button.draw( ); } );
        if ( this.itemSubMenu.isActive ) {
            this.itemSubMenu.draw( );
        }
        if ( this.modal ) {
            this.modal.draw( );
        }
    }
    /**
     * Set a Modal instance with given text and type to the this.modal property
     * @param {String} modalText the text that will be displayed in the modal
     * @param {String} actionType string representing the chosen action and active MenuTab
     */
    setModal( modalText, actionType ) {
        this.modal = new Modal( modalText, actionType + "-" + this.tabName );
    }
    /**
     * Set this.modal to false
     */
    unsetModal( ) {
        this.modal = false;
    }
    /**
     * Set given height as this.buttonHeight. 
     * This value is assigned to the buttons in this modal when a MenuItem is instantiated
     * @param {Number} height 
     */
    setButtonHeight( height ) {
        this.buttonHeight = height;
    }
    /**
     * Set given width as this.buttonHeight. 
     * This value is assigned to the buttons in this modal when a MenuItem is instantiated
     * @param {Number} width
     */
    setButtonWidth( width ) {
        this.buttonWidth = width;
    }
    /**
     * Call the deActivate method of current button
     * Set the index of the next button to this.activebutton.
     * Then call activateButtonAndSetSubMenuPosition
     */
    activateNextButtonInList( ) {
        this.buttons[this.activeButton].deActivate( )
        this.activeButton = getNextIndexInArray( this.activeButton, this.buttons )
        this.activateButtonAndSetSubMenuPosition( false );
    }
   /**
     * Call the deActivate method of current button
     * Set the index of the previous button to this.activebutton.
     * Then call activateButtonAndSetSubMenuPosition
     */
    activatePreviousButtonInList( ) {
        this.buttons[this.activeButton].deActivate( )
        this.activeButton = getPreviousIndexInArray( this.activeButton, this.buttons )
        this.activateButtonAndSetSubMenuPosition( false );
    }
    /**
     * Based on the current tabName, decide what to set as activeItem and description
     */
    setActiveItemAndDescription( ) {
        switch( this.tabName ) {
            case "STATUS": 
                this.activeItem = this.buttons[this.activeButton].content.equipmentType;
                this.description = "Equip something to your " + this.activeItem + " slot.";
                break;
            case "MEMBERS": 
                this.activeItem = this.buttons[this.activeButton].content;
                this.description = "";
                break;
            case "INVENTORY": 
                this.activeItem = this.buttons[this.activeButton].content.Item;
                this.description = this.activeItem.Description;
                break;
            case "MAP":
                this.description = "";
                break;
            case "GAME":
                this.description = this.buttons[this.activeButton].content.description;
                break;
            default:
                console.log("TabName " + this.tabName + " was not recognized");
        }
    }
    /**
     * Set this.activeOption. Call the function associated with the active option.
     * Then deactivate the submenu
     * @param {Number} optionIndex optional parameter
     */
    doActiveSubMenuOption( optionIndex = null ) {
        this.activeOption = this.itemSubMenu.getActiveOption( optionIndex );
        this.doCurrentSubMenuAction( );
        this.itemSubMenu.deActivate( );
    }
    /**
     * Call a function depending on the current tabName and activeOption
     */
    doCurrentSubMenuAction( ) {
        switch( this.tabName ) {
            case "STATUS": 
                if ( this.activeOption == "EQUIP" ) {
                    this.setModal( "Choose and item to equip to " + this.activeCharacter.Name, this.activeOption )
                }
                else if ( this.activeOption == "UNEQUIP" ) {
                    this.setModal( "Unequip the item?", this.activeOption )
                }
                this.setSelectedEquipmentAttributesValues( this.activeOption );
                break;
            case "MEMBERS": 
                if ( this.activeOption == "SHOW STATUS" ) {
                    globals.GAME.MENU.switchTab( "RIGHT", this.activeButton )
                }
                else if ( this.activeOption == "SELECT FOR MAP" ) {
                    globals.GAME.party.switchSprite( this.activeButton );
                }
                break;
            case "INVENTORY": 
                if ( this.activeOption == "USE" ) {
                    this.selectCharacterForItem( );
                }
                else if ( this.activeOption == "EQUIP" ) {
                    this.selectCharacterForEquipment( );
                } 
                else if ( this.activeOption == "DISMISS" ) {
                    this.dismissItem( );
                }
                break;
            case "MAP":
            case "GAME":
                break;
            default:
                console.log("TabName " + this.tabName + " was not recognized");
        }
    }
    /**
     * Instantiate a MenuItems in a column.
     * Activate the button at this.activeButton
     * @param {Number} x position on x axis of all buttons
     * @param {Object[]} buttonContentList array of objects to assign as content to MenuItem instances
     */
    setButtonsInColumn( x, buttonContentList ) {
        let y = ( this.buttonHeight * .125 ) + ( GRID_BLOCK_PX * 2 )
        buttonContentList.forEach( ( buttonContent, index ) => {
            this.buttons.push( new MenuItem( x, y + ( index * this.buttonHeight ), this.buttonWidth, this.buttonHeight * .75, this.tabName, buttonContent ) )
        } )
        this.buttons[this.activeButton].activate( )
    }
    /**
     * Instantiate a MenuItems in a row.
     * Activate the button at this.activeButton
     * @param {Number} y position on y axis of all buttons
     * @param {Object[]} buttonContentList array of objects to assign as content to MenuItem instances
     */
    setButtonsInRow( y, buttonContentList ) {
        let x = ( this.buttonWidth * .125 );
        buttonContentList.forEach( ( buttonContent, index ) => {
            this.buttons.push( new MenuItem( x + ( index * this.buttonWidth ), y, this.buttonWidth * .75, this.buttonHeight, this.tabName, buttonContent ) )
        } )
        this.buttons[this.activeButton].isActive = true;
    }
    /**
     * Active the button at this.activeButton.
     * Set XY for the subMenu based on activeButton position
     * Then, call the subMenu initOptionsMethod and this.setActiveItemAndDescription;
     */
    activateButtonAndSetSubMenuPosition( initOptions = true ) {
        this.buttons[this.activeButton].activate( );
        this.itemSubMenu.setXy( this.buttons[this.activeButton].x + this.buttons[this.activeButton].width, this.buttons[this.activeButton].y )
        if ( initOptions ) {
            this.itemSubMenu.initOptions( this.itemSubMenuOptions );            
        }
        this.setActiveItemAndDescription( );
    }
    /**
     * Empty the this.buttons array. Deactivate the submenu and clear it
     */
    unsetButtons( ) {
        this.buttons = [ ];
        this.itemSubMenu.deActivate( );
        this.itemSubMenu.clearSubMenu( );
    }
    /**
     * Decide what method to call on actionbutton click based on the status of this.modal and this.itemSubmenu
     */
    handleActionButton( ) {
        if ( !this.itemSubMenu.isActive && !this.modal ) {
            this.itemSubMenu.activate( );
        }
        else if ( this.itemSubMenu.isActive && !this.modal ) {
            this.doActiveSubMenuOption( );
        }
        else if ( this.modal ) {
            this.doActiveModalOption( );
        }
    }
}

module.exports = { 
    MenuTab
}