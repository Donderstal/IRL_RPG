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

        this.movingToNewFocus = false;
        this.newFocusXy = { x: 0, y: 0 };
        this.lastFocusXy = { x: 0, y: 0 };
        this.mode = MODE_FOLLOW_SPRITE;

        this.updateXValue( this.startingXValue );
        this.updateYValue( this.startingYValue );
    }

    get cinematicMode() { return mode == MODE_CINEMATIC; }
    get followingSprite() { return mode == MODE_FOLLOW_SPRITE; }

    get xValueAsString() { 
        const xBenchMark = document.documentElement.clientWidth > document.documentElement.clientHeight 
        ? document.documentElement.clientWidth
        : document.documentElement.clientHeight;
        return -(this.xValue + ((-xBenchMark) / 2)) + 'px';
    }
    get yValueAsString() { 
        const yBenchMark = document.documentElement.clientWidth < document.documentElement.clientHeight 
        ? document.documentElement.clientWidth
        : document.documentElement.clientHeight;
        return -(this.yValue + ((-yBenchMark) / 2))+ 'px';
    }

    get focusedSprite( ) {
        return globals.GAME.FRONT.allSprites.filter((e)=>{ return e.spriteId == this.focusSpriteId })[0]
    }

    setSpriteFocus( sprite, snapToSprite ) {
        this.focusSpriteId = sprite.spriteId;
        if ( snapToSprite ) {
            this.centerOnXY( sprite.centerX( ), sprite.baseY( ) );
        }
        else {
            this.initMoveToXY( sprite.centerX( ), sprite.baseY( ) )
        }
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
        this.lastFocusXy.x = newValue;
        document.getElementById("canvas-wrapper").style.left = this.xValueAsString;
    }

    updateYValue( newValue ) {
        this.yValue = newValue;
        this.lastFocusXy.y = newValue;
        document.getElementById("canvas-wrapper").style.top = this.yValueAsString;
    }

    initMoveToXY( x, y ) {
        this.movingToNewFocus = true;
        this.newFocusXy = { 'x': x, 'y': y };
    }

    centerOnXY( x, y, calcOffset = true ) {
        this.updateXValue( x );
        this.updateYValue( y  );
    }

    handleScreenFlip( xy, calcOffset = true ) {
        this.setBaseValues( );
        this.centerOnXY( xy.x, xy.y, calcOffset)
    }


    moveToNewFocus( ) {
        if ( this.focusedSprite == undefined ||  this.focusedSprite == null ) {
            this.movingToNewFocus = false;
            return;
        }
        this.newFocusXy = {
            'x': this.focusedSprite.centerX( ),
            'y': this.focusedSprite.baseY( )
        }
        let moveToX = this.lastFocusXy.x;
        let moveToY = this.lastFocusXy.y;
        if ( this.newFocusXy.x > moveToX ) {
            moveToX = (moveToX + globals.MOVEMENT_SPEED) > this.newFocusXy.x 
                ? this.newFocusXy.x
                : moveToX + globals.MOVEMENT_SPEED;
        }
        else if ( this.newFocusXy.x < moveToX ) {
            moveToX = (moveToX - globals.MOVEMENT_SPEED) < this.newFocusXy.x 
                ? this.newFocusXy.x
                : moveToX - globals.MOVEMENT_SPEED;
        }
        if ( this.newFocusXy.y > moveToY ) {
            moveToY = (moveToY + globals.MOVEMENT_SPEED) > this.newFocusXy.y 
                ? this.newFocusXy.y
                : moveToY + globals.MOVEMENT_SPEED;
        }
        else if ( this.newFocusXy.y < moveToY ) {
            moveToY = (moveToY - globals.MOVEMENT_SPEED) < this.newFocusXy.y 
                ? this.newFocusXy.y
                : moveToY - globals.MOVEMENT_SPEED;
        }
        this.centerOnXY( moveToX, moveToY );
        if ( moveToX == this.newFocusXy.x && moveToY == this.newFocusXy.y ) {
            this.movingToNewFocus = false;
            this.centerOnXY( this.focusedSprite.centerX( ), this.focusedSprite.baseY( ) );
        }
    }
}

module.exports = {
    CameraFocus
}