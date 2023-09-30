import type { GridCellModel } from "../GridCellModel";
import type { IEventChain } from "./IEventChain";

export type LoadMapOnStartEventChain = IEventChain & {
	startingMap: string;
	playerStart: GridCellModel;
}