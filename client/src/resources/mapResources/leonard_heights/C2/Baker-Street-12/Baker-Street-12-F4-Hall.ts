import { LH_BAKER_STREET_12_F4_STAIRS_KEY } from "../../leonard_heights_res";
import { getBSStairHallDoors } from "./registries/BSDoorsFactory";
import BakerStreetStairsTemplate from "./templates/Baker-Street-Stairs-Template";

export default {
	"key": LH_BAKER_STREET_12_F4_STAIRS_KEY,
	...BakerStreetStairsTemplate,
	"doors": getBSStairHallDoors( LH_BAKER_STREET_12_F4_STAIRS_KEY ),
	"sprites": [
		{
			"type": "door_interior_north_green",
			"column": 4,
			"row": 4,
			"direction": 0
		},
		{
			"type": "graff_z1",
			"column": 6,
			"row": 1,
			"direction": 0
		},
		{
			"type": "stairs_3",
			"column": 2,
			"row": 4,
			"direction": 0
		},
		{
			"type": "stairs_3",
			"column": 1,
			"row": 4,
			"direction": 0
		}
	],
}