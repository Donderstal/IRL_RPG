import { SceneAnimationType } from "../enumerables/SceneAnimationTypeEnum"
import { CANVAS_HEIGHT, CANVAS_WIDTH, GRID_BLOCK_PX, LARGE_FONT_LINE_HEIGHT, LARGE_FONT_SIZE, MAX_BUBBLE_WIDTH, SMALL_FONT_LINE_HEIGHT } from "../game-data/globals";
import type { SceneAnimationModel, SpeakScene, SpeakYesNoScene } from "../models/SceneAnimationModel"
import { breakTextIntoLines } from "./canvasHelpers";
import { mobileAgent } from "./screenOrientation";

export const getStandardBubbleDimensions = ( contentModel: SceneAnimationModel, type: SceneAnimationType ): { width: number, height: number } => {
    let content = type === SceneAnimationType.speak ? contentModel as SpeakScene : contentModel as SpeakYesNoScene;
    const text = breakTextIntoLines( content.text, LARGE_FONT_SIZE )
    const textHeightAcc = text.length * LARGE_FONT_LINE_HEIGHT + ( content.spriteName !== undefined ? SMALL_FONT_LINE_HEIGHT : 0 );
    return {
        width: MAX_BUBBLE_WIDTH,
        height: ( Math.ceil( textHeightAcc / GRID_BLOCK_PX ) * GRID_BLOCK_PX < GRID_BLOCK_PX * 2 ) ? GRID_BLOCK_PX * 2 : Math.ceil( textHeightAcc / GRID_BLOCK_PX ) * GRID_BLOCK_PX
    }
}
export const getSubtitleBubbleDimensions = ( ): { width: number, height: number } => {
    return { width: mobileAgent ? GRID_BLOCK_PX * 8 : CANVAS_WIDTH / 2, height: GRID_BLOCK_PX }
}
export const getCenterBubbleDimensions = ( ): { width: number, height: number } => {
    return { width: mobileAgent ? GRID_BLOCK_PX * 12 : CANVAS_WIDTH / 2, height: GRID_BLOCK_PX * 2 }
}

export const getStandardBubbleXy = ( ): { x: number, y: number } => {
    const speechBubbleCanvasWidth = mobileAgent ? GRID_BLOCK_PX * 12 : CANVAS_WIDTH;
    return {
        x: ( speechBubbleCanvasWidth - MAX_BUBBLE_WIDTH ) / 2,
        y: mobileAgent ? 0 : GRID_BLOCK_PX / 2
    };
}
export const getSubtitleBubbleXy = ( ): { x: number, y: number } => {
    return {
        x: mobileAgent ? GRID_BLOCK_PX * 2 : CANVAS_WIDTH / 4,
        y: mobileAgent ? screen.height : CANVAS_HEIGHT
    };
}
export const getCenterBubbleXy = ( dimensions: { width: number, height: number } ): { x: number, y: number } => {
    const speechBubbleCanvasWidth = mobileAgent ? GRID_BLOCK_PX * 12 : CANVAS_WIDTH;
    const speechBubbleCanvasHeight = mobileAgent ? GRID_BLOCK_PX * 8 : CANVAS_HEIGHT;
    return {
        x: ( speechBubbleCanvasWidth / 2 ) - ( dimensions.width / 2 ),
        y: ( mobileAgent ? 0 : ( GRID_BLOCK_PX * 2 ) - ( dimensions.height / 2 ) ) 
    };
}