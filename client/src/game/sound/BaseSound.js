class BaseSound {
    constructor( baseAudioElement, volume, loopSound = false ) {
        console.log(baseAudioElement);
        this.initAudioNode(baseAudioElement, volume, loopSound);
    }

    get isPaused( ) {
        return this.audioNode.paused && this.activeMusic.currentTime > 0;
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
        this.audioNode.pause( );
        this.activeMusic.currentTime = 0;
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