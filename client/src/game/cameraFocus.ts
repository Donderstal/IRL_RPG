import { CANVAS_WIDTH, CANVAS_HEIGHT, MOVEMENT_SPEED, GRID_BLOCK_PX } from '../game-data/globals';
import type { Sprite } from '../game/core/Sprite';
import type { Tile } from '../game/core/Tile';
import type { OutOfMapEnum } from '../enumerables/OutOfMapEnum';
import { DirectionEnum } from '../enumerables/DirectionEnum';

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
    movingToDirections: DirectionEnum[];
    constructor() {
        this.setBaseValues();

        this.xValue;
        this.yValue;

        this.movingToNewFocus = false;
        this.newFocusXy = { x: 0, y: 0 };
        this.lastFocusXy = { x: 0, y: 0 };
        this.mode = CameraFocusMode.followSprite

        this.setOffset()
        this.centerOnXY( this.startingXValue, this.startingYValue )
    }

    get cinematicMode(): boolean { return this.mode === CameraFocusMode.cinematic; }
    get followingSprite(): boolean { return this.mode === CameraFocusMode.followSprite; }

    get leftBorder(): number {
        return this.xValue - this.xOffset;
    }
    get topBorder(): number {
        return this.yValue - this.yOffset;
    }
    get rightBorder(): number {
        return this.leftBorder + this.screenWidth;
    }
    get downBorder(): number {
        return this.topBorder + this.screenHeight;
    }

    setOffset(): void {
        this.xOffset = ( document.documentElement.clientWidth / 2 );
        this.yOffset = ( document.documentElement.clientHeight / 2 );
    }

    setScreenDimensions(): void {
        this.screenWidth = document.documentElement.clientWidth;
        this.screenHeight = document.documentElement.clientHeight;
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
        this.setScreenDimensions();
        this.startingXValue = this.screenWidth / 2;
        this.startingYValue = this.screenHeight / 2;
    }

    updateXValue( newValue: number ): void {
        this.xValue = newValue;
        if ( this.lastFocusXy.x < this.xValue ) {
            this.movingToDirections.push( DirectionEnum.left );
        }
        if ( this.lastFocusXy.x > this.xValue ) {
            this.movingToDirections.push( DirectionEnum.right );
        }
        this.lastFocusXy.x = newValue;
    }

    updateYValue( newValue: number ): void {
        this.yValue = newValue;
        if ( this.lastFocusXy.y < this.yValue ) {
            this.movingToDirections.push( DirectionEnum.down );
        }
        if ( this.lastFocusXy.y > this.yValue ) {
            this.movingToDirections.push( DirectionEnum.up );
        }
        this.lastFocusXy.y = newValue;
    }

    initMoveToXY( x: number, y: number ): void  {
        this.movingToNewFocus = true;
        this.newFocusXy = { 'x': x, 'y': y };
    }

    centerOnXY( x: number, y: number ): void  {
        this.movingToDirections = [];
        this.updateXValue( x );
        this.updateYValue( y  );
    }

    handleScreenFlip( xy: { x: number; y: number } ): void {
        this.setBaseValues();
        this.setOffset();
        this.centerOnXY( xy.x, xy.y )
    }

    getSpriteXY( sprite: Sprite ): { x: number; y: number } {
        return { x: sprite.centerX, y: sprite.baseY }
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
        return x >= this.leftBorder && x <= ( this.leftBorder + this.screenWidth )
            && y >= this.topBorder && y <= ( this.topBorder + this.screenHeight );
    }
}

export let cameraFocus: CameraFocus = null;

export const initializeCameraFocus = () => {
    cameraFocus = new CameraFocus();
}