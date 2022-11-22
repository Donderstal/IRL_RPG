import { BATTLE_FONT_LINE_HEIGHT, BATTLE_FONT_SIZE, LARGE_FONT_SIZE } from "../game-data/globals";
import { COLOR_WHITE } from "../game-data/uiGlobals";
import { TypeWriter } from "../helpers/TypeWriter";
import { getDOMContext, getPreRenderCanvas, getPreRenderContext } from "./canvas/canvasGetter";

const rootElement = document.documentElement;
const width = rootElement.clientWidth > rootElement.clientHeight ? rootElement.clientWidth : rootElement.clientHeight;
const height = rootElement.clientWidth > rootElement.clientHeight ? rootElement.clientHeight : rootElement.clientWidth;

const canvas: OffscreenCanvas = new OffscreenCanvas( width, height );
const canvasContext: OffscreenCanvasRenderingContext2D = canvas.getContext( "2d" );
canvasContext.font = BATTLE_FONT_SIZE + "px " + "Stormfaze";

const randomTextArray = [
    "Explaining relativity to kindergartners...",
    "Overthinking something I did five years ago...",
    "Researching the future...",
    "Drilling elite Llama battle division...",
    "Paving streets as slowly as possible...",
    "Blaming personal problems on my parents...",
    "Replacing developers with interns...",
    "Paying artists in exposure...",
    "Taxing waiters more than billionaires...",
    "Redeveloping public housing as luxury condos...",
    "Press space to interact with characters and objects..."
]
const mainText = "Loading...";
const mainTextWidth = canvasContext.measureText( mainText ).width;

let typeWriter: TypeWriter = null;
let loaderTimeout;
let currentLoadingScreenText;
let activeTextWidth;

const activeText = (): string => { return typeWriter.activeText.map( ( e ) => { return e.activeWord; } ).join( '' ) };
const availableTextLines = (): string[] => { return randomTextArray.filter( ( e ) => { return e !== currentLoadingScreenText } ) };

export const handleLoadingScreenText = (): void => {
    if ( typeWriter === null || !typeWriter.isWriting ) {
        getNewLoadingScreenText();
        typeWriter = new TypeWriter( currentLoadingScreenText + "          " );
        canvasContext.font = LARGE_FONT_SIZE + "px " + "Stormfaze";
        activeTextWidth = canvasContext.measureText( currentLoadingScreenText ).width;
    }
    else {
        typeWriter.write();
    }
}

export const getNewLoadingScreenText = (): void => {
    const lines = availableTextLines();
    currentLoadingScreenText = lines[Math.floor( Math.random() * lines.length )];
}

export const drawLoadingScreen = (): void => {
    canvasContext.clearRect( 0, 0, width, height )

    canvasContext.fillStyle = COLOR_WHITE;
    canvasContext.font = BATTLE_FONT_SIZE + "px " + "Stormfaze";
    canvasContext.fillText( mainText, ( width / 2 ) - ( mainTextWidth / 2 ), height / 2 );
    canvasContext.font = LARGE_FONT_SIZE + "px " + "Stormfaze";
    if ( typeWriter !== null ) {
        canvasContext.fillText( activeText(), ( width / 2 ) - ( activeTextWidth / 2 ), ( height / 2 ) + BATTLE_FONT_LINE_HEIGHT );
	}

    handleLoadingScreenText();
}

export const clearLoadingScreen = (): void => {
    canvasContext.clearRect( 0, 0, width, height )
}

const drawLoadingScreenRecursive = (): void => {
    const DOMContext = getDOMContext();
    const preRenderCanvas = getPreRenderCanvas();
    const preRenderContext = getPreRenderContext()
    DOMContext.clearRect( 0, 0, preRenderCanvas.width, preRenderCanvas.height );
    preRenderContext.clearRect( 0, 0, preRenderCanvas.width, preRenderCanvas.height );
    drawLoadingScreen();
    loaderTimeout = setTimeout( drawLoadingScreenRecursive, 50 )
    preRenderContext.drawImage( canvas, 0, 0 );
    DOMContext.drawImage( preRenderCanvas, 0, 0 )
}

export const setLoadingScreen = (): void => {
    drawLoadingScreenRecursive();
}

export const stopLoadingScreen = (): void => {
    clearTimeout( loaderTimeout );
    clearLoadingScreen();
} 