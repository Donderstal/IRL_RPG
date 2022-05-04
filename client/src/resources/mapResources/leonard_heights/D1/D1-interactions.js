const { DEFAULT, EVENT_TALK, SPEAK } = require("../../../../game-data/conditionGlobals")

const FRIENDLY_CHAD = [
    [
        [ DEFAULT, false ],
        [ EVENT_TALK, false, "medium-text-blip.ogg", [
            [[SPEAK, true, "My bro's having some rough feels man."]],
            [[SPEAK, true, "We'd really appreciate you helping a bro out."]]
        ] ]
    ]
]

module.exports = {
    FRIENDLY_CHAD
}