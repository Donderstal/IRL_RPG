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
            console.log('handleAnimation!')
            this.handleAnimation( )
        }
    }

    handleAnimation( ) {
        if ( this.inScriptedAnimation ) {
            this.doScriptedAnimation( );
            return
        }
        else if ( this.inMovementAnimation ) {
            this.handleWalkingAnimation( )
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
            this.speak( scene.text )
        }
        if ( scene.type == "MOVE" ) {
            this.goToCell( scene.destination );
        }
        if ( scene.type == "ANIM" ) {
            this.setScriptedAnimation( anim[scene.animName], scene.loop, globals.FRAME_LIMIT )
        }
    }

    speak( text ) {
        const bubbleData = {
            'x'     : this.x,
            'y'     : this.y,
            'text'  : text,
            'name'  : this.name
        };
        
        getSpeechBubble( bubbleData );
    }

    goToCell( cell ) {
        console.log('start moving animation!')
        this.path = [ { id: 1, row: cell.row, col: cell.col } ]
        this.nextPosition = { id: 1, row: cell.row, col: cell.col }
        this.lastPosition = { id: 0, row: this.row, col: this.col }
        this.inMovementAnimation = true;
        state.activeCinematic.activeScene.walkingToDestination = true;
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
        if ( this.nextPosition.row > this.row ) {
            this.y += NPC_speed  
            this.direction = globals["FACING_DOWN"]
        }
        if ( this.nextPosition.row < this.row ) {
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

    getNextNPCPosition( ) {
        for ( var i = 0; i < this.path.length; i++ ) {
            let currentPath = this.path[i]
            
            if ( this.lastPosition.id == currentPath.id ) {
                let index = i
                let pathIterator = i + 1
                let pathLength = this.path.length -1

                this.nextPosition = ( index == pathLength ) ? this.path[0] : this.path[pathIterator]
            }
        }
    }

    handleWalkingAnimation( ) {
        if ( this.inMovementAnimation && this.col == this.nextPosition.col && this.row == this.nextPosition.row ) {
            console.log(state.activeCinematic.activeScene.endDirection)
            this.direction = ( state.activeCinematic.activeScene.endDirection ) 
                ? globals[state.activeCinematic.activeScene.endDirection] 
                : this.direction;
                
            state.activeCinematic.activeScene.walkingToDestination = false;            
            this.inMovementAnimation = false;
            return;
        }

        this.getNextNPCPosition( );
        this.gotToNextDirection( );
        this.checkForAnimationPath( );
    }
} 

module.exports = {
    MapSprite
} 