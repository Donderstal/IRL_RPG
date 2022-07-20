import type { QuestModel } from "../models/QuestModel";
import { LOGGABLE_INTERACTION_1, LOGGABLE_INTERACTION_2, LOGGABLE_INTERACTION_3, LOGGABLE_INTERACTION_4, LOGGABLE_INTERACTION_7 } from "../game-data/interactionGlobals";

const Q1_A_CASE_OF_THE_MONDAYS_KEY = "Q1_A_CASE_OF_THE_MONDAYS"
const Q1_A_CASE_OF_THE_MONDAYS: QuestModel = {
    name: "A case of the mondays...",
    key: Q1_A_CASE_OF_THE_MONDAYS_KEY,
    trigger: LOGGABLE_INTERACTION_1,
    steps: {
        [LOGGABLE_INTERACTION_1]: "Your workday hasn't even started yet and it's a disaster already! Better get to the {R}Yum {R}Mart in the {G}south of the neighboorhood to see what's up.",
        [LOGGABLE_INTERACTION_2]: "Some weird meatheads are blocking entry to the Yum Mart. They told you to talk to their boss {R}Big {R}Bubba, but have no idea where he is."
    },
    endTrigger: LOGGABLE_INTERACTION_3
}

const Q2_LIFTING_UP_A_BRO_KEY = "Q2_LIFTING_UP_A_BRO" 
const Q2_LIFTING_UP_A_BRO: QuestModel = {
    name: "Lifting up a bro",
    key: Q2_LIFTING_UP_A_BRO_KEY,
    trigger: LOGGABLE_INTERACTION_4,
    steps: {
        [LOGGABLE_INTERACTION_4]: "A muscled man has begged you for help! Ask the bros around town for {R}dumbbells for his crying friend. You can recognize them easily, they're always {G}working {G}out!"
    },
    endTrigger: LOGGABLE_INTERACTION_7
}

const quests = [
    Q1_A_CASE_OF_THE_MONDAYS, Q2_LIFTING_UP_A_BRO
]

export const getQuestByTrigger = ( trigger ) => {
    return quests.filter((e)=>{return e.trigger == trigger;})[0];
}

export const getQuestByKey = ( key ) => {
    return quests.filter((e)=>{return e.key == key;})[0];
}