import { CANVAS_WIDTH, CANVAS_HEIGHT, LARGE_FONT_SIZE, BATTLE_FONT_SIZE, BATTLE_FONT_LINE_HEIGHT, BUBBLE_CANVAS_HEIGHT, BUBBLE_CANVAS_WIDTH } from '../game-data/globals';
import { COLOR_WHITE, COLOR_SECONDARY } from '../game-data/uiGlobals';
import { TypeWriter } from '../helpers/TypeWriter';
import globals from '../game-data/globals';

let loaderTimeout;
let canvas;
let canvasContext;

export class LoadingScreen {
    displayText: string;
    randomTextArray: string[];
    mainText: string;
    currentLoadingScreenText: string;

    typeWriter: TypeWriter;
    mainTextWidth: number;
    activeTextWidth: number;
    constructor() {
        canvas = document.getElementById( 'game-bubble-canvas' ) as HTMLCanvasElement;
        canvasContext = canvas.getContext( "2d" );

        this.displayText = "Loading...";
        this.randomTextArray = [
            "Explaining relativity to kindergartners...",
            "Overthinking something I did five years ago...",
            "Researching the future...",
            "Drilling elite Llama battle division...",
            "Paving streets as slowly as possible...",
            "Blaming personal problems on my parents...",
            "Replacing developers with interns...",
            "Paying artists in exposure...",
            "Taxing waiters more than billionaires...",
            "Redeveloping public housing as luxury condos...",
            "Press space to interact with characters and objects..."
        ]

        this.mainText = "Loading..."
        canvasContext.font = BATTLE_FONT_SIZE + "px " + "Stormfaze";
        this.mainTextWidth = canvasContext.measureText(this.mainText).width;

        this.currentLoadingScreenText;
        this.activeTextWidth;
        this.handleLoadingScreenText( )
    }

    get activeText( ) { return this.typeWriter.activeText.map((e)=>{return e.activeWord;}).join('') };
    get availableTextLines( ) { return this.randomTextArray.filter( ( e ) => { return e !== this.currentLoadingScreenText } )};

    handleLoadingScreenText( ) {
        if ( this.typeWriter === undefined || !this.typeWriter.isWriting ) {
            this.getNewLoadingScreenText( );
            this.typeWriter = new TypeWriter( this.currentLoadingScreenText + "          " );
            canvasContext.font = LARGE_FONT_SIZE + "px " + "Stormfaze";
            this.activeTextWidth = canvasContext.measureText(this.currentLoadingScreenText).width;
        }
    }

    getNewLoadingScreenText( ) {
        this.currentLoadingScreenText = this.availableTextLines[ Math.floor( Math.random( ) * this.availableTextLines.length ) ];
    }

    draw( ) {
        canvasContext.clearRect( 0, 0, BUBBLE_CANVAS_WIDTH, BUBBLE_CANVAS_HEIGHT )
        canvasContext.fillStyle = COLOR_SECONDARY;
        canvasContext.fillRect( 0, 0, BUBBLE_CANVAS_WIDTH, BUBBLE_CANVAS_HEIGHT )
        canvasContext.fillStyle = COLOR_WHITE;
        
        canvasContext.font = BATTLE_FONT_SIZE + "px " + "Stormfaze";
        canvasContext.fillText( this.mainText, ( BUBBLE_CANVAS_WIDTH / 2 ) - ( this.mainTextWidth / 2 ), BUBBLE_CANVAS_HEIGHT / 2 );
        canvasContext.font = LARGE_FONT_SIZE + "px " + "Stormfaze";
        canvasContext.fillText( this.activeText, ( BUBBLE_CANVAS_WIDTH / 2 ) - ( this.activeTextWidth / 2 ), ( BUBBLE_CANVAS_HEIGHT / 2 ) + BATTLE_FONT_LINE_HEIGHT );

        this.handleLoadingScreenText( );
    }

    clear( ) {
        canvasContext.clearRect( 0, 0, BUBBLE_CANVAS_WIDTH, BUBBLE_CANVAS_HEIGHT ) 
    }
}

const drawLoadingScreen = (): void => {
    globals.GAME.loadingScreen.draw( );
    loaderTimeout = setTimeout( drawLoadingScreen, 50 )
}

export const setLoadingScreen = (): void => {
    globals.GAME.loadingScreen = new LoadingScreen( );
    drawLoadingScreen( );
}

export const stopLoadingScreen = ( ): void => {
    clearTimeout(loaderTimeout);
    globals.GAME.loadingScreen.clear( );
    globals.GAME.loadingScreen = null; 
} 