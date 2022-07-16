import globals from "../game-data/globals";
import type { QuestModel } from "../models/QuestModel";
import { getQuestByTrigger, getQuestByKey } from "../resources/questResources";

const completedQuestKeys: string[] = [];
const activeQuestKeys: { [key: string]: string } = {};
let newQuestText: string = "";
let activeQuests: Quest[] = [];

export const getNewQuestText = ( ): string => {
    return newQuestText;
}

export const checkForQuestTrigger = ( interactionKey: string ) : void => {
    activeQuests.forEach( (activeQuest: Quest): void =>{
        if ( activeQuest.hasStepKey(interactionKey) ) {
            activeQuest.activateStep(interactionKey);
            activeQuestKeys[activeQuest.model.key] = interactionKey;
        }
        else if ( activeQuest.model.endTrigger == interactionKey ) {
            completedQuestKeys.push( activeQuest.model.key );
            activeQuests = activeQuests.filter( ( e ) => { return e.model.key != activeQuest.model.key })
            delete activeQuestKeys[activeQuest.model.key];
            activeQuest.completeQuest( );
        }
    })

    const quest = getQuestByTrigger( interactionKey );
    if ( quest != undefined ) {
        activeQuestKeys[quest.key] = interactionKey;
        activeQuests.push( new Quest( quest, true, interactionKey ) );
    }
}

export const initQuestsFromQuestKeyObjects = ( keyObjects: { [key: string]: string }[] ): void => {
    Object.keys( keyObjects ).forEach( ( key: string ): void=>{
        const questData = getQuestByKey(key);
        const newQuest = new Quest( questData, false, "" );
        activeQuests.push( newQuest );
        activeQuestKeys[key] = keyObjects[key];
    })
}

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
        this.activateStep(interactionKey);
        if( isNew ) {
            this.displayQuestText("{O}New {O}quest: ");
        }
    }

    get description(): string { return this.model.steps[this.activeStepKey] }

    activateStep( interactionKey: string ): void {
        this.activeStepKey = interactionKey;
    }

    hasStepKey( interactionKey: string ): boolean {
        return Object.keys( this.model.steps ).filter((e)=>{return e == interactionKey;}).length > 0;
    }

    displayQuestText( label: string ): void {
        globals.GAME.speechBubbleController.setNewSubtitleBubble( {text: label + this.model.name} );
        globals.GAME.sound.playEffect( 'misc/menu-select.mp3' );
        setTimeout(()=>{
            globals.GAME.speechBubbleController.clearSubtitleBubble( );
        }, 5000);
    }

    completeQuest( ): void {
        this.activeStepKey = "";
        this.displayQuestText("{G}Completed ")
    }
}