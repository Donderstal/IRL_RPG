export class BaseSound {
    baseVolume: number;
    audioNode: HTMLAudioElement;
    constructor( baseAudioElement: HTMLAudioElement, volume: number, loopSound = false ) {
        this.initAudioNode(baseAudioElement, volume, loopSound);
        this.baseVolume = volume;
    }

    get isNotPlaying(): boolean { return this.hasNotStartedPlaying || this.hasEnded || this.isPaused }
    get hasNotStartedPlaying(): boolean { return this.audioNode.currentTime === 0; }
    get isPaused(): boolean { return this.audioNode.paused && this.audioNode.currentTime > 0; }
    get hasEnded(): boolean { return this.audioNode.ended; }

    play( ): void {
        this.audioNode.play( );
    }

    mute(): void {
        this.audioNode.volume = 0;
    }

    setVolumeToFactor( volumeModifier: number ): void { 
        this.audioNode.volume = this.baseVolume * volumeModifier;
    }

    pause(): void {
        this.audioNode.pause( );
    }

    reset(): void {
        this.pause( );
        this.audioNode.currentTime = 0;
    } 

    initAudioNode( baseAudioElement: HTMLAudioElement, volume: number, loopSound = false ): void {
        this.audioNode = baseAudioElement.cloneNode() as HTMLAudioElement;
        this.audioNode.loop = loopSound;
        this.audioNode.volume = volume;
    }
}