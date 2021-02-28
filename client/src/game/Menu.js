const globals  = require('../game-data/globals')

const { CANVAS_WIDTH, CANVAS_HEIGHT, GRID_BLOCK_PX, LARGE_FONT_LINE_HEIGHT, LARGE_FONT_SIZE } = require('../game-data/globals');
const { drawRect, writeTextLine } = require('../helpers/canvasHelpers');

const { MembersMenuTab } = require('./menu/MembersTab');
const { StatusMenuTab } = require('./menu/StatusTab');
const { InventoryMenuTab } = require('./menu/InventoryTab');
const { MapMenuTab } = require('./menu/MapTab');
const { GameMenuTab } = require('./menu/GameTab');

const tabWidth = CANVAS_WIDTH / 5;
const tabHeight = GRID_BLOCK_PX * 2;
const mainScreenHeight = CANVAS_HEIGHT - tabHeight;

const MEMBERS_TAB = new MembersMenuTab( );
const STATUS_TAB = new StatusMenuTab( );
const INVENTORY_TAB = new InventoryMenuTab( );
const MAP_TAB = new MapMenuTab( );
const GAME_TAB = new GameMenuTab( );

const tabs = [
    MEMBERS_TAB,
    STATUS_TAB,
    INVENTORY_TAB,
    MAP_TAB,
    GAME_TAB
];

let ACTIVE_MENU_TAB = MEMBERS_TAB;

const initGameMenu = ( ) => {
    globals.GAME.inMenu = true;
}

const unsetGameMenu = ( ) => {
    globals.GAME.inMenu = false;
}

const drawGameMenu = ( ) => {
    drawMenuUI( );
    ACTIVE_MENU_TAB.draw( );
    drawMenuTextbox( );
}

const drawMenuUI = ( ) => {
    drawRect( "FRONT", 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT, "#000000" )
    tabs.forEach( ( tab, index ) => {
        let tabX = tabWidth * index
        if ( tab == ACTIVE_MENU_TAB ) {
            drawRect( "FRONT", tabX, 0, tabWidth, tabHeight, "#D82BBA" )
        }
        else {
            drawRect( "FRONT", tabX, 0, tabWidth, tabHeight, "#64005380" )            
        }

        writeTextLine( tab.tabName, tabX + LARGE_FONT_LINE_HEIGHT, 0 + LARGE_FONT_LINE_HEIGHT, LARGE_FONT_SIZE )
    })
    drawRect( "FRONT", 0, tabHeight, CANVAS_WIDTH, mainScreenHeight, "#64005380"  )
}

const drawMenuTextbox = ( ) => {
    drawRect( "FRONT", 0, CANVAS_HEIGHT - tabHeight, CANVAS_WIDTH, tabHeight, "#D82BBA" )
    writeTextLine( "This is the " + ACTIVE_MENU_TAB.tabName + " tab.", 0 + LARGE_FONT_LINE_HEIGHT, ( CANVAS_HEIGHT - tabHeight ) + LARGE_FONT_LINE_HEIGHT, LARGE_FONT_SIZE )
}

const switchTab = ( direction ) => {
    ACTIVE_MENU_TAB.unsetButtons( )

    const currentTabIndex = tabs.indexOf( ACTIVE_MENU_TAB )
    let newIndex = direction == "LEFT" ? currentTabIndex - 1 : currentTabIndex + 1;

    if ( newIndex < 0 ) {
        newIndex = tabs.length - 1
    } 
    else if ( newIndex > tabs.length - 1 ) {
        newIndex = 0;
    }

    ACTIVE_MENU_TAB = tabs[newIndex]
    ACTIVE_MENU_TAB.setButtons( )
}

const handleMenuKeyPress = ( event ) => {
    switch ( event.key ) {
        case "q" : 
            switchTab( "LEFT" )
            break;
        case "e" :
            switchTab( "RIGHT" )
            break;
        case "w":
        case "ArrowUp":
            break;
        case "a":
        case "ArrowLeft":
            break;
        case "s":
        case "ArrowDown":
            break;
        case "d":
        case "ArrowRight":
            break;
        case " ":
            break;
    }
}

module.exports = {
    initGameMenu,
    unsetGameMenu,
    drawGameMenu,
    handleMenuKeyPress
}