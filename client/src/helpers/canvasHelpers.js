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

const drawSprite = ( 
        sprite, 
        sheetX, sheetY, 
        widthInSheet, heightInSheet,
        canvasX, canvasY,
        widthInCanvas, heightInCanvas 
    ) => {

    const frontCanvasContext = getFrontCanvasContext()
    frontCanvasContext.drawImage(
        sprite, 
        sheetX, sheetY, 
        widthInSheet, heightInSheet,
        canvasX, canvasY,
        widthInCanvas, heightInCanvas 
    )

}

const clearFrontCanvasRectangle = (
        canvasX, canvasY,
        widthInCanvas, heightInCanvas
    ) => {
        
    const frontCanvasContext = getFrontCanvasContext()
    frontCanvasContext.clearRect( 
        canvasX, canvasY,
        widthInCanvas, heightInCanvas 
    )
}


module.exports = {
    drawSprite,
    clearFrontCanvasRectangle
}