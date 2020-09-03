const mapHelpers = require('../../../helpers/mapHelpers')
const globals = require('../../../game-data/globals')
const state = require('../../../game-data/state')
const anim = require('../../../resources/animationResources')
const getSpeechBubble = require('../map-ui/displayText').getSpeechBubble
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
        if ( !state.cinematicMode ) {
            this.hitbox.updateXy( this.centerX( ), this.centerY( ) );        
        }
        else if ( state.cinematicMode && ( this.inScriptedAnimation || this.inMovementAnimation ) ) {
            this.handleAnimation( )
        }
    }

    handleAnimation( ) {
        if ( this.inScriptedAnimation ) {
            this.doScriptedAnimation( );
            return
        }
        else if ( this.inMovementAnimation ) {
            this.goToDestination( )
            return
        }
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

    setAnimation( scene ) {
        if ( scene.type == "SPEAK" ) {
            this.speak( scene.text, ( scene.sfx ) ? scene.sfx : false )
        }
        if ( scene.type == "MOVE" ) {
            this.setDestination( scene.destination, (scene.endDirection) ? scene.endDirection : false );
        }
        if ( scene.type == "ANIM" ) {
            this.setScriptedAnimation( scene, globals.FRAME_LIMIT )
        }
    }

    speak( text, sfx ) {    
        getSpeechBubble( {
            'x'     : this.x,
            'y'     : this.y,
            'text'  : text,
            'name'  : this.name,
            'sfx'   : ( sfx ) ? sfx : false
        } );
    }

    setDestination( destination, endDirection ) {
        super.setDestination( destination, endDirection );
        state.activeCinematic.activeScene.walkingToDestination = true;
    }

    goToDestination( ) {
        super.goToDestination( );
        if ( !this.moving ) {
            state.activeCinematic.activeScene.walkingToDestination = false;
        }
    }

    setScriptedAnimation( scene, frameRate, numberOfLoops = false ) {
        this.inScriptedAnimation    = true;     

        this.animationScript.loop           = scene.loop;
        this.animationScript.data           = anim[scene.animName];      
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
        }
    }

    unsetScriptedAnimation( ) {
        if ( Number.isInteger(state.activeCinematic.activeScene.endDirection)) {
            this.direction = state.activeCinematic.activeScene.endDirection
        }   
        this.inScriptedAnimation    = false;  
        this.animationScript        = {}
    }
} 

module.exports = {
    MapSprite
} 