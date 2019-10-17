let ctx;

let gameChar;

const scale = 2;
const width = 24;
const height = 24;
const scaledWidth = scale * width;
const scaledHeight = scale * height;

const drawFrame = function (frameX, frameY, canvasX, canvasY) {

    ctx.drawImage(gameChar.characterPiece.sprite,
        frameX * width, frameY * height, width, height,
        canvasX, canvasY, scaledWidth, scaledHeight);
}

const init = function (myctx, gameCharac) {

    ctx = myctx;
    
    gameChar = gameCharac;

    console.log(gameChar)

    window.requestAnimationFrame(step);
}

const cycleLoop = [ 0, 1, 2, 3, 4, 5, 6 ];
let currentLoopIndex = 0;
let frameCount = 0;


const step = function ( ) {

    frameCount++;

    if (frameCount < 15) {
        window.requestAnimationFrame(step);
        return;
    }

    frameCount = 0;
    ctx.clearRect(74, 74, 74, 74);
    drawFrame(cycleLoop[currentLoopIndex], 0, 74, 74);

    currentLoopIndex++;

    if (currentLoopIndex >= cycleLoop.length) {
        currentLoopIndex = 0;
    }
     
    window.requestAnimationFrame(step);

}

module.exports = {
    init
}