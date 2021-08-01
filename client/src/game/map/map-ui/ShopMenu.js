const { MainMenu } = require("../../MainMenu");
const { StatusMenuTab } = require('../../menu/StatusTab');
const { InventoryMenuTab } = require('../../menu/InventoryTab');
const globals = require( '../../../game-data/globals' )
const { 
    GRID_BLOCK_PX, CANVAS_WIDTH, CANVAS_HEIGHT, LARGE_FONT_LINE_HEIGHT, LARGE_FONT_SIZE  
} = require( '../../../game-data/globals' );
const { writeTextLine } = require("../../../helpers/canvasHelpers");

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

    get pendingForSaleItemsPrice( ) { return 0; };
    get pendingForBuyItemsPrice( ) { return 0; };
    
    get activeText( ) {
        return this.ACTIVE_TAB.description;
    }

    draw( ) {
        super.draw( );
        const startingX = this.tabWidth * 3;
        writeTextLine( 
            "Your money: " + globals.GAME.PLAYER_INVENTORY.Money, startingX + LARGE_FONT_LINE_HEIGHT, 
            LARGE_FONT_LINE_HEIGHT, LARGE_FONT_SIZE 
        );
        writeTextLine( 
            "Merchant money: " + globals.GAME.activeAction.inventory.Money, startingX + LARGE_FONT_LINE_HEIGHT, 
            (LARGE_FONT_LINE_HEIGHT * 2), LARGE_FONT_SIZE 
        );

        if ( this.ACTIVE_TAB.tabName == "BUY" ) {
            writeTextLine( 
                "Total cost: " + this.pendingForBuyItemsPrice, startingX + LARGE_FONT_LINE_HEIGHT, 
                (LARGE_FONT_LINE_HEIGHT * 4), LARGE_FONT_SIZE 
            );
        }
        else if ( this.ACTIVE_TAB.tabName == "SELL" ) {
            writeTextLine( 
                "Total gain: " + this.pendingForSaleItemsPrice, startingX + LARGE_FONT_LINE_HEIGHT, 
                (LARGE_FONT_LINE_HEIGHT * 4), LARGE_FONT_SIZE 
            );
        }

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