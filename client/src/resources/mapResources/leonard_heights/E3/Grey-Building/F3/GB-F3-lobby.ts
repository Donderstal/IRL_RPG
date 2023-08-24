import { MAP_IDS } from "../../../../mapIds";
import GBLobbyTemplate from "../GB-lobby-template";
import { LHGB_Lobby_Doors } from "../GBDoorsFactory";

export default {
    "key": MAP_IDS.LEONARD_HEIGHTS.GREY_BUILDING_F3_LOBBY,
    ...GBLobbyTemplate,
	"frontSprites": [],
    "triggers": [...LHGB_Lobby_Doors( MAP_IDS.LEONARD_HEIGHTS.GREY_BUILDING_F3_LOBBY )],
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
			"type": "door_interior_west_light",
			"column": 12,
			"row": 7,
			"direction": 0
		},
		{
			"type": "door_interior_east_light",
			"column": 1,
			"row": 7,
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
			"type": "chair_red_cushion",
			"column": 4,
			"row": 5,
			"direction": 0
		},
		{
			"type": "chair_red_cushion",
			"column": 9,
			"row": 5,
			"direction": 0
		},
		{
			"type": "Poster_Gronk",
			"column": 6,
			"row": 4,
			"direction": 0
		},
		{
			"type": "water_puddle",
			"column": 7,
			"row": 7,
			"direction": 0
		},
		{
			"type": "yellow_stand",
			"column": 8,
			"row": 7,
			"direction": 0
		},
		{
			"type": "yellow_stand",
			"column": 6,
			"row": 7,
			"direction": 0
		},
		{
			"type": "tableD",
			"column": 8,
			"row": 5,
			"direction": 0
		},
		{
			"type": "DARK HAIR NERD LADY",
			"column": 5,
			"row": 5,
			"direction": 0
		}
	]
}