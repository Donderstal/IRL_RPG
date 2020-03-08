const I_Sprite = require('../core/I_Sprite').Sprite
const mapHelpers = require('../../helpers/mapHelpers')
const globals = require('../../game-data/globals')

class MapSprite extends I_Sprite {
    constructor ( start, spriteSheetSrc, typeOfStart, spriteDirection = 0 ) {        
        super ( start, spriteSheetSrc, typeOfStart, spriteDirection )
        this.cell = {}
    }

    initSpritFromXy( start ) {
        super.initSpritFromXy( start )
        this.setCellXy( )
        this.calcCellFromXy()
    }

    updateSpriteCellXy( ) {
        this.cell.x = this.x + ( this.width * .5 ),
        this.cell.y = this.y + ( this.height - globals.GRID_BLOCK_PX)
    }

    setCell( cell ) {
        this.row = cell.row
        this.col = cell.col
    }

    setCellXy( ) {
        this.cell.x = this.x + (( this.x + globals.GRID_BLOCK_PX ) - ( this.x + this.width ))
        this.cell.y = this.y + (( this.y + globals.GRID_BLOCK_PX ) - ( this.y + this.height ))
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