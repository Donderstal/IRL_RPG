const globals = require('../../../game-data/globals')
const canvas = require('../../../helpers/canvasHelpers')
const state = require('../../../game-data/state')

class BattleMenu {
    constructor( ) {
        this.width          = globals.BATTLE_UI_CHAR_WIDTH;
        this.height         = globals.BATTLE_UI_CHAR_HEIGHT;
        this.x              = globals.CANVAS_WIDTH - ( 4 * globals.BATTLE_UI_CHAR_WIDTH );
        this.y              = globals.CANVAS_HEIGHT - this.height;

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

        this.initializeMenuButtons( );
        this.activateButtonAtIndex( 0 );
        this.draw( );
    }

    initializeMenuButtons( ) {
        for ( var i = 0; i < this.standardOptions.length; i++ ) {
            let index = i
            this.buttons.push( 
                new BattleMenuButton( 
                    this.standardOptions[index], 
                    (this.x + globals.BATTLE_FONT_LINE_HEIGHT / 2), 
                    (this.y + globals.BATTLE_FONT_LINE_HEIGHT) + ( globals.LARGE_FONT_LINE_HEIGHT * index ), 
                    index
                )
            );
        }
        state.battleState.battleUI.slots.push(this);
    }

    setXy( x, y ) {
        this.x = x;
        this.y = y;
    }

    resetMenu( ) {
        this.activateButtonAtIndex( 0 )
    }

    activateButtonAtIndex( buttonIndex ) {
        if ( this.activeButton != null ) {
            this.activeButton.deActivate( );            
        }

        this.buttons[buttonIndex].activate( );
        this.activeButton       = this.buttons[buttonIndex];
        if ( this.inMoveMenu ) {
            state.battleState.textContainer.setText( this.activeCharacter.moves[buttonIndex].desc )
        }
    }

    draw( ) {
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