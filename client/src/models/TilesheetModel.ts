export type TilesheetModel = {
    name: string;
    key: string;
    src: string;
    uniqueTiles: number;
    blocked: number[];

    images: { [key in string]: { [key in string]: OffscreenCanvas} }
    image?: HTMLImageElement;
    xyValues: { [key in string]: { [key in string]: {x: number, y: number}[] } }
}
