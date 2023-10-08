import { actionButtonKey } from "../controls/controlConstants";
import { DirectionEnum } from "../enumerables/DirectionEnum";
import { getSpeechBubbleGrid } from "../game/canvas/canvasGetter";
import { centerTextBubbleIsActive, drawCenterBubble, initializeCenterBubbleCanvas } from "./centerBubble";
import { drawEmotes, emotesAreActive } from "./emote";
import { drawMultiSelectBubble, initializeMultiSelectBubbleCanvas, multiSelectBubbleIsActive, scrollThroughMultiSelectOptions, selectActiveMultiSelectOption } from "./multiSelectBubble";
import { drawScreenText, handleScreenTextActionButton, initializeScreenTextCanvas, screenTextIsActive } from "./screenText";
import { drawSpeechBubble, handleSpeechBubbleActionButton, initializeSpeechBubbleCanvas, speechBubbleIsActive } from "./speechBubble";
import { drawSubtitleBubble, initializeSubtitleBubbleCanvas, subtitleBubbleIsActive } from "./subtitleBubble";

export const initializeBubbleCanvases = ( width: number, height: number ): void => {
    initializeSpeechBubbleCanvas();
    initializeCenterBubbleCanvas();
    initializeSubtitleBubbleCanvas();
    initializeMultiSelectBubbleCanvas();
    initializeScreenTextCanvas( width, height );
}
export const handleCutsceneText = ( activeControls: any[] ): void => {
    if ( activeControls.includes( actionButtonKey ) ) {
        handleActionButton();
    }
    if ( activeControls.includes( DirectionEnum.up ) ) {
        scrollThroughMultiSelectOptions( true )
    }
    if ( activeControls.includes( DirectionEnum.down ) ) {
        scrollThroughMultiSelectOptions( false )
    }
}
export const drawActiveText = (): void => {
    const canvas = getSpeechBubbleGrid().canvas;
    const context = canvas.getContext( "2d" );
    context.clearRect( 0, 0, canvas.width, canvas.height );

    drawCenterBubble( context );
    drawEmotes();
    drawMultiSelectBubble( context );
    drawScreenText( context );
    drawSpeechBubble( context ); 
    drawSubtitleBubble( context );
}
export const textBubblesAreActive = (): boolean => {
    return centerTextBubbleIsActive()
        || emotesAreActive()
        || multiSelectBubbleIsActive()
        || screenTextIsActive()
        || speechBubbleIsActive()
        || subtitleBubbleIsActive();
}
const handleActionButton = (): void => {
    handleSpeechBubbleActionButton();
    selectActiveMultiSelectOption();
    handleScreenTextActionButton();
}