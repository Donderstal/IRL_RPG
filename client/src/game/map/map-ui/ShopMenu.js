const { MainMenu } = require("../../MainMenu");
const { StatusMenuTab } = require('../../menu/StatusTab');
const { InventoryMenuTab } = require('../../menu/InventoryTab');
const globals = require( '../../../game-data/globals' )
const { GRID_BLOCK_PX, CANVAS_WIDTH, CANVAS_HEIGHT } = require( '../../../game-data/globals' )

/**
 * Set GAME.inMenu to true and assign a Menu instance to GAME.MENU
 */
 const initShopMenu = ( ) => {
    globals.GAME.inMenu = true;
    globals.GAME.MENU = new ShopMenu( );
}
/**
 * Set GAME.inMenu to false and assign null to GAME.MENU
 */
const unsetShopMenu = ( ) => {
    globals.GAME.inMenu = false;
    globals.GAME.MENU = null;
}

class ShopMenu extends MainMenu {
    constructor( ) {
        super( CANVAS_WIDTH / 5, GRID_BLOCK_PX * 2 )
        this.mainScreenHeight = CANVAS_HEIGHT - this.tabHeight;
        this.uniqueTextMenuButtonHints = [ "[ Z ]", "[ X ]", "[ C ]", "[ V ]" ];
        this.initializeTabs( );
    }
    
    get activeText( ) {
        return this.ACTIVE_TAB.description;
    }

    initializeTabs( ) {
        this.SHOP_INVENTORY_TAB     = new InventoryMenuTab( true, false );
        this.PLAYER_INVENTORY_TAB   = new InventoryMenuTab( true, true );
        this.STATUS_TAB     = new StatusMenuTab( true );
        
        this.ACTIVE_TAB = this.SHOP_INVENTORY_TAB;

        this.tabs = [
            this.SHOP_INVENTORY_TAB,
            this.PLAYER_INVENTORY_TAB,
            this.STATUS_TAB
        ];

        this.ACTIVE_TAB.setButtons( )

        this.activeTabIndexes = {
            "EQUIP": 0,
            "SELL": 0,
            "BUY": 0
        }
    }
}

module.exports = {
    initShopMenu,
    unsetShopMenu
}