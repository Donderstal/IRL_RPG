import { LH_GREY_BUILDING_F4_LOBBY } from "../../../leonard_heights_res";
import GBLobbyTemplate from "../GB-lobby-template";
import { LHGB_Lobby_Doors } from "../GBDoorsFactory";

export default {
    "key": LH_GREY_BUILDING_F4_LOBBY,
    ...GBLobbyTemplate,
    "frontSprites": [],
    "doors": LHGB_Lobby_Doors( LH_GREY_BUILDING_F4_LOBBY ),
	"sprites": [
		{
			"type": "elevator_door",
			"column": 2,
			"row": 2,
			"direction": 0
		},
		{
			"type": "elevator_door",
			"column": 11,
			"row": 2,
			"direction": 0
		},
		{
			"type": "stairs_1",
			"column": 11,
			"row": 3,
			"direction": 0
		},
		{
			"type": "stairs_1",
			"column": 2,
			"row": 3,
			"direction": 0
		},
		{
			"type": "stairs_1",
			"column": 10,
			"row": 3,
			"direction": 0
		},
		{
			"type": "stairs_1",
			"column": 1,
			"row": 3,
			"direction": 0
		},
		{
			"type": "stairs_1",
			"column": 3,
			"row": 3,
			"direction": 0
		},
		{
			"type": "stairs_1",
			"column": 12,
			"row": 3,
			"direction": 0
		},
		{
			"type": "POLICE ROBOT",
			"column": 3,
			"row": 5,
			"direction": 3
		},
		{
			"type": "water_puddle",
			"column": 5,
			"row": 6,
			"direction": 0
		},
		{
			"type": "water_puddle",
			"column": 6,
			"row": 7,
			"direction": 0
		},
		{
			"type": "water_puddle",
			"column": 7,
			"row": 7,
			"direction": 0
		},
		{
			"type": "water_puddle",
			"column": 9,
			"row": 6,
			"direction": 0
		},
		{
			"type": "water_puddle",
			"column": 8,
			"row": 6,
			"direction": 0
		},
		{
			"type": "water_puddle",
			"column": 12,
			"row": 8,
			"direction": 0
		},
		{
			"type": "water_puddle",
			"column": 1,
			"row": 8,
			"direction": 0
		},
		{
			"type": "water_puddle",
			"column": 2,
			"row": 7,
			"direction": 0
		},
		{
			"type": "door_interior_west_light",
			"column": 12,
			"row": 7,
			"direction": 0
		},
		{
			"type": "can_orange_1",
			"column": 8,
			"row": 7,
			"direction": 0
		},
		{
			"type": "can_red_1",
			"column": 8,
			"row": 5,
			"direction": 0
		},
		{
			"type": "door_interior_east_light",
			"column": 1,
			"row": 7,
			"direction": 0
		},
		{
			"type": "water_puddle",
			"column": 7,
			"row": 5,
			"direction": 0
		},
		{
			"type": "yellow_stand",
			"column": 1,
			"row": 5,
			"direction": 0
		},
		{
			"type": "yellow_stand",
			"column": 2,
			"row": 5,
			"direction": 0
		},
		{
			"type": "yellow_stand",
			"column": 10,
			"row": 5,
			"direction": 0
		},
		{
			"type": "yellow_stand",
			"column": 11,
			"row": 5,
			"direction": 0
		},
		{
			"type": "yellow_stand",
			"column": 12,
			"row": 5,
			"direction": 0
		}
	],
}