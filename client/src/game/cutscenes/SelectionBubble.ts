import { DirectionEnum } from "../../enumerables/DirectionEnum";
import type { TextBubbleType } from "../../enumerables/TextBubbleType";
import { GRID_BLOCK_PX, LARGE_FONT_LINE_HEIGHT, LARGE_FONT_SIZE } from "../../game-data/globals";
import { writeTextLine } from "../../helpers/canvasHelpers";
import { getSpeechBubbleDimensions, getSpeechBubbleXy } from "../../helpers/speechBubbleHelpers";
import { TypeWriterWord } from "../../helpers/TypeWriter";
import { TextBubbleBase } from "./TextBubbleBase";

export class SelectionBubble extends TextBubbleBase {
    source: { [key in string]: string }
    slots: string[];
    activeSlotIndex: number;
    disabledSlots: number[]

    counter: number;
    trailingBlock: TypeWriterWord;

    innerCanvas: OffscreenCanvas;
    innerCtx: OffscreenCanvasRenderingContext2D;
    constructor( source: {[key in string]: string}, type: TextBubbleType, header: string, disabledSlots: string[] = null ) {
        const textList = Object.keys( source );
        textList.push( 'Cancel' );

        const dimensions = getSpeechBubbleDimensions( type );
        const xy = getSpeechBubbleXy( type );

        super( xy.x, xy.y, dimensions.width, dimensions.height );
        this.source = source;

        this.slots = [];
        this.disabledSlots = [];
        this.activeSlotIndex = null;

        this.setContents( textList, type, header, disabledSlots );
        this.activateFirstSlot();

        this.innerCanvas = new OffscreenCanvas( GRID_BLOCK_PX, GRID_BLOCK_PX );
        this.innerCtx = this.innerCanvas.getContext( '2d' );
        this.trailingBlock = new TypeWriterWord( "■", "B", 0, 0, this.innerCtx );
        this.trailingBlock.setWordUntilCharacterLimit( 1000 );
        this.counter = 0
    }

    setContents( textList: string[], type: TextBubbleType, header: string, disabledSlots: string[] ): void {
        this.setType( type );
        if ( header !== null ) {
            this.setHeader( header + ": " )
        };

        textList.forEach( ( e ) => {
            this.slots.push( e );
        } );

        disabledSlots.forEach( ( e ) => {
            this.disabledSlots.push( textList.indexOf( e ) );
        } );
    }

    activateFirstSlot(): void {
        this.slots.forEach( ( e, index ) => {
            if ( this.disabledSlots.indexOf( index ) == -1 && this.activeSlotIndex === null ) {
                this.activeSlotIndex = index;
            }
        } )
    }

    scrollActiveIndexUp(): void {
        let foundIndex = false;
        let index = this.activeSlotIndex;
        while ( foundIndex === false ) {
            index -= 1;
            if ( index < 0 ) {
                index = ( this.slots.length - 1 );
            }
            if ( this.disabledSlots.indexOf( index ) === -1 ) {
                this.activeSlotIndex = index;
                foundIndex = true;
            }
        } 
    }

    scrollActiveIndexDown(): void {
        let foundIndex = false;
        let index = this.activeSlotIndex;
        while ( foundIndex === false ) {
            index += 1;
            if ( index > ( this.slots.length - 1 ) ) {
                index = 0;
            }
            if ( this.disabledSlots.indexOf( index ) === -1 ) {
                this.activeSlotIndex = index;
                foundIndex = true;
            }
        } 
    }

    draw( context: OffscreenCanvasRenderingContext2D ): void {
        this.count();
        super.draw( context );

        let yCounter = this.textY;
        this.slots.forEach( ( e, index ) => {
            const color = this.disabledSlots.indexOf( index ) == -1 ? "black" : "lightgrey";
            const trailer = this.counter > 5 ? " " : this.trailingBlock.word;
            const text = this.activeSlotIndex === index ? ` ${e}${trailer}` : e;
            writeTextLine( text, this.textX, yCounter, LARGE_FONT_SIZE, context, color );
            yCounter += LARGE_FONT_LINE_HEIGHT;
        } )
    }

    count() {
        this.counter++;
        if ( this.counter > 10 ) {
            this.counter = 0;
        }
    }

    handleArrowButtons( direction: DirectionEnum ): void {
        if ( direction === DirectionEnum.up ) {
            this.scrollActiveIndexUp();
        }
        if ( direction === DirectionEnum.down ) {
            this.scrollActiveIndexDown()
        }
    }

    handleSelectionButton(): string {
        return this.source[this.slots[this.activeSlotIndex]];
    }
}