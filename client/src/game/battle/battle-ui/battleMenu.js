const canvas            = require('../../../helpers/canvasHelpers')
const state             = require('../../../game-data/state')
const battleGlobals     = require('../battleGlobals');
const BattleMenuButton  = require('./battleMenuButton').BattleMenuButton

class BattleMenu {
    constructor( firstCharacter ) {
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
        this.activeCharacter = firstCharacter;

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
                    (this.x + battleGlobals.BATTLE_FONT_LINE_HEIGHT / 2), 
                    (this.y + battleGlobals.BATTLE_FONT_LINE_HEIGHT) + ( battleGlobals.LARGE_FONT_LINE_HEIGHT * index ), 
                    index, this.standardDescriptions[index]
                )
            );
        }
    }

    setXy( x, y ) {
        this.x = x;
        this.y = y;
        for ( var i = 0; i < this.buttons.length; i++ ) {
            this.buttons[i].x = x + battleGlobals.BATTLE_FONT_LINE_HEIGHT / 2;
        }             
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

        if ( ( this.inMoveMenu && this.activeButton.text != "RETURN" ) || this.activeButton.text == "ATTACK") {
            let attribute = this.activeCharacter.moves[buttonIndex].attribute;
            if ( attribute != undefined ) {
                UI.setHeader( 
                    "Skill: " + attribute + ", Value: " + this.activeCharacter.character.attributes[attribute]
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
            if ( this.activeCharacter.moves[i] != undefined ) {
                this.buttons[i].setMove( this.activeCharacter.moves[i] );                
            } else {
                this.buttons[i].setText( "RETURN", "Return to main battle menu" );                
            }
        } 
    }

    getStandardMenu( ) {
        this.inMoveMenu = false;
        for ( var i = 0; i < this.buttons.length; i++ ) {
            if ( this.standardOptions[i] == "ATTACK" ) {
                this.buttons[i].setMove( this.activeCharacter.standardAttack );
            }
            this.buttons[i].setText( this.standardOptions[i], this.standardDescriptions[i] );
        }   
    }
}

module.exports = {
    BattleMenu
}