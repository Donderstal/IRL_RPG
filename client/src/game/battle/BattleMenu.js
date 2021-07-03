const { 
    CANVAS_WIDTH, CANVAS_HEIGHT, GRID_BLOCK_PX,
    LARGE_FONT_LINE_HEIGHT
} = require('../../game-data/globals');
const globals = require( '../../game-data/globals' );
const { I_Menu } = require("../interfaces/I_Menu");
const { drawRect, writeTextLine } = require('../../helpers/canvasHelpers');
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
        
    get activeText( ) {
        return globals.GAME.activeText;
    }

    setOptions( options ) {
        this.options = options;
        this.initializeOptionButtons( );
    }

    initializeOptionButtons( ) {
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
            e.Name = e["NAME"];
            e.Description = e["DESCRIPTION"];

            this.optionButtons.push( new MenuItem( x, y, CANVAS_WIDTH / 3, this.tabHeight / 3, "SELECT_MOVE", e ) );
        } )
    }

    draw( drawSelectionTab = false ) {
        if ( drawSelectionTab ) {
            this.selectionTab( );            
        }

        super.draw( );
    }

    activateSelectionMenu( ) {
        this.activeButtonIndex = 0;
        this.inSelectionMode = true;
        this.optionButtons[this.activeButtonIndex].activate( );
    }

    deActivateSelectionMenu( ) {
        this.optionButtons[this.activeButtonIndex].deActivate( );
        this.inSelectionMode = false;
    }

    selectButtonAtIndex( index ) {
        this.optionButtons[this.activeButtonIndex].deActivate( );
        this.activeButtonIndex = index;
        this.optionButtons[this.activeButtonIndex].activate( );
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
        console.log('oi')
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