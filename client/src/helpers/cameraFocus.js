const { CANVAS_WIDTH, CANVAS_HEIGHT, GRID_BLOCK_PX } = require('../game-data/globals')

class CameraFocus {
    constructor( ) {
        this.startingXValue = (CANVAS_WIDTH - document.documentElement.clientWidth) / 2;
        this.startingYValue = (CANVAS_HEIGHT - (GRID_BLOCK_PX * 12)) / 2;

        this.xValue;
        this.yValue;

        this.updateXValue( this.startingXValue )
        this.updateYValue( this.startingYValue )
    }

    get xValueAsString() { return -this.xValue + 'px'}
    get yValueAsString() { return -this.yValue + 'px'}

    updateXValue( newValue ) {
        this.xValue = newValue;
        document.getElementById("canvas-wrapper").style.right = this.xValueAsString;
    }

    updateYValue( newValue ) {
        this.yValue = newValue;
        document.getElementById("canvas-wrapper").style.top = this.yValueAsString;
    }

    centerOnCell( cell, mapData ) {
        this.centerOnColumn( cell.col, mapData.columns );
        this.centerOnRow( cell.row, mapData.rows );
    }

    centerOnColumn( column, columnsInMap ) {
        const mapMiddle = (columnsInMap / 2 ) * GRID_BLOCK_PX;
        const playerSpriteMiddle = ( column * GRID_BLOCK_PX ) - ( GRID_BLOCK_PX / 2);

        let newXValue = this.startingXValue;
        const difference = Math.abs( playerSpriteMiddle - mapMiddle )
        if ( playerSpriteMiddle < mapMiddle ) {
            newXValue += difference
        }
        else if ( playerSpriteMiddle > mapMiddle ) {
            newXValue -= difference
        }

        this.updateXValue( newXValue );
    }

    centerOnRow( row, rowsInMap ) {
        const mapMiddle = (rowsInMap / 2 ) * GRID_BLOCK_PX;
        const playerSpriteMiddle = ( row * GRID_BLOCK_PX ) - ( GRID_BLOCK_PX / 2);

        let newYValue = this.startingYValue;
        const difference = Math.abs( playerSpriteMiddle - mapMiddle )
        if ( playerSpriteMiddle < mapMiddle ) {
            newYValue -= difference
        }
        else if ( playerSpriteMiddle > mapMiddle ) {
            newYValue += difference
        }

        this.updateYValue( newYValue );
    }
}

module.exports = {
    CameraFocus
}