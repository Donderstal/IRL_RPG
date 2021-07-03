const { 
    CANVAS_WIDTH, CANVAS_HEIGHT, GRID_BLOCK_PX,
    LARGE_FONT_LINE_HEIGHT
} = require('../../game-data/globals');
const globals = require( '../../game-data/globals' );
const { I_Menu } = require("../interfaces/I_Menu");
const { drawRect, writeTextLine } = require('../../helpers/canvasHelpers');
const { MenuItem } = require('../interfaces/I_MenuItem');

class BattleMenu extends I_Menu {
    constructor( ) {
        super( CANVAS_WIDTH / 5, GRID_BLOCK_PX * 2 )
        this.menuY = ( CANVAS_HEIGHT - ( this.tabHeight * 2 ) )
        this.textMenuButtonHints.push( "[ Z ] - RETURN/DESELECT" )
        this.options = [ ]
        this.optionButtons = [];
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

    drawMenuTextbox( ) {
        super.drawMenuTextbox( this.textMenuButtonHints )
    }

    selectionTab( ) {
        drawRect( "FRONT", 0, CANVAS_HEIGHT - ( this.tabHeight * 2 ), CANVAS_WIDTH, this.tabHeight, "#64005380" )
        this.optionButtons.forEach( ( e ) => {
            e.draw( );
        } )
    }
}

module.exports = { 
    BattleMenu
}