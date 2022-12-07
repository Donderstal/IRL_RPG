import { SpatialSound } from './SpatialSound';
import { BaseSound } from "./BaseSound";
import { getAudioFile } from '../../assets/audio';

const musicFolder = "/static/music/";
const effectsFolder = "/static/sfx/";

const standardMusicVolume = 0.5;
const menuMusicVolume = 0.5;
const standardSFXVolume = 0.75;

const audioContext = new AudioContext();

let activeMusic = null;
let musicIsPlaying = false;
let activeSoundEffects = [];
let speakingEffect = null;
let activeMusicId = "";

export const clearAllSound = (): void => {
    clearActiveSoundEffects();
    pauseMusic();

    activeMusic = null;
    musicIsPlaying = false;
    activeSoundEffects = [];
    speakingEffect = null;
    activeMusicId = "";
}

export const clearActiveSoundEffects = (): void => {
    activeSoundEffects.forEach( ( sound ) => {
        if ( !sound.audioNode.src.includes( activeMusicId ) ) {
            sound.reset()
        }
    } );
    activeSoundEffects = []
}

export const setActiveMusic = ( filename: string ): void => {
    const src = musicFolder + filename;
    if( activeMusicId === src) {
        if ( activeMusic.isPaused || activeMusic.hasEnded ) {
            playMusic();
        }
        return;
    }

    activeMusicId = src;
    if ( activeMusic ) {
        pauseMusic();
    }
    activeMusic = new BaseSound( getAudioFile( src ), src.includes( "menu" ) ? menuMusicVolume : standardMusicVolume, true );
    playMusic();
}
export const getSpatialEffect = ( filename: string, loop = false ): SpatialSound => {
    const src = effectsFolder + filename;
    const effect = new SpatialSound( getAudioFile( src ), standardSFXVolume, audioContext, loop );
    activeSoundEffects.push( effect );
    return effect;
}
export const playEffect = ( filename: string, loop = false ): void => {
    const newEffect = getEffect( filename, loop )
    newEffect.play();
    activeSoundEffects.push( newEffect );
}
export const playSpeakingEffect = ( fileName: string ): void => {
    clearSpeakingEffect();
    speakingEffect = getEffect( fileName, true );
    speakingEffect.play();
    activeSoundEffects.push( speakingEffect );
}

export const clearSpeakingEffect = (): void => {
    if ( speakingEffect !== null ) {
        speakingEffect.pause();
    }
    speakingEffect = null;
}
export const pauseMusic = (): void => {
    activeMusic.pause();
}

export const playMusic = (): void => {
    activeMusic.play();
}

const getEffect = ( filename: string, loop = false ): BaseSound => {
    const src = effectsFolder + filename;
    return new BaseSound( getAudioFile( src ), standardSFXVolume, loop );
}