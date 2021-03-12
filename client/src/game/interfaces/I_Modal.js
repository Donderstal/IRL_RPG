const globals = require('../../game-data/globals');
const { CANVAS_WIDTH, CANVAS_HEIGHT, GRID_BLOCK_PX, LARGE_FONT_LINE_HEIGHT, LARGE_FONT_SIZE } = require('../../game-data/globals');
const { writeTextLine, drawRect } = require('../../helpers/canvasHelpers');
const { getModalContent } = require('../../resources/uiResources');


class Modal {
    constructor( displayText, modalType ) {
        this.modalType  = modalType;
        this.width      = CANVAS_WIDTH / 2;
        this.height     = CANVAS_HEIGHT / 3;
        this.x          = ( CANVAS_WIDTH / 2 ) - ( this.width / 2 );
        this.y          = ( CANVAS_HEIGHT / 2 ) - ( this.height / 2 );
        this.text       = displayText;
        this.activeItem = false;
        this.buttons    = [];
        this.initModalOptions( );
    }

    get activeButton( ) { return this.buttons[this.activeButtonIndex].text }
    
    /**
     * Get the modal options from uiResources.js based on the modalType prop
     */
    getOptionsForModalType( ) {
        switch (this.modalType) {
            case "USE-INVENTORY":
            case "EQUIP-INVENTORY":
                this.modalContentType = "SELECT_PARTY_MEMBER"
                return getModalContent( this.modalContentType, globals.GAME.PARTY_MEMBERS );
            case "DISMISS-INVENTORY":
            case "UNEQUIP-STATUS":
                this.modalContentType = "YES_OR_NO"
                return getModalContent( this.modalContentType );
            case "SHOW-INVENTORY":
            case "SHOW-STATUS":
                this.modalContentType = "SHOW_ITEM"
                return getModalContent( this.modalContentType );
            case "EQUIP-STATUS":
                this.modalContentType = "SELECT_ITEM"
                return getModalContent( this.modalContentType );
            default:
                console.log(" type " + this.modalType + " is not a valid modaltype")
                break;
        }
    }

    /**
     * Get the modal options. Instantiate a ModalButton class for each of them and activate first button
     */
    initModalOptions( ) {
        const options = this.getOptionsForModalType( );
        options.forEach( ( option, index ) => {
            const buttonX =  ( this.x + GRID_BLOCK_PX ) + ( index * ( GRID_BLOCK_PX * 2 ) );
            const buttonY = this.y + ( LARGE_FONT_LINE_HEIGHT * 3 );
            this.buttons.push( new ModalButton( buttonX, buttonY, option, this.modalContentType ) )
        })
        this.activeButtonIndex = 0;

        this.buttons[this.activeButtonIndex].activate( )
    }

    /**
     * Activate the next modal button. If this is not possible, activate the first modal button
     */
    selectNextOption( ) {
        this.buttons[this.activeButtonIndex].deactivate( )
        this.activeButtonIndex += 1
        if ( this.activeButtonIndex == this.buttons.length ) {
            this.activeButtonIndex = 0;
        }

        this.buttons[this.activeButtonIndex].activate( )
    }

    /**
     * Activate the previous modal button. If this is not possible, activate the last modal button
     */
    selectPreviousOption( ) {
        this.buttons[this.activeButtonIndex].deactivate( )
        this.activeButtonIndex -= 1
        if ( this.activeButtonIndex < 0 ) {
            this.activeButtonIndex = this.buttons.length - 1;
        }

        this.buttons[this.activeButtonIndex].activate( )
    }

    /**
     * Draw the modal, write the modal text and draw the modal buttons below that
     */
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
    constructor( x, y, option, modalType ) {
        this.text       = option.text;
        this.png        = option.png;
        this.type       = modalType;
        this.isActive   = false;

        this.x          = x;
        this.y          = y;
        this.activeColor    = "#D82BBA";
        this.standardColor  = "#00384D";

        this.setDimensions( )
    }

    /**
     * Set modal button height and width based on the type of mmodal content
     */
    setDimensions( ) {
        switch ( this.type ) {
            case "SELECT_PARTY_MEMBER" : 
                this.height     = GRID_BLOCK_PX * 3;
                this.width      = GRID_BLOCK_PX * 2;
                break;
            case "YES_OR_NO" :
                this.height     = GRID_BLOCK_PX;
                this.width      = GRID_BLOCK_PX;
                break;
            default: 
                console.log(this.type)
        }
    }

    /**
     * Set ModalButton to active, altering its appearance in the draw() method
     */
    activate( ) {
        this.isActive = true;
    }

    /**
     * Set ModalButton to inactive, altering its appearance in the draw() method
     */
    deactivate( ) {
        this.isActive = false;
    }

    /**
     * Draw the modal button and its contents based on the isActive property
     */
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
}

module.exports = {
    Modal
}