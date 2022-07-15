import type { CanvasWithGrid } from "../game/core/CanvasWithGrid";

export type GameCanvasModel = {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    class: CanvasWithGrid;
}