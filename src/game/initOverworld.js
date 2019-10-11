function initCanvas(canvasNum) {

    const canvas    = document.getElementsByTagName('canvas')[canvasNum]
    canvas.classList.remove('do-not-display')
    let ctx         = canvas.getContext('2d');
    ctx.canvas.height   = 592
    ctx.canvas.width    = 888

    if (canvasNum === 0) {

        canvas.id           = 'game-background-canvas'

        drawMap(ctx,  ctx.canvas.width, ctx.canvas.height)    

    } else {
        canvas.id           = 'game-front-canvas'
    }

    console.log('ctx is: ' + ctx)

    return ctx
}

function drawMap(ctx, canvWidth, canvHeight) {
    let bgImage = new Image()

    let imageSrc = './images/gridExp.jpg'     
    
    bgImage.onload = ( ) => {
        ctx.drawImage(bgImage, 0, 0, canvWidth, canvHeight)                
    }

    bgImage.src = imageSrc
}

module.exports = {
    initCanvas
}