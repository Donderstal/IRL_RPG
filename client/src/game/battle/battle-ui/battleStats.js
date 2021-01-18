const canvas        = require('../../../helpers/canvasHelpers');
const globals       = require('../../../game-data/globals');
const battleGlobals = require('../battleGlobals');

class BattleStats { 
    constructor ( owner, isPlayer, index ) {
        this.owner          = owner
        this.isPlayer       = isPlayer

        this.startingHP     = owner.character.HP
        this.startingAP     = owner.character.AP

        this.HPBarWidth,
        this.MPBarWidth,
        this.width          = battleGlobals.BATTLE_UI_CHAR_WIDTH
        this.height         = battleGlobals.BATTLE_UI_CHAR_HEIGHT    

        canvas.setFont("SMALL")
        this.labelWidth = canvas.getFrontCanvasContext().measureText("MP: ").width

        this.setPosition( index )
        this.setContents( );
        this.draw( );
    }

    setPosition( index ) {
        if ( this.isPlayer ) {
            this.x      = globals.CANVAS_WIDTH - this.width - ( this.width * index );
            this.y      = globals.CANVAS_HEIGHT - this.height
        }
        else {
            this.x      = this.owner.sprite.x 
            this.y      = this.owner.sprite.y - globals.SMALL_FONT_LINE_HEIGHT
        }
        this.bottom = this.y + this.height
    }

    setContents( ) {
        this.name       = this.owner.character.name
        this.className  = this.owner.character.className
        this.HP         = this.owner.character.HP
        this.AP         = this.owner.character.AP
        this.level      = this.owner.character.level

        this.HPBarWidth = (this.width - this.labelWidth) * ( this.HP / this.startingHP )
        this.MPBarWidth = (this.width - this.labelWidth) * ( this.MP / this.startingMP  )
    }

    refresh( ) {
        globals.GAME.BATTLE.charactersInField.forEach( ( e ) => {
            if ( e.name == this.owner.name ) {
                this.owner = e
            }
        } )
    }

    draw( ) {
        this.isPlayer ? this.drawPlayerCharacterStats() : this.drawOpponentStats();
    }

    update( newHP, newAP ) {
        this.HP = newHP == null ? this.HP : this.HP - newHP;
        this.AP = newAP == null ? this.AP : newAP;

        if ( this.HP < 1 ) {
            this.owner.isDefeated = true;
        }
    }

    setXy( x, y ) {
        this.x = x;
        this.y = y;
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
            this.y + globals.LARGE_FONT_LINE_HEIGHT, 
            "LARGE" 
        );

        canvas.drawRect(
            "FONT",
            this.x, this.bottom - globals.SMALL_FONT_LINE_HEIGHT,
            this.width, globals.SMALL_FONT_LINE_HEIGHT,
            "black"
        )

        canvas.drawRect(
            "FONT",
            this.x, this.bottom - globals.SMALL_FONT_LINE_HEIGHT,
            this.width * ( this.AP / this.startingAP ), globals.SMALL_FONT_LINE_HEIGHT,
            "blue"
        )
        
        let APText = "AP: " + this.AP + " / " + this.startingAP
        canvas.setFont("SMALL")
        canvas.writeTextLine( 
            APText, 
            this.x + (canvas.getFrontCanvasContext().measureText(APText).width * .5), 
            this.bottom - ( globals.SMALL_FONT_LINE_HEIGHT * .25 ), 
            "SMALL" 
        );

        canvas.drawRect(
            "FONT",
            this.x, this.bottom - ( globals.SMALL_FONT_LINE_HEIGHT * 2 ),
            this.width, globals.SMALL_FONT_LINE_HEIGHT,
            "black"
        )
        canvas.drawRect(
            "FONT",
            this.x, this.bottom - ( globals.SMALL_FONT_LINE_HEIGHT * 2 ),
            this.width * ( this.HP / this.startingHP ), globals.SMALL_FONT_LINE_HEIGHT,
            "green"
        )

        let HPText = "HP: " + this.HP + " / " + this.startingHP
        canvas.setFont("SMALL")
        canvas.writeTextLine( 
            HPText, 
            this.x + (canvas.getFrontCanvasContext().measureText(HPText).width * .5), 
            this.bottom - ( globals.SMALL_FONT_LINE_HEIGHT + ( globals.SMALL_FONT_LINE_HEIGHT * .25 ) ), 
            "SMALL" 
        );

        if ( this.HP <= 0 ) {
            canvas.drawRect( "FRONT", this.x, this.y, this.width, this.height, "rgba(46,49,49,0.5);" )
        }
    }

    drawOpponentStats( ) {
        canvas.setFont("SMALL")
        canvas.drawRect(
            "FONT",
            (this.x  - (this.width * .5)) + (canvas.getFrontCanvasContext().measureText("HP: " + this.HP + "/" + this.startingHP).width * .5), this.y,
            this.width, globals.SMALL_FONT_LINE_HEIGHT,
            "black"
        )

        canvas.drawRect(
            "FONT",
            (this.x  - (this.width * .5)) + (canvas.getFrontCanvasContext().measureText("HP: " + this.HP + "/" + this.startingHP).width * .5), this.y,
            this.width * ( this.HP / this.startingHP ), globals.SMALL_FONT_LINE_HEIGHT,
            "green"
        )

        canvas.writeTextLine( 
            "HP: " + this.HP + "/" + this.startingHP, 
            this.x, this.y + globals.SMALL_FONT_SIZE, 
            "SMALL" 
        );

        canvas.writeTextLine( 
            this.name, 
            (this.x  - (this.width * .5)) + (canvas.getFrontCanvasContext().measureText("HP: " + this.HP + "/" + this.startingHP).width * .5), this.y, 
            "LARGE" 
        );
    }
}

module.exports = {
    BattleStats
}