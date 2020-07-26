const globals = require('../../../game-data/globals')
const canvas = require('../../../helpers/canvasHelpers')

class BattleMenu {
    constructor( ) {
        this.width          = globals.BATTLE_UI_CHAR_WIDTH;
        this.height         = globals.BATTLE_UI_CHAR_HEIGHT;
        this.x              = globals.CANVAS_WIDTH - ( 4 * globals.BATTLE_UI_CHAR_WIDTH );
        this.y              = globals.CANVAS_HEIGHT - this.height;
        
        this.textStartingY  = this.y + globals.BATTLE_FONT_LINE_HEIGHT
        this.textStartingX  = this.x + globals.BATTLE_FONT_LINE_HEIGHT / 2

        this.standardOptions = [
            "ATTACK",
            "MOVES",
            "ITEMS",
            "STATS",            
            "FLEE"
        ];

        this.buttons        = []
        this.activeButton   = null;
        this.inMoveMenu = false;
        this.activeCharacter;

        this.initializeMenuSlots( );
        this.activateButtonAtIndex( 0 );
        this.drawMenu( );
    }

    initializeMenuSlots( ) {
        for ( var i = 0; i < this.standardOptions.length; i++ ) {
            let index = i
            this.buttons.push( 
                new BattleMenuButton( 
                    this.standardOptions[index], this.textStartingX, this.textStartingY + ( globals.LARGE_FONT_LINE_HEIGHT * index ), index
                )
            );
        }
    }

    activateButtonAtIndex( buttonIndex ) {
        if ( this.activeButton != null ) {
            this.activeButton.deActivate( );            
        }

        this.buttons[buttonIndex].activate( );
        this.activeButton       = this.buttons[buttonIndex];
    }

    drawMenu( ) {
        canvas.drawRect( "FRONT", this.x, this.y, this.width, this.height, "black" )

        for ( var i = 0; i < this.buttons.length; i++ ) {
            this.buttons[i].drawButton( );
        } 
    }

    getMoveMenu( ) {
        this.inMoveMenu = true;
        for ( var i = 0; i < this.buttons.length; i++ ) {
            this.buttons[i].setMove( this.activeCharacter.moves[i] );
        } 
    }

    getStandardMenu( ) {
        this.inMoveMenu = false;
        for ( var i = 0; i < this.buttons.length; i++ ) {
            this.buttons[i].setText( this.standardOptions[i] );
        }   
    }
}

class BattleMenuButton {
    constructor( text, x, y, index ) {
        this.text       = text;
        this.x          = x;
        this.y          = y;
        this.isActive   = false;
        this.index      = index
        this.color      = "white";
        this.fontSize   = "LARGE";
        this.iterator = 0;
    }

    setMove( move ) {
        this.move = move
        this.setText( this.move.name )
    }

    drawButton( ) {
        canvas.writeTextLine( this.text, this.x, this.y, this.fontSize, this.color )
        if ( this.isActive ) {
            canvas.drawRect( 
                "FRONT", 
                this.x - ( globals.GRID_BLOCK_PX / 2 ), 
                this.y + ( ( globals.GRID_BLOCK_PX / 2 ) - this.height ) / 2 , 
                globals.GRID_BLOCK_PX / 2, globals.GRID_BLOCK_PX / 2,
                this.color
            );            
        }
    }

    setText( text ) {
        this.text = text
    }

    activate( ) {
        this.isActive   = true;
        this.color      = "purple";
    }

    deActivate( ) {
        this.isActive   = false;
        this.color      = "white";
    }
}

module.exports = {
    BattleMenu
}