const globals = require('../game-data/globals')
const { Game } = require('./Game')

const startGame = ( name, className ) => {
    globals.GAME = new Game( );
    globals.GAME.startNewGame( name, className );
}

module.exports = {
    startGame
}