const canvasHelpers = require('../../helpers/canvasHelpers')
const mapHelpers = require('../../helpers/mapHelpers')
const globals = require('../../game-data/globals')

class gamePiece {

    constructor ( initialRow, initalCol, spriteSheetSrc ) {

        this.x       = 0
        this.y       = 0

        this.row     = initialRow
        this.col     = initalCol
        this.cell   = {}

        this.width   = globals.STRD_SPRITE_WIDTH;
        this.height  = globals.STRD_SPRITE_HEIGHT;

        this.left    = 0
        this.right   = 0
        this.top     = 0
        this.bottom  = 0

        this.animLoop      = [ 0, 1, 2, 3]
        this.animIterator  = 0
        this.frameCount    = 0
        this.direction     = 0;
        this.sheetSrc      = spriteSheetSrc
        this.sheet         = new Image();
        
        this.calcXyFromCell()
        this.loaded = false
        this.getSpriteAndDrawWhenLoaded( )
    }

    getSpriteAndDrawWhenLoaded( ) {
        if ( !this.loaded ) {
            this.sheet.onload = () => {
                this.loaded = true
                this.drawSprite()
            }

            this.sheet.src = this.sheetSrc            
        }
    }
    
    setXY( xy ) {
        this.x = xy.x
        this.y = xy.y
        this.updateSpriteBorders( )
        this.updateSpriteCellXy( )
    }

    updateSpriteBorders( ) {
        this.left   = this.x,
        this.right  = this.x + this.width,
        this.top    = this.y,
        this.bottom = this.y + this.height
    }

    updateSpriteCellXy( ) {
        this.cell.x = this.x + ( this.width * .5 ),
        this.cell.y = this.y + ( this.height - globals.GRID_BLOCK_PX)
    }

    setCell( cell ) {
        this.row = cell.row
        this.col = cell.col
    }

    calcXyFromCell( ) {
        const xy = mapHelpers.getXYOfCell(this.row, this.col)
        
        this.x = ( xy.x - (this.width - globals.GRID_BLOCK_PX) )
        this.y = ( xy.y - (this.height - globals.GRID_BLOCK_PX) )

        this.updateSpriteBorders( )
        this.updateSpriteCellXy( )
    }
        
    calcCellFromXy( ) {
        const cell = mapHelpers.getCellOfXY( this.cell.x, this.cell.y )
        this.row = cell.row
        this.col = cell.col

        this.updateSpriteBorders( )
        this.updateSpriteCellXy( )
    }

    drawSprite( ) {
        canvasHelpers.drawFromImageToCanvas(
            "FRONT",
            this.sheet,
            this.animLoop[this.animIterator] * globals.GRID_BLOCK_PX, 
            this.direction * globals.GRID_BLOCK_PX, 
            globals.GRID_BLOCK_PX, globals.GRID_BLOCK_PX,
            this.x, this.y, this.width, this.height
        )
    }

    clearSprite( ) {
        canvasHelpers.clearCanvasRectangle(
            "FRONT",
            this.x, this.y, this.width, this.height
        )
    } 
}

module.exports = {
    gamePiece
}