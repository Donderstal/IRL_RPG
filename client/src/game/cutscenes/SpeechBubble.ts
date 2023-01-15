import { BATTLE_FONT_SIZE, MAP_SPRITE_HEIGHT_IN_SHEET, MAP_SPRITE_WIDTH_IN_SHEET } from '../../game-data/globals';
import { writeTextLine, setFont } from '../../helpers/canvasHelpers';
import { GRID_BLOCK_PX, BUBBLE_INNER_PADDING, GRID_BLOCK_IN_SHEET_PX, LARGE_FONT_SIZE, LARGE_FONT_LINE_HEIGHT } from '../../game-data/globals';
import { BUBBLE_YES, BUBBLE_NO, BUBBLE_UNSELECTED } from '../../game-data/textboxGlobals';
import { InteractionAnswer } from "../../enumerables/InteractionAnswer";
import { TypeWriter, TypeWriterWord } from "../../helpers/TypeWriter";
import { TextBubbleType } from '../../enumerables/TextBubbleType';
import { getSpeechBubbleDimensions, getSpeechBubbleXy } from '../../helpers/speechBubbleHelpers';
import { getUiImage } from '../../assets/ui';
import { TextBubbleBase } from './TextBubbleBase';
import { SpriteAnimation } from '../map/map-classes/SpriteAnimation';
import { getAnimationByName } from '../../resources/animationResources';
import { ANIM_SPEECH_BUBBLE_TALKING_HEAD_1 } from '../../game-data/animationGlobals';
import { DirectionEnum } from '../../enumerables/DirectionEnum';

type PhraseModel = {
    x: number;
    y: number;
    width: number;
    color: string;
    phrase: string;
}

export class SpeechBubble extends TextBubbleBase {
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
    image: HTMLImageElement;
    animation: SpriteAnimation;
    constructor( text: string, type: TextBubbleType, textSpeaker: string = null, spriteDataModel = null ) {
        const dimensions = getSpeechBubbleDimensions( type );
        const xy = getSpeechBubbleXy( type );
        super( xy.x, xy.y, dimensions.width, dimensions.height )

        this.wroteLastFrame = false;

        this.setContents( text, type, textSpeaker, spriteDataModel );
    }
    set text( text: any ) {             
        this.typeWriter = new TypeWriter( text );
    }
    get text(): TypeWriterWord[] {
        return this.typeWriter.activeText;
    }
    get textX(): number {
        return this.isNPCSpeechBubble ? this.x + ( GRID_BLOCK_PX * 2 ) : super.textX;
    }
    get imageX(): number {
        return this.isPlayerSpeechBubble ? ( this.x + this.width ) - ( GRID_BLOCK_PX * 2 ) : this.x;
    }
    get destinationYIsUp() { return this.y > this.destinationY; };

    setContents( text: string, type: TextBubbleType, textSpeaker: string = null, spriteDataModel = null ) {
        this.read = false;
        this.setType( type );
        this.fullText = text;
        this.text = text;
        if ( textSpeaker !== null ) {
            this.setHeader( textSpeaker );
        } 
        if ( this.type === TextBubbleType.SpeakYesNo ) {
            this.bubbleY = ( this.y + this.height ) - GRID_BLOCK_PX;
            this.middleX    = this.x + (this.width / 2);
            this.yesBubbleX = this.middleX - GRID_BLOCK_PX;
            this.noBubbleX  = this.middleX + GRID_BLOCK_PX;
            this.activeButton = InteractionAnswer.yes
        }
        if ( this.isSpeechBubble ) {
            const animationModel = getAnimationByName( ANIM_SPEECH_BUBBLE_TALKING_HEAD_1, MAP_SPRITE_WIDTH_IN_SHEET * 2, MAP_SPRITE_HEIGHT_IN_SHEET, DirectionEnum.down, { looped: true, loops: null } );
            this.image = spriteDataModel.image;
            this.animation = new SpriteAnimation(animationModel);
        }
    }

    markAsRead() {
        this.read = true;
    }

    draw( context: OffscreenCanvasRenderingContext2D ): void {
        super.draw( context );
        if ( this.typeWriter.isWriting ) {
            if ( !this.wroteLastFrame ) {
                this.typeWriter.write();
                this.wroteLastFrame = true;
            }
            else {
                this.wroteLastFrame = false;
            }
            if ( this.isSpeechBubble && this.animation !== null ) {
                this.animation.spriteAnimationCounter( this );
            }
        }
        else if ( this.isSpeechBubble && this.animation !== null ) {
            this.setActiveFrame( this.animation.model.frames[0] );
            this.animation = null;
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
        if ( this.isSpeechBubble ) {
            const imageWidthOnCanvas = GRID_BLOCK_PX * 2;
            const imageHeightOnCanvas = GRID_BLOCK_PX * 1.875;
            const imageXOnCanvas = ( this.imageX + ( GRID_BLOCK_PX * 2 ) ) - imageWidthOnCanvas;
            const imageYOnCanvas = ( this.y + this.height ) - imageHeightOnCanvas
            context.drawImage(
                this.image,
                this.activeFrame.x, this.activeFrame.y,
                this.activeFrame.width, this.activeFrame.height,
                imageXOnCanvas, imageYOnCanvas,
                imageWidthOnCanvas, imageHeightOnCanvas
            );
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
        let sentenceWidth = this.isSpeechBubble ? GRID_BLOCK_PX * 2 : BUBBLE_INNER_PADDING * 2;
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
                sentenceWidth = this.isSpeechBubble ? GRID_BLOCK_PX * 2 : BUBBLE_INNER_PADDING * 2;
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
        activeContext.drawImage(
            this.activeButton === InteractionAnswer.yes ? getUiImage( BUBBLE_YES ) : getUiImage( BUBBLE_UNSELECTED ),
            0, 0,
            GRID_BLOCK_IN_SHEET_PX, GRID_BLOCK_IN_SHEET_PX,
            this.yesBubbleX, this.bubbleY,
            GRID_BLOCK_PX, GRID_BLOCK_PX
        );
        activeContext.drawImage(
            this.activeButton === InteractionAnswer.no ? getUiImage( BUBBLE_NO ) : getUiImage( BUBBLE_UNSELECTED ),
            0, 0,
            GRID_BLOCK_IN_SHEET_PX, GRID_BLOCK_IN_SHEET_PX,
            this.noBubbleX, this.bubbleY,
            GRID_BLOCK_PX, GRID_BLOCK_PX
        );
    }

    moveCursor(): void {
        this.activeButton = this.activeButton === InteractionAnswer.yes ? InteractionAnswer.no : InteractionAnswer.yes;
    }
}