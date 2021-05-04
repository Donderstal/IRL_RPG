const globals = require('../game-data/globals')
/**
 * Return the ctx of the Foreground canvas
 */
const getFrontCanvasContext = () => {
    let canv = document.getElementsByTagName('canvas')[1]
    let ctx = canv.getContext('2d')

    return ctx
}
/**
 * Return the ctx of the Background canvas
 */
const getBackCanvasContext = () => {
    let canv = document.getElementsByTagName('canvas')[0]
    let ctx = canv.getContext('2d')

    return ctx
}
/**
 * Shorthand for drawing from a image on a canvas at given xy.
 * @param {String} canvas String representing the Background or Foreground canvas
 * @param {Image} image HTML Image object containing source image
 * @param {Number} imageX x in the source image
 * @param {Number} imageY y in the source image
 * @param {Number} widthInImage width to select in source image
 * @param {Number} heightInImage height to select in source image
 * @param {Number} canvasX x in the destiniation canvas
 * @param {Number} canvasY x in the destiniation canvas
 * @param {Number} widthInCanvas width in the destiniation canvas
 * @param {Number} heightInCanvas height the destiniation canvas
 */
const drawFromImageToCanvas = ( 
        canvas,
        image, 
        imageX, imageY, 
        widthInImage, heightInImage,
        canvasX, canvasY,
        widthInCanvas, heightInCanvas 
    ) => {

    let ctx = canvas === "BACK" ? globals.GAME.back.ctx : globals.GAME.front.ctx  
    ctx.drawImage(
        image, 
        imageX, imageY, 
        widthInImage, heightInImage,
        canvasX, canvasY,
        widthInCanvas, heightInCanvas 
    )
}
/**
 * Calculate the total width of given text.
 * If it is over the maxBubbleWidth, break it in to smaller lines.
 * Return the lines of text in an array.
 * @param {String} text 
 * @param {String} fontSize 
 * @param {Number} maxBubbleWidth 
 */
const breakTextIntoLines = ( text, fontSize, maxBubbleWidth = globals.MAX_BUBBLE_WIDTH ) => {
    let ctx = getFrontCanvasContext() 
    setFont(fontSize)
    if ( ctx.measureText( text ).width > maxBubbleWidth ) {
        const textArray         = text.split(' ');
        let currentLineWidth    = 0;
        let textLine            = "";
        let textLineArray       = [ ];

        for ( var i = 0; i < textArray.length; i++ ) {
            setFont(fontSize);
            let newWord = textArray[i] + " "            
            let wordOverflowsTextbox = ( ( currentLineWidth + ctx.measureText(newWord + " ").width ) > ( maxBubbleWidth - globals.LARGE_FONT_SIZE ) )
            let lastWordIsNext = i == textArray.length - 1

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
/**
 * Draw a rectangle on desired canvas at given xy
 * @param {String} canvas 'FRONT' || 'BACK'
 * @param {Number} x 
 * @param {Number} y 
 * @param {Number} width 
 * @param {Number} height 
 * @param {String} color 
 */
const drawRect = ( canvas, x, y, width, height, color = null ) => {
    let ctx = canvas === "BACK" ? getBackCanvasContext() : getFrontCanvasContext()
    ctx.fillStyle = (color != null) ? color : "white"
    ctx.fillRect( x, y, width, height );
}
/**
 * Set the ctx.font of frontcanvas to given font size
 * @param {String} size 
 */
const setFont = ( size ) => {
    let ctx = getFrontCanvasContext()
    let fontSize;
    switch ( size ) {
        case "SMALL" : 
            fontSize = globals.SMALL_FONT_SIZE; 
            break;
        case "LARGE" : 
            fontSize = globals.LARGE_FONT_SIZE
            break;
        case "BATTLE" : 
            fontSize = globals.BATTLE_FONT_SIZE
            break;        
    }

    ctx.font = fontSize + "px " + "Stormfaze";
}
/**
 * Write given text with the ctx.fillText function at given xy on the front context
 * @param {String} text 
 * @param {Number} x 
 * @param {Number} y 
 * @param {Number} size 
 * @param {String} color 
 */
const writeTextLine = ( text, x, y, size, color = null ) => {
    let ctx = getFrontCanvasContext()
    setFont( size )
    ctx.fillStyle = (color != null) ? color : "white"
    ctx.fillText( text, x, y )
}
/**
 * Clear all from the canvas with given name
 * @param {String} canvas 
 */
const clearEntireCanvas = ( canvas ) => {
    let ctx = canvas === "BACK" ? getBackCanvasContext() : getFrontCanvasContext();        
    ctx.clearRect( 
        0, 0,
        globals.CANVAS_WIDTH, globals.CANVAS_HEIGHT
    )
}

module.exports = {
    drawFromImageToCanvas,
    clearEntireCanvas,
    getFrontCanvasContext,
    getBackCanvasContext,
    setFont,
    drawRect,
    breakTextIntoLines,
    writeTextLine
}