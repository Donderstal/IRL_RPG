const globals  = require('../game-data/globals')

const { CANVAS_WIDTH, CANVAS_HEIGHT, GRID_BLOCK_PX, LARGE_FONT_LINE_HEIGHT, LARGE_FONT_SIZE } = require('../game-data/globals');
const { drawRect, writeTextLine } = require('../helpers/canvasHelpers');

const MENU_TAB_MEMBERS = "MEMBERS"
const MENU_TAB_STATUS = "STATUS";
const MENU_TAB_INVENTORY = "INVENTORY";
const MENU_TAB_MAP = "MAP";
const MENU_TAB_GAME = "GAME"
const menuIsReady = false;

const tabs = [
    MENU_TAB_MEMBERS,
    MENU_TAB_STATUS,
    MENU_TAB_INVENTORY,
    MENU_TAB_MAP,
    MENU_TAB_GAME
];

let activeTab = MENU_TAB_MEMBERS;

const tabWidth = CANVAS_WIDTH / tabs.length;
const tabHeight = GRID_BLOCK_PX * 2;

const mainScreenHeight = CANVAS_HEIGHT - tabHeight;
const horizontalMiddle = CANVAS_WIDTH / 2;

const MEMBERS_TAB = new MemberMenuTab( );
const STATUS_TAB = new StatusMenuTab( );
const INVENTORY_TAB = new InventoryMenuTab( );
const MAP_TAB = new MapMenuTab( );
const GAME_TAB = new GameMenuTab( );

const initGameMenu = ( ) => {
    globals.GAME.inMenu = true;
    menuIsReady = true;
}

const unsetGameMenu = ( ) => {
    menuIsReady = false;
    globals.GAME.inMenu = false;
}

const drawGameMenu = ( ) => {
    drawMenuUI( );
    drawActiveTab( );
    drawMenuTextbox( );
}

const drawMenuUI = ( ) => {
    drawRect( "FRONT", 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT, "#000000" )
    tabs.forEach( ( tab, index ) => {
        let tabX = tabWidth * index
        if ( tab == activeTab ) {
            drawRect( "FRONT", tabX, 0, tabWidth, tabHeight, "#D82BBA" )
        }
        else {
            drawRect( "FRONT", tabX, 0, tabWidth, tabHeight, "#64005380" )            
        }

        writeTextLine( tab, tabX + LARGE_FONT_LINE_HEIGHT, 0 + LARGE_FONT_LINE_HEIGHT, LARGE_FONT_SIZE )
    })
    drawRect( "FRONT", 0, tabHeight, CANVAS_WIDTH, mainScreenHeight, "#64005380"  )
}

const drawMenuTextbox = ( ) => {
    drawRect( "FRONT", 0, CANVAS_HEIGHT - tabHeight, CANVAS_WIDTH, tabHeight, "#D82BBA" )
    writeTextLine( "This is the " + activeTab + " tab.", 0 + LARGE_FONT_LINE_HEIGHT, ( CANVAS_HEIGHT - tabHeight ) + LARGE_FONT_LINE_HEIGHT, LARGE_FONT_SIZE )
}

const drawActiveTab = ( ) => {
    switch ( activeTab ) {
        case MENU_TAB_MEMBERS : 
            drawMembersTab( );
            break;
        case MENU_TAB_STATUS : 
            drawStatusTab( );
            break;
        case MENU_TAB_INVENTORY : 
            drawInventoryTab( );
            break;
        case MENU_TAB_MAP : 
            drawMapTab( );
            break;
        case MENU_TAB_GAME : 
            drawGameTab( );
            break;
    }
}

const drawMembersTab = ( ) => {
    writeTextLine( MENU_TAB_MEMBERS, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, LARGE_FONT_SIZE )
}

const drawStatusTab = ( ) => {
    writeTextLine( MENU_TAB_STATUS, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, LARGE_FONT_SIZE )
}

const drawInventoryTab = ( ) => {
    const inventoryButtonHeight = ( CANVAS_HEIGHT - ( tabHeight * 2 ) ) / 10;
    globals.GAME.PLAYER_ITEMS.forEach( ( itemStack, index ) => {

        let buttonX = index > 9 ? horizontalMiddle : 0;
        let buttonY = ( tabHeight ) + ( index > 9 ? index - 10 : index * inventoryButtonHeight );

        drawRect( "FRONT", buttonX, buttonY, horizontalMiddle, inventoryButtonHeight )  

        writeTextLine( itemStack.Item.Name, buttonX, buttonY + LARGE_FONT_LINE_HEIGHT, LARGE_FONT_SIZE, "#000000" )
    } ) 
    writeTextLine( MENU_TAB_INVENTORY, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, LARGE_FONT_SIZE )
}

const drawMapTab = ( ) => {
    writeTextLine( MENU_TAB_MAP, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, LARGE_FONT_SIZE )
}

const drawGameTab = ( ) => {
    writeTextLine( MENU_TAB_GAME, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, LARGE_FONT_SIZE )
}

const switchTab = ( direction ) => {
    const currentTabIndex = tabs.indexOf( activeTab )
    let newIndex = direction == "LEFT" ? currentTabIndex - 1 : currentTabIndex + 1;

    if ( newIndex < 0 ) {
        newIndex = tabs.length - 1
    } 
    else if ( newIndex > tabs.length - 1 ) {
        newIndex = 0;
    }

    activeTab = tabs[newIndex]
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