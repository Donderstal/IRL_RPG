const { CANVAS_WIDTH, CANVAS_HEIGHT, LARGE_FONT_SIZE, GRID_BLOCK_PX, LARGE_FONT_LINE_HEIGHT, BATTLE_FONT_SIZE, BATTLE_FONT_LINE_HEIGHT } = require('../../game-data/globals');
const { writeTextLine, drawRect, drawFromImageToCanvas, getFrontCanvasContext } = require('../../helpers/canvasHelpers');
const { Modal } = require("./I_Modal")
class MenuTab {
    constructor( tabName, alignment, maxButtons ) {
        this.tabName = tabName;
        this.alignment = alignment;
        this.height = CANVAS_HEIGHT - ( GRID_BLOCK_PX * 4 );
        this.width = CANVAS_WIDTH;
        this.margin = GRID_BLOCK_PX * .25;
        this.description = "This is the " + alignment + " tab.";
        this.activeButton = 0;
        this.itemSubMenu = new ItemSubMenu( );
        this.modal = false;
        this.buttons = [];

        this.maxButtons;
    }

    draw( ) {
        this.buttons.forEach( ( button ) => { button.draw( ); } );
        if ( this.itemSubMenu.isActive ) {
            this.itemSubMenu.draw( );
        }
        if ( this.modal ) {
            this.modal.draw( );
        }
    }

    setModal( modalText, actionType ) {
        this.modal = new Modal( modalText, actionType + "-" + this.tabName );
    }

    unsetModal( ) {
        this.modal = false;
    }

    setButtonHeight( height ) {
        this.buttonHeight = height;
    }

    setButtonWidth( width ) {
        this.buttonWidth = width;
    }

    activateNextButtonInList( ) {
        this.buttons[this.activeButton].deActivate( )
        this.activeButton += 1;
        if ( this.activeButton >= this.buttons.length ) {
            this.activeButton = 0;
        }
        this.buttons[this.activeButton].activate( )
        this.itemSubMenu.setXy( this.buttons[this.activeButton].x + this.buttons[this.activeButton].width, this.buttons[this.activeButton].y )
    }

    activatePreviousButtonInList( ) {
        this.buttons[this.activeButton].deActivate( )
        this.activeButton -= 1;
        if ( this.activeButton < 0 ) {
            this.activeButton = this.buttons.length - 1;
        }
        this.buttons[this.activeButton].activate( )
        this.itemSubMenu.setXy( this.buttons[this.activeButton].x + this.buttons[this.activeButton].width, this.buttons[this.activeButton].y )
    }

    setButtonsInColumn( x, buttonContentList ) {
        let y = ( this.buttonHeight * .125 ) + ( GRID_BLOCK_PX * 2 )
        buttonContentList.forEach( ( buttonContent, index ) => {
            this.buttons.push( new MenuButton( x, y + ( index * this.buttonHeight ), this.buttonWidth, this.buttonHeight * .75, this.tabName, buttonContent ) )
        } )
        this.buttons[this.activeButton].activate( )
    }

    setButtonsInRow( y, buttonContentList ) {
        let x = ( this.buttonWidth * .125 );
        buttonContentList.forEach( ( buttonContent, index ) => {
            this.buttons.push( new MenuButton( x + ( index * this.buttonWidth ), y, this.buttonWidth * .75, this.buttonHeight, this.tabName, buttonContent ) )
        } )
        this.buttons[this.activeButton].isActive = true;
    }

    setButtons( ) {
        console.log( 'hi this is ' + this.tabName )
    }

    unsetButtons( ) {
        this.buttons = [ ];
        this.itemSubMenu.deActivate( );
        this.itemSubMenu.clearSubMenu( );
    }
    
}

class ItemSubMenu {
    constructor( ) {
        this.x;
        this.y;
        this.width = GRID_BLOCK_PX * 3;
        this.height;
        this.options;
        this.isInitialized;
        this.isActive;
    }

    draw( ) {
        drawRect( "FRONT", this.x, this.y, this.width, this.height, "#D82BBA");
        this.options.forEach( ( e, index ) => {
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

    setXy( x, y ) {
        this.x = x;
        this.y = y;
    }

    initOptions( options ) {
        this.options = [ ];
        options.forEach( ( option ) => {
            this.options.push( option )
        })

        this.height = options.length * LARGE_FONT_LINE_HEIGHT;
        this.isInitialized = true;
    }

    clearSubMenu( ) {
        this.x = null;
        this.y = null;
        this.height = null;
        this.options = null;
        this.isInitialized = false;
    }

    activate( ) {
        this.activeOption = 0;
        this.isActive = true;
    }

    deActivate( ) {
        this.activeOption = null;
        this.isActive = false;
    }

    setNextOption( ) {
        this.activeOption += 1;
        if ( this.activeOption >= this.options.length ) {
            this.activeOption = 0;
        }
    }

    setPreviousOption( ) {
        this.activeOption -= 1;
        if ( this.activeOption < 0 ) {
            this.activeOption = this.options.length - 1;
        }
    }

    getActiveOption( index ) {
        return this.options[index == null ? this.activeOption : index];
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
        this.activeButtonColor = "#D82BBA";
        this.standardButtonColor = "#00384D";

        this.displayText;
        this.setDisplayText( );
    }

    draw( ) {
        drawRect( "FRONT", this.x, this.y, this.width, this.height, this.standardButtonColor )
        if ( this.isActive ) {
            drawRect( "FRONT", this.x + ( LARGE_FONT_LINE_HEIGHT / 8 ), this.y + ( LARGE_FONT_LINE_HEIGHT / 8), this.width, this.height, this.activeButtonColor )
        }
        if ( this.type == "INVENTORY" ) {
            drawFromImageToCanvas( 
                "FRONT", this.content.Item.Image, 
                0, 0, 807, 806, 
                this.x + ( this.width - ( LARGE_FONT_LINE_HEIGHT * 2 ) ), this.y + ( ( this.height - LARGE_FONT_LINE_HEIGHT ) / 2 ), 
                LARGE_FONT_LINE_HEIGHT, LARGE_FONT_LINE_HEIGHT 
            );           
        }

        if ( this.type != "MEMBERS" ) {
            writeTextLine( 
                this.displayText, 
                this.x + LARGE_FONT_LINE_HEIGHT + LARGE_FONT_LINE_HEIGHT, this.y + LARGE_FONT_LINE_HEIGHT, 
                LARGE_FONT_SIZE 
            );            
        }
        else {
            writeTextLine( 
                this.displayText, 
                this.x + ( LARGE_FONT_LINE_HEIGHT * 2 ), this.y + BATTLE_FONT_LINE_HEIGHT, 
                BATTLE_FONT_SIZE
            );    
            writeTextLine( 
                "Hitpoints: " + this.content.CurrentHitpoints +"/"+ this.content.MaximumHitpoints, 
                this.x + ( LARGE_FONT_LINE_HEIGHT * 2 ), this.y + BATTLE_FONT_LINE_HEIGHT + LARGE_FONT_LINE_HEIGHT, 
                LARGE_FONT_SIZE 
            ); 
            writeTextLine( 
                "Level: " + this.content.Level, 
                this.x + ( LARGE_FONT_LINE_HEIGHT * 2 ), this.y + BATTLE_FONT_LINE_HEIGHT + ( LARGE_FONT_LINE_HEIGHT * 2 ), 
                LARGE_FONT_SIZE 
            ); 
            writeTextLine( 
                "Experience: " + this.content.Experience, 
                this.x + ( LARGE_FONT_LINE_HEIGHT * 2 ), this.y + BATTLE_FONT_LINE_HEIGHT + ( LARGE_FONT_LINE_HEIGHT * 3 ), 
                LARGE_FONT_SIZE 
            ); 
        }
    }

    activate( ) {
        this.isActive = true;
    }

    deActivate( ) {
        this.isActive = false;
    }

    setDisplayText( ) {
        switch( this.type ) {
            case "INVENTORY":
                this.displayText = this.content.Quantity + "x - " + this.content.Item.Name 
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