const MapSprite     = require('./MapSprite').MapSprite
const MapAction     = require('./MapAction').MapAction
const globals       = require('../../../game-data/globals')

class NPC extends MapSprite {
    constructor( tile ) {
        const hasAction = ( tile.spriteData.action !== undefined );
        let src = '/static/sprites/'+ tile.spriteData.sprite;
        super( tile, "STRD", src )   
        
        this.type = tile.spriteData.type
        this.name = tile.spriteData.name

        if ( hasAction ) {
            this.hitbox = new MapAction( this.centerX( ), this.y, tile.spriteData.action, tile.spriteData.name );
            this.action = tile.spriteData.action
            this.action.name = this.name
        }

        if ( tile.spriteData.type == "walking" || tile.spriteData.type == "flying" ) {
            this.path = tile.spriteData.path
            this.lastPosition = tile.spriteData.lastPosition
        }
    }

    drawSprite( ) {
        super.drawSprite( )
        const random = Math.random() < 0.05;
        if ( random && !this.inMovementAnimation && !this.hasDestinationSet ) {
            this.initMovement( );
            this.hasDestinationSet = true;
            let des = { col: 8, row: 6 }
            this.setDestination( des );
        }

        if ( this.movingToDestination ) {
            if ( !this.pathIsBlocked ) {
                this.goToDestination( );     
            }
        }

        if ( this.movingToDestination ) {
            this.countFrame( );
        }
    }
}

module.exports = {
    NPC
}