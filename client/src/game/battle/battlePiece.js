const canvasHelpers = require('../../helpers/canvasHelpers')
const mapHelpers = require('../../helpers/mapHelpers')
const globals = require('../../game-data/globals')

class battlePiece {

    constructor ( start, spriteSheetSrc, spriteDirection = 0 ) {        
        this.width   = globals.STRD_SPRITE_WIDTH  * 2;
        this.height  = globals.STRD_SPRITE_HEIGHT * 2;
        this.cell   = {}

        this.left    = 0
        this.right   = 0
        this.top     = 0
        this.bottom  = 0

        this.animLoop      = [ 0, 1, 2, 3]
        this.animIterator  = 0
        this.frameCount    = 0
        this.direction     = spriteDirection;
        this.sheetSrc      = spriteSheetSrc
        this.sheet         = new Image();

        this.x       = 0
        this.y       = 0

        this.row     = start.row
        this.col     = start.col  
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

    drawSprite( ) {
        canvasHelpers.drawFromImageToCanvas(
            "FRONT",
            this.sheet,
            this.animLoop[this.animIterator] * 37, 
            this.direction * 37, 
            37, 37,
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
    battlePiece
}