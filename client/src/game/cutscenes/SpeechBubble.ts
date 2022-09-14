import globals, { BATTLE_FONT_SIZE } from '../../game-data/globals';
import { writeTextLine, setFont } from '../../helpers/canvasHelpers';
import { GRID_BLOCK_PX, BUBBLE_INNER_PADDING, GRID_BLOCK_IN_SHEET_PX, LARGE_FONT_SIZE, SMALL_FONT_SIZE, LARGE_FONT_LINE_HEIGHT, SMALL_FONT_LINE_HEIGHT } from '../../game-data/globals';
import { BUBBLE_YES, BUBBLE_NO, BUBBLE_UNSELECTED, BUBBLE_LEFT_TOP, BUBBLE_LEFT_BOTTOM, BUBBLE_TOP, BUBBLE_BOTTOM, BUBBLE_RIGHT_TOP, BUBBLE_RIGHT_BOTTOM, BUBBLE_LEFT, BUBBLE_RIGHT, BUBBLE_MIDDLE } from '../../game-data/textboxGlobals';
import { InteractionAnswer } from "../../enumerables/InteractionAnswer";
import { TypeWriter } from "../../helpers/TypeWriter";
import type { SceneAnimationModel, SpeakScene, SpeakYesNoScene } from '../../models/SceneAnimationModel';
import { TextBubbleType } from '../../enumerables/TextBubbleType';

export class SpeechBubble {
    x: number;
    y: number;
    width: number;
    height: number;
    position: string;

    id: string;
    type: TextBubbleType;
    subtitleBubble: boolean;
    hasHeader: boolean;

    textLines: number;
    headerText: string;
    fullText: string;

    innerCanvas: HTMLCanvasElement;
    innerCtx: CanvasRenderingContext2D;
    typeWriter: TypeWriter;

    columns: number;
    rows: number;

    bubbleY: number;
    middleX: number;
    yesBubbleX: number;
    noBubbleX: number;
    activeButton: InteractionAnswer;

    moving: boolean;
    destinationY: number;
    constructor( contentModel: SpeakScene | SpeakYesNoScene, id: string, type: TextBubbleType, dimensions: { width: number, height: number }, xyPosition: {x: number, y: number} ) {
        this.x              = xyPosition.x;
        this.y              = xyPosition.y;
        this.id             = id;
        this.type           = type;

        this.width          = dimensions.width;
        this.height         = dimensions.height;
        this.fullText       = contentModel.text;
        this.text           = contentModel.text;

        this.columns        = this.width / GRID_BLOCK_PX;
        this.rows           = this.height / GRID_BLOCK_PX;

        this.innerCanvas = document.createElement('canvas');
        this.innerCanvas.width = this.width;
        this.innerCanvas.height = this.height;
        this.innerCtx = this.innerCanvas.getContext( '2d' );

        if ( contentModel.spriteName ) {
            this.setHeader( contentModel.spriteName + ": " )
        } 
        if ( this.type === TextBubbleType.SpeakYesNo ) {
            this.bubbleY    = this.y + this.height;
            this.middleX    = this.x + (this.width / 2);
            this.yesBubbleX = this.middleX - GRID_BLOCK_PX;
            this.noBubbleX  = this.middleX + GRID_BLOCK_PX;
            this.activeButton = InteractionAnswer.yes
        }
    }
    set text( text: any ) {             
        this.typeWriter = new TypeWriter( text );
    }
    get text(): any {
        return this.typeWriter.activeText;
    }

    get textX() { return this.x + BUBBLE_INNER_PADDING; };
    get headerY() { return this.y + ( this.hasHeader ? SMALL_FONT_LINE_HEIGHT : 0 ); }
    get textY() { return this.headerY + LARGE_FONT_LINE_HEIGHT };
    get destinationYIsUp() { return this.y > this.destinationY; };

    setWidth( width ): void {
        this.width = width;
        this.innerCanvas.width = width;
    }

    drawBubblePart( name: string, x: number, y: number ): void {
        const pngs = globals.PNG_DICTIONARY;
        this.innerCtx.drawImage(
            pngs[name],
            0, 0,
            GRID_BLOCK_IN_SHEET_PX, GRID_BLOCK_IN_SHEET_PX,
            x, y, 
            GRID_BLOCK_PX, GRID_BLOCK_PX
        );
    }

    getBubblePart( column: number, row: number ): string {
        if ( column === 1 && row === 1 ) {
            return BUBBLE_LEFT_TOP;
        }
        else if ( column === this.columns && row === 1 ) {
            return BUBBLE_RIGHT_TOP;
        }
        else if ( row === 1 ) {
            return BUBBLE_TOP
        }
        else if ( column === 1 && row !== 1 && row !== this.rows ) {
            return BUBBLE_LEFT;
        }
        else if ( column === this.columns && row !== 1 && row !== this.rows ) {
            return BUBBLE_RIGHT;
        }
        else if ( row !== 1 && row !== this.rows  ) {
            return BUBBLE_MIDDLE;
        }
        else if ( column === 1 && row === this.rows ) {
            return BUBBLE_LEFT_BOTTOM;
        }
        else if ( column === this.columns && row === this.rows ) {
            return BUBBLE_RIGHT_BOTTOM;
        }
        else if ( row === this.rows  ) {
            return BUBBLE_BOTTOM
        }
    }

    drawBox( ): void {
        for( let row = 1; row <= this.rows; row++ ) {
            for( let column = 1; column <= this.columns; column++ ) {
                this.drawBubblePart( this.getBubblePart( column, row ), (GRID_BLOCK_PX * column) - GRID_BLOCK_PX, (GRID_BLOCK_PX * row) - GRID_BLOCK_PX );
            }
        }
    }

    writeHeader( activeContext: CanvasRenderingContext2D ): void {
        writeTextLine( 
            this.headerText, this.textX, this.headerY, SMALL_FONT_SIZE, activeContext
        );
    }

    setHeader( text: string ): void {
        this.hasHeader  = true;
        this.headerText = text;
    }

    draw( context: CanvasRenderingContext2D ): void {
        this.drawBox( );
        this.copyBubbleToGameCanvas( context );
        if ( this.hasHeader ) {
            this.writeHeader( context );
        }
        if ( this.type === TextBubbleType.Center ) {
            this.writeCenterText( context )
        }
        else {
            this.writeText( context );
        }

        if ( this.type === TextBubbleType.SpeakYesNo && !this.typeWriter.isWriting ) {
            this.drawButtons( context );
        }
        if ( this.moving ) {
            this.moveTo( );
        }
    }

    setMoveToY( y: number ): void {
        this.moving = true;
        this.destinationY = y;
    }

    moveTo(): void {
        if ( this.y > this.destinationY && this.destinationYIsUp ) {
            this.y -= (GRID_BLOCK_PX / 8);          
        }
        else if ( this.y < this.destinationY && !this.destinationYIsUp ) {
            this.y += (GRID_BLOCK_PX / 8);                      
        }
        else {
            this.unsetMoveTo( );
        }
    }

    unsetMoveTo(): void {
        this.y = this.destinationY;
        this.moving = false;
        this.destinationY = null;
    }

    writeCenterText( activeContext: CanvasRenderingContext2D ): void {
        setFont( BATTLE_FONT_SIZE * 2, activeContext );
        let textWidth = activeContext.measureText( this.fullText ).width;
        let textLineX = this.x + (this.width / 2) - (textWidth / 2);
        let textLineY = this.y + ( this.height / 2 );

        for ( let i = 0; i < this.text.length; i++ ) {
            const activeWord = this.text[i];
            writeTextLine( activeWord.activeWord, textLineX, textLineY, BATTLE_FONT_SIZE * 2, activeContext, activeWord.color );
            const wordWidth = activeContext.measureText( activeWord.activeWord ).width;
            textLineX += wordWidth;
        }
    }

    writeText( activeContext: CanvasRenderingContext2D ): void {
        setFont(LARGE_FONT_SIZE, activeContext);

        let textLineX = this.textX;
        let textLineY = this.textY;
        let sentenceWidth = BUBBLE_INNER_PADDING * 2;
        for ( let i = 0; i < this.text.length; i++ ) {
            const activeWord = this.text[i];
            writeTextLine( activeWord.activeWord, textLineX, textLineY, LARGE_FONT_SIZE, activeContext, activeWord.color );
            const wordWidth = activeContext.measureText(activeWord.activeWord).width;
            textLineX += wordWidth;
            sentenceWidth += wordWidth;
            if ( sentenceWidth + wordWidth > this.width ) {
                textLineX = this.textX;
                textLineY += LARGE_FONT_LINE_HEIGHT;  
                sentenceWidth = BUBBLE_INNER_PADDING * 2;
            }
        }
    }

    drawButtons( activeContext: CanvasRenderingContext2D ): void {
        const pngs = globals.PNG_DICTIONARY;
        activeContext.drawImage(
            this.activeButton === InteractionAnswer.yes ? pngs[BUBBLE_YES] : pngs[BUBBLE_UNSELECTED],
            0, 0,
            GRID_BLOCK_IN_SHEET_PX, GRID_BLOCK_IN_SHEET_PX,
            this.yesBubbleX, this.bubbleY,
            GRID_BLOCK_PX, GRID_BLOCK_PX
        );
        activeContext.drawImage(
            this.activeButton === InteractionAnswer.no ? pngs[BUBBLE_NO] : pngs[BUBBLE_UNSELECTED],
            0, 0,
            GRID_BLOCK_IN_SHEET_PX, GRID_BLOCK_IN_SHEET_PX,
            this.noBubbleX, this.bubbleY,
            GRID_BLOCK_PX, GRID_BLOCK_PX
        );
    }

    copyBubbleToGameCanvas( activeContext: CanvasRenderingContext2D ): void {
        activeContext.drawImage(
            this.innerCanvas,
            this.x,
            this.y
        );
    }

    moveCursor(): void {
        this.activeButton = this.activeButton === InteractionAnswer.yes ? InteractionAnswer.no : InteractionAnswer.yes;
    }
}