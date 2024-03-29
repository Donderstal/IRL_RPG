import { MAP_IDS } from "../../../mapIds";
import { getBSStairHallDoors } from "./registries/BSDoorsFactory";
import BakerStreetStairsTemplate from "./templates/Baker-Street-Stairs-Template";

export default {
	"key": MAP_IDS.LEONARD_HEIGHTS.BAKER_STREET_12_F1_HALL,
    ...BakerStreetStairsTemplate,
	"sprites": [
		{
			"type": "door_interior_north_green",
			"column": 4,
			"row": 4,
			"direction": 0
		},
		{
			"type": "stairs_3",
			"column": 6,
			"row": 4,
			"direction": 0
		},
		{
			"type": "stairs_3",
			"column": 7,
			"row": 4,
			"direction": 0
		},
		{
			"type": "stairs_4",
			"column": 1,
			"row": 2,
			"direction": 0
		},
		{
			"type": "stairs_5",
			"column": 2,
			"row": 2,
			"direction": 0
		}
	],
	"triggers": getBSStairHallDoors( MAP_IDS.LEONARD_HEIGHTS.BAKER_STREET_12_F1_HALL )
}