import { GRID_LEONARD_E3 } from './grid';
import { FRONT_GRID_LEONARD_E3 } from './frontgrid';
import { AnimationTypeEnum } from '../../../../enumerables/AnimationTypeEnum';
import { DirectionEnum } from '../../../../enumerables/DirectionEnum';
import { OutOfMapEnum } from '../../../../enumerables/OutOfMapEnum';

export default {
    "frontGrid": FRONT_GRID_LEONARD_E3,
    "grid": GRID_LEONARD_E3,
    "outdoors": true,
    "mapName": "leonard_heights/E3",
    "rows": 16,
    "columns": 24,
    "tileSet": "starting_neighbourhood_clean",
    "characters": [
        {
            "anim_type": AnimationTypeEnum.idle,
            "row": 6,
            "col": 23,
            "sprite": "pigeon.png",
            "direction": DirectionEnum.left
        }
    ],
    "mapObjects": [
        {
            "type": "gang_z",
            "row": 3,
            "col": 4
        },
        {
            "type": "Sign_03",
            "row": 3,
            "col": 13
        },
        {
            "type": "funz",
            "row": 6,
            "col": 17
        },
        {
            "type": "car_b",
            "row": 9,
            "col": 7,
            "direction": DirectionEnum.right
        },
        {
            "type": "water_puddle",
            "row": 11,
            "col": 10
        }
    ],
    "spawnPoints": [
        {
            "col": OutOfMapEnum.left,
            "row": 6,
            "direction": DirectionEnum.right
        },
        {
            "col": 10,
            "row": 6,
            "direction": DirectionEnum.down
        },
        {
            "col": 11,
            "row": 6,
            "direction": DirectionEnum.down
        },
        {
            "col": 11,
            "row": OutOfMapEnum.down,
            "direction": DirectionEnum.up
        }
    ],
    "roads": [

    ],
    "actions": [

    ]
}