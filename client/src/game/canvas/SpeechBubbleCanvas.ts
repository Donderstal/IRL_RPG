import type { CanvasTypeEnum } from "../../enumerables/CanvasTypeEnum";
import { mobileAgent } from "../../helpers/screenOrientation";
import { CanvasGrid } from "../core/CanvasGrid";

export class SpeechBubbleCanvas extends CanvasGrid {
    canvas: OffscreenCanvas;
    isActive: boolean;

    columns: number;
    rows: number;
    constructor( x: number, y: number, canvas: OffscreenCanvas, canvasType: CanvasTypeEnum ) {
        super( x, y, canvas, canvasType );

        this.canvas = canvas;
        this.isActive = false;

        this.columns    = mobileAgent ? 12 : 24
        this.rows       = mobileAgent ? 8 : 16

        this.initGrid( this.rows, this.columns );
    }
}