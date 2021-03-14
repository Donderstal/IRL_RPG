const { CANVAS_WIDTH, CANVAS_HEIGHT, LARGE_FONT_SIZE, GRID_BLOCK_PX, LARGE_FONT_LINE_HEIGHT, BATTLE_FONT_SIZE, BATTLE_FONT_LINE_HEIGHT } = require('../../game-data/globals');
const { writeTextLine, drawRect, drawFromImageToCanvas, getFrontCanvasContext } = require('../../helpers/canvasHelpers');
const { Modal } = require("./I_Modal")
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
     * Call the activate button of the next button
     * Set the next buttons' xy value to the itemSubMenu
     */
    activateNextButtonInList( ) {
        this.buttons[this.activeButton].deActivate( )
        this.activeButton += 1;
        if ( this.activeButton >= this.buttons.length ) {
            this.activeButton = 0;
        }
        this.buttons[this.activeButton].activate( )
        this.itemSubMenu.setXy( this.buttons[this.activeButton].x + this.buttons[this.activeButton].width, this.buttons[this.activeButton].y )
    }
   /**
     * Call the deActivate method of current button
     * Set the index of the previous button to this.activebutton.
     * Call the activate button of the previous button
     * Set the next buttons' xy value to the itemSubMenu
     */
    activatePreviousButtonInList( ) {
        this.buttons[this.activeButton].deActivate( )
        this.activeButton -= 1;
        if ( this.activeButton < 0 ) {
            this.activeButton = this.buttons.length - 1;
        }
        this.buttons[this.activeButton].activate( )
        this.itemSubMenu.setXy( this.buttons[this.activeButton].x + this.buttons[this.activeButton].width, this.buttons[this.activeButton].y )
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
     * (INCOMPLETE)
     */
    setButtons( ) {
        console.log( 'hi this is ' + this.tabName )
    }
    /**
     * Empty the this.buttons array. Deactivate the submenu and clear it
     */
    unsetButtons( ) {
        this.buttons = [ ];
        this.itemSubMenu.deActivate( );
        this.itemSubMenu.clearSubMenu( );
    }
    
}
/**
 * The player can perform different actions on MenuItems. The available actions differ per type of MenuTab.
 * The ItemSubMenu is activated by selecting a MenuItem with the spacebar.
 * Within there are up to four possible actions for the player to select.
 */
class ItemSubMenu {
    constructor( ) {
        this.x;
        this.y;
        this.width = GRID_BLOCK_PX * 3;
        this.height;
        this.options;
        this.isInitialized;
        this.isActive;
    }
    /**
     * Draw the submenu. For each option, write a textline to the front canvas
     */
    draw( ) {
        drawRect( "FRONT", this.x, this.y, this.width, this.height, "#D82BBA");
        this.options.forEach( ( e, index ) => {
            writeTextLine( 
                e, 
                this.x + LARGE_FONT_LINE_HEIGHT + LARGE_FONT_LINE_HEIGHT, this.y + LARGE_FONT_SIZE + ( LARGE_FONT_LINE_HEIGHT * index), 
                LARGE_FONT_SIZE 
            );
            if ( index === this.activeOption && this.isActive ) {
                getFrontCanvasContext().beginPath();
                getFrontCanvasContext().rect(this.x + 2, this.y + (this.activeOption * LARGE_FONT_LINE_HEIGHT) + 2, this.width - 4, LARGE_FONT_LINE_HEIGHT - 4);
                getFrontCanvasContext().stroke();
            }
        } ) 
    }
    /**
     * Assign given x y pair to this.x and this.y
     * @param {Number} x 
     * @param {Number} y 
     */
    setXy( x, y ) {
        this.x = x;
        this.y = y;
    }
    /**
     * Clear this.options.
     * Then, assign the given options to this.options and set this.isInitialized to true.
     * @param {String[]} options List of String representing menu actions
     */
    initOptions( options ) {
        this.options = [ ];
        options.forEach( ( option ) => {
            this.options.push( option )
        })

        this.height = options.length * LARGE_FONT_LINE_HEIGHT;
        this.isInitialized = true;
    }
    /**
     * Clear the ItemSubMenu properties x, y, height and options.
     * Set this.isInitialized to false
     */
    clearSubMenu( ) {
        this.x = null;
        this.y = null;
        this.height = null;
        this.options = null;
        this.isInitialized = false;
    }
    /**
     * Set this.isActive to true. Set activeOptions to 0.
     */
    activate( ) {
        this.activeOption = 0;
        this.isActive = true;
    }
    /**
     * Set this.isActive to flase. Set activeOptions to null.
     */
    deActivate( ) {
        this.activeOption = null;
        this.isActive = false;
    }
    /**
     * Increment this.activeOption by one if possible. If not, assign zero to it.
     */
    setNextOption( ) {
        this.activeOption += 1;
        if ( this.activeOption >= this.options.length ) {
            this.activeOption = 0;
        }
    }
    /**
     * Decrement this.activeOption by one if possible. If not, assign this.options.length - 1 to it.
     */
    setPreviousOption( ) {
        this.activeOption -= 1;
        if ( this.activeOption < 0 ) {
            this.activeOption = this.options.length - 1;
        }
    }
    /**
     * Return the option at given index. If given index is null, return the options at this.activeOption
     * @param {Number} index index of an option in the array this.options
     */
    getActiveOption( index ) {
        return this.options[index == null ? this.activeOption : index];
    }
}
/**
 * Each tab in the main menu is filled with a set of items. The content of these items vary.
 * In the inventory tab it's items, in the members tab it's a party member.
 * The this.type property stores the name of the active MenuTab
 * The this.content prop stores the selectable content.
 */
class MenuItem { 
    constructor( x, y, width, height, type, content ) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.type = type;
        this.content = content;

        this.isActive = false;        
        this.activeButtonColor = "#D82BBA";
        this.standardButtonColor = "#00384D";

        this.displayText;
        this.setDisplayText( );
    }
    /**
     * Draw the MenuItem. Its size, and contents vary depending on the active MenuTab
     */
    draw( ) {
        drawRect( "FRONT", this.x, this.y, this.width, this.height, this.standardButtonColor )
        if ( this.isActive ) {
            drawRect( "FRONT", this.x + ( LARGE_FONT_LINE_HEIGHT / 8 ), this.y + ( LARGE_FONT_LINE_HEIGHT / 8), this.width, this.height, this.activeButtonColor )
        }
        if ( this.type == "INVENTORY" ) {
            drawFromImageToCanvas( 
                "FRONT", this.content.Item.Image, 
                0, 0, 807, 806, 
                this.x + ( this.width - ( LARGE_FONT_LINE_HEIGHT * 2 ) ), this.y + ( ( this.height - LARGE_FONT_LINE_HEIGHT ) / 2 ), 
                LARGE_FONT_LINE_HEIGHT, LARGE_FONT_LINE_HEIGHT 
            );           
        }

        if ( this.type != "MEMBERS" ) {
            writeTextLine( 
                this.displayText, 
                this.x + LARGE_FONT_LINE_HEIGHT + LARGE_FONT_LINE_HEIGHT, this.y + LARGE_FONT_LINE_HEIGHT, 
                LARGE_FONT_SIZE 
            );            
        }
        else {
            writeTextLine( 
                this.displayText, 
                this.x + ( LARGE_FONT_LINE_HEIGHT * 2 ), this.y + BATTLE_FONT_LINE_HEIGHT, 
                BATTLE_FONT_SIZE
            );    
            writeTextLine( 
                "Hitpoints: " + this.content.CurrentHitpoints +"/"+ this.content.MaximumHitpoints, 
                this.x + ( LARGE_FONT_LINE_HEIGHT * 2 ), this.y + BATTLE_FONT_LINE_HEIGHT + LARGE_FONT_LINE_HEIGHT, 
                LARGE_FONT_SIZE 
            ); 
            writeTextLine( 
                "Level: " + this.content.Level, 
                this.x + ( LARGE_FONT_LINE_HEIGHT * 2 ), this.y + BATTLE_FONT_LINE_HEIGHT + ( LARGE_FONT_LINE_HEIGHT * 2 ), 
                LARGE_FONT_SIZE 
            ); 
            writeTextLine( 
                "Experience: " + this.content.Experience, 
                this.x + ( LARGE_FONT_LINE_HEIGHT * 2 ), this.y + BATTLE_FONT_LINE_HEIGHT + ( LARGE_FONT_LINE_HEIGHT * 3 ), 
                LARGE_FONT_SIZE 
            ); 
        }
    }
    /**
     * Set the this.isActive prop to true
     */
    activate( ) {
        this.isActive = true;
    }
    /**
     * Set the this.isActive prop to false
     */
    deActivate( ) {
        this.isActive = false;
    }
    /**
     * Set the this.displayText prop depending on the value of this.type
     */
    setDisplayText( ) {
        switch( this.type ) {
            case "INVENTORY":
                this.displayText = this.content.Quantity + "x - " + this.content.Item.Name 
                break;
            case "GAME":
                this.displayText = this.content.title;
                break;
            case "MEMBERS":
                this.displayText = this.content.Name;
        }
    }
}

module.exports = { 
    MenuTab
}