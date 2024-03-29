import { GRID_LEONARD_D3 } from './grid';
import { FRONT_GRID_LEONARD_D3 } from './frontgrid';
import { DirectionEnum } from '../../../../enumerables/DirectionEnum';

export default {
   "frontGrid":FRONT_GRID_LEONARD_D3,
   "grid":GRID_LEONARD_D3,
   "outdoors":true,
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
         "hasDoor": false
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
   "actions":[
      
   ]
}