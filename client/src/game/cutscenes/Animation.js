const { 
    SPEAK, SPEAK_YES_NO, MOVE, MOVE_CAR, ANIM, CREATE_CAR, CREATE_SPRITE, DELETE_SPRITE, FADE_OUT, FADE_OUT_IN, FADE_IN, 
    WAIT, EVENT_BUS, EMOTE, CAMERA_MOVE_TO_SPRITE
} = require('../../game-data/conditionGlobals');
const globals               = require('../../game-data/globals');
const { Counter } = require('../../helpers/Counter');
const { getClosestCell } = require('../../helpers/utilFunctions');

class Animation {
    constructor( animationDto, id ) {
        this.id = id;
        this.type   = animationDto.type;
        this.spriteName = animationDto.spriteName;
        if ( this.is( CREATE_CAR ) || this.is( CREATE_SPRITE ) ) {
            this.spriteId = undefined;
        }
        else {
            this.spriteId = animationDto.spriteId != undefined ? animationDto.spriteId : this.getSpriteByName().spriteId;            
        }

        this.sfx = ( animationDto.sfx ) ? animationDto.sfx : false;
        this.setAction( animationDto )
    }

    is( value ) {
        return this.type == value
    }

    setAction( animationDto ) {
        let setToSprite = false;
        switch( this.type ) {
            case SPEAK:
                this.text = animationDto.text;
                this.speakWith = animationDto.speakWith;
                setToSprite = true;
                break;
            case SPEAK_YES_NO:
                this.text = animationDto.text;
                this.pathYes = animationDto.pathYes;
                this.pathNo = animationDto.pathNo;
                this.speakWith = animationDto.speakWith;
                setToSprite = true;
                break;
            case EMOTE:
                this.src = animationDto.src;
                this.speakWith = animationDto.speakWith;
                setToSprite = true;
            case MOVE :
                this.initMoveAnimation( animationDto );
                setToSprite = true;
                break;
            case MOVE_CAR:
                this.initMoveCarAnimation( animationDto );
                break;
            case ANIM: 
                this.animName = animationDto.animName;
                this.endDirection = ( animationDto.endDirection ) ? globals[data.endDirection] : false;
                this.loop = animationDto.loop;
                setToSprite = true;
                break;
            case CREATE_CAR:
                this.initCreateCarAnimation( animationDto );
                break;
            case CREATE_SPRITE:
                this.initCreateSpriteAnimation( animationDto );
                break;
            case DELETE_SPRITE:
                setTimeout( ( ) => { 
                    if ( animationDto.sfx ) {
                        globals.GAME.sound.playEffect( animationDto.sfx )                        
                    }
                    globals.GAME.FRONT.deleteSprite( this.spriteId ) 
                }, 250 )
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
                this.counter = new Counter( animationDto.ms )
                break;
            case CAMERA_MOVE_TO_SPRITE:
                let sprite = this.getSpriteByName( );
                globals.GAME.cameraFocus.setSpriteFocus( sprite, animationDto.snapToSprite );
                break;
            default :
                console.log( "Animation type " + this.type + " is not recognized")
                console.log(data);
                console.log(this);
        }
        if( setToSprite ) {
            this.setAnimToSprite( );            
        }
    }

    initMoveAnimation( animationDto ) {
        if ( typeof animationDto.destination === 'string' || animationDto.destination instanceof String ) {
            const sprite = this.getSpriteById( this.getSpriteByName( animationDto.destination ).spriteId );             
            const cells = [
                { row: sprite.row - 1, col: sprite.col },
                { row: sprite.row, col: sprite.col - 1 },
                { row: sprite.row, col: sprite.col + 1 },
                { row: sprite.row + 1, col: sprite.col }
            ].filter((cell)=>{ 
                const tileB = globals.GAME.BACK.getTileAtCell( cell.col, cell.row )
                const tileF = globals.GAME.FRONT.getTileAtCell( cell.col, cell.row )
                return !tileB.isBlocked && !globals.GAME.FRONT.tileHasBlockingSprite(tileF.index);
            });

            animationDto.destination = getClosestCell( this.getSpriteById(), cells );
        }

        this.destination = animationDto.destination;
        this.walkingToDestination = true;    
    }

    initMoveCarAnimation( animationDto ) {
        let roads   = globals.GAME.FRONT.roadNetwork.roads.filter( ( e ) => { return e.roadName == animationDto.roadName; })
        let road    = roads[0];

        this.destination = road.isHorizontal ? { "row": road.topRow, "col": animationDto.col } : { "row": animationDto.row, "col": road.leftCol }
        this.walkingToDestination = true;   
        let car = this.getSpriteByName( );
        car.setDestination( this.destination, true );
    }

    initCreateCarAnimation( animationDto ) {
        let roads       = globals.GAME.FRONT.roadNetwork.roads.filter( ( e ) => { return e.name == animationDto.roadName })
        let roadData    = roads[0].getCarDataForTile( true );
        roadData.name   = this.spriteName;
        globals.GAME.FRONT.setVehicleToTile( roadData );
    }

    initCreateSpriteAnimation( animationDto ) {
        if ( animationDto.spriteName == "Player" ) {
            globals.GAME.setPlayerInNewMap( globals.GAME.activeMap, EVENT_BUS )
            return;
        }

        const tile = globals.GAME.FRONT.getTileAtCell( animationDto.col, animationDto.row );
        animationDto.name = animationDto.spriteName;
        globals.GAME.FRONT.setCharacterSprite( tile, animationDto, true )   
    }

    getSpriteCell( ) {
        const sprite = this.spriteId != undefined ? this.getSpriteById( ) : this.getSpriteByName( );
        return { 'row': sprite.row, 'col': sprite.col }
    }

    setAnimToSprite( ) {
        const sprite = this.spriteId != undefined ? this.getSpriteById( ) : this.getSpriteByName( );
        sprite.setAnimation(this)      
    }

    unsetSpriteAnimation( ) {
        if ( this.is( DELETE_SPRITE ) || this.is( MOVE_CAR ) ) {
            return;
        }
        
        const sprite = this.spriteId != undefined ? this.getSpriteById( ) : this.getSpriteByName( );
        if ( sprite.animationType != globals.NPC_ANIM_TYPE_ANIMATION_LOOP ) {
            sprite.unsetScriptedAnimation( )            
        }
    }

    getSpriteByName( name = this.spriteName ) {
        const spriteArray = globals.GAME.FRONT.allSprites.filter( ( e ) => { return e.name == name;} );
        return spriteArray[0];
    }

    getSpriteById( id = this.spriteId ) {
        return this.spriteId == undefined ? globals.GAME.FRONT.spriteDictionary[this.getSpriteByName().id]: globals.GAME.FRONT.spriteDictionary[id];
    }
    
    setSelection( selection ) {
        this.selection = selection;
    }
} 

module.exports = {
    Animation
}