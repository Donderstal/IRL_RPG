import { GRID_BLOCK_PX } from "../../../game-data/globals";
import type { CanvasGrid } from "../../core/CanvasGrid";
import { Hitbox } from "../../core/Hitbox";
import type { Tile } from "../../core/Tile";

export class VisionBox extends Hitbox {
    previousArcX: number;
    previousArcY: number;
    constructor( x, y ) {
        super( x, y, GRID_BLOCK_PX * 2 );
        this.arcColor = "black"
        this.previousArcX = null;
        this.previousArcY = null;
    }

    get radiusWithMargin() { return this.radius }

    clearArc( ): void {
        //const context = getFrontgridCanvasContext();
        //context.globalCompositeOperation = 'destination-out'
        //context.beginPath();
        //context.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
        //context.globalAlpha = 0.7;
        //context.fill();
        //context.globalAlpha = 1;
        //context.closePath();
        //context.globalCompositeOperation = 'source-over'
    }

    getFrontGridTilesInArc( frontGrid: CanvasGrid ): Tile[] {
        const tilesInRangeArray = [];
        for( let x = this.x - this.radius; x <= this.x + this.radius; x += GRID_BLOCK_PX ) {
            for( let y = this.y - this.radius; y <= this.y + this.radius; y += GRID_BLOCK_PX ) {
                const tile = frontGrid.getTileAtXY( x, y );
                if ( !tile.isEmpty ) {
                    tilesInRangeArray.push(tile);
                }
            }
        }
        return tilesInRangeArray;
    }
}