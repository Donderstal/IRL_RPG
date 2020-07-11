const canvas    = require('../../../helpers/canvasHelpers');
const globals   = require('../../../game-data/globals');
const state     = require('../../../game-data/state')

class BattleStats { 
    constructor ( owner, isPlayer, index ) {
        this.owner          = owner
        this.isPlayer       = isPlayer

        this.startingHP     = owner.character.stats.Health
        this.startingMP     = owner.character.stats.Mana

        this.HPBarWidth,
        this.MPBarWidth,
        this.width          = globals.CANVAS_WIDTH * .15
        
        canvas.setFont("SMALL")
        this.manalabelWidth = canvas.getFrontCanvasContext().measureText("MP: " + this.startingMP).width

        this.height         = globals.CANVAS_HEIGHT * .1

        this.setPosition( index )
        this.setContents( )
        this.drawStats( true )
    }

    setPosition( index ) {
        if ( this.isPlayer ) {
            this.x      = 0 + ( this.width * index )
            this.y      = 0
        }
        else {
            this.x      = globals.CANVAS_WIDTH - this.width - ( this.width * index );
            this.y      = globals.CANVAS_HEIGHT - this.height
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
        canvas.drawRect( "FRONT", this.x, this.y, this.width, this.height, 'rgba(100, 0, 83)' );

        canvas.writeTextLine( this.name, this.x + (globals.LARGE_FONT_SIZE / 2), this.y + globals.SMALL_FONT_LINE_HEIGHT, "LARGE" )
        const nameWidth = canvas.getFrontCanvasContext().measureText(this.name).width
        canvas.writeTextLine( " the " + this.className, this.x + nameWidth + (globals.LARGE_FONT_SIZE / 2), this.y + globals.SMALL_FONT_LINE_HEIGHT, "SMALL" )

        const manalabelWidth = canvas.getFrontCanvasContext().measureText("MP: " + this.MP).width     
        const statBarX = this.x + manalabelWidth + globals.SMALL_FONT_SIZE / 2

        canvas.drawFromImageToCanvas( 
            "FRONT", this.owner.sprite.sheet, 
            0, 0, globals.MAP_SPRITE_WIDTH_IN_SHEET, globals.MAP_SPRITE_HEIGHT_IN_SHEET * .66,
            this.x + globals.LARGE_FONT_SIZE / 2, this.y + globals.LARGE_FONT_LINE_HEIGHT,
            globals.GRID_BLOCK_PX, globals.GRID_BLOCK_PX
        )

        canvas.writeTextLine( "HP: " + this.HP, this.x + globals.GRID_BLOCK_PX + (globals.SMALL_FONT_SIZE / 2), this.y + globals.LARGE_FONT_LINE_HEIGHT + globals.LARGE_FONT_SIZE, "SMALL" )
        canvas.writeTextLine( "MP: " + this.MP, this.x + globals.GRID_BLOCK_PX + (globals.SMALL_FONT_SIZE / 2), this.y + globals.LARGE_FONT_LINE_HEIGHT + (globals.LARGE_FONT_SIZE * 2), "SMALL" )

        /* canvas.drawRect( "FRONT", statBarX, this.y, this.HPBarWidth, globals.LARGE_FONT_SIZE, 'green' );
        canvas.drawRect( "FRONT", this.x, this.y + globals.LARGE_FONT_SIZE, this.width, 1, '#800020' );
        

        canvas.drawRect( "FRONT", statBarX, this.y + globals.LARGE_FONT_SIZE + 1, this.MPBarWidth, globals.LARGE_FONT_SIZE, 'blue' )
        canvas.drawRect( "FRONT", this.x, this.y + ( globals.LARGE_FONT_SIZE * 2), this.width, 1, '#800020' );
         */
    }
}

module.exports = {
    BattleStats
}