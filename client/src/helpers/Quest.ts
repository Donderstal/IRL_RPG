import { registerNewContract } from "../contracts/contractRegistry";
import { getShowSubtitleBubbleContract } from "../factories/contractFactory";
import type { QuestModel } from "../models/QuestModel";

export
    class Quest {
    model: QuestModel;
    activeStepKey: string;
    constructor(
        data: { name: string, key: string, trigger: string, steps: { [key: string]: string }, endTrigger: string },
        isNew: boolean, interactionKey: string ) {
        this.model = {
            name: data.name,
            key: data.key,
            trigger: data.trigger,
            steps: data.steps,
            endTrigger: data.endTrigger
        }
        this.activeStepKey = "";
        this.activateStep( interactionKey );
        if ( isNew ) {
            this.displayQuestText( "{O}New {O}quest: " );
        }
    }

    get description(): string { return this.model.steps[this.activeStepKey] }

    activateStep( interactionKey: string ): void {
        this.activeStepKey = interactionKey;
    }

    hasStepKey( interactionKey: string ): boolean {
        return Object.keys( this.model.steps ).filter( ( e ) => { return e == interactionKey; } ).length > 0;
    }

    displayQuestText( label: string ): void {
        const contract = getShowSubtitleBubbleContract( label + this.model.name );
        registerNewContract( contract );
    }

    completeQuest(): void {
        this.activeStepKey = "";
        this.displayQuestText( "{G}Completed " )
    }
}