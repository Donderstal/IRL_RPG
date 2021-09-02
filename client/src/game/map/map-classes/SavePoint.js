const { GRID_BLOCK_PX } = require("../../../game-data/globals");
const { getEffect } = require("../../../helpers/effectHelpers");
const { MapAction } = require("./MapAction");

class Savepoint extends MapAction { 
    constructor( tile, action ) {
        let x = tile.x + ( GRID_BLOCK_PX / 2 )
        let y = tile.y + ( GRID_BLOCK_PX / 2 )
        super( x, y, action )

        this.initSavePointEffect( )
    }

    initSavePointEffect(  ) {
        this.effect = getEffect( "BLUE_SQUARE", this.x, this.y ); 
    }

    draw( ) {
        this.effect.drawBack( this.x - ( this.effect.effects[0].width / 2 ), this.y - ( this.effect.effects[0].height / 2 ) )
    }
}

module.exports = {
    Savepoint
}