import globals from '../game-data/globals';
import { fetchJSONWithCallback } from './utilFunctions';

export class FileLoader {
    params: any[];
    pngIndex: number;
    pngsLimit: number;
    soundIndex: number;
    soundsLimit: number;
    gameType: string;
    interval: NodeJS.Timer;
    constructor( params: any[], gameType: string ) {
        this.params = params;

        this.pngIndex = 0;
        this.soundIndex = 0;

        this.pngsLimit = 1;
        this.soundsLimit = 1;

        this.gameType = gameType;

        fetchJSONWithCallback( "static/png-list.json", this.setPngs.bind(this) )
        fetchJSONWithCallback( "static/audio-list.json", this.setSounds.bind(this) )
        this.interval = setInterval(this.checkIfFilesLoaded.bind(this), 100)
    }

    checkIfFilesLoaded( ): void {
        if ( this.pngIndex === this.pngsLimit && this.soundIndex === this.soundsLimit ) {
            if ( this.gameType === "NEW" ) {
                globals.GAME.startNewGame( this.params[0], this.params[1], this.params[2], this.params[3], this.params[4] );
            }
            else if ( this.gameType === "LOAD" ) {
                globals.GAME.loadGame( this.params[0] );
            }
            clearInterval(this.interval)
        }
    }

    setPngs( jsonList: string[] ): void {
        this.pngsLimit = jsonList.length;
        jsonList.forEach( ( pngPath ) => {
            const image   = new Image( );
            const path    = pngPath;
            const parent  = this;
            image.src = path;
            image.onload = ( ) => {
                parent.pngIndex++;
                globals.PNG_DICTIONARY[path] = image;
            }
        });
    }

    setSounds( jsonList: string[] ): void {
        this.soundsLimit = jsonList.length;
        jsonList.forEach( ( audioPath ) => {
            const audio   = new Audio( audioPath );
            const path    = audioPath;
            const parent  = this;
            audio.preload = 'auto';
            audio.onloadedmetadata = ( ) => {
                parent.soundIndex++;
                globals.AUDIO_DICTIONARY[path] = audio;
            }
        });
    }
}