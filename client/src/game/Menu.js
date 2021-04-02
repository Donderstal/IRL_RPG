const globals  = require('../game-data/globals')

const { 
    CANVAS_WIDTH, CANVAS_HEIGHT, GRID_BLOCK_PX, 
    LARGE_FONT_LINE_HEIGHT, LARGE_FONT_SIZE, SMALL_FONT_LINE_HEIGHT, SMALL_FONT_SIZE 
} = require('../game-data/globals');
const { drawRect, writeTextLine } = require('../helpers/canvasHelpers');
const { getNextIndexInArray, getPreviousIndexInArray } = require('../helpers/utilFunctions');

const { MembersMenuTab } = require('./menu/MembersTab');
const { StatusMenuTab } = require('./menu/StatusTab');
const { InventoryMenuTab } = require('./menu/InventoryTab');
const { MapMenuTab } = require('./menu/MapTab');
const { GameMenuTab } = require('./menu/GameTab');
/**
 * Set GAME.inMenu to true and assign a Menu instance to GAME.MENU
 */
const initGameMenu = ( ) => {
    globals.GAME.inMenu = true;
    globals.GAME.MENU = new Menu( );
}
/**
 * Set GAME.inMenu to false and assign null to GAME.MENU
 */
const unsetGameMenu = ( ) => {
    globals.GAME.inMenu = false;
    globals.GAME.MENU = null;
}
/**
 * The Menu class represents the in-game main menu.
 * It wraps a I_MenuTab extension instance, which contains one of five possible menu tabs.
 * Each time the menu is opened, a new Menu is instantiated. On closing, it is destroyed.
 */
class Menu {
    constructor( ) {
        this.tabWidth   = CANVAS_WIDTH / 5;
        this.tabHeight  = GRID_BLOCK_PX * 2;
        this.mainScreenHeight = CANVAS_HEIGHT - this.tabHeight;

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
    }
    /**
     * Draw the menu background, active menu tab and bottom textbox
     */
    draw( ) {
        this.drawMenuBackground( );
        this.ACTIVE_TAB.draw( );
        this.drawMenuTextbox( );
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
     * Draw the textbox at the bottom of the menu
     */
    drawMenuTextbox( ) {
        const controlOptions = [ "[ Z ]", "[ X ]", "[ C ]", "[ V ]" ]
        drawRect( "FRONT", 0, CANVAS_HEIGHT - this.tabHeight, CANVAS_WIDTH, this.tabHeight, "#D82BBA" )
        writeTextLine( 
            this.ACTIVE_TAB.description, 0 + LARGE_FONT_LINE_HEIGHT, 
            ( CANVAS_HEIGHT - this.tabHeight ) + LARGE_FONT_LINE_HEIGHT, LARGE_FONT_SIZE 
        );
        writeTextLine( 
            "[ SPACEBAR ] - CONFIRM/SELECT", 0 + SMALL_FONT_LINE_HEIGHT, 
            CANVAS_HEIGHT - SMALL_FONT_LINE_HEIGHT, SMALL_FONT_SIZE 
        );
        
        const subMenuOptions = this.ACTIVE_TAB.itemSubMenu.options
        if ( subMenuOptions ) {
            subMenuOptions.forEach( ( e, index ) => {
                writeTextLine( 
                    controlOptions[index] + " - " + e, 0 + SMALL_FONT_LINE_HEIGHT + ( ( CANVAS_WIDTH * .25 ) * ( index + 1 )), 
                    CANVAS_HEIGHT - SMALL_FONT_LINE_HEIGHT, SMALL_FONT_SIZE 
                );
            })        
        }
    }
    /**
     * Switch to the next or previous tab in this.tabs depening on given string
     * @param {String} direction "LEFT" || "RIGHT"
     */
    switchTab ( direction, selectedCharacterIndex = null ) {
        if ( this.ACTIVE_TAB.modal ) {
            return;
        }
    
        this.ACTIVE_TAB.unsetButtons( )
    
        const currentTabIndex = this.tabs.indexOf( this.ACTIVE_TAB )
        let newIndex = direction == "LEFT" 
            ? getPreviousIndexInArray( currentTabIndex, this.tabs ) 
            : getNextIndexInArray( currentTabIndex, this.tabs );

        this.ACTIVE_TAB = this.tabs[newIndex]
        if ( this.ACTIVE_TAB.tabName != "MAP" ) {
            this.ACTIVE_TAB.setButtons( selectedCharacterIndex )
        }
    }
}

module.exports = {
    initGameMenu,
    unsetGameMenu
}