import { CinematicTrigger } from "../enumerables/CinematicTriggerEnum";
import { ConditionType } from "../enumerables/ConditionTypeEnum";
import { DirectionEnum } from "../enumerables/DirectionEnum";
import { InteractionType } from "../enumerables/InteractionType";
import { OutOfMapEnum } from "../enumerables/OutOfMapEnum";
import { SceneAnimationType } from "../enumerables/SceneAnimationTypeEnum";

import {
    PLAYER_NAME, LOGGABLE_INTERACTION_1, LOGGABLE_INTERACTION_2, LOGGABLE_INTERACTION_4,
    LOGGABLE_INTERACTION_5, LOGGABLE_INTERACTION_6, LOGGABLE_INTERACTION_7
} from '../game-data/interactionGlobals';
import {
    EMOTE_HEART, EMOTE_SAD, EMOTE_SURPRISED, EMOTE_HAPPY, EMOTE_QUESTIONMARK
} from '../game-data/textboxGlobals';

export const KEY_STORY_1 = "KEY_STORY_EVENT_1";
export const KEY_STORY_2 = "KEY_STORY_EVENT_2";
export const KEY_STORY_3 = "KEY_STORY_EVENT_3"

export const STORY_EVENTS = [
    {
        id: "",
        mapName: "leonard_heights/Newtown-appartment-3",
        trigger: CinematicTrigger.enter,
        interaction: [
            InteractionType.talk, false, null, "medium-text-blip.ogg", 
            [ConditionType.default, false],
            [
                [[SceneAnimationType.loadMap, true, "leonard_heights/Newtown-appartment-3", true]],
                [[SceneAnimationType.fadeOut, true]],
                [[SceneAnimationType.loadMap, true, "leonard_heights/B2"]],
                [[SceneAnimationType.createCar, true, "bus.png", "CIN_CAR_BUS", "CIN_ROAD_1"]],
                [[SceneAnimationType.createCharacter, true, DirectionEnum.right, "characterx3.png", "Dancing granny", 15, 11]],
                [[SceneAnimationType.animation, false, "LEFT_AND_RIGHT_STEP", "Dancing granny", true]],
                [[SceneAnimationType.cameraMoveToSprite, true, "CIN_CAR_BUS", true]],
                [[SceneAnimationType.fadeIn, true]],
                [[SceneAnimationType.moveCar, true, null, OutOfMapEnum.up, "CIN_CAR_BUS", DirectionEnum.up]],
                [[SceneAnimationType.fadeOut, true]],
                [[SceneAnimationType.loadMap, true, "leonard_heights/B1"]],
                [[SceneAnimationType.createCharacter, true, DirectionEnum.right, false, PLAYER_NAME, 15, 14], [SceneAnimationType.createCharacter, true, DirectionEnum.left, "fats.png", "BOB", 16, 14], [SceneAnimationType.createObjectSprite, true, DirectionEnum.up, "bus", "My cool car", 13, 13]],
                [[SceneAnimationType.cameraMoveToSprite, true, PLAYER_NAME, true]],
                [[SceneAnimationType.fadeIn, true]],
                [[SceneAnimationType.speak, true, "Was good hanging out with you!", PLAYER_NAME], [SceneAnimationType.emote, false, EMOTE_HAPPY, "BOB"]],
                [[SceneAnimationType.speak, true, "Yeah for sure. See you at work at the {G}Yum {G}Mart later!", "BOB"], [SceneAnimationType.cameraMoveToSprite, true, "BOB", false], [SceneAnimationType.emote, false, EMOTE_HAPPY, PLAYER_NAME]],
                [[SceneAnimationType.move, true, PLAYER_NAME, { col: 15, row: OutOfMapEnum.down }], [SceneAnimationType.cameraMoveToSprite, false, PLAYER_NAME, false]],
                [[SceneAnimationType.fadeOut, true]],
                [[SceneAnimationType.loadMap, true, "leonard_heights/B2"]],
                [[SceneAnimationType.createCharacter, true, DirectionEnum.down, false, PLAYER_NAME, 15, 1]],
                [[SceneAnimationType.createCharacter, true, DirectionEnum.right, "characterx3.png", "Dancing granny", 15, 11]],
                [[SceneAnimationType.animation, false, "LEFT_AND_RIGHT_STEP", "Dancing granny", true]],
                [[SceneAnimationType.cameraMoveToSprite, true, PLAYER_NAME, true]],
                [[SceneAnimationType.fadeIn, false], [SceneAnimationType.move, true, PLAYER_NAME, { col: OutOfMapEnum.right, row: 10 }]],
                [[SceneAnimationType.fadeOut, true]],
                [[SceneAnimationType.loadMap, true, "leonard_heights/C2"]],
                [[SceneAnimationType.createCharacter, true, DirectionEnum.right, false, PLAYER_NAME, 1, 10]],
                [[SceneAnimationType.cameraMoveToSprite, true, PLAYER_NAME, true]],
                [[SceneAnimationType.fadeIn, true]],
                [[SceneAnimationType.speak, true, "I'm almost back home, can't wait to get some cold Diet Betes before my shift begins!", PLAYER_NAME]],
                [[SceneAnimationType.move, true, PLAYER_NAME, { col: 12, row: 9 }]],
                [[SceneAnimationType.fadeOut, true]],
                [[SceneAnimationType.loadMap, true, "leonard_heights/Newtown-appartment-3", true]],
                [[SceneAnimationType.fadeIn, true]],
                [[SceneAnimationType.speak, true, "Let's get to work now!", PLAYER_NAME]]
            ]
        ]
    },
    {
        id: "",
        mapName: "leonard_heights/C2",
        trigger: CinematicTrigger.enter,
        interaction: [
            InteractionType.talk, true, LOGGABLE_INTERACTION_1, "medium-text-blip.ogg", 
            [ConditionType.default, false],
            [
                [[SceneAnimationType.loadMap, true, "leonard_heights/C2", true]],
                [[SceneAnimationType.createCharacter, true, DirectionEnum.left, "fats.png", "BOB", 24, 10]],
                [[SceneAnimationType.cameraMoveToSprite, true, "BOB", false], [SceneAnimationType.move, true, "BOB", PLAYER_NAME]],
                [[SceneAnimationType.speak, true, "I heard there was some trouble at the {G}Yum {G}Mart down {R}south...", "BOB"], [SceneAnimationType.emote, true, EMOTE_SURPRISED, PLAYER_NAME]],
                [[SceneAnimationType.cameraMoveToSprite, true, PLAYER_NAME, false], [SceneAnimationType.speak, true, "Oh no, I better get down there fast!", PLAYER_NAME], [SceneAnimationType.move, false, "BOB", { col: OutOfMapEnum.left, row: 10 }]]
            ]
        ]
    },
    {
        id: "",
        mapName: "leonard_heights/E3",
        trigger: CinematicTrigger.enter,
        interaction: [
            InteractionType.talk, false, null, "medium-text-blip.ogg", 
            [ConditionType.default, false],
            [
                [[SceneAnimationType.loadMap, true, "leonard_heights/E3", true]],
                [[SceneAnimationType.speak, true, "I hate the hotel on this street, it's always full of trashy tourists", PLAYER_NAME]]
            ]
        ]
    },
    {
        id: "",
        mapName: "leonard_heights/Newtown-appartment-4",
        trigger: CinematicTrigger.position,
        position: {
            "column": 3,
            "direction": DirectionEnum.right
        },
        interaction: [
            InteractionType.talk, true, KEY_STORY_1, "medium-text-blip.ogg", 
            [ConditionType.default, false],
            [ 
                [[SceneAnimationType.loadMap, true, "leonard_heights/Newtown-appartment-4", true]],
                [[SceneAnimationType.speak, true, "There's just something creepy about an empty appartment...", PLAYER_NAME]]
            ]
        ]
    },
    {
        id: "",
        mapName: "leonard_heights/C4",
        trigger: CinematicTrigger.enter,
        interaction: [
            InteractionType.talk, true, LOGGABLE_INTERACTION_2, "medium-text-blip.ogg",
            [ConditionType.default, false],
            [
                [[SceneAnimationType.loadMap, true, "leonard_heights/C4", true]],
                [[SceneAnimationType.speak, true, "There's something wrong here, I can feel it...", PLAYER_NAME], [SceneAnimationType.cameraMoveToSprite, true, PLAYER_NAME, false]],
                [[SceneAnimationType.speak, true, "I love being a thug, it's my dream job", "Bob A", "Bob B"], [SceneAnimationType.cameraMoveToSprite, true, "Bob A", false], [SceneAnimationType.move, true, PLAYER_NAME, { col: 19, row: 9 }]],
                [[SceneAnimationType.speak, true, "Yeah, my liberal arts degree is really paying off..", "Bob B", "Bob A"], [SceneAnimationType.cameraMoveToSprite, true, "Bob B", false]],
                [[SceneAnimationType.speak, true, "Who are you guys and what the hell are you doing here??", PLAYER_NAME, "Bob A"], [SceneAnimationType.cameraMoveToSprite, true, PLAYER_NAME, false]],
                [[SceneAnimationType.speak, true, "We're here to keep nosy morons like you out.", "Bob A", PLAYER_NAME], [SceneAnimationType.cameraMoveToSprite, true, "Bob A", false]],
                [[SceneAnimationType.speak, true, "Yeah, piss off you wanker!", "Bob B", PLAYER_NAME], [SceneAnimationType.cameraMoveToSprite, true, "Bob B", false]],
                [[SceneAnimationType.speak, true, "You guys have got to be kidding me...", PLAYER_NAME], [SceneAnimationType.cameraMoveToSprite, true, PLAYER_NAME, false]],
                [[SceneAnimationType.speak, true, "You wanker, why don't you piss off!!", "Bob B"], [SceneAnimationType.cameraMoveToSprite, true, "Bob B", false]],
                [[SceneAnimationType.speak, true, "You're repeating yourself, Bob...", "Bob A"], [SceneAnimationType.cameraMoveToSprite, true, "Bob A", false]],
                [[SceneAnimationType.speak, true, "This has to be a joke right?", PLAYER_NAME], [SceneAnimationType.cameraMoveToSprite, true, PLAYER_NAME, false]],
                [[SceneAnimationType.speak, true, "You think we're taking a piss, wanker?", "Bob B"], [SceneAnimationType.cameraMoveToSprite, true, "Bob B", false]],
                [[SceneAnimationType.speak, true, ".........", "Bob A"], [SceneAnimationType.cameraMoveToSprite, true, "Bob A", false], [SceneAnimationType.emote, true, EMOTE_QUESTIONMARK, "Bob B"]],
                [[SceneAnimationType.speak, true, "If you want in kid, you gotta speak to our {R}boss {R}Big {R}Bubba", "Bob A"], [SceneAnimationType.cameraMoveToSprite, true, "Bob A", false]],
                [[SceneAnimationType.speak, true, "Where can I find him?", PLAYER_NAME], [SceneAnimationType.cameraMoveToSprite, true, PLAYER_NAME, false]],
                [[SceneAnimationType.speak, true, "He's a mob boss kid. You can't just walk into his office.", "Bob A"], [SceneAnimationType.cameraMoveToSprite, true, "Bob A", false]],
                [[SceneAnimationType.speak, true, "Ask around or something. If you're a smart boy you'll find him!", "Bob B"], [SceneAnimationType.cameraMoveToSprite, true, "Bob B", false]]
            ]
        ]
    },
    {
        id: "",
        mapName: "leonard_heights/D1",
        trigger: CinematicTrigger.interaction,
        name: "Helpful Bro",
        interaction: [
            InteractionType.talk, true, LOGGABLE_INTERACTION_4, "medium-text-blip.ogg", 
            [ConditionType.interactionNotRegistered, LOGGABLE_INTERACTION_4],
            [
                [[SceneAnimationType.loadMap, true, "leonard_heights/D1", true]],
                [[SceneAnimationType.speak, true, "What's going on over here?", PLAYER_NAME]],
                [[SceneAnimationType.speak, true, "My bro is having a real tough time bro...", "Helpful Bro", PLAYER_NAME], [SceneAnimationType.cameraMoveToSprite, true, "Helpful Bro", false]],
                [[SceneAnimationType.speak, true, "He used to be the fittest, the nicest, the sexiest bro in town.", "Helpful Bro"]],
                [[SceneAnimationType.speak, true, "But then he had a fight with another bro and he threw away his dumbbells!", "Helpful Bro"]],
                [[SceneAnimationType.speak, true, "Now he's a bro who can't pump iron...", "Helpful Bro"], [SceneAnimationType.emote, false, EMOTE_SAD, "Sad Bro"]],
                [[SceneAnimationType.speak, true, "That doesn't sound too bad, can't you just buy some new ones?", PLAYER_NAME], [SceneAnimationType.cameraMoveToSprite, true, PLAYER_NAME, false]],
                [[SceneAnimationType.speak, true, "He obviously has to do some emotional self care first bro! He can't buy new ones like this.", "Helpful Bro"], [SceneAnimationType.cameraMoveToSprite, true, "Helpful Bro", false]],
                [[SceneAnimationType.speak, true, "And I can't do it either! I need to stay here to comfort him.", "Helpful Bro"]],
                [[SceneAnimationType.speak, true, "Right...", PLAYER_NAME], [SceneAnimationType.cameraMoveToSprite, true, PLAYER_NAME, false]],
                [[SceneAnimationType.speak, true, "So we need you to help us out!", "Helpful Bro"], [SceneAnimationType.cameraMoveToSprite, true, "Helpful Bro", false]],
                [[SceneAnimationType.speak, true, "Visit our bros around town and ask if they can spare a dumbbell!", "Helpful Bro"]],
                [[SceneAnimationType.fadeOut, true]],
                [[SceneAnimationType.loadMap, true, "leonard_heights/B4", false]],
                [[SceneAnimationType.fadeIn, true], [SceneAnimationType.cameraMoveToSprite, true, "Wholesome Lifter", true]],
                [[SceneAnimationType.wait, true, 1000]],
                [[SceneAnimationType.fadeOut, true]],
                [[SceneAnimationType.loadMap, true, "leonard_heights/E4", false]],
                [[SceneAnimationType.fadeIn, true], [SceneAnimationType.cameraMoveToSprite, true, "Wholesome Lifter", true]],
                [[SceneAnimationType.wait, true, 1000]],
                [[SceneAnimationType.fadeOut, true]],
                [[SceneAnimationType.loadMap, true, "leonard_heights/D2", false]],
                [[SceneAnimationType.fadeIn, true], [SceneAnimationType.cameraMoveToSprite, true, "Wholesome Lifter", true]],
                [[SceneAnimationType.wait, true, 1000]],
                [[SceneAnimationType.fadeOut, true]],
                [[SceneAnimationType.loadMap, true, "leonard_heights/D1", true], [SceneAnimationType.cameraMoveToSprite, true, PLAYER_NAME, true]],
                [[SceneAnimationType.fadeIn, true]],
                [[SceneAnimationType.speak, true, "But why would I go and...", PLAYER_NAME]],
                [[SceneAnimationType.speak, true, "Thank you SO much bro, you're a true king <3!", "Helpful Bro"], [SceneAnimationType.cameraMoveToSprite, true, "Helpful Bro", false]],
                [[SceneAnimationType.speak, true, "You can recognize our bros easily, they're always pumping iron!", "Helpful Bro"]],
                [[SceneAnimationType.speak, true, "No problem, I guess...", PLAYER_NAME], [SceneAnimationType.cameraMoveToSprite, true, PLAYER_NAME, false]],
                [[SceneAnimationType.speak, true, "Don't worry bro, we'll get you those dumbbells!", "Helpful Bro", "Sad Bro"], [SceneAnimationType.cameraMoveToSprite, true, "Helpful Bro", false]]
            ]
        ]
    },
    {
        id: "",
        mapName: "leonard_heights/D2",
        trigger: CinematicTrigger.interaction,
        name: "Wholesome Lifter",
        interaction: [
            InteractionType.talk, false, null, "medium-text-blip.ogg", 
            [ConditionType.interactionRegistered, LOGGABLE_INTERACTION_4],
            [
                [[SceneAnimationType.loadMap, true, "leonard_heights/D2", true]],
                [[SceneAnimationType.speak, true, "Are you one of those friendly lifter bros?", PLAYER_NAME]],
                [[SceneAnimationType.speak, true, "Woah dude, how did you know? Yeah, I roll with my bros, for sure!", "Wholesome Lifter", PLAYER_NAME], [SceneAnimationType.cameraMoveToSprite, true, "Wholesome Lifter", false]],
                [[SceneAnimationType.speak, true, "I don't know, could be the fact that you're out on the street working out.", PLAYER_NAME], [SceneAnimationType.cameraMoveToSprite, true, PLAYER_NAME, false]],
                [[SceneAnimationType.speak, true, "Oh yeah I guess that does kinda give it away, doesn't it?", "Wholesome Lifter"], [SceneAnimationType.cameraMoveToSprite, true, "Wholesome Lifter", false]],
                [[SceneAnimationType.speak, true, "Anyway bro, what's up?", "Wholesome Lifter"]],
                [[SceneAnimationType.speak, true, "One of your friends is having a hard time. He lost his dumbbells.", PLAYER_NAME], [SceneAnimationType.cameraMoveToSprite, true, PLAYER_NAME, false]],
                [[SceneAnimationType.speak, true, "My god, for real bro? That's a cruel fate for a fit dude.", "Wholesome Lifter"], [SceneAnimationType.cameraMoveToSprite, true, "Wholesome Lifter", false]],
                [[SceneAnimationType.speak, true, "Now he's a bro who can't pump iron...", "Wholesome Lifter"]],
                [[SceneAnimationType.speak, true, "Yeah that's exactly what the other bros said.", PLAYER_NAME], [SceneAnimationType.cameraMoveToSprite, true, PLAYER_NAME, false]],
                [[SceneAnimationType.speak, true, "Anyway, somehow they convinced me to get him new dumbbells. Do you have one to spare?", PLAYER_NAME]],
                [[SceneAnimationType.speak, true, "Nah dude, sorry. I just donated my spare dumbbells to Extinction Rebellion bruh!", "Wholesome Lifter"], [SceneAnimationType.cameraMoveToSprite, true, "Wholesome Lifter", false]],
                [[SceneAnimationType.speak, true, "Why the hell would they need dumbbells?", PLAYER_NAME], [SceneAnimationType.cameraMoveToSprite, true, PLAYER_NAME, false]],
                [[SceneAnimationType.speak, true, "They're fighting climate change right? Now they can get buffed and kick climate changes' ass!", "Wholesome Lifter"], [SceneAnimationType.cameraMoveToSprite, true, "Wholesome Lifter", false]],
                [[SceneAnimationType.speak, true, "Right...", PLAYER_NAME], [SceneAnimationType.cameraMoveToSprite, true, PLAYER_NAME, false]],
                [[SceneAnimationType.speak, true, "Good luck on your search bro!", "Wholesome Lifter"], [SceneAnimationType.cameraMoveToSprite, true, "Wholesome Lifter", false]],
                [[SceneAnimationType.speak, true, "Thanks I guess!", PLAYER_NAME], [SceneAnimationType.cameraMoveToSprite, true, PLAYER_NAME, false]],
            ]

        ]
    },
    {
        id: "",
        mapName: "leonard_heights/E4",
        trigger: CinematicTrigger.interaction,
        name: "Wholesome Lifter",
        interaction: [
            InteractionType.talk, true, LOGGABLE_INTERACTION_5, "medium-text-blip.ogg", 
            [ConditionType.interactionRegistered, LOGGABLE_INTERACTION_4],
            [
                [[SceneAnimationType.loadMap, true, "leonard_heights/E4", true]],
                [[SceneAnimationType.speak, true, "Are you one of those friendly lifter bros?", PLAYER_NAME]],
                [[SceneAnimationType.speak, true, "Yeah, for sure bro! I'm always lifting and being a bro.", "Wholesome Lifter", PLAYER_NAME], [SceneAnimationType.cameraMoveToSprite, true, "Wholesome Lifter", false]],
                [[SceneAnimationType.speak, true, "One of your friends is having a hard time. He lost his dumbbells.", PLAYER_NAME], [SceneAnimationType.cameraMoveToSprite, true, PLAYER_NAME, false]],
                [[SceneAnimationType.speak, true, "My god, for real bro? That's a cruel fate for a fit dude.", "Wholesome Lifter"], [SceneAnimationType.cameraMoveToSprite, true, "Wholesome Lifter", false]],
                [[SceneAnimationType.speak, true, "Now he's a bro who can't pump iron...", "Wholesome Lifter"]],
                [[SceneAnimationType.speak, true, "Yeah that's exactly what the other bros said.", PLAYER_NAME], [SceneAnimationType.cameraMoveToSprite, true, PLAYER_NAME, false]],
                [[SceneAnimationType.speak, true, "Anyway, somehow they convinced me to get him new dumbbells. Do you have one to spare?", PLAYER_NAME]],
                [[SceneAnimationType.speak, true, "Well you're lucky bro. I've always got a spare dumbbell on me in case one of 'em breaks.", "Wholesome Lifter"], [SceneAnimationType.cameraMoveToSprite, true, "Wholesome Lifter", false]],
                [[SceneAnimationType.speak, true, "Wow for real?!", PLAYER_NAME], [SceneAnimationType.cameraMoveToSprite, true, PLAYER_NAME, false]],
                [[SceneAnimationType.speak, true, "Yeah for real! Here, you can have it. Send some TLC to my crying bro when you see him!", "Wholesome Lifter"], [SceneAnimationType.cameraMoveToSprite, true, "Wholesome Lifter", false]],
                [[SceneAnimationType.speak, true, "I'll tell the other bros about you. You're helping a bro, they'll be happy to help you now!", "Wholesome Lifter"]]
            ]
        ]
    },
    {
        id: "",
        mapName: "leonard_heights/B4",
        trigger: CinematicTrigger.interaction,
        name: "Wholesome Lifter",
        interaction: [
            InteractionType.talk, true, LOGGABLE_INTERACTION_6, "medium-text-blip.ogg", 
            [ConditionType.interactionRegistered, LOGGABLE_INTERACTION_5],
            [
                [[SceneAnimationType.loadMap, true, "leonard_heights/B4", true]],
                [[SceneAnimationType.speak, true, "Are you one of those friendly lifter bros?", PLAYER_NAME], [SceneAnimationType.cameraMoveToSprite, true, PLAYER_NAME, false]],
                [[SceneAnimationType.speak, true, "Yeah, for sure bro! Though I'm the least friendly of them.", "Wholesome Lifter", PLAYER_NAME], [SceneAnimationType.cameraMoveToSprite, true, "Wholesome Lifter", false]],
                [[SceneAnimationType.speak, true, "One of your friends is having a hard time. He lost his dumbbells.", PLAYER_NAME], [SceneAnimationType.cameraMoveToSprite, true, PLAYER_NAME, false]],
                [[SceneAnimationType.speak, true, "My god, for real bro? That's a cruel fate for a fit dude.", "Wholesome Lifter"], [SceneAnimationType.cameraMoveToSprite, true, "Wholesome Lifter", false]],
                [[SceneAnimationType.speak, true, "Now he's a bro who can't pump iron...", "Wholesome Lifter"]],
                [[SceneAnimationType.speak, true, "Yeah that's exactly what the other bros said.", PLAYER_NAME], [SceneAnimationType.cameraMoveToSprite, true, PLAYER_NAME, false]],
                [[SceneAnimationType.speak, true, "I heard about you bro. You're doing some good work you know that?", "Wholesome Lifter"], [SceneAnimationType.cameraMoveToSprite, true, "Wholesome Lifter", false]],
                [[SceneAnimationType.speak, true, "I guess? I feel like I'm being pushed around though.", PLAYER_NAME], [SceneAnimationType.cameraMoveToSprite, true, PLAYER_NAME, false]],
                [[SceneAnimationType.speak, true, "Well I normally don't give away dumbbells. But my bros told me that you're a bro of us bros", "Wholesome Lifter"], [SceneAnimationType.cameraMoveToSprite, true, "Wholesome Lifter", false]],
                [[SceneAnimationType.speak, true, "So here's my spare dumbbell! You better bring it to my bro fast so he can start lifting again!", "Wholesome Lifter"]],
                [[SceneAnimationType.speak, true, "Thanks bro you're the best!!", PLAYER_NAME], [SceneAnimationType.cameraMoveToSprite, true, PLAYER_NAME, false]],
                [[SceneAnimationType.speak, true, "Now I've got two dumbbells. Better get back to the park and give 'em to the bro there.", PLAYER_NAME]]
            ]
        ]
    },
    {
        id: "",
        mapName: "leonard_heights/D1",
        trigger: CinematicTrigger.interaction,
        name: "Helpful Bro",
        interaction: [
            InteractionType.talk, true, LOGGABLE_INTERACTION_7, "medium-text-blip.ogg", 
            [ConditionType.interactionRegistered, LOGGABLE_INTERACTION_6],
            [
                [[SceneAnimationType.loadMap, true, "leonard_heights/D1", true]],
                [[SceneAnimationType.speak, true, "We can't wait much longer bro, I can see his muscles shrinking!", "Helpful Bro", PLAYER_NAME], [SceneAnimationType.emote, false, EMOTE_SAD, "Sad Bro"], [SceneAnimationType.cameraMoveToSprite, true, "Helpful Bro", false]],
                [[SceneAnimationType.speak, true, "Don't worry bros! I've got the dumbbells!", PLAYER_NAME], [SceneAnimationType.cameraMoveToSprite, true, PLAYER_NAME, false]],
                [[SceneAnimationType.speak, true, "Quick quick!! Give 'em to my man! He doesn't have much time left...", "Helpful Bro", "Sad Bro"], [SceneAnimationType.cameraMoveToSprite, true, "Helpful Bro", false]],
                [[SceneAnimationType.move, true, PLAYER_NAME, "Sad Bro"], [SceneAnimationType.cameraMoveToSprite, true, PLAYER_NAME, false]],
                [[SceneAnimationType.speak, true, "Here they are!", PLAYER_NAME, "Sad Bro"]],
                [[SceneAnimationType.animation, false, "LIFT", "Sad Bro", true], [SceneAnimationType.speak, true, "Finally!!", "Sad Bro"], [SceneAnimationType.cameraMoveToSprite, true, "Sad Bro", false]],
                [[SceneAnimationType.speak, true, "I can feel the power flowing back into my body!!", "Sad Bro"]],
                [[SceneAnimationType.speak, true, "YEAH THAT'S MY BRO!!", "Helpful Bro"], [SceneAnimationType.cameraMoveToSprite, true, "Helpful Bro", false]],
                [[SceneAnimationType.animation, false, "LIFT", "Helpful Bro", true], [SceneAnimationType.speak, true, "Imma lift with you in the most bromantic way!", "Helpful Bro"]],
                [[SceneAnimationType.emote, true, EMOTE_HEART, "Helpful Bro"], [SceneAnimationType.emote, true, EMOTE_HEART, "Sad Bro"]],
                [[SceneAnimationType.speak, true, "I've never heard the word 'Bro' so many times in one day, I think", PLAYER_NAME], [SceneAnimationType.cameraMoveToSprite, true, PLAYER_NAME, false]],
                [[SceneAnimationType.speak, true, "Bro you are a true KING!", "Sad Bro"], [SceneAnimationType.cameraMoveToSprite, true, "Sad Bro", false]],
                [[SceneAnimationType.speak, true, "Me and my boys will never forget this! If you ever need some muscled bros, we'll be there for you!", "Sad Bro"]],
                [[SceneAnimationType.speak, true, "Yeah for sure! And don't forget to do some self care when you're feeling down, my bro.", "Helpful Bro"], [SceneAnimationType.cameraMoveToSprite, true, "Helpful Bro", false]],
                [[SceneAnimationType.speak, true, "Damn right! My muscles may be hard like iron, my feelings are soft like a little puppy.", "Sad Bro"], [SceneAnimationType.cameraMoveToSprite, true, "Sad Bro", false]],
                [[SceneAnimationType.emote, true, EMOTE_HEART, "Helpful Bro"], [SceneAnimationType.emote, true, EMOTE_HEART, "Sad Bro"]],
                [[SceneAnimationType.speak, true, "No problem bros, I'll remember you guys when I need some muscle!", PLAYER_NAME, "Sad Bro"], [SceneAnimationType.cameraMoveToSprite, true, PLAYER_NAME, false]]
            ]
        ]
    }
]

const assignEventIds = () => { 
    STORY_EVENTS.forEach( (event, index) => {
        event.id = "STORY_EVENT_"+index
    });
};
assignEventIds();