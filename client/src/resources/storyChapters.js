const globals = require("../game-data/globals")
const { FACING_RIGHT, FACING_LEFT, FACING_UP, FACING_DOWN, OUT_UP, OUT_DOWN, OUT_RIGHT } = require("../game-data/globals")
const { 
    ON_ENTER, ON_LEAVE, ON_POSITION, EVENT_HAS_FIRED, CREATE_CAR, MOVE_CAR, LOAD_MAP, FADE_OUT,
    EMOTE, DEFAULT, EVENT_TALK, SPEAK, CREATE_SPRITE, MOVE, CAMERA_MOVE_TO_SPRITE, WAIT,
    SPEAK_YES_NO, ANIM, FADE_IN, DELETE_SPRITE, CREATE_OBJECT_SPRITE, FADE_OUT_IN, EVENT_HAS_NOT_FIRED, ON_NPC_INTERACTION, CAMERA_MOVE_TO_TILE
}  = require('../game-data/conditionGlobals')
const { PLAYER_NAME, LOGGABLE_INTERACTION_1, LOGGABLE_INTERACTION_2, LOGGABLE_INTERACTION_4, LOGGABLE_INTERACTION_5, LOGGABLE_INTERACTION_6, LOGGABLE_INTERACTION_7 } = require('../game-data/interactionGlobals');
const { EMOTE_HEART, EMOTE_SAD, EMOTE_SURPRISED, EMOTE_ANGRY, EMOTE_HAPPY, EMOTE_QUESTIONMARK } = require('../game-data/textboxGlobals');

const KEY_STORY_1 = "KEY_STORY_EVENT_1";
const KEY_STORY_2 = "KEY_STORY_EVENT_2";
const KEY_STORY_3 = "KEY_STORY_EVENT_3"

const STORY_EVENTS = [
    {
        mapName: "leonard_heights/Newtown-appartment-3",
        trigger: ON_ENTER,
        condition: [ DEFAULT, false ],
        scenes: [ EVENT_TALK, false, "medium-text-blip.ogg", [
                [[LOAD_MAP, true, "leonard_heights/Newtown-appartment-3", true]],
                [[FADE_OUT, true]],
                [[LOAD_MAP, true, "leonard_heights/B2"]],
                [[CREATE_CAR, true, "bus.png", "CIN_CAR_BUS", "CIN_ROAD_1"]],
                [[CREATE_SPRITE, true, FACING_RIGHT, "characterx3.png", "Dancing granny", 15, 11]],
                [[ANIM, false, "LEFT_AND_RIGHT_STEP", "Dancing granny", true]],
                [[CAMERA_MOVE_TO_SPRITE, true, "CIN_CAR_BUS", true]],
                [[FADE_IN, true]],
                [[MOVE_CAR, true, null, OUT_UP, "CIN_CAR_BUS", FACING_UP]],
                [[FADE_OUT, true]],
                [[LOAD_MAP, true, "leonard_heights/B1"]],
                [[CREATE_SPRITE, true, FACING_RIGHT, false, PLAYER_NAME, 15, 14], [CREATE_SPRITE, true, FACING_LEFT,"fats.png", "BOB", 16, 14], [CREATE_OBJECT_SPRITE, true, FACING_UP, "bus", "My cool car", 13, 13]],
                [[CAMERA_MOVE_TO_SPRITE, true, PLAYER_NAME, true]],
                [[FADE_IN, true]],
                [[SPEAK, true, "Was good hanging out with you!", PLAYER_NAME], [EMOTE, false, EMOTE_HAPPY, "BOB"]],
                [[SPEAK, true, "Yeah for sure. See you at work at the {G}Yum {G}Mart later!", "BOB"], [CAMERA_MOVE_TO_SPRITE, true, "BOB", false], [EMOTE, false, EMOTE_HAPPY, PLAYER_NAME]],
                [[MOVE, true, PLAYER_NAME, { col: 15, row: OUT_DOWN }], [CAMERA_MOVE_TO_SPRITE, false, PLAYER_NAME, false]],
                [[FADE_OUT, true]],
                [[LOAD_MAP, true, "leonard_heights/B2"]],
                [[CREATE_SPRITE, true, FACING_DOWN, false, PLAYER_NAME, 15, 1]],
                [[CREATE_SPRITE, true, FACING_RIGHT, "characterx3.png", "Dancing granny", 15, 11]],
                [[ANIM, false, "LEFT_AND_RIGHT_STEP", "Dancing granny", true]],
                [[CAMERA_MOVE_TO_SPRITE, true, PLAYER_NAME, true]],
                [[FADE_IN, false], [MOVE, true, PLAYER_NAME, { col: OUT_RIGHT, row: 10 }]],
                [[FADE_OUT, true]],
                [[LOAD_MAP, true, "leonard_heights/C2"]],
                [[CREATE_SPRITE, true, FACING_RIGHT, false, PLAYER_NAME, 1, 10]],
                [[CAMERA_MOVE_TO_SPRITE, true, PLAYER_NAME, true]],
                [[FADE_IN, true]],
                [[SPEAK, true, "I'm almost back home, can't wait to get some cold Diet Betes before my shift begins!", PLAYER_NAME]],
                [[MOVE, true, PLAYER_NAME, { col: 12, row: 9 }]],
                [[FADE_OUT, true]],
                [[LOAD_MAP, true, "leonard_heights/Newtown-appartment-3", true]],
                [[FADE_IN, true]],
                [[SPEAK, true, "Let's get to work now!", PLAYER_NAME]]
            ]
        ]
    },
    ////////////////////
    {
        mapName: "leonard_heights/C2",
        trigger: ON_ENTER,
        condition: [ DEFAULT, false ],
        scenes: [ EVENT_TALK, LOGGABLE_INTERACTION_1, "medium-text-blip.ogg", [ 
                [[LOAD_MAP, true, "leonard_heights/C2", true]],
                [[CREATE_SPRITE, true, FACING_LEFT, "fats.png", "BOB", 24, 10]],
                [[CAMERA_MOVE_TO_SPRITE, true, "BOB", false], [MOVE, true, "BOB", PLAYER_NAME]],
                [[SPEAK, true, "I heard there was some trouble at the {G}Yum {G}Mart down {R}south...", "BOB"], [EMOTE, true, EMOTE_SURPRISED, PLAYER_NAME]],
                [[CAMERA_MOVE_TO_SPRITE, true, PLAYER_NAME, false], [SPEAK, true, "Oh no, I better get down there fast!", PLAYER_NAME], [MOVE, false, "BOB", { col: globals.OUT_LEFT, row: 10 }]]
            ]
        ]
    },
    ///////////////
    {
        mapName: "leonard_heights/E3",
        trigger: ON_ENTER,
        condition: [ DEFAULT, false ],
        scenes: [ EVENT_TALK, false, "medium-text-blip.ogg", [ 
                [[LOAD_MAP, true, "leonard_heights/E3", true]],
                [[SPEAK, true, "I hate the hotel on this street, it's always full of trashy tourists", PLAYER_NAME]]
            ]   
        ]
    },
    //////////////////////////
    {
        mapName: "leonard_heights/Newtown-appartment-4",
        trigger: ON_POSITION,
        position: {
            "col": 3,
            "direction": FACING_RIGHT
        },
        condition: [ DEFAULT, false ],
        scenes: [ EVENT_TALK, KEY_STORY_1, "medium-text-blip.ogg", [ 
            [[LOAD_MAP, true, "leonard_heights/Newtown-appartment-4", true]],
            [[SPEAK, true, "There's just something creepy about an empty appartment...", PLAYER_NAME]]
        ]
    ]
    },
    //////////////////////////
    {
        mapName: "leonard_heights/C4",
        trigger: ON_ENTER,
        condition: [ DEFAULT, false ],
        scenes: [ EVENT_TALK, LOGGABLE_INTERACTION_2, "medium-text-blip.ogg", [ 
            [[LOAD_MAP, true, "leonard_heights/C4", true]],
            [[SPEAK, true, "There's something wrong here, I can feel it...", PLAYER_NAME], [CAMERA_MOVE_TO_SPRITE, true, PLAYER_NAME, false]],
            [[SPEAK, true, "I love being a thug, it's my dream job", "Bob A", "Bob B"], [CAMERA_MOVE_TO_SPRITE, true, "Bob A", false], [MOVE, true, PLAYER_NAME, { col: 19, row: 9 }]],
            [[SPEAK, true, "Yeah, my liberal arts degree is really paying off..", "Bob B", "Bob A"], [CAMERA_MOVE_TO_SPRITE, true, "Bob B", false]],
            [[SPEAK, true, "Who are you guys and what the hell are you doing here??", PLAYER_NAME, "Bob A"], [CAMERA_MOVE_TO_SPRITE, true, PLAYER_NAME, false]],
            [[SPEAK, true, "We're here to keep nosy morons like you out.", "Bob A", PLAYER_NAME], [CAMERA_MOVE_TO_SPRITE, true, "Bob A", false]],
            [[SPEAK, true, "Yeah, piss off you wanker!", "Bob B", PLAYER_NAME], [CAMERA_MOVE_TO_SPRITE, true, "Bob B", false]],
            [[SPEAK, true, "You guys have got to be kidding me...", PLAYER_NAME], [CAMERA_MOVE_TO_SPRITE, true, PLAYER_NAME, false]],
            [[SPEAK, true, "You wanker, why don't you piss off!!", "Bob B"], [CAMERA_MOVE_TO_SPRITE, true, "Bob B", false]],
            [[SPEAK, true, "You're repeating yourself, Bob...", "Bob A"], [CAMERA_MOVE_TO_SPRITE, true, "Bob A", false]],
            [[SPEAK, true, "This has to be a joke right?", PLAYER_NAME], [CAMERA_MOVE_TO_SPRITE, true, PLAYER_NAME, false]],
            [[SPEAK, true, "You think we're taking a piss, wanker?", "Bob B"], [CAMERA_MOVE_TO_SPRITE, true, "Bob B", false]],
            [[SPEAK, true, ".........", "Bob A"], [CAMERA_MOVE_TO_SPRITE, true, "Bob A", false], [EMOTE, true, EMOTE_QUESTIONMARK, "Bob B"]],
            [[SPEAK, true, "If you want in kid, you gotta speak to our {R}boss {R}Big {R}Bubba", "Bob A"], [CAMERA_MOVE_TO_SPRITE, true, "Bob A", false]],
            [[SPEAK, true, "Where can I find him?", PLAYER_NAME], [CAMERA_MOVE_TO_SPRITE, true, PLAYER_NAME, false]],
            [[SPEAK, true, "He's a mob boss kid. You can't just walk into his office.", "Bob A"], [CAMERA_MOVE_TO_SPRITE, true, "Bob A", false]],
            [[SPEAK, true, "Ask around or something. If you're a smart boy you'll find him!", "Bob B"], [CAMERA_MOVE_TO_SPRITE, true, "Bob B", false]]
        ]]
    },
    ////////////////////////// 
    {
        mapName: "leonard_heights/D1",
        trigger: ON_NPC_INTERACTION,
        name: "Helpful Bro",
        condition: [ EVENT_HAS_NOT_FIRED, LOGGABLE_INTERACTION_4 ],
        scenes: [ EVENT_TALK, LOGGABLE_INTERACTION_4, "medium-text-blip.ogg", [ 
            [[LOAD_MAP, true, "leonard_heights/D1", true]],
            [[SPEAK, true, "What's going on over here?", PLAYER_NAME]],
            [[SPEAK, true, "My bro is having a real tough time bro...", "Helpful Bro", PLAYER_NAME], [CAMERA_MOVE_TO_SPRITE, true, "Helpful Bro", false ]],
            [[SPEAK, true, "He used to be the fittest, the nicest, the sexiest bro in town.", "Helpful Bro"]],         
            [[SPEAK, true, "But then he had a fight with another bro and he threw away his dumbbells!", "Helpful Bro"]],   
            [[SPEAK, true, "Now he's a bro who can't pump iron...", "Helpful Bro"], [EMOTE, false, EMOTE_SAD, "Sad Bro"]],       
            [[SPEAK, true, "That doesn't sound too bad, can't you just buy some new ones?", PLAYER_NAME], [CAMERA_MOVE_TO_SPRITE, true, PLAYER_NAME, false ]],        
            [[SPEAK, true, "He obviously has to do some emotional self care first bro! He can't buy new ones like this.", "Helpful Bro"], [CAMERA_MOVE_TO_SPRITE, true, "Helpful Bro", false ]],     
            [[SPEAK, true, "And I can't do it either! I need to stay here to comfort him.", "Helpful Bro"]],        
            [[SPEAK, true, "Right...", PLAYER_NAME], [CAMERA_MOVE_TO_SPRITE, true, PLAYER_NAME, false ]],   
            [[SPEAK, true, "So we need you to help us out!", "Helpful Bro"], [CAMERA_MOVE_TO_SPRITE, true, "Helpful Bro", false ]],     
            [[SPEAK, true, "Visit our bros around town and ask if they can spare a dumbbell!", "Helpful Bro"]],    
            [[FADE_OUT, true]],
            [[LOAD_MAP, true, "leonard_heights/B4", false]],
            [[FADE_IN, true], [CAMERA_MOVE_TO_SPRITE, true, "Wholesome Lifter", true ]],
            [[WAIT, true, 1000]],
            [[FADE_OUT, true]],
            [[LOAD_MAP, true, "leonard_heights/E4", false]],
            [[FADE_IN, true], [CAMERA_MOVE_TO_SPRITE, true, "Wholesome Lifter", true ]],
            [[WAIT, true, 1000]],
            [[FADE_OUT, true]],
            [[LOAD_MAP, true, "leonard_heights/D2", false]],
            [[FADE_IN, true], [CAMERA_MOVE_TO_SPRITE, true, "Wholesome Lifter", true ]],
            [[WAIT, true, 1000]],
            [[FADE_OUT, true]],
            [[LOAD_MAP, true, "leonard_heights/D1", true], [CAMERA_MOVE_TO_SPRITE, true, PLAYER_NAME, true]],
            [[FADE_IN, true]],
            [[SPEAK, true, "But why would I go and...", PLAYER_NAME]],     
            [[SPEAK, true, "Thank you SO much bro, you're a true king <3!", "Helpful Bro"], [CAMERA_MOVE_TO_SPRITE, true, "Helpful Bro", false ]],  
            [[SPEAK, true, "You can recognize our bros easily, they're always pumping iron!", "Helpful Bro"]],    
            [[SPEAK, true, "No problem, I guess...", PLAYER_NAME], [CAMERA_MOVE_TO_SPRITE, true, PLAYER_NAME, false ]],
            [[SPEAK, true, "Don't worry bro, we'll get you those dumbbells!", "Helpful Bro", "Sad Bro"], [CAMERA_MOVE_TO_SPRITE, true, "Helpful Bro", false ]]  
        ]]
    },
    ////////////////////////// 
    {
        mapName: "leonard_heights/D2",
        trigger: ON_NPC_INTERACTION,
        name: "Wholesome Lifter",
        condition: [ EVENT_HAS_FIRED, LOGGABLE_INTERACTION_4 ],
        scenes: [ EVENT_TALK, false, "medium-text-blip.ogg", [ 
            [[LOAD_MAP, true, "leonard_heights/D2", true]],
            [[SPEAK, true, "Are you one of those friendly lifter bros?", PLAYER_NAME]],
            [[SPEAK, true, "Woah dude, how did you know? Yeah, I roll with my bros, for sure!", "Wholesome Lifter", PLAYER_NAME], [CAMERA_MOVE_TO_SPRITE, true, "Wholesome Lifter", false ]],
            [[SPEAK, true, "I don't know, could be the fact that you're out on the street working out.", PLAYER_NAME], [CAMERA_MOVE_TO_SPRITE, true, PLAYER_NAME, false]],         
            [[SPEAK, true, "Oh yeah I guess that does kinda give it away, doesn't it?", "Wholesome Lifter"], [CAMERA_MOVE_TO_SPRITE, true, "Wholesome Lifter", false ]],   
            [[SPEAK, true, "Anyway bro, what's up?", "Wholesome Lifter"]],         
            [[SPEAK, true, "One of your friends is having a hard time. He lost his dumbbells.", PLAYER_NAME], [CAMERA_MOVE_TO_SPRITE, true, PLAYER_NAME, false]],        
            [[SPEAK, true, "My god, for real bro? That's a cruel fate for a fit dude.", "Wholesome Lifter"], [CAMERA_MOVE_TO_SPRITE, true, "Wholesome Lifter", false ]],  
            [[SPEAK, true, "Now he's a bro who can't pump iron...", "Wholesome Lifter"]],      
            [[SPEAK, true, "Yeah that's exactly what the other bros said.", PLAYER_NAME], [CAMERA_MOVE_TO_SPRITE, true, PLAYER_NAME, false]],    
            [[SPEAK, true, "Anyway, somehow they convinced me to get him new dumbbells. Do you have one to spare?", PLAYER_NAME]],    
            [[SPEAK, true, "Nah dude, sorry. I just donated my spare dumbbells to Extinction Rebellion bruh!", "Wholesome Lifter"], [CAMERA_MOVE_TO_SPRITE, true, "Wholesome Lifter", false ]],    
            [[SPEAK, true, "Why the hell would they need dumbbells?", PLAYER_NAME], [CAMERA_MOVE_TO_SPRITE, true, PLAYER_NAME, false]],  
            [[SPEAK, true, "They're fighting climate change right? Now they can get buffed and kick climate changes' ass!", "Wholesome Lifter"], [CAMERA_MOVE_TO_SPRITE, true, "Wholesome Lifter", false ]],   
            [[SPEAK, true, "Right...", PLAYER_NAME], [CAMERA_MOVE_TO_SPRITE, true, PLAYER_NAME, false]],  
            [[SPEAK, true, "Good luck on your search bro!", "Wholesome Lifter"], [CAMERA_MOVE_TO_SPRITE, true, "Wholesome Lifter", false ]],
            [[SPEAK, true, "Thanks I guess!", PLAYER_NAME], [CAMERA_MOVE_TO_SPRITE, true, PLAYER_NAME, false]],  
        ]]
    },
    ////////////////////////// 
    {
        mapName: "leonard_heights/E4",
        trigger: ON_NPC_INTERACTION,
        name: "Wholesome Lifter",
        condition: [ EVENT_HAS_FIRED, LOGGABLE_INTERACTION_4 ],
        scenes: [ EVENT_TALK, LOGGABLE_INTERACTION_5, "medium-text-blip.ogg", [ 
            [[LOAD_MAP, true, "leonard_heights/E4", true]],
            [[SPEAK, true, "Are you one of those friendly lifter bros?", PLAYER_NAME]],
            [[SPEAK, true, "Yeah, for sure bro! I'm always lifting and being a bro.", "Wholesome Lifter", PLAYER_NAME], [CAMERA_MOVE_TO_SPRITE, true, "Wholesome Lifter", false ]],    
            [[SPEAK, true, "One of your friends is having a hard time. He lost his dumbbells.", PLAYER_NAME], [CAMERA_MOVE_TO_SPRITE, true, PLAYER_NAME, false]],        
            [[SPEAK, true, "My god, for real bro? That's a cruel fate for a fit dude.", "Wholesome Lifter"], [CAMERA_MOVE_TO_SPRITE, true, "Wholesome Lifter", false ]],  
            [[SPEAK, true, "Now he's a bro who can't pump iron...", "Wholesome Lifter"]],      
            [[SPEAK, true, "Yeah that's exactly what the other bros said.", PLAYER_NAME], [CAMERA_MOVE_TO_SPRITE, true, PLAYER_NAME, false]],    
            [[SPEAK, true, "Anyway, somehow they convinced me to get him new dumbbells. Do you have one to spare?", PLAYER_NAME]],    
            [[SPEAK, true, "Well you're lucky bro. I've always got a spare dumbbell on me in case one of 'em breaks.", "Wholesome Lifter"], [CAMERA_MOVE_TO_SPRITE, true, "Wholesome Lifter", false ]],    
            [[SPEAK, true, "Wow for real?!", PLAYER_NAME], [CAMERA_MOVE_TO_SPRITE, true, PLAYER_NAME, false]],  
            [[SPEAK, true, "Yeah for real! Here, you can have it. Send some TLC to my crying bro when you see him!", "Wholesome Lifter"], [CAMERA_MOVE_TO_SPRITE, true, "Wholesome Lifter", false ]],   
            [[SPEAK, true, "I'll tell the other bros about you. You're helping a bro, they'll be happy to help you now!", "Wholesome Lifter"]]
        ]]
    },
    ////////////////////////// 
    {
        mapName: "leonard_heights/B4",
        trigger: ON_NPC_INTERACTION,
        name: "Wholesome Lifter",
        condition: [ EVENT_HAS_FIRED, LOGGABLE_INTERACTION_5 ],
        scenes: [ EVENT_TALK, LOGGABLE_INTERACTION_6, "medium-text-blip.ogg", [ 
            [[LOAD_MAP, true, "leonard_heights/B4", true]],
            [[SPEAK, true, "Are you one of those friendly lifter bros?", PLAYER_NAME], [CAMERA_MOVE_TO_SPRITE, true, PLAYER_NAME, false]],
            [[SPEAK, true, "Yeah, for sure bro! Though I'm the least friendly of them.", "Wholesome Lifter", PLAYER_NAME], [CAMERA_MOVE_TO_SPRITE, true, "Wholesome Lifter", false ]],    
            [[SPEAK, true, "One of your friends is having a hard time. He lost his dumbbells.", PLAYER_NAME], [CAMERA_MOVE_TO_SPRITE, true, PLAYER_NAME, false]],        
            [[SPEAK, true, "My god, for real bro? That's a cruel fate for a fit dude.", "Wholesome Lifter"], [CAMERA_MOVE_TO_SPRITE, true, "Wholesome Lifter", false ]],  
            [[SPEAK, true, "Now he's a bro who can't pump iron...", "Wholesome Lifter"]],      
            [[SPEAK, true, "Yeah that's exactly what the other bros said.", PLAYER_NAME], [CAMERA_MOVE_TO_SPRITE, true, PLAYER_NAME, false]],    
            [[SPEAK, true, "I heard about you bro. You're doing some good work you know that?", "Wholesome Lifter"], [CAMERA_MOVE_TO_SPRITE, true, "Wholesome Lifter", false ]],    
            [[SPEAK, true, "I guess? I feel like I'm being pushed around though.", PLAYER_NAME], [CAMERA_MOVE_TO_SPRITE, true, PLAYER_NAME, false]],  
            [[SPEAK, true, "Well I normally don't give away dumbbells. But my bros told me that you're a bro of us bros", "Wholesome Lifter"], [CAMERA_MOVE_TO_SPRITE, true, "Wholesome Lifter", false ]],   
            [[SPEAK, true, "So here's my spare dumbbell! You better bring it to my bro fast so he can start lifting again!", "Wholesome Lifter"]],   
            [[SPEAK, true, "Thanks bro you're the best!!", PLAYER_NAME], [CAMERA_MOVE_TO_SPRITE, true, PLAYER_NAME, false]],
            [[SPEAK, true, "Now I've got two dumbbells. Better get back to the park and give 'em to the bro there.", PLAYER_NAME]]
        ]]
    },
    {
        mapName: "leonard_heights/D1",
        trigger: ON_NPC_INTERACTION,
        name: "Helpful Bro",
        condition: [ EVENT_HAS_FIRED, LOGGABLE_INTERACTION_6 ],
        scenes: [ EVENT_TALK, LOGGABLE_INTERACTION_7, "medium-text-blip.ogg", [ 
            [[LOAD_MAP, true, "leonard_heights/D1", true]],
            [[SPEAK, true, "We can't wait much longer bro, I can see his muscles shrinking!", "Helpful Bro", PLAYER_NAME], [EMOTE, false, EMOTE_SAD, "Sad Bro"], [CAMERA_MOVE_TO_SPRITE, true, "Helpful Bro", false ]],
            [[SPEAK, true, "Don't worry bros! I've got the dumbbells!", PLAYER_NAME], [CAMERA_MOVE_TO_SPRITE, true, PLAYER_NAME, false ]],
            [[SPEAK, true, "Quick quick!! Give 'em to my man! He doesn't have much time left...", "Helpful Bro", "Sad Bro"], [CAMERA_MOVE_TO_SPRITE, true, "Helpful Bro", false ]],       
            [[MOVE, true, PLAYER_NAME, "Sad Bro" ], [CAMERA_MOVE_TO_SPRITE, true, PLAYER_NAME, false ]],   
            [[SPEAK, true, "Here they are!", PLAYER_NAME, "Sad Bro"]],
            [[ANIM, false, "LIFT", "Sad Bro", true ], [SPEAK, true, "Finally!!", "Sad Bro"], [CAMERA_MOVE_TO_SPRITE, true, "Sad Bro", false ]],
            [[SPEAK, true, "I can feel the power flowing back into my body!!", "Sad Bro"]],
            [[SPEAK, true, "YEAH THAT'S MY BRO!!", "Helpful Bro"], [CAMERA_MOVE_TO_SPRITE, true, "Helpful Bro", false ]],
            [[ANIM, false, "LIFT", "Helpful Bro", true ], [SPEAK, true, "Imma lift with you in the most bromantic way!", "Helpful Bro"]],
            [[EMOTE, true, EMOTE_HEART, "Helpful Bro"], [EMOTE, true, EMOTE_HEART, "Sad Bro"]],
            [[SPEAK, true, "I've never heard the word 'Bro' so many times in one day, I think", PLAYER_NAME], [CAMERA_MOVE_TO_SPRITE, true, PLAYER_NAME, false ]],
            [[SPEAK, true, "Bro you are a true KING!", "Sad Bro"], [CAMERA_MOVE_TO_SPRITE, true, "Sad Bro", false ]],
            [[SPEAK, true, "Me and my boys will never forget this! If you ever need some muscled bros, we'll be there for you!", "Sad Bro"]],
            [[SPEAK, true, "Yeah for sure! And don't forget to do some self care when you're feeling down, my bro.", "Helpful Bro"], [CAMERA_MOVE_TO_SPRITE, true, "Helpful Bro", false ]],
            [[SPEAK, true, "Damn right! My muscles may be hard like iron, my feelings are soft like a little puppy.", "Sad Bro"], [CAMERA_MOVE_TO_SPRITE, true, "Sad Bro", false ]],
            [[EMOTE, true, EMOTE_HEART, "Helpful Bro"], [EMOTE, true, EMOTE_HEART, "Sad Bro"]],
            [[SPEAK, true, "No problem bros, I'll remember you guys when I need some muscle!", PLAYER_NAME, "Sad Bro"], [CAMERA_MOVE_TO_SPRITE, true, PLAYER_NAME, false ]]
        ]]
    }
]

const assignEventIds = () => { 
    STORY_EVENTS.forEach( (event, index) => {
        event.id = "STORY_EVENT_"+index
    });
};
assignEventIds();

module.exports = {
    STORY_EVENTS,
    KEY_STORY_2,
    KEY_STORY_3
}