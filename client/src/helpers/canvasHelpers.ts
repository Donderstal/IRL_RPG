import globals, { MAX_BUBBLE_TEXT_WIDTH } from '../game-data/globals';


export const getBubbleCanvasContext = (): CanvasRenderingContext2D => {
    return (document.getElementById('game-bubble-canvas') as HTMLCanvasElement).getContext('2d');
}

export const getMenuCanvasContext = (): CanvasRenderingContext2D => {
    return (document.getElementById( 'game-menu-canvas' ) as HTMLCanvasElement).getContext('2d');
}

export const getFrontCanvasContext = (): OffscreenCanvasRenderingContext2D => {
    return globals.GAME.FRONT.canvas.getContext( '2d' );
}

export const drawFromImageToCanvas = (
    image: HTMLImageElement,
    imageX: number, imageY: number,
    widthInImage: number, heightInImage: number,
    canvasX: number, canvasY: number,
    widthInCanvas: number, heightInCanvas: number
): void => {
    const ctx = getFrontCanvasContext();
    ctx.drawImage(
        image,
        imageX, imageY,
        widthInImage, heightInImage,
        canvasX, canvasY,
        widthInCanvas, heightInCanvas
    )
}

export const setFont = ( size: number, ctx: OffscreenCanvasRenderingContext2D = getFrontCanvasContext() ): void => {
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

export const drawRect = ( canvas: HTMLCanvasElement, x: number, y: number, width: number, height: number, color: string = null ): void => {
    const ctx = canvas.getContext( '2d' );
    ctx.fillStyle = (color !== null) ? color : "white"
    ctx.fillRect( x, y, width, height );
}

export const writeTextLine = ( text: string, x: number, y: number, size: number, ctx = getFrontCanvasContext(), color = "black" ): void => {
    setFont( size, ctx );
    ctx.fillStyle = color;
    ctx.fillText( text, x, y );
}