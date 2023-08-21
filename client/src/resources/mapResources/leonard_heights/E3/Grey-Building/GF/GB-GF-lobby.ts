import { MAP_IDS } from "../../../../mapIds";
import GBLobbyTemplate from "../GB-lobby-template";
import { LHGB_Lobby_Doors } from "../GBDoorsFactory";

export default {
    "key": MAP_IDS.GREY_BUILDING_GF_LOBBY,
    ...GBLobbyTemplate,
	"frontSprites": [],
    "triggers": [...LHGB_Lobby_Doors( MAP_IDS.GREY_BUILDING_GF_LOBBY ) ],
    "sprites": [
		{
			"type": "boarded_window",
			"column": 12,
			"row": 1,
			"direction": 0
		},
		{
			"type": "funz",
			"column": 1,
			"row": 2,
			"direction": 0
		},
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
			"column": 12,
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
			"type": "door_interior_west_light",
			"column": 12,
			"row": 7,
			"direction": 0
		},
		{
			"type": "crisps",
			"column": 12,
			"row": 8,
			"direction": 0
		},
		{
			"type": "chair_red_cushion_north",
			"column": 2,
			"row": 8,
			"direction": 0
		},
		{
			"type": "chair_red_cushion_north",
			"column": 3,
			"row": 8,
			"direction": 0
		},
		{
			"type": "chair_red_cushion_north",
			"column": 4,
			"row": 8,
			"direction": 0
		},
		{
			"type": "chair_red_cushion_north",
			"column": 10,
			"row": 8,
			"direction": 0
		},
		{
			"type": "glass",
			"column": 10,
			"row": 4,
			"direction": 0
		},
		{
			"type": "door_interior_east_light",
			"column": 1,
			"row": 7,
			"direction": 0
		},
		{
			"type": "wheelie_bin_left",
			"column": 8,
			"row": 5,
			"direction": 0
		},
		{
			"type": "shop_cupboard_a",
			"column": 4,
			"row": 5,
			"direction": 0
		},
		{
			"type": "ROBOT_BLACK",
			"column": 8,
			"row": 6,
			"direction": 0
		},
		{
			"type": "banana",
			"column": 7,
			"row": 5,
			"direction": 0
		},
		{
			"type": "trash_4",
			"column": 9,
			"row": 5,
			"direction": 0
		},
		{
			"type": "trash_3",
			"column": 8,
			"row": 6,
			"direction": 0
		},
		{
			"type": "trash_1",
			"column": 9,
			"row": 6,
			"direction": 0
		},
		{
			"type": "gang_z",
			"column": 6,
			"row": 4,
			"direction": 0
		},
		{
			"type": "BALD BEER BELLY GUY",
			"column": 12,
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
			"type": "door_interior_north_light",
			"column": 6,
			"row": 8,
			"direction": 0
		},
		{
			"type": "door_interior_north_light",
			"column": 7,
			"row": 8,
			"direction": 0
		}
	]
}