import globals from '../../../game-data/globals';
import { Hitbox } from '../../core/Hitbox';
import { Interaction } from '../../cutscenes/Interaction';
import { conditionIsTrue } from "../../../helpers/conditionalHelper";
import { addEventToRegistry } from '../../../helpers/interactionRegistry';
import { CinematicTrigger } from '../../../enumerables/CinematicTriggerEnum';
import { InteractionAnswer } from '../../../enumerables/InteractionAnswer';
import type { ConditionModel } from '../../../models/ConditionModel';
import type { InteractionModel } from '../../../models/InteractionModel';
import { InteractionType } from '../../../enumerables/InteractionType';
import { SceneAnimationType } from '../../../enumerables/SceneAnimationTypeEnum';
import type { Sprite } from '../../core/Sprite';
import type { CinematicSceneModel } from '../../../models/CinematicSceneModel';
/**
 * A Mapaction is a Hitbox extension that has an event tied to it.
 * If the player is in the action range of the MapAction and hits space, the event is triggered.
 */
export class MapAction extends Hitbox {
    arcColor: string;
    spriteId: string;
    trigger: CinematicTrigger;
    registeredSelection: InteractionAnswer;
    confirmingAction: boolean;
    condition: ConditionModel;
    idList: string[];
    model: InteractionModel;
    constructor ( x: number, y: number, action: InteractionModel, spriteId: string = null, condition: ConditionModel = null ) {
        super( x, y, globals.GRID_BLOCK_PX / 2 )
        this.model      = action;
        this.arcColor   = "#FF0000";
        this.spriteId   = spriteId;
        this.trigger    = CinematicTrigger.interaction;
        this.registeredSelection = null;
        this.confirmingAction    = false;

        this.setScenesNameAndSfx( );
        if ( condition != null ) {
            this.condition = condition;
        }
    }
    get meetsCondition(): boolean { return conditionIsTrue( this.condition.type, this.condition.value ) }
    get needsConfirmation(): boolean { return this.model.type != InteractionType.talk; }
    get actionSprite( ): Sprite { return globals.GAME.FRONT.spriteDictionary[this.spriteId]; }
    get isCollectable(): boolean { return this.actionSprite.hasOwnProperty("collectableType"); }

    setScenesNameAndSfx( ): void {
        if ( this.model.cinematic.scenes ) {
            this.checkPropsForScenes( this.model.cinematic.scenes );
        }
    }

    checkPropsForScenes( scenes: CinematicSceneModel[] ): void {
        scenes.forEach( ( x: CinematicSceneModel ) => {
            x.forEach( ( e: any ) => {
                if ( e.spriteName != undefined && e.type != SceneAnimationType.fadeIn && e.type != SceneAnimationType.fadeOut
                    && e.type != SceneAnimationType.fadeOutIn && e.type != SceneAnimationType.wait ) {
                    e.spriteName = this.actionSprite.name;
                    e.spriteId = this.spriteId;
                }
                if ( !e.sfx && e.type != SceneAnimationType.wait ) {
                    e.sfx = this.model.cinematic.sfx;
                }
                if ( e.pathNo ) {
                    this.checkPropsForScenes( e.pathNo )
                }
                if ( e.pathYes ) {
                    this.checkPropsForScenes( e.pathYes )
                }
            } )
        } )
    }

    handle( ): void { 
        if ( !globals.GAME.story.checkForEventTrigger( this.trigger, [this.spriteId] ) ) {
            new Interaction( this.model, this.trigger, [ this.spriteId ] );
            if ( this.isCollectable ) {
                const id = globals.GAME.collectableRegistry.getCollectableId( this.actionSprite.column, this.actionSprite.row, (this.actionSprite as any).collectableType, globals.GAME.activeMapName)
                globals.GAME.collectableRegistry.addToRegistry( id, ( this.actionSprite as any ).collectableType)
            }
        }
    }

    confirm( ): void {
        this.confirmingAction = true;
    }

    dismiss(): void {
        if ( this.needsConfirmation && this.registeredSelection == InteractionAnswer.yes && !this.confirmingAction ) {
            this.confirm( )
        }
        else {
            this.resetAction( );   
        }
    }

    registerSelection( selection: InteractionAnswer ): void {
        this.registeredSelection = selection;
    }

    addEventToRegistry(): void {
        if ( this.model.shouldBeRegistered && this.registeredSelection ) {
            addEventToRegistry( this.model.registryKey, this.registeredSelection )   
        }
        else if ( this.model.shouldBeRegistered ) {
            addEventToRegistry( this.model.registryKey )   
        }
    }

    healPlayerPartyOnRest(): void {
        globals.GAME.party.fullHealParty( );
    }

    resetAction(): void {
        this.addEventToRegistry( ); 
        globals.GAME.activeAction = null;
        this.confirmingAction = false;
    }
}