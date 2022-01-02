const globals = require('../../game-data/globals');
const { BaseSound } = require('./BaseSound');
const { SpatialSound } = require('./SpatialSound');

const musicFolder = "/static/music/";
const effectsFolder = "/static/sfx/";

const standardMusicVolume = 0.5;
const menuMusicVolume = 0.25;
const standardSFXVolume = 0.75;

/**
 * The SoundController functions like a registry for sounds and music in the game
 * SoundController uses the AUDIO_DICTIONARY global as source for audio elements
 */
class SoundController {
    constructor( ) {
        this.activeMusic = false;
        this.musicIsPlaying = false;
        this.activeSoundEffects = [];
        this.activeMusicId = "";
    }

    get audioList( ) {
        return globals.AUDIO_DICTIONARY;
    }

    clearActiveSoundEffects( ) {
        this.activeSoundEffects.forEach( ( sound ) =>{ 
            if ( !sound.audioNode.src.includes(this.activeMusicId) ) {
                sound.reset( )
            } 
        });
        this.activeSoundEffects = []
    }

    setActiveMusic( filename ) {
        let src = musicFolder + filename;
        if (this.activeMusicId == src) {
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

    pauseMusic( ) {
        this.activeMusic.pause( );        
    }

    playMusic( ) {
        this.activeMusic.play( );         
    }

    getEffect( filename, loop = false ) {
        let src = effectsFolder + filename;
        return new BaseSound( this.audioList[src], standardSFXVolume, loop );
    }

    getSpatialEffect( filename, loop = false ) {
        let src = effectsFolder + filename; SpatialSound
        return new SpatialSound( this.audioList[src], standardSFXVolume, loop );
    }

    playEffect( filename, loop = false ) {
        const newEffect = this.getEffect( filename, loop )
        newEffect.play();
    }
}

module.exports = {
    SoundController
}