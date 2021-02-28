const globals  = require('../game-data/globals')

const { CANVAS_WIDTH, CANVAS_HEIGHT, CANVAS_COLUMNS } = require('../game-data/globals');
const { drawRect } = require('../helpers/canvasHelpers');

const menuIsReady = false;

const tabs = [
    "STATUS",
    "INVENTORY",
    "MAP",
    "GAME"
];

const initGameMenu = ( ) => {
    globals.GAME.inMenu = true;
    menuIsReady = true;
}

const unsetGameMenu = ( ) => {
    menuIsReady = false;
    globals.GAME.inMenu = false;
}

const drawGameMenu = ( ) => {
    drawRect( "FRONT", 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT, "#64005380" )
}

module.exports = {
    initGameMenu,
    unsetGameMenu,
    drawGameMenu
}