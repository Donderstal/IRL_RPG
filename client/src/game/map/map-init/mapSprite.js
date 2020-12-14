const mapHelpers = require('../../../helpers/mapHelpers')
const globals = require('../../../game-data/globals')
const state = require('../../../game-data/state')
const anim = require('../../../resources/animationResources')
const getSpeechBubble = require('../map-ui/displayText').getSpeechBubble
const I_Sprite = require('../../interfaces/I_Sprite').Sprite
const I_Hitbox = require('../../interfaces/I_Hitbox').I_Hitbox

class MapSprite extends I_Sprite {
    constructor ( tile, spriteSize, src ) {       
        super( tile, spriteSize, src )   
        this.cell = {}
        this.animationScript = {};
        this.centerX = () => { return this.x + ( this.width / 2 ) };
        this.baseY = () => { return ( this.y + this.height ) - ( globals.GRID_BLOCK_PX / 2 ) };
        this.hitbox = new I_Hitbox( this.centerX( ), this.baseY( ), this.width / 2 );
        
        this.hasMoved = false;

        this.previousTileIndex;
        this.activeTileIndex;
        this.nextTileIndex;
    }

    get previousTileBack( ) { return globals.GAME.back.class.grid.array[this.previousTileIndex] };
    get currentTileBack( ) { return globals.GAME.back.class.grid.array[this.activeTileIndex] };
    get nextTileBack( ) { return globals.GAME.back.class.grid.array[this.nextTileIndex] };

    get previousTileFront( ) { return globals.GAME.front.class.grid.array[this.previousTileIndex] };
    get currentTileFront( ) { return globals.GAME.front.class.grid.array[this.activeTileIndex] };
    get nextTileFront( ) { return globals.GAME.front.class.grid.array[this.nextTileIndex] };

    get isInCenterFacingLeft( ) {
        return this.centerX( ) < ( this.currentTileBack.x + ( globals.GRID_BLOCK_PX * .55 ) );
    }

    get isInCenterFacingRight( ) {
        return this.centerX( ) > ( this.currentTileBack.x + ( globals.GRID_BLOCK_PX * .45 ) ); 
    }

    get isInCenterFacingUp( ) {
        return this.baseY( ) < ( this.currentTileBack.y + ( globals.GRID_BLOCK_PX * .55 ) );
    }

    get isInCenterFacingDown( ) {
        return this.baseY( ) > ( this.currentTileBack.y + ( globals.GRID_BLOCK_PX * .45 ) ); 
    }

    drawSprite( ) {
        super.drawSprite( )
        this.updateTileIndexes( )
        if ( !state.cinematicMode ) {
            this.hitbox.updateXy( this.centerX( ), this.baseY( ) );        
        }
        else if ( state.cinematicMode && ( this.inScriptedAnimation || this.inMovementAnimation ) ) {
            this.handleAnimation( )
        }
    }

    updateTileIndexes( ) {
        const tile = globals.GAME.front.class.getTileAtXY( this.centerX( ), this.baseY( ) );

        if ( this.activeTileIndex == null ) {
            this.setActiveTileIndex( tile );
            this.setNextTileIndex( );
        }
        else if ( this.activeTileIndex != tile.index ) {
            this.setPreviousTileIndex( );
            this.setActiveTileIndex( tile );
            this.setNextTileIndex( );
        } 
        else if ( this.direction != this.nextTileDirection ) {
            this.setNextTileIndex( );
        } 
    }

    setPreviousTileIndex( ) {
        this.previousTileIndex = this.activeTileIndex
        this.previousTileFront.clearSpriteData( )
    }

    setActiveTileIndex( tile ) {
        this.activeTileIndex = ( tile.index >= globals.GAME.back.class.grid.array.length || tile.index < 0 ) ? this.activeTileIndex : tile.index;
        this.currentTileFront.setSpriteData( 'character', null )
    }

    setNextTileIndex( ) {
        switch ( this.direction ) {
            case globals["FACING_UP"] :
                this.nextTileIndex = this.activeTileIndex - globals.GAME.back.class.grid.cols;
                break;
            case globals["FACING_RIGHT"] :
                this.nextTileIndex = this.activeTileIndex + 1;
                break;
            case globals["FACING_DOWN"] :
                this.nextTileIndex = this.activeTileIndex + globals.GAME.back.class.grid.cols;
                break;
            case globals["FACING_LEFT"] :
                this.nextTileIndex = this.activeTileIndex - 1;
                break;
        }

        this.nextTileDirection = this.direction;
    }

    handleAnimation(  ) {
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