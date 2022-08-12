import { getQuestByTrigger, getQuestByKey } from "../resources/questResources";
import { Quest } from "./Quest";

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