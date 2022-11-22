import { getUiImage } from '../../assets/ui';
import { GRID_BLOCK_PX, GRID_BLOCK_IN_SHEET_PX } from '../../game-data/globals';
import { mobileAgent } from '../../helpers/screenOrientation';

export const drawBubblePart = ( name: string, tile: { x: number, y: number }, ctx: OffscreenCanvasRenderingContext2D ): void => {
    ctx.drawImage(
        getUiImage(name),
        0, 0,
        GRID_BLOCK_IN_SHEET_PX, GRID_BLOCK_IN_SHEET_PX,
        tile.x, tile.y, 
        GRID_BLOCK_PX, GRID_BLOCK_PX
    );
}

export const getTabXPosition = ( index: number, activeIndex: number ) => {
    if ( mobileAgent ) {
        return 0;
    }
    return ( index * ( 4 * GRID_BLOCK_PX ) ) + ( ( activeIndex < index ) ? 8 * GRID_BLOCK_PX : 0 * GRID_BLOCK_PX );
}
