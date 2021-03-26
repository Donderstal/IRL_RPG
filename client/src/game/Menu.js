const globals  = require('../game-data/globals')

const { 
    CANVAS_WIDTH, CANVAS_HEIGHT, GRID_BLOCK_PX, 
    LARGE_FONT_LINE_HEIGHT, LARGE_FONT_SIZE, SMALL_FONT_LINE_HEIGHT, SMALL_FONT_SIZE 
} = require('../game-data/globals');
const { drawRect, writeTextLine } = require('../helpers/canvasHelpers');

const { MembersMenuTab } = require('./menu/MembersTab');
const { StatusMenuTab } = require('./menu/StatusTab');
const { InventoryMenuTab } = require('./menu/InventoryTab');
const { MapMenuTab } = require('./menu/MapTab');
const { GameMenuTab } = require('./menu/GameTab');

const initGameMenu = ( ) => {
    globals.GAME.inMenu = true;
    globals.GAME.MENU = new Menu( );
}

const unsetGameMenu = ( ) => {
    globals.GAME.inMenu = false;
    globals.GAME.MENU = null;
}

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
        
        this.ACTIVE_MENU_TAB = this.MEMBERS_TAB;

        this.tabs = [
            this.MEMBERS_TAB,
            this.STATUS_TAB,
            this.INVENTORY_TAB,
            this.MAP_TAB,
            this.GAME_TAB
        ];

        this.ACTIVE_MENU_TAB.setButtons( )
    }

    draw( ) {
        this.drawMenuUI( );
        this.ACTIVE_MENU_TAB.draw( );
        this.drawMenuTextbox( );
    }

    drawMenuUI( ) {
        drawRect( "FRONT", 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT, "#000000" )
        this.tabs.forEach( ( tab, index ) => {
            let tabX = this.tabWidth * index
            if ( tab == this.ACTIVE_MENU_TAB ) {
                drawRect( "FRONT", tabX, 0, this.tabWidth, this.tabHeight, "#D82BBA" )
            }
            else {
                drawRect( "FRONT", tabX, 0, this.tabWidth, this.tabHeight, "#64005380" )            
            }
    
            writeTextLine( tab.tabName, tabX + LARGE_FONT_LINE_HEIGHT, 0 + LARGE_FONT_LINE_HEIGHT, LARGE_FONT_SIZE )
        })
        drawRect( "FRONT", 0, this.tabHeight, CANVAS_WIDTH, this.mainScreenHeight, "#64005380"  )
    }

    drawMenuTextbox( ) {
        const controlOptions = [ "[ Z ]", "[ X ]", "[ C ]", "[ V ]" ]
        drawRect( "FRONT", 0, CANVAS_HEIGHT - this.tabHeight, CANVAS_WIDTH, this.tabHeight, "#D82BBA" )
        writeTextLine( 
            this.ACTIVE_MENU_TAB.description, 0 + LARGE_FONT_LINE_HEIGHT, 
            ( CANVAS_HEIGHT - this.tabHeight ) + LARGE_FONT_LINE_HEIGHT, LARGE_FONT_SIZE 
        );
        writeTextLine( 
            "[ SPACEBAR ] - CONFIRM/SELECT", 0 + SMALL_FONT_LINE_HEIGHT, 
            CANVAS_HEIGHT - SMALL_FONT_LINE_HEIGHT, SMALL_FONT_SIZE 
        );
        if ( this.ACTIVE_MENU_TAB.itemSubMenu.options ) {
            this.ACTIVE_MENU_TAB.itemSubMenu.options.forEach( ( e, index ) => {
                writeTextLine( controlOptions[index] + " - " + e, 0 + SMALL_FONT_LINE_HEIGHT + ( ( CANVAS_WIDTH * .25 ) * ( index + 1 )), CANVAS_HEIGHT - SMALL_FONT_LINE_HEIGHT, SMALL_FONT_SIZE )
            })        
        }
    }

    switchTab ( direction ) {
        if ( this.ACTIVE_MENU_TAB.modal ) {
            return;
        }
    
        this.ACTIVE_MENU_TAB.unsetButtons( )
    
        const currentTabIndex = this.tabs.indexOf( this.ACTIVE_MENU_TAB )
        let newIndex = direction == "LEFT" ? currentTabIndex - 1 : currentTabIndex + 1;
    
        if ( newIndex < 0 ) {
            newIndex = this.tabs.length - 1
        } 
        else if ( newIndex > this.tabs.length - 1 ) {
            newIndex = 0;
        }
    
        this.ACTIVE_MENU_TAB = this.tabs[newIndex]
        this.ACTIVE_MENU_TAB.setButtons( )
    }
}

module.exports = {
    initGameMenu,
    unsetGameMenu
}