const musicFolder = "/static/music/";
const effectsFolder = "/static/sfx/";

class SoundController {
    constructor( ) {
        this.activeMusic;
        this.musicIsPlaying;
        this.allMusic = {};

        this.activeSoundEffects = {};
        this.allSoundEffects = {}
    }

    playMusic( title, loopMusic = true ) {
        if ( !(title in this.allMusic) ) {
            this.allMusic[title] = new Audio( musicFolder + title );
        }

        if ( this.activeMusic != this.allMusic[title] ) {
            if ( this.activeMusic != null && this.activeMusic != undefined ) {
                this.activeMusic.pause( );
                this.activeMusic.currentTime = 0;
            }
            this.activeMusic = this.allMusic[title];
            this.activeMusic.loop = loopMusic;
            this.activeMusic.volume = 0.5
            this.activeMusic.play( );            
        }
    }

    playEffect( title, loop = false ) {
        if ( !(title in this.activeSoundEffects) ) {
            const effect = new Audio( effectsFolder + title );
            this.allSoundEffects[title] = effect;
        }

        this.activeSoundEffects[title] = this.allSoundEffects[title];
        this.activeSoundEffects[title].title = title;
        this.activeSoundEffects[title].volume = 0.75
        this.activeSoundEffects[title].play( );
    }
}

module.exports = {
    SoundController
}