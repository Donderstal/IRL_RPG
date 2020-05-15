const I_Sprite = require('../../interfaces/I_Sprite').Sprite
const I_Hitbox = require('../../interfaces/I_Hitbox').I_Hitbox
const mapHelpers = require('../../../helpers/mapHelpers')
const globals = require('../../../game-data/globals')

class MapSprite extends I_Sprite {
    constructor ( start, spriteSheetSrc, typeOfStart, spriteDirection = 0 ) {       
        super ( start, spriteSheetSrc, typeOfStart, "STRD", spriteDirection )
        this.cell = {}
        this.centerX = () => { return this.x + ( this.width / 2 ) };
        this.centerY = () => { return this.y + ( this.height / 2 ) };
        this.hitbox = new I_Hitbox( this.centerX( ), this.y, this.width / 2 );
    }

    drawSprite( ) {
        super.drawSprite( )
        this.updateSpriteCellXy( )
        this.hitbox.draw( this.centerX( ), this.centerY( ) );
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