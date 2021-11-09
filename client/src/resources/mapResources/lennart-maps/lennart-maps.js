const { RANDOM_TALK_2, RANDOM_TALK_3, RANDOM_TALK_4, RANDOM_TALK_1 } = require('../../actionResources')
const C4 = require('./C/C4/C4')
const D2 = require('./D/D2/D2')
const D3 = require('./D/D3/D3')
const D4 = require('./D/D4/D4')
const E3 = require('./E/E3/E3')

module.exports = {
    "name": "Leonard Heights",
    "horizontal_slots": ["A", "B", "C", "D", "E"], 
    "vertical_slots": ["1", "2", "3", "4"],
    "music": "Theme_Overworld_1_HDR.mp3",
    "cars": [ "car_b", "car_c", "bus" ], 
    "cars_spawn_rate" : 15000,
    "characters" : [
        "chad.png", "chad_recolour01.png", "chad_recolour02.png", "chad_recolour03.png",
        "character_x1_recolour01.png", "characterx3.png", "characterx4.png", "fats.png",
        "generic_balding_guy.png", "generic_blonde_guy.png", "neckbeard.png", "pony_tail.png",
        "pony_tail_recolour.png", "tumbler_girl_recolour01.png", "tumblr_girl.png",
        "tumbler_girl_recolour02.png"
    ],
    "characters_spawn_rate": 10000,
    "spawnable_actions": [
        RANDOM_TALK_1,
        RANDOM_TALK_2,
        RANDOM_TALK_3,
        RANDOM_TALK_4
    ],
    "C4": C4,
    "D2": D2,
    "D3": D3,
    "D4": D4,
    "E3": E3
}