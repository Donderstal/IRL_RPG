import type { QuestModel } from "../models/QuestModel";
import { IKEY_CAR_SHACK_1, IKEY_CAR_SHACK_2, IKEY_CAR_SHACK_3, LOGGABLE_INTERACTION_1, LOGGABLE_INTERACTION_2, LOGGABLE_INTERACTION_3, LOGGABLE_INTERACTION_4, LOGGABLE_INTERACTION_7, UNLOCK_DOOR_TEST } from "../game-data/interactionGlobals";

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
    trigger: UNLOCK_DOOR_TEST,
    steps: {
        [UNLOCK_DOOR_TEST]: "A muscled man has begged you for help! Ask the bros around town for {R}dumbbells for his crying friend. You can recognize them easily, they're always {G}working {G}out!"
    },
    endTrigger: "BRO"
}

const Q3_CAR_SHACK_1_KEY = "Q3_CAR_SHACK_1"
const Q3_CAR_SHACK_1: QuestModel = {
    name: "A robot stole my wrench",
    key: Q3_CAR_SHACK_1_KEY,
    trigger: IKEY_CAR_SHACK_1,
    steps: {
        [IKEY_CAR_SHACK_1]: "A robot tricked the guys of the {G}Car {G}Shack and {R}stole {R}their {R}equipment! {G}Clint overheard that the bot lives somewhere in the {G}Sardine {G}Studios.",
        [IKEY_CAR_SHACK_2]: "Busted! You found the thieving bot's appartment! Better go back to the {G}Car {G}Shack and tell {G}Clint."
    },
    endTrigger: IKEY_CAR_SHACK_3
}

const quests = [
    Q1_A_CASE_OF_THE_MONDAYS, Q2_LIFTING_UP_A_BRO, Q3_CAR_SHACK_1
]

export const getQuestByTrigger = ( trigger ) => {
    return quests.filter((e)=>{return e.trigger == trigger;})[0];
}

export const getQuestByKey = ( key ) => {
    return quests.filter((e)=>{return e.key == key;})[0];
}