const globals  = require('../../game-data/globals');
const { getNextIndexInArray, getPreviousIndexInArray } = require('../../helpers/utilFunctions');
/**
 * Call the method in the currently active tab associated with the up key 
 * @param {I_MenuTab} activeTab I_MenuTab extension currently active
 */
const handleUp = ( activeTab ) => {
    if ( activeTab.itemSubMenu.isActive ) {
        activeTab.itemSubMenu.setPreviousOption( )
    }
    else if ( activeTab.tabName != "MEMBERS" && !activeTab.modal ) {
        activeTab.activateButton( "PREVIOUS" );
    }
}
/**
 * Call the method in the currently active tab associated with the down key 
 * @param {I_MenuTab} activeTab I_MenuTab extension currently active
 */
const handleDown = ( activeTab ) => {
    if ( activeTab.itemSubMenu.isActive ) {
        activeTab.itemSubMenu.setNextOption( )
    }
    else if ( activeTab.tabName != "MEMBERS" && !activeTab.modal ) {
        activeTab.activateButton( "NEXT" );
    }
}
/**
 * Call the method in the currently active tab associated with the left key 
 * @param {I_MenuTab} activeTab I_MenuTab extension currently active
 */
const handleLeft = ( activeTab ) => {
    if ( activeTab.modal ) {
        activeTab.modal.selectPreviousOption( );
    }
    else if ( activeTab.tabName == "MEMBERS" ) {
        activeTab.activateButton( "PREVIOUS" );
    }
    else if ( activeTab.tabName == "STATUS" ) {
        activeTab.setButtons( 
            getPreviousIndexInArray( activeTab.activeCharacterIndex, globals.GAME.PARTY_MEMBERS ) 
        );
    }

    scrollBetweenItemColumns( activeTab );
}
/**
 * Call the method in the currently active tab associated with the right key 
 * @param {I_MenuTab} activeTab I_MenuTab extension currently active
 */
const handleRight = ( activeTab ) => {
    if ( activeTab.modal ) {
        activeTab.modal.selectNextOption( );
    }
    else if ( activeTab.tabName == "MEMBERS" ) {
        activeTab.activateButton( "NEXT" );
    }
    else if ( activeTab.tabName == "STATUS" ) {
        activeTab.setButtons( 
            getNextIndexInArray( activeTab.activeCharacterIndex, globals.GAME.PARTY_MEMBERS ) 
        );
    }

    scrollBetweenItemColumns( activeTab );
}

/**
 * If the menu is in inventory mode and the party has more than ten items,
 * scroll to the button right or left.
 * @param {I_MenuTab} activeTab I_MenuTab extension currently active
 */
const scrollBetweenItemColumns = ( activeTab ) => {
    const availablePlayerItems = globals.GAME.PLAYER_INVENTORY.activeItems;
    if ( activeTab.tabName == "INVENTORY" && availablePlayerItems.length > 10 ) {
        if ( activeTab.activeButton < 10 && availablePlayerItems[ activeTab.activeButton + 10 ] != undefined ) {
            activeTab.activateButton( activeTab.activeButton + 10 );
        }
        else if ( activeTab.activeButton >= 10 && availablePlayerItems[ activeTab.activeButton - 10 ] != undefined ) {
            activeTab.activateButton( activeTab.activeButton - 10 );
        }
    }
}
/**
 * If there is an active item, call the tabs' handleActionButton method
 * @param {I_MenuTab} activeTab I_MenuTab extension currently active
 */
const handleActionButton = ( activeTab ) => {
    if ( activeTab.activeItem ) {
        activeTab.handleActionButton( );
    }
}
/**
 * Call the activeSubMenuOption in currently active tab associated with the selected key 
 * @param {String} key key that was pressed by player
 * @param {I_MenuTab} activeTab I_MenuTab extension currently active
 */
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
/**
 * Call the correct funtionality depending on the pressed key
 * @param {Event} event browser event bubbled from pressed key
 */
const handleMenuKeyPress = ( event ) => {
    const MENU = globals.GAME.MENU;
    const ACTIVE_TAB = MENU.ACTIVE_TAB
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