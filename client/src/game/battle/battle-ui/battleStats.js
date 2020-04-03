const canvas    = require('../../../helpers/canvasHelpers');
const globals   = require('../../../game-data/globals');
const state     = require('../../../game-data/state')

class BattleStats { 
    constructor ( owner, isPlayer ) {
        this.owner = owner
        this.isPlayer = isPlayer
        this.setPosition( )
        this.setContents( )
        this.drawStats( )
    }

    setPosition( ) {
        const canvWidth = globals.CANVAS_WIDTH;
        const canvHeight = globals.CANVAS_HEIGHT;
        if ( this.isPlayer ) {
            this.x = canvWidth * .05
            this.y = canvHeight * .25
            this.width = canvWidth * .20
            this.height = canvHeight * .05
        }
        else {
            this.x =canvWidth * .75
            this.y = canvHeight * .25
            this.width = canvWidth * .20
            this.height = canvHeight * .05
        }
    }

    setContents( ) {
        this.name       = this.owner.name
        this.className  = this.owner.className
        this.HP         = this.owner.stats.Health
        this.Mana       = this.owner.stats.Mana
        this.level      = this.owner.level
    }

    refresh( ) {
        if ( this.isPlayer ) {
            this.owner = state.battleState.player.character
            this.setContents( )
        }
        else {
            this.owner = state.battleState.opponent.character
            this.setContents( )
        }
    }

    drawStats( ) {
        this.refresh( )
        canvas.drawRect( "FRONT", this.x - 2, this.y - 2, this.width + 4, this.height + 4, 'rgba(255,255,255, 0.66)' );

        canvas.writeTextLine( this.name, this.x, this.y - globals.SMALL_FONT_SIZE, "LARGE" )
        const nameWidth = canvas.getFrontCanvasContext().measureText(this.name).width
        canvas.writeTextLine( " the " + this.className, this.x + nameWidth, this.y - globals.SMALL_FONT_SIZE, "SMALL" )

        const manalabelWidth = canvas.getFrontCanvasContext().measureText("MP: " + this.Mana).width     
        const statBarX = this.x + manalabelWidth + globals.SMALL_FONT_SIZE / 4

        canvas.drawRect( "FRONT", statBarX, this.y, this.width - manalabelWidth, globals.LARGE_FONT_SIZE, 'green' );
        canvas.drawRect( "FRONT", this.x, this.y + globals.LARGE_FONT_SIZE, this.width, 1, '#800020' );
        canvas.writeTextLine( "HP: " + this.HP, this.x + globals.SMALL_FONT_SIZE / 4, this.y + globals.LARGE_FONT_SIZE, "SMALL" )

        canvas.drawRect( "FRONT", statBarX, this.y + globals.LARGE_FONT_SIZE + 1, this.width - manalabelWidth, globals.LARGE_FONT_SIZE, 'blue' )
        canvas.drawRect( "FRONT", this.x, this.y + ( globals.LARGE_FONT_SIZE * 2), this.width, 1, '#800020' );
        canvas.writeTextLine( "MP: " + this.Mana, this.x + globals.SMALL_FONT_SIZE / 4, this.y + (globals.LARGE_FONT_SIZE * 2), "SMALL" )
    }
}

module.exports = {
    BattleStats
}