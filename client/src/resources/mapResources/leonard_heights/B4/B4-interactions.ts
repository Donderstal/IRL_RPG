import { DEFAULT, EVENT_TALK, SPEAK } from "../../../../game-data/conditionGlobals"

export const WHOLESOME_LIFTER_B4 = [
    [
        [ DEFAULT, false ],
        [ EVENT_TALK, false, "medium-text-blip.ogg", [
            [[SPEAK, true, "Just another day lifting and being handsome!"]],
            [[SPEAK, true, "If you need some dumbbells I can't help ya though..."]],
            [[SPEAK, true, "I only hand them out to my bros, or bros of my bros!"]]
        ] ]
    ]
]