import type { CanvasWithGrid } from "../game/core/CanvasWithGrid"

export type CanvasContextModel = {
    canvas?: HTMLCanvasElement;
    ctx?: CanvasRenderingContext2D;
    class?: CanvasWithGrid;
}