const initOverworld = require('./overworld-init/initOverworld')

const initCanvas = (canvasNum) => {
    // canvasNum === 0 generates background Canvas
    // 1 generates the front canvas
    const canvas    = document.getElementsByTagName('canvas')[canvasNum]
    canvas.classList.remove('do-not-display')
    let ctx         = canvas.getContext('2d');
    ctx.canvas.height   = 592
    ctx.canvas.width    = 888

    if (canvasNum === 0) {

        canvas.id           = 'game-background-canvas'

        initOverworld.fetchOverworldJsonWithCallback('my-neighbourhood/my-house')

    } else {
        canvas.id           = 'game-front-canvas'
    }

    return ctx
}

module.exports = {
    initCanvas
}