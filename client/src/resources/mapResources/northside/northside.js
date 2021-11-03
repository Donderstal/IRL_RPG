const A1 = require('./A1/northside-A1');
const A2 = require('./A2/northside-A2');
const A3 = require('./A3/northside-A3');
const A4 = require('./A4/northside-A4');
const A5 = require('./A5/northside-A5');
const Z4 = require('./Z4/northside-Z4');

module.exports = {
    "name": "Northside",
    "horizontal_slots": ["A", "B", "C", "D", "E"], 
    "vertical_slots": ["1", "2"],
    "music": "game-jam.mp3",
    "cars": [ "car_a", "car_d", "car_c", "bus" ], 
    "cars_spawn_rate" : 10000,
    "characters" : [
        "monkey_ceo.png"
    ],
    "characters_spawn_rate": 2500,
    "A2": A1,
    "B2": A2,
    "C2": A3,
    "D1": Z4,
    "D2": A4,
    "E2": A5
}