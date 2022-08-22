import { CANVAS_WIDTH, CANVAS_HEIGHT, LARGE_FONT_SIZE, BATTLE_FONT_SIZE, BATTLE_FONT_LINE_HEIGHT } from '../game-data/globals';
import { COLOR_WHITE, COLOR_SECONDARY } from '../game-data/uiGlobals';
import { TypeWriter } from '../helpers/TypeWriter';
import globals from '../game-data/globals';

let loaderTimeout;

export class LoadingScreen {
    displayText: string;
    randomTextArray: string[];
    mainText: string;
    currentLoadingScreenText: string;

    typeWriter: TypeWriter;
    mainTextWidth: number;
    activeTextWidth: number;
    constructor( ) {
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
        globals.GAME.front.ctx.font = BATTLE_FONT_SIZE + "px " + "Stormfaze";
        this.mainTextWidth = globals.GAME.front.ctx.measureText(this.mainText).width;

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
            globals.GAME.front.ctx.font = LARGE_FONT_SIZE + "px " + "Stormfaze";
            this.activeTextWidth = globals.GAME.front.ctx.measureText(this.currentLoadingScreenText).width;
        }
    }

    getNewLoadingScreenText( ) {
        this.currentLoadingScreenText = this.availableTextLines[ Math.floor( Math.random( ) * this.availableTextLines.length ) ];
    }

    draw( ) {
        globals.GAME.front.ctx.clearRect( 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT )
        globals.GAME.front.ctx.fillStyle = COLOR_SECONDARY;
        globals.GAME.front.ctx.fillRect( 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT )
        globals.GAME.front.ctx.fillStyle = COLOR_WHITE;
        
        globals.GAME.front.ctx.font = BATTLE_FONT_SIZE + "px " + "Stormfaze";
        globals.GAME.front.ctx.fillText( this.mainText, ( CANVAS_WIDTH / 2 ) - ( this.mainTextWidth / 2 ), CANVAS_HEIGHT / 2 );
        globals.GAME.front.ctx.font = LARGE_FONT_SIZE + "px " + "Stormfaze";
        globals.GAME.front.ctx.fillText(this.activeText, ( CANVAS_WIDTH / 2 ) - ( this.activeTextWidth / 2 ) , ( CANVAS_HEIGHT / 2 ) + BATTLE_FONT_LINE_HEIGHT );

        this.handleLoadingScreenText( );
    }

    clear( ) {
        globals.GAME.front.ctx.clearRect( 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT ) 
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