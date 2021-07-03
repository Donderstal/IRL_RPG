const { 
    CANVAS_WIDTH, CANVAS_HEIGHT, GRID_BLOCK_PX,
    LARGE_FONT_LINE_HEIGHT, LARGE_FONT_SIZE
} = require('../../game-data/globals');
const globals = require( '../../game-data/globals' );
const { I_Menu } = require("../interfaces/I_Menu");
const { drawRect, writeTextLine } = require('../../helpers/canvasHelpers');

class BattleMenu extends I_Menu {
    constructor( ) {
        super( CANVAS_WIDTH / 5, GRID_BLOCK_PX * 2 )
        this.textMenuButtonHints.push( "[ Z ] - RETURN/DESELECT" )
    }
        
    get activeText( ) {
        return globals.GAME.activeText;
    }

    draw( ) {
        this.drawMenuTab( );
        super.draw( );
    }

    drawMenuTextbox( ) {
        super.drawMenuTextbox( this.textMenuButtonHints )
    }

    drawMenuTab( ) {
        drawRect( "FRONT", 0, CANVAS_HEIGHT - ( this.tabHeight * 2 ), CANVAS_WIDTH, this.tabHeight, "#00384D" )
        writeTextLine( 
            "TEST BATTLE MENU BRRRRUUHHHHHH", 0 + LARGE_FONT_LINE_HEIGHT, 
            ( CANVAS_HEIGHT - ( this.tabHeight * 2 ) ) + LARGE_FONT_LINE_HEIGHT, LARGE_FONT_SIZE 
        );
    }
}

module.exports = { 
    BattleMenu
}