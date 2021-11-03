const { getEffectData } = require("../../resources/effectResources");
const { drawFromImageToCanvas } = require("../../helpers/canvasHelpers");
const { FRAME_LIMIT, GRID_BLOCK_PX } = require("../../game-data/globals");
const globals = require("../../game-data/globals");
/**
 * I_Effect instances represent a ( part of ) a graphical effect in the game.
 */
class I_Effect {
    constructor( name, x, y ) {
        this.name   = name;
        this.x      = x;
        this.y      = y;
        this.frames = [];

        this.frameCount = 0;    
        this.activeFrameIndex = 0;

        this.setEffectData( )
    }

    get activeFrame( ) { return this.frames[this.activeFrameIndex]; };
    /**
     * Call this.pushFramesToList for each object in the given frames array
     * Set the sheetFrameLimit used in countFrame to the length of the frames array
     * @param {Object[]} frames 
     */
    initialiseAnimationFrames( frames ) {
        frames.forEach( ( frameData ) => {
            this.pushFramesToList( frameData );
        })
        this.sheetFrameLimit = frames.length;
    }
    /**
     * Instantiate a Frame with the given frameData and push it to this.frames
     * @param {Object} frameData
     */
    pushFramesToList( frameData ) {
        this.frames.push( 
            new Frame( 
                frameData.x, frameData.y, 
                this.frameWidth, this.frameHeight
            )
        )
    }
    /**
     * Get the data associated with this.name.
     * Assign the frame width and frame height from the data object
     * Assign the width and height of the sprite in canvas from data object
     * Then call setSprite and initialiseAnimationFrames
     */
    setEffectData( ) {
        const data      = getEffectData( this.name );
        this.frameWidth = data.frameWidth;
        this.frameHeight = data.frameHeight;
        this.width  = data.widthInBlocks * GRID_BLOCK_PX;
        this.height = data.heightInBlocks * GRID_BLOCK_PX;
        
        this.setSprite( data.src );
        this.initialiseAnimationFrames( data.frames );
    }
    /**
     * Increment frameCount. If it is over frame limit,
     *  reset frameCount and increment activeFrameIndex
     */
    countFrame( ) {
        this.frameCount++ 
        
        if ( this.frameCount >= FRAME_LIMIT ) {
            this.frameCount = 0;
            this.activeFrameIndex++;

            if (this.activeFrameIndex >= this.sheetFrameLimit ) {
                this.activeFrameIndex = 0;
            }
        }
    }
    /**
     * Set this.active to false;
     */
    deActivate( ) {
        this.active = false;
    }
    /**
     * Load an Image instance to this.sheet based on the given src.
     * @param {String} src 
     */
    setSprite( src ) {
        this.src        = src;
        this.sheet      = globals.PNG_DICTIONARY[this.src];
        this.active     = true;
    }
    /**
     * Set this.x and this.y to given values
     * @param {Number} x 
     * @param {Number} y 
     */
    updateXY( x, y ) {
        this.x = x;
        this.y = y;
    }
    /**
     * Call this.updateXY with given arguments.
     * Then, draw the active frame if the effect is active.
     * @param {Number} x 
     * @param {Number} y 
     */
    draw( x, y ) {
        this.updateXY( x, y )
        if ( this.active ) {
            this.activeFrame.draw( this.sheet, this.x, this.y, this.width, this.height );
            this.countFrame( );
        }
    }

}
/**
 * A Frame instace represents a single step in a I_Effect animation
 */
class Frame { 
    constructor( x, y, width, height ) {
        this.x  = x;
        this.y  = y;
        this.width = width;
        this.height = height;
    }
    /**
     * Draw the frame from given sheet at given location
     * @param {Image} image HTML Image instance
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} width 
     * @param {Number} height 
     */
    draw( image, x, y, width, height ) {
        drawFromImageToCanvas( 
            "FRONT", image, 
            this.x, this.y, this.width, this.height,
            x, y, width, height
        );
    }
}

module.exports = {
    I_Effect
}