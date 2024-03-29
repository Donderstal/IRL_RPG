﻿import { setFont } from "./canvasHelpers";
import { GRID_BLOCK_PX, LARGE_FONT_LINE_HEIGHT, LARGE_FONT_SIZE } from "../game-data/globals";
import { clearSpeakingEffect } from "../game/sound/sound";
import type { PhraseModel } from "../models/cutscenes/PhraseModel";

export class TypeWriterWord {
    startingPosition: number;
    index: number;

    word: string;
    activeWord: string;
    color: string;
    width: number;
    constructor( word, colorCode, startingPosition, index, innerCtx ) {
        this.startingPosition = startingPosition;
        this.index = index;
        this.initWord( word, colorCode, innerCtx );
    }

    initWord( word: string, colorCode: string, innerCtx: OffscreenCanvasRenderingContext2D ): void {
        setFont( LARGE_FONT_SIZE, innerCtx );
        this.word = word + " ";
        this.color = this.getTextColor( colorCode );
        this.width = innerCtx.measureText( word ).width;
    }

    getTextColor( modifier: string ): string {
        switch ( modifier ) {
            case "B":
                return "black";
            case "R":
                return "red";
            case "O":
                return "orange";
            case "G":
                return "green";
        }
    }

    setWordUntilCharacterLimit( limit: number ): void {
        const difference = limit - this.startingPosition;
        if ( difference > this.word.length ) {
            this.activeWord = this.word;
        }
        else {
            this.activeWord = this.word.slice( 0, difference );
        }
    }
}

export class TypeWriter {
    index: number;
    speed: number;
    counter: number;

    displayFull: boolean;
    countFrames: boolean;
    wroteLastFrame: boolean;

    fullText: TypeWriterWord[];
    _activeText: TypeWriterWord[];

    showTrailingCharacter: boolean;
    trailingCharacter: TypeWriterWord;
    trailingBlock: TypeWriterWord;

    innerCanvas: OffscreenCanvas;
    innerCtx: OffscreenCanvasRenderingContext2D;
    constructor( text: string, showTrailingCharacter = false ) {
        this.index  = 0;
        this.speed = 50;
        this.counter = 0;
        this.countFrames = false;

        this.fullText = [];
        this.displayFull = false;
        this.activeText = [];
        this.wroteLastFrame = false;

        this.innerCanvas = new OffscreenCanvas( GRID_BLOCK_PX, GRID_BLOCK_PX );
        this.innerCtx = this.innerCanvas.getContext( '2d' );

        this.showTrailingCharacter = showTrailingCharacter;
        this.trailingCharacter = new TypeWriterWord( "_", "B", 0, 0, this.innerCtx );
        this.trailingCharacter.setWordUntilCharacterLimit( 1000 );

        this.trailingBlock = new TypeWriterWord( "■", "B", 0, 0, this.innerCtx );
        this.trailingBlock.setWordUntilCharacterLimit( 1000 );

        this.initText( text );
        this.write( );
    }
    
    get isWriting( ): boolean { 
        if ( !this.displayFull ) {
            if ( this.index < this.totalTextCharacters || this.index === 0 ) {
                return true;
            }
        }
        return false;
    }

    get totalTextCharacters( ): number {
        let counter = 0;
        this.fullText.forEach((word)=> {
            counter += word.word.length;
        })
        return counter;
    }

    get activeText() {
        if ( !this.countFrames || !this.showTrailingCharacter ) {
            return [...this._activeText]
        }

        const trailer = this.counter > 5 ? this.trailingCharacter : this.trailingBlock;
        return [...this._activeText, trailer];
    }

    set activeText( text: TypeWriterWord[] ) {
        this._activeText = [...text];
    }

    count() {
        this.countFrames = true;
        this.counter++;
        if ( this.counter > 10 ) {
            this.counter = 0;
        }
    }

    write(): void {
        if ( this.wroteLastFrame ) {
            this.wroteLastFrame = false;
            return;
        }
        if ( this.isWriting ) {
            this.wroteLastFrame = true;
            this.activeText = [];
            let newText = []
            this.fullText.forEach((e)=>{
                if ( this.index >= e.startingPosition ) {
                    e.setWordUntilCharacterLimit( this.index );
                    newText.push( e );
                }
            } )
            this.activeText = newText;
            this.index++;
            if ( this.index === this.totalTextCharacters ) {
                this.displayFullText( )
            }
        }
    }

    breakTextIntoLines( activeContext: OffscreenCanvasRenderingContext2D, startingX: number, startingY: number, maxWidth: number, fontSize: number = LARGE_FONT_SIZE ): PhraseModel[] {
        this.count();
        setFont( fontSize, activeContext );
        let textLineX = startingX;
        let textLineY = startingY;
        let sentenceWidth = 0;

        let textCopy = [...this.activeText ];
        let phraseArray: PhraseModel[] = [];
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

            if ( sentenceWidth > maxWidth ) {
                textLineX = startingX;
                textLineY += LARGE_FONT_LINE_HEIGHT;
                sentenceWidth = 0;
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

        return phraseArray;
    }

    initText( text: string ): void {
        const wordsArray = text.split(" ");
        let totalCharacters = 0;
        wordsArray.forEach((wordInArray, index) => {
            let word = wordInArray;
            let colorModifier = "B"
            if ( wordInArray[0] === "{" && wordInArray[2] === "}" ) {
                colorModifier = wordInArray[1];
                word = wordInArray.split('}')[1];
            }

            const wordInstance = new TypeWriterWord( word, colorModifier, totalCharacters, index, this.innerCtx );
            this.fullText.push( wordInstance );
            totalCharacters += wordInstance.word.length;
        })
    }

    displayFullText( ): void {
        clearSpeakingEffect();
        this.fullText.forEach((e)=>{e.activeWord = e.word;});
        this.activeText = this.fullText;
        this.index = this.totalTextCharacters;
        this.displayFull = true;
    }
}