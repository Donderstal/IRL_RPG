import globals from '../../game-data/globals';
import { GRID_BLOCK_PX, GRID_BLOCK_IN_SHEET_PX } from '../../game-data/globals';

export const drawBubblePart = ( name: string, tile: { x: number, y: number }, ctx: CanvasRenderingContext2D ): void => {
    const pngs = globals.PNG_DICTIONARY;
    ctx.drawImage(
        pngs[name],
        0, 0,
        GRID_BLOCK_IN_SHEET_PX, GRID_BLOCK_IN_SHEET_PX,
        tile.x, tile.y, 
        GRID_BLOCK_PX, GRID_BLOCK_PX
    );
}

export const getTabXPosition = ( index: number, activeIndex: number ) => {
    if ( globals.SCREEN.MOBILE ) {
        return 0;
    }
    return ( index * ( 4 * GRID_BLOCK_PX ) ) + ( ( activeIndex < index ) ? 8 * GRID_BLOCK_PX : 0 * GRID_BLOCK_PX );
}
