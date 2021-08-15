const globals               = require('../../game-data/globals')

class Scene {
    constructor( data ) {
        this.type   = data.type;
        this.spriteName = data.spriteName;
        if ( this.type == "CREATE_CAR" || this.type == "CREATE_SPRITE" ) {
            this.spriteId = "";
        }
        else {
            this.spriteId = data.spriteId != undefined ? data.spriteId : this.getSpriteByName().spriteId;            
        }

        this.sfx = ( data.sfx ) ? data.sfx : false;
        this.setAction( data )
    }

    setAction( data ) {
        if ( this.type == "SPEAK" ) {
            this.text = data.text;
        }

        if (  this.type == "SPEAK_YES_OR_NO" ) {
            this.text = data.text;
            this.pathYes = data.pathYes;
            this.pathNo = data.pathNo;
        }

        if ( this.type == "MOVE" ) {
            if ( typeof data.destination === 'string' || data.destination instanceof String ) {
                const sprite = this.getSpriteById( this.getSpriteByName( data.destination ).spriteId );             
                data.destination = { 
                    'col': sprite.col, 
                    'row': sprite.row 
                };

                const startingCell = this.getSpriteCell( );
                if ( startingCell.row < data.destination.row ) {
                    data.destination.row -= 1;
                }
                else if ( startingCell.row > data.destination.row ) {
                    data.destination.row += 1;
                }
                else if ( startingCell.col < data.destination.col ) {
                    data.destination.col -= 1;
                }
                else if ( startingCell.col > data.destination.col ) {
                    data.destination.col += 1;
                }
            }

            this.destination = data.destination;
            this.walkingToDestination = true;            
        }

        if ( this.type == "MOVE_CAR" ) {
            let roads   = globals.GAME.FRONT.roads.filter( ( e ) => { return e.roadId == data.roadId; })
            let road    = roads[0];

            if ( road.isHorizontal ) {
                this.destination = { "row": road.topRow, "col": data.col }
            }
            else {
                this.destination = { "row": data.row, "col": road.leftCol }
            }
            this.walkingToDestination = true;   
            let car = this.getSpriteByName( )
            car.initMovingSprite( this )
            console.log(this)
        }
        
        if ( this.type == "ANIM" ) {
            this.animName = data.animName;
            this.endDirection = ( data.endDirection ) ? globals[data.endDirection] : false;
            this.loop = data.loop;
        }

        if ( this.type == "CREATE_CAR" ) {
            let roads   = globals.GAME.FRONT.roads.filter( ( e ) => { return e.roadId == data.roadId; })
            let roadData    = roads[0].getCarDataForTile( true );
            roadData.name = this.spriteName;
            globals.GAME.FRONT.setVehicleToTile( roadData )
            return;
        }

        if ( this.type == "CREATE_SPRITE" ) {
            if ( data.spriteName == "Player" ) {
                globals.GAME.setPlayerInNewMap( globals.GAME.activeMap, "BUS" )
                return;
            }

            const tile = globals.GAME.FRONT.getTileAtCell( data.col, data.row );
            data.name = data.spriteName;
            tile.setSpriteData( "character", data )
            globals.GAME.FRONT.setCharacterSprite( tile, true )   
            this.spriteId = tile.spriteId;
            tile.clearSpriteData( );  
            return;
        }

        if ( this.type == "DELETE_SPRITE" ) {
            setTimeout( ( ) => { globals.GAME.FRONT.deleteSprite( this.spriteId ) }, 250 )
            return;
        }

        if ( this.type  == "FADE_SCREEN_OUT" ) {
            globals.GAME.sound.pauseMusic( );
            globals.GAME.fader.startFadeToBlack(  );
            globals.GAME.sound.playEffect( "relaxing_chord.wav" )
            return;
        }
        
        if ( this.type  == "FADE_SCREEN_OUT_IN" ) {
            globals.GAME.sound.pauseMusic( );
            globals.GAME.fader.startFadeToBlack( true );
            globals.GAME.sound.playEffect( "relaxing_chord.wav" )
            return;
        }

        if ( this.type == "FADE_SCREEN_IN" ) {
            globals.GAME.fader.startFadeFromBlack( );
        }

        this.setAnimToSprite( );
    }

    getSpriteCell( ) {
        const sprite = this.spriteId != undefined ? this.getSpriteById( ) : this.getSpriteByName( )
        return { 'row': sprite.row, 'col': sprite.col }
    }

    setAnimToSprite( ) {
        const sprite = this.spriteId != undefined ? this.getSpriteById( ) : this.getSpriteByName( )
        sprite.setAnimation(this)      
    }

    unsetSpriteAnimation( ) {
        if ( this.type == "DELETE_SPRITE" || this.type == "MOVE_CAR" ) {
            return;
        }
        
        const sprite = this.spriteId != undefined ? this.getSpriteById( ) : this.getSpriteByName( )
        if ( sprite.animationType != globals.NPC_ANIM_TYPE_ANIMATION_LOOP ) {
            sprite.unsetScriptedAnimation( )            
        }
    }

    getSpriteByName( name = this.spriteName ) {
        const spriteArray = globals.GAME.FRONT.allSprites.filter( ( e ) => { return e.name == name;} );
        return spriteArray[0];
    }

    getSpriteById( id = this.spriteId ) {
        return globals.GAME.FRONT.spriteDictionary[id];
    }
    
    setSelection( selection ) {
        this.selection = selection;
    }
} 

module.exports = {
    Scene
}