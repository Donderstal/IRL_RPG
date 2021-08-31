const { 
    CANVAS_WIDTH, CANVAS_HEIGHT, GRID_BLOCK_PX,
    LARGE_FONT_LINE_HEIGHT
} = require('../../game-data/globals');
const globals = require( '../../game-data/globals' );
const { I_Menu } = require("../interfaces/I_Menu");
const { drawRect } = require('../../helpers/canvasHelpers');
const { MenuItem } = require('../interfaces/I_MenuItem');
const { STANDARD_ATTACK, STANDARD_DEFEND } = require('../../resources/battleMoveResources');
const { getNextIndexInArray, getPreviousIndexInArray } = require('../../helpers/utilFunctions');
const { generateActionHint } = require('../../helpers/UITextHelper');
const { COLOR_PRIMARY } = require('../../game-data/uiGlobals')
const {     
    CONTROL_UP, CONTROL_LEFT, CONTROL_RIGHT, CONTROL_DOWN 
} = require('../../game-data/battleGlobals')

class BattleMenu extends I_Menu {
    constructor( ) {
        super( CANVAS_WIDTH / 5, GRID_BLOCK_PX * 2 )
        this.menuY = ( CANVAS_HEIGHT - ( this.tabHeight * 2 ) )
        this.textMenuButtonHints.push( "[ Z ] - RETURN/DESELECT" )
        this.options = [ ]
        this.optionButtons = [];
        this.activeButtonIndex;
        this.actionHints = false;
    }
    get activeButton( ) {
        return this.optionButtons[this.activeButtonIndex];
    }
    get activeButtonName( ) {
        return this.activeButton.Name;
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
            if ( e.Name == "Standard Attack" ) {
                this.optionButtons[index].Item = STANDARD_ATTACK;     
            }
            else if ( e.Name == "Defend" ) {
                this.optionButtons[index].Item = STANDARD_DEFEND; 
            }
            else {
                this.optionButtons[index].Item = e;                
            }

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
        this.actionHints    = generateActionHint( this.activeButton.Item, this.inItemsMenu ? "ITEM" : "MOVE" );
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
        this.actionHints = [];
    }

    selectButtonAtIndex( index ) {
        this.actionHints    = [];
        this.activeButton.deActivate( );
        this.activeButtonIndex = index;
        this.activeButton.activate( );

        this.actionHints    = generateActionHint( this.activeButton.Item, this.inItemsMenu ? "ITEM" : "MOVE" )
        this.activeText     = this.activeButton.Description;
    }

    drawMenuTextbox( ) {
        super.drawMenuTextbox( this.textMenuButtonHints, this.actionHints )
    }

    selectionTab( ) {
        drawRect( "FRONT", 0, CANVAS_HEIGHT - ( this.tabHeight * 2 ), CANVAS_WIDTH, this.tabHeight, COLOR_PRIMARY )
        this.optionButtons.forEach( ( e ) => {
            e.draw( );
        } )
    }

    moveButtonCursor( direction ) {
        switch( direction ) {
            case CONTROL_UP:
                this.selectButtonAtIndex( getPreviousIndexInArray( this.activeButtonIndex, this.optionButtons ) )
                break;
            case CONTROL_LEFT:
            case CONTROL_RIGHT:
                if ( this.activeButtonIndex < 2 && this.optionButtons[ this.activeButtonIndex + 2 ] != undefined ) {
                    this.selectButtonAtIndex( this.activeButtonIndex + 2 );
                }
                else if ( this.activeButtonIndex >= 2 && this.optionButtons[ this.activeButtonIndex - 2 ] != undefined ) {
                    this.selectButtonAtIndex( this.activeButtonIndex - 2);
                }
                break;
            case CONTROL_DOWN:
                this.selectButtonAtIndex( getNextIndexInArray( this.activeButtonIndex, this.optionButtons ) );
                break;
        }
    }
}

module.exports = { 
    BattleMenu
}