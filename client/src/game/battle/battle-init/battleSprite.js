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
        this.rowInSheet     = isPlayer ? 5 : 4

        this.initialRow     = this.rowInSheet;
        this.showUI         = false;
        this.hasActiveButton= false;
        this.moving         = false;
        this.active         = false;

        this.arrowPNG       = new Image( )
        this.arrowLoaded    = false;
        this.arrowPNG.src   = "/static/ui/green_arrow.png"
        this.arrowPNG.onload = ( ) => {
            this.arrowLoaded = true;
        }

        this.shout          = null;
    }
    
    activateUI( ) {
        this.active         = true;
    }

    deActivateUI( ) {
        this.active         = false;
    }
    
    drawSprite( ) {
        this.frameCount++;
        if ( this.frameCount > globals.FRAME_LIMIT ) {
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

        if ( this.active && this.arrowLoaded ) {
            console.log('drawing arrow...')
            canvasHelpers.drawFromImageToCanvas(
                "FRONT", this.arrowPNG,
                0, 0,
                860, 900,
                this.x, this.y - globals.GRID_BLOCK_PX, 
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
        canvasHelpers.writeTextLine( this.shout, shoutX, this.y, globals.LARGE_FONT_SIZE )
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
            }, ( 250 + ( 250 * sheetPositions.length ) ) )
        }
    }

    setAnimationPosition( index, sheetPositions ) {
        console.log(sheetPositions[index])
        setTimeout( () => {
            this.columnInSheet = sheetPositions[index].columnInSheet;
            this.rowInSheet = sheetPositions[index].rowInSheet;
        }, ( 250 ) + ( 250 * index ) )        
    }

    animateHit( ) {
        this.columnInSheet = globals.B_SHEETPOS_NONE;
        setTimeout(() => {
            this.columnInSheet = globals.B_SHEETPOS_IDLE;
        }, 175 )        
        setTimeout(() => {
            this.columnInSheet = globals.B_SHEETPOS_NONE;
        }, 350 )     
        setTimeout(() => {
            this.columnInSheet = globals.B_SHEETPOS_IDLE;
        }, 500 )             
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