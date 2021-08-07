const musicFolder = "/static/music/";
const effectsFolder = "/static/sfx/";

/**
 * Class containing all functionalities for sound effects and music in the game
 */
class SoundController {
    /**
     * Initialize and empty Soundcontroller class for later usage
     */
    constructor( ) {
        this.activeMusic;
        this.musicIsPlaying;
        this.allMusic = {};

        this.activeSoundEffects = {};
        this.allSoundEffects = {}
    }

    /**
     * Init Audio element if needed and play music
     * @param {String} title name of music to be played. Should correspond with filename in music folder 
     * @param {Boolean} loopMusic optional boolean indicating if music should be looped
     */
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

    pauseMusic( ) {
        this.activeMusic.pause( );        
    }

    resumeMusic( ) {
        this.activeMusic.play( );         
    }

    /**
     * Init Audio element if needed and play effect
     * @param {String} title name of effect to be played. Should correspond with filename in effects folder 
     * @param {Boolean} loop optional boolean indicating if effect should be looped
     */
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