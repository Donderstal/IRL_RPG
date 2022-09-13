import { GRID_LEONARD_B3 } from './grid';
import { FRONT_GRID_LEONARD_B3 } from './frontgrid';
import { GUY_WHO_LOST_HIS_KEYS } from './B3-interactions';
import { AnimationTypeEnum } from '../../../../enumerables/AnimationTypeEnum';
import { DirectionEnum } from '../../../../enumerables/DirectionEnum';
import { DORKY_GUY, PIGEON } from '../../../spriteTypeResources';
export default {
    "frontGrid": FRONT_GRID_LEONARD_B3,
    "grid": GRID_LEONARD_B3,
    "outdoors": true,
    "rows": 16,
    "columns": 24,
    "tileSet": "starting_neighbourhood_clean",
    "sprites": [
        {
            "anim_type": AnimationTypeEnum.idle,
            "row": 2,
            "column": 4,
            "type": PIGEON,
            "direction": DirectionEnum.left
        },
        {
            "anim_type": AnimationTypeEnum.idle,
            "row": 9,
            "column": 20,
            "direction": DirectionEnum.down,
            "type": DORKY_GUY,
            "action": GUY_WHO_LOST_HIS_KEYS
        },
        {
            "type": "gate_stuk14",
            "row": 6,
            "column": 9
        },
        {
            "type": "tree",
            "row": 7,
            "column": 7
        },
        {
            "type": "gate_stuk10",
            "row": 7,
            "column": 9
        },
        {
            "type": "gate_stuk1",
            "row": 8,
            "column": 5
        },
        {
            "type": "gate_stuk1",
            "row": 8,
            "column": 6
        },
        {
            "type": "gate_stuk1",
            "row": 8,
            "column": 7
        },
        {
            "type": "gate_stuk1",
            "row": 8,
            "column": 8
        },
        {
            "type": "gate_stuk9",
            "row": 8,
            "column": 9
        },
        {
            "type": "bench_a",
            "row": 9,
            "column": 1
        },
        {
            "type": "pot_plant_a",
            "row": 9,
            "column": 3
        },
        {
            "type": "pot_plant_a",
            "row": 9,
            "column": 4
        },
        {
            "type": "bench_a",
            "row": 9,
            "column": 5
        },
        {
            "type": "pot_plant_a",
            "row": 9,
            "column": 7
        },
        {
            "type": "pot_plant_a",
            "row": 9,
            "column": 8
        },
        {
            "type": "vent_4",
            "row": 15,
            "column": 11
        }
    ],
    "actions": [

    ]
}