const { 
    CANVAS_WIDTH, CANVAS_HEIGHT, GRID_BLOCK_PX, CANVAS_COLUMNS, CANVAS_ROWS,
    FACING_LEFT, FACING_RIGHT, FACING_UP, FACING_DOWN, 
} = require('../game-data/globals')
const globals = require('../game-data/globals')
const MODE_FOLLOW_SPRITE = "M-FS";
const MODE_CINEMATIC = "M-CI";

class CameraFocus {
    constructor( ) {
        this.setBaseValues( );

        this.xValue;
        this.yValue;

        this.updateXValue( this.startingXValue );
        this.updateYValue( this.startingYValue );

        this.mode = MODE_FOLLOW_SPRITE;
    }

    get cinematicMode() { return mode == MODE_CINEMATIC; }
    get followingSprite() { return mode == MODE_FOLLOW_SPRITE; }

    get xValueAsString() { return -this.xValue + 'px'}
    get yValueAsString() { return -this.yValue + 'px'}

    setSpriteFocus( spriteId ) {
        this.focusSpriteId = spriteId;
    }

    unsetSpriteFocus( ) {
        this.focusSpriteId = false;
    }

    setBaseValues( ) {
        this.startingXValue = (CANVAS_WIDTH - document.documentElement.clientWidth) / 2;
        this.startingYValue = (CANVAS_HEIGHT - document.documentElement.clientHeight) / 2;
    }

    updateXValue( newValue ) {
        this.xValue = newValue;
        document.getElementById("canvas-wrapper").style.left = this.xValueAsString;
    }

    updateYValue( newValue ) {
        this.yValue = newValue;
        document.getElementById("canvas-wrapper").style.top = this.yValueAsString;
    }

    centerOnXY( x, y, calcOffset = true ) {
        let xValue = x;
        let yValue = y;
        if ( calcOffset ) {
            const xBenchMark = document.documentElement.clientWidth > document.documentElement.clientHeight 
                ? document.documentElement.clientWidth
                : document.documentElement.clientHeight;
            const yBenchMark = document.documentElement.clientWidth < document.documentElement.clientHeight 
                ? document.documentElement.clientWidth
                : document.documentElement.clientHeight;
            xValue += ((-xBenchMark) / 2);
            yValue += ((-yBenchMark) / 2);
        }
        this.updateXValue( xValue );
        this.updateYValue( yValue  );
    }

    handleScreenFlip( xy, calcOffset = true ) {
        this.setBaseValues( );
        this.centerOnXY( xy.x, xy.y, calcOffset)
    }

    moveCameraToDirection( direction, speed ) {
        if ( direction == FACING_LEFT ) {
            this.updateXValue( this.xValue - speed );
        }
        if ( direction == FACING_UP ) {
            this.updateYValue( this.yValue - speed );
        }
        if ( direction == FACING_RIGHT ) {
            this.updateXValue( this.xValue + speed );
        }
        if ( direction == FACING_DOWN ) {
            this.updateYValue( this.yValue + speed );
        }
    }
}

module.exports = {
    CameraFocus
}