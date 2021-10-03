const globals = require('../../game-data/globals');
const { BaseSound } = require('./BaseSound');

const musicFolder = "/static/music/";
const effectsFolder = "/static/sfx/";

const standardMusicVolume = 0.5;
const menuMusicVolume = 0.25;
const standardSFXVolume = 0.75;

/**
 * The SoundController functions like a registry for sounds and music in the game
 * SoundController uses the AUDIO_DICTIONARY globals as source for audio elements
 */
class SoundController {
    constructor( ) {
        this.activeMusic = false;
        this.musicIsPlaying = false;
    }

    get audioList( ) {
        return globals.AUDIO_DICTIONARY;
    }

    setActiveMusic( filename ) {
        if ( this.activeMusic ) {
            this.activeMusic.pause( );   
        }
        let src = musicFolder + filename;
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

    playEffect( filename, loop = false ) {
        const newEffect = this.getEffect( filename, loop )
        newEffect.play();
    }
}

module.exports = {
    SoundController
}