const globals  = require('../../game-data/globals')

const handleUp = ( menu ) => {
    if ( activeTab.itemSubMenu.isActive ) {
        activeTab.itemSubMenu.setPreviousOption( )
    }
    else if ( activeTab.tabName != "MEMBERS" && !activeTab.modal ) {
        activeTab.activatePreviousButtonInList( );
    }
}

const handleDown = ( activeTab ) => {
    if ( activeTab.itemSubMenu.isActive ) {
        activeTab.itemSubMenu.setNextOption( )
    }
    else if ( activeTab.tabName != "MEMBERS" && !activeTab.modal ) {
        activeTab.activateNextButtonInList( );
    }
}

const handleLeft = ( activeTab ) => {
    if ( activeTab.modal ) {
        activeTab.modal.selectPreviousOption( );
    }
    else if ( activeTab.tabName == "MEMBERS" ) {
        activeTab.activatePreviousButtonInList( );
    }
    else if ( activeTab.tabName == "STATUS" ) {
        activeTab.activatePreviousCharacter( );
    }
}

const handleRight = ( activeTab ) => {
    if ( activeTab.modal ) {
        activeTab.modal.selectNextOption( );
    }
    else if ( activeTab.tabName == "MEMBERS" ) {
        activeTab.activateNextButtonInList( );
    }
    else if ( activeTab.tabName == "STATUS" ) {
        activeTab.activateNextCharacter( );
    }
}

const handleActionButton = ( activeTab ) => {
    if ( activeTab.activeItem ) {
        activeTab.handleActionButton( );
    }
}

const handleSubMenuControls = ( key, activeTab ) => {
    if ( activeTab.itemSubMenu.options && activeTab.activeItem ) {
        if ( key == "z" && activeTab.itemSubMenu.options[0] ) {
            activeTab.doActiveSubMenuOption( 0 );
        }
        if ( key == "x" && activeTab.itemSubMenu.options[1] ) {
            activeTab.doActiveSubMenuOption( 1 );
        }
        if ( key == "c" && activeTab.itemSubMenu.options[2] ) {
            activeTab.doActiveSubMenuOption( 2 );
        }
        if ( key == "v" && activeTab.itemSubMenu.options[3] ) {
            activeTab.doActiveSubMenuOption( 3 );
        }
    }
}

const handleMenuKeyPress = ( event ) => {
    const MENU = globals.GAME.MENU;
    const ACTIVE_TAB = MENU.ACTIVE_MENU_TAB
    switch ( event.key ) {
        case "q" : 
            MENU.switchTab( "LEFT" )
            break;
        case "e" :
            MENU.switchTab( "RIGHT" )
            break;
        case "w":
        case "ArrowUp":
            handleUp( ACTIVE_TAB )
            break;
        case "a":
        case "ArrowLeft":
            handleLeft( ACTIVE_TAB );
            break;
        case "s":
        case "ArrowDown":
            handleDown( ACTIVE_TAB )
            break;
        case "d":
        case "ArrowRight":
            handleRight( ACTIVE_TAB );
            break;
        case " ":
            handleActionButton( ACTIVE_TAB );
            break;
        case "z":
        case "x":
        case "c":
        case "v":
            handleSubMenuControls( event.key, ACTIVE_TAB );
            break;
    }
}

module.exports = {
    handleMenuKeyPress
}