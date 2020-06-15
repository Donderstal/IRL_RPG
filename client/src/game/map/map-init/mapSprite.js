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

    setScriptedAnimation( animationData, isLoop, frameRate, numberOfLoops = false ) {
        this.storePosition( )
        this.inScriptedAnimation    = true;     

        this.animationScript.loop           = isLoop;
        this.animationScript.data           = animationData;     
        this.animationScript.index          = 0;           
        this.animationScript.sceneLength    = this.animationScript.data.length;      
        this.animationScript.frameRate      = frameRate;
        this.animationScript.numberOfLoops  = numberOfLoops;
        this.animationScript.currentLoop    = 0;
    }

    doScriptedAnimation( ) {
        this.frameCount++;  
    
        if ( this.frameCount >= this.animationScript.frameRate ) {
            this.frameCount = 0;
            this.updateAnimationIndex( );

            if ( this.inScriptedAnimation ) {
                let currentScene = this.animationScript.data[this.animationScript.index];

                this.sheetPosition  = currentScene.position;
                this.direction      = currentScene.direction                
            }
        }
    }

    updateAnimationIndex( ) {
        ( this.animationScript.index + 1 == this.animationScript.sceneLength )
            ? this.checkForLoop()
            : this.animationScript.index++                       
    }

    checkForLoop( ) {
        const currentLoopIsLast = this.animationScript.numberOfLoops == this.animationScript.currentLoop

        if ( this.animationScript.loop && ( !this.animationScript.numberOfLoops || !currentLoopIsLast ) ) {
            this.animationScript.currentLoop++
            this.animationScript.index = 0;
        }
        else {
            this.unsetScriptedAnimation( );
            this.restorePosition( );
        }
    }

    unsetScriptedAnimation( ) {
        this.inScriptedAnimation    = false;       
        this.animationScript        = {}
    }

    storePosition( ) {
        this.storedPosition = {}
        this.storedPosition.direction       = this.direction;
        this.storedPosition.sheetPosition   = this.sheetPosition
    }

    restorePosition( ) {
        this.sheetPosition  = this.storedPosition.sheetPosition;
        this.direction      = this.storedPosition.direction
    }

    gotToNextDirection( countFrame = true) {
        const NPC_speed = globals.MOVEMENT_SPEED * 0.5
        if ( this.nextPosition.row > this.row && this.nextPosition.col === this.col ) {
            this.y += NPC_speed  
            this.direction = globals["FACING_DOWN"]
        }
        if ( this.nextPosition.row < this.row && this.nextPosition.col === this.col ) {
            this.y -= NPC_speed    
            this.direction = globals["FACING_UP"]
        }
        if (this.nextPosition.col > this.col && this.nextPosition.row === this.row ) {
            this.x += NPC_speed    
            this.direction = globals["FACING_RIGHT"]
        }
        if ( this.nextPosition.col < this.col && this.nextPosition.row === this.row ) {
            this.x -= NPC_speed   
            this.direction = globals["FACING_LEFT"]
        }

        if ( countFrame ) {
            this.countFrame( );
        }
    }

    checkForAnimationPath ( ) {
        this.calcCellFromXy()
    
        if ( this.nextPosition.row === this.row && this.nextPosition.col === this.col ) {
            this.lastPosition = this.nextPosition
            this.getNextNPCPosition( )
        }
    }

    countFrame ( ) {
        this.frameCount++;  
    
        if ( this.frameCount >= globals.FRAME_LIMIT) {
            this.frameCount = 0;
            this.sheetPosition++;
    
            if (this.sheetPosition >= 4) {
                this.sheetPosition = 0;
            }
        }
    }
} 

module.exports = {
    MapSprite
}