import { AnimationTypeEnum } from "../../../../../enumerables/AnimationTypeEnum";
import { DirectionEnum } from "../../../../../enumerables/DirectionEnum";
import { EventChainType } from "../../../../../enumerables/EventChainType";
import { CUTSCENE_IDS } from "../../../../eventChainResources/cutsceneIds";
import { DOOR_IDS } from "../../../../eventChainResources/doorIds";
import { MONKEY_CEO, ROBOT } from "../../../../spriteTypeResources";
import { LOCATION_NAMES } from "../../../locationNames";
import { MAP_IDS } from "../../../mapIds";

const ROBOT_RECEPTIONIST = "ROBOT RECEPTIONIST";
const MONKEY_COOK = "MONKEY COOK";
const ROBOT_COOK = "ROBOT COOK";

export default {
	"key": MAP_IDS.LEONARD_HEIGHTS.HOTEL_THE_TWO_TOWERS_LOBBY,
	"location": LOCATION_NAMES.HOTEL_THE_TWO_TOWERS,
	"columns": 24,
	"rows": 16,
	"tileSet": "Generic_Room_BX",
	"outdoors": false,
	"grid": [
		{
		"id": 10,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 10,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 10,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 16,
		"angle": 90,
		"mirrored": true
		},
		{
		"id": 16,
		"angle": 90,
		"mirrored": false
		},
		{
		"id": 10,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 10,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 10,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 16,
		"angle": 90,
		"mirrored": true
		},
		{
		"id": 16,
		"angle": 90,
		"mirrored": false
		},
		{
		"id": 10,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 10,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 10,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 10,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 16,
		"angle": 90,
		"mirrored": true
		},
		{
		"id": 16,
		"angle": 90,
		"mirrored": false
		},
		{
		"id": 10,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 10,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 10,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 16,
		"angle": 90,
		"mirrored": true
		},
		{
		"id": 16,
		"angle": 90,
		"mirrored": false
		},
		{
		"id": 10,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 10,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 10,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 10,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 10,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 10,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 17,
		"angle": 90,
		"mirrored": true
		},
		{
		"id": 17,
		"angle": 90,
		"mirrored": false
		},
		{
		"id": 10,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 10,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 10,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 17,
		"angle": 90,
		"mirrored": true
		},
		{
		"id": 17,
		"angle": 90,
		"mirrored": false
		},
		{
		"id": 10,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 24,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 24,
		"angle": 0,
		"mirrored": true
		},
		{
		"id": 10,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 17,
		"angle": 90,
		"mirrored": true
		},
		{
		"id": 17,
		"angle": 90,
		"mirrored": false
		},
		{
		"id": 10,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 10,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 10,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 17,
		"angle": 90,
		"mirrored": true
		},
		{
		"id": 17,
		"angle": 90,
		"mirrored": false
		},
		{
		"id": 10,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 10,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 10,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 33,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 32,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 10,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 16,
		"angle": 270,
		"mirrored": false
		},
		{
		"id": 16,
		"angle": 270,
		"mirrored": true
		},
		{
		"id": 10,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 10,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 10,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 16,
		"angle": 270,
		"mirrored": false
		},
		{
		"id": 16,
		"angle": 270,
		"mirrored": true
		},
		{
		"id": 10,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 24,
		"angle": 180,
		"mirrored": true
		},
		{
		"id": 24,
		"angle": 180,
		"mirrored": false
		},
		{
		"id": 10,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 16,
		"angle": 270,
		"mirrored": false
		},
		{
		"id": 16,
		"angle": 270,
		"mirrored": true
		},
		{
		"id": 10,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 10,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 10,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 16,
		"angle": 270,
		"mirrored": false
		},
		{
		"id": 16,
		"angle": 270,
		"mirrored": true
		},
		{
		"id": 10,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 32,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 11,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 37,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 36,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 37,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 37,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 37,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 37,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 37,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 37,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 37,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 37,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 37,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 37,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 37,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 37,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 37,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 37,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 37,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 37,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 37,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 37,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 37,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 37,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 36,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 37,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		},
		{
		"id": 40,
		"angle": 0,
		"mirrored": false
		}
		],
	"frontGrid": [
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		},
		{
		"id": "E",
		"angle": 0,
		"mirrored": false
		}
	],
	"sprites": [
		{
			"anim_type": AnimationTypeEnum.idle,
			"direction": DirectionEnum.down,
			"type": MONKEY_CEO,
			"row": 4,
			"column": 12
		},
		{
			"anim_type": AnimationTypeEnum.idle,
			"direction": DirectionEnum.down,
			"type": MONKEY_CEO,
			"row": 5,
			"column": 24
		},
		{
			"anim_type": AnimationTypeEnum.semiIdle,
			"direction": DirectionEnum.right,
			"type": MONKEY_CEO,
			"row": 11,
			"column": 21
		},
		{
			"anim_type": AnimationTypeEnum.semiIdle,
			"direction": DirectionEnum.up,
			"type": MONKEY_CEO,
			"row": 16,
			"column": 21
		},
		{
			"anim_type": AnimationTypeEnum.semiIdle,
			"direction": DirectionEnum.left,
			"type": MONKEY_CEO,
			"row": 15,
			"column": 22
		},
		{
			"anim_type": AnimationTypeEnum.semiIdle,
			"direction": DirectionEnum.up,
			"type": MONKEY_CEO,
			"row": 15,
			"column": 17
		},
		{
			"anim_type": AnimationTypeEnum.semiIdle,
			"direction": DirectionEnum.up,
			"type": MONKEY_CEO,
			"row": 15,
			"column": 18
		},
		{
			"anim_type": AnimationTypeEnum.semiIdle,
			"direction": DirectionEnum.right,
			"type": MONKEY_CEO,
			"row": 10,
			"column": 21
		},
		{
			"anim_type": AnimationTypeEnum.idle,
			"direction": DirectionEnum.down,
			"type": ROBOT,
			"row": 4,
			"column": 13,
			"name": ROBOT_RECEPTIONIST,
			"id": ROBOT_RECEPTIONIST
		},
		{
			"anim_type": AnimationTypeEnum.idle,
			"direction": DirectionEnum.right,
			"type": ROBOT,
			"row": 12,
			"column": 6,
			"name": ROBOT_COOK,
			"id": ROBOT_COOK
		},
		{
			"anim_type": AnimationTypeEnum.idle,
			"direction": DirectionEnum.right,
			"type": MONKEY_CEO,
			"row": 15,
			"column": 6,
			"name": MONKEY_COOK,
			"id": MONKEY_COOK
		},
		{
			"type": "plant_yo",
			"direction": DirectionEnum.down,
			"row": 14,
			"column": 15
		},
		{
			"type": "plant_yo",
			"direction": DirectionEnum.down,
			"row": 13,
			"column": 15
		},
		{
			"type": "plant_yo",
			"direction": DirectionEnum.down,
			"row": 12,
			"column": 15
		},
		{
			"type": "plant_yo",
			"direction": DirectionEnum.down,
			"row": 14,
			"column": 10
		},
		{
			"type": "plant_yo",
			"direction": DirectionEnum.down,
			"row": 13,
			"column": 10
		},
		{
			"type": "plant_yo",
			"direction": DirectionEnum.down,
			"row": 12,
			"column": 10
		},
		{
			"type": "plant_yo",
			"direction": DirectionEnum.down,
			"row": 11,
			"column": 10
		},
		{
			"type": "plant_yo",
			"direction": DirectionEnum.down,
			"row": 11,
			"column": 15
		},
		{
			"type": "Bar_B",
			"direction": DirectionEnum.down,
			"row": 6,
			"column": 23
		},
		{
			"type": "trash_4",
			"direction": DirectionEnum.down,
			"row": 15,
			"column": 19
		},
		{
			"type": "crisps",
			"direction": DirectionEnum.down,
			"row": 6,
			"column": 23
		},
		{
			"type": "tree",
			"direction": DirectionEnum.down,
			"row": 4,
			"column": 15
		},
		{
			"type": "tree",
			"direction": DirectionEnum.down,
			"row": 4,
			"column": 9
		},
		{
			"type": "tree",
			"direction": DirectionEnum.down,
			"row": 10,
			"column": 23
		},
		{
			"type": "pillar_round_top_shaft",
			"direction": DirectionEnum.down,
			"row": 2,
			"column": 19
		},
		{
			"type": "pillar_round_bottom_shaft",
			"direction": DirectionEnum.down,
			"row": 4,
			"column": 19
		},
		{
			"type": "pillar_round_bottom_shaft",
			"direction": DirectionEnum.down,
			"row": 4,
			"column": 8
		},
		{
			"type": "pillar_round_bottom_shaft",
			"direction": DirectionEnum.down,
			"row": 4,
			"column": 14
		},
		{
			"type": "pillar_round_top_shaft",
			"direction": DirectionEnum.down,
			"row": 2,
			"column": 14
		},
		{
			"type": "pillar_round_top_shaft",
			"direction": DirectionEnum.down,
			"row": 2,
			"column": 8
		},
		{
			"type": "plant_yo",
			"direction": DirectionEnum.down,
			"row": 15,
			"column": 24
		},
		{
			"type": "plant_yo",
			"direction": DirectionEnum.down,
			"row": 16,
			"column": 24
		},
		{
			"type": "tv",
			"direction": DirectionEnum.down,
			"row": 14,
			"column": 17
		},
		{
			"type": "tv",
			"direction": DirectionEnum.down,
			"row": 14,
			"column": 21
		},
		{
			"type": "tv_side",
			"direction": DirectionEnum.down,
			"row": 11,
			"column": 19
		},
		{
			"type": "tv_side",
			"direction": DirectionEnum.down,
			"row": 11,
			"column": 23
		},
		{
			"type": "can_red_1",
			"direction": DirectionEnum.down,
			"row": 12,
			"column": 22
		},
		{
			"type": "crisps",
			"direction": DirectionEnum.down,
			"row": 5,
			"column": 10
		},
		{
			"type": "door_interior_west_light",
			"direction": DirectionEnum.down,
			"row": 13,
			"column": 24
		},
		{
			"type": "door_interior_north_light",
			"direction": DirectionEnum.down,
			"row": 14,
			"column": 12
		},
		{
			"type": "bin_hop",
			"direction": DirectionEnum.down,
			"row": 15,
			"column": 15
		},
		{
			"type": "vegetables_b",
			"direction": DirectionEnum.down,
			"row": 15,
			"column": 9
		},
		{
			"type": "vegetables_b",
			"direction": DirectionEnum.down,
			"row": 12,
			"column": 9
		},
		{
			"type": "Sink",
			"direction": DirectionEnum.down,
			"row": 15,
			"column": 7
		},
		{
			"type": "Sink",
			"direction": DirectionEnum.down,
			"row": 12,
			"column": 7
		},
		{
			"type": "wall_thing",
			"direction": DirectionEnum.down,
			"row": 9,
			"column": 7
		},
		{
			"type": "tableD",
			"direction": DirectionEnum.down,
			"row": 15,
			"column": 4
		},
		{
			"type": "tableD",
			"direction": DirectionEnum.down,
			"row": 13,
			"column": 2
		},
		{
			"type": "tableD",
			"direction": DirectionEnum.down,
			"row": 10,
			"column": 4
		},
		{
			"type": "tableD",
			"direction": DirectionEnum.down,
			"row": 8,
			"column": 2
		},
		{
			"type": "chair_red_cushion_west",
			"direction": DirectionEnum.down,
			"row": 15,
			"column": 5
		},
		{
			"type": "chair_red_cushion",
			"direction": DirectionEnum.down,
			"row": 12,
			"column": 2
		},
		{
			"type": "chair_red_cushion",
			"direction": DirectionEnum.down,
			"row": 9,
			"column": 4
		},
		{
			"type": "chair_red_cushion_west",
			"direction": DirectionEnum.down,
			"row": 10,
			"column": 5
		},
		{
			"type": "chair_red_cushion_east",
			"direction": DirectionEnum.down,
			"row": 8,
			"column": 1
		},
		{
			"type": "chair_red_cushion_north",
			"direction": DirectionEnum.down,
			"row": 14,
			"column": 2
		},
		{
			"type": "chair_red_cushion_north",
			"direction": DirectionEnum.down,
			"row": 16,
			"column": 4
		},
		{
			"type": "chair_red_cushion_north",
			"direction": DirectionEnum.down,
			"row": 9,
			"column": 2
		},
		{
			"type": "chair_red_cushion",
			"direction": DirectionEnum.down,
			"row": 7,
			"column": 2
		},
		{
			"type": "cashier_desk_b",
			"direction": DirectionEnum.down,
			"row": 5,
			"column": 10
		},
		{
			"type": "rug_g2",
			"direction": DirectionEnum.down,
			"row": 12,
			"column": 13
		},
		{
			"type": "rug_g2",
			"direction": DirectionEnum.down,
			"row": 12,
			"column": 11
		},
		{
			"type": "rug_g2",
			"direction": DirectionEnum.down,
			"row": 10,
			"column": 11
		},
		{
			"type": "rug_g2",
			"direction": DirectionEnum.down,
			"row": 10,
			"column": 13
		},
		{
			"type": "rug_g2",
			"direction": DirectionEnum.down,
			"row": 8,
			"column": 13
		},
		{
			"type": "rug_g2",
			"direction": DirectionEnum.down,
			"row": 8,
			"column": 11
		}
	],
	"frontSprites": [],
	"spawnPoints": [],
	"roads": [],
	"triggers": [
		{
			"eventChainType": EventChainType.door,
			"row": 14,
			"column": 11,
			"direction": DirectionEnum.down,
			"eventId": DOOR_IDS.TWO_TOWERS_MAIN_DOOR
		},
		{
			"eventChainType": EventChainType.door,
			"row": 14,
			"column": 12,
			"direction": DirectionEnum.down,
			"eventId": DOOR_IDS.TWO_TOWERS_MAIN_DOOR
		},
		{
			"eventChainType": EventChainType.cutscene,
			"eventId": CUTSCENE_IDS.A3_MONKEY_COOK,
			"spriteId": MONKEY_COOK
		},
		{
			"eventChainType": EventChainType.cutscene,
			"eventId": CUTSCENE_IDS.A3_ROBOT_COOK,
			"spriteId": ROBOT_COOK
		},
		{
			"eventChainType": EventChainType.cutscene,
			"eventId": CUTSCENE_IDS.A3_ROBOT_RECEPTIONIST,
			"spriteId": ROBOT_RECEPTIONIST
		}
	]
}