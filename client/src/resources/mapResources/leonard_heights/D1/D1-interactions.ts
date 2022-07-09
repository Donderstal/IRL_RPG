import { DEFAULT, EVENT_TALK, SPEAK } from "../../../../game-data/conditionGlobals"

export const FRIENDLY_CHAD = [
    [
        [ DEFAULT, false ],
        [ EVENT_TALK, false, "medium-text-blip.ogg", [
            [[SPEAK, true, "My bro's having some rough feels man."]],
            [[SPEAK, true, "We'd really appreciate you helping a bro out."]]
        ] ]
    ]
]

export const WHOLESOME_LIFTER = [
    [
        [ DEFAULT, false ],
        [ EVENT_TALK, false, "medium-text-blip.ogg", [
            [[SPEAK, true, "What could be better than pumping iron with your bros?"]],
        ] ]
    ]
]