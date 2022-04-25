const globals = require("../game-data/globals");
const { getQuestByTrigger, getQuestByKey } = require("../resources/questResources");

let completedQuestKeys = [];
let activeQuestKeys = {};
let activeQuests = [];
let newQuestText = false;

const getNewQuestText = ( ) => {
    return newQuestText;
}

const checkForQuestTrigger = ( interactionKey ) => {
    activeQuests.forEach((activeQuest)=>{
        if ( activeQuest.hasStepKey(interactionKey) ) {
            activeQuest.activateStep(interactionKey);
            activeQuestKeys[activeQuest.key] = interactionKey;
        }
        else if ( activeQuest.endTrigger == interactionKey ) {
            completedQuestKeys.push( activeQuest.key );
            activeQuests = activeQuests.filter((e)=>{ return e.key != activeQuest.key })
            delete activeQuestKeys[activeQuest.key];
            activeQuest.completeQuest( );
        }
    })

    const quest = getQuestByTrigger( interactionKey );
    if ( quest != undefined ) {
        activeQuestKeys[quest.key] = interactionKey;
        activeQuests.push( new Quest( quest, true, interactionKey ) );
    }
}

const initQuestsFromQuestKeyObjects = ( keyObjects ) => {
    Object.keys( keyObjects ).forEach((key)=>{
        const questData = getQuestByKey(key);
        const newQuest = new Quest( questData, false, interactionKey );
        activeQuests.push( newQuest );
        activeQuestKeys[key] = keyObjects[key];
    })
}

class Quest {
    constructor( data, isNew, interactionKey ) {
        Object.keys(data).forEach((key) =>{
            this[key] = data[key]
        })
        this.activateStep(interactionKey);
        if( isNew ) {
            this.displayQuestText("{O}New {O}quest: ");
        }
    }

    get description() { return this.steps[this.activeStepKey] }

    activateStep( interactionKey ) {
        this.activeStepKey = interactionKey;
    }

    hasStepKey( interactionKey ) {
        return Object.keys( this.steps ).filter((e)=>{return e == interactionKey;}).length > 0;
    }

    displayQuestText( label ) {
        globals.GAME.speechBubbleController.setNewSubtitleBubble( {text: label + this.name} );
        globals.GAME.sound.playEffect( 'misc/menu-select.mp3' );
        setTimeout(()=>{
            globals.GAME.speechBubbleController.clearSubtitleBubble( );
        }, 5000);
    }

    completeQuest( ) {
        this.activeStepKey = false;
        this.displayQuestText("{G}Completed ")
    }
}

module.exports = {
    checkForQuestTrigger,
    initQuestsFromQuestKeyObjects,
    getNewQuestText
}