const canvasHelpers = require('../../helpers/canvasHelpers')
const mapHelpers = require('../../helpers/mapHelpers')
const globals = require('../../game-data/globals')

class Sprite {

    constructor ( start, spriteSheetSrc, typeOfStart, spriteSize, spriteDirection = 0 ) {   
        if ( spriteSize == "STRD" ) {
            this.width   = globals.STRD_SPRITE_WIDTH;
            this.height  = globals.STRD_SPRITE_HEIGHT;            
        }
        else if ( spriteSize == "LARG" ) {
            this.width   = globals.BATTLE_SPRITE_WIDTH;
            this.height  = globals.BATTLE_SPRITE_HEIGHT;   
        }

        this.left, this.right, this.top, this.bottom;

        this.animLoop      = [ 0, 1, 2, 3]
        this.animIterator  = 0
        this.frameCount    = 0
        this.direction     = spriteDirection;
        this.sheetSrc      = spriteSheetSrc
        this.sheet         = new Image();

       ( typeOfStart === 'CELL' ) ? this.initSpriteFromCell( start ) : this.initSpriteFromXy( start )

        this.loaded = false
        this.getSpriteAndDrawWhenLoaded( )
    }

    initSpriteFromCell( start ) {
        this.x       = 0
        this.y       = 0

        this.row     = start.row
        this.col     = start.col  
        this.calcXyFromCell()  
    }

    initSpriteFromXy( start ) {
        this.x       = start.x
        this.y       = start.y

        this.row     = 0
        this.col     = 0  
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

    updateSpriteBorders( ) {
        this.left   = this.x,
        this.right  = this.x + this.width,
        this.top    = this.y,
        this.bottom = this.y + this.height
    }

    calcXyFromCell( ) {
        const xy = mapHelpers.getXYOfCell(this.row, this.col)
        this.x = ( xy.x - (this.width - globals.GRID_BLOCK_PX) )
        this.y = ( xy.y - (this.height - globals.GRID_BLOCK_PX) )

        this.updateSpriteBorders( )
    }

    drawSprite( ) {
        canvasHelpers.drawFromImageToCanvas(
            "FRONT",
            this.sheet,
            this.animLoop[this.animIterator] * 30, 
            this.direction * 54, 
            30, 54,
            this.x, this.y, this.width, this.height
        )

        this.updateSpriteBorders( )
    }

    clearSprite( ) {
        canvasHelpers.clearCanvasRectangle(
            "FRONT",
            this.x, this.y, this.width, this.height
        )
    } 
}

module.exports = {
    Sprite
}