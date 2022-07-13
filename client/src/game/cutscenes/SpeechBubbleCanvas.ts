import globals from "../../game-data/globals";
import { CanvasWithGrid } from "../core/CanvasWithGrid";

export class SpeechBubbleCanvas extends CanvasWithGrid {
    canvas: HTMLCanvasElement;
    isActive: boolean;

    columns: number;
    rows: number;
    constructor( x, y, ctx, canvas ) {
        super( x, y, ctx );

        this.canvas = canvas;
        this.isActive = false;

        this.columns    = globals.SCREEN.MOBILE ? 12 : 24
        this.rows       = globals.SCREEN.MOBILE ? 8 : 16

        this.initGrid( this.rows, this.columns );
    }
}