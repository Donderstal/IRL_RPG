const globals               = require('../../game-data/globals')
const { Scene }     = require('./Scene')
const getOppositeDirection  = require('../../helpers/pathfindingHelpers').getOppositeDirection
/**
 * The Cinematic and Scene classes are no longer implemented and need to be reworked to the new Grid system
 */
class Cinematic {
    constructor( data, trigger, args ) {
        this.scenes = [];
        this.scenes = data.scenes;
        this.trigger = trigger;
        this.args   = args;
        this.numberOfScenes = this.scenes.length
        this.iterator = 0;
        this.activeScene = new Scene( this.scenes[this.iterator] );

        globals.GAME.activateCinematic( this );
    }

    checkForScenePass( ) {
        if ( this.activeScene.type == "SPEAK" ) {
            if ( !globals.GAME.bubbleIsActive ) {
                this.activateNextScene( )
            }
            else {
                return
            }
        }
        if ( this.activeScene.type == "MOVE" ) {
            if ( this.activeScene.walkingToDestination ) {
                return
            }
            else {
                this.activateNextScene( )
            }
        }
        if ( this.activeScene.type == "ANIM" ) {
            const sprite = this.activeScene.getSpriteByName( );
            if ( sprite.inScriptedAnimation ) {
                return 
            }          
            else {
                this.activateNextScene( )
            }      
        }
    }

    activateNextScene( ) {
        this.iterator++
        if ( this.scenes[this.iterator] ) {
            this.activeScene = new Scene( this.scenes[this.iterator] );            
        }
        else {
            globals.GAME.deActivateCinematic( this );
            globals.GAME.activeCinematic = null;
            if ( this.trigger == "ON_LEAVE" ) {
                globals.GAME.switchMap( this.args[0], this.args[1] )
            }
        }
    }
}

module.exports = {
    Cinematic
}