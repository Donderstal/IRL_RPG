import type { InteractionModel } from "../../../models/InteractionModel";
import { InteractionAnswer } from "../../../enumerables/InteractionAnswer";
import { Hitbox } from "../../core/Hitbox";
import { conditionIsTrue } from "../../../helpers/conditionalHelper";
import { InteractionType } from "../../../enumerables/InteractionType";
import { CinematicTrigger } from "../../../enumerables/CinematicTriggerEnum";
import type { FrameModel } from "../../../models/SpriteFrameModel";

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
    constructor( frame: FrameModel, actionList: InteractionModel[], spriteId = null ) {
        super( frame );
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

    confirm(): void {
        this.confirmingAction = true;
    }

    dismiss(): void {
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