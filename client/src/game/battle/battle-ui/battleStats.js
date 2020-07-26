const canvas    = require('../../../helpers/canvasHelpers');
const globals   = require('../../../game-data/globals');
const state     = require('../../../game-data/state')

class BattleStats { 
    constructor ( owner, isPlayer, index ) {
        this.owner          = owner
        this.isPlayer       = isPlayer

        this.startingHP     = owner.character.HP
        this.startingMP     = owner.character.AP

        this.HPBarWidth,
        this.MPBarWidth,
        this.width          = globals.BATTLE_UI_CHAR_WIDTH
        this.height         = globals.BATTLE_UI_CHAR_HEIGHT    

        canvas.setFont("SMALL")
        this.labelWidth = canvas.getFrontCanvasContext().measureText("MP: ").width

        this.setPosition( index )
        this.setContents( )
        this.drawStats( )
    }

    setPosition( index ) {
        if ( this.isPlayer ) {
            this.x      = globals.CANVAS_WIDTH - this.width - ( this.width * index );
            this.y      = globals.CANVAS_HEIGHT - this.height
        }
        else {
            this.x      = this.owner.x 
            this.y      = this.owner.y - globals.SMALL_FONT_LINE_HEIGHT
        }
    }

    setContents( ) {
        this.name       = this.owner.character.name
        this.className  = this.owner.character.className
        this.HP         = this.owner.character.HP
        this.MP         = this.owner.character.AP
        this.level      = this.owner.character.level

        this.HPBarWidth = (this.width - this.labelWidth) * ( this.HP / this.startingHP )
        this.MPBarWidth = (this.width - this.labelWidth) * ( this.MP / this.startingMP  )
    }

    refresh( ) {
        state.battleState.charactersInField.forEach( ( e ) => {
            if ( e.name == this.owner.name ) {
                this.owner = e
            }
        } )
    }

    drawStats( ) {
        this.isPlayer ? this.drawPlayerCharacterStats() : this.drawOpponentStats();
    }

    drawPlayerCharacterStats( ) {
        canvas.drawFromImageToCanvas( 
            "FRONT", this.owner.sprite.sheet, 
            0, 0, globals.MAP_SPRITE_WIDTH_IN_SHEET, globals.MAP_SPRITE_HEIGHT_IN_SHEET * .66,
            this.x, this.y,
            this.width, this.height
        )

        canvas.setFont("LARGE")
        const nameWidth = canvas.getFrontCanvasContext().measureText(this.name).width
        canvas.writeTextLine( 
            this.name, 
            this.x + ( ( this.width - nameWidth ) / 2), 
            ( this.y + this.height ) - globals.LARGE_FONT_LINE_HEIGHT, 
            "LARGE" 
        );

        canvas.drawRect(
            "FONT",
            this.x, this.y,
            this.width, globals.LARGE_FONT_LINE_HEIGHT,
            "green"
        )
        
        canvas.writeTextLine( 
            "HP: " + this.HP + " / " + this.startingHP, 
            this.x, this.y + globals.SMALL_FONT_LINE_HEIGHT, 
            "SMALL" 
        );

        canvas.drawRect(
            "FONT",
            this.x, this.y  + globals.LARGE_FONT_LINE_HEIGHT,
            this.width, globals.LARGE_FONT_LINE_HEIGHT,
            "red"
        )

        canvas.writeTextLine( 
            "MP: " + this.MP + " / " + this.startingMP, 
            this.x, this.y + globals.SMALL_FONT_LINE_HEIGHT + globals.LARGE_FONT_LINE_HEIGHT, 
            "SMALL" 
        );
    }

    drawOpponentStats( ) {
        canvas.writeTextLine( 
            "HP: " + this.HP, 
            this.x, 
            this.y, 
        "SMALL" );
    }
}

module.exports = {
    BattleStats
}