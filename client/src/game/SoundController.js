const musicFolder = "/static/music/";
const effectsFolder = "/static/sfx/";

class SoundController {
    constructor( ) {
        this.activeMusic;
        this.musicIsPlaying;
        this.allMusic = {};

        this.activeSoundEffects = {};
        this.soundEffectIsPlaying;
        this.allSoundEffects = {}
    }

    playMusic( title, loopMusic = true ) {
        if ( !(title in this.allMusic) ) {
            this.allMusic[title] = new Audio( musicFolder + title );
        }

        if ( this.activeMusic != this.allMusic[title] ) {
            this.activeMusic = this.allMusic[title];
            this.activeMusic.loop = loopMusic;
            this.activeMusic.play( );            
        }
    }
}

module.exports = {
    SoundController
}