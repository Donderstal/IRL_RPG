import { getBackSpritesGrid } from '../game/canvas/canvasGetter';

export const drawFromImageToCanvas = (
    image: HTMLImageElement,
    imageX: number, imageY: number,
    widthInImage: number, heightInImage: number,
    canvasX: number, canvasY: number,
    widthInCanvas: number, heightInCanvas: number
): void => {
    const ctx = getBackSpritesGrid().ctx;
    ctx.drawImage(
        image,
        imageX, imageY,
        widthInImage, heightInImage,
        canvasX, canvasY,
        widthInCanvas, heightInCanvas
    )
}

export const setFont = ( size: number, ctx: OffscreenCanvasRenderingContext2D = getBackSpritesGrid().ctx ): void => {
    ctx.font = size + "px " + 'PFRondaSeven';
}

export const drawRect = ( canvas: OffscreenCanvas, x: number, y: number, width: number, height: number, color: string = null ): void => {
    const ctx = canvas.getContext( '2d', { alpha: false } );
    ctx.fillStyle = (color !== null) ? color : "white"
    ctx.fillRect( x, y, width, height );
}

export const writeTextLine = ( text: string, x: number, y: number, size: number, ctx = getBackSpritesGrid().ctx, color = "black" ): void => {
    setFont( size, ctx );
    ctx.fillStyle = color;
    ctx.fillText( text, x, y );
}