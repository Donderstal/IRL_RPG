import type { InteractionModel } from "../../../models/InteractionModel";
import { InteractionAnswer } from "../../../enumerables/InteractionAnswer";
import { Hitbox } from "../../core/Hitbox";
import globals, { GRID_BLOCK_PX } from "../../../game-data/globals";
import { conditionIsTrue } from "../../../helpers/conditionalHelper";
import type { Sprite } from "../../core/Sprite";
import { InteractionType } from "../../../enumerables/InteractionType";
import { CinematicTrigger } from "../../../enumerables/CinematicTriggerEnum";
import { getSpriteDestination, spriteHasMovement } from "../../modules/spriteMovementModule";
import { getSpriteById } from "../../controllers/spriteController";

export class ActionSelector extends Hitbox {
    activeAction: InteractionModel;
    spriteId: string;
    conditionalActions: InteractionModel[];
    idList: string[];
    arcColor: string;
    trigger: CinematicTrigger;
    registeredSelection: InteractionAnswer;
    confirmingAction: boolean;
    wasMoving: boolean;
    constructor( x, y, actionList: InteractionModel[], spriteId = null ) {
        super( x, y, GRID_BLOCK_PX / 2 );
        this.spriteId = spriteId;
        this.conditionalActions = actionList;
        this.trigger = CinematicTrigger.interaction;
        this.arcColor = "#FF0000";
        this.registeredSelection = null;
        this.confirmingAction = false;
        this.wasMoving = false;
        this.checkForConditions();
    }

    get meetsCondition(): boolean { return conditionIsTrue( this.activeAction.condition.type, this.activeAction.condition.value ) }
    get needsConfirmation(): boolean { return this.activeAction.type != InteractionType.talk; }
    get actionSprite(): Sprite { return getSpriteById( this.spriteId );; }
    get isCollectable(): boolean { return this.actionSprite.model.isCollectable; }

    updateXy( x: number, y: number ): void {
        this.checkForConditions( );
        super.updateXy( x, y );
    }

    checkForConditions(): void {
        for( var i = 0; i < this.conditionalActions.length; i++ ) {
            let currentAction = this.conditionalActions[i];
            if ( conditionIsTrue( currentAction.condition.type, currentAction.condition.value ) ) {
                this.activeAction = currentAction;
                return;
            }
        }
    }

    handle(): void {
        if ( spriteHasMovement( this.spriteId ) ) {
            this.actionSprite.deactivateMovementModule();
        }
        if ( !globals.GAME.story.checkForEventTrigger( this.trigger, [this.spriteId] ) ) {
            globals.GAME.setActiveCinematic(
                this.activeAction, this.trigger, [this.spriteId]
            );
            if ( this.isCollectable ) {
                const id = globals.GAME.collectableRegistry.getCollectableId( this.actionSprite.column, this.actionSprite.row, ( this.actionSprite as any ).collectableType, globals.GAME.activeMapName )
                globals.GAME.collectableRegistry.addToRegistry( id, ( this.actionSprite as any ).collectableType )
            }
        }
    }

    confirm(): void {
        this.confirmingAction = true;
    }

    dismiss(): void {
        if ( spriteHasMovement( this.spriteId ) ) {
            const destination = getSpriteDestination( this.spriteId );
            destination.setPath( this.actionSprite );
            this.actionSprite.activateMovementModule( destination.currentStep.direction );
        }

        if ( this.needsConfirmation && this.registeredSelection == InteractionAnswer.yes && !this.confirmingAction ) {
            this.confirm();
        }
        else {
            this.resetAction();
        }
    }

    registerSelection( selection: InteractionAnswer ): void {
        this.registeredSelection = selection;
    }

    resetAction(): void {
        this.confirmingAction = false;
        this.checkForConditions();
    }
}