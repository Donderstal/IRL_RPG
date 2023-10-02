import type { IContract } from "./IContract";

export type FadeContract = IContract & {
    targetOpacity: number;
    fadeBack: boolean;
    fadeIn: boolean;
}