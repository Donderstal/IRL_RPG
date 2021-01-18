const globals = require('../../../game-data/globals')
const { FRAME_LIMIT, GRID_BLOCK_PX } = require('../../../game-data/globals');
const anim = require('../../../resources/animationResources')
const getSpeechBubble = require('../map-ui/displayText').getSpeechBubble
const I_Sprite = require('../../interfaces/I_Sprite').Sprite
const I_Hitbox = require('../../interfaces/I_Hitbox').I_Hitbox
const checkForCollision = require('../map-ui/movementChecker').checkForCollision

class MapSprite extends I_Sprite {
    constructor ( tile, spriteSize, src ) {       
        super( tile, spriteSize, src )   
        this.cell = {}
        this.animationScript = {};
        this.centerX = () => { return this.x + ( this.width / 2 ) };
        this.baseY = () => { return ( this.y + this.height ) - ( globals.GRID_BLOCK_PX / 2 ) };
        this.hitbox = new I_Hitbox( this.centerX( ), this.baseY( ), this.width / 2 );
        
        this.hasMoved = false;
        this.spriteId;

        this.activeTileIndex;
        this.nextTileIndex;
    }

    get currentTileBack( ) { return globals.GAME.getTileOnCanvasAtIndex( "BACK", this.activeTileIndex )  };
    get nextTileBack( ) { return globals.GAME.getTileOnCanvasAtIndex( "BACK", this.nextTileIndex ) };

    get currentTileFront( ) { return globals.GAME.getTileOnCanvasAtIndex( "FRONT", this.activeTileIndex )  };
    get nextTileFront( ) { return globals.GAME.getTileOnCanvasAtIndex( "FRONT", this.nextTileIndex ) };

    get isInCenterFacingLeft( ) {
        return this.centerX( ) < ( this.currentTileBack.x + ( GRID_BLOCK_PX * .55 ) );
    }

    get isInCenterFacingRight( ) {
        return this.centerX( ) > ( this.currentTileBack.x + ( GRID_BLOCK_PX * .45 ) ); 
    }

    get isInCenterFacingUp( ) {
        return this.baseY( ) < ( this.currentTileBack.y + ( GRID_BLOCK_PX * .55 ) );
    }

    get isInCenterFacingDown( ) {
        return this.baseY( ) > ( this.currentTileBack.y + ( GRID_BLOCK_PX * .45 ) ); 
    }

    drawSprite( ) {
        super.drawSprite( )
        this.updateTileIndexes( )
        if ( !globals.GAME.cinematicMode ) {
            this.hitbox.updateXy( this.centerX( ), this.baseY( ) );    
            //this.hitbox.draw( this.centerX( ), this.baseY( ) )
            this.pathIsBlocked = checkForCollision( this, this == globals.GAME.PLAYER );    
        }
        else if ( globals.GAME.cinematicMode && ( this.inScriptedAnimation || this.inMovementAnimation ) ) {
            this.handleAnimation( )
        }
    }

    unsetActiveTile( ) {
        if ( this.currentTileFront ) {
            this.currentTileFront.clearSpriteData( );            
        }
    }

    updateTileIndexes( ) {
        this.unsetActiveTile( );

        const tile = globals.GAME.getTileOnCanvasAtXY( 'FRONT', this.centerX( ), this.baseY( ) );

        if ( tile == undefined ) {
            this.activeTileIndex = null;
            return;
        } 

        this.setActiveTileIndex( tile );
        this.setNextTileIndex( );

        if ( this.direction != this.nextTileDirection ) {
            this.setNextTileIndex( );
        } 
    }

    setActiveTileIndex( tile ) {
        this.activeTileIndex = ( tile.index >= globals.GAME.back.class.grid.array.length || tile.index < 0 ) ? this.activeTileIndex : tile.index;
        this.row = globals.GAME.getTileOnCanvasAtIndex( "BACK", this.activeTileIndex ).row;
        this.col = globals.GAME.getTileOnCanvasAtIndex( "BACK", this.activeTileIndex ).col;
        this.currentTileFront.setSpriteData( 'character', null )
        this.currentTileFront.spriteId = this.spriteId;
    }

    setNextTileIndex( ) {
        switch ( this.direction ) {
            case globals["FACING_UP"] :
                this.nextTileIndex = this.currentTileFront.row != 1 ? this.activeTileIndex - globals.GAME.back.class.grid.cols : undefined;
                break;
            case globals["FACING_RIGHT"] :
                this.nextTileIndex = this.currentTileFront.col != globals.GAME.activeMap.columns ? this.activeTileIndex + 1 : undefined;
                break;
            case globals["FACING_DOWN"] :
                this.nextTileIndex = this.currentTileFront.row != globals.GAME.activeMap.rows ? this.activeTileIndex + globals.GAME.back.class.grid.cols : undefined;
                break;
            case globals["FACING_LEFT"] :
                this.nextTileIndex = this.currentTileFront.col != 1 ? this.activeTileIndex - 1 : undefined;
                break;
        }

        this.nextTileDirection = this.direction;
    }

    clearTileIndexes( ) {
        this.activeTileIndex = null;
        this.nextTileIndex = null;
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
        this.cell.y = this.y + ( this.height - GRID_BLOCK_PX)
    }

    setAnimation( scene ) {
        if ( scene.type == "SPEAK" ) {
            this.speak( scene.text, ( scene.sfx ) ? scene.sfx : false )
        }
        if ( scene.type == "MOVE" ) {
            this.setDestination( scene.destination, (scene.endDirection) ? scene.endDirection : false );
        }
        if ( scene.type == "ANIM" ) {
            this.setScriptedAnimation( scene, FRAME_LIMIT )
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
        globals.GAME.activeCinematic.activeScene.walkingToDestination = true;
    }

    goToDestination( ) {
        super.goToDestination( );
        if ( !this.moving ) {
            globals.GAME.activeCinematic.activeScene.walkingToDestination = false;
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
        if ( Number.isInteger(globals.GAME.activeCinematic.activeScene.endDirection)) {
            this.direction = globals.GAME.activeCinematic.activeScene.endDirection
        }   
        this.inScriptedAnimation    = false;  
        this.animationScript        = {}
    }
} 

module.exports = {
    MapSprite
} 