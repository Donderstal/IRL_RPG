import globals from '../../game-data/globals';
import { getUniqueId } from '../../helpers/utilFunctions';
import { Animation } from './Animation';
import { hasCinematicMapLoaded } from '../../helpers/loadMapHelpers';
import type { CinematicSceneModel } from '../../models/CinematicSceneModel';
import type { SceneAnimationModel } from '../../models/SceneAnimationModel';
import { SceneAnimationType } from '../../enumerables/SceneAnimationTypeEnum';
import { SpriteStateEnum } from '../../enumerables/SpriteStateEnum';

export class Scene {
    animations: Animation[];
    animationIds: string[];
    finishedAnimations: string[];
    constructor( sceneModel: CinematicSceneModel, spriteId: string ) {
        this.animations = [];
        this.animationIds = [];
        this.finishedAnimations = [];
        sceneModel.forEach((animationModel: SceneAnimationModel): void => {
            const id = getUniqueId(this.animationIds);
            if ( animationModel.spriteId === undefined && spriteId !== null ) {
                animationModel.spriteId = spriteId
            }
            this.animations.push(new Animation(animationModel, id));
            this.animationIds.push(id);
        })
    }

    get scenePassAnimations(): Animation[] { return this.animations.filter( ( e ) => { return e.model.waitForAnimationEnd; } ) }

    containsAnimationType( animationType: SceneAnimationType ): boolean {
        let hasType = false;
        this.animations.forEach( ( e: Animation ): void => {
            if( e.is(animationType) ) {
                hasType = true;
            }
        } )
        return hasType;
    }

    getAnimationByType( animationType: SceneAnimationType ): Animation {
        let animation: Animation = null;
        this.animations.forEach( ( e: Animation ): void => {
            if ( e.is( animationType ) ) {
                animation = e;
            }
        } );
        return animation;
    }

    unsetSpriteAnimation( ): void {
        this.animations.forEach( ( e: Animation ): void => {
            e.unsetSpriteAnimation();
        } );
    }

    checkForScenePass( ): boolean {
        let activeAnimations = this.scenePassAnimations.filter((e) => { return this.finishedAnimations.indexOf(e.id) === -1; });
        activeAnimations.forEach( ( e ): void => {
            let animationHasFinished = false;
            switch( e.model.type ) {
                case SceneAnimationType.speak:
                case SceneAnimationType.speakYesNo:
                    animationHasFinished = !globals.GAME.speechBubbleController.isActive
                    break;    
                case SceneAnimationType.emote:
                    animationHasFinished = e.counter.countAndCheckLimit( );
                    break;
                case SceneAnimationType.move:
                case SceneAnimationType.moveCar:
                    let moveSprite = e.getSpriteById( ) != undefined ? e.getSpriteById( ) : e.getSpriteByName( );
                    animationHasFinished = moveSprite == undefined
                        || ( !moveSprite.State.is( SpriteStateEnum.moving ) && !moveSprite.State.is( SpriteStateEnum.blocked ) && !moveSprite.State.is( SpriteStateEnum.pathfinding ) )
                    break;
                case SceneAnimationType.animation:
                    let animSprite = e.getSpriteById( );
                    animationHasFinished = !animSprite.State.inAnimation
                    break;
                case SceneAnimationType.createCar:
                case SceneAnimationType.createSprite:
                    animationHasFinished = e.getSpriteByName( ) != undefined;
                    break;
                case SceneAnimationType.deleteSprite:
                    animationHasFinished = e.getSpriteById( ) == undefined;
                    break;
                case SceneAnimationType.fadeOut:
                    animationHasFinished = !globals.GAME.fader.fadingToBlack && globals.GAME.fader.holdBlackScreen;
                    break;
                case SceneAnimationType.fadeIn:
                case SceneAnimationType.fadeOutIn:
                    animationHasFinished = !globals.GAME.fader.inFadingAnimation
                    break;
                case SceneAnimationType.wait:
                    animationHasFinished = e.counter.countAndCheckLimit( );
                    break;
                case SceneAnimationType.cameraMoveToSprite:
                    animationHasFinished = e.getSpriteByName( ) == undefined ||
                        (e.getSpriteByName( ).spriteId == globals.GAME.cameraFocus.focusSpriteId && !globals.GAME.cameraFocus.movingToNewFocus);
                    break;
                case SceneAnimationType.cameraMoveToTile:
                    animationHasFinished = (e.tileIndex == globals.GAME.cameraFocus.focusTileId && !globals.GAME.cameraFocus.movingToNewFocus);
                    break;
                case SceneAnimationType.loadMap:
                    animationHasFinished = hasCinematicMapLoaded( );
                    break;
            }
            if ( animationHasFinished ) {
                this.finishedAnimations.push( e.id )
            }
        })
        return this.finishedAnimations.length === this.scenePassAnimations.length;
    }
} 