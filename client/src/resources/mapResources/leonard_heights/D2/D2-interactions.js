const { DEFAULT, SPEAK, EVENT_TALK } = require('../../../../game-data/conditionGlobals');

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

module.exports = {
    LOOKING_FOR_APPARTMENT_LADY
}