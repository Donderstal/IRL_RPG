import globals, { CANVAS_HEIGHT, CANVAS_WIDTH } from '../game-data/globals';
import { MAX_BUBBLE_TEXT_WIDTH } from '../game-data/globals';

export const getBubbleCanvasContext = (): CanvasRenderingContext2D => {
    return (document.getElementById('game-bubble-canvas') as HTMLCanvasElement).getContext('2d');
}

export const getMenuCanvasContext = (): CanvasRenderingContext2D => {
    return (document.getElementById( 'game-menu-canvas' ) as HTMLCanvasElement).getContext('2d');
}

export const getFrontgridCanvasContext = (): CanvasRenderingContext2D => {
    return (document.getElementById( 'game-front-grid-canvas' ) as HTMLCanvasElement).getContext('2d');
}

export const getFrontCanvasContext = (): CanvasRenderingContext2D => {
    return ( document.getElementById( 'game-front-canvas' ) as HTMLCanvasElement).getContext('2d');
}

export const getBackCanvasContext = (): CanvasRenderingContext2D => {
    return ( document.getElementById( 'game-background-canvas' ) as HTMLCanvasElement).getContext('2d');
}

export const drawFromImageToCanvas = (
    canvas: string,
    image: HTMLImageElement, 
    imageX: number, imageY: number, 
    widthInImage: number, heightInImage: number,
    canvasX: number, canvasY: number,
    widthInCanvas: number, heightInCanvas: number
): void => {
    const ctx = canvas === "BACK" ? globals.GAME.back.ctx : globals.GAME.front.ctx  
    ctx.drawImage(
        image, 
        imageX, imageY, 
        widthInImage, heightInImage,
        canvasX, canvasY,
        widthInCanvas, heightInCanvas 
    )
}

export const setFont = ( size: number, ctx: CanvasRenderingContext2D = getFrontCanvasContext() ): void => {
    ctx.font = size + "px " + 'PFRondaSeven';
}

export const breakTextIntoLines = ( text: string, fontSize: number ): string[] => {
    const ctx = getFrontCanvasContext() 
    setFont(fontSize)
    if ( ctx.measureText( text ).width > MAX_BUBBLE_TEXT_WIDTH ) {
        const textArray         = text.split(' ');
        let currentLineWidth    = 0;
        let textLine            = "";
        const textLineArray       = [ ];

        for ( let i = 0; i < textArray.length; i++ ) {
            setFont(fontSize);
            const newWord = textArray[i] + " ";
            const wordOverflowsTextbox = currentLineWidth + ctx.measureText(newWord + " ").width > MAX_BUBBLE_TEXT_WIDTH;
            const lastWordIsNext = i === textArray.length - 1;

            if ( wordOverflowsTextbox ) {
                textLineArray.push( textLine )
                textLine = newWord
                currentLineWidth = 0
                if ( lastWordIsNext ) {
                    textLineArray.push(textLine)
                }
            }
            else {
                currentLineWidth += ctx.measureText(newWord).width
                textLine += newWord
                if ( lastWordIsNext ) {
                    textLineArray.push(textLine)
                }
            }
        }  
        return textLineArray      
    }

    return [ text ]
}

export const drawRect = ( canvas: string, x: number, y: number, width: number, height: number, color: string = null ): void => {
    const ctx = canvas === "BACK"
        ? getBackCanvasContext()
        : ( canvas === "FRONT"
            ? getFrontCanvasContext()
            : ( document.getElementById( 'game-fader-canvas' ) as HTMLCanvasElement ).getContext( '2d' ) )
    ctx.fillStyle = (color !== null) ? color : "white"
    ctx.fillRect( x, y, width, height );
}

export const writeTextLine = ( text: string, x: number, y: number, size: number, ctx = getFrontCanvasContext(), color = "black" ): void => {
    setFont( size, ctx );
    ctx.fillStyle = color;
    ctx.fillText( text, x, y );
}

export const clearEntireCanvas = ( canvas: string ): void => {
    let ctx = canvas === "BACK"
        ? getBackCanvasContext()
        : ( canvas === "FRONT"
            ? getFrontCanvasContext()
            : getFrontgridCanvasContext() );       
    switch(canvas) {
        case "BACK":
            ctx = getBackCanvasContext();
            break;
        case "FRONT":
            ctx = getFrontCanvasContext();
            break;
        case "FRONT_GRID":
            ctx = getFrontgridCanvasContext();
            break;
        case "SPEECH":
            ctx = getBubbleCanvasContext();
            break;
    } 
    ctx.clearRect( 
        0, 0,
        CANVAS_WIDTH, CANVAS_HEIGHT
    )
}