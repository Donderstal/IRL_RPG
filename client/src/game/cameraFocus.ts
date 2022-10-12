import { CANVAS_WIDTH, CANVAS_HEIGHT, MOVEMENT_SPEED, GRID_BLOCK_PX } from '../game-data/globals';
import type { Sprite } from '../game/core/Sprite';
import type { Tile } from '../game/core/Tile';
import type { OutOfMapEnum } from '../enumerables/OutOfMapEnum';

enum CameraFocusMode {
    followSprite,
    cinematic
}

export class CameraFocus {
    xValue: number;
    yValue: number;
    xOffset: number;
    yOffset: number;
    screenWidth: number;
    screenHeight: number;
    startingXValue: number;
    startingYValue: number;

    movingToNewFocus: boolean;
    focusSpriteId: string;
    focusTileId: number | OutOfMapEnum;
    newFocusXy: { x: number; y: number }
    lastFocusXy: { x: number; y: number }
    mode: CameraFocusMode;
    constructor() {
        this.setBaseValues();

        this.xValue;
        this.yValue;

        this.movingToNewFocus = false;
        this.newFocusXy = { x: 0, y: 0 };
        this.lastFocusXy = { x: 0, y: 0 };
        this.mode = CameraFocusMode.followSprite

        this.setOffset()
        this.updateXValue( this.startingXValue );
        this.updateYValue( this.startingYValue );
    }

    get cinematicMode(): boolean { return this.mode === CameraFocusMode.cinematic; }
    get followingSprite(): boolean { return this.mode === CameraFocusMode.followSprite; }
    get offsettedXValue(): number {
        return this.xValue + -this.xOffset
    }
    get offsettedYValue(): number {
        return this.yValue + -this.yOffset
    }
    get xValueAsString(): string { 
        return -this.offsettedXValue + 'px';
    }
    get yValueAsString(): string { 
        return -this.offsettedYValue + 'px';
    }

    setOffset(): void {
        this.xOffset = ( document.documentElement.clientWidth > document.documentElement.clientHeight
            ? document.documentElement.clientWidth
            : document.documentElement.clientHeight ) / 2;
        this.yOffset = ( document.documentElement.clientWidth < document.documentElement.clientHeight
            ? document.documentElement.clientWidth
            : document.documentElement.clientHeight ) / 2;
    }

    setScreenDimensions(): void {
        this.screenWidth = window.innerWidth;
        this.screenHeight = window.innerHeight;
    }

    isFocusedOnSprite( spriteId: string ): boolean {
        return this.focusSpriteId === spriteId && !cameraFocus.movingToNewFocus;
    }

    isFocusedOnTile( tileIndex: number ): boolean {
        return this.focusTileId === tileIndex && !cameraFocus.movingToNewFocus;
    }

    setSpriteFocus( sprite: Sprite, snapToSprite: boolean ): void {
        this.unsetTileFocus( );
        this.focusSpriteId = sprite.spriteId;
        if ( snapToSprite ) {
            this.centerOnXY( sprite.centerX, sprite.baseY );
        }
        else {
            this.initMoveToXY( sprite.centerX, sprite.baseY )
        }
    }

    setTileFocus( tile: Tile, snapToTile: boolean ): void {
        this.unsetSpriteFocus( );
        this.focusTileId = tile.index;
        if ( snapToTile ) {
            this.centerOnXY( tile.x, tile.y );
        }
        else {
            this.initMoveToXY( tile.x, tile.y );
        }
    }

    unsetSpriteFocus(): void {
        this.focusSpriteId = null;
    }

    unsetTileFocus(): void {
        this.focusTileId = null;
    }

    setBaseValues(): void {
        this.startingXValue = (CANVAS_WIDTH - document.documentElement.clientWidth) / 2;
        this.startingYValue = (CANVAS_HEIGHT - document.documentElement.clientHeight) / 2;
    }

    updateXValue( newValue: number ): void {
        this.xValue = newValue;
        this.lastFocusXy.x = newValue;
        document.getElementById("canvas-wrapper").style.left = this.xValueAsString;
    }

    updateYValue( newValue: number ): void {
        this.yValue = newValue;
        this.lastFocusXy.y = newValue;
        document.getElementById("canvas-wrapper").style.top = this.yValueAsString;
    }

    initMoveToXY( x: number, y: number ): void  {
        this.movingToNewFocus = true;
        this.newFocusXy = { 'x': x, 'y': y };
    }

    centerOnXY( x: number, y: number ): void  {
        this.updateXValue( x );
        this.updateYValue( y  );
    }

    handleScreenFlip( xy: { x: number; y: number } ): void {
        this.setBaseValues();
        this.setOffset();
        this.setScreenDimensions();
        this.centerOnXY( xy.x, xy.y )
    }

    getSpriteXY( sprite: Sprite ): { x: number; y: number } {
        return {
            x: sprite.centerX,
            y: sprite.baseY
        }
    }

    moveToNewFocus( sprite: Sprite ): void {
        if ( ( sprite == undefined || sprite == null ) && sprite !== null ) {
            this.movingToNewFocus = false;
            return;
        }
        this.newFocusXy = this.focusSpriteId !== null ? this.getSpriteXY( sprite ) : this.newFocusXy;
        let moveToX = this.lastFocusXy.x;
        let moveToY = this.lastFocusXy.y;
        if ( this.newFocusXy.x > moveToX ) {
            moveToX = (moveToX + MOVEMENT_SPEED) > this.newFocusXy.x 
                ? this.newFocusXy.x
                : moveToX + MOVEMENT_SPEED;
        }
        else if ( this.newFocusXy.x < moveToX ) {
            moveToX = (moveToX - MOVEMENT_SPEED) < this.newFocusXy.x 
                ? this.newFocusXy.x
                : moveToX - MOVEMENT_SPEED;
        }
        if ( this.newFocusXy.y > moveToY ) {
            moveToY = (moveToY + MOVEMENT_SPEED) > this.newFocusXy.y 
                ? this.newFocusXy.y
                : moveToY + MOVEMENT_SPEED;
        }
        else if ( this.newFocusXy.y < moveToY ) {
            moveToY = (moveToY - MOVEMENT_SPEED) < this.newFocusXy.y 
                ? this.newFocusXy.y
                : moveToY - MOVEMENT_SPEED;
        }
        this.centerOnXY( moveToX, moveToY );
        if ( moveToX == this.newFocusXy.x && moveToY == this.newFocusXy.y ) {
            this.movingToNewFocus = false;
            this.centerOnXY( this.newFocusXy.x, this.newFocusXy.y );
        }
    }

    xyValueIsInView( x: number, y: number ): boolean {
        const viewMargin = GRID_BLOCK_PX * 2;
        return x + viewMargin >= this.offsettedXValue && x - viewMargin <= ( this.offsettedXValue + this.screenWidth )
            && y + viewMargin >= this.offsettedYValue && y - viewMargin <= ( this.offsettedYValue + this.screenHeight );
    }
}

export let cameraFocus: CameraFocus = null;

export const initializeCameraFocus = () => {
    cameraFocus = new CameraFocus();
}