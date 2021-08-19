const { 
    SPEAK, SPEAK_YES_NO, MOVE, MOVE_CAR, ANIM, CREATE_CAR, CREATE_SPRITE, DELETE_SPRITE, FADE_OUT, FADE_OUT_IN, FADE_IN, 
    WAIT, EVENT_BUS
} = require('../../game-data/conditionGlobals');
const globals               = require('../../game-data/globals');
const { Counter } = require('../../helpers/Counter');

class Scene {
    constructor( data ) {
        this.type   = data.type;
        this.spriteName = data.spriteName;
        if ( this.is( CREATE_CAR ) || this.is( CREATE_SPRITE ) ) {
            this.spriteId = "";
        }
        else {
            this.spriteId = data.spriteId != undefined ? data.spriteId : this.getSpriteByName().spriteId;            
        }

        this.sfx = ( data.sfx ) ? data.sfx : false;
        this.setAction( data )
    }

    is( value ) {
        return this.type == value
    }

    setAction( data ) {
        let setToSprite = false;
        switch( this.type ) {
            case SPEAK:
                this.text = data.text;
                setToSprite = true;
                break;
            case SPEAK_YES_NO:
                this.text = data.text;
                this.pathYes = data.pathYes;
                this.pathNo = data.pathNo;
                setToSprite = true;
                break;
            case MOVE :
                this.initMoveScene( data );
                setToSprite = true;
                break;
            case MOVE_CAR:
                this.initMoveCarScene( data );
                break;
            case ANIM: 
                this.animName = data.animName;
                this.endDirection = ( data.endDirection ) ? globals[data.endDirection] : false;
                this.loop = data.loop;
                setToSprite = true;
                break;
            case CREATE_CAR:
                this.initCreateCarScene( data );
                break;
            case CREATE_SPRITE:
                this.initCreateSpriteScene( data );
                break;
            case DELETE_SPRITE:
                setTimeout( ( ) => { globals.GAME.FRONT.deleteSprite( this.spriteId ) }, 250 )
                break;
            case FADE_OUT:
                globals.GAME.sound.pauseMusic( );
                globals.GAME.fader.startFadeToBlack(  );
                globals.GAME.sound.playEffect( "relaxing_chord.wav" )
                break;
            case FADE_IN:
                globals.GAME.fader.startFadeFromBlack( );
                break;
            case FADE_OUT_IN:
                globals.GAME.sound.pauseMusic( );
                globals.GAME.fader.startFadeToBlack( true );
                globals.GAME.sound.playEffect( "relaxing_chord.wav" )
                break;
            case WAIT:
                this.counter = new Counter( data.ms )
                break;
            default :
                console.log( "Scene type " + this.type + " is not recognized")
        }
        if( setToSprite ) {
            this.setAnimToSprite( );            
        }
    }

    initMoveScene( data ) {
        if ( typeof data.destination === 'string' || data.destination instanceof String ) {
            const sprite = this.getSpriteById( this.getSpriteByName( data.destination ).spriteId );             
            data.destination = {  'col': sprite.col,  'row': sprite.row  };
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

    initMoveCarScene( data ) {
        let roads   = globals.GAME.FRONT.roads.filter( ( e ) => { return e.roadId == data.roadId; })
        let road    = roads[0];

        this.destination = road.isHorizontal ? { "row": road.topRow, "col": data.col } : { "row": data.row, "col": road.leftCol }
        this.walkingToDestination = true;   
        let car = this.getSpriteByName( )
        car.initMovingSprite( this )
    }

    initCreateCarScene( data ) {
        let roads   = globals.GAME.FRONT.roads.filter( ( e ) => { return e.roadId == data.roadId; })
        let roadData    = roads[0].getCarDataForTile( true );
        roadData.name = this.spriteName;
        globals.GAME.FRONT.setVehicleToTile( roadData )
    }

    initCreateSpriteScene( data ) {
        if ( data.spriteName == "Player" ) {
            globals.GAME.setPlayerInNewMap( globals.GAME.activeMap, EVENT_BUS )
            return;
        }

        const tile = globals.GAME.FRONT.getTileAtCell( data.col, data.row );
        data.name = data.spriteName;
        tile.setSpriteData( "character", data )
        globals.GAME.FRONT.setCharacterSprite( tile, true )   
        this.spriteId = tile.spriteId;
        tile.clearSpriteData( );  
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
        if ( this.is( DELETE_SPRITE ) || this.is( MOVE_CAR ) ) {
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