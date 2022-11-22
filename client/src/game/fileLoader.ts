import globals from "../game-data/globals";
import { fetchJSONWithCallback } from "../helpers/utilFunctions";

let pngIndex: number = 0;
let pngsLimit: number = null;
let fetchedPngJson = false;

let soundIndex: number = 0;
let soundsLimit: number = null;
let fetchedSoundJson = false;

export const startFileLoader = ( ) => {
    fetchJSONWithCallback( "static/png-list.json", setPngs );
    fetchJSONWithCallback( "static/audio-list.json", setSounds );
}

export const filesAreLoaded = () => {
    if ( fetchedPngJson === false || fetchedSoundJson === false ) {
        return false;
    }
    return pngIndex === pngsLimit && soundIndex === soundsLimit;
}

const setPngs = ( jsonList: string[] ): void => {
    fetchedPngJson = true;
    pngsLimit = jsonList.length;
    jsonList.forEach( ( pngPath ) => {
        const image = new Image();
        const path = pngPath;
        image.src = path;
        image.onload = () => {
            pngIndex++;
            globals.PNG_DICTIONARY[path] = image;
        }
    } );
}

const setSounds = ( jsonList: string[] ): void => {
    fetchedSoundJson = true
    soundsLimit = jsonList.length;
    jsonList.forEach( ( audioPath ) => {
        const audio = new Audio( audioPath );
        const path = audioPath;
        audio.preload = 'auto';
        audio.onloadedmetadata = () => {
            soundIndex++;
            globals.AUDIO_DICTIONARY[path] = audio;
        }
    } );
}