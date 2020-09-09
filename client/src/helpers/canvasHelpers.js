const globals = require('../game-data/globals')

//Return front Canvas ctx
const getFrontCanvasContext = () => {
    let canv = document.getElementsByTagName('canvas')[1]
    let ctx = canv.getContext('2d')

    return ctx
}

//Return back Canvas ctx
const getBackCanvasContext = () => {
    let canv = document.getElementsByTagName('canvas')[0]
    let ctx = canv.getContext('2d')

    return ctx
}

const drawCircle = ( canvasX, canvasY, radius ) => {
    let ctx = getFrontCanvasContext()
    ctx.beginPath();
    ctx.arc( canvasX, canvasY, radius, 0, 2 * Math.PI );
    ctx.fillStyle = "#800020"
    ctx.fill(); 
    ctx.strokeStyle = '#11001C';
    ctx.stroke()
}

const drawFromImageToCanvas = ( 
        canvas,
        image, 
        imageX, imageY, 
        widthInImage, heightInImage,
        canvasX, canvasY,
        widthInCanvas, heightInCanvas 
    ) => {

    let ctx = canvas === "BACK" ? getBackCanvasContext() : getFrontCanvasContext()   
    ctx.drawImage(
        image, 
        imageX, imageY, 
        widthInImage, heightInImage,
        canvasX, canvasY,
        widthInCanvas, heightInCanvas 
    )
}

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

const drawRect = ( canvas, x, y, width, height, color = null ) => {
    let ctx = canvas === "BACK" ? getBackCanvasContext() : getFrontCanvasContext()

    ctx.beginPath();
    ctx.fillStyle = (color != null) ? color : "white"
    ctx.fillRect( x, y, width, height );
    ctx.rect( x, y, width, height );
    ctx.stroke();
}

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

const writeTextLine = ( text, x, y, size, color = null ) => {
    let ctx = getFrontCanvasContext()
    setFont( size )
    ctx.fillStyle = (color != null) ? color : "white"
    ctx.fillText( text, x, y )
}

const clearEntireCanvas = ( canvas ) => {
    let ctx;
    canvas === "BACK" ? ctx = getBackCanvasContext() : ctx = getFrontCanvasContext()   
        
    ctx.clearRect( 
        0, 0,
        globals.CANVAS_WIDTH, globals.CANVAS_HEIGHT
    )
}

const clearBothCanvases = ( ) => {
    let front = getFrontCanvasContext()
    let back = getBackCanvasContext()

    back.clearRect( 
        0, 0,
        globals.CANVAS_WIDTH, globals.CANVAS_HEIGHT
    )

    front.clearRect( 
        0, 0,
        globals.CANVAS_WIDTH, globals.CANVAS_HEIGHT
    )
}


module.exports = {
    drawFromImageToCanvas,
    clearEntireCanvas,
    clearBothCanvases,
    getFrontCanvasContext,
    getBackCanvasContext,
    setFont,
    drawRect,
    drawCircle,
    breakTextIntoLines,
    writeTextLine
}