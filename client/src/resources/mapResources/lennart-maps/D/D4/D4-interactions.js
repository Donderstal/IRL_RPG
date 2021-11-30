const { getAction } = require('../../../../../helpers/actionDtoFactory');
const { DEFAULT, EVENT_TALK, SPEAK, EMOTE, SPEAK_YES_NO} = require('../../../../../game-data/conditionGlobals');
const { PLAYER_NAME } = require('../../../../../game-data/interactionGlobals');
const { EMOTE_HEART, EMOTE_ANGRY } = require('../../../../../game-data/textboxGlobals');

const SHADY_MAN = [ 
    getAction( 
        [ DEFAULT, false ],
        [ EVENT_TALK, false, "voice-1.mp3", [ 
            [[SPEAK_YES_NO, "I'm the shadiest guy around. Did you know that?", 
                [
                    [[EMOTE, EMOTE_HEART]],
                    [[SPEAK, "Good. Spread the word."]]
                ],
                [
                    [[EMOTE, EMOTE_ANGRY]],
                    [[SPEAK, "Well now you know. Tell your friends.", false]]
                ],
                false, PLAYER_NAME
            ]],
        ]]
    )
]

module.exports = { 
    SHADY_MAN
}