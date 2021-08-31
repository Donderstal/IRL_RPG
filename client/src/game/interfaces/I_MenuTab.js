const { CANVAS_WIDTH, CANVAS_HEIGHT, GRID_BLOCK_PX } = require('../../game-data/globals');
const globals = require('../../game-data/globals');
const { getNextIndexInArray, getPreviousIndexInArray } = require('../../helpers/utilFunctions');
const { MENU_ACTION_NEXT, MENU_ACTION_PREVIOUS } = require('../../game-data/uiGlobals')
const { Modal } = require("./I_Modal");
const { ItemSubMenu } = require('./I_ItemSubMenu');
const { MenuItem } = require('./I_MenuItem');
const { generateActionHint } = require('../../helpers/UITextHelper');
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
        globals.GAME.activeText = "This is the " + alignment + " tab.";
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
     * Decide what the new active buttons should be based on buttonType
     * Then call activateButtonAndSetSubMenuPosition
     * @param {String|Number} buttonType MENU_ACTION_NEXT, MENU_ACTION_PREVIOUS or a int to be used as button index
     */
    activateButton( buttonType ) {
        this.buttons[this.activeButton].deActivate( );

        if ( buttonType === MENU_ACTION_NEXT ) {
            this.activeButton = getNextIndexInArray( this.activeButton, this.buttons );
        }
        else if ( buttonType == MENU_ACTION_PREVIOUS ) {
            this.activeButton = getPreviousIndexInArray( this.activeButton, this.buttons )
        }
        else if ( Number.isInteger( buttonType ) ) {
            this.activeButton = buttonType;
        }
        else {
             console.log( "Error! Buttontype " + buttonType + " is invalid.")
        }

        this.activateButtonAndSetSubMenuPosition( false );
    }
    /**
     * Based on the current tabName, decide what to set as activeItem and description
     */
    setActiveItemAndDescription( ) {
        switch( this.tabName ) {
            case "STATUS": 
            case "EQUIP": 
                this.activeItem = this.buttons[this.activeButton].content.equipmentType;
                globals.GAME.activeText = "Equip something to your " + this.activeItem + " slot.";
                break;
            case "MEMBERS": 
                this.activeItem = this.buttons[this.activeButton].content;
                globals.GAME.activeText = "";
                break;
            case "INVENTORY": 
            case "BUY":
            case "SELL":
                this.activeItem = this.buttons[this.activeButton].content;
                globals.GAME.activeText = this.activeItem.Description;
                break;
            case "MAP":
                globals.GAME.activeText = "";
                break;
            case "GAME":
                globals.GAME.activeText = this.buttons[this.activeButton].content.description;
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
        console.log("TabName " + this.tabName + " was not recognized");
    }
    /**
     * Instantiate a MenuItems in a column.
     * Activate the button at this.activeButton
     * @param {Number} x position on x axis of all buttons
     * @param {Object[]} buttonContentList array of objects to assign as content to MenuItem instances
     */
    setButtonsInColumn( x, buttonContentList, activate = true ) {
        let y = ( this.buttonHeight * .125 ) + ( GRID_BLOCK_PX * 2 )
        buttonContentList.forEach( ( buttonContent, index ) => {
            this.buttons.push( new MenuItem( x, y + ( index * this.buttonHeight ), this.buttonWidth, this.buttonHeight * .75, this.tabName, buttonContent ) )
        } )
        if ( activate ) {
            this.buttons[this.activeButton].activate( )            
        }
    }
    /**
     * Instantiate a MenuItems in a row.
     * Activate the button at this.activeButton
     * @param {Number} y position on y axis of all buttons
     * @param {Object[]} buttonContentList array of objects to assign as content to MenuItem instances
     */
    setButtonsInRow( y, buttonContentList, activate = true ) {
        let x = ( this.buttonWidth * .125 );
        buttonContentList.forEach( ( buttonContent, index ) => {
            this.buttons.push( new MenuItem( x + ( index * this.buttonWidth ), y, this.buttonWidth * .75, this.buttonHeight, this.tabName, buttonContent ) )
        } )
        if ( activate ) {
            this.buttons[this.activeButton].activate( )            
        }
    }
    /**
     * Active the button at this.activeButton.
     * Set XY for the subMenu based on activeButton position
     * Then, call the subMenu initOptionsMethod and this.setActiveItemAndDescription;
     */
    activateButtonAndSetSubMenuPosition( initOptions = true ) {
        this.actionHints = [];
        this.buttons[this.activeButton].activate( );
        this.itemSubMenu.setXy( this.buttons[this.activeButton].x + this.buttons[this.activeButton].width, this.buttons[this.activeButton].y )
        if ( initOptions ) {
            this.itemSubMenu.initOptions( this.itemSubMenuOptions );            
        }
        if ( this.tabName == "INVENTORY" || this.tabName == "BUY" || this.tabName == "SELL" ) {
            this.actionHints = generateActionHint( this.buttons[this.activeButton].content, "ITEM", true )
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
            globals.GAME.sound.playEffect( "misc/menu-scroll-b.mp3")
            this.itemSubMenu.activate( );
        }
        else if ( this.itemSubMenu.isActive && !this.modal ) {
            globals.GAME.sound.playEffect( "misc/menu-select.mp3")
            this.doActiveSubMenuOption( );
        }
        else if ( this.modal ) {
            globals.GAME.sound.playEffect( "misc/menu-unselect.mp3")
            this.doActiveModalOption( );
        }
    }
}

module.exports = { 
    MenuTab
}