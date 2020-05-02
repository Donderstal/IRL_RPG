const canvas    = require('../../../helpers/canvasHelpers');
const globals   = require('../../../game-data/globals');
const state     = require('../../../game-data/state')

class BattleStats { 
    constructor ( owner, isPlayer ) {
        this.owner          = owner
        this.isPlayer       = isPlayer

        this.startingHP     = owner.character.stats.Health
        this.startingMP     = owner.character.stats.Mana

        this.HPBarWidth,
        this.MPBarWidth,
        this.width          = globals.CANVAS_WIDTH * .15
        
        canvas.setFont("SMALL")
        this.manalabelWidth = canvas.getFrontCanvasContext().measureText("MP: " + this.startingMP).width

        this.height         = globals.CANVAS_HEIGHT * .05
        this.y              = owner.sprite.y - globals.CANVAS_HEIGHT * .05

        this.setPosition( )
        this.setContents( )
        this.drawStats( true )
    }

    setPosition( ) {
        if ( this.isPlayer ) {
            this.x      = this.owner.sprite.x - ( this.width * 1.25 ) 
        }
        else {
            this.x      = this.owner.sprite.x + this.owner.sprite.width + ( this.width * .25 ) 
        }
    }

    setContents( ) {
        this.name       = this.owner.character.name
        this.className  = this.owner.character.className
        this.HP         = this.owner.character.stats.Health
        this.MP         = this.owner.character.stats.Mana
        this.level      = this.owner.character.level

        this.HPBarWidth = (this.width - this.manalabelWidth) * ( this.HP / this.startingHP )
        this.MPBarWidth = (this.width - this.manalabelWidth) * ( this.MP / this.startingMP  )
    }

    refresh( ) {
        state.battleState.charactersInField.forEach( ( e ) => {
            if ( e.name == this.owner.name ) {
                this.owner = e
            }
        } )
    }

    drawStats( ) {
        canvas.drawRect( "FRONT", this.x - 2, this.y - 2, this.width + 4, this.height + 4, 'rgba(255,255,255, 0.66)' );

        canvas.writeTextLine( this.name, this.x, this.y - globals.SMALL_FONT_SIZE, "LARGE" )
        const nameWidth = canvas.getFrontCanvasContext().measureText(this.name).width
        canvas.writeTextLine( " the " + this.className, this.x + nameWidth, this.y - globals.SMALL_FONT_SIZE, "SMALL" )

        const manalabelWidth = canvas.getFrontCanvasContext().measureText("MP: " + this.MP).width     
        const statBarX = this.x + manalabelWidth + globals.SMALL_FONT_SIZE / 4

        canvas.drawRect( "FRONT", statBarX, this.y, this.HPBarWidth, globals.LARGE_FONT_SIZE, 'green' );
        canvas.drawRect( "FRONT", this.x, this.y + globals.LARGE_FONT_SIZE, this.width, 1, '#800020' );
        canvas.writeTextLine( "HP: " + this.HP, this.x + globals.SMALL_FONT_SIZE / 4, this.y + globals.LARGE_FONT_SIZE, "SMALL" )

        canvas.drawRect( "FRONT", statBarX, this.y + globals.LARGE_FONT_SIZE + 1, this.MPBarWidth, globals.LARGE_FONT_SIZE, 'blue' )
        canvas.drawRect( "FRONT", this.x, this.y + ( globals.LARGE_FONT_SIZE * 2), this.width, 1, '#800020' );
        canvas.writeTextLine( "MP: " + this.MP, this.x + globals.SMALL_FONT_SIZE / 4, this.y + (globals.LARGE_FONT_SIZE * 2), "SMALL" )
    }
}

module.exports = {
    BattleStats
}