import { CinematicTrigger } from "../enumerables/CinematicTriggerEnum";
import { ConditionType } from "../enumerables/ConditionTypeEnum";
import { DirectionEnum } from "../enumerables/DirectionEnum";
import { InteractionType } from "../enumerables/InteractionType";
import { SceneAnimationType } from "../enumerables/SceneAnimationTypeEnum";

import {
    PLAYER_NAME, LOGGABLE_INTERACTION_1, LOGGABLE_INTERACTION_2, LOGGABLE_INTERACTION_4,
    LOGGABLE_INTERACTION_5, LOGGABLE_INTERACTION_6, LOGGABLE_INTERACTION_7
} from '../game-data/interactionGlobals';
import {
    EMOTE_HEART, EMOTE_SAD, EMOTE_SURPRISED, EMOTE_HAPPY, EMOTE_QUESTIONMARK
} from '../game-data/textboxGlobals';
import { initInteractionModel } from "../helpers/modelFactory";
import type { StoryEventModel } from "../models/StoryEventModel";
import { FAT_BUFF_GUY, GRANNY, MAIN_CHARACTER } from "./spriteTypeResources";

export const KEY_STORY_1 = "KEY_STORY_EVENT_1";
export const KEY_STORY_2 = "KEY_STORY_EVENT_2";
export const KEY_STORY_3 = "KEY_STORY_EVENT_3"

const DANCING_GRANNY_SPRITE = "Dancing granny";
const MAIN_CHAR_FRIEND_SPRITE = "Bob";
const THUG_A = "Thug A";
const THUG_B = "Thug B";
const WHOLESOME_LIFTER = "Wholesome lifter";
const HELPFUL_BRO = "Helpful bro";
const SAD_BRO = "Sad bro";

export const STORY_EVENTS = [
    //{
    //    id: "",
    //    mapName: "leonard_heights/Newtown-appartment-3",
    //    trigger: CinematicTrigger.enter,
    //    interaction: [[
    //        InteractionType.talk, false, null, "medium-text-blip.ogg", 
    //        [ConditionType.default, false],
    //        [
    //            [[SceneAnimationType.fadeOut, true]],
    //            [[SceneAnimationType.loadMap, true, "leonard_heights/B2"]],
    //            [[SceneAnimationType.createCar, true, "bus", "CIN_CAR_BUS", "CIN_ROAD_1"]],
    //            [[SceneAnimationType.createSprite, true, DirectionEnum.right, GRANNY, DANCING_GRANNY_SPRITE, 15, 11]],
    //            [[SceneAnimationType.animation, false, "LEFT_AND_RIGHT_STEP", DANCING_GRANNY_SPRITE, true, true]],
    //            [[SceneAnimationType.cameraMoveToSprite, true, "CIN_CAR_BUS", true]],
    //            [[SceneAnimationType.fadeIn, true]],
    //            [[SceneAnimationType.move, true, "CIN_CAR_BUS", { column: 13, row: 0 }]],
    //            [[SceneAnimationType.fadeOut, true]],
    //            [[SceneAnimationType.loadMap, true, "leonard_heights/B1"]],
    //            [[SceneAnimationType.createSprite, true, DirectionEnum.right, MAIN_CHARACTER, PLAYER_NAME, 15, 14], [SceneAnimationType.createSprite, true, DirectionEnum.left, FAT_BUFF_GUY, MAIN_CHAR_FRIEND_SPRITE, 16, 14], [SceneAnimationType.createSprite, true, DirectionEnum.up, "bus", "My cool car", 13, 13]],
    //            [[SceneAnimationType.cameraMoveToSprite, true, PLAYER_NAME, true]],
    //            [[SceneAnimationType.fadeIn, true]],
    //            [[SceneAnimationType.speak, true, "Was good hanging out with you!", PLAYER_NAME], [SceneAnimationType.emote, false, EMOTE_HAPPY, MAIN_CHAR_FRIEND_SPRITE]],
    //            [[SceneAnimationType.speak, true, "Yeah for sure. See you at work at the {G}Yum {G}Mart later!", MAIN_CHAR_FRIEND_SPRITE], [SceneAnimationType.cameraMoveToSprite, true, MAIN_CHAR_FRIEND_SPRITE, false], [SceneAnimationType.emote, false, EMOTE_HAPPY, PLAYER_NAME]],
    //            [[SceneAnimationType.move, true, PLAYER_NAME, { column: 15, row: 17 }], [SceneAnimationType.cameraMoveToSprite, false, PLAYER_NAME, false]],
    //            [[SceneAnimationType.fadeOut, true]],
    //            [[SceneAnimationType.loadMap, true, "leonard_heights/B2"]],
    //            [[SceneAnimationType.createSprite, true, DirectionEnum.down, MAIN_CHARACTER, PLAYER_NAME, 15, 0]],
    //            [[SceneAnimationType.createSprite, true, DirectionEnum.right, GRANNY, DANCING_GRANNY_SPRITE, 15, 11]],
    //            [[SceneAnimationType.animation, false, "LEFT_AND_RIGHT_STEP", DANCING_GRANNY_SPRITE, true, true]],
    //            [[SceneAnimationType.cameraMoveToSprite, true, PLAYER_NAME, true]],
    //            [[SceneAnimationType.move, true, PLAYER_NAME, { column: 25, row: 10 }], [SceneAnimationType.fadeIn, false]],
    //            [[SceneAnimationType.fadeOut, true]],
    //            [[SceneAnimationType.loadMap, true, "leonard_heights/C2"]],
    //            [[SceneAnimationType.createSprite, true, DirectionEnum.right, MAIN_CHARACTER, PLAYER_NAME, 1, 10]],
    //            [[SceneAnimationType.cameraMoveToSprite, true, PLAYER_NAME, true]],
    //            [[SceneAnimationType.fadeIn, true]],
    //            [[SceneAnimationType.speak, true, "I'm almost back home, can't wait to get some cold Diet Betes before my shift begins!", PLAYER_NAME]],
    //            [[SceneAnimationType.move, true, PLAYER_NAME, { column: 12, row: 9 }]],
    //            //[[SceneAnimationType.fadeOut, true]],
    //            //[[SceneAnimationType.loadMap, true, "leonard_heights/Newtown-appartment-3", true, { column: 3, row: 4 }]],
    //            //[[SceneAnimationType.fadeIn, true]],
    //            //[[SceneAnimationType.speak, true, "Let's get to work now!", PLAYER_NAME]]
    //        ]
    //    ]]
    //},
    {
        id: "",
        mapName: "leonard_heights/leonard_heights",
        trigger: CinematicTrigger.enter,
        interaction: [[
            InteractionType.talk, true, LOGGABLE_INTERACTION_1, "medium-text-blip.ogg", 
            [ConditionType.default, false],
            [
                [[SceneAnimationType.createSprite, true, DirectionEnum.left, FAT_BUFF_GUY, MAIN_CHAR_FRIEND_SPRITE, 24, 10]],
                [[SceneAnimationType.cameraMoveToSprite, true, MAIN_CHAR_FRIEND_SPRITE, false], [SceneAnimationType.move, true, MAIN_CHAR_FRIEND_SPRITE, PLAYER_NAME]],
                [[SceneAnimationType.speak, true, "I heard there was some trouble at the {G}Yum {G}Mart down {R}south...", MAIN_CHAR_FRIEND_SPRITE], [SceneAnimationType.emote, true, EMOTE_SURPRISED, PLAYER_NAME]],
                [[SceneAnimationType.cameraMoveToSprite, true, PLAYER_NAME, false], [SceneAnimationType.speak, true, "Oh no, I better get down there fast!", PLAYER_NAME], [SceneAnimationType.move, false, MAIN_CHAR_FRIEND_SPRITE, { column: 0, row: 10 }]]
            ]
        ]]
    },
    {
        id: "",
        mapName: "leonard_heights/E3",
        trigger: CinematicTrigger.enter,
        interaction: [[
            InteractionType.talk, false, null, "medium-text-blip.ogg", 
            [ConditionType.default, false],
            [
                [[SceneAnimationType.speak, true, "I hate the hotel on this street, it's always full of trashy tourists", PLAYER_NAME]]
            ]
        ]]
    },
    {
        id: "",
        mapName: "leonard_heights/Newtown-appartment-4",
        trigger: CinematicTrigger.position,
        position: {
            row: null,
            column: 3,
            direction: DirectionEnum.right
        },
        interaction: [[
            InteractionType.talk, true, KEY_STORY_1, "medium-text-blip.ogg", 
            [ConditionType.default, false],
            [ 
                [[SceneAnimationType.speak, true, "There's just something creepy about an empty appartment...", PLAYER_NAME]]
            ]
        ]]
    },
    {
        id: "",
        mapName: "leonard_heights/C4",
        trigger: CinematicTrigger.enter,
        interaction: [[
            InteractionType.talk, true, LOGGABLE_INTERACTION_2, "medium-text-blip.ogg",
            [ConditionType.default, false],
            [
                [[SceneAnimationType.speak, true, "There's something wrong here, I can feel it...", PLAYER_NAME], [SceneAnimationType.cameraMoveToSprite, true, PLAYER_NAME, false]],
                [[SceneAnimationType.speak, true, "I love being a thug, it's my dream job", THUG_A, THUG_B], [SceneAnimationType.cameraMoveToSprite, true, THUG_A, false], [SceneAnimationType.move, true, PLAYER_NAME, { column: 19, row: 9 }]],
                [[SceneAnimationType.speak, true, "Yeah, my liberal arts degree is really paying off..", THUG_B, THUG_A], [SceneAnimationType.cameraMoveToSprite, true, THUG_B, false]],
                [[SceneAnimationType.speak, true, "Who are you guys and what the hell are you doing here??", PLAYER_NAME, THUG_A], [SceneAnimationType.cameraMoveToSprite, true, PLAYER_NAME, false]],
                [[SceneAnimationType.speak, true, "We're here to keep nosy morons like you out.", THUG_A, PLAYER_NAME], [SceneAnimationType.cameraMoveToSprite, true, THUG_A, false]],
                [[SceneAnimationType.speak, true, "Yeah, piss off you wanker!", THUG_B, PLAYER_NAME], [SceneAnimationType.cameraMoveToSprite, true, THUG_B, false]],
                [[SceneAnimationType.speak, true, "You guys have got to be kidding me...", PLAYER_NAME], [SceneAnimationType.cameraMoveToSprite, true, PLAYER_NAME, false]],
                [[SceneAnimationType.speak, true, "You wanker, why don't you piss off!!", THUG_B], [SceneAnimationType.cameraMoveToSprite, true, THUG_B, false]],
                [[SceneAnimationType.speak, true, "You're repeating yourself, Bob...", THUG_A], [SceneAnimationType.cameraMoveToSprite, true, THUG_A, false]],
                [[SceneAnimationType.speak, true, "This has to be a joke right?", PLAYER_NAME], [SceneAnimationType.cameraMoveToSprite, true, PLAYER_NAME, false]],
                [[SceneAnimationType.speak, true, "You think we're taking a piss, wanker?", THUG_B], [SceneAnimationType.cameraMoveToSprite, true, THUG_B, false]],
                [[SceneAnimationType.speak, true, ".........", THUG_A], [SceneAnimationType.cameraMoveToSprite, true, THUG_A, false], [SceneAnimationType.emote, true, EMOTE_QUESTIONMARK, THUG_B]],
                [[SceneAnimationType.speak, true, "If you want in kid, you gotta speak to our {R}boss {R}Big {R}Bubba", THUG_A], [SceneAnimationType.cameraMoveToSprite, true, THUG_A, false]],
                [[SceneAnimationType.speak, true, "Where can I find him?", PLAYER_NAME], [SceneAnimationType.cameraMoveToSprite, true, PLAYER_NAME, false]],
                [[SceneAnimationType.speak, true, "He's a mob boss kid. You can't just walk into his office.", THUG_A], [SceneAnimationType.cameraMoveToSprite, true, THUG_A, false]],
                [[SceneAnimationType.speak, true, "Ask around or something. If you're a smart boy you'll find him!", THUG_B], [SceneAnimationType.cameraMoveToSprite, true, THUG_B, false]]
            ]
        ]]
    },
    {
        id: "",
        mapName: "leonard_heights/D1",
        trigger: CinematicTrigger.interaction,
        name: HELPFUL_BRO,
        interaction: [[
            InteractionType.talk, true, LOGGABLE_INTERACTION_4, "medium-text-blip.ogg", 
            [ConditionType.interactionNotRegistered, LOGGABLE_INTERACTION_4],
            [
                [[SceneAnimationType.speak, true, "What's going on over here?", PLAYER_NAME]],
                [[SceneAnimationType.speak, true, "My bro is having a real tough time bro...", HELPFUL_BRO, PLAYER_NAME], [SceneAnimationType.cameraMoveToSprite, true, HELPFUL_BRO, false]],
                [[SceneAnimationType.speak, true, "He used to be the fittest, the nicest, the sexiest bro in town.", HELPFUL_BRO]],
                [[SceneAnimationType.speak, true, "But then he had a fight with another bro and he threw away his dumbbells!", HELPFUL_BRO]],
                [[SceneAnimationType.speak, true, "Now he's a bro who can't pump iron...", HELPFUL_BRO], [SceneAnimationType.emote, false, EMOTE_SAD, SAD_BRO]],
                [[SceneAnimationType.speak, true, "That doesn't sound too bad, can't you just buy some new ones?", PLAYER_NAME], [SceneAnimationType.cameraMoveToSprite, true, PLAYER_NAME, false]],
                [[SceneAnimationType.speak, true, "He obviously has to do some emotional self care first bro! He can't buy new ones like this.", HELPFUL_BRO], [SceneAnimationType.cameraMoveToSprite, true, HELPFUL_BRO, false]],
                [[SceneAnimationType.speak, true, "And I can't do it either! I need to stay here to comfort him.", HELPFUL_BRO]],
                [[SceneAnimationType.speak, true, "Right...", PLAYER_NAME], [SceneAnimationType.cameraMoveToSprite, true, PLAYER_NAME, false]],
                [[SceneAnimationType.speak, true, "So we need you to help us out!", HELPFUL_BRO], [SceneAnimationType.cameraMoveToSprite, true, HELPFUL_BRO, false]],
                [[SceneAnimationType.speak, true, "Visit our bros around town and ask if they can spare a dumbbell!", HELPFUL_BRO]],
                [[SceneAnimationType.fadeOut, true]],
                [[SceneAnimationType.loadMap, true, "leonard_heights/B4", false]],
                [[SceneAnimationType.fadeIn, true], [SceneAnimationType.cameraMoveToSprite, true, WHOLESOME_LIFTER, true]],
                [[SceneAnimationType.wait, true, 1000]],
                [[SceneAnimationType.fadeOut, true]],
                [[SceneAnimationType.loadMap, true, "leonard_heights/E4", false]],
                [[SceneAnimationType.fadeIn, true], [SceneAnimationType.cameraMoveToSprite, true, WHOLESOME_LIFTER, true]],
                [[SceneAnimationType.wait, true, 1000]],
                [[SceneAnimationType.fadeOut, true]],
                [[SceneAnimationType.loadMap, true, "leonard_heights/D2", false]],
                [[SceneAnimationType.fadeIn, true], [SceneAnimationType.cameraMoveToSprite, true, WHOLESOME_LIFTER, true]],
                [[SceneAnimationType.wait, true, 1000]],
                [[SceneAnimationType.fadeOut, true]],
                [[SceneAnimationType.loadMap, true, "leonard_heights/D1", true], [SceneAnimationType.cameraMoveToSprite, true, PLAYER_NAME, true]],
                [[SceneAnimationType.fadeIn, true]],
                [[SceneAnimationType.speak, true, "But why would I go and...", PLAYER_NAME]],
                [[SceneAnimationType.speak, true, "Thank you SO much bro, you're a true king <3!", HELPFUL_BRO], [SceneAnimationType.cameraMoveToSprite, true, HELPFUL_BRO, false]],
                [[SceneAnimationType.speak, true, "You can recognize our bros easily, they're always pumping iron!", HELPFUL_BRO]],
                [[SceneAnimationType.speak, true, "No problem, I guess...", PLAYER_NAME], [SceneAnimationType.cameraMoveToSprite, true, PLAYER_NAME, false]],
                [[SceneAnimationType.speak, true, "Don't worry bro, we'll get you those dumbbells!", HELPFUL_BRO, SAD_BRO], [SceneAnimationType.cameraMoveToSprite, true, HELPFUL_BRO, false]]
            ]
        ]]
    },
    {
        id: "",
        mapName: "leonard_heights/D2",
        trigger: CinematicTrigger.interaction,
        name: WHOLESOME_LIFTER,
        interaction: [[
            InteractionType.talk, false, null, "medium-text-blip.ogg", 
            [ConditionType.interactionRegistered, LOGGABLE_INTERACTION_4],
            [
                [[SceneAnimationType.speak, true, "Are you one of those friendly lifter bros?", PLAYER_NAME]],
                [[SceneAnimationType.speak, true, "Woah dude, how did you know? Yeah, I roll with my bros, for sure!", WHOLESOME_LIFTER, PLAYER_NAME], [SceneAnimationType.cameraMoveToSprite, true, WHOLESOME_LIFTER, false]],
                [[SceneAnimationType.speak, true, "I don't know, could be the fact that you're out on the street working out.", PLAYER_NAME], [SceneAnimationType.cameraMoveToSprite, true, PLAYER_NAME, false]],
                [[SceneAnimationType.speak, true, "Oh yeah I guess that does kinda give it away, doesn't it?", WHOLESOME_LIFTER], [SceneAnimationType.cameraMoveToSprite, true, WHOLESOME_LIFTER, false]],
                [[SceneAnimationType.speak, true, "Anyway bro, what's up?", WHOLESOME_LIFTER]],
                [[SceneAnimationType.speak, true, "One of your friends is having a hard time. He lost his dumbbells.", PLAYER_NAME], [SceneAnimationType.cameraMoveToSprite, true, PLAYER_NAME, false]],
                [[SceneAnimationType.speak, true, "My god, for real bro? That's a cruel fate for a fit dude.", WHOLESOME_LIFTER], [SceneAnimationType.cameraMoveToSprite, true, WHOLESOME_LIFTER, false]],
                [[SceneAnimationType.speak, true, "Now he's a bro who can't pump iron...", WHOLESOME_LIFTER]],
                [[SceneAnimationType.speak, true, "Yeah that's exactly what the other bros said.", PLAYER_NAME], [SceneAnimationType.cameraMoveToSprite, true, PLAYER_NAME, false]],
                [[SceneAnimationType.speak, true, "Anyway, somehow they convinced me to get him new dumbbells. Do you have one to spare?", PLAYER_NAME]],
                [[SceneAnimationType.speak, true, "Nah dude, sorry. I just donated my spare dumbbells to Extinction Rebellion bruh!", WHOLESOME_LIFTER], [SceneAnimationType.cameraMoveToSprite, true, WHOLESOME_LIFTER, false]],
                [[SceneAnimationType.speak, true, "Why the hell would they need dumbbells?", PLAYER_NAME], [SceneAnimationType.cameraMoveToSprite, true, PLAYER_NAME, false]],
                [[SceneAnimationType.speak, true, "They're fighting climate change right? Now they can get buffed and kick climate changes' ass!", WHOLESOME_LIFTER], [SceneAnimationType.cameraMoveToSprite, true, WHOLESOME_LIFTER, false]],
                [[SceneAnimationType.speak, true, "Right...", PLAYER_NAME], [SceneAnimationType.cameraMoveToSprite, true, PLAYER_NAME, false]],
                [[SceneAnimationType.speak, true, "Good luck on your search bro!", WHOLESOME_LIFTER], [SceneAnimationType.cameraMoveToSprite, true, WHOLESOME_LIFTER, false]],
                [[SceneAnimationType.speak, true, "Thanks I guess!", PLAYER_NAME], [SceneAnimationType.cameraMoveToSprite, true, PLAYER_NAME, false]],
            ]

        ]]
    },
    {
        id: "",
        mapName: "leonard_heights/E4",
        trigger: CinematicTrigger.interaction,
        name: WHOLESOME_LIFTER,
        interaction: [[
            InteractionType.talk, true, LOGGABLE_INTERACTION_5, "medium-text-blip.ogg", 
            [ConditionType.interactionRegistered, LOGGABLE_INTERACTION_4],
            [
                [[SceneAnimationType.speak, true, "Are you one of those friendly lifter bros?", PLAYER_NAME]],
                [[SceneAnimationType.speak, true, "Yeah, for sure bro! I'm always lifting and being a bro.", WHOLESOME_LIFTER, PLAYER_NAME], [SceneAnimationType.cameraMoveToSprite, true, WHOLESOME_LIFTER, false]],
                [[SceneAnimationType.speak, true, "One of your friends is having a hard time. He lost his dumbbells.", PLAYER_NAME], [SceneAnimationType.cameraMoveToSprite, true, PLAYER_NAME, false]],
                [[SceneAnimationType.speak, true, "My god, for real bro? That's a cruel fate for a fit dude.", WHOLESOME_LIFTER], [SceneAnimationType.cameraMoveToSprite, true, WHOLESOME_LIFTER, false]],
                [[SceneAnimationType.speak, true, "Now he's a bro who can't pump iron...", WHOLESOME_LIFTER]],
                [[SceneAnimationType.speak, true, "Yeah that's exactly what the other bros said.", PLAYER_NAME], [SceneAnimationType.cameraMoveToSprite, true, PLAYER_NAME, false]],
                [[SceneAnimationType.speak, true, "Anyway, somehow they convinced me to get him new dumbbells. Do you have one to spare?", PLAYER_NAME]],
                [[SceneAnimationType.speak, true, "Well you're lucky bro. I've always got a spare dumbbell on me in case one of 'em breaks.", WHOLESOME_LIFTER], [SceneAnimationType.cameraMoveToSprite, true, WHOLESOME_LIFTER, false]],
                [[SceneAnimationType.speak, true, "Wow for real?!", PLAYER_NAME], [SceneAnimationType.cameraMoveToSprite, true, PLAYER_NAME, false]],
                [[SceneAnimationType.speak, true, "Yeah for real! Here, you can have it. Send some TLC to my crying bro when you see him!", WHOLESOME_LIFTER], [SceneAnimationType.cameraMoveToSprite, true, WHOLESOME_LIFTER, false]],
                [[SceneAnimationType.speak, true, "I'll tell the other bros about you. You're helping a bro, they'll be happy to help you now!", WHOLESOME_LIFTER]]
            ]
        ]]
    },
    {
        id: "",
        mapName: "leonard_heights/B4",
        trigger: CinematicTrigger.interaction,
        name: WHOLESOME_LIFTER,
        interaction: [[
            InteractionType.talk, true, LOGGABLE_INTERACTION_6, "medium-text-blip.ogg", 
            [ConditionType.interactionRegistered, LOGGABLE_INTERACTION_5],
            [
                [[SceneAnimationType.speak, true, "Are you one of those friendly lifter bros?", PLAYER_NAME], [SceneAnimationType.cameraMoveToSprite, true, PLAYER_NAME, false]],
                [[SceneAnimationType.speak, true, "Yeah, for sure bro! Though I'm the least friendly of them.", WHOLESOME_LIFTER, PLAYER_NAME], [SceneAnimationType.cameraMoveToSprite, true, WHOLESOME_LIFTER, false]],
                [[SceneAnimationType.speak, true, "One of your friends is having a hard time. He lost his dumbbells.", PLAYER_NAME], [SceneAnimationType.cameraMoveToSprite, true, PLAYER_NAME, false]],
                [[SceneAnimationType.speak, true, "My god, for real bro? That's a cruel fate for a fit dude.", WHOLESOME_LIFTER], [SceneAnimationType.cameraMoveToSprite, true, WHOLESOME_LIFTER, false]],
                [[SceneAnimationType.speak, true, "Now he's a bro who can't pump iron...", WHOLESOME_LIFTER]],
                [[SceneAnimationType.speak, true, "Yeah that's exactly what the other bros said.", PLAYER_NAME], [SceneAnimationType.cameraMoveToSprite, true, PLAYER_NAME, false]],
                [[SceneAnimationType.speak, true, "I heard about you bro. You're doing some good work you know that?", WHOLESOME_LIFTER], [SceneAnimationType.cameraMoveToSprite, true, WHOLESOME_LIFTER, false]],
                [[SceneAnimationType.speak, true, "I guess? I feel like I'm being pushed around though.", PLAYER_NAME], [SceneAnimationType.cameraMoveToSprite, true, PLAYER_NAME, false]],
                [[SceneAnimationType.speak, true, "Well I normally don't give away dumbbells. But my bros told me that you're a bro of us bros", WHOLESOME_LIFTER], [SceneAnimationType.cameraMoveToSprite, true, WHOLESOME_LIFTER, false]],
                [[SceneAnimationType.speak, true, "So here's my spare dumbbell! You better bring it to my bro fast so he can start lifting again!", WHOLESOME_LIFTER]],
                [[SceneAnimationType.speak, true, "Thanks bro you're the best!!", PLAYER_NAME], [SceneAnimationType.cameraMoveToSprite, true, PLAYER_NAME, false]],
                [[SceneAnimationType.speak, true, "Now I've got two dumbbells. Better get back to the park and give 'em to the bro there.", PLAYER_NAME]]
            ]
        ]]
    },
    {
        id: "",
        mapName: "leonard_heights/D1",
        trigger: CinematicTrigger.interaction,
        name: HELPFUL_BRO,
        interaction: [[
            InteractionType.talk, true, LOGGABLE_INTERACTION_7, "medium-text-blip.ogg", 
            [ConditionType.interactionRegistered, LOGGABLE_INTERACTION_6],
            [
                [[SceneAnimationType.speak, true, "We can't wait much longer bro, I can see his muscles shrinking!", HELPFUL_BRO, PLAYER_NAME], [SceneAnimationType.emote, false, EMOTE_SAD, SAD_BRO], [SceneAnimationType.cameraMoveToSprite, true, HELPFUL_BRO, false]],
                [[SceneAnimationType.speak, true, "Don't worry bros! I've got the dumbbells!", PLAYER_NAME], [SceneAnimationType.cameraMoveToSprite, true, PLAYER_NAME, false]],
                [[SceneAnimationType.speak, true, "Quick quick!! Give 'em to my man! He doesn't have much time left...", HELPFUL_BRO, SAD_BRO], [SceneAnimationType.cameraMoveToSprite, true, HELPFUL_BRO, false]],
                [[SceneAnimationType.move, true, PLAYER_NAME, SAD_BRO], [SceneAnimationType.cameraMoveToSprite, true, PLAYER_NAME, false]],
                [[SceneAnimationType.speak, true, "Here they are!", PLAYER_NAME, SAD_BRO]],
                [[SceneAnimationType.animation, false, "LIFT", SAD_BRO, true], [SceneAnimationType.speak, true, "Finally!!", SAD_BRO], [SceneAnimationType.cameraMoveToSprite, true, SAD_BRO, false]],
                [[SceneAnimationType.speak, true, "I can feel the power flowing back into my body!!", SAD_BRO]],
                [[SceneAnimationType.speak, true, "YEAH THAT'S MY BRO!!", HELPFUL_BRO], [SceneAnimationType.cameraMoveToSprite, true, HELPFUL_BRO, false]],
                [[SceneAnimationType.animation, false, "LIFT", HELPFUL_BRO, true], [SceneAnimationType.speak, true, "Imma lift with you in the most bromantic way!", HELPFUL_BRO]],
                [[SceneAnimationType.emote, true, EMOTE_HEART, HELPFUL_BRO], [SceneAnimationType.emote, true, EMOTE_HEART, SAD_BRO]],
                [[SceneAnimationType.speak, true, "I've never heard the word 'Bro' so many times in one day, I think", PLAYER_NAME], [SceneAnimationType.cameraMoveToSprite, true, PLAYER_NAME, false]],
                [[SceneAnimationType.speak, true, "Bro you are a true KING!", SAD_BRO], [SceneAnimationType.cameraMoveToSprite, true, SAD_BRO, false]],
                [[SceneAnimationType.speak, true, "Me and my boys will never forget this! If you ever need some muscled bros, we'll be there for you!", SAD_BRO]],
                [[SceneAnimationType.speak, true, "Yeah for sure! And don't forget to do some self care when you're feeling down, my bro.", HELPFUL_BRO], [SceneAnimationType.cameraMoveToSprite, true, HELPFUL_BRO, false]],
                [[SceneAnimationType.speak, true, "Damn right! My muscles may be hard like iron, my feelings are soft like a little puppy.", SAD_BRO], [SceneAnimationType.cameraMoveToSprite, true, SAD_BRO, false]],
                [[SceneAnimationType.emote, true, EMOTE_HEART, HELPFUL_BRO], [SceneAnimationType.emote, true, EMOTE_HEART, SAD_BRO]],
                [[SceneAnimationType.speak, true, "No problem bros, I'll remember you guys when I need some muscle!", PLAYER_NAME, SAD_BRO], [SceneAnimationType.cameraMoveToSprite, true, PLAYER_NAME, false]]
            ]
        ]]
    }
]

const assignEventIds = () => { 
    STORY_EVENTS.forEach( (event, index) => {
        event.id = "STORY_EVENT_"+index
    });
};
assignEventIds();

const getDataModels = (): StoryEventModel[] => {
    return STORY_EVENTS.map( ( event ) => {
        let model: StoryEventModel = {
            id: event.id,
            mapName: event.mapName,
            trigger: event.trigger,
            interaction: event.interaction.map(initInteractionModel)
        }
        if ( event.trigger === CinematicTrigger.interaction ) {
            model.name = event.name;
        }
        if ( event.trigger === CinematicTrigger.position ) {
            model.position = { row: event.position.row, column: event.position.column, direction: event.position.direction };
        }
        return model;
    } )
}

const storyEventModels = getDataModels();

export const getStoryEventModelsByMapName = ( mapName: string ): StoryEventModel[] => {
    return storyEventModels.filter( ( e ) => { return e.mapName === mapName; } );
}