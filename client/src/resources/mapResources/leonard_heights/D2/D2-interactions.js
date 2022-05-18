const { DEFAULT, SPEAK, EVENT_TALK, EMOTE } = require('../../../../game-data/conditionGlobals');
const { EMOTE_HEART } = require('../../../../game-data/textboxGlobals');

const LOOKING_FOR_APPARTMENT_LADY = [
    [
        [ DEFAULT, false ],
        [ EVENT_TALK, false, "medium-text-blip.ogg", [
            [[SPEAK, true, "This is my favorite part of the city."]],
            [[SPEAK, true, "Like, there's nice cocktail bars and yoga studios."]],
            [[SPEAK, true, "But all the poor people are still here to give it a authentic vibe, you know?"]],
            [[SPEAK, true, "I'd love to move into the Gemini Towers, they're so luxurious!"]],
            [[SPEAK, true, "I'm wondering if there are any overpriced studio appartments for rent there!"]]
        ]]    
    ]    
]

const WHOLESOME_LIFTER_D2 = [
    [
        [ DEFAULT, false ],
        [ EVENT_TALK, false, "medium-text-blip.ogg", [
            [[SPEAK, true, "You know that a lot of people think that us buff guys are assholes?"]],
            [[SPEAK, true, "Just shows that they've no idea what they're talking about!"]],
            [[SPEAK, true, "I always visit my grandma, you know? Never skip a week!"]], 
            [[EMOTE, true, EMOTE_HEART]]
        ]]    
    ]    
]

module.exports = {
    LOOKING_FOR_APPARTMENT_LADY,
    WHOLESOME_LIFTER_D2
}