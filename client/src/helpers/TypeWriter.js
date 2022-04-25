const canvas = require("./canvasHelpers");
const globals = require("../game-data/globals");

class TypeWriter {
    constructor( text, writingSoundEffect ) {
        this.index  = 0;
        this.speed  = 50;
        this.writingSoundEffect = writingSoundEffect;

        this.fullText = [];
        this.displayFull = false;
        this.activeText = "";

        this.initText( text );
        this.write( );
    }
    
    get isWriting( ) { 
        if ( !this.displayFull ) {
            if ( this.index < this.totalTextCharacters || this.index == 0 ) {
                return true;
            }
        }
        return false;
    }

    get totalTextCharacters( ) {
        let counter = 0;
        this.fullText.forEach((word)=> {
            counter += word.word.length;
        })
        return counter;
    }

    write( ) {
        if ( this.isWriting ) {
            this.activeText = [];
            this.fullText.forEach((e)=>{
                if ( this.index >= e.startingPosition ) {
                    e.setWordUntilCharacterLimit( this.index );
                    this.activeText.push( e );
                }
            })
            this.index++;
            if ( this.index == this.totalTextCharacters ) {
                this.displayFullText( )
            }
            setTimeout( this.write.bind(this), this.speed );
        }
    }

    initText( text ) {
        let wordsArray = text.split(" ");
        let totalCharacters = 0;
        wordsArray.forEach((wordInArray, index) => {
            let word = wordInArray;
            let colorModifier = "B"
            if ( wordInArray[0] == "{" && wordInArray[2] == "}" ) {
                colorModifier = wordInArray[1];
                word = wordInArray.split('}')[1];
            }

            let wordInstance = new TypeWriterWord( word, colorModifier, totalCharacters, index );
            this.fullText.push( wordInstance );
            totalCharacters += wordInstance.word.length;
        })
    }

    displayFullText( ) {
        if ( this.writingSoundEffect ) {
            globals.GAME.sound.clearSpeakingEffect( );
        }
        this.fullText.forEach((e)=>{e.activeWord = e.word;});
        this.activeText = this.fullText;
        this.index = this.totalTextCharacters;
        this.displayFull = true;
    }
}

class TypeWriterWord {
    constructor( word, colorCode, startingPosition, index ) {
        this.startingPosition = startingPosition;
        this.index = index;
        this.initWord( word, colorCode );
    }

    initWord( word, colorCode ) {
        const canvasCtx = globals.SCREEN.MOBILE ? canvas.getBubbleCanvasContext() : canvas.getFrontCanvasContext();
        canvas.setFont(globals.LARGE_FONT_SIZE, canvasCtx);
        this.word = word + " ";
        this.color = this.getTextColor(colorCode);
        this.width = canvasCtx.measureText(word).width;
    }

    getTextColor( modifier ) {
        switch( modifier ) {
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

    setWordUntilCharacterLimit( limit ) {
        const difference = limit - this.startingPosition;
        if ( difference > this.word.length ) {
            this.activeWord = this.word;
        }
        else {
            this.activeWord = this.word.slice(0, difference);
        }
    }
}

module.exports = {
    TypeWriter
}