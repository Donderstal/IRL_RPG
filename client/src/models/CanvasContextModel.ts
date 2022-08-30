import type { CanvasGrid } from "../game/core/CanvasGrid"

export type CanvasContextModel = {
    canvas?: HTMLCanvasElement;
    ctx?: CanvasRenderingContext2D;
    class?: CanvasGrid;
}