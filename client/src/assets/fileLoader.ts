import { fetchJSONWithCallback } from "../helpers/utilFunctions";
import { setAudioFile } from "./audio";
import { setEffectPng } from "./effects";
import { setSpritePng } from "./sprites";
import { setTilesheetPng } from "./tilesheets";
import { setUiImage } from "./ui";

let pngIndex: number = 0;
let pngsLimit: number = null;
let fetchedPngJson = false;
let loadedPngs = false;

let soundIndex: number = 0;
let soundsLimit: number = null;
let fetchedSoundJson = false;
let loadedAudio = false;

export const startFileLoader = ( ) => {
    fetchJSONWithCallback( "static/png-list.json", setPngs );
    fetchJSONWithCallback( "static/audio-list.json", setSounds );
}

export const filesAreLoaded = () => {
    if ( fetchedPngJson === false || fetchedSoundJson === false ) {
        return false;
    }
    if ( pngIndex === pngsLimit ) {
        loadedPngs = true;
    }
    if ( soundIndex === soundsLimit ) {
        loadedAudio = true;
    }
    return loadedPngs && loadedAudio;
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
            if ( path.includes( '/effects/' ) ) {
                setEffectPng( path, image );
            }
            else if ( path.includes( '/sprites/' ) ) {
                setSpritePng( path, image );
            }
            else if ( path.includes( '/site_assets/' ) || path.includes( '/ui/' ) ) {
                setUiImage( path, image );
            }
            else if ( path.includes( '/tilesets/' ) ) {
                setTilesheetPng( path, image );
            }
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
            setAudioFile( path, audio );
        }
    } );
}