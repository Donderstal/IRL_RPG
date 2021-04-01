const { LARGE_FONT_SIZE, GRID_BLOCK_PX, LARGE_FONT_LINE_HEIGHT } = require('../../game-data/globals');
const { writeTextLine, drawRect, getFrontCanvasContext } = require('../../helpers/canvasHelpers');
/**
 * The player can perform different actions on MenuItems. The available actions differ per type of MenuTab.
 * The ItemSubMenu is activated by selecting a MenuItem with the spacebar.
 * Within there are up to four possible actions for the player to select.
 */
class ItemSubMenu {
    constructor( ) {
        this.x;
        this.y;
        this.width = GRID_BLOCK_PX * 3;
        this.height;
        this.options;
        this.isInitialized;
        this.isActive;
        this.disabledOptions;
    }
    get activeOptions( ) {
        return this.options.filter( ( option ) => { return this.disabledOptions.indexOf( option ) == -1; } );
    }
    /**
     * Draw the submenu. For each option, write a textline to the front canvas
     */
    draw( ) {
        drawRect( "FRONT", this.x, this.y, this.width, this.height, "#D82BBA");
        this.activeOptions.forEach( ( e, index ) => {
            writeTextLine( 
                e, 
                this.x + LARGE_FONT_LINE_HEIGHT + LARGE_FONT_LINE_HEIGHT, this.y + LARGE_FONT_SIZE + ( LARGE_FONT_LINE_HEIGHT * index), 
                LARGE_FONT_SIZE 
            );
            if ( index === this.activeOption && this.isActive ) {
                getFrontCanvasContext().beginPath();
                getFrontCanvasContext().rect(this.x + 2, this.y + (this.activeOption * LARGE_FONT_LINE_HEIGHT) + 2, this.width - 4, LARGE_FONT_LINE_HEIGHT - 4);
                getFrontCanvasContext().stroke();
            }
        } ) 
    }
    /**
     * Assign given x y pair to this.x and this.y
     * @param {Number} x 
     * @param {Number} y 
     */
    setXy( x, y ) {
        this.x = x;
        this.y = y;
    }
    /**
     * Clear this.options.
     * Then, assign the given options to this.options and set this.isInitialized to true.
     * @param {String[]} options List of String representing menu actions
     */
    initOptions( options ) {
        this.options = [ ];
        this.disabledOptions = [ ];
        options.forEach( ( option ) => {
            this.options.push( option )
        })

        this.height = options.length * LARGE_FONT_LINE_HEIGHT;
        this.isInitialized = true;
    }
    /**
     * Set the given options as disabled, so they can not be selected
     * @param {String[]} options List of String representing menu actions
     */
    disableOptions( optionsToDisable ) {
        this.disabledOptions = [ ];
        optionsToDisable.forEach( ( option ) => {
            this.disabledOptions.push( option );
        })
    }
    /**
     * Clear the ItemSubMenu properties x, y, height and options.
     * Set this.isInitialized to false
     */
    clearSubMenu( ) {
        this.x = null;
        this.y = null;
        this.height = null;
        this.options = null;
        this.isInitialized = false;
    }
    /**
     * Set this.isActive to true. Set activeOptions to 0.
     */
    activate( ) {
        this.activeOption = 0;
        this.isActive = true;
    }
    /**
     * Set this.isActive to flase. Set activeOptions to null.
     */
    deActivate( ) {
        this.activeOption = null;
        this.isActive = false;
    }
    /**
     * Increment this.activeOption by one if possible. If not, assign zero to it.
     */
    setNextOption( ) {
        this.activeOption += 1;
        if ( this.activeOption >= this.activeOptions.length ) {
            this.activeOption = 0;
        }
    }
    /**
     * Decrement this.activeOption by one if possible. If not, assign this.options.length - 1 to it.
     */
    setPreviousOption( ) {
        this.activeOption -= 1;
        if ( this.activeOption < 0 ) {
            this.activeOption = this.activeOptions.length - 1;
        }
    }
    /**
     * Return the option at given index. If given index is null, return the options at this.activeOption
     * @param {Number} index index of an option in the array this.options
     */
    getActiveOption( index ) {
        return this.activeOptions[index == null ? this.activeOption : index];
    }
}

module.exports = {
    ItemSubMenu
}