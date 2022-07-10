import globals from '../../../../game-data/globals';
import { GRID_LEONARD_D2 } from './grid';
import { FRONT_GRID_LEONARD_D2 } from './frontgrid';
import { LOOKING_FOR_APPARTMENT_LADY, WHOLESOME_LIFTER_D2 } from './D2-interactions';
import { AnimationTypeEnum } from '../../../../enumerables/AnimationTypeEnum';
import { DirectionEnum } from '../../../../enumerables/DirectionEnum';
import { RoadAlignmentEnum } from '../../../../enumerables/RoadAlignmentEnum';
import { OutOfMapEnum } from '../../../../enumerables/OutOfMapEnum';

export default {
    "frontGrid": FRONT_GRID_LEONARD_D2,
    "grid": GRID_LEONARD_D2,
    "outdoors": true,
    "mapName": "leonard_heights/D2",
    "rows": 16,
    "columns": 24,
    "tileSet": "starting_neighbourhood_clean",
    "characters": [
        {
            "anim_type": AnimationTypeEnum.idle,
            "sprite": "tumbler_girl_recolour02.png",
            "direction": DirectionEnum.left,
            "row": 9,
            "col": 18,
            "action": LOOKING_FOR_APPARTMENT_LADY
        },
        {
            "anim_type": AnimationTypeEnum.animationLoop,
            "anim_name": "LIFT",
            "row": 9,
            "col": 8,
            "sprite": "chad.png",
            "direction": DirectionEnum.left,
            "name": "Wholesome Lifter",
            "action": WHOLESOME_LIFTER_D2
        }
    ],
    "mapObjects": [
        {
            "type": "Sign_03",
            "row": 6,
            "col": 15
        },
        {
            "type": "pot_plant_a",
            "row": 9,
            "col": 3
        },
        {
            "type": "boxes",
            "row": 9,
            "col": 9
        },
        {
            "type": "hotel_sign",
            "row": 15,
            "col": 18
        }
    ],
    "spawnPoints": [
        {
            "col": 12,
            "row": OutOfMapEnum.up,
            "direction": DirectionEnum.down
        },
        {
            "col": OutOfMapEnum.left,
            "row": 9,
            "direction": DirectionEnum.right
        },
        {
            "col": 18,
            "row": 10,
            "direction": DirectionEnum.left,
        },
        {
            "col": OutOfMapEnum.left,
            "row": 11,
            "direction": DirectionEnum.right
        },
        {
            "col": 9,
            "row": OutOfMapEnum.down,
            "direction": DirectionEnum.up
        },
        {
            "col": 17,
            "row": OutOfMapEnum.down,
            "direction": DirectionEnum.up
        },
        {
            "col": 18,
            "row": OutOfMapEnum.down,
            "direction": DirectionEnum.up
        }
    ],
    "roads": [
        {
            "direction": DirectionEnum.right,
            "alignment": RoadAlignmentEnum.horizontal,
            "hasStart": true,
            "topRow": 14,
            "bottomRow": 15,
            "startCol": 1,
            "endCol": 12
        },
        {
            "direction": DirectionEnum.left,
            "alignment": RoadAlignmentEnum.horizontal,
            "hasStart": false,
            "topRow": 12,
            "bottomRow": 13,
            "startCol": 14,
            "endCol": 1
        },
        {
            "direction": DirectionEnum.up,
            "alignment": RoadAlignmentEnum.vertical,
            "hasStart": true,
            "leftCol": 13,
            "rightCol": 14,
            "startRow": 16,
            "endRow": 12
        },
        {
            "direction": DirectionEnum.down,
            "alignment": RoadAlignmentEnum.vertical,
            "hasStart": false,
            "leftCol": 11,
            "rightCol": 12,
            "startRow": 14,
            "endRow": 16
        }
    ],
    "actions": [

    ]
}
