const state = require('../../game-data/state')
const findSprite = require('../../helpers/mapHelpers').findNamedCharacterOnMap
const requestModeChange = require('../../game-data/changeMode').requestModeChange

class Cinematic {
    constructor( data, trigger, args ) {
        this.scenes = [];
        this.scenes = data.scenes;
        this.trigger = trigger;
        this.args   = args;
        this.numberOfScenes = this.scenes.length
        this.iterator = 0;
        this.activeScene = new Scene( this.scenes[this.iterator] );

        state.activeCinematic = this;
        requestModeChange('CINEMATIC')
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
            const sprite = findSprite( this.activeScene.spriteName );
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
            requestModeChange('CINEMATIC_END')
            state.activeCinematic = null;
            if ( this.trigger == "ON_LEAVE" ) {
                state.mapTransition = {
                    urlToNewMap: this.args[0],
                    oldMapName: this.args[1]
                }
            }
        }
    }
}

class Scene {
    constructor( data ) {
        this.type   = data.type;
        this.spriteName = data.spriteName;
        this.setAction( data )
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
                if ( this.destination.row == 'current' || this.destination.col == 'current' ) {
                    const sceneSpriteCell = this.getSpriteCell( );
                    this.destination.row = ( this.destination.row == 'current' ) 
                        ? sceneSpriteCell.row 
                        : this.destination.row;
                    this.destination.col = ( this.destination.col == 'current' ) 
                        ? sceneSpriteCell.cell 
                        : this.destination.col;
                }
            }
            this.endDirection = ( data.endDirection ) ? data.endDirection : false; 
            this.walkingToDestination = true;            
        }
        if ( this.type == "ANIM" ) {
            this.animName = data.animName;
            this.loop = data.loop;
        }

        this.setAnimToSprite( );
    }

    getSpriteCell( ) {
        const sprite = findSprite( this.spriteName );
        return { 'row': sprite.row, 'col': sprite.col }
    }

    setAnimToSprite( ) {
        const sprite = findSprite( this.spriteName );
        sprite.setAnimation(this)      
    }
}

module.exports = {
    Cinematic
}