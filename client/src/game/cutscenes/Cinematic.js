const globals               = require('../../game-data/globals')
const { Scene }     = require('./Scene')
const getOppositeDirection  = require('../../helpers/pathfindingHelpers').getOppositeDirection
/**
 * The Cinematic and Scene classes are no longer implemented and need to be reworked to the new Grid system
 */
class Cinematic {
    constructor( data, trigger, args ) {
        this.data = data;
        this.scenes = data.scenes.slice();
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
        if ( this.activeScene.type == "SPEAK_YES_OR_NO" ) {
            if ( !globals.GAME.bubbleIsActive ) {
                this.handleYesOrNoScene( );
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
        if ( this.activeScene.type == "FADE_SREEN_OUT_IN" ) {
            if ( globals.GAME.fader.inFadingAnimation ) {
                return
            }
            else {
                globals.GAME.sound.resumeMusic( );
                this.activateNextScene( )
            }
        }
    }

    activateNextScene( ) {
        this.iterator++
        if ( this.scenes[this.iterator] ) {
            if ( this.activeScene.type == "SPEAK" || this.activeScene.type == "SPEAK_YES_OR_NO" ) {
                this.activeScene.unsetSpriteAnimation( )
            }
            this.activeScene = new Scene( this.scenes[this.iterator] );            
        }
        else {
            this.activeScene.unsetSpriteAnimation( )
            globals.GAME.deActivateCinematic( this );
            globals.GAME.activeCinematic = null;
            this.handleEndOfCinematicTrigger( );
        }
    }

    handleEndOfCinematicTrigger( ) {
        switch( this.trigger ) {
            case "ON_LEAVE": 
                globals.GAME.switchMap( this.args[0], this.args[1] )
                break;
            case "ON_BATTLE_START": 
                globals.GAME.initializeBattle( this.args[0], this.args[1] );
                break;
            case "ON_NPC_INTERACTION": 
                if ( globals.GAME.activeAction.dismissAtCinematicEnd ) {
                    globals.GAME.activeAction.resetAction( );
                }
                else {
                    globals.GAME.activeAction.confirm( );
                }
                break;
        }
    }

    handleYesOrNoScene( ) {
        let scenesToAdd;
        switch( this.activeScene.selection ) {
            case "YES" :
                scenesToAdd = this.activeScene.pathYes;
                break;
            case "NO" :
                scenesToAdd = this.activeScene.pathNo;
                break;
            default:
                console.log("Selection has invalid value: " + this.activeScene.selection)
        }

        if ( scenesToAdd ) {
            for ( var i = 0; i < scenesToAdd.length; i++ ) {
                this.scenes.splice( this.iterator + 1 + i, 0 , scenesToAdd[i] )
            }            
        }
        
        this.activateNextScene( );
    }
}

module.exports = {
    Cinematic
}