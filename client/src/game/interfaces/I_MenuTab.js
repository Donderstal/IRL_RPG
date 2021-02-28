const { CANVAS_WIDTH, CANVAS_HEIGHT, LARGE_FONT_SIZE, GRID_BLOCK_PX, LARGE_FONT_LINE_HEIGHT } = require('../../game-data/globals');
const { writeTextLine, drawRect, drawFromImageToCanvas } = require('../../helpers/canvasHelpers');

class MenuTab {
    constructor( tabName, alignment, maxButtons ) {
        this.tabName = tabName;
        this.alignment = alignment;
        this.height = CANVAS_HEIGHT - ( GRID_BLOCK_PX * 4 );
        this.width = CANVAS_WIDTH;
        this.margin = GRID_BLOCK_PX * .25;
        this.activeButton = 0;
        this.buttons = [];

        this.maxButtons;
    }

    draw( ) {
        this.buttons.forEach( ( button ) => { button.draw( ); } )
    }

    setButtonHeight( height ) {
        this.buttonHeight = height;
    }

    setButtonWidth( width ) {
        this.buttonWidth = width;
    }

    setButtonsInColumn( x, buttonContentList ) {
        let y = ( this.buttonHeight * .125 ) + ( GRID_BLOCK_PX * 2 )
        buttonContentList.forEach( ( buttonContent, index ) => {
            this.buttons.push( new MenuButton( x, y + ( index * this.buttonHeight ), this.buttonWidth, this.buttonHeight * .75, this.tabName, buttonContent ) )
        } )
    }

    setButtonsInRow( y, buttonContentList ) {
        let x = ( this.buttonWidth * .125 );
        buttonContentList.forEach( ( buttonContent, index ) => {
            this.buttons.push( new MenuButton( x + ( index * this.buttonWidth ), y, this.buttonWidth * .75, this.buttonHeight, this.tabName, buttonContent ) )
        } )
    }

    setButtons( ) {
        console.log( 'hi this is ' + this.tabName )
    }

    unsetButtons( ) {
        this.buttons = [ ];
    }
}

class MenuButton { 
    constructor( x, y, width, height, type, content ) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.type = type;
        this.content = content;

        this.isActive = false;        
        this.activeButtonColor = "#00FF9E";
        this.standardButtonColor = "#D82BBA";

        this.displayText;
        this.setDisplayText( );
    }

    draw( ) {
        drawRect( "FRONT", this.x, this.y, this.width, this.height, this.isActive ? this.activeButtonColor : this.standardButtonColor )
        if ( this.tabName == "INVENTORY" ) {
            drawFromImageToCanvas( 
                "FRONT", this.content.Item.Image, 
                0, 0, 807, 806, 
                this.x + ( this.width - ( LARGE_FONT_LINE_HEIGHT * 2 ) ), this.y + ( ( this.height - LARGE_FONT_LINE_HEIGHT ) / 2 ), 
                LARGE_FONT_LINE_HEIGHT, LARGE_FONT_LINE_HEIGHT 
            );           
        }

        if ( this.tabName != "MEMBERS" ) {
            writeTextLine( this.displayText, this.x + LARGE_FONT_LINE_HEIGHT + LARGE_FONT_LINE_HEIGHT, this.y + LARGE_FONT_LINE_HEIGHT, LARGE_FONT_SIZE );            
        }
        else {
            
        }
    }

    setDisplayText( ) {
        switch( this.type ) {
            case "INVENTORY":
                this.displayText = this.content.Item.Name 
                break;
            case "GAME":
                this.displayText = this.content.title;
                break;
            case "MEMBERS":
                this.displayText = this.content.Name;
        }
    }
}

module.exports = { 
    MenuTab
}