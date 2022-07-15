import { GRID_LEONARD_D3 } from './grid';
import { FRONT_GRID_LEONARD_D3 } from './frontgrid';
import { DirectionEnum } from '../../../../enumerables/DirectionEnum';
import { RoadAlignmentEnum } from '../../../../enumerables/RoadAlignmentEnum';

export default {
   "frontGrid":FRONT_GRID_LEONARD_D3,
   "grid":GRID_LEONARD_D3,
   "outdoors":true,
   "mapName":"leonard_heights/D3",
   "rows":16,
   "columns":24,
   "tileSet":"starting_neighbourhood_clean",
   "sprites":[
      {
         "type":"tires_1",
         "row":4,
         "column":8
      },
      {
         "type":"car_b",
         "row":4,
         "column":9,
         "direction": DirectionEnum.down
      },
      {
         "type":"door_4",
         "row":8,
         "column":4,
         "hasDoor":true,
         "directionIn":"",
         "destination":""
      },
      {
         "type":"funz",
         "row":8,
         "column":5
      },
      {
         "type":"wheelie_bin_right",
         "row":8,
         "column":7
      },
      {
         "type":"bench_a",
         "row":11,
         "column":8
      }
   ],
   "spawnPoints":[
      
   ],
   "roads":[
      {
         "direction": DirectionEnum.up,
         "alignment":RoadAlignmentEnum.vertical,
         "hasStart":false,
         "primaryColumn":13,
         "secondaryColumn":14,
         "primaryRow":15,
         "secondaryRow":1
      },
      {
         "direction": DirectionEnum.down,
         "alignment":RoadAlignmentEnum.vertical,
         "hasStart":true,
         "primaryColumn":11,
         "secondaryColumn":12,
         "primaryRow":1,
         "secondaryRow":13
      },
      {
          "direction": DirectionEnum.right,
         "alignment":RoadAlignmentEnum.horizontal,
         "hasStart":false,
         "primaryRow":14,
         "secondaryRow":15,
         "primaryColumn":9,
         "secondaryColumn":14
      },
      {
         "direction": DirectionEnum.left,
         "alignment":RoadAlignmentEnum.horizontal,
         "hasStart":false,
         "primaryRow":12,
         "secondaryRow":13,
         "primaryColumn":12,
         "secondaryColumn":7
      },
      {
          "direction": DirectionEnum.down,
         "alignment":RoadAlignmentEnum.vertical,
         "hasStart":false,
         "primaryColumn":7,
         "secondaryColumn":8,
         "primaryRow":12,
         "secondaryRow":16
      },
      {
          "direction": DirectionEnum.up,
         "alignment":RoadAlignmentEnum.vertical,
         "hasStart":true,
         "primaryColumn":9,
         "secondaryColumn":10,
         "primaryRow":16,
         "secondaryRow":14
      },
      {
          "direction": DirectionEnum.right,
         "alignment":RoadAlignmentEnum.horizontal,
         "hasStart":false,
         "primaryRow":10,
         "secondaryRow":11,
         "primaryColumn":11,
         "secondaryColumn":24
      },
      {
          "direction": DirectionEnum.left,
         "alignment":RoadAlignmentEnum.horizontal,
         "hasStart":true,
         "primaryRow":8,
         "secondaryRow":9,
         "primaryColumn":24,
         "secondaryColumn":11
      }
   ],
   "actions":[
      
   ]
}