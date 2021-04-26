const { GRID_BLOCK_PX } = require("../../game-data/globals");
const { drawFromImageToCanvas } = require('../../helpers/canvasHelpers')

const uiSpriteFolder = "/static/ui/"

class StatBar {
    constructor( type, currentValue, maxValue ) {
        this.type           = type;
        this.width          = GRID_BLOCK_PX * 3;
        this.height         = this.width / 8;
        this.sheetWidth     = 224;
        this.sheetHeight    = 28;
        this.frontBarImage  = new Image( );
        this.backBarImage   = new Image( );

        this.currentStatValue   = currentValue;
        this.maxStatValue       = maxValue;

        this.setBarSprites( );
    }

    get frontBarFactor( ) { return this.currentStatValue / this.maxStatValue }
    get frontBarWidthInSheet( ) { return this.sheetWidth * this.frontBarFactor }
    get frontBarWidth( ) { return this.width * this.frontBarFactor }

    setBarSprites( ) {
        switch ( this.type ) {
            case "HP-PLAYER":
                this.frontBarImage.src = uiSpriteFolder + "HP.png"
                this.backBarImage.src  = uiSpriteFolder + "HP_Empty.png"
                break;
            case "HP-ENEMY" :                
                this.frontBarImage.src = uiSpriteFolder + "Enemy_HP.png"
                this.backBarImage.src  = uiSpriteFolder + "Enemy_HP_Empty.png"
                break;
            case "PP"       :
                this.frontBarImage.src = uiSpriteFolder + "AP.png"
                this.backBarImage.src  = uiSpriteFolder + "AP_Empty.png"
                break;
            default:
                console.log('error! Type ' + this.type + " not recognized.")
        }
    }

    setCurrentValue( value ) {
        this.currentStatValue = value;
    }

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
    }
} 

module.exports = {
    StatBar
}