const globals         = require('../../game-data/globals')
const {
    STATE_PATHFINDING, STATE_MOVING, STATE_BLOCKED
} = require('../../game-data/globals')
const { getUniqueId } = require('../../helpers/utilFunctions');
const { 
    SPEAK, SPEAK_YES_NO, MOVE, MOVE_CAR, ANIM, CREATE_CAR, CREATE_SPRITE, DELETE_SPRITE, FADE_OUT, FADE_IN, FADE_OUT_IN, WAIT, EMOTE, CAMERA_MOVE_TO_SPRITE, LOAD_MAP, CREATE_OBJECT_SPRITE, CAMERA_MOVE_TO_TILE
} = require('../../game-data/conditionGlobals');
const { Animation } = require('./Animation');
const { hasCinematicMapLoaded } = require('../../helpers/loadMapHelpers');

class Scene {
    constructor( sceneDto, spriteId ) {
        this.animations = [];
        this.animationIds = [];
        this.finishedAnimations = [];
        sceneDto.forEach((animationDto) => {
            const id = getUniqueId(this.animationIds);
            if ( animationDto.spriteId === undefined && animationDto.spriteName == false && spriteId != false ) {
                animationDto.spriteId = spriteId
            }
            this.animations.push(new Animation(animationDto, id));
            this.animationIds.push(id);
        })
    }

    get scenePassAnimations() { return this.animations.filter((e)=>{return e.waitForAnimationEnd}) }

    containsAnimationType( animationType ) {
        let hasType = false;
        this.animations.forEach((e)=>{
            if( e.is(animationType) ) {
                hasType = true;
            }
        })
        return hasType;
    }

    getAnimationByType( animationType ) {
        let animation = {};
        this.animations.forEach((e)=>{
            if( e.is(animationType) ) {
                animation = e;
            }
        })
        return animation;
    }

    unsetSpriteAnimation( ) {
        this.animations.forEach((e)=>{
            e.unsetSpriteAnimation( );
        })
    }

    checkForScenePass( ) {
        let activeAnimations = this.scenePassAnimations.filter((e) => { return this.finishedAnimations.indexOf(e.id) === -1; });
        activeAnimations.forEach((e) => {
            let animationHasFinished = false;
            switch( e.type ) {
                case SPEAK:
                case SPEAK_YES_NO:
                    animationHasFinished = !globals.GAME.speechBubbleController.isActive
                    break;    
                case EMOTE:
                    animationHasFinished = e.counter.countAndCheckLimit( );
                    break;
                case MOVE :
                case MOVE_CAR:
                    let moveSprite = e.getSpriteById( ) != undefined ? e.getSpriteById( ) : e.getSpriteByName( );
                    animationHasFinished = moveSprite == undefined || (!moveSprite.State.is(STATE_MOVING) && !moveSprite.State.is(STATE_BLOCKED) && !moveSprite.State.is(STATE_PATHFINDING))
                    break;
                case ANIM: 
                    let animSprite = e.getSpriteById( );
                    animationHasFinished = !animSprite.State.inAnimation
                    break;
                case CREATE_CAR:
                case CREATE_SPRITE:
                case CREATE_OBJECT_SPRITE:
                    animationHasFinished = e.getSpriteByName( ) != undefined;
                    break;
                case DELETE_SPRITE:
                    animationHasFinished = e.getSpriteById( ) == undefined;
                    break;
                case FADE_OUT:
                    animationHasFinished = !globals.GAME.fader.fadingToBlack && globals.GAME.fader.holdBlackScreen;
                    break;
                case FADE_IN :
                case FADE_OUT_IN:
                    animationHasFinished = !globals.GAME.fader.inFadingAnimation
                    break;
                case WAIT:
                    animationHasFinished = e.counter.countAndCheckLimit( );
                    break;
                case CAMERA_MOVE_TO_SPRITE:
                    animationHasFinished = e.getSpriteByName( ) == undefined ||
                        (e.getSpriteByName( ).spriteId == globals.GAME.cameraFocus.focusSpriteId && !globals.GAME.cameraFocus.movingToNewFocus);
                    break;
                case CAMERA_MOVE_TO_TILE:
                    animationHasFinished = (e.tileIndex == globals.GAME.cameraFocus.focusTileId && !globals.GAME.cameraFocus.movingToNewFocus);
                    break;
                case LOAD_MAP:
                    animationHasFinished = hasCinematicMapLoaded( );
                    break;
                default :
                    console.log( "Scene type " + e.type + " is not recognized")
                    console.log(e)
            }
            if ( animationHasFinished ) {
                this.finishedAnimations.push( e.id )
            }
        })
        return this.finishedAnimations.length === this.scenePassAnimations.length;
    }
} 

module.exports = {
    Scene
}