import { DEFAULT, EVENT_TALK, SPEAK } from "../../../../game-data/conditionGlobals";

export const WHOLESOME_LIFTER_E4 = [
    [
        [ DEFAULT, false ],
        [ EVENT_TALK, false, "medium-text-blip.ogg", [
            [[SPEAK, true, "Lifting is the best bro!"]],
            [[SPEAK, true, "Really increases your self-esteem too, you should try it."]]
        ]]
    ]
]