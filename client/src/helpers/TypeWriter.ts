import { setFont, getBubbleCanvasContext, getFrontCanvasContext } from "./canvasHelpers";
import globals, { LARGE_FONT_SIZE } from "../game-data/globals";

class TypeWriterWord {
    startingPosition: number;
    index: number;

    word: string;
    activeWord: string;
    color: string;
    width: number;
    constructor( word, colorCode, startingPosition, index ) {
        this.startingPosition = startingPosition;
        this.index = index;
        this.initWord( word, colorCode );
    }

    initWord( word: string, colorCode: string ): void {
        const canvasCtx = globals.SCREEN.MOBILE ? getBubbleCanvasContext() : getFrontCanvasContext();
        setFont( LARGE_FONT_SIZE, canvasCtx );
        this.word = word + " ";
        this.color = this.getTextColor( colorCode );
        this.width = canvasCtx.measureText( word ).width;
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

    displayFull: boolean;
    fullText: TypeWriterWord[];
    activeText: TypeWriterWord[];

    constructor( text ) {
        this.index  = 0;
        this.speed  = 50;

        this.fullText = [];
        this.displayFull = false;
        this.activeText = [];

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

    write( ): void {
        if ( this.isWriting ) {
            this.activeText = [];
            this.fullText.forEach((e)=>{
                if ( this.index >= e.startingPosition ) {
                    e.setWordUntilCharacterLimit( this.index );
                    this.activeText.push( e );
                }
            })
            this.index++;
            if ( this.index === this.totalTextCharacters ) {
                this.displayFullText( )
            }
            setTimeout( this.write.bind(this), this.speed );
        }
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

            const wordInstance = new TypeWriterWord( word, colorModifier, totalCharacters, index );
            this.fullText.push( wordInstance );
            totalCharacters += wordInstance.word.length;
        })
    }

    displayFullText( ): void {
        globals.GAME.sound.clearSpeakingEffect();
        this.fullText.forEach((e)=>{e.activeWord = e.word;});
        this.activeText = this.fullText;
        this.index = this.totalTextCharacters;
        this.displayFull = true;
    }
}