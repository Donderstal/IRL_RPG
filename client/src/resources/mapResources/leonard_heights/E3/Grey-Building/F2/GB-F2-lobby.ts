import { LH_GREY_BUILDING_F2_LOBBY } from "../../../leonard_heights_res";
import GBLobbyTemplate from "../GB-lobby-template";
import { LHGB_Lobby_Doors } from "../GBDoorsFactory";

export default {
    "key": LH_GREY_BUILDING_F2_LOBBY,
    ...GBLobbyTemplate,
	"frontSprites": [],
    "doors": LHGB_Lobby_Doors( LH_GREY_BUILDING_F2_LOBBY ),
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
			"type": "POLICE ROBOT",
			"column": 12,
			"row": 7,
			"direction": 1
		},
		{
			"type": "bin_x",
			"column": 3,
			"row": 4,
			"direction": 0
		},
		{
			"type": "boxes",
			"column": 8,
			"row": 5,
			"direction": 0
		},
		{
			"type": "no_entry_sign",
			"column": 10,
			"row": 4,
			"direction": 0
		},
		{
			"type": "no_entry_sign",
			"column": 11,
			"row": 5,
			"direction": 0
		},
		{
			"type": "house_plant",
			"column": 4,
			"row": 5,
			"direction": 0
		}
	],
}