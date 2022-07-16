import globals from '../../game-data/globals';
import { SpatialSound } from './SpatialSound';
import { BaseSound } from "./BaseSound";

const musicFolder = "/static/music/";
const effectsFolder = "/static/sfx/";

const standardMusicVolume = 0.5;
const menuMusicVolume = 0.5;
const standardSFXVolume = 0.75;

/**
 * The SoundController functions like a registry for sounds and music in the game
 * SoundController uses the AUDIO_DICTIONARY global as source for audio elements
 */
export class SoundController {
    activeMusic: BaseSound;
    musicIsPlaying: boolean;
    activeSoundEffects: BaseSound[];
    speakingEffect: BaseSound;
    activeMusicId: string;
    constructor( ) {
        this.activeMusic = null;
        this.musicIsPlaying = false;
        this.activeSoundEffects = [];
        this.speakingEffect = null;
        this.activeMusicId = "";
    }

    get audioList(): {[key: string]: HTMLAudioElement} {
        return globals.AUDIO_DICTIONARY;
    }

    clearActiveSoundEffects( ): void {
        this.activeSoundEffects.forEach( ( sound ) =>{ 
            if ( !sound.audioNode.src.includes(this.activeMusicId) ) {
                sound.reset( )
            } 
        });
        this.activeSoundEffects = []
    }

    setActiveMusic( filename: string ): void {
       const src = musicFolder + filename;
        if (this.activeMusicId === src) {
            if ( this.activeMusic.isPaused || this.activeMusic.hasEnded ) {
                this.playMusic( );                
            }
            return;
        }

        this.activeMusicId = src;
        if ( this.activeMusic ) {
            this.pauseMusic( );   
        }
        this.activeMusic = new BaseSound( this.audioList[src], src.includes("menu") ? menuMusicVolume : standardMusicVolume, true );
        this.playMusic( );
    }

    pauseMusic(): void {
        this.activeMusic.pause( );        
    }

    playMusic(): void {
        this.activeMusic.play( );         
    }

    getEffect( filename: string, loop = false ): BaseSound {
        const src = effectsFolder + filename;
        return new BaseSound( this.audioList[src], standardSFXVolume, loop );
    }

    getSpatialEffect( filename: string, loop = false ): SpatialSound {
        const src = effectsFolder + filename;
        return new SpatialSound( this.audioList[src], standardSFXVolume, loop );
    }

    playEffect( filename: string, loop = false ): void {
        const newEffect = this.getEffect( filename, loop )
        newEffect.play();
    }

    playSpeakingEffect( fileName: string ): void {
        this.clearSpeakingEffect( );
        this.speakingEffect = this.getEffect( fileName, true );
        this.speakingEffect.play( );
    }

    clearSpeakingEffect(): void {
        if ( this.speakingEffect !== null ) {
            this.speakingEffect.pause( );            
        }
        this.speakingEffect = null;
    }
}