const { BaseSound } = require('./BaseSound')
const globals = require('../../game-data/globals');
const { MapSprite } = require('../map/map-classes/MapSprite');
/**
 * Spatial sound pans and plays a sound relative to the player
 */
class SpatialSound extends BaseSound {
    constructor( baseAudioElement, volume, loopSound = false ) {
        super(baseAudioElement, volume, loopSound)
  
        this.track = globals.GAME.audio.createMediaElementSource(this.audioNode);
        this.panner = new StereoPannerNode(globals.GAME.audio);
        this.track.connect(this.panner).connect(globals.GAME.audio.destination);
    }

    setVolumeAndPan( sprite ) {
        this.setDistanceToPlayerVolume( sprite );
        this.setPan( sprite );
    }

    setPan( sprite ) {
        let PLAYER = globals.GAME.PLAYER;
        let hearingDistance = globals.GRID_BLOCK_PX * 3
        if ( this.isPaused || this.hasNotStartedPlaying ) {
            this.play( );
        }
        if ( PLAYER.centerX() >= sprite.right && sprite !== PLAYER) {
            let modifier = (PLAYER.centerX( ) - sprite.right) / hearingDistance;
            modifier = modifier > 1 ? 1 : modifier;
            this.panner.pan.value = 0 - modifier;
        }
        else if ( PLAYER.centerX() <= sprite.left && sprite !== PLAYER ) {
            let modifier = (sprite.left - PLAYER.centerX( )) / hearingDistance;
            modifier = modifier > 1 ? 1 : modifier;
            this.panner.pan.value = 0 + modifier;
        }
        else if (PLAYER.centerX() < sprite.right && PLAYER.centerX() > sprite.left) {
            this.panner.pan.value = 0;
        }
    }

    setDistanceToPlayerVolume( sprite ) {
        let PLAYER = globals.GAME.PLAYER;
        if ( this.isPaused || this.hasNotStartedPlaying ) {
            this.play( );
        }
        else if ( sprite == PLAYER || !(PLAYER instanceof MapSprite)  ) {
            this.setVolumeToFactor( 0.75 );
        }
        else {
            let hearingDistance = globals.GRID_BLOCK_PX * 3
            let modifiers = { hori: 0, vert: 0}

            if ( PLAYER.centerX() >= sprite.right ) {
                let modifier = 1 - ((PLAYER.centerX( ) - sprite.right) / hearingDistance);
                modifiers.hori = modifier > 0 ? modifier : 0
            }
            else if ( PLAYER.centerX() <= sprite.left ) {
                let modifier = 1 - ((sprite.left - PLAYER.centerX( )) / hearingDistance);
                modifiers.hori = modifier > 0 ? modifier : 0
            }
            else if (PLAYER.centerX() < sprite.right && PLAYER.centerX() > sprite.left) {
                modifiers.hori = 1;
            }

            if ( PLAYER.baseY( ) >= sprite.bottom ) {
                let modifier = 1 - ((PLAYER.baseY( ) - sprite.bottom) / hearingDistance);
                modifiers.vert = modifier > 0 ? modifier : 0
            }
            else if ( PLAYER.baseY( ) <= sprite.top ) {
                let modifier = 1 - ((sprite.top - PLAYER.baseY()) / hearingDistance);
                modifiers.vert = modifier > 0 ? modifier : 0
            }
            else if ( PLAYER.baseY( ) < sprite.bottom && PLAYER.baseY( ) > sprite.top ) {
                modifiers.vert = 1;
            }

            this.setVolumeToFactor( modifiers.hori * modifiers.vert > 0.75 ? 0.75 : modifiers.hori * modifiers.vert );
        }
    }
}

module.exports = {
    SpatialSound
}