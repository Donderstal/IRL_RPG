import { fetchJSONWithCallback } from "../helpers/utilFunctions";
import { setAudioFile } from "./audio";
import { setEffectPng } from "./effects";
import { setSpritePng } from "./sprites";
import { setTilesheetPng } from "./tilesheets";
import { setUiImage } from "./ui";

let imageToLoadCount: number = null;
let fetchedPngJson = false;
let registeredAllImages = false;

let soundsToLoadCount: number = null;
let fetchedSoundJson = false;
let registeredAllAudio = false;

let imagesToLoadQueue: HTMLImageElement[] = [];
const loadedImageFiles: HTMLImageElement[] = [];
const registeredImageFiles: HTMLImageElement[] = [];

let audioToLoadQueue: HTMLAudioElement[] = [];
const loadedAudioFiles: HTMLAudioElement[] = [];
const registeredAudioFiles: HTMLAudioElement[] = [];

export const startFileLoader = () => {
    fetchJSONWithCallback( "static/png-list.json", setPngs );
    fetchJSONWithCallback( "static/audio-list.json", setSounds );
}

export const getLoadingProgressPercentage = (): number => {
    const total = soundsToLoadCount + imageToLoadCount;
    const current = loadedImageFiles.length + loadedAudioFiles.length;
    return current / total;
}

export const filesAreLoaded = (): boolean => {
    if ( fetchedPngJson === false || fetchedSoundJson === false ) {
        return false;
    }
    if ( registeredImageFiles.length >= imageToLoadCount ) {
        registeredAllImages = true;
    }
    if ( registeredAudioFiles.length >= soundsToLoadCount ) {
        registeredAllAudio = true;
    }
    return registeredAllImages && registeredAllAudio;
}

export const handleFileLoadQueues = (): boolean => {
    if ( fetchedPngJson === false || fetchedSoundJson === false ) {
        return false;
    }
    if ( !registeredAllImages ) {
        if ( loadedImageFiles.length < imagesToLoadQueue.length ) {
            handleImagesQueue();
        }
        else {
            loadedImageFiles.forEach( ( e ) => { onImageLoaded( e.src, e ); } );
        }
    }

    if ( !registeredAllAudio ) {
        if ( loadedAudioFiles.length < audioToLoadQueue.length ) {
            handleAudioQueue();
        }
        else {
            loadedAudioFiles.forEach( ( e ) => { onAudioLoaded( e.src, e ); } );
        }
    }

    return filesAreLoaded();
}

const handleImagesQueue = (): void => {
    imagesToLoadQueue = imagesToLoadQueue.map( ( e ) => {
        if ( e !== null && e.complete && e.naturalWidth > 0 ) {
            loadedImageFiles.push( e );
            return null;
        }
        return e;
    } )
}

const handleAudioQueue = (): void => {
    audioToLoadQueue = audioToLoadQueue.map( ( e ) => {
        if ( e !== null && e.readyState >= 2 ) {
            loadedAudioFiles.push( e );
            return null;
        }
        return e;
    } )
}

const setPngs = ( jsonList: string[] ): void => {
    fetchedPngJson = true;
    imageToLoadCount = jsonList.length;
    jsonList.forEach( addImageElementToQueue );
}

const setSounds = ( jsonList: string[] ): void => {
    fetchedSoundJson = true
    soundsToLoadCount = jsonList.length;
    jsonList.forEach( addAudioElementToQueue );
}

const addImageElementToQueue = ( src: string ): void => {
    const image = new Image();
    image.src = src;
    imagesToLoadQueue.push( image );
}

const addAudioElementToQueue = ( src: string ): void => {
    const audio = new Audio();
    audio.src = src;
    audioToLoadQueue.push( audio );
}

const onImageLoaded = ( path: string, image: HTMLImageElement ): void => {
    const splitPath = path.split( "static" )
    const pathFromRoot = "/static" + splitPath[1];
    if ( pathFromRoot.includes( '/effects/' ) ) {
        setEffectPng( pathFromRoot, image );
    }
    else if ( pathFromRoot.includes( '/sprites/' ) ) {
        setSpritePng( pathFromRoot, image );
    }
    else if ( pathFromRoot.includes( '/site_assets/' ) || pathFromRoot.includes( '/ui/' ) ) {
        setUiImage( pathFromRoot, image );
    }
    else if ( pathFromRoot.includes( '/tilesets/' ) ) {
        setTilesheetPng( pathFromRoot, image );
    }
    registeredImageFiles.push( image );
}

const onAudioLoaded = ( path: string, audio: HTMLAudioElement ): void => {
    const splitPath = path.split( "static" )
    const pathFromRoot = "/static" + splitPath[1];
    setAudioFile( pathFromRoot, audio );
    registeredAudioFiles.push( audio );
}