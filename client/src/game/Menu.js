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
    ACTIVE_MENU_TAB.setButtons( )
}

const unsetGameMenu = ( ) => {
    globals.GAME.inMenu = false;
    ACTIVE_MENU_TAB.unsetButtons( )
    ACTIVE_MENU_TAB = MEMBERS_TAB;
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
    const controlOptions = [ "[ Z ]", "[ X ]", "[ C ]", "[ V ]" ]
    drawRect( "FRONT", 0, CANVAS_HEIGHT - tabHeight, CANVAS_WIDTH, tabHeight, "#D82BBA" )
    writeTextLine( ACTIVE_MENU_TAB.description, 0 + LARGE_FONT_LINE_HEIGHT, ( CANVAS_HEIGHT - tabHeight ) + LARGE_FONT_LINE_HEIGHT, LARGE_FONT_SIZE )

    writeTextLine( "[ SPACEBAR ] - CONFIRM/SELECT", 0 + SMALL_FONT_LINE_HEIGHT, CANVAS_HEIGHT - SMALL_FONT_LINE_HEIGHT, SMALL_FONT_SIZE )
    if ( ACTIVE_MENU_TAB.itemSubMenu.options ) {
        ACTIVE_MENU_TAB.itemSubMenu.options.forEach( ( e, index ) => {
            writeTextLine( controlOptions[index] + " - " + e, 0 + SMALL_FONT_LINE_HEIGHT + ( ( CANVAS_WIDTH * .25 ) * ( index + 1 )), CANVAS_HEIGHT - SMALL_FONT_LINE_HEIGHT, SMALL_FONT_SIZE )
        })        
    }
}

const switchTab = ( direction ) => {
    if ( ACTIVE_MENU_TAB.modal ) {
        return;
    }

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

const handleUp = ( ) => {
    if ( ACTIVE_MENU_TAB.itemSubMenu.isActive ) {
        ACTIVE_MENU_TAB.itemSubMenu.setPreviousOption( )
    }
    else if ( ACTIVE_MENU_TAB.tabName != "MEMBERS" && !ACTIVE_MENU_TAB.modal ) {
        ACTIVE_MENU_TAB.activatePreviousButtonInList( );
    }
}

const handleDown = ( ) => {
    if ( ACTIVE_MENU_TAB.itemSubMenu.isActive ) {
        ACTIVE_MENU_TAB.itemSubMenu.setNextOption( )
    }
    else if ( ACTIVE_MENU_TAB.tabName != "MEMBERS" && !ACTIVE_MENU_TAB.modal ) {
        ACTIVE_MENU_TAB.activateNextButtonInList( );
    }
}

const handleLeft = ( ) => {
    if ( ACTIVE_MENU_TAB.modal ) {
        ACTIVE_MENU_TAB.modal.selectPreviousOption( );
    }
    else if ( ACTIVE_MENU_TAB.tabName == "MEMBERS" ) {
        ACTIVE_MENU_TAB.activatePreviousButtonInList( );
    }
    else if ( ACTIVE_MENU_TAB.tabName == "STATUS" ) {
        ACTIVE_MENU_TAB.activatePreviousCharacter( );
    }
}

const handleRight = ( ) => {
    if ( ACTIVE_MENU_TAB.modal ) {
        ACTIVE_MENU_TAB.modal.selectNextOption( );
    }
    else if ( ACTIVE_MENU_TAB.tabName == "MEMBERS" ) {
        ACTIVE_MENU_TAB.activateNextButtonInList( );
    }
    else if ( ACTIVE_MENU_TAB.tabName == "STATUS" ) {
        ACTIVE_MENU_TAB.activateNextCharacter( );
    }
}

const handleActionButton = ( ) => {
    if ( ACTIVE_MENU_TAB.activeItem ) {
        ACTIVE_MENU_TAB.handleActionButton( );
    }
}

const handleSubMenuControls = ( key ) => {
    if ( ACTIVE_MENU_TAB.itemSubMenu.options && ACTIVE_MENU_TAB.activeItem ) {
        if ( key == "z" && ACTIVE_MENU_TAB.itemSubMenu.options[0] ) {
            ACTIVE_MENU_TAB.doActiveSubMenuOption( 0 );
        }
        if ( key == "x" && ACTIVE_MENU_TAB.itemSubMenu.options[1] ) {
            ACTIVE_MENU_TAB.doActiveSubMenuOption( 1 );
        }
        if ( key == "c" && ACTIVE_MENU_TAB.itemSubMenu.options[2] ) {
            ACTIVE_MENU_TAB.doActiveSubMenuOption( 2 );
        }
        if ( key == "v" && ACTIVE_MENU_TAB.itemSubMenu.options[3] ) {
            ACTIVE_MENU_TAB.doActiveSubMenuOption( 3 );
        }
    }
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
            handleUp( )
            break;
        case "a":
        case "ArrowLeft":
            handleLeft( );
            break;
        case "s":
        case "ArrowDown":
            handleDown( )
            break;
        case "d":
        case "ArrowRight":
            handleRight( );
            break;
        case " ":
            handleActionButton( );
            break;
        case "z":
        case "x":
        case "c":
        case "v":
            handleSubMenuControls( event.key );
            break;
    }
}

module.exports = {
    initGameMenu,
    unsetGameMenu,
    drawGameMenu,
    handleMenuKeyPress
}