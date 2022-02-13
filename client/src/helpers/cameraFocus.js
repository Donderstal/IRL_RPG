const { CANVAS_WIDTH, GRID_BLOCK_PX } = require('../game-data/globals')

class CameraFocus {
    constructor( ) {
        this.startingValue = (CANVAS_WIDTH - document.documentElement.clientWidth) / 2;
        this.value;

        this.updateValue( this.startingValue )
    }

    get valueAsString() { return -this.value + 'px'}

    updateValue( newValue ) {
        this.value = newValue;
        document.getElementById("canvas-wrapper").style.right = this.valueAsString;
    }

    centerOnColumn( column, columnsInMap ) {
        const mapMiddle = (columnsInMap / 2 ) * GRID_BLOCK_PX;
        const playerSpriteMiddle = ( column * GRID_BLOCK_PX ) - ( GRID_BLOCK_PX / 2);

        let newXValue = this.startingValue;
        const difference = Math.abs( playerSpriteMiddle - mapMiddle )
        if ( playerSpriteMiddle < mapMiddle ) {
            newXValue += difference
        }
        else if ( playerSpriteMiddle > mapMiddle ) {
            newXValue -= difference
        }

        this.updateValue( newXValue );
    }
}

module.exports = {
    CameraFocus
}