import testMovement from './test-movement/test-movement';
import testRoads from './test-roads';

export default {
    "name": "test-maps",
    "horizontal_slots": ["A", "B", "C", "D", "E"],
    "vertical_slots": ["1", "2", "3", "4"],
    "music": "Theme_Overworld_1_HDR.mp3",
    "cars": ["car_b", "car_c", "bus"],
    "cars_spawn_rate": 15000,
    "characters_spawn_rate": 10000,
    "characters": [],
    "spawnable_actions": [],
    "mapDictionary": {
        "A1": testMovement,
        "B1": testRoads
    }
}