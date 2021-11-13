const canvas = require( '../../helpers/canvasHelpers' );
const globals = require( '../../game-data/globals' );
const { 
    MAX_BUBBLE_WIDTH, GRID_BLOCK_PX, STRD_SPRITE_HEIGHT, BUBBLE_INNER_PADDING,
    STRD_SPRITE_WIDTH, LARGE_FONT_SIZE, MAX_BUBBLE_TEXT_WIDTH 
} = require( '../../game-data/globals' );
const { I_TextBox } = require( '../interfaces/I_TextBox' );

const getSpeechBubbleXy = ( spawnLocation, dimensions ) => {
    let bubbleLocation = {
        'x': spawnLocation.x,
        'y': spawnLocation.y - dimensions.height,
        'position': "UP-RIGHT"
    };
    if ( bubbleLocation.x + dimensions.width > 24 * GRID_BLOCK_PX ) {
        bubbleLocation.x = (spawnLocation.x - dimensions.width) + STRD_SPRITE_WIDTH;
        bubbleLocation.position = "UP-LEFT";
    }
    if ( bubbleLocation.y < 0 ) {
        bubbleLocation.y = spawnLocation.y + STRD_SPRITE_HEIGHT;
        bubbleLocation.position = bubbleLocation.position == "UP-RIGHT" ? "DOWN-RIGHT" : "DOWN-LEFT";
    }
    return bubbleLocation;
}

const getSpeechBubbleDimensions = ( contents ) => {
    const text = canvas.breakTextIntoLines( contents.text, LARGE_FONT_SIZE, MAX_BUBBLE_TEXT_WIDTH )
    const ctx = canvas.getFrontCanvasContext();   
    ctx
    return {
        'width' : text.length > 1 ? MAX_BUBBLE_WIDTH : ctx.measureText(text[0]).width + ( BUBBLE_INNER_PADDING * 2 ),
        'height': text.length * GRID_BLOCK_PX
    }
}

class SpeechBubble extends I_TextBox {
    constructor( location, contents ) {
        const dimensions = getSpeechBubbleDimensions( contents );
        const xyPosition = getSpeechBubbleXy( location, dimensions )

        super( xyPosition, dimensions, 'LARGE', contents.text, contents.options );
        this.innerCanvas = document.createElement('canvas');
        this.innerCanvas.width = this.width;
        this.innerCanvas.height = this.height;
        this.innerCtx = this.innerCanvas.getContext('2d');
        this.position = xyPosition.position;

        if ( contents.sfx ) {
            globals.GAME.sound.playEffect( contents.sfx );
        }

        this.action = contents;
        if ( contents.name ) {
            this.setHeader( contents.name + ": " )
        } 
        this.draw( );
    }

    get horiFlip() { return this.position.includes("LEFT") };
    get vertFlip() { return this.position.includes("DOWN") };

    draw( ) {
        this.drawBox( );
        this.copyBubbleToGameCanvas( );
        if ( this.hasHeader ) {
            this.writeHeader( );
        }
        this.writeText( );
    }

    writeText( ) {
        canvas.setFont(this.fontSize);
        for ( var i = 0; i < this.text.length; i++ ) {
            canvas.writeTextLine( 
                this.text[i], this.textX, this.textY + (this.lineHeight * i), this.fontSize
            );
        }
    }

    copyBubbleToGameCanvas( ) {
        let frontCtx = canvas.getFrontCanvasContext()
        frontCtx.save( );
        frontCtx.scale( this.horiFlip ? -1 : 1, this.vertFlip ? -1 : 1 );
        frontCtx.drawImage(
            this.innerCanvas, 
            this.horiFlip ? (-this.width - this.x) + (GRID_BLOCK_PX / 2) : this.x, 
            this.vertFlip ? -this.height - this.y : this.y
        );
        frontCtx.restore( );
    }
}

module.exports = {
    SpeechBubble
}