const canvas        = require('../../../helpers/canvasHelpers')
const state         = require('../../../game-data/state')
const battleGlobals = require('../battleGlobals');

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
    BattleMenuButton
}