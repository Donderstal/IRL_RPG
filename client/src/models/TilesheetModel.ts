export type TilesheetModel = {
    name: string;
    key: string;
    src: string;
    uniqueTiles: number;
    blocked: number[];

    image?: HTMLImageElement;
}
