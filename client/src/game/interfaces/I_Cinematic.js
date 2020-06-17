const state = require('../../game-data/state')
const anim = require('../../resources/animationResources')
const requestModeChange = require('../../game-data/changeMode').requestModeChange
const globals = require('../../game-data/globals')

class Cinematic {
    constructor( data ) {
        this.scenes = [];
        this.scenes = data.scenes;
        this.numberOfScenes = this.scenes.length
        this.iterator = 0;
        this.activeScene = new Scene( this.scenes[this.iterator] );

        state.activeCinematic = this;
        requestModeChange('CINEMATIC')

        /* data.scenes.forEach( scene => {
            this.scenes.push( new Scene( scene ) );
        } ) */
    }

    checkForScenePass( ) {
        if ( this.activeScene.type == "SPEAK" ) {
            if ( !state.currentMap.bubbleIsActive ) {
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
            
        }
    }

    activateNextScene( ) {
        this.iterator++
        this.activeScene = new Scene( this.scenes[this.iterator] );
    }
}

class Scene {
    constructor( data ) {
        this.type   = data.type;
        this.spriteName = data.spriteName;
        this.setAction( data )

        console.log(this)
    }


    setAction( data ) {
        if ( this.type == "SPEAK" ) {
            this.text = data.text;
        }
        if ( this.type == "MOVE" ) {
            if ( typeof data.destination === 'string' || data.destination instanceof String ) {
                if ( data.destination == 'Player' ) {
                    state.playerCharacter.sprite.calcCellFromXy( )
                    this.destination = { 'row': state.playerCharacter.sprite.row, 'col': state.playerCharacter.sprite.col }
                }
            }
            else {
                this.destination = data.destination;
            }
            this.walkingToDestination = true;            
        }
        if ( this.type == "ANIM" ) {
            this.animName = data.animName;
            this.loop = data.loop;
        }

        this.setAnimToSprite( );
    }

    setAnimToSprite( ) {
        for ( var i = 0; i < state.currentMap.NPCs.length; i++ ) {
            const currentNPC = state.currentMap.NPCs[i]
            if ( this.spriteName == currentNPC.name ) {
                return currentNPC.setAnimation(this)
            }
        }        
    }
}

module.exports = {
    Cinematic
}