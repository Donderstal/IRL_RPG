import type { IContract } from "./IContract";

export type ShowScreenTextContract = IContract & {
    text: string,
    isTitle: boolean,
    maxWidth: number;
}