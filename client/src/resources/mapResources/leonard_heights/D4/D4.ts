import { GRID_LEONARD_D4 } from './grid';
import { FRONT_GRID_LEONARD_D4 } from './frontgrid';
import { AnimationTypeEnum } from '../../../../enumerables/AnimationTypeEnum';
import { DirectionEnum } from '../../../../enumerables/DirectionEnum';
import { OutOfMapEnum } from '../../../../enumerables/OutOfMapEnum';

export default {
    "frontGrid": FRONT_GRID_LEONARD_D4,
    "grid": GRID_LEONARD_D4,
    "outdoors": true,
    "mapName": "leonard_heights/D4",
    "rows": 16,
    "columns": 24,
    "tileSet": "starting_neighbourhood_clean",
    "characters": [
        {
            "anim_type": AnimationTypeEnum.idle,
            "row": 11,
            "col": 14,
            "sprite": "Bench_Green",
            "direction": false
        }
    ],
    "mapObjects": [
        {
            "type": "gang_z",
            "row": 3,
            "col": 20
        },
        {
            "type": "car_a",
            "row": 5,
            "col": 11,
            "direction": DirectionEnum.up
        },
        {
            "type": "Sign_01",
            "row": 5,
            "col": 14
        },
        {
            "type": "vent_4",
            "row": 5,
            "col": 16
        },
        {
            "type": "car_d",
            "row": 6,
            "col": 5,
            "direction": DirectionEnum.down
        },
        {
            "type": "wheelie_bin_right",
            "row": 7,
            "col": 19
        },
        {
            "type": "Bollard",
            "row": 8,
            "col": 15
        },
        {
            "type": "Bollard",
            "row": 8,
            "col": 18
        },
        {
            "type": "funz",
            "row": 8,
            "col": 22
        },
        {
            "type": "boxes",
            "row": 9,
            "col": 22
        },
        {
            "type": "banana",
            "row": 11,
            "col": 3
        },
        {
            "type": "office_chair",
            "row": 11,
            "col": 4
        }
    ],
    "spawnPoints": [
        {
            "col": 4,
            "row": OutOfMapEnum.up,
            "direction": DirectionEnum.down
        },
        {
            "col": 5,
            "row": OutOfMapEnum.up,
            "direction": DirectionEnum.down
        },
        {
            "col": 16,
            "row": 7,
            "direction": DirectionEnum.down
        },
        {
            "col": 17,
            "row": 7,
            "direction": DirectionEnum.down
        },
        {
            "col": OutOfMapEnum.left,
            "row": 9,
            "direction": DirectionEnum.right
        },
        {
            "col": OutOfMapEnum.right,
            "row": 10,
            "direction": DirectionEnum.left
        }
    ],
    "roads": [
        {
            "direction": DirectionEnum.left,
            "alignment": "HORI",
            "hasStart": true,
            "topRow": 13,
            "bottomRow": 14,
            "startCol": 24,
            "endCol": 1
        },
        {
            "direction": DirectionEnum.right,
            "alignment": "HORI",
            "hasStart": true,
            "topRow": 15,
            "bottomRow": 16,
            "startCol": 1,
            "endCol": 24
        },
        {
            "direction": DirectionEnum.up,
            "alignment": "VERT",
            "hasStart": false,
            "leftCol": 9,
            "rightCol": 10,
            "startRow": 16,
            "endRow": 1
        },
        {
            "direction": DirectionEnum.down,
            "alignment": "VERT",
            "hasStart": true,
            "leftCol": 7,
            "rightCol": 8,
            "startRow": 1,
            "endRow": 16
        }
    ],
    "actions": [

    ]
}