import { TextBubbleType } from "../../enumerables/TextBubbleType";
import { BUBBLE_INNER_PADDING, GRID_BLOCK_PX, LARGE_FONT_LINE_HEIGHT, LARGE_FONT_SIZE, SMALL_FONT_LINE_HEIGHT } from "../../game-data/globals";
import { PLAYER_NAME } from "../../game-data/interactionGlobals";
import { writeTextLine } from "../../helpers/canvasHelpers";
import { getSpeechBubbleTemplateCanvas } from "../../helpers/speechBubbleHelpers";
import type { FrameModel } from "../../models/SpriteFrameModel";

export class TextBubbleBase {
    x: number;
    y: number;
    width: number;
    height: number;

    type: TextBubbleType;
    hasHeader: boolean;
    headerText: string;

    frameCount: number;
    activeFrame: FrameModel;

    constructor( x: number, y: number, width: number, height: number ) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.hasHeader = false;
        this.frameCount = 0;
        this.activeFrame = null;
    }

    get textX() { return this.x + BUBBLE_INNER_PADDING; };
    get headerY() { return this.y + LARGE_FONT_SIZE; }
    get textY() { return this.y + SMALL_FONT_LINE_HEIGHT + LARGE_FONT_LINE_HEIGHT };

    get isSpeechBubble(): boolean { return ( this.type === TextBubbleType.Speak || this.type == TextBubbleType.SpeakYesNo ); };
    get isNPCSpeechBubble(): boolean { return this.isSpeechBubble && (this.headerText == null || !this.headerText.includes( PLAYER_NAME )); };
    get isPlayerSpeechBubble(): boolean { return this.hasHeader && this.isSpeechBubble && this.headerText.includes( PLAYER_NAME ); };

    countFrame(): void {
        this.frameCount++;
    }

    setActiveFrame( frame: FrameModel ): void {
        this.activeFrame = frame;
    }

    setType( type: TextBubbleType ): void {
        this.type = type;
    }

    setHeader( text: string ): void {
        this.hasHeader = true;
        this.headerText = text;
    }

    clearHeader(): void {
        this.hasHeader = false;
        this.headerText = null;
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
        if ( this.isSpeechBubble ) {
            context.beginPath()
            context.moveTo( this.textX, this.y + LARGE_FONT_LINE_HEIGHT );
            context.lineTo( ( this.textX + this.width ) - ( this.textX - this.x ) - ( GRID_BLOCK_PX * 2 ), this.y + LARGE_FONT_LINE_HEIGHT )
            context.stroke();
        }
    }

    writeHeader( activeContext: OffscreenCanvasRenderingContext2D ): void {
        writeTextLine(
            this.headerText, this.textX, this.headerY, LARGE_FONT_SIZE, activeContext
        );
    }
}