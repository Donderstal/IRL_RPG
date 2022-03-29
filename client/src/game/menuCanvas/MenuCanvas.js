const { CanvasWithGrid } = require("../core/CanvasWithGrid");
const { MenuHeader } = require('./menuHeader');
const { MenuTextBox } = require('./menuTextBox');
const { 
    MENU_GRID_ROWS, MENU_GRID_COLUMNS, MENU_MARGIN_SIDES, MENU_MARGIN_TOP_DOWN,
    MENU_TAB_PARTY, MENU_TAB_INVENTORY, MENU_TYPE_MAP, MENU_TYPE_GAME, 
    MENU_BUTTON_STANDARD_HEIGHT, MENU_BUTTON_STANDARD_WIDTH, MENU_HEADER_ACTIVE_ROWS, 
    MENU_BUTTON_PARTY_WIDTH, MENU_BUTTON_PARTY_HEIGHT, MENU_BUTTON_ROWSTYLES, 
    MENU_BUTTON_PARTY_ROWSTYLES
} = require('../../game-data/uiGlobals');
const { CANVAS_WIDTH, CANVAS_HEIGHT } = require("../../game-data/globals");
const { ContentBubble } = require("./contentBubble");
const globals = require("../../game-data/globals");

const testParty = [ "party1", "party2", "party3", "party4", "party5" ];
const testInventory = [ "Inventory1", "Inventory2", "Inventory3", "Inventory4", "Inventory5" ];
const testMap = [ "Map1", "Map2", "Map3", "Map4", "Map5" ];
const testGame = [ "Game1", "Game2", "Game3", "Game4", "Game5", "Game6" ];

class MenuCanvas extends CanvasWithGrid {
    constructor( x, y, ctx, canvas ) {
        super( x, y, ctx );

        this.canvas = canvas;
        this.canvas.style.backgroundColor = "transparent"
        this.isActive = false;

        this.initGrid( MENU_GRID_ROWS, MENU_GRID_COLUMNS );

        this.header = new MenuHeader( );
        this.textBox = new MenuTextBox( );
        this.contentBubbles = [];
        this.activeButtonIndex = 0;
        this.activateActiveTab( );
    }   

    get activeTab( ) { 
        switch( this.header.activeIndex ) {
            case 0:
                return MENU_TAB_PARTY;
            case 1:
                return MENU_TAB_INVENTORY;
            case 2:
                return MENU_TYPE_MAP;
            case 3:
                return MENU_TYPE_GAME;
        }
    }
    show( ) {
        this.isActive = true;
        this.canvas.style.visibility = 'visible';
    }

    hide( ) {
        this.isActive = false;
        this.canvas.style.visibility = 'hidden';
    }

    draw( ) {
        this.ctx.clearRect( 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT );
        this.header.draw( this.ctx );
        this.contentBubbles.forEach(e=>e.draw(this.ctx));
        this.textBox.drawElement( this.ctx );
    }

    switchTab( direction ) {
        direction == "LEFT" 
            ? this.header.activatePrevious( ) 
            : this.header.activateNext( );
        this.activateActiveTab( );
    }

    activateActiveTab( ) {
        this.deactivateActiveTab( ) 
        switch( this.activeTab ) {
            case MENU_TAB_PARTY:
                testParty.forEach((e, index)=>{
                    this.contentBubbles.push( new ContentBubble( 
                        (MENU_MARGIN_SIDES * 2) + (( (MENU_MARGIN_SIDES * 2) + MENU_BUTTON_PARTY_WIDTH ) * index), MENU_MARGIN_TOP_DOWN + MENU_HEADER_ACTIVE_ROWS,
                        MENU_BUTTON_PARTY_WIDTH, MENU_BUTTON_PARTY_HEIGHT,
                        MENU_TAB_PARTY, e, MENU_BUTTON_PARTY_ROWSTYLES
                    ) );
                })
                break;
            case MENU_TAB_INVENTORY:
                testInventory.forEach((e, index)=>{
                    this.contentBubbles.push( new ContentBubble( 
                        MENU_MARGIN_SIDES, MENU_MARGIN_TOP_DOWN + MENU_HEADER_ACTIVE_ROWS + ( ( MENU_MARGIN_TOP_DOWN + MENU_BUTTON_STANDARD_HEIGHT ) * index ),
                        MENU_BUTTON_STANDARD_WIDTH, MENU_BUTTON_STANDARD_HEIGHT,
                        MENU_TAB_INVENTORY, e, MENU_BUTTON_ROWSTYLES
                    ) );
                })
                break;
            case MENU_TYPE_MAP:
                testMap.forEach((e, index)=>{
                    this.contentBubbles.push( new ContentBubble( ) );
                })
                break;
            case MENU_TYPE_GAME:
                testGame.forEach((e, index)=>{
                    this.contentBubbles.push( new ContentBubble( 
                        globals.SCREEN.MOBILE ? MENU_MARGIN_SIDES : (MENU_MARGIN_SIDES * 2) + (MENU_BUTTON_STANDARD_WIDTH / 2), MENU_MARGIN_TOP_DOWN + MENU_HEADER_ACTIVE_ROWS + ( ( MENU_MARGIN_TOP_DOWN + MENU_BUTTON_STANDARD_HEIGHT ) * index ),
                        MENU_BUTTON_STANDARD_WIDTH, MENU_BUTTON_STANDARD_HEIGHT,
                        MENU_TYPE_GAME, e, MENU_BUTTON_ROWSTYLES
                    ) );
                })
                break;
        }

        this.activeButtonIndex = 0;
        this.contentBubbles[this.activeButtonIndex].activate( );
    }

    deactivateActiveTab( ) {
        this.contentBubbles = [];
    }
}

module.exports = {
    MenuCanvas
}