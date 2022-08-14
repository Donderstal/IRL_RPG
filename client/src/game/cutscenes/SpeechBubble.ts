import globals, { CANVAS_HEIGHT, CANVAS_WIDTH } from '../../game-data/globals';
import { getFrontCanvasContext, getBubbleCanvasContext, breakTextIntoLines, writeTextLine, setFont } from '../../helpers/canvasHelpers';
import { MAX_BUBBLE_WIDTH, GRID_BLOCK_PX, BUBBLE_INNER_PADDING, GRID_BLOCK_IN_SHEET_PX, LARGE_FONT_SIZE, SMALL_FONT_SIZE, LARGE_FONT_LINE_HEIGHT, SMALL_FONT_LINE_HEIGHT } from '../../game-data/globals';
import { BUBBLE_YES, BUBBLE_NO, BUBBLE_UNSELECTED, BUBBLE_LEFT_TOP, BUBBLE_LEFT_BOTTOM, BUBBLE_TOP, BUBBLE_BOTTOM, BUBBLE_RIGHT_TOP, BUBBLE_RIGHT_BOTTOM, BUBBLE_LEFT, BUBBLE_RIGHT, BUBBLE_MIDDLE } from '../../game-data/textboxGlobals';

import { InteractionAnswer } from "../../enumerables/InteractionAnswer";
import { SceneAnimationType } from "../../enumerables/SceneAnimationTypeEnum";
import { TypeWriter } from "../../helpers/TypeWriter";
import type { SceneAnimationModel, SpeakScene, SpeakYesNoScene } from '../../models/SceneAnimationModel';

const getSpeechBubbleXy = ( spawnLocation, dimensions ) => {
    const bubbleLocation = {
        'x': globals.SCREEN.MOBILE ? ( 0 + ( MAX_BUBBLE_WIDTH - dimensions.width ) / 2 ) : spawnLocation.x,
        'y': globals.SCREEN.MOBILE ? 0 : spawnLocation.y - dimensions.height,
        'position': "UP-RIGHT"
    };
    if ( bubbleLocation.x + dimensions.width > 24 * GRID_BLOCK_PX ) {
        bubbleLocation.x = (spawnLocation.x - dimensions.width) + GRID_BLOCK_PX;
        bubbleLocation.position = "UP-LEFT";
    }
    if ( bubbleLocation.y < 0 ) {
        bubbleLocation.y = spawnLocation.y + (GRID_BLOCK_PX * 1.75);
        bubbleLocation.position = bubbleLocation.position === "UP-RIGHT" ? "DOWN-RIGHT" : "DOWN-LEFT";
    }
    return bubbleLocation;
}

const getSpeechBubbleDimensions = ( contentModel: SceneAnimationModel, type: SceneAnimationType ) => {
    let content = type === SceneAnimationType.speak ? contentModel as SpeakScene : contentModel as SpeakYesNoScene;
    const text = breakTextIntoLines( content.text, LARGE_FONT_SIZE )
    const ctx = globals.SCREEN.MOBILE ? getBubbleCanvasContext() : getFrontCanvasContext()  
    const  textHeightAcc = text.length * LARGE_FONT_LINE_HEIGHT + (content.spriteName !== undefined ? SMALL_FONT_LINE_HEIGHT : 0);
    const firstLineWidth = ctx.measureText(text[0]).width + (BUBBLE_INNER_PADDING * 2);
    return {
        'textLines' : text.length,
        'width' : text.length > 1 ? MAX_BUBBLE_WIDTH : Math.ceil(firstLineWidth / GRID_BLOCK_PX) * GRID_BLOCK_PX,
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
    constructor( location: {x: number, y: number}, contentModel: SceneAnimationModel, id: string, type: SceneAnimationType, subtitleBubble = false ) {
        const dimensions = subtitleBubble
            ? { textLines: 1, width: globals.SCREEN.MOBILE ? GRID_BLOCK_PX * 8 : CANVAS_WIDTH / 2, height: GRID_BLOCK_PX }
            : getSpeechBubbleDimensions( contentModel, type );
        const xyPosition = subtitleBubble
            ?  { 'x': globals.SCREEN.MOBILE ? GRID_BLOCK_PX * 2 : CANVAS_WIDTH / 4, 'y': globals.SCREEN.MOBILE ? screen.height : CANVAS_HEIGHT, 'position': "UP-RIGHT" }
            : getSpeechBubbleXy( location, dimensions );

        let content = type === SceneAnimationType.speak ? contentModel as SpeakScene : contentModel as SpeakYesNoScene;

        this.x              = xyPosition.x;
        this.y              = xyPosition.y;
        this.position       = xyPosition.position;
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

        this.draw( );
    }
    set text( text: any ) {             
        this.typeWriter = new TypeWriter( text );
    }
    get text(): any {
        return this.typeWriter.activeText;
    }

    get textX() { return this.x + BUBBLE_INNER_PADDING; };
    get headerY() { return this.y + ( this.hasHeader ? SMALL_FONT_LINE_HEIGHT : 0 ) + ( this.vertFlip ? 8 : 0 ); }
    get textY() { return this.headerY + LARGE_FONT_LINE_HEIGHT };
    get horiFlip() { return this.position.includes("LEFT") };
    get vertFlip() { return this.position.includes("DOWN") };
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

    writeHeader( ): void {
        writeTextLine( 
            this.headerText, this.textX, this.headerY, SMALL_FONT_SIZE, globals.SCREEN.MOBILE ? getBubbleCanvasContext() : getFrontCanvasContext()
        );
    }

    setHeader( text: string ): void {
        this.hasHeader  = true;
        this.headerText = text;
    }

    draw( ): void {
        this.drawBox( );
        this.copyBubbleToGameCanvas( );
        if ( this.hasHeader ) {
            this.writeHeader( );
        }
        this.writeText( );
        if ( this.type === SceneAnimationType.speakYesNo && !this.typeWriter.isWriting ) {
            this.drawButtons( );
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

    writeText(): void {
        const canvasCtx = globals.SCREEN.MOBILE ? getBubbleCanvasContext() : getFrontCanvasContext();
        setFont(LARGE_FONT_SIZE, canvasCtx);

        let textLineX = this.textX;
        let textLineY = this.textY;
        let sentenceWidth = BUBBLE_INNER_PADDING * 2;
        for ( let i = 0; i < this.text.length; i++ ) {
            const activeWord = this.text[i];
            writeTextLine( activeWord.activeWord, textLineX, textLineY, LARGE_FONT_SIZE, canvasCtx, activeWord.color );
            const wordWidth = canvasCtx.measureText(activeWord.activeWord).width;
            textLineX += wordWidth;
            sentenceWidth += wordWidth;
            if ( sentenceWidth + wordWidth > this.width ) {
                textLineX = this.textX;
                textLineY += LARGE_FONT_LINE_HEIGHT;  
                sentenceWidth = BUBBLE_INNER_PADDING * 2;
            }
        }
    }

    drawButtons(): void {
        const pngs = globals.PNG_DICTIONARY;
        const frontCtx = globals.SCREEN.MOBILE ? getBubbleCanvasContext() : getFrontCanvasContext()
        frontCtx.drawImage(
            this.activeButton === InteractionAnswer.yes ? pngs[BUBBLE_YES] : pngs[BUBBLE_UNSELECTED],
            0, 0,
            GRID_BLOCK_IN_SHEET_PX, GRID_BLOCK_IN_SHEET_PX,
            this.yesBubbleX, this.bubbleY,
            GRID_BLOCK_PX, GRID_BLOCK_PX
        );
        frontCtx.drawImage(
            this.activeButton === InteractionAnswer.no ? pngs[BUBBLE_NO] : pngs[BUBBLE_UNSELECTED],
            0, 0,
            GRID_BLOCK_IN_SHEET_PX, GRID_BLOCK_IN_SHEET_PX,
            this.noBubbleX, this.bubbleY,
            GRID_BLOCK_PX, GRID_BLOCK_PX
        );
    }

    copyBubbleToGameCanvas(): void {
        const frontCtx = globals.SCREEN.MOBILE ? getBubbleCanvasContext() : getFrontCanvasContext()
        frontCtx.save( );
        frontCtx.scale( this.horiFlip ? -1 : 1, this.vertFlip ? -1 : 1 );
        frontCtx.drawImage(
            this.innerCanvas, 
            this.horiFlip ? (-this.width - this.x) + (GRID_BLOCK_PX / 2) : this.x, 
            this.vertFlip ? -this.height - this.y : this.y
        );
        frontCtx.restore( );
    }

    moveCursor(): void {
        this.activeButton = this.activeButton === InteractionAnswer.yes ? InteractionAnswer.no : InteractionAnswer.yes;
    }
}