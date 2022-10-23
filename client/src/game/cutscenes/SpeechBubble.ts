import globals, { BATTLE_FONT_SIZE } from '../../game-data/globals';
import { writeTextLine, setFont } from '../../helpers/canvasHelpers';
import { GRID_BLOCK_PX, BUBBLE_INNER_PADDING, GRID_BLOCK_IN_SHEET_PX, LARGE_FONT_SIZE, SMALL_FONT_SIZE, LARGE_FONT_LINE_HEIGHT, SMALL_FONT_LINE_HEIGHT } from '../../game-data/globals';
import { BUBBLE_YES, BUBBLE_NO, BUBBLE_UNSELECTED } from '../../game-data/textboxGlobals';
import { InteractionAnswer } from "../../enumerables/InteractionAnswer";
import { TypeWriter, TypeWriterWord } from "../../helpers/TypeWriter";
import type { SpeakScene, SpeakYesNoScene } from '../../models/SceneAnimationModel';
import { TextBubbleType } from '../../enumerables/TextBubbleType';
import { getSpeechBubbleDimensions, getSpeechBubbleTemplateCanvas, getSpeechBubbleXy } from '../../helpers/speechBubbleHelpers';

type PhraseModel = {
    x: number;
    y: number;
    width: number;
    color: string;
    phrase: string;
}

export class SpeechBubble {
    x: number;
    y: number;
    width: number;
    height: number;
    position: string;
    wroteLastFrame: boolean;

    id: string;
    type: TextBubbleType;
    subtitleBubble: boolean;
    hasHeader: boolean;

    textLines: number;
    headerText: string;
    fullText: string;
    typeWriter: TypeWriter;

    bubbleY: number;
    middleX: number;
    yesBubbleX: number;
    noBubbleX: number;
    activeButton: InteractionAnswer;

    moving: boolean;
    destinationY: number;
    read: boolean;
    constructor( contentModel: SpeakScene | SpeakYesNoScene, type: TextBubbleType ) {
        const dimensions = getSpeechBubbleDimensions( type );
        const xy = getSpeechBubbleXy( type );

        this.x              = xy.x;
        this.y              = xy.y;

        this.width          = dimensions.width;
        this.height         = dimensions.height;

        this.wroteLastFrame = false;

        this.setContents( contentModel, type );
    }
    set text( text: any ) {             
        this.typeWriter = new TypeWriter( text );
    }
    get text(): TypeWriterWord[] {
        return this.typeWriter.activeText;
    }

    get textX() { return this.x + BUBBLE_INNER_PADDING; };
    get headerY() { return this.y + ( (this.type === TextBubbleType.Speak || this.type == TextBubbleType.SpeakYesNo) ? SMALL_FONT_LINE_HEIGHT : 0 ); }
    get textY() { return this.headerY + LARGE_FONT_LINE_HEIGHT };
    get destinationYIsUp() { return this.y > this.destinationY; };

    setContents( contentModel: SpeakScene | SpeakYesNoScene, type: TextBubbleType ) {
        this.read = false;
        this.type = type;
        this.fullText = contentModel.text;
        this.text = contentModel.text;
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

    markAsRead() {
        this.read = true;
    }

    writeHeader( activeContext: OffscreenCanvasRenderingContext2D ): void {
        writeTextLine( 
            this.headerText, this.textX, this.headerY, SMALL_FONT_SIZE, activeContext
        );
    }

    setHeader( text: string ): void {
        this.hasHeader  = true;
        this.headerText = text;
    }

    draw( context: OffscreenCanvasRenderingContext2D ): void {
        this.copyBubbleToGameCanvas( context );
        if ( this.typeWriter.isWriting ) {
            if ( !this.wroteLastFrame ) {
                this.typeWriter.write();
                this.wroteLastFrame = true;
            }
            else {
                this.wroteLastFrame = false;
            }
        }
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

    writeCenterText( activeContext: OffscreenCanvasRenderingContext2D ): void {
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

    writeText( activeContext: OffscreenCanvasRenderingContext2D ): void {
        this.typeWriter.count();
        setFont( LARGE_FONT_SIZE, activeContext );
        let textLineX = this.textX;
        let textLineY = this.textY;
        let sentenceWidth = BUBBLE_INNER_PADDING * 2;
        let textCopy = [...this.text];
        let phraseArray = [];
        let activePhrase: PhraseModel = null;

        while ( textCopy.length > 0 ) {
            const word = textCopy.shift();
            const width = activeContext.measureText( word.activeWord ).width;
            const newColor = word.color;
            let newSentence = false
            sentenceWidth += width;

            if ( activePhrase === null ) {
                activePhrase = {
                    x: textLineX,
                    y: textLineY,
                    phrase: word.activeWord,
                    color: word.color,
                    width: width
                }
                continue;
            }

            if ( sentenceWidth > this.width ) {
                textLineX = this.textX;
                textLineY += LARGE_FONT_LINE_HEIGHT;
                sentenceWidth = BUBBLE_INNER_PADDING * 2;
                newSentence = true;
            }

            if ( newColor === activePhrase.color && !newSentence ) {
                activePhrase.phrase += word.activeWord;
                activePhrase.width += width;
            }
            else {
                phraseArray.push( activePhrase );
                if ( !newSentence ) {
                    textLineX += activePhrase.width;
                }

                activePhrase = {
                    x: textLineX,
                    y: textLineY,
                    color: word.color,
                    phrase: word.activeWord,
                    width: width
                }
            }

            if ( textCopy.length == 0 ) {
                phraseArray.push( activePhrase );
            }
        }

        phraseArray.forEach( ( phrase ) => {
            writeTextLine( phrase.phrase, phrase.x, phrase.y, LARGE_FONT_SIZE, activeContext, phrase.color );
        } )
    }

    drawButtons( activeContext: OffscreenCanvasRenderingContext2D ): void {
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

    copyBubbleToGameCanvas( activeContext: OffscreenCanvasRenderingContext2D ): void {
        activeContext.drawImage(
            getSpeechBubbleTemplateCanvas(this.type),
            this.x,
            this.y
        );
    }

    moveCursor(): void {
        this.activeButton = this.activeButton === InteractionAnswer.yes ? InteractionAnswer.no : InteractionAnswer.yes;
    }
}