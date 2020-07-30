const globals = require('../../../game-data/globals')
const state = require('../../../game-data/state')
const canvasHelpers = require('../../../helpers/canvasHelpers')
const I_Sprite = require('../../interfaces/I_Sprite').Sprite

class BattleSprite extends I_Sprite {
    constructor ( start, spriteSheetSrc, isPlayer = false ) {
        super ( start, spriteSheetSrc, "XY", "STRD", isPlayer ? globals.SHEET_ROW_BATTLE_RIGHT : globals.SHEET_ROW_BATTLE_LEFT ) 

        this.isPlayer       = isPlayer
        this.buttons        = {}
        this.buttonSprites  = []
        this.animating      = false;

        this.initialX       = this.x;
        this.destinationX   = null;
        this.columnInSheet  = globals.B_SHEETPOS_IDLE;
        this.rowInSheet     = isPlayer ? 4 : 5

        this.initialRow     = this.rowInSheet;
        this.showUI         = false;
        this.hasActiveButton= false;
        this.moving         = false;
        this.active         = false;

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
        this.active         = true;
    }

    deActivateUI( ) {
        this.active         = false;
    }

    target( ) {
        this.targeted = true;
    }

    deTarget( ) {
        this.targeted = false;
    }
    
    drawSprite( ) {
        this.frameCount++;
        if ( this.frameCount * .5 > globals.FRAME_LIMIT && !this.moving ) {
            if ( this.columnInSheet + 1 < 4 ) {
                this.columnInSheet++ ;
                this.frameCount = 0;
            }
            else {
                this.columnInSheet = 0;
                this.frameCount = 0;
            }
        }

        canvasHelpers.drawFromImageToCanvas(
            "FRONT", this.sheet,
            ( globals.MAP_SPRITE_WIDTH_IN_SHEET * this.columnInSheet ), ( globals.MAP_SPRITE_HEIGHT_IN_SHEET * this.rowInSheet ),
            globals.MAP_SPRITE_WIDTH_IN_SHEET, globals.MAP_SPRITE_HEIGHT_IN_SHEET,
            this.x, this.y, 
            this.width, this.height
        )

        this.updateSpriteBorders( )

        if ( this.shout != null ) {
            this.drawShout( )
        }

        if ( this.active && this.greenArrowLoaded ) {
            canvasHelpers.drawFromImageToCanvas(
                "FRONT", this.targeted ? this.redArrowPNG : this.greenArrowPNG,
                0, 0,
                860, 900,
                this.x, this.y - globals.GRID_BLOCK_PX, 
                globals.GRID_BLOCK_PX, globals.GRID_BLOCK_PX
            )
        }

        if ( this.targeted && this.redArrowLoaded ) {
            canvasHelpers.drawFromImageToCanvas(
                "FRONT", this.targeted ? this.redArrowPNG : this.greenArrowPNG,
                0, 0,
                1200, 1200,
                this.x + this.width, this.y + (this.height / 2) - (globals.GRID_BLOCK_PX / 2), 
                globals.GRID_BLOCK_PX, globals.GRID_BLOCK_PX
            )
        }
    }

    drawArrow( ) {
        if ( !this.arrowLoaded ) {
            this.arrowLoaded = true;
        }
        canvasHelpers.drawFromImageToCanvas(
            "FRONT", this.arrowPNG.src,
            0, 0,
            860, 900,
            this.x + globals.GRID_BLOCK_PX, this.y + globals.GRID_BLOCK_PX, 
            globals.GRID_BLOCK_PX, globals.GRID_BLOCK_PX
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

    animateAttack( sheetPositions = null ) {
        if ( sheetPositions == null ) {
            this.moving = true;
            this.columnInSheet = globals.B_SHEETPOS_ATTACK;
            setTimeout(() => {
                this.columnInSheet = globals.B_SHEETPOS_IDLE;
                this.moving = false;
            }, 500 )                
        }
        else {
            this.moving = true;
            for ( var i = 0; i < sheetPositions.length; i++ ) {
                this.setAnimationPosition( i, sheetPositions )
            }
            setTimeout(() => {
                this.columnInSheet = globals.B_SHEETPOS_IDLE;
                this.rowInSheet = this.initialRow;
                this.moving = false;
            }, ( 250 + ( 250 * sheetPositions.length ) ) )
        }
    }

    setAnimationPosition( index, sheetPositions ) {
        setTimeout( () => {
            this.columnInSheet = sheetPositions[index].columnInSheet;
            this.rowInSheet = sheetPositions[index].rowInSheet;
        }, ( 250 ) + ( 250 * index ) )        
    }

    animateHit( ) {
        this.columnInSheet = globals.B_SHEETPOS_NONE;
        setTimeout(() => {
            this.columnInSheet = globals.B_SHEETPOS_IDLE;
        }, 250 )        
        setTimeout(() => {
            this.columnInSheet = globals.B_SHEETPOS_NONE;
        }, 500 )     
        setTimeout(() => {
            this.columnInSheet = globals.B_SHEETPOS_IDLE;
        }, 750 ) 
        setTimeout(() => {
            this.columnInSheet = globals.B_SHEETPOS_NONE;
        }, 1000 ) 
        setTimeout(() => {
            this.columnInSheet = globals.B_SHEETPOS_IDLE;
        }, 1250 )             
    }

    fadeOut( ) {
        this.columnInSheet = globals.B_SHEETPOS_NONE;
        setTimeout(() => {
            this.columnInSheet = globals.B_SHEETPOS_IDLE;
        }, 250 )        
        setTimeout(() => {
            this.columnInSheet = globals.B_SHEETPOS_NONE;
        }, 500 )     
        setTimeout(() => {
            this.columnInSheet = globals.B_SHEETPOS_IDLE;
        }, 750 ) 
        setTimeout(() => {
            this.columnInSheet = globals.B_SHEETPOS_NONE;
        }, 1000 )               
    }
}

module.exports = {
    BattleSprite
}