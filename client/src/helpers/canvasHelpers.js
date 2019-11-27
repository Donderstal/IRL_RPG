const globals = require('../game-data/globals')

//Return loading ctx
const getTextCanvasContext = () => {
    let canv = document.getElementsByTagName('canvas')[2]

    canv.width = globals.CANVAS_WIDTH
    canv.height = globals.CANVAS_HEIGHT / 6

    let ctx = canv.getContext('2d')

    return ctx
}

const initTextCanvas = () => {
    let ctx = getTextCanvasContext()

    ctx.fillStyle = "white"
        ctx.fillRect( 
            0, 0,
            globals.CANVAS_WIDTH, globals.CANVAS_HEIGHT / 6
        )        
   
}

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

const getLoadingScreen = () => {
    clearEntireCanvas("FRONT")

    let ctx = getFrontCanvasContext() 

    ctx.strokeRect( 
        0, 0,
        globals.CANVAS_WIDTH, globals.CANVAS_HEIGHT
    )

    // draw tile number in grid block
    ctx.fillStyle = "gold"
    ctx.font = "25px Georgia";
    ctx.fillText(
        "Loading...",
        globals.CANVAS_WIDTH / 3, globals.CANVAS_HEIGHT / 2
    )

    ctx.fillStyle = "white"
    ctx.font = "17.5px Georgia";
    ctx.fillText(
        "NECKBEARD 2020",
        globals.CANVAS_WIDTH / 3, globals.CANVAS_HEIGHT / 2 + 25
    )
}

const writeToTextCanvas = ( text ) => {
    let ctx = getTextCanvasContext()
    ctx.font = "20px Times New Roman";
    ctx.fillText(
        text,
        5, globals.GRID_BLOCK_PX
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
    initTextCanvas,
    getLoadingScreen,
    drawFromImageToCanvas,
    clearCanvasRectangle,
    clearEntireCanvas,
    clearBothCanvases,
    writeToTextCanvas
}