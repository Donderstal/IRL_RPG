import { LH_BAKER_STREET_12_F3_APT_KEY, LH_BAKER_STREET_12_F3_STAIRS_KEY } from "../../leonard_heights_res";
import { DOORKEY_BAKER_STREET_12_APT_F3 } from "./registries/BSDoorKeys";
import { getBSAppartmentToHallDoor } from "./registries/BSDoorsFactory";
import BakerStreetAptTemplate from "./templates/Baker-Street-Apt-Template";

export default {
    "key": LH_BAKER_STREET_12_F3_APT_KEY,
    ...BakerStreetAptTemplate,
	"playerStart": {
		'row': 4,
		'column': 3
	},
	"sprites": [
		{
			"type": "Sink",
			"column": 7,
			"row": 4,
			"direction": 0
		},
		{
			"type": "Fridge",
			"column": 6,
			"row": 2,
			"direction": 0
		},
		{
			"type": "toilet_left",
			"column": 1,
			"row": 2,
			"direction": 0
		},
		{
			"type": "wall_thing",
			"column": 1,
			"row": 3,
			"direction": 0
		},
		{
			"type": "wall_thing_c",
			"column": 3,
			"row": 2,
			"direction": 0
		},
		{
			"type": "computer_table",
			"column": 2,
			"row": 4,
			"direction": 0
		},
		{
			"type": "couch_nice_left",
			"column": 7,
			"row": 6,
			"direction": 0
		},
		{
			"type": "Single_Bed",
			"column": 1,
			"row": 6,
			"direction": 0
		},
		{
			"type": "house_plant",
			"column": 1,
			"row": 4,
			"direction": 0
		},
		{
			"type": "Rug_01",
			"column": 4,
			"row": 6,
			"direction": 0
		},
		{
			"type": "tableB",
			"column": 4,
			"row": 5,
			"direction": 0
		},
		{
			"type": "chair_red_cushion_west",
			"column": 5,
			"row": 5,
			"direction": 0
		},
		{
			"type": "chair_red_cushion_north",
			"column": 4,
			"row": 6,
			"direction": 0
		},
		{
			"type": "inside_bin",
			"column": 5,
			"row": 2,
			"direction": 0
		}
	],
    "doors": [getBSAppartmentToHallDoor( DOORKEY_BAKER_STREET_12_APT_F3, LH_BAKER_STREET_12_F3_STAIRS_KEY )]
}