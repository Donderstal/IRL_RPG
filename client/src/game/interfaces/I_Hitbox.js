const canvasHelpers = require('../../helpers/canvasHelpers')
const mapHelpers = require('../../helpers/mapHelpers')
const globals = require('../../game-data/globals')

class I_Hitbox {
    constructor( x, y, radius ) {
        this.x      = x;
        this.y      = y;
        this.radius = radius;
    }

    updateXy(newX, newY ) {
        if ( this.x != newX || this.y != newY  ) {
        this.x = newX;
        this.y = newY;            
        }
    }

    draw( x, y ) {
        this.updateXy( x, y )
        let frontCtx = canvasHelpers.getFrontCanvasContext( );
        frontCtx.beginPath( );
        frontCtx.arc( this.x, this.y, this.radius, 0, 2 * Math.PI );
        frontCtx.stroke( );
    }
}

module.exports = {
    I_Hitbox
}