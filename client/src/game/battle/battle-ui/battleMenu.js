const canvas        = require('../../../helpers/canvasHelpers')
const state         = require('../../../game-data/state')
const battleGlobals = require('../battleGlobals');

class BattleMenu {
    constructor( ) {
        this.width                  = battleGlobals.BATTLE_UI_CHAR_WIDTH
        this.height                 = battleGlobals.BATTLE_UI_CHAR_HEIGHT  
        this.x                      = battleGlobals.BATTLE_MENU_X
        this.y                      = battleGlobals.BATTLE_MENU_Y
        this.standardOptions        = battleGlobals.BATTLE_MENU_STRD_LABELS;
        this.standardDescriptions   = battleGlobals.BATTLE_MENU_STRD_DESC;

        this.buttons        = []
        this.activeButton   = null;
        this.inMoveMenu = false;
        this.playerPartySize = 3
        this.activeCharacter;

        this.initializeMenuButtons( );
        this.getStandardMenu( );
        this.draw( );
    }

    initializeMenuButtons( ) {
        for ( var i = 0; i < this.standardOptions.length; i++ ) {
            let index = i
            this.buttons.push( 
                new BattleMenuButton( 
                    this.standardOptions[index], 
                    (this.x + battleGlobalss.BATTLE_FONT_LINE_HEIGHT / 2), 
                    (this.y + battleGlobals.BATTLE_FONT_LINE_HEIGHT) + ( battleGlobals.LARGE_FONT_LINE_HEIGHT * index ), 
                    index, this.standardDescriptions[index]
                )
            );
        }
    }

    setXy( x, y ) {
        console.log(x, y)
        this.x = x;
        this.y = y;
        for ( var i = 0; i < this.buttons.length; i++ ) {
            this.buttons[i].x = x + battleGlobals.BATTLE_FONT_LINE_HEIGHT / 2;
        }             
    }

    resetMenu( ) {
        this.activateButtonAtIndex( 0 )
    }

    activateButtonAtIndex( buttonIndex, UI ) {
        if ( this.activeButton != null ) {
            this.activeButton.deActivate( );            
        }

        if ( buttonIndex < 0 ) {
            buttonIndex = this.buttons.length - 1;
        }
        else if ( buttonIndex > ( this.buttons.length - 1 ) ) {
            buttonIndex = 0;
        }

        this.buttons[buttonIndex].activate( );
        this.activeButton       = this.buttons[buttonIndex];

        if ( this.inMoveMenu || this.activeButton.text == "ATTACK") {
            let attribute = this.activeCharacter.moves[buttonIndex].attribute;
            if ( attribute != undefined ) {
                UI.setHeader( 
                    "Attribute: " + attribute, " Skill: " + this.activeCharacter.character.attributes[attribute]
                );  
                attribute = undefined              
            }

            UI.setText( this.activeCharacter.moves[buttonIndex].desc )
        }
        else {
            UI.setHeader( " " );  
            UI.setText( this.activeButton.description )
        }
    }

    draw( ) {
        if ( state.battleState.battlePhase == battleGlobals['PHASE_SELECT_MOVE'] ) {
            canvas.drawRect( "FRONT", this.x, this.y, this.width, this.height, "black" )

            for ( var i = 0; i < this.buttons.length; i++ ) {
                this.buttons[i].drawButton( );
            }             
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
            this.buttons[i].setText( this.standardOptions[i], this.standardDescriptions[i] );
        }   
    }
}

class BattleMenuButton {
    constructor( text, x, y, index, description) {
        this.text       = text;
        this.description= description
        this.x          = x;
        this.y          = y;
        this.isActive   = false;
        this.index      = index
        this.color      = "white";
        this.fontSize   = "LARGE";
        this.move       = false;
        this.iterator = 0;
    }

    setMove( move ) {
        this.move = move
        this.setText( this.move.name, this.move.desc )
    }

    drawButton( ) {
        canvas.writeTextLine( this.text, this.x, this.y, this.fontSize, this.color )
        if ( this.isActive ) {
            canvas.drawRect( 
                "FRONT", 
                this.x - ( battleGlobals.BATTLE_MENU_BUTTON_MARGIN ), 
                this.y + ( ( battleGlobals.BATTLE_MENU_BUTTON_MARGIN ) - this.height ) / 2 , 
                battleGlobals.BATTLE_MENU_BUTTON_MARGIN, battleGlobals.BATTLE_MENU_BUTTON_MARGIN,
                this.color
            );            
        }
    }

    setText( text, description ) {
        this.text           = text;
        this.description    = description;
    }

    activate( ) {
        this.isActive   = true;
        this.color      = "purple";

        if ( this.text == "ATTACK" ) {
            this.move = state.battleState.playerParty.activeMember.standardAttack;
        }
        else if ( this.move.name == "Attack" && this.text != "ATTACK"  ) {
            this.move = false;
        }

        if ( this.text == "RETURN" ) {
            state.battleState.playerParty.activeMember.nextMove = false;
        }
    }

    deActivate( ) {
        this.isActive   = false;
        this.color      = "white";
    }
}

module.exports = {
    BattleMenu
}