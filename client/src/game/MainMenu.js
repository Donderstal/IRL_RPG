const globals  = require('../game-data/globals')

const { 
    CANVAS_WIDTH, CANVAS_HEIGHT, GRID_BLOCK_PX, 
    LARGE_FONT_LINE_HEIGHT, LARGE_FONT_SIZE
} = require('../game-data/globals');
const { drawRect, writeTextLine } = require('../helpers/canvasHelpers');
const { getNextIndexInArray, getPreviousIndexInArray } = require('../helpers/utilFunctions');

const { MembersMenuTab } = require('./menu/MembersTab');
const { StatusMenuTab } = require('./menu/StatusTab');
const { InventoryMenuTab } = require('./menu/InventoryTab');
const { MapMenuTab } = require('./menu/MapTab');
const { GameMenuTab } = require('./menu/GameTab');
const { I_Menu } = require('./interfaces/I_Menu');
/**
 * Set GAME.inMenu to true and assign a Menu instance to GAME.MENU
 */
const initGameMenu = ( ) => {
    globals.GAME.inMenu = true;
    globals.GAME.MENU = new MainMenu( );
}
/**
 * Set GAME.inMenu to false and assign null to GAME.MENU
 */
const unsetGameMenu = ( ) => {
    globals.GAME.inMenu = false;
    globals.GAME.MENU = null;
}
/**
 * The MainMenu class represents the in-game main menu.
 * It wraps a I_MenuTab extension instance, which contains one of five possible menu tabs.
 */
class MainMenu extends I_Menu {
    constructor( ) {
        super( CANVAS_WIDTH / 5, GRID_BLOCK_PX * 2 )
        this.mainScreenHeight = CANVAS_HEIGHT - this.tabHeight;
        this.uniqueTextMenuButtonHints = [ "[ Z ]", "[ X ]", "[ C ]", "[ V ]" ];
        this.initializeTabs( );
    }
    
    get activeText( ) {
        return this.ACTIVE_TAB.description;
    }

    get currentTextMenuButtonHints( ) {
        const buttonHints = this.ACTIVE_TAB.tabName == "BUY" ? [ "[ SPACEBAR ] - ADD TO BUYING LIST"] : this.ACTIVE_TAB.tabName == "SELL" ? [ "[ SPACEBAR ] - ADD TO SELLING LIST"] : [...this.textMenuButtonHints];
        const subMenuOptions = this.ACTIVE_TAB.itemSubMenu.activeOptions
        if ( subMenuOptions ) {
            subMenuOptions.forEach( ( e, index ) => {
                buttonHints.push( this.uniqueTextMenuButtonHints[index] + " - " + e )
            })        
        }
        return buttonHints;
     }

    drawMenuTextbox( ) {
        super.drawMenuTextbox( this.currentTextMenuButtonHints, this.ACTIVE_TAB.actionHints );
    }

    initializeTabs( ) {
        this.MEMBERS_TAB    = new MembersMenuTab( );
        this.STATUS_TAB     = new StatusMenuTab( );
        this.INVENTORY_TAB  = new InventoryMenuTab( );
        this.MAP_TAB        = new MapMenuTab( );
        this.GAME_TAB       = new GameMenuTab( );
        
        this.ACTIVE_TAB = this.MEMBERS_TAB;

        this.tabs = [
            this.MEMBERS_TAB,
            this.STATUS_TAB,
            this.INVENTORY_TAB,
            this.MAP_TAB,
            this.GAME_TAB
        ];

        this.ACTIVE_TAB.setButtons( )

        this.activeTabIndexes = {
            "STATUS": 0,
            "MEMBERS": 0,
            "INVENTORY": 0
        }
    }
    /**
     * Draw the menu background, active menu tab and bottom textbox
     */
    draw( ) {
        this.drawMenuBackground( );
        this.ACTIVE_TAB.draw( );
        this.drawMenuTextbox( );
        if ( this.ACTIVE_TAB.itemSubMenu.isActive ) {
            this.ACTIVE_TAB.itemSubMenu.draw( );
        }
        if ( this.ACTIVE_TAB.modal ) {
            this.ACTIVE_TAB.modal.draw( );
        }
    }
    /**
     * Draw the menu's background and tab buttons
     */
    drawMenuBackground( ) {
        drawRect( "FRONT", 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT, "#000000" )
        this.tabs.forEach( ( tab, index ) => {
            let tabX = this.tabWidth * index
            if ( tab == this.ACTIVE_TAB ) {
                drawRect( "FRONT", tabX, 0, this.tabWidth, this.tabHeight, "#D82BBA" )
            }
            else {
                drawRect( "FRONT", tabX, 0, this.tabWidth, this.tabHeight, "#64005380" )            
            }
    
            writeTextLine( 
                tab.tabName, tabX + LARGE_FONT_LINE_HEIGHT, 
                0 + LARGE_FONT_LINE_HEIGHT, LARGE_FONT_SIZE 
            );
        })
        drawRect( "FRONT", 0, this.tabHeight, CANVAS_WIDTH, this.mainScreenHeight, "#64005380"  )
    }
    /**
     * Switch to the next or previous tab in this.tabs depening on given string
     * @param {String} direction "LEFT" || "RIGHT"
     */
    switchTab ( direction, selectedCharacterIndex = null ) {
        if ( this.ACTIVE_TAB.modal ) {
            return;
        }
        if ( this.ACTIVE_TAB.tabName != "MAP" ) {
            this.activeTabIndexes[this.ACTIVE_TAB.tabName] = this.ACTIVE_TAB.tabName == "STATUS" || this.ACTIVE_TAB.tabName == "EQUIP" 
                ? this.ACTIVE_TAB.activeCharacterIndex 
                : this.ACTIVE_TAB.activeButton
        }
    
        this.ACTIVE_TAB.unsetButtons( )
    
        const currentTabIndex = this.tabs.indexOf( this.ACTIVE_TAB )
        let newIndex = direction == "LEFT" 
            ? getPreviousIndexInArray( currentTabIndex, this.tabs ) 
            : getNextIndexInArray( currentTabIndex, this.tabs );

        this.ACTIVE_TAB = this.tabs[newIndex]
        if ( this.ACTIVE_TAB.tabName != "MAP" ) {
            this.ACTIVE_TAB.setButtons( selectedCharacterIndex != null ? selectedCharacterIndex : this.activeTabIndexes[this.ACTIVE_TAB.tabName] )
        }
    }
}

module.exports = {
    initGameMenu,
    unsetGameMenu,
    MainMenu
}