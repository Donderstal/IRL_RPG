import { SceneAnimationType } from "../../enumerables/SceneAnimationTypeEnum";
import { initCanvasObjectModel, initGridCellModel } from "../../helpers/modelFactory";
import type {
    AnimateSpriteScene, CameraMoveToSpriteScene, CameraMoveToTileScene, CreateCarScene, CreateSpriteScene,
    DeleteSpriteScene, EmoteScene, FadeScene, LoadMapScene, MoveScene, SceneAnimationModel,
    SpeakScene, SpeakYesNoScene, WaitScene
} from "../../models/SceneAnimationModel";
import { Counter } from '../../helpers/Counter';
import type { GridCellModel } from "../../models/GridCellModel";
import type { Sprite } from "../core/Sprite";
import { AnimationTypeEnum } from "../../enumerables/AnimationTypeEnum";
import type { InteractionAnswer } from "../../enumerables/InteractionAnswer";
import globals from '../../game-data/globals';
import { PLAYER_ID, PLAYER_NAME } from '../../game-data/interactionGlobals';
import { getClosestCell } from '../../helpers/utilFunctions';
import { initializeSpriteMovement } from '../modules/spriteMovementModule';
import type { CellPosition } from "../../models/CellPositionModel";
import { MAIN_CHARACTER } from "../../resources/spriteTypeResources";
import type { CanvasObjectModel } from "../../models/CanvasObjectModel";
import { setNewBubble, setNewEmote } from "../controllers/bubbleController";
import { destroySpriteAnimation, initializeSpriteAnimation, spriteHasAnimation } from "../modules/animationModule";
import { cameraFocus } from "../cameraFocus";

export class Animation {
    id: string;
    model: SceneAnimationModel;
    spriteId: string;
    counter: Counter;
    tileIndex: number;
    destination: GridCellModel;
    selection: InteractionAnswer;
    constructor( animationModel: SceneAnimationModel, id: string ) {
        this.id = id;
        this.model = animationModel;
        console.log( `new animation of type with ${animationModel.type} animation` )
        this.setSpriteId();
        this.setAction();
    }

    get speakScene(): SpeakScene { return this.model as SpeakScene; }
    get speakYesNoScene(): SpeakYesNoScene { return this.model as SpeakYesNoScene; }
    get emoteScene(): EmoteScene { return this.model as EmoteScene; }
    get moveScene(): MoveScene { return this.model as MoveScene; }
    get animationScene(): AnimateSpriteScene { return this.model as AnimateSpriteScene; }
    get createCarScene(): CreateCarScene { return this.model as CreateCarScene; }
    get createSpriteScene(): CreateSpriteScene { return this.model as CreateSpriteScene; }
    get deleteSpriteScene(): DeleteSpriteScene { return this.model as DeleteSpriteScene; }
    get fadeScene(): FadeScene { return this.model as FadeScene; }
    get waitScene(): WaitScene { return this.model as WaitScene; }
    get cameraMoveToSpriteScene(): CameraMoveToSpriteScene { return this.model as CameraMoveToSpriteScene; }
    get cameraMoveToTileScene(): CameraMoveToTileScene { return this.model as CameraMoveToTileScene; }
    get loadMapScene(): LoadMapScene { return this.model as LoadMapScene; }

    get activeSprite(): Sprite { return globals.GAME.FRONT.spriteDictionary[this.spriteId]; }

    is( value: SceneAnimationType ): boolean {
        return this.model.type == value
    }

    hasSpriteSet() {
        return this.spriteId !== null && this.spriteId !== undefined;
    }

    setSpriteId() {
        this.spriteId = this.model.spriteId;
    }

    setAction( ): void {
        switch( this.model.type ) {
            case SceneAnimationType.speak:
            case SceneAnimationType.speakYesNo:
                this.initSpeakAnimation( this.model.type );
                break;
            case SceneAnimationType.emote:
                this.initEmoteAnimation();
                break;
            case SceneAnimationType.move:
                this.initMoveAnimation( this.moveScene );
                break;
            case SceneAnimationType.animation: 
                this.initAnimationAnimation( this.animationScene );
                break;
            case SceneAnimationType.createCar:
                this.initCreateCarAnimation( this.createCarScene );
                break;
            case SceneAnimationType.createSprite:
                this.initCreateSpriteAnimation( this.createSpriteScene );
                break;
            case SceneAnimationType.deleteSprite:
                setTimeout( ( ) => { 
                    if ( this.deleteSpriteScene.sfx ) {
                        globals.GAME.sound.playEffect( this.deleteSpriteScene.sfx )                        
                    }
                    globals.GAME.FRONT.deleteSprite( this.spriteId ) 
                }, 250 )
                break;
            case SceneAnimationType.fadeOut:
                globals.GAME.fader.startFadeToBlack(  );
                if ( this.fadeScene.sfx ) {
                    globals.GAME.sound.pauseMusic( );
                    globals.GAME.sound.playEffect( this.fadeScene.sfx )
                }
                break;
            case SceneAnimationType.fadeIn:
                globals.GAME.fader.startFadeFromBlack( );
                break;
            case SceneAnimationType.fadeOutIn:
                globals.GAME.fader.startFadeToBlack( true );
                if ( this.fadeScene.sfx ) {
                    globals.GAME.sound.pauseMusic( );
                    globals.GAME.sound.playEffect( this.fadeScene.sfx )
                }
                break;
            case SceneAnimationType.wait:
                this.counter = new Counter( this.waitScene.milliseconds )
                break;
            case SceneAnimationType.cameraMoveToSprite:
                let sprite = this.getSpriteByName( );
                cameraFocus.setSpriteFocus( sprite, this.cameraMoveToSpriteScene.snapToSprite );
                break;
            case SceneAnimationType.cameraMoveToTile:
                this.model = this.model as CameraMoveToTileScene
                let tile = globals.GAME.getTileOnCanvasAtCell( "FRONT", this.cameraMoveToTileScene.column, this.cameraMoveToTileScene.row );
                this.tileIndex = tile.index;
                cameraFocus.setTileFocus( tile, this.cameraMoveToTileScene.snapToTile );
                break;
            case SceneAnimationType.loadMap:
                this.model = this.model as LoadMapScene;
                globals.GAME.loadCinematicMap( this.loadMapScene );   
                break;
        }
    }

    initSpeakAnimation( type: SceneAnimationType ): void {
        const model = type === SceneAnimationType.speak ? this.model as SpeakScene : this.model as SpeakYesNoScene;
        const sprite = this.getAnimationSprite();
        setNewBubble( { x: sprite.x, y: sprite.y }, this.model, type, model.sfx ?? sprite.sfx ?? "medium-text-blip.ogg" );
        if ( sprite.animationType != AnimationTypeEnum.animationLoop ) {
            initializeSpriteAnimation( sprite, "TALK", { looped: true, loops: 0 } );
        }
    }

    initEmoteAnimation(): void {
        this.counter = new Counter( 1000 );
        setNewEmote( { x: this.activeSprite.x, y: this.activeSprite.y }, this.emoteScene.src )
    }

    initMoveAnimation( sceneModel: MoveScene ): void {
        const sprite = this.getSpriteById();

        if ( typeof sceneModel.destination === 'string' || sceneModel.destination instanceof String ) {
            const targetSprite = this.getSpriteByName( sceneModel.destination as string );             
            const cells = [
                initGridCellModel( targetSprite.column, targetSprite.row - 1 ),
                initGridCellModel( targetSprite.column - 1, targetSprite.row ),
                initGridCellModel( targetSprite.column + 1, targetSprite.row ),
                initGridCellModel( targetSprite.column, targetSprite.row + 1 ),
            ].filter((cell): boolean =>{ 
                const tileB = globals.GAME.BACK.getTileAtCell( cell.column, cell.row )
                const tileF = globals.GAME.FRONT.getTileAtCell( cell.column, cell.row )
                return !tileB.isBlocked && !globals.GAME.FRONT.tileHasBlockingSprite(tileF.index);
            });

            sceneModel.destination = getClosestCell( sprite, cells );
        }

        initializeSpriteMovement( sprite, sceneModel.destination );
    }

    initAnimationAnimation( sceneModel: AnimateSpriteScene ): void {
        const sprite = this.getSpriteById();
        initializeSpriteAnimation( sprite, sceneModel.animationName, { looped: sceneModel.loop, loops: 0 } );
    }

    initCreateCarAnimation( sceneModel: CreateCarScene ): void {
        let road = globals.GAME.FRONT.roadNetwork.roads.filter( ( e ) => { return e.model.name == sceneModel.roadName } )[0];
        let startCell = road.getRoadStartPosition();
        let model = initCanvasObjectModel( {
            column: startCell.column, row: startCell.row,
            type: sceneModel.sprite, name: sceneModel.spriteName,
            direction: road.model.direction
        } );
        this.spriteId = globals.GAME.FRONT.getTileAndSetSprite( model );
    }

    initCreateSpriteAnimation( sceneModel: CreateSpriteScene ): void {
        if ( sceneModel.spriteName == PLAYER_NAME ) {
            let position: CellPosition = {
                column: sceneModel.column,
                row: sceneModel.row,
                direction: sceneModel.direction
            };
            globals.GAME.FRONT.initPlayerCharacter( position, MAIN_CHARACTER );
            this.spriteId = PLAYER_ID;
        }
        else {
            const model: CanvasObjectModel = initCanvasObjectModel( {
                type: sceneModel.sprite, direction: sceneModel.direction,
                row: sceneModel.row, column: sceneModel.column, name: sceneModel.spriteName
            } );
            this.spriteId = globals.GAME.FRONT.getTileAndSetSprite( model );
        }
    }

    unsetSpriteAnimation(): void {
        const sprite = this.getAnimationSprite();
        if ( spriteHasAnimation( sprite.spriteId ) && !this.animationScene.isPermanent ) {
            destroySpriteAnimation( sprite );
        }
    }

    getSpriteByName( name: string = this.speakScene.spriteName ): Sprite {
        return globals.GAME.FRONT.allSprites.filter( ( e ) => { return e.name == name;} )[0];
    }

    getSpriteById( id: string = this.spriteId ): Sprite {
        return globals.GAME.FRONT.spriteDictionary[id];
    }
    
    setSelection( selection: InteractionAnswer ): void {
        this.selection = selection;
    }

    getAnimationSprite() : Sprite {
        return this.spriteId != undefined ? this.getSpriteById() : this.getSpriteByName();
    }
} 