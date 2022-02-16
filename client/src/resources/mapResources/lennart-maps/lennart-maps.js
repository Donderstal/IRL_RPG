const { LONG_TALK_4, RANDOM_TALK_2, RANDOM_TALK_3, RANDOM_TALK_4, RANDOM_TALK_1, RANDOM_TALK_5 } = require('../../actionResources')
const B4 = require('./B/B4/B4')
const C2 = require('./C/C2/C2')
const C3 = require('./C/C3/C3')
const C4 = require('./C/C4/C4')
const D2 = require('./D/D2/D2')
const D3 = require('./D/D3/D3')
const D4 = require('./D/D4/D4')
const E3 = require('./E/E3/E3')
const NewtownHall = require('./C/C2/Newtown-Appartments/Newtown-Hall');
const NewtownAppartment1 = require('./C/C2/Newtown-Appartments/Newtown-left-bottom');
const NewtownAppartment2 = require('./C/C2/Newtown-Appartments/Newtown-left-top');
const NewtownAppartment3 = require('./C/C2/Newtown-Appartments/Newtown-top');
const NewtownAppartment4 = require('./C/C2/Newtown-Appartments/Newtown-right-top');
const NewtownAppartment5 = require('./C/C2/Newtown-Appartments/Newtown-right-bottom');

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
        RANDOM_TALK_4, 
        RANDOM_TALK_5,
        LONG_TALK_4
    ],
    "B4": B4,
    "C2": C2,
    "C3": C3,
    "C4": C4,
    "D2": D2,
    "D3": D3,
    "D4": D4,
    "E3": E3,

    // C2 submaps
    // Newtown appartments.
    "Newtown-Hall": NewtownHall,
    "Newtown-appartment-1": NewtownAppartment1,
    "Newtown-appartment-2": NewtownAppartment2,
    "Newtown-appartment-3": NewtownAppartment3,
    "Newtown-appartment-4": NewtownAppartment4,
    "Newtown-appartment-5": NewtownAppartment5
}