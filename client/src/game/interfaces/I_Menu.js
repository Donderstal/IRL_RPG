const { 
    CANVAS_WIDTH, CANVAS_HEIGHT,
    LARGE_FONT_LINE_HEIGHT, LARGE_FONT_SIZE, SMALL_FONT_LINE_HEIGHT, SMALL_FONT_SIZE,
    BATTLE_FONT_LINE_HEIGHT, BATTLE_FONT_SIZE, 
} = require('../../game-data/globals');
const { drawRect, writeTextLine } = require('../../helpers/canvasHelpers');
/**
 * The Menu class represents an in-game main menu.
 * It wraps a I_MenuTab extension instance, which contains one menu tab isntance.
 * Each time the menu is opened, a new Menu is instantiated. On closing, it is destroyed.
 */
 class I_Menu {
    constructor( width, height ) {
        this.tabWidth   = width;
        this.tabHeight  = height;
        this.mainScreenHeight = CANVAS_HEIGHT - this.tabHeight;
        this.textMenuButtonHints = [ "[ SPACEBAR ] - CONFIRM/SELECT" ];
    }
    /**
     * Draw the menu background, active menu tab and bottom textbox
     */
    draw( ) {
        this.drawMenuTextbox( );
    }
    /**
     * Draw the textbox at the bottom of the menu
     */
    drawMenuTextbox( buttonHints, actionHints = false ) {
        drawRect( "FRONT", 0, CANVAS_HEIGHT - this.tabHeight, CANVAS_WIDTH, this.tabHeight, "#D82BBA" )
        writeTextLine( 
            this.activeText, 0 + LARGE_FONT_LINE_HEIGHT, 
            ( CANVAS_HEIGHT - this.tabHeight ) + LARGE_FONT_LINE_HEIGHT, BATTLE_FONT_SIZE
        );
        if ( actionHints ) {
            actionHints.forEach( ( actionHint, index ) => {
                writeTextLine( 
                    actionHint, 0 + SMALL_FONT_LINE_HEIGHT + ( ( CANVAS_WIDTH * .25 ) * ( index )), 
                    CANVAS_HEIGHT - ( LARGE_FONT_LINE_HEIGHT * 2 ), LARGE_FONT_SIZE 
                );
            } );
        }

        drawRect( "FRONT", 0, CANVAS_HEIGHT - (SMALL_FONT_LINE_HEIGHT * 2), CANVAS_WIDTH, 1, "#FFFFFF" )
        buttonHints.forEach( ( buttonHint, index ) => {
            writeTextLine( 
                buttonHint, 0 + SMALL_FONT_LINE_HEIGHT + ( ( CANVAS_WIDTH * .25 ) * ( index )), 
                CANVAS_HEIGHT - SMALL_FONT_LINE_HEIGHT, SMALL_FONT_SIZE 
            );
        } );
    }
}

module.exports = { 
    I_Menu
}