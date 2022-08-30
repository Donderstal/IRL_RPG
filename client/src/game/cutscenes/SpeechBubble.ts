import globals, { CANVAS_HEIGHT, CANVAS_WIDTH } from '../../game-data/globals';
import { breakTextIntoLines, writeTextLine, setFont } from '../../helpers/canvasHelpers';
import { MAX_BUBBLE_WIDTH, GRID_BLOCK_PX, BUBBLE_INNER_PADDING, GRID_BLOCK_IN_SHEET_PX, LARGE_FONT_SIZE, SMALL_FONT_SIZE, LARGE_FONT_LINE_HEIGHT, SMALL_FONT_LINE_HEIGHT } from '../../game-data/globals';
import { BUBBLE_YES, BUBBLE_NO, BUBBLE_UNSELECTED, BUBBLE_LEFT_TOP, BUBBLE_LEFT_BOTTOM, BUBBLE_TOP, BUBBLE_BOTTOM, BUBBLE_RIGHT_TOP, BUBBLE_RIGHT_BOTTOM, BUBBLE_LEFT, BUBBLE_RIGHT, BUBBLE_MIDDLE } from '../../game-data/textboxGlobals';

import { InteractionAnswer } from "../../enumerables/InteractionAnswer";
import { SceneAnimationType } from "../../enumerables/SceneAnimationTypeEnum";
import { TypeWriter } from "../../helpers/TypeWriter";
import type { SceneAnimationModel, SpeakScene, SpeakYesNoScene } from '../../models/SceneAnimationModel';
import { mobileAgent } from '../../helpers/screenOrientation';

const getSpeechBubbleDimensions = ( contentModel: SceneAnimationModel, type: SceneAnimationType, context: CanvasRenderingContext2D ) => {
    let content = type === SceneAnimationType.speak ? contentModel as SpeakScene : contentModel as SpeakYesNoScene;
    const text = breakTextIntoLines( content.text, LARGE_FONT_SIZE )
    const textHeightAcc = text.length * LARGE_FONT_LINE_HEIGHT + (content.spriteName !== undefined ? SMALL_FONT_LINE_HEIGHT : 0);
    return {
        'textLines' : text.length,
        'width': MAX_BUBBLE_WIDTH,
        'height': (Math.ceil(textHeightAcc / GRID_BLOCK_PX) * GRID_BLOCK_PX < GRID_BLOCK_PX * 2) ? GRID_BLOCK_PX * 2  : Math.ceil(textHeightAcc / GRID_BLOCK_PX) * GRID_BLOCK_PX
    }
}

export class SpeechBubble {
    x: number;
    y: number;
    width: number;
    height: number;
    position: string;

    id: string;
    type: SceneAnimationType;
    subtitleBubble: boolean;
    hasHeader: boolean;

    textLines: number;
    headerText: string;

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
    constructor( contentModel: SceneAnimationModel, id: string, type: SceneAnimationType, context: CanvasRenderingContext2D, subtitleBubble = false ) {
        const dimensions = subtitleBubble
            ? { textLines: 1, width: mobileAgent ? GRID_BLOCK_PX * 8 : CANVAS_WIDTH / 2, height: GRID_BLOCK_PX }
            : getSpeechBubbleDimensions( contentModel, type, context );
        const speechBubbleCanvasWidth = mobileAgent ? GRID_BLOCK_PX * 12 : CANVAS_WIDTH;
        const xyPosition = subtitleBubble
            ? { x: mobileAgent ? GRID_BLOCK_PX * 2 : CANVAS_WIDTH / 4, y: mobileAgent ? screen.height : CANVAS_HEIGHT }
            : { x: ( speechBubbleCanvasWidth - MAX_BUBBLE_WIDTH ) / 2, y: 0 };

        let content = type === SceneAnimationType.speak ? contentModel as SpeakScene : contentModel as SpeakYesNoScene;

        this.x              = xyPosition.x;
        this.y              = xyPosition.y;
        this.id             = id;
        this.type           = type;
        this.subtitleBubble = subtitleBubble;

        this.width          = dimensions.width;
        this.height         = dimensions.height;
        this.textLines      = dimensions.textLines;
        this.text           = content.text;

        this.columns        = this.width / GRID_BLOCK_PX;
        this.rows           = this.height / GRID_BLOCK_PX;

        this.innerCanvas = document.createElement('canvas');
        this.innerCanvas.width = this.width;
        this.innerCanvas.height = this.height;
        this.innerCtx = this.innerCanvas.getContext( '2d' );

        if ( content.spriteName ) {
            this.setHeader( content.spriteName + ": " )
        } 
        if ( this.type === SceneAnimationType.speakYesNo ) {
            this.bubbleY    = this.y + this.height;
            this.middleX    = this.x + (this.width / 2);
            this.yesBubbleX = this.middleX - GRID_BLOCK_PX;
            this.noBubbleX  = this.middleX + GRID_BLOCK_PX;
            this.activeButton = InteractionAnswer.yes
        }
        if ( subtitleBubble ) {
            this.setMoveToY( this.y - this.height );            
        }
        this.draw( context );
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

    draw( activeContext: CanvasRenderingContext2D ): void {
        this.drawBox( );
        this.copyBubbleToGameCanvas( activeContext );
        if ( this.hasHeader ) {
            this.writeHeader( activeContext );
        }
        this.writeText( activeContext );
        if ( this.type === SceneAnimationType.speakYesNo && !this.typeWriter.isWriting ) {
            this.drawButtons( activeContext );
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