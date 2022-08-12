import globals from "../game-data/globals";
import { clearSubtitleBubble, setNewSubtitleBubble } from "../game/controllers/bubbleController";
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
        setNewSubtitleBubble( { text: label + this.model.name } );
        globals.GAME.sound.playEffect( 'misc/menu-select.mp3' );
        setTimeout( () => {
            clearSubtitleBubble();
        }, 5000 );
    }

    completeQuest(): void {
        this.activeStepKey = "";
        this.displayQuestText( "{G}Completed " )
    }
}