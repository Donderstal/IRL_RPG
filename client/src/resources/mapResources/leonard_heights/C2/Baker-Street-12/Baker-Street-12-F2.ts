import { AnimationTypeEnum } from "../../../../../enumerables/AnimationTypeEnum";
import { CollectableType } from "../../../../../enumerables/CollectableTypeEnum";
import { getCollectibleActionDefinition, getCollectibleCondition } from "../../../../collectibleResources";
import { LH_BAKER_STREET_12_F2_APT_KEY, LH_BAKER_STREET_12_F2_STAIRS_KEY } from "../../leonard_heights_res";
import { DOORKEY_BAKER_STREET_12_APT_F2 } from "./registries/BSDoorKeys";
import { getBSAppartmentToHallDoor } from "./registries/BSDoorsFactory";
import { C2_INTERACTION_BS_APT2_ROBOT_1, C2_INTERACTION_BS_APT2_ROBOT_2 } from "./registries/BSInteractions";
import BakerStreetAptTemplate from "./templates/Baker-Street-Apt-Template";

export default {
    "key": LH_BAKER_STREET_12_F2_APT_KEY,
    ...BakerStreetAptTemplate,
	"sprites": [
		{
			"type": "Sink",
			"column": 7,
			"row": 4,
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
			"type": "vent_1",
			"column": 7,
			"row": 1,
			"direction": 0
		},
		{
			"type": "Single_Bed",
			"column": 1,
			"row": 6,
			"direction": 0
		},
		{
			"type": "Single_Bed",
			"column": 3,
			"row": 6,
			"direction": 0
		},
		{
			"type": "brown_chair_east",
			"column": 5,
			"row": 6,
			"direction": 0
		},
		{
			"type": "brown_chair_west",
			"column": 7,
			"row": 6,
			"direction": 0
		},
		{
			"type": "tableA",
			"column": 6,
			"row": 6,
			"direction": 0
		},
		{
			"type": "tires_1",
			"column": 6,
			"row": 2,
			"direction": 0
		},
		{
			"type": "tires_2",
			"column": 6,
			"row": 3,
			"direction": 0
		},
		{
			"type": "tires_1",
			"column": 5,
			"row": 3,
			"direction": 0
		},
		{
			"type": "collectable_juice_can",
			"row": 4,
			"column": 6,
			"action": getCollectibleActionDefinition( LH_BAKER_STREET_12_F2_APT_KEY, CollectableType.can ),
			"condition": getCollectibleCondition( LH_BAKER_STREET_12_F2_APT_KEY, CollectableType.can )
		},
		{
			"type": "ROBOT_WHITE",
			"column": 7,
			"row": 5,
			"direction": 1,
			"anim_type": AnimationTypeEnum.idle,
			"action": C2_INTERACTION_BS_APT2_ROBOT_2
		},
		{
			"type": "ROBOT_WHITE",
			"column": 2,
			"row": 6,
			"direction": 3,
			"anim_type": AnimationTypeEnum.idle,
			"action": C2_INTERACTION_BS_APT2_ROBOT_1
		}
	],
    "doors": [getBSAppartmentToHallDoor( DOORKEY_BAKER_STREET_12_APT_F2, LH_BAKER_STREET_12_F2_STAIRS_KEY )]
}