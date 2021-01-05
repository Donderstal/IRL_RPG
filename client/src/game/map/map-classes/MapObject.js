const I_Hitbox      = require('../../interfaces/I_Hitbox').I_Hitbox
const I_Sprite      = require('../../interfaces/I_Sprite').Sprite
const globals       = require('../../../game-data/globals')
const canvasHelpers = require('../../../helpers/canvasHelpers')
const MapAction     = require('./MapAction').MapAction

const mapObjectResources = require('../../../resources/mapObjectResources')

class MapObject extends I_Sprite {
    constructor ( tile ){
        const objectResource = mapObjectResources[tile.spriteData.type]
        const src = "/static/sprite-assets/" + objectResource.src
        const dimensions = {
            "width": objectResource.width_blocks * globals.GRID_BLOCK_PX,
            "height": objectResource.height_blocks * globals.GRID_BLOCK_PX 
        }

        super( tile, dimensions, src )

        this.widthInSheet   = objectResource.width_blocks * globals.GRID_BLOCK_IN_SHEET_PX;
        this.heightInSheet  = objectResource.height_blocks * globals.GRID_BLOCK_IN_SHEET_PX;
        this.hasAction  = tile.spriteData.hasAction;

        if ( this.hasAction ) {
            this.hitbox = new MapAction( this.x + (globals.GRID_BLOCK_PX * .25), this.y + (this.height - globals.GRID_BLOCK_PX), tile.spriteData.action )
            this.action = tile.spriteData.action
        }
        else {
            this.hitbox = new I_Hitbox( this.x + (globals.GRID_BLOCK_PX * .25), this.y + (this.height - globals.GRID_BLOCK_PX), this.width / 2 );
        }
    }

    drawSprite( ) {
        canvasHelpers.drawFromImageToCanvas(
            "FRONT",
            this.sheet,
            this.sheetPosition * this.widthInSheet, 
            this.direction * this.heightInSheet, 
            this.widthInSheet, this.heightInSheet,
            this.x, this.y, this.width, this.height
        )

        this.updateSpriteBorders( )

        if ( this.hasAction ) {
            this.hitbox.checkForActionRange( );        
        }
    }
}

module.exports = {
    MapObject
}