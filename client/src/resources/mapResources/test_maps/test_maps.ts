import { MONKEY_CEO } from '../../spriteTypeResources';
import testMovement from './test-movement/test-movement';
import testRoads from './test-roads';
import test_pathfinding from './test_pathfinding';

export default {
    "name": "test-maps",
    "horizontal_slots": ["A", "B", "C", "D", "E"],
    "vertical_slots": ["1", "2", "3", "4"],
    "music": "Theme_Overworld_1_HDR.mp3",
    "cars": ["car_b", "car_c", "bus"],
    "cars_spawn_rate": 20000,
    "characters_spawn_rate": 5000,
    "characters": [ MONKEY_CEO ],
    "spawnable_actions": [],
    "mapDictionary": {
        "A1": testMovement,
        "B1": testRoads,
        "B2": test_pathfinding
    }
}