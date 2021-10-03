class BaseSound {
    constructor( baseAudioElement, volume, loopSound = false ) {
        console.log(baseAudioElement);
        this.initAudioNode(baseAudioElement, volume, loopSound);
        this.baseVolume = volume;
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