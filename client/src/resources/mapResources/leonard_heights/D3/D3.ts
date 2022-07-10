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
   "characters":[
      
   ],
   "mapObjects":[
      {
         "type":"tires_1",
         "row":4,
         "col":8
      },
      {
         "type":"car_b",
         "row":4,
         "col":9,
         "direction": DirectionEnum.down
      },
      {
         "type":"door_4",
         "row":8,
         "col":4,
         "hasDoor":true,
         "directionIn":"",
         "destination":""
      },
      {
         "type":"funz",
         "row":8,
         "col":5
      },
      {
         "type":"wheelie_bin_right",
         "row":8,
         "col":7
      },
      {
         "type":"bench_a",
         "row":11,
         "col":8
      }
   ],
   "spawnPoints":[
      
   ],
   "roads":[
      {
         "direction": DirectionEnum.up,
         "alignment":RoadAlignmentEnum.vertical,
         "hasStart":false,
         "leftCol":13,
         "rightCol":14,
         "startRow":15,
         "endRow":1
      },
      {
         "direction": DirectionEnum.down,
         "alignment":RoadAlignmentEnum.vertical,
         "hasStart":true,
         "leftCol":11,
         "rightCol":12,
         "startRow":1,
         "endRow":13
      },
      {
          "direction": DirectionEnum.right,
         "alignment":RoadAlignmentEnum.horizontal,
         "hasStart":false,
         "topRow":14,
         "bottomRow":15,
         "startCol":9,
         "endCol":14
      },
      {
         "direction": DirectionEnum.left,
         "alignment":RoadAlignmentEnum.horizontal,
         "hasStart":false,
         "topRow":12,
         "bottomRow":13,
         "startCol":12,
         "endCol":7
      },
      {
          "direction": DirectionEnum.down,
         "alignment":RoadAlignmentEnum.vertical,
         "hasStart":false,
         "leftCol":7,
         "rightCol":8,
         "startRow":12,
         "endRow":16
      },
      {
          "direction": DirectionEnum.up,
         "alignment":RoadAlignmentEnum.vertical,
         "hasStart":true,
         "leftCol":9,
         "rightCol":10,
         "startRow":16,
         "endRow":14
      },
      {
          "direction": DirectionEnum.right,
         "alignment":RoadAlignmentEnum.horizontal,
         "hasStart":false,
         "topRow":10,
         "bottomRow":11,
         "startCol":11,
         "endCol":24
      },
      {
          "direction": DirectionEnum.left,
         "alignment":RoadAlignmentEnum.horizontal,
         "hasStart":true,
         "topRow":8,
         "bottomRow":9,
         "startCol":24,
         "endCol":11
      }
   ],
   "actions":[
      
   ]
}