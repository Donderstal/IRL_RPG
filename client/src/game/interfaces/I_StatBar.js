const globals = require("../../game-data/globals");
const { GRID_BLOCK_PX, SMALL_FONT_LINE_HEIGHT, SMALL_FONT_SIZE } = require("../../game-data/globals");
const { drawFromImageToCanvas, writeTextLine } = require('../../helpers/canvasHelpers')
const uiSpriteFolder = "/static/ui/"
/**
 * A StatBar instance contains two Image instances. These are drawn superimposed over eachother on the canvas.
 * If this.currentStatValue is below this.maxStatValue, the front bar is drawn partially to indicate its value has been altered.
 */
class StatBar {
    constructor( type, currentValue, maxValue ) {
        this.type           = type;
        this.width          = GRID_BLOCK_PX * 3;
        this.height         = this.width / 8;
        this.sheetWidth     = 224;
        this.sheetHeight    = 28;

        this.nextStatValue      = false;
        this.currentStatValue   = currentValue;
        this.maxStatValue       = maxValue;

        this.setBarSprites( );
    }

    get onePercent( ) { return this.maxStatValue / 100 }
    get frontBarFactor( ) { return this.currentStatValue / this.maxStatValue }
    get frontBarWidthInSheet( ) { return this.sheetWidth * this.frontBarFactor }
    get frontBarWidth( ) { return this.width * this.frontBarFactor }
    get statText( ) { return this.statName + ": " + this.currentStatValue + "/" + this.maxStatValue  }

    animateValueChange( ) {
        if ( this.currentStatValue < this.nextStatValue ) {
            this.currentStatValue = Math.round( this.currentStatValue += this.onePercent )
            setTimeout( this.animateValueChange.bind(this), 50 );
        }
        else if ( this.currentStatValue > this.nextStatValue ) {
            this.currentStatValue = Math.round( this.currentStatValue -= this.onePercent )
            setTimeout( this.animateValueChange.bind(this), 50 );
        }

        if ( this.currentStatValue > ( this.nextStatValue - this.onePercent ) && this.currentStatValue < ( this.nextStatValue + this.onePercent ) ) {
            this.currentStatValue = this.nextStatValue;
        }
    }
    /**
     * Depending on the value of this.type, set statName and imageSrc props
     */
    setBarSprites( ) {
        switch ( this.type ) {
            case "HP-PLAYER":
                this.frontBarImage = globals.PNG_DICTIONARY[uiSpriteFolder + "HP.png"];
                this.backBarImage = globals.PNG_DICTIONARY[uiSpriteFolder + "HP_Empty.png"];
                this.statName   = "HP";
                break;
            case "HP-ENEMY" :                
                this.frontBarImage = globals.PNG_DICTIONARY[uiSpriteFolder + "Enemy_HP.png"];
                this.backBarImage = globals.PNG_DICTIONARY[uiSpriteFolder + "Enemy_HP_Empty.png"];
                this.statName   = "HP";
                break;
            case "PP"       :
                this.frontBarImage = globals.PNG_DICTIONARY[uiSpriteFolder + "AP.png"];
                this.backBarImage = globals.PNG_DICTIONARY[uiSpriteFolder + "AP_Empty.png"];
                this.statName   = "PP";
                break;
            default:
                console.log('error! Type ' + this.type + " not recognized.")
        }
    }
    /**
     * Assign given value to this.currentStatValue
     * @param {Number} value 
     */
    setCurrentValue( value ) {
        this.nextStatValue = value;
        this.animateValueChange( )
    }
    /**
     * Call this.setCurrentValue with value as argument.
     * Draw back and front bar to canvas.
     * WriteTextLine to canvas.
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} value 
     */
    draw( x, y, value ) {
        this.setCurrentValue( value );
        drawFromImageToCanvas( 
            "FRONT", this.backBarImage,
            0, 0, this.sheetWidth, this.sheetHeight,
            x - ( this.width / 2 ), y, this.width, this.height
        )
        drawFromImageToCanvas( 
            "FRONT", this.frontBarImage,
            0, 0, 
            this.frontBarWidthInSheet, this.sheetHeight,
            x - ( this.width / 2 ), y, 
            this.frontBarWidth, this.height
        )
        writeTextLine( 
            this.statText, x - ( this.width / 2.1 ), y + SMALL_FONT_LINE_HEIGHT - ( ( this.height - SMALL_FONT_SIZE ) / 2 ), "SMALL", "#000000"
        )
    }
} 

module.exports = {
    StatBar
}