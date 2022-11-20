import { BaseSound } from './BaseSound';
import globals, { GRID_BLOCK_PX } from '../../game-data/globals';
import type { Sprite } from '../core/Sprite';
import { getPlayer } from '../modules/sprites/spriteGetter';
/**
 * Spatial sound pans and plays a sound relative to the player
 */
export class SpatialSound extends BaseSound {
    track: MediaElementAudioSourceNode;
    panner: StereoPannerNode;
    constructor( baseAudioElement, volume, audioContext, loopSound = false ) {
        super(baseAudioElement, volume, loopSound)
  
        this.track = audioContext.createMediaElementSource(this.audioNode);
        this.panner = new StereoPannerNode( audioContext );
        this.track.connect( this.panner ).connect( audioContext.destination);
    }

    setVolumeAndPan( sprite: Sprite ): void {
        this.setDistanceToPlayerVolume( sprite );
        this.setPan( sprite );
    }

    setPan( sprite: Sprite ): void {
        let player = getPlayer();
        let hearingDistance = GRID_BLOCK_PX * 3
        if ( this.isPaused || this.hasNotStartedPlaying ) {
            this.play( );
        }
        if ( player.centerX >= sprite.right && sprite !== player) {
            let modifier = (player.centerX - sprite.right) / hearingDistance;
            modifier = modifier > 1 ? 1 : modifier;
            this.panner.pan.value = 0 - modifier;
        }
        else if ( player.centerX <= sprite.left && sprite !== player ) {
            let modifier = (sprite.left - player.centerX) / hearingDistance;
            modifier = modifier > 1 ? 1 : modifier;
            this.panner.pan.value = 0 + modifier;
        }
        else if (player.centerX < sprite.right && player.centerX > sprite.left) {
            this.panner.pan.value = 0;
        }
    }

    setDistanceToPlayerVolume( sprite: Sprite ): void {
        let player = getPlayer();
        if ( this.isPaused || this.hasNotStartedPlaying ) {
            this.play( );
        }
        else if ( sprite == player ) {
            this.setVolumeToFactor( 0.75 );
        }
        else {
            let hearingDistance = GRID_BLOCK_PX * 3
            let modifiers = { hori: 0, vert: 0}

            if ( player.centerX >= sprite.right ) {
                let modifier = 1 - ((player.centerX - sprite.right) / hearingDistance);
                modifiers.hori = modifier > 0 ? modifier : 0
            }
            else if ( player.centerX <= sprite.left ) {
                let modifier = 1 - ((sprite.left - player.centerX) / hearingDistance);
                modifiers.hori = modifier > 0 ? modifier : 0
            }
            else if (player.centerX < sprite.right && player.centerX > sprite.left) {
                modifiers.hori = 1;
            }

            if ( player.baseY >= sprite.bottom ) {
                let modifier = 1 - ((player.baseY - sprite.bottom) / hearingDistance);
                modifiers.vert = modifier > 0 ? modifier : 0
            }
            else if ( player.baseY <= sprite.top ) {
                let modifier = 1 - ((sprite.top - player.baseY) / hearingDistance);
                modifiers.vert = modifier > 0 ? modifier : 0
            }
            else if ( player.baseY < sprite.bottom && player.baseY > sprite.top ) {
                modifiers.vert = 1;
            }

            this.setVolumeToFactor( modifiers.hori * modifiers.vert > 0.75 ? 0.75 : modifiers.hori * modifiers.vert );
        }
    }
}