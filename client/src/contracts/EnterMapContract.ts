import type { IContract } from "./IContract";

export type EnterMapContract = IContract & {
    doorId: string,
    mapId: string
}