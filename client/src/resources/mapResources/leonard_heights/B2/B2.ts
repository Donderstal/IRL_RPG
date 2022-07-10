import { GRID_LEONARD_B2 } from './grid';
import { FRONT_GRID_LEONARD_B2 } from './frontgrid';
import { DirectionEnum } from '../../../../enumerables/DirectionEnum';
import { RoadAlignmentEnum } from '../../../../enumerables/RoadAlignmentEnum';

export default {
    "frontGrid": FRONT_GRID_LEONARD_B2,
    "grid": GRID_LEONARD_B2,
    "outdoors": true,
    "mapName": "leonard_heights/B2",
    "rows": 16,
    "columns": 24,
    "tileSet": "starting_neighbourhood_clean",
    "characters": [

    ],
    "mapObjects": [
        {
            "type": "gang_z",
            "row": 5,
            "col": 3
        },
        {
            "type": "yum_mart_sign",
            "row": 6,
            "col": 3
        },
        {
            "type": "funz",
            "row": 7,
            "col": 20
        }
    ],
    "spawnPoints": [

    ],
    "roads": [
        {
            "name": "CIN_ROAD_1",
            "direction": DirectionEnum.up,
            "alignment": RoadAlignmentEnum.vertical,
            "hasStart": true,
            "leftCol": 13,
            "rightCol": 14,
            "startRow": 16,
            "endRow": 1
        }
    ],
    "actions": [

    ]
}