import { CanvasTypeEnum } from "../../enumerables/CanvasTypeEnum"
import type { GridCellModel } from "../../models/GridCellModel";
import type { Tile } from "../core/Tile";
import type { BackSpriteGrid } from "./BackSpriteGrid";
import type { BackTileGrid } from "./BackTileGrid";
import { getCanvasFromRegistry, getDOMCanvasFromRegistry, getDOMContextFromRegistry, getPreRenderCanvasFromRegistry, getPreRenderContextFromRegistry } from "./canvasRegistry"
import type { FrontTileGrid } from "./FrontTileGrid";
import type { MenuCanvas } from "./MenuCanvas";
import type { SpeechBubbleCanvas } from "./SpeechBubbleCanvas";

// CanvasGrid class extensions
export const getBackTilesGrid = (): BackTileGrid => {
    return getCanvasFromRegistry( CanvasTypeEnum.background ) as BackTileGrid;
}
export const getBackSpritesGrid = (): BackSpriteGrid => {
    return getCanvasFromRegistry( CanvasTypeEnum.backSprites ) as BackSpriteGrid;
}
export const getFrontTilesGrid = (): FrontTileGrid => {
    return getCanvasFromRegistry( CanvasTypeEnum.foreground ) as FrontTileGrid;
}
export const getMenuGrid = (): MenuCanvas => {
    return getCanvasFromRegistry( CanvasTypeEnum.overview ) as MenuCanvas;
}
export const getSpeechBubbleGrid = (): SpeechBubbleCanvas => {
    return getCanvasFromRegistry( CanvasTypeEnum.speechBubbleCanvas ) as SpeechBubbleCanvas;
}

// rendering canvas elements
export const getPreRenderCanvas = (): OffscreenCanvas => {
    return getPreRenderCanvasFromRegistry();
}
export const getPreRenderContext = (): OffscreenCanvasRenderingContext2D => {
    return getPreRenderContextFromRegistry();
}
export const getDOMCanvas = (): HTMLCanvasElement => {
    return getDOMCanvasFromRegistry();
}
export const getDOMContext = (): CanvasRenderingContext2D => {
    return getDOMContextFromRegistry();
}

// gridcanvas tile getter
export const getTileOnCanvasByIndex = ( index: number, canvasType: CanvasTypeEnum ): Tile => {
    const canvas = getCanvasFromRegistry( canvasType );
    return canvas.getTileAtIndex( index );
};
export const getTileOnCanvasByCell = ( cell: GridCellModel, canvasType: CanvasTypeEnum ): Tile => {
    const canvas = getCanvasFromRegistry( canvasType );
    return canvas.getTileAtCell( cell.column, cell.row );
};
export const getTileOnCanvasByXy = ( xy: { x: number, y: number }, canvasType: CanvasTypeEnum ): Tile => {
    const canvas = getCanvasFromRegistry( canvasType );
    return canvas.getTileAtXY( xy.x, xy.y );
};