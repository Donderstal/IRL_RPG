const { 
    CANVAS_WIDTH, CANVAS_HEIGHT, GRID_BLOCK_PX,
    LARGE_FONT_LINE_HEIGHT
} = require('../../game-data/globals');
const globals = require( '../../game-data/globals' );
const { I_Menu } = require("../interfaces/I_Menu");
const { drawRect } = require('../../helpers/canvasHelpers');
const { MenuItem } = require('../interfaces/I_MenuItem');
const { getNextIndexInArray, getPreviousIndexInArray } = require('../../helpers/utilFunctions');

class BattleMenu extends I_Menu {
    constructor( ) {
        super( CANVAS_WIDTH / 5, GRID_BLOCK_PX * 2 )
        this.menuY = ( CANVAS_HEIGHT - ( this.tabHeight * 2 ) )
        this.textMenuButtonHints.push( "[ Z ] - RETURN/DESELECT" )
        this.options = [ ]
        this.optionButtons = [];
        this.activeButtonIndex;
    }
    get activeButton( ) {
        return this.optionButtons[this.activeButtonIndex];
    }
    get activeButtonName( ) {
        return this.activeButton.Name;
    }
    
    get activeText( ) {
        return globals.GAME.activeText;
    }

    set activeText( text ) {
        globals.GAME.activeText = text;
    }

    setOptions( options ) {
        this.options = options;
        this.initializeOptionButtons( );
    }

    initializeOptionButtons( ) {
        this.optionButtons = [];
        this.options.forEach( ( e, index ) => {
            let x;
            let y;
            if ( index === 0 ) {
                x = LARGE_FONT_LINE_HEIGHT + ( CANVAS_WIDTH * .25 );
                y = this.menuY + ( GRID_BLOCK_PX * .125 );
            } else if ( index === 1 ) {
                x = LARGE_FONT_LINE_HEIGHT + ( CANVAS_WIDTH * .25 );
                y = this.menuY + ( GRID_BLOCK_PX * .125 ) + ( this.tabHeight / 2 );
            } else if ( index === 2 ) {
                x = LARGE_FONT_LINE_HEIGHT + ( CANVAS_WIDTH * .625 );
                y = this.menuY + ( GRID_BLOCK_PX * .125 );
            } else if ( index === 3 ) {
                x = LARGE_FONT_LINE_HEIGHT + ( CANVAS_WIDTH * .625 );
                y = this.menuY + ( GRID_BLOCK_PX * .125 )  + ( this.tabHeight / 2 );
            }

            this.optionButtons.push( new MenuItem( x, y, CANVAS_WIDTH / 3, this.tabHeight / 3, "SELECT_MOVE", e ) );
            this.optionButtons[index].Name = e.Name != undefined ? e.Name : e["NAME"];
            this.optionButtons[index].Description = e.Description != undefined ? e.Description : e["DESCRIPTION"];
        } )
    }

    draw( drawSelectionTab = false ) {
        if ( drawSelectionTab ) {
            this.selectionTab( );            
        }

        super.draw( );
    }

    activateSelectionMenu( ) {
        this.inSelectionMode = true;
        this.activateMainSelectionMenu( );
        this.activateFirstButtonInMenu( );
    }

    deActivateSelectionMenu( ) {
        this.activeButton.deActivate( );
        this.deActivateMainSelectionMenu( );
        this.deActivateMovesSubMenu( );
        this.deActivateItemsSubMenu( );
        this.inSelectionMode = false;
    }

    activateFirstButtonInMenu( ) {
        this.activeButtonIndex = 0;
        this.activeButton.activate( );
        this.activeText = this.activeButton.Description;
    }

    activateMainSelectionMenu( ) { 
        this.inMainMenu = true;
        this.setOptions( [ 
            { "Name": "Standard Attack", "Description": "Hit an enemy with your fists." },
            { "Name": "Select Move", "Description": "Select a move to damage your enemies or help your allies." },
            { "Name": "Use Item", "Description": "Use one of the items in your inventory." },
            { "Name": "Defend", "Description": "Take a defensive stance to reduce damage." },
        ] );
        this.activateFirstButtonInMenu( );
    }

    deActivateMainSelectionMenu( ) {
        this.inMainMenu = false;
    }

    activateItemsSubMenu( ) {
        this.inItemsMenu = true;
        this.setOptions( globals.GAME.PLAYER_INVENTORY.itemsAvailableInBattle );
        this.activateFirstButtonInMenu( );
    }

    deActivateItemsSubMenu( ) {
        this.inItemsMenu = false;
    }

    activateMovesSubMenu( ) {
        this.inMovesMenu = true;
        this.setOptions( globals.GAME.battle.activeSelectionBattleSlot.character.Moves );
        this.activateFirstButtonInMenu( );
    }

    deActivateMovesSubMenu( ) {
        this.inMovesMenu = false;
    }

    selectButtonAtIndex( index ) {
        this.activeButton.deActivate( );
        this.activeButtonIndex = index;
        this.activeButton.activate( );
        this.activeText = this.activeButton.Description;
    }

    drawMenuTextbox( ) {
        super.drawMenuTextbox( this.textMenuButtonHints )
    }

    selectionTab( ) {
        drawRect( "FRONT", 0, CANVAS_HEIGHT - ( this.tabHeight * 2 ), CANVAS_WIDTH, this.tabHeight, "#64005380" )
        this.optionButtons.forEach( ( e ) => {
            e.draw( );
        } )
    }

    moveButtonCursor( direction ) {
        switch( direction ) {
            case "UP":
                this.selectButtonAtIndex( getPreviousIndexInArray( this.activeButtonIndex, this.optionButtons ) )
                break;
            case "LEFT":
            case "RIGHT":
                if ( this.activeButtonIndex < 2 && this.optionButtons[ this.activeButtonIndex + 2 ] != undefined ) {
                    this.selectButtonAtIndex( this.activeButtonIndex + 2 );
                }
                else if ( this.activeButtonIndex >= 2 && this.optionButtons[ this.activeButtonIndex - 2 ] != undefined ) {
                    this.selectButtonAtIndex( this.activeButtonIndex - 2);
                }
                break;
            case "DOWN":
                this.selectButtonAtIndex( getNextIndexInArray( this.activeButtonIndex, this.optionButtons ) );
                break;
        }
    }
}

module.exports = { 
    BattleMenu
}