const { 
    CANVAS_WIDTH, CANVAS_HEIGHT, 
    LARGE_FONT_SIZE, LARGE_FONT_LINE_HEIGHT,
    BATTLE_FONT_SIZE, BATTLE_FONT_LINE_HEIGHT 
} = require('../game-data/globals');
const globals = require('../game-data/globals');

class LoadingScreen {
    constructor( ) {

    }

    draw( ) {
        globals.GAME.front.ctx.clearRect( 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT )
        globals.GAME.front.ctx.fillStyle = "#D82BBA";
        globals.GAME.front.ctx.fillRect( 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT )
        globals.GAME.front.ctx.fillStyle = "#FFFFFF";
        globals.GAME.front.ctx.font = LARGE_FONT_SIZE + "px " + "Stormfaze";
        globals.GAME.front.ctx.fillText("Loading...", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 );
    }

    clear( ) {
        globals.GAME.front.ctx.clearRect( 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT ) 
    }
}

const setLoadingScreen = ( ) => {
    globals.GAME.loadingScreen = new LoadingScreen( );
    drawLoadingScreen( );
}

const drawLoadingScreen = ( ) => {
    const GAME = globals.GAME;
    const loadingScreenIsActive = !GAME.isRunning && GAME.mode == undefined;

    if ( loadingScreenIsActive ) {
        GAME.loadingScreen.draw( );
        setTimeout( drawLoadingScreen, 50 )
    }
    else {
        GAME.loadingScreen.clear( );
        GAME.loadingScreen = null;
    }
}

module.exports = {
    setLoadingScreen
}