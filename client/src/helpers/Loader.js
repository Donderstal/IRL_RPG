const globals = require('../game-data/globals');
const { fetchJSONWithCallback } = require('./utilFunctions');

class FileLoader {
    constructor( params ) {
        this.params = params;

        this.pngs = [];
        this.sounds = [];

        this.pngIndex = 0;
        this.soundsIndex = 0;

        this.pngLimit = 1;
        this.soundsLimit = 1;

        fetchJSONWithCallback( "static/png-list.json", this.setPngs.bind(this) )
        fetchJSONWithCallback( "static/audio-list.json", this.setSounds.bind(this) )
        this.interval = setInterval(this.checkIfFilesLoaded.bind(this), 100)
    }

    checkIfFilesLoaded( ) {
        if ( this.pngIndex == this.pngLimit && this.soundsIndex == this.soundsLimit ) {
            globals.GAME.startNewGame( this.params[0], this.params[1], this.params[2], this.params[3], this.params[4] );
            clearInterval(this.interval)
        }
    }

    setPngs( json ) {
        this.pngLimit = json.length;
        json.forEach( ( pngPath ) => {
            let image   = new Image( );
            let path    = pngPath;
            let parent  = this;
            image.src = path;
            image.onload = ( ) => {
                parent.pngIndex++;
                globals.PNG_DICTIONARY[path] = image;
            }
        });
    }

    setSounds( json ) {
        this.soundsLimit = json.length;
        json.forEach( ( audioPath ) => {
            let audio   = new Audio( audioPath );
            let path    = audioPath;
            let parent  = this;
            audio.oncanplaythrough = ( ) => {
                parent.soundsIndex++;
                globals.AUDIO_DICTIONARY[path] = audio;
            }
        });
    }
}

module.exports = {
    FileLoader
}