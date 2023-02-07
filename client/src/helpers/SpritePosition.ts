import { GRID_BLOCK_PX } from "../game-data/globals";

export class SpritePosition {
    x: number;
    y: number;
    width: number;
    height: number;
    isStanding: boolean;
    isCar: boolean;

    top: number;
    left: number;
    bottom: number;
    right: number;

    baseY: number;
    centerX: number;
    dynamicTop: number;
    constructor( x, y, width, height, standing, isCar ) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.isStanding = standing;
        this.isCar = isCar

        this.top = this.y;
        this.left = this.x;
        this.bottom = this.y + this.height;
        this.right = this.x + this.width;

        this.baseY = this.bottom - ( GRID_BLOCK_PX / 2 );
        this.centerX = this.x + ( this.width / 2 );
        this.dynamicTop = this.isStanding
            ? this.bottom - GRID_BLOCK_PX
            : this.top + GRID_BLOCK_PX;
    }
}