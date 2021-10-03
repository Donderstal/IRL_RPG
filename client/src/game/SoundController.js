const globals = require('../game-data/globals')
const musicFolder = "/static/music/";
const effectsFolder = "/static/sfx/";

/**
 * The SoundController functions like a registry for sounds and music in the game
 * SoundController uses the AUDIO_DICTIONARY globals as source for audio elements
 */
class SoundController {
    constructor( ) {
        this.activeMusic = null;
        this.activeSoundEffects = {};
        this.musicIsPlaying = false;
    }

    get audioList( ) {
        return globals.AUDIO_DICTIONARY;
    }

    playMusic( filename, loopMusic = true ) {
        let src = musicFolder + filename;
        if ( this.activeMusic != this.audioList[src] ) {
            if ( this.activeMusic != null && this.activeMusic != undefined ) {
                this.activeMusic.pause( );
                this.activeMusic.currentTime = 0;
            }
            this.activeMusic = this.audioList[src];
            this.activeMusic.loop = loopMusic;
            this.activeMusic.volume = src.includes("menu") ? 0.25 : 0.5
            this.activeMusic.play( );            
        }
    }

    pauseMusic( ) {
        this.activeMusic.pause( );        
    }

    resumeMusic( ) {
        this.activeMusic.play( );         
    }

    playEffect( filename, loop = false ) {
        let src = effectsFolder + filename;
        if ( src in this.activeSoundEffects ) {
            this.audioList[src].pause();
            this.audioList[src].currentTime = 0;
        }

        this.activeSoundEffects[src] = this.audioList[src];
        this.activeSoundEffects[src].src = src;
        this.activeSoundEffects[src].loop = loop;
        this.activeSoundEffects[src].volume = 0.75
        this.activeSoundEffects[src].play( );
    }
}

module.exports = {
    SoundController
}