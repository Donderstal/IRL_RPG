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
    globals.GAME.activeAction.resetAction( );
    globals.GAME.MENU = null;
}

class ShopMenu extends MainMenu {
    constructor( ) {
        super( CANVAS_WIDTH / 5, GRID_BLOCK_PX * 2 )
        this.mainScreenHeight = CANVAS_HEIGHT - this.tabHeight;
        this.uniqueTextMenuButtonHints = [ "[ Z ]", "[ X ]", "[ C ]", "[ V ]" ];
        this.activeTransactionItemsList = [];
        this.initializeTabs( );
    }
    
    get pendingItemIDList( ) { return this.activeTransactionItemsList.map( item => item.ItemTypeID )}

    get playerInventory( ) { return globals.GAME.PLAYER_INVENTORY; };
    get shopInventory( ) { return globals.GAME.activeAction.inventory; };

    get pendingForSaleItemsPrice( ) { return this.activeTransactionItemsList.reduce( ( acc, item ) => acc + ( ( item.Price / 2 ) || 0), 0); };
    get pendingForBuyItemsPrice( ) { return this.activeTransactionItemsList.reduce( ( acc, item ) => acc + ( item.Price || 0), 0); };

    get playerBudget( ) { return globals.GAME.PLAYER_INVENTORY.Money };
    set playerBudget( value ) { 
        if (value < globals.GAME.PLAYER_INVENTORY.Money ) {
            globals.GAME.PLAYER_INVENTORY.subtractMoney( globals.GAME.PLAYER_INVENTORY.Money - value );
        }
        else if ( value > globals.GAME.PLAYER_INVENTORY.Money ) {
            globals.GAME.PLAYER_INVENTORY.addMoney( value - globals.GAME.PLAYER_INVENTORY.Money );
        }
     };

    get shopBudget( ) { return globals.GAME.activeAction.inventory.Money };
    set shopBudget( value ) { globals.GAME.activeAction.inventory.Money = value }
    
    get activeText( ) {
        return this.ACTIVE_TAB.description;
    }

    draw( ) {
        super.draw( );
        const startingX = this.tabWidth * 3;
        writeTextLine( 
            "Your money: " + this.playerBudget, startingX + LARGE_FONT_LINE_HEIGHT, 
            LARGE_FONT_LINE_HEIGHT, LARGE_FONT_SIZE 
        );
        writeTextLine( 
            "Merchant money: " + this.shopBudget, startingX + LARGE_FONT_LINE_HEIGHT, 
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

    addActiveItemToList( ) {
        if ( this.ACTIVE_TAB.activeItem.Quantity > 0 ) {
            this.ACTIVE_TAB.activeItem.addPendingForUsage( )
            this.activeTransactionItemsList.push( this.ACTIVE_TAB.activeItem )            
        }
    }

    removeActiveItemFromList( ) {
        const index = this.activeTransactionItemsList.indexOf(this.ACTIVE_TAB.activeItem);
        if ( index !== -1 ) {
            this.activeTransactionItemsList.splice(index, 1);
            this.ACTIVE_TAB.activeItem.subtractPendingForUsage( )
        }
    }

    resetActiveTransactionItemsList( ) {
        this.activeTransactionItemsList.forEach( ( item ) => {
            item.resetPendingAmount( );
        });
        this.activeTransactionItemsList = [];
    }

    switchTab( direction, selectedCharacterIndex = null ) {
        this.resetActiveTransactionItemsList( );
        super.switchTab( direction, selectedCharacterIndex )
    }

    confirmTransaction( ) {
        if ( this.pendingForSaleItemsPrice == 0 ) {
            return;
        }
        if ( this.ACTIVE_TAB.tabName == "SELL" ) {
            if ( this.pendingForSaleItemsPrice > this.shopBudget ) {
                alert( "They can't pay this!" )
                return;
            }
            else {
                this.shopBudget     = this.shopBudget - this.pendingForSaleItemsPrice;
                this.playerBudget   = this.playerBudget + this.pendingForSaleItemsPrice;
                this.playerInventory.removeItemsFromInnerListByID( this.pendingItemIDList );
                this.shopInventory.addItemsToInnerListByID( this.pendingItemIDList );
            }
        }
        else if ( this.ACTIVE_TAB.tabName == "BUY" ) {
            if ( this.pendingForBuyItemsPrice > this.playerBudget ) {
                alert( "You can't pay this!" )
                return;
            }
            else {
                this.shopBudget     = this.shopBudget + this.pendingForBuyItemsPrice;
                this.playerBudget   = this.playerBudget - this.pendingForBuyItemsPrice;
                this.shopInventory.removeItemsFromInnerListByID( this.pendingItemIDList );
                this.playerInventory.addItemsToInnerListByID( this.pendingItemIDList );
            }
        }

        this.activeTransactionItemsList = [];
        this.ACTIVE_TAB.setButtons( );
    }
}

module.exports = {
    initShopMenu,
    unsetShopMenu
}