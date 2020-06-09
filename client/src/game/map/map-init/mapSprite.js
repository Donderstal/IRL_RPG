const mapHelpers = require('../../../helpers/mapHelpers')
const globals = require('../../../game-data/globals')

const I_Sprite = require('../../interfaces/I_Sprite').Sprite
const I_Hitbox = require('../../interfaces/I_Hitbox').I_Hitbox

class MapSprite extends I_Sprite {
    constructor ( start, spriteSheetSrc, typeOfStart, spriteDirection = 0, noHitbox = false ) {       
        super ( start, spriteSheetSrc, typeOfStart, "STRD", spriteDirection )
        this.cell = {}
        this.animationScript = {};
        this.centerX = () => { return this.x + ( this.width / 2 ) };
        this.centerY = () => { return this.y + ( this.height / 2 ) };
        if ( noHitbox ) {
            this.hitbox;
        }
        else {
            this.hitbox = new I_Hitbox( this.centerX( ), this.y, this.width / 2 );            
        }

    }

    drawSprite( ) {
        super.drawSprite( )
        this.updateSpriteCellXy( )
        this.hitbox.updateXy( this.centerX( ), this.centerY( ) );
    }

    updateSpriteCellXy( ) {
        this.cell.x = this.x + ( this.width * .5 ),
        this.cell.y = this.y + ( this.height - globals.GRID_BLOCK_PX)
    }

    calcCellFromXy( ) {
        const cell = mapHelpers.getCellOfXY( this.cell.x, this.cell.y )
        this.row = cell.row
        this.col = cell.col

        this.updateSpriteBorders( )
        this.updateSpriteCellXy( )
    }

    setScriptedAnimation( animationData, isLoop, frameRate, numberOfLoops = null ) {
        this.storePosition( )
        this.inScriptedAnimation    = true;     

        this.animationScript.loop           = isLoop;
        this.animationScript.data           = animationData;     
        this.animationScript.index          = 0;           
        this.animationScript.scenes         = this.animationScript.data.length;      
        this.animationScript.frameRate      = frameRate;
        this.animationScript.numberOfLoops  = numberOfLoops;
    }

    doScriptedAnimation( ) {
        this.frameCount++;  
    
        if ( this.frameCount >= this.animationScript.frameRate ) {
            this.frameCount = 0;
            this.updateAnimationIndex( );

            let currentScene = this.animationScript.data[this.animationScript.index];

            this.sheetPosition  = currentScene.position;
            this.direction      = currentScene.direction
        }
    }

    updateAnimationIndex( ) {
        if ( this.animationScript.index + 1 == this.animationScript.scenes ) {

        }
        else if ( this.animationScript.index + 1 == this.animationScript.scenes && !this.animationScript.loop ) {

        }
        else {
            this.animationScript.index++                
        }        
    }

    unsetScriptedAnimation( ) {
        this.inScriptedAnimation    = false;       
        this.animationScript        = {}
    }

    storePosition( ) {
        this.storedPosition.direction       = this.direction;
        this.storedPosition.sheetPosition   = this.sheetPosition
    }

    restorePosition( ) {
        this.sheetPosition  = this.storedPosition.sheetPosition;
        this.direction      = this.storedPosition.direction
    }
} 

module.exports = {
    MapSprite
}