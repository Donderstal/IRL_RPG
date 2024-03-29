import { GRID_LEONARD_D1 } from './grid';
import { FRONT_GRID_LEONARD_D1 } from './frontgrid';
import { LOGGABLE_INTERACTION_7 } from '../../../../game-data/interactionGlobals';
import { DirectionEnum } from '../../../../enumerables/DirectionEnum';
import { AnimationTypeEnum } from '../../../../enumerables/AnimationTypeEnum';
import { STRONG_GUY, TOUGH_GUY } from '../../../spriteTypeResources';
import { ANIM_BOP, ANIM_LIFT } from '../../../../game-data/animationGlobals';
import { getInteractionNotRegisteredCondition, getInteractionRegisteredCondition } from '../../../../factories/conditionFactory';
import { CUTSCENE_IDS } from '../../../eventChainResources/cutsceneIds';
import { EventChainType } from '../../../../enumerables/EventChainType';

const ID_HELPFUL_BRO = "ID_HELPFUL_BRO";
const ID_D1_WHOLESOME_LIFTER_1 = "ID_D1_WHOLESOME_LIFTER_1";
const ID_D1_WHOLESOME_LIFTER_2 = "ID_D1_WHOLESOME_LIFTER_2";

export default {
    "frontGrid": FRONT_GRID_LEONARD_D1,
    "grid": GRID_LEONARD_D1,
   "outdoors":true,
   "rows":16,
   "columns":24,
   "tileSet":"starting_neighbourhood_clean",
   "sprites":[
      {
         "anim_type":AnimationTypeEnum.idle,
         "row":5,
         "column":21,
         "type": STRONG_GUY,
         "direction":DirectionEnum.right,
           "name": "Helpful Bro",
           "id": ID_HELPFUL_BRO,
         "condition": getInteractionNotRegisteredCondition( LOGGABLE_INTERACTION_7 )
      },
      {
         "anim_type": AnimationTypeEnum.animationLoop,
         "anim_name":ANIM_BOP,
         "row":5,
         "column":22,
         "type": TOUGH_GUY,
         "direction": DirectionEnum.up,
         "name":"Sad Bro",
          "condition": getInteractionNotRegisteredCondition( LOGGABLE_INTERACTION_7 )
      },
      {
         "anim_type": AnimationTypeEnum.animationLoop,
         "anim_name": ANIM_LIFT,
         "row":5,
         "column":21,
         "type": STRONG_GUY,
         "direction": DirectionEnum.left,
         "name": "Wholesome Lifter 1",
          "id": ID_D1_WHOLESOME_LIFTER_1,
          "condition": getInteractionRegisteredCondition( LOGGABLE_INTERACTION_7 )
      },
      {
         "anim_type": AnimationTypeEnum.animationLoop,
         "anim_name": ANIM_LIFT,
         "row":5,
         "column":22,
         "type": TOUGH_GUY,
         "direction": DirectionEnum.left,
         "name": "Wholesome Lifter 2",
          "�d": ID_D1_WHOLESOME_LIFTER_2,
          "condition": getInteractionRegisteredCondition( LOGGABLE_INTERACTION_7 )
      },
      {
         "type":"funz",
         "row":1,
         "column":6
      },
      {
         "type":"gate_stuk8",
         "row":4,
         "column":6
      },
      {
         "type":"gate_stuk1",
         "row":4,
         "column":7
      },
      {
         "type":"gate_stuk1",
         "row":4,
         "column":8
      },
      {
         "type":"gate_stuk1",
         "row":4,
         "column":9
      },
      {
         "type":"gate_stuk1",
         "row":4,
         "column":10
      },
      {
         "type":"gate_stuk1",
         "row":4,
         "column":11
      },
      {
         "type":"gate_stuk1",
         "row":4,
         "column":12
      },
      {
         "type":"gate_stuk1",
         "row":4,
         "column":13
      },
      {
         "type":"gate_stuk1",
         "row":4,
         "column":14
      },
      {
         "type":"gate_stuk1",
         "row":4,
         "column":15
      },
      {
         "type":"gate_stuk1",
         "row":4,
         "column":16
      },
      {
         "type":"gate_stuk1",
         "row":4,
         "column":17
      },
      {
         "type":"gate_stuk1",
         "row":4,
         "column":18
      },
      {
         "type":"gate_stuk1",
         "row":4,
         "column":19
      },
      {
         "type":"gate_stuk1",
         "row":4,
         "column":20
      },
      {
         "type":"gate_stuk1",
         "row":4,
         "column":21
      },
      {
         "type":"gate_stuk1",
         "row":4,
         "column":22
      },
      {
         "type":"gate_stuk4",
         "row":5,
         "column":6
      },
      {
         "type":"gang_z",
         "row":5,
         "column":24
      },
      {
         "type":"gate_stuk4",
         "row":6,
         "column":6
      },
      {
         "type":"gate_stuk6",
         "row":6,
         "column":9
      },
      {
         "type":"trash_3",
         "row":6,
         "column":11
      },
      {
         "type":"gate_stuk12",
         "row":6,
         "column":16
      },
      {
         "type":"gate_stuk4",
         "row":7,
         "column":6
      },
      {
         "type":"plants",
         "row":7,
         "column":7
      },
      {
         "type":"gate_stuk4",
         "row":7,
         "column":9
      },
      {
         "type":"bench_a",
         "row":7,
         "column":10
      },
      {
         "type":"bench_a",
         "row":7,
         "column":14
      },
      {
         "type":"gate_stuk10",
         "row":7,
         "column":16
      },
      {
         "type":"plants",
         "row":7,
         "column":18
      },
      {
         "type":"gate_stuk4",
         "row":8,
         "column":6
      },
      {
         "type":"gate_stuk3",
         "row":8,
         "column":9
      },
      {
         "type":"gate_stuk1",
         "row":8,
         "column":10
      },
      {
         "type":"gate_stuk1",
         "row":8,
         "column":11
      },
      {
         "type":"gate_stuk1",
         "row":8,
         "column":12
      },
      {
         "type":"gate_stuk1",
         "row":8,
         "column":13
      },
      {
         "type":"gate_stuk1",
         "row":8,
         "column":14
      },
      {
         "type":"gate_stuk1",
         "row":8,
         "column":15
      },
      {
         "type":"gate_stuk9",
         "row":8,
         "column":16
      },
      {
         "type":"gate_stuk4",
         "row":9,
         "column":6
      },
      {
         "type":"vent_3",
         "row":10,
         "column":4
      },
      {
         "type":"gate_stuk4",
         "row":10,
         "column":6
      },
      {
         "type":"plants",
         "row":10,
         "column":7
      },
      {
         "type":"gate_stuk6",
         "row":10,
         "column":10
      },
      {
         "type":"gate_stuk12",
         "row":10,
         "column":15
      },
      {
         "type":"plants",
         "row":10,
         "column":18
      },
      {
         "type":"office_chair",
         "row":10,
         "column":21
      },
      {
         "type":"gate_stuk4",
         "row":11,
         "column":6
      },
      {
         "type":"gate_stuk3",
         "row":11,
         "column":10
      },
      {
         "type":"gate_stuk1",
         "row":11,
         "column":11
      },
      {
         "type":"gate_stuk14",
         "row":11,
         "column":12
      },
      {
         "type":"gate_stuk8",
         "row":11,
         "column":13
      },
      {
         "type":"gate_stuk1",
         "row":11,
         "column":14
      },
      {
         "type":"gate_stuk9",
         "row":11,
         "column":15
      },
      {
         "type":"gate_stuk3",
         "row":12,
         "column":6
      },
      {
         "type":"gate_stuk1",
         "row":12,
         "column":7
      },
      {
         "type":"gate_stuk1",
         "row":12,
         "column":8
      },
      {
         "type":"gate_stuk1",
         "row":12,
         "column":9
      },
      {
         "type":"gate_stuk1",
         "row":12,
         "column":10
      },
      {
         "type":"gate_stuk1",
         "row":12,
         "column":11
      },
      {
         "type":"gate_stuk9",
         "row":12,
         "column":12
      },
      {
         "type":"gate_stuk3",
         "row":12,
         "column":13
      },
      {
         "type":"gate_stuk1",
         "row":12,
         "column":14
      },
      {
         "type":"gate_stuk1",
         "row":12,
         "column":15
      },
      {
         "type":"gate_stuk1",
         "row":12,
         "column":16
      },
      {
         "type":"gate_stuk1",
         "row":12,
         "column":17
      },
      {
         "type":"gate_stuk1",
         "row":12,
         "column":18
      },
      {
         "type":"gate_stuk1",
         "row":12,
         "column":19
      },
      {
         "type":"gate_stuk1",
         "row":12,
         "column":20
      },
      {
         "type":"gate_stuk1",
         "row":12,
         "column":21
      },
      {
         "type":"gate_stuk1",
         "row":12,
         "column":22
      }
   ],
   "triggers":[
       {
           "eventChainType": EventChainType.cutscene,
           "eventId": CUTSCENE_IDS.D1_FRIENDLY_CHAD,
           "spriteId": ID_HELPFUL_BRO
       },
       {
           "eventChainType": EventChainType.cutscene,
           "eventId": CUTSCENE_IDS.D1_WHOLESOME_LIFTER,
           "spriteId": ID_D1_WHOLESOME_LIFTER_1
       },
       {
           "eventChainType": EventChainType.cutscene,
           "eventId": CUTSCENE_IDS.D1_WHOLESOME_LIFTER,
           "spriteId": ID_D1_WHOLESOME_LIFTER_2
       },
   ]
}