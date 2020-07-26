const globals = require('../../../game-data/globals')
const canvas = require('../../../helpers/canvasHelpers')

class BattleMenu {
    constructor( ) {
        this.width          = globals.CANVAS_WIDTH / 8;
        this.height         = globals.BATTLE_FONT_LINE_HEIGHT * 5.5;
        this.x              = 0;
        this.y              = globals.CANVAS_HEIGHT - this.height
        this.textStartingY  = this.y + globals.BATTLE_FONT_LINE_HEIGHT
        this.textStartingX  = globals.BATTLE_FONT_LINE_HEIGHT / 2
        this.drawMenu( )
    }

    drawMenu( ) {
        canvas.drawRect( "FRONT", this.x, this.y, this.width, this.height, "black" )
        let lineHeightAcc = 0;
        canvas.writeTextLine( "ATTACK", this.textStartingX, this.textStartingY + lineHeightAcc, "BATTLE" )
        lineHeightAcc += globals.BATTLE_FONT_LINE_HEIGHT
        canvas.writeTextLine( "MOVES", this.textStartingX, this.textStartingY + lineHeightAcc, "BATTLE" )
        lineHeightAcc += globals.BATTLE_FONT_LINE_HEIGHT
        canvas.writeTextLine( "ITEMS", this.textStartingX, this.textStartingY + lineHeightAcc, "BATTLE" )
        lineHeightAcc += globals.BATTLE_FONT_LINE_HEIGHT
        canvas.writeTextLine( "FLEE", this.textStartingX, this.textStartingY + lineHeightAcc, "BATTLE" )
        lineHeightAcc += globals.BATTLE_FONT_LINE_HEIGHT
        canvas.writeTextLine( "OPTIONS", this.textStartingX, this.textStartingY + lineHeightAcc, "BATTLE" )
    }
} 

module.exports = {
    BattleMenu
}