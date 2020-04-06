const globals = require('../../../game-data/globals')
const battleButton = require('../battle-ui/battleButton').battleButton
const res   = require('../../../resources/resourceStrings')
const state = require('../../../game-data/state')
const canvasHelpers = require('../../../helpers/canvasHelpers')
let battleText;

const I_Sprite = require('../../interfaces/I_Sprite').Sprite

class BattleSprite extends I_Sprite {
    constructor ( start, spriteSheetSrc, isPlayer = false ) {
        super ( start, spriteSheetSrc, "XY", "LARG", 0 ) 

        this.isPlayer       = isPlayer
        this.buttons        = {}
        this.buttonSprites  = []
        this.animating      = false;
        
        this.initialX       = this.x;
        this.destinationX   = null;
        this.position       = globals.B_SHEETPOS_IDLE;
        this.initialDir     = this.position;
        this.showUI         = false;
        this.hasActiveButton= false;
        this.moving         = false;

        this.shout          = null;

        if ( this.isPlayer ) {
            this.initBattleUI( )            
        }
    }
    
    activateUI( activate ) {
        this.showUI = activate
    }
    
    drawSprite( ) {
        this.frameCount++;
        if ( state.battleState.textContainer ) {
            battleText = state.battleState.textContainer
        }

        if ( this.frameCount > ( globals.FRAME_LIMIT * 3 ) ) {
            this.position = ( this.position == globals.B_SHEETPOS_IDLE ) ? globals.B_SHEETPOS_IDLE2 : globals.B_SHEETPOS_IDLE
            this.frameCount = 0;
        }

        let tilesheetX = this.animLoop[this.position] * 285

        canvasHelpers.drawFromImageToCanvas(
            "FRONT",
            this.sheet,
            tilesheetX, 0, 
            285, 285,
            this.x, this.y, this.width, this.height
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

    animateAttack( type ) {
        if ( type == "PUNCH" ) {
            this.moving = true;
            this.position = globals.B_SHEETPOS_ATTACK;
            setTimeout(() => {
                this.position = globals.B_SHEETPOS_IDLE;
            }, 500 )                
        }
    }

    animateHit( ) {
        this.position = globals.B_SHEETPOS_NONE;
        setTimeout(() => {
            this.position = globals.B_SHEETPOS_IDLE;
        }, 175 )        
        setTimeout(() => {
            this.position = globals.B_SHEETPOS_NONE;
        }, 350 )     
        setTimeout(() => {
            this.position = globals.B_SHEETPOS_IDLE;
        }, 500 )             
    }

    fadeOut( ) {
        this.position = globals.B_SHEETPOS_NONE;
        setTimeout(() => {
            this.position = globals.B_SHEETPOS_IDLE;
        }, 250 )        
        setTimeout(() => {
            this.position = globals.B_SHEETPOS_NONE;
        }, 500 )     
        setTimeout(() => {
            this.position = globals.B_SHEETPOS_IDLE;
        }, 750 ) 
        setTimeout(() => {
            this.position = globals.B_SHEETPOS_NONE;
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

        this.buttons.topCircle = { 
            'x': this.x - ( this.width * 0.25 ), 
            'y': this.y, 
            'text' : res.BATTLE_PUNCH_BUTTON, 'toolTip': res.BATTLE_PUNCH_TOOLTIP,
            'hint': res.BATTLE_PUNCH_HINT
        }
        this.buttons.topMiddleCircle = { 
            'x': this.x - ( this.width * 0.375 ),
            'y': this.y + ( this.height * 0.25 ), 
            'text' : res.BATTLE_MOVES_BUTTON, 'toolTip': res.BATTLE_MOVES_TOOLTIP,
            'hint': res.BATTLE_MOVES_HINT
        }
        this.buttons.middleCircle = { 
            'x': this.x - ( this.width * 0.5 ),
            'y': this.y + ( this.height * 0.5 ), 
            'text' : res.BATTLE_DEFEND_BUTTON, 'toolTip': res.BATTLE_DEFEND_TOOLTIP,
            'hint': res.BATTLE_DEFEND_HINT
        }
        this.buttons.bottomMiddleCircle = { 
            'x': this.x - ( this.width * 0.375 ),
            'y': this.y + ( this.height * 0.75 ), 
            'text' : res.BATTLE_ITEM_BUTTON, 'toolTip': res.BATTLE_ITEM_TOOLTIP,
            'hint': res.BATTLE_ITEM_HINT
        }
        this.buttons.bottomCircle = { 
            'x': this.x - ( this.width * 0.25 ),
            'y': this.y + this.height, 
            'text' : res.BATTLE_FLEE_BUTTON, 'toolTip': res.BATTLE_FLEE_TOOLTIP,
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
}

module.exports = {
    BattleSprite
}