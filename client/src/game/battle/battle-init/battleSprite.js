const globals = require('../../../game-data/globals')
const canvasHelpers = require('../../../helpers/canvasHelpers')
const I_Sprite = require('../../interfaces/I_Sprite').Sprite
const battleGlobals = require('../battleGlobals')
const state = require('../../../game-data/state')

class BattleSprite extends I_Sprite {
    constructor ( start, spriteSheetSrc, isPlayer = false ) {
        super ( start, spriteSheetSrc, "XY", "STRD", isPlayer ? battleGlobals.SHEET_ROW_BATTLE_RIGHT : battleGlobals.SHEET_ROW_BATTLE_LEFT ) 

        this.isPlayer       = isPlayer
        this.buttons        = {}
        this.buttonSprites  = []
        this.animating      = false;

        this.initialX       = this.x;
        this.initialY       = this.y;
        this.destinationX   = null;
        this.columnInSheet  = battleGlobals.B_SHEETPOS_IDLE;
        this.rowInSheet     = isPlayer ? 4 : 5

        this.initialRow     = this.rowInSheet;
        this.showUI         = false;
        this.hasActiveButton= false;
        this.moving         = false;
        this.active         = false;

        this.effectsActive   = false;
        this.effectPNG       = new Image( )
        this.effectLoaded    = false;
        this.effectPNG.src   = "/static/sprite-assets/fire_circle.png"
        this.effectPNG.onload = ( ) => {
            this.effectRow = 0
            this.effectCol = 0
            this.effectLoaded = true;
        }

        this.greenArrowPNG       = new Image( )
        this.greenArrowLoaded    = false;
        this.greenArrowPNG.src   = "/static/ui/green_arrow.png"
        this.greenArrowPNG.onload = ( ) => {
            this.greenArrowLoaded = true;
        }

        this.redArrowPNG       = new Image( )
        this.redArrowLoaded    = false;
        this.redArrowPNG.src   = "/static/ui/red_arrow.png"
        this.redArrowPNG.onload = ( ) => {
            this.redArrowLoaded = true;
        }

        this.shout          = null;
    }
    
    activateUI( ) {
        this.active = true;
    }

    deActivateUI( ) {
        this.active = false;
    }

    target( ) {
        this.targeted = true;
    }

    deTarget( ) {
        this.targeted = false;
    }

    draw( ) {
        this.frameCount++;

        if ( this.inMovementAnimation ) {
            this.goToDestination( );
        }
        else {
            this.doIdleAnimation( );
        }

        if  ( this.effectLoaded && this.effectsActive ) {
            this.drawEffect( )
        }

        this.drawSprite( );
        this.updateSpriteBorders( );

        if ( this.shout != null ) {
            this.drawShout( )
        }


        if ( this.active && this.greenArrowLoaded ) {
            this.drawGreenArrow( );
        }

        if ( this.targeted && this.redArrowLoaded ) {
            this.drawRedArrow( );
        }
    }
    
    doIdleAnimation( ) {
        if ( this.frameCount * .5 > globals.FRAME_LIMIT ) {
            if ( this.columnInSheet + 1 < 4 ) {
                this.columnInSheet++ ;
                this.frameCount = 0;
            }
            else {
                this.columnInSheet = 0;
                this.frameCount = 0;
            }
        } 
    }

    drawEffect( ) {
        canvasHelpers.drawFromImageToCanvas(
            "FRONT", this.effectPNG,
            this.effectCol * 128, this.effectRow * 128,
            128, 128,
            this.x - ( this.width / 2 ), this.y + ( this.height * 0.15 ), 
            this.width * 2, this.width * 2
        )

        if ( this.frameCount > globals.FRAME_LIMIT) {
            this.effectCol += 1
            if ( this.effectCol > 1 ) {
                this.effectCol = 0
                this.effectRow += 1
            }
            if ( this.effectRow >= 3 ) {
                this.effectCol = 0
                this.effectRow = 0
            }
        }
    }

    drawRedArrow( ) {
        canvasHelpers.drawFromImageToCanvas(
            "FRONT", this.targeted ? this.redArrowPNG : this.greenArrowPNG,
            0, 0,
            1200, 1200,
            this.x + this.width, this.y + (this.height / 2) - (globals.GRID_BLOCK_PX / 2), 
            globals.GRID_BLOCK_PX, globals.GRID_BLOCK_PX
        )
    }

    drawGreenArrow( ) {
        canvasHelpers.drawFromImageToCanvas(
            "FRONT", this.targeted ? this.redArrowPNG : this.greenArrowPNG,
            0, 0,
            860, 900,
            this.x, this.y - globals.GRID_BLOCK_PX, 
            globals.GRID_BLOCK_PX, globals.GRID_BLOCK_PX
        )
    }

    drawSprite( ) {
        canvasHelpers.drawFromImageToCanvas(
            "FRONT", this.sheet,
            ( globals.MAP_SPRITE_WIDTH_IN_SHEET * this.columnInSheet ), ( globals.MAP_SPRITE_HEIGHT_IN_SHEET * this.rowInSheet ),
            globals.MAP_SPRITE_WIDTH_IN_SHEET, globals.MAP_SPRITE_HEIGHT_IN_SHEET,
            this.x, this.y, 
            this.width, this.height
        )
    }

    drawShout( ) {
        canvasHelpers.setFont("LARGE")
        let shoutX = ( this.isPlayer ) ? this.x + this.width : this.x - canvasHelpers.getFrontCanvasContext().measureText(this.shout).width;
        canvasHelpers.writeTextLine( this.shout, shoutX, this.y + globals.LARGE_FONT_LINE_HEIGHT, globals.LARGE_FONT_SIZE )
    }

    setShout( shout, endOfBattle = false ) {
        this.shout = shout;
        let timer = ( endOfBattle ) ? 10000 : 1000

        setTimeout( ( ) => {
            this.shout = null
        }, timer )
    }

    setDestination( destination, endDirection ) {
        super.setDestination( destination, endDirection );
    }

    goToDestination( ) {
        if ( this.frameCount >= globals.FRAME_LIMIT) {
            this.frameCount = 0;
            this.columnInSheet++;
    
            if (this.columnInSheet >= 4) {
                this.columnInSheet = 0;
            }
        }

        super.goToDestination( true );
        this.rowInSheet = this.direction;
        if ( !this.inMovementAnimation ) {
            this.endAnimation( );
        }
    }

    animateAttack( sheetPositions = null ) {
        if ( sheetPositions == null ) {
            this.moving = true;
            this.columnInSheet = battleGlobals.B_SHEETPOS_ATTACK;
            setTimeout(() => {
                this.endAnimation( );
            }, 500 )                
        }
        else {
            this.moving = true;
            for ( var i = 0; i < sheetPositions.length; i++ ) {
                this.setAnimationPosition( i, sheetPositions )
            }
            setTimeout(() => {
                this.endAnimation( );
            }, ( 250 + ( 250 * sheetPositions.length ) ) )
        }
    }

    endAnimation( ) {
        this.columnInSheet = battleGlobals.B_SHEETPOS_IDLE;
        this.rowInSheet = this.initialRow;
        this.moving = false;

        if ( state.battleState.activeMove ) {
            state.battleState.activeMove.continueAnimationIfPossible( );
        }
    }

    setAnimationPosition( index, sheetPositions ) {
        setTimeout( () => {
            this.columnInSheet = sheetPositions[index].columnInSheet;
            this.rowInSheet = sheetPositions[index].rowInSheet;
        }, ( 250 ) + ( 250 * index ) )        
    }

    fadeOut( ) {
        this.columnInSheet = battleGlobals.B_SHEETPOS_NONE;
        setTimeout(() => {
            this.columnInSheet = battleGlobals.B_SHEETPOS_IDLE;
        }, 250 )        
        setTimeout(() => {
            this.columnInSheet = battleGlobals.B_SHEETPOS_NONE;
        }, 500 )     
        setTimeout(() => {
            this.columnInSheet = battleGlobals.B_SHEETPOS_IDLE;
        }, 750 ) 
        setTimeout(() => {
            this.columnInSheet = battleGlobals.B_SHEETPOS_NONE;
        }, 1000 )               
    }
}

module.exports = {
    BattleSprite
}