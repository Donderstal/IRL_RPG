const I_Sprite = require('../../interfaces/I_Sprite').Sprite
const mapHelpers = require('../../../helpers/mapHelpers')
const globals = require('../../../game-data/globals')

class MapSprite extends I_Sprite {
    constructor ( start, spriteSheetSrc, typeOfStart, spriteDirection = 0 ) {       
        super ( start, spriteSheetSrc, typeOfStart, "STRD", spriteDirection )
        this.cell = {}
    }

    drawSprite( ) {
        super.drawSprite( )
        this.updateSpriteCellXy( )
    }

    updateSpriteCellXy( ) {
        this.cell.x = this.x + ( this.width * .5 ),
        this.cell.y = this.y + ( this.height - globals.GRID_BLOCK_PX)
    }

    setCell( cell ) {
        this.row = cell.row
        this.col = cell.col
    }

        
    calcCellFromXy( ) {
        const cell = mapHelpers.getCellOfXY( this.cell.x, this.cell.y )
        this.row = cell.row
        this.col = cell.col

        this.updateSpriteBorders( )
        this.updateSpriteCellXy( )
    }
}

module.exports = {
    MapSprite
}