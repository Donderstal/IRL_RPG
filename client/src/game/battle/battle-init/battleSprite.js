const globals = require('../../../game-data/globals')
const battleButton = require('../battle-ui/battleButton').battleButton
const res   = require('../../../resources/resourceStrings')
const state = require('../../../game-data/state')
const canvasHelpers = require('../../../helpers/canvasHelpers')
let battleText;

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

        this.shout          = null;

        if ( this.isPlayer ) {
            this.initBattleUI( )            
        }
    }
    
    activateUI( ) {
        this.showUI = true;
    }

    deActivateUI( ) {
        this.showUI = false;
    }
    
    drawSprite( ) {
        this.frameCount++;
        if ( state.battleState.textContainer ) {
            battleText = state.battleState.textContainer
        }

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

        if ( this.showUI ) {
            this.buttonSprites.forEach((e) => {
                e.drawButton( )
            })            
        }    
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
        console.log(this.className)
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

    setButtonAsActive( buttonKey ) {
        this.hasActiveButton = true;

        let index = parseInt( buttonKey ) - 1
        let spriteAtIndex = this.buttonSprites[index]
        
        battleText.setText( spriteAtIndex.hint )
        spriteAtIndex.setActive( true )

        this.buttonSprites.forEach( (e) => {
            if ( e != spriteAtIndex ) {
                e.setActive( false )                
            }
        })
    }

    initBattleUI( ) {
        this.buttonSprites = []

        this.buttons.topCircle = { 
            'x': this.x - ( this.width * 0.66 ), 
            'y': this.y + ( this.height * 0.25 ), 
            'text' : res.BATTLE_BUTTON_1, 'toolTip': res.BATTLE_PUNCH_TOOLTIP,
            'hint': res.BATTLE_PUNCH_HINT
        }
        this.buttons.topMiddleCircle = { 
            'x': this.x,
            'y': this.y,
            'text' : res.BATTLE_BUTTON_2, 'toolTip': res.BATTLE_MOVES_TOOLTIP,
            'hint': res.BATTLE_MOVES_HINT
        }
        this.buttons.middleCircle = { 
            'x': this.x + ( this.width * 0.66 ),
            'y': this.y - ( this.height * 0.25 ), 
            'text' : res.BATTLE_BUTTON_3, 'toolTip': res.BATTLE_DEFEND_TOOLTIP,
            'hint': res.BATTLE_DEFEND_HINT
        }
        this.buttons.bottomMiddleCircle = { 
            'x': this.x + this.width + ( this.width * 0.33 ),
            'y': this.y - ( this.height * 0.25 ), 
            'text' : res.BATTLE_BUTTON_4, 'toolTip': res.BATTLE_ITEM_TOOLTIP,
            'hint': res.BATTLE_ITEM_HINT
        }
        this.buttons.bottomCircle = { 
            'x': this.x + ( this.width * 2 ),
            'y': this.y - ( this.height * 0.25 ), 
            'text' : res.BATTLE_BUTTON_5, 'toolTip': res.BATTLE_FLEE_TOOLTIP,
            'hint': res.BATTLE_FLEE_HINT
        }

        Object.keys(this.buttons).forEach( ( key ) => {
            this.buttonSprites.push(
                new battleButton( 
                    this.buttons[key].x, this.buttons[key].y, 
                    this.buttons[key].text, this.buttons[key].toolTip,
                    this.buttons[key].hint
                ) 
            ) 
        } )
    }

    initBattleMovesMenu( characterMoves ) {
        this.buttonSprites.forEach( (buttonSprite, index) => {
            buttonSprite.setToolTip( characterMoves[index].name )
            buttonSprite.hint = characterMoves[index].desc
            buttonSprite.isMenuButton = true;    
        })
    }
}

module.exports = {
    BattleSprite
}