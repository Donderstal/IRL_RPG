import { LH_GREY_BUILDING_F1_LOBBY } from "../../../leonard_heights_res";
import GBLobbyTemplate from "../GB-lobby-template";
import { LHGB_Lobby_Doors } from "../GBDoorsFactory";

export default {
    "key": LH_GREY_BUILDING_F1_LOBBY,
    ...GBLobbyTemplate,
	"frontSprites": [],
    "doors": LHGB_Lobby_Doors( LH_GREY_BUILDING_F1_LOBBY ),
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
			"type": "house_plant",
			"column": 6,
			"row": 5,
			"direction": 0
		},
		{
			"type": "house_plant",
			"column": 7,
			"row": 5,
			"direction": 0
		},
		{
			"type": "plant_yo",
			"column": 9,
			"row": 5,
			"direction": 0
		},
		{
			"type": "plant_yo",
			"column": 4,
			"row": 5,
			"direction": 0
		},
		{
			"type": "tableB",
			"column": 8,
			"row": 6,
			"direction": 0
		},
		{
			"type": "chair_red_cushion_west",
			"column": 9,
			"row": 6,
			"direction": 0
		},
		{
			"type": "chair_red_cushion_west",
			"column": 6,
			"row": 6,
			"direction": 0
		},
		{
			"type": "chair_red_cushion_east",
			"column": 7,
			"row": 6,
			"direction": 0
		},
		{
			"type": "chair_red_cushion_east",
			"column": 4,
			"row": 6,
			"direction": 0
		},
		{
			"type": "bar_lights",
			"column": 5,
			"row": 3,
			"direction": 0
		},
		{
			"type": "tableB",
			"column": 5,
			"row": 6,
			"direction": 0
		},
		{
			"type": "bin_x",
			"column": 12,
			"row": 4,
			"direction": 0
		},
		{
			"type": "bin_x",
			"column": 1,
			"row": 4,
			"direction": 0
		},
		{
			"type": "GREEN HAIR LADY",
			"column": 11,
			"row": 5,
			"direction": 0
		}
	]
}