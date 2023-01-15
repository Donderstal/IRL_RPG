import { CanvasTypeEnum } from "../../enumerables/CanvasTypeEnum";
import {
    addBackSpriteGridToRegistry, addBackTileGridToRegistry, addFrontTileGridToRegistry, addMenuGridToRegistry, addSpeechBubbleGridToRegistry,
    clearCanvasInRegistry, clearMapFromRegistryGrid, initializeRenderCanvasesInRegistry, setRegistryCanvasGridDimensions
} from "./canvasRegistry";
import { BackSpriteGrid } from "./BackSpriteGrid";
import { BackTileGrid } from "./BackTileGrid";
import { FrontTileGrid } from "./FrontTileGrid";
import { MenuCanvas } from "./MenuCanvas";
import { SpeechBubbleCanvas } from "./SpeechBubbleCanvas";
import { BUBBLE_CANVAS_HEIGHT, BUBBLE_CANVAS_WIDTH, CANVAS_HEIGHT, CANVAS_WIDTH, GRID_BLOCK_PX } from "../../game-data/globals";

export const clearCanvasGridMaps = (): void => {
    clearMapFromRegistryGrid( CanvasTypeEnum.background );
    clearMapFromRegistryGrid( CanvasTypeEnum.backSprites );
    clearMapFromRegistryGrid( CanvasTypeEnum.foreground );
}
export const clearCanvasGrids = (): void => {
    clearCanvasInRegistry( CanvasTypeEnum.background );
    clearCanvasInRegistry( CanvasTypeEnum.backSprites );
    clearCanvasInRegistry( CanvasTypeEnum.foreground );

}
export const clearUICanvasGrids = (): void => {
    clearCanvasInRegistry( CanvasTypeEnum.overview );
    clearCanvasInRegistry( CanvasTypeEnum.speechBubbleCanvas );
}
export const clearRenderCanvases = (): void => {
    clearCanvasInRegistry( CanvasTypeEnum.DOM );
    clearCanvasInRegistry( CanvasTypeEnum.preRender );
}
export const clearSpriteCanvasGrids = (): void => {
    clearCanvasInRegistry( CanvasTypeEnum.backSprites );
}
export const setCanvasGridsDimensions = ( width: number, height: number ): void => {
    setRegistryCanvasGridDimensions( CanvasTypeEnum.background, width, height );
    setRegistryCanvasGridDimensions( CanvasTypeEnum.backSprites, width, height );
    setRegistryCanvasGridDimensions( CanvasTypeEnum.foreground, width, height );
}
export const setRenderCanvasesDimensions = ( width: number, height: number ): void => {
    setRegistryCanvasGridDimensions( CanvasTypeEnum.preRender, width, height );
    setRegistryCanvasGridDimensions( CanvasTypeEnum.DOM, width, height );
}
export const prepareCanvasElementsForGame = ( screenWidth: number, screenHeight: number, playingOnPhone: boolean) => {
    initializeMapGridCanvases();
    initializeUiCanvasGrids( playingOnPhone );
    initializeRenderCanvasElements( screenWidth, screenHeight );
}
export const clearAllCanvasElements = () => {
    clearCanvasGrids()
    clearUICanvasGrids()
    clearRenderCanvases
}

const initializeMapGridCanvases = () => {
    const backTiles = new BackTileGrid( 0, 0, new OffscreenCanvas( CANVAS_WIDTH, CANVAS_HEIGHT ), CanvasTypeEnum.background );
    const backSprites = new BackSpriteGrid( 0, 0, new OffscreenCanvas( CANVAS_WIDTH, CANVAS_HEIGHT ), CanvasTypeEnum.backSprites );
    const frontTiles = new FrontTileGrid( 0, 0, new OffscreenCanvas( CANVAS_WIDTH, CANVAS_HEIGHT ), CanvasTypeEnum.foreground );

    addBackTileGridToRegistry( backTiles );
    addBackSpriteGridToRegistry( backSprites );
    addFrontTileGridToRegistry( frontTiles );
}
const initializeUiCanvasGrids = ( playingOnPhone: boolean ) => {
    const menu = new MenuCanvas( 0, 0, new OffscreenCanvas(
        playingOnPhone ? GRID_BLOCK_PX * 8 : CANVAS_WIDTH, playingOnPhone ? GRID_BLOCK_PX * 8 : CANVAS_HEIGHT
    ), CanvasTypeEnum.overview );
    const speechBubble = new SpeechBubbleCanvas( 0, 0, new OffscreenCanvas( BUBBLE_CANVAS_WIDTH, BUBBLE_CANVAS_HEIGHT ), CanvasTypeEnum.speechBubbleCanvas );

    addMenuGridToRegistry( menu );
    addSpeechBubbleGridToRegistry( speechBubble );
}
const initializeRenderCanvasElements = ( screenWidth: number, screenHeight: number ) => {
    initializeRenderCanvasesInRegistry( screenWidth, screenHeight );
}