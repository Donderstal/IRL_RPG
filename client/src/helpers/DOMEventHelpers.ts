import { cameraFocus } from "../game/cameraFocus";
import { setFaderCanvas } from "./faderModule";
import { closeWebsite, openWebsite } from "../stores"
import { getPlayer } from "../game/modules/sprites/spriteGetter";
import { setRenderCanvasesDimensions } from "../game/canvas/canvasSetter";
import { isNullOrUndefined } from "./utilFunctions";

export const showGameCanvas = () => {
    closeWebsite();
}
export const hideGameCanvas = () => {
    openWebsite();
}
export const openGameCanvas = ( ) => {
    setFullscreen();
    setGameCanvasDimensions();
    if ( !screen.orientation.type.includes( "landscape" ) ) {
        const player = getPlayer();
        screen.orientation.lock( "landscape" ).then(
            () => {
                let x = isNullOrUndefined( player ) ? screen.width / 2 : player.centerX;
                let y = isNullOrUndefined( player ) ? screen.height / 2 : player.baseY;
                setGameCanvasDimensions();
                focusCameraOnFlip( { x: x, y: y } );
            }
        );
    }
}
export const closeGameCanvas = () => {
    screen.orientation.lock( "portrait" ).then(
        () => { screen.orientation.unlock(); }
    );
    unsetFullscreen();
    hideGameCanvas();
}

const setFullscreen = (): Promise<void> => {
    return document.getElementById( 'app-div' ).requestFullscreen();
}
const unsetFullscreen = () => {
    document.exitFullscreen();
}
const setGameCanvasDimensions = () => {
    setRenderCanvasesDimensions( cameraFocus.screenWidth, cameraFocus.screenHeight );
    setFaderCanvas( cameraFocus.screenWidth, cameraFocus.screenHeight );
}
const focusCameraOnFlip = ( focusXy: { x: number, y: number } ) => {
    cameraFocus.handleScreenFlip( focusXy );
}
