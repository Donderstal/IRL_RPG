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

const drawCircle = ( canvasX, canvasY, radius, text = null ) => {
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

const clearCanvasRectangle = (
        canvas,
        canvasX, canvasY,
        widthInCanvas, heightInCanvas
    ) => {

    let ctx = canvas === "BACK" ? getBackCanvasContext() : getFrontCanvasContext()   
        
    ctx.clearRect( 
        canvasX, canvasY,
        widthInCanvas, heightInCanvas 
    )
}

const breakTextIntoLines = ( text, fontSize ) => {
    let ctx = getFrontCanvasContext() 
    setFont(fontSize)
    if ( ctx.measureText( text ).width > globals.MAX_BUBBLE_WIDTH ) {
        const lolarray = text.split(' ')
        let accumulator = 0;
        let textLine = "";
        let textLineArray = [ ];

        for ( var i = 0; i < lolarray.length; i++ ) {
            let newWord = lolarray[i] + " "            
            let wordOverflowsTextbox = ( ( accumulator + ctx.measureText(newWord).width ) > ( globals.MAX_BUBBLE_WIDTH - 10 ) )

            if ( wordOverflowsTextbox ) {
                textLineArray.push(textLine)
                textLine = newWord
                accumulator = 0
            }
            else {
                accumulator += ctx.measureText(newWord).width
                textLine += newWord
                if ( i == lolarray.length - 1 ) {
                    textLineArray.push(textLine)
                }
            }
        }  
        return textLineArray      
    }

    return text
}

const drawLineOnXAxis = (oldX, y, newX, color = null, canvas = null) => {
    let ctx = ( canvas == null ) ? getFrontCanvasContext() : getBackCanvasContext()

    ctx.beginPath( )
    ctx.moveTo( oldX, y ); 
    ctx.lineTo( newX, y ); 
    ctx.strokeStyle = (color != null) ? color : "white"
    ctx.stroke( );
}

const drawLineOnYAxis = (oldY, x, newY, color = null, canvas = null) => {
    let ctx = ( canvas == null ) ? getFrontCanvasContext() : getBackCanvasContext()

    ctx.beginPath( )
    ctx.moveTo( x, oldY ); 
    ctx.lineTo( x, newY ); 
    ctx.strokeStyle = (color != null) ? color : "white"
    ctx.stroke( );
}

const drawRect = ( canvas, x, y, width, height, color = null ) => {
    let ctx = canvas === "BACK" ? getBackCanvasContext() : getFrontCanvasContext()

    ctx.fillStyle = (color != null) ? color : "white"
    ctx.fillRect( x, y, width, height );
}

const setFont = ( size ) => {
    let ctx = getFrontCanvasContext()
    if ( size === "LARGE") {
        ctx.font = globals.LARGE_FONT_SIZE + "px " + "GameFont";
    }
    else if ( size === "SMALL" ) {
        ctx.font = globals.SMALL_FONT_SIZE + "px " + "GameFont";
    }
}

const writeTextLine = ( text, x, y, size, color = null ) => {
    let ctx = getFrontCanvasContext()
    setFont( size )
    ctx.fillStyle = (color != null) ? color : "black"
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
    clearCanvasRectangle,
    clearEntireCanvas,
    clearBothCanvases,
    drawLineOnYAxis,
    drawLineOnXAxis,
    getFrontCanvasContext,
    getBackCanvasContext,
    setFont,
    drawRect,
    drawCircle,
    breakTextIntoLines,
    writeTextLine
}