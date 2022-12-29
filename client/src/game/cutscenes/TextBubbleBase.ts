import type { TextBubbleType } from "../../enumerables/TextBubbleType";
import { BUBBLE_INNER_PADDING, LARGE_FONT_LINE_HEIGHT, SMALL_FONT_LINE_HEIGHT, SMALL_FONT_SIZE } from "../../game-data/globals";
import { writeTextLine } from "../../helpers/canvasHelpers";
import { getSpeechBubbleTemplateCanvas } from "../../helpers/speechBubbleHelpers";

export class TextBubbleBase {
    x: number;
    y: number;
    width: number;
    height: number;

    type: TextBubbleType;
    hasHeader: boolean;
    headerText: string;

    constructor( x: number, y: number, width: number, height: number ) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    get textX() { return this.x + BUBBLE_INNER_PADDING; };
    get headerY() { return this.y + SMALL_FONT_LINE_HEIGHT; }
    get textY() { return this.headerY + LARGE_FONT_LINE_HEIGHT };

    setType( type: TextBubbleType ): void {
        this.type = type;
    }

    setHeader( text: string ): void {
        this.hasHeader = true;
        this.headerText = text;
    }

    copyBubbleToGameCanvas( activeContext: OffscreenCanvasRenderingContext2D ): void {
        activeContext.drawImage(
            getSpeechBubbleTemplateCanvas( this.type ),
            this.x,
            this.y
        );
    }

    draw( context: OffscreenCanvasRenderingContext2D ): void {
        this.copyBubbleToGameCanvas( context );
        if ( this.hasHeader ) {
            this.writeHeader( context );
        }
    }

    writeHeader( activeContext: OffscreenCanvasRenderingContext2D ): void {
        writeTextLine(
            this.headerText, this.textX, this.headerY, SMALL_FONT_SIZE, activeContext
        );
    }
}