import type { GridCellModel } from "../GridCellModel";
import type { IEventScript } from "./IEventScript";

export type EnterMapEventScript = IEventScript & {
	mapName: string;
	doorId?: string;
	playerStart?: GridCellModel;
}