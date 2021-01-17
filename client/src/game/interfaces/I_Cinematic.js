const globals               = require('../../game-data/globals')
const { GRID_BLOCK_PX }     = require('../../game-data/globals')
const findSprite            = require('../../helpers/mapHelpers').findNamedCharacterOnMap
const getXYOfCell           = require('../../helpers/mapHelpers').getXYOfCell
const getOppositeDirection  = require('../../helpers/pathfindingHelpers').getOppositeDirection
const requestModeChange     = require('../../game-data/changeMode').requestModeChange

class Cinematic {
    constructor( data, trigger, args ) {
        this.scenes = [];
        this.scenes = data.scenes;
        this.trigger = trigger;
        this.args   = args;
        this.numberOfScenes = this.scenes.length
        this.iterator = 0;
        this.activeScene = new Scene( this.scenes[this.iterator] );

        globals.GAME.activeCinematic = this;
        requestModeChange('CINEMATIC')
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
            globals.GAME.activeCinematic = null;
            if ( this.trigger == "ON_LEAVE" ) {
                globals.GAME.mapTransition = {
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
        this.sfx = ( data.sfx ) ? data.sfx : false;
        this.setAction( data )
    }

    setAction( data ) {
        if ( this.type == "SPEAK" ) {
            this.text = data.text;
        }

        if ( this.type == "MOVE" ) {
            if ( typeof data.destination === 'string' || data.destination instanceof String ) {
                const sprite = findSprite( data.destination );
                this.endDirection = getOppositeDirection( sprite.direction );
                
                this.destination = { 
                    'left': sprite.x, 'right': sprite.x + sprite.width, 
                    'top': sprite.y + ( sprite.height / 2), 'bottom': sprite.y + ( sprite.height / 2) 
                };

                if ( this.endDirection == globals["FACING_LEFT"] ) {
                    this.destination.left += GRID_BLOCK_PX;
                    this.destination.right += GRID_BLOCK_PX;

                    this.destination.top = sprite.y;
                    this.destination.bottom = sprite.y + sprite.height;
                }
                else if ( this.endDirection == globals["FACING_RIGHT"] ) {
                    this.destination.left -= GRID_BLOCK_PX;
                    this.destination.right -= gGRID_BLOCK_PX;

                    this.destination.top = sprite.y;
                    this.destination.bottom = sprite.y + sprite.height;
                }
            }

            else {
                this.endDirection = ( data.endDirection ) ? globals[data.endDirection] : false; 
                
                if ( data.destination.row == 'current' || data.destination.col == 'current' ) {
                    const sceneSpriteCell = this.getSpriteCell( );
                    data.destination.row = ( data.destination.row == 'current' ) 
                        ? sceneSpriteCell.row 
                        : data.destination.row;
                    data.destination.col = ( data.destination.col == 'current' ) 
                        ? sceneSpriteCell.cell 
                        : data.destination.col;
                }

                const xy = getXYOfCell( data.destination.row, data.destination.col )
                this.destination = { 
                    'left': xy.x, 'right': xy.x + GRID_BLOCK_PX,
                    'top': xy.y, 'bottom': xy.y + GRID_BLOCK_PX
                }
            }
            this.walkingToDestination = true;            
        }

        if ( this.type == "ANIM" ) {
            this.animName = data.animName;
            this.endDirection = ( data.endDirection ) ? globals[data.endDirection] : false;
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