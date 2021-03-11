const { CANVAS_WIDTH, CANVAS_HEIGHT, GRID_BLOCK_PX, LARGE_FONT_LINE_HEIGHT, LARGE_FONT_SIZE } = require('../../game-data/globals');
const { writeTextLine, drawRect, drawFromImageToCanvas } = require('../../helpers/canvasHelpers');


class Modal {
    constructor( displayText, options ) {
        this.width      = CANVAS_WIDTH / 3;
        this.height     = CANVAS_HEIGHT / 4;
        this.x          = ( CANVAS_WIDTH / 2 ) - ( this.width / 2 );
        this.y          = ( CANVAS_HEIGHT / 2 ) - ( this.height / 2 );
        this.text       = displayText;
        this.activeItem = false;
        this.buttons    = [];
        this.initModalOptions( options );
    }

    get activeButton( ) { return this.buttons[this.activeButtonIndex].text }

    initModalOptions( options ) {
        options.forEach( ( option, index ) => {
            const buttonX =  ( this.x + GRID_BLOCK_PX ) + ( index * ( GRID_BLOCK_PX * 2 ) );
            const buttonY = this.y + (this.height - GRID_BLOCK_PX * 2);
            this.buttons.push( new ModalButton( buttonX, buttonY, option.text, options.type, option.png ? option.png : null ) )
        })
        this.activeButtonIndex = 0;

        this.buttons[this.activeButtonIndex].activate( )
    }

    handleActionButton( ) {
        this.buttons[this.activeButtonIndex].handleActionButton( )
    }

    selectNextOption( ) {
        this.buttons[this.activeButtonIndex].deactivate( )
        this.activeButtonIndex += 1
        if ( this.activeButtonIndex == this.buttons.length ) {
            this.activeButtonIndex = 0;
        }

        this.buttons[this.activeButtonIndex].activate( )
    }

    selectPreviousOption( ) {
        this.buttons[this.activeButtonIndex].deactivate( )
        this.activeButtonIndex -= 1
        if ( this.activeButtonIndex < 0 ) {
            this.activeButtonIndex = this.buttons.length - 1;
        }

        this.buttons[this.activeButtonIndex].activate( )
    }

    draw( ) {
        drawRect("FRONT", this.x, this.y, this.width, this.height );
        drawRect("FRONT", 
        this.x + ( GRID_BLOCK_PX * .125 ), this.y + ( GRID_BLOCK_PX * .125 ), 
        this.width - ( GRID_BLOCK_PX * .25 ), this.height - ( GRID_BLOCK_PX * .25 ), "#64005380");
        writeTextLine( this.text, this.x + GRID_BLOCK_PX, this.y + ( LARGE_FONT_LINE_HEIGHT * 2 ), LARGE_FONT_SIZE )
        this.buttons.forEach( e => e.draw() )
    }
}

class ModalButton {
    constructor( x, y, text, type, png = null ) {
        this.text       = text;
        this.type       = type;
        this.png        = png;
        this.isActive   = false;
        this.x          = x;
        this.y          = y;
        this.height     = GRID_BLOCK_PX;
        this.width      = GRID_BLOCK_PX;
        this.activeColor    = "#D82BBA";
        this.standardColor  = "#00384D";
    }

    activate( ) {
        this.isActive = true;
    }

    deactivate( ) {
        this.isActive = false;
    }

    confirm( ) {
        alert( this.type + " for " + this.text )
    }

    draw( ) {
        drawRect( "FRONT", this.x, this.y, this.width, this.height, this.standardColor );
        if ( this.isActive ) {
            drawRect( 
                "FRONT", 
                this.x + ( GRID_BLOCK_PX * .0625 ), this.y + ( GRID_BLOCK_PX * .0625 ), 
                this.width - ( GRID_BLOCK_PX * .125 ), this.height - ( GRID_BLOCK_PX * .125 ), 
                this.activeColor 
            );
        }
        writeTextLine( this.text, this.x + (LARGE_FONT_LINE_HEIGHT / 2), this.y + LARGE_FONT_LINE_HEIGHT, LARGE_FONT_SIZE)
    }

    handleActionButton( activeMenuTab, activeMenuItem ) {
        this.setAction( activeMenuTab, activeMenuItem );
        this.doAction( );
    }
}

module.exports = {
    Modal
}