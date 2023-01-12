import { GRID_LEONARD_C1 } from './grid';
import { FRONT_GRID_LEONARD_C1 } from './frontgrid';
import { LOST_KEYS_INTERACTION } from './C1-interactions';
import { DirectionEnum } from '../../../../enumerables/DirectionEnum';
import { getInteractionNotRegisteredCondition } from '../../../conditionFactory';
import { AnimationTypeEnum } from '../../../../enumerables/AnimationTypeEnum';

export default {
    "frontGrid": FRONT_GRID_LEONARD_C1,
    "grid": GRID_LEONARD_C1,
    "outdoors": true,
    "rows": 16,
    "columns": 24,
    "tileSet": "starting_neighbourhood_clean",
    "sprites": [
        {
            "type": "collectable_coin",
            "row": 3,
            "column": 19,
            "condition": getInteractionNotRegisteredCondition( "TEST_KEY_2" ),
            "action": LOST_KEYS_INTERACTION
        },
        {
            "type": "funz",
            "row": 1,
            "column": 15
        },
        {
            "type": "Poster_Cola",
            "row": 2,
            "column": 1
        },
        {
            "type": "Poster_Gronk",
            "row": 2,
            "column": 5
        },
        {
            "type": "Poster_Cruise",
            "row": 2,
            "column": 9
        },
        {
            "type": "Poster_Cola",
            "row": 2,
            "column": 13
        },
        {
            "type": "Poster_Gronk",
            "row": 2,
            "column": 17
        },
        {
            "type": "gate_right",
            "row": 2,
            "column": 21
        },
        {
            "type": "gate_left",
            "row": 2,
            "column": 22
        },
        {
            "type": "tires_2",
            "row": 4,
            "column": 10
        },
        {
            "type": "car_b",
            "row": 3,
            "column": 3,
            "direction": DirectionEnum.up
        },
        {
            "type": "car_a",
            "row": 3,
            "column": 7,
            "direction": DirectionEnum.up
        },
        {
            "type": "car_c",
            "row": 5,
            "column": 17,
            "direction": DirectionEnum.down
        },
        {
            "type": "car_d",
            "row": 12,
            "column": 5,
            "direction": DirectionEnum.down
        },
        {
            "type": "vent_4",
            "row": 15,
            "column": 14
        },
        {
            "type": "vent_1",
            "row": 16,
            "column": 18
        },
        {
			"type": "car_police",
			"column": 13,
			"row": 3,
			"direction": 3
		},
		{
			"type": "POLICE MAN 1",
			"column": 9,
			"row": 6,
			"direction": 0,
			"anim_type": AnimationTypeEnum.idle
		},
		{
			"type": "POLICE MAN 2",
			"column": 10,
			"row": 6,
			"direction": 0,
			"anim_type": AnimationTypeEnum.idle
		},
		{
			"type": "POLICE WOMAN 1",
			"column": 11,
			"row": 6,
			"direction": 0,
			"anim_type": AnimationTypeEnum.idle
		},
		{
			"type": "POLICE MAN 1 VISOR",
			"column": 12,
			"row": 6,
			"direction": 0,
			"anim_type": AnimationTypeEnum.idle
		},
		{
			"type": "POLICE MAN 2 VISOR",
			"column": 13,
			"row": 6,
			"direction": 0,
			"anim_type": AnimationTypeEnum.idle
		},
		{
			"type": "POLICE WOMAN 1 VISOR",
			"column": 14,
			"row": 6,
			"direction": 0,
			"anim_type": AnimationTypeEnum.idle
		},
		{
			"type": "POLICE ROBOT",
			"column": 15,
			"row": 6,
			"direction": 0,
			"anim_type": AnimationTypeEnum.idle
		},
		{
			"type": "POLICE ROBOT",
			"column": 15,
			"row": 7,
			"direction": 2,
			"anim_type": AnimationTypeEnum.idle
		},
		{
			"type": "POLICE WOMAN 1 VISOR",
			"column": 14,
			"row": 7,
			"direction": 2,
			"anim_type": AnimationTypeEnum.idle
		},
		{
			"type": "POLICE MAN 2 VISOR",
			"column": 13,
			"row": 7,
			"direction": 2,
			"anim_type": AnimationTypeEnum.idle
		},
		{
			"type": "POLICE MAN 1 VISOR",
			"column": 12,
			"row": 7,
			"direction": 2,
			"anim_type": AnimationTypeEnum.idle
		},
		{
			"type": "POLICE WOMAN 1",
			"column": 11,
			"row": 7,
			"direction": 2,
			"anim_type": AnimationTypeEnum.idle
		},
		{
			"type": "POLICE MAN 2",
			"column": 10,
			"row": 7,
			"direction": 2,
			"anim_type": AnimationTypeEnum.idle
		},
		{
			"type": "POLICE MAN 1",
			"column": 9,
			"row": 7,
			"direction": 2,
			"anim_type": AnimationTypeEnum.idle
		},
		{
			"type": "POLICE MAN 1",
			"column": 9,
			"row": 8,
			"direction": 1,
			"anim_type": AnimationTypeEnum.idle
		},
		{
			"type": "POLICE MAN 2",
			"column": 10,
			"row": 8,
			"direction": 1,
			"anim_type": AnimationTypeEnum.idle
		},
		{
			"type": "POLICE WOMAN 1",
			"column": 11,
			"row": 8,
			"direction": 1,
			"anim_type": AnimationTypeEnum.idle
		},
		{
			"type": "POLICE MAN 1 VISOR",
			"column": 12,
			"row": 8,
			"direction": 1,
			"anim_type": AnimationTypeEnum.idle
		},
		{
			"type": "POLICE MAN 2 VISOR",
			"column": 13,
			"row": 8,
			"direction": 1,
			"anim_type": AnimationTypeEnum.idle
		},
		{
			"type": "POLICE WOMAN 1 VISOR",
			"column": 14,
			"row": 8,
			"direction": 1,
			"anim_type": AnimationTypeEnum.idle
		},
		{
			"type": "POLICE ROBOT",
			"column": 15,
			"row": 8,
			"direction": 1,
			"anim_type": AnimationTypeEnum.idle
		},
		{
			"type": "POLICE ROBOT",
			"column": 15,
			"row": 9,
			"direction": 3,
			"anim_type": AnimationTypeEnum.idle
		},
		{
			"type": "POLICE WOMAN 1 VISOR",
			"column": 14,
			"row": 9,
			"direction": 3,
			"anim_type": AnimationTypeEnum.idle
		},
		{
			"type": "POLICE MAN 2 VISOR",
			"column": 13,
			"row": 9,
			"direction": 3,
			"anim_type": AnimationTypeEnum.idle
		},
		{
			"type": "POLICE MAN 1 VISOR",
			"column": 12,
			"row": 9,
			"direction": 3,
			"anim_type": AnimationTypeEnum.idle
		},
		{
			"type": "POLICE WOMAN 1",
			"column": 11,
			"row": 9,
			"direction": 3,
			"anim_type": AnimationTypeEnum.idle
		},
		{
			"type": "POLICE MAN 2",
			"column": 10,
			"row": 9,
			"direction": 3,
			"anim_type": AnimationTypeEnum.idle
		},
		{
			"type": "POLICE MAN 1",
			"column": 9,
			"row": 9,
			"direction": 3,
			"anim_type": AnimationTypeEnum.idle
		},
		{
			"type": "car_police",
			"column": 11,
			"row": 3,
			"direction": 3
		},
		{
			"type": "car_police",
			"column": 2,
			"row": 14,
			"direction": 1
		},
		{
			"type": "car_police",
			"column": 20,
			"row": 3,
			"direction": 2
		},
		{
			"type": "car_police",
			"column": 19,
			"row": 12,
			"direction": 0
		},
		{
			"type": "car_police",
			"column": 17,
			"row": 12,
			"direction": 0
		}
    ],
    "actions": [

    ]
}