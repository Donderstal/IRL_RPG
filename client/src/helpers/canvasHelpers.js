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

const drawFromImageToCanvas = ( 
        canvas,
        image, 
        imageX, imageY, 
        widthInImage, heightInImage,
        canvasX, canvasY,
        widthInCanvas, heightInCanvas 
    ) => {

    let ctx;
    canvas === "BACK" ? ctx = getBackCanvasContext() : ctx = getFrontCanvasContext()   
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

    let ctx;
    canvas === "BACK" ? ctx = getBackCanvasContext() : ctx = getFrontCanvasContext()   
        
    ctx.clearRect( 
        canvasX, canvasY,
        widthInCanvas, heightInCanvas 
    )
}

const drawLineOnXAxis = (oldX, y, newX, color = null) => {
    let ctx = getFrontCanvasContext()   

    ctx.beginPath( )
    ctx.moveTo( oldX, y ); 
    ctx.lineTo( newX, y ); 
    ctx.strokeStyle = (color != null) ? color : "white"
    ctx.stroke( );
}

const drawLineOnYAxis = (oldY, x, newY, color = null) => {
    let ctx = getFrontCanvasContext()   

    ctx.beginPath( )
    ctx.moveTo( x, oldY ); 
    ctx.lineTo( x, newY ); 
    ctx.strokeStyle = (color != null) ? color : "white"
    ctx.stroke( );
}

const drawRect = ( x, y, width, height, color = null ) => {
    let ctx = getFrontCanvasContext()   

    ctx.fillStyle = (color != null) ? color : "white"
    ctx.fillRect( x, y, width, height );
}

const setFont = ( size ) => {
    let ctx = getFrontCanvasContext()
    if ( size === "LARGE") {
        ctx.font = globals.LARGE_FONT_SIZE + globals.FONT_STYLE;
    }
    else if ( size === "SMALL" ) {
        ctx.font = globals.SMALL_FONT_SIZE + globals.FONT_STYLE;
    }
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
    clearCanvasRectangle,
    clearEntireCanvas,
    clearBothCanvases,
    drawLineOnYAxis,
    drawLineOnXAxis,
    getFrontCanvasContext,
    getBackCanvasContext,
    setFont,
    drawRect,
    writeTextLine
}