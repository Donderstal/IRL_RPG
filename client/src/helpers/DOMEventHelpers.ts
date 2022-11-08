import { cameraFocus } from "../game/cameraFocus";
import { setDOMCanvasDimensions } from "../game/controllers/gridCanvasController";
import { setFaderCanvas } from "./Fader";
import { closeWebsite, openWebsite } from "../game-container/stores"
import { getPlayer } from "../game/controllers/spriteController";

const setFullscreen = (): Promise<void> => {
    return document.getElementById( 'app-div' ).requestFullscreen();
}

const unsetFullscreen = () => {
    document.exitFullscreen();
}

const setGameCanvasDimensions = () => {
    setDOMCanvasDimensions();
    setFaderCanvas();
}

const focusCameraOnFlip = ( focusXy: { x: number, y: number } ) => {
    cameraFocus.handleScreenFlip( focusXy );
}

export const showGameCanvas = () => {
    closeWebsite();
}

export const hideGameCanvas = () => {
    openWebsite();
}

export const openGameCanvas = ( ) => {
    setFullscreen();
    if ( !screen.orientation.type.includes( "landscape" ) ) {
        const player = getPlayer();
        screen.orientation.lock( "landscape" ).then(
            () => {
                let x = player === null || player === undefined ? screen.width / 2 : player.centerX;
                let y = player === null || player === undefined ? screen.height / 2 : player.baseY;
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