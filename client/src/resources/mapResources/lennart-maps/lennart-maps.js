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
        "chad", "chad_recolour01", "chad_recolour02", "chad_recolour03",
        "character_x1_recolour01", "characterx3", "characterx4", "fats",
        "generic_balding_guy", "generic_blonde_guy", "neckbeard", "pony_tail",
        "pony_tail_recolour", "tumbler_girl_recolour01", "tumblr_girl",
        "tumbler_girl_recolour02"
    ],
    "characters_spawn_rate": 10000,
    "C4": C4,
    "D2": D2,
    "D3": D3,
    "D4": D4,
    "E3": E3
}