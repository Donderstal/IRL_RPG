const globals = require("../../game-data/globals");

class BaseSound {
    constructor( baseAudioElement, volume, loopSound = false ) {
        this.initAudioNode(baseAudioElement, volume, loopSound);
        this.baseVolume = volume;
        globals.GAME.sound.activeSoundEffects.push( this );
    }

    get hasNotStartedPlaying( ) {
        return this.audioNode.currentTime == 0;
    }

    get isPaused( ) {
        return this.audioNode.paused && this.audioNode.currentTime > 0;
    }

    get hasEnded( ) {
        return this.audioNode.ended;
    }

    play( ) {
        this.audioNode.play( );
    }

    mute( ) {
        this.audioNode.volume = 0;
    }

    setVolumeToFactor( volumeModifier ) { 
        this.audioNode.volume = this.baseVolume * volumeModifier;
    }

    pause( ) {
        this.audioNode.pause( );
    }

    reset( ) {
        this.pause( );
        this.audioNode.currentTime = 0;
    } 

    initAudioNode(baseAudioElement, volume, loopSound) {
        this.audioNode = baseAudioElement.cloneNode();
        this.audioNode.loop = loopSound;
        this.audioNode.volume = volume;
    }
}

module.exports = { 
    BaseSound
}