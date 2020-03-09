const globals = require('../../game-data/globals')
const battleButton = require('../battle-ui/battleButton').battleButton
const res   = require('../../resources/resourceStrings')
const state = require('../../game-data/state')

const I_Sprite = require('../interfaces/I_Sprite').Sprite

class BattleSprite extends I_Sprite {
    constructor ( start, spriteSheetSrc, spriteDirection = 0, isPlayer = false ) {
        let typeOfStart = "CELL"
        super ( start, spriteSheetSrc, typeOfStart, "LARG", spriteDirection ) 
               
        this.width   = globals.STRD_SPRITE_WIDTH  * 2;
        this.height  = globals.STRD_SPRITE_HEIGHT * 2;

        this.isPlayer= isPlayer
        this.buttons = {}
        this.buttonSprites = []

        if ( this.isPlayer ) {
            this.initBattleUI( )            
        }
    }
    
    drawSprite( ) {
        super.drawSprite( )

        if ( this.isPlayer ) {
            this.buttonSprites.forEach((e) => {
                e.drawButton( )
            })            
        }    
    }

    setButtonAsActive( buttonKey ) {
        let index = parseInt( buttonKey ) - 1
        this.buttonSprites.forEach( (e) => {
            e.setActive( true )
        })

        let spriteAtIndex = this.buttonSprites[index]
        state.battleState.textContainer.setText( spriteAtIndex.hint )
        spriteAtIndex.setActive( )
    }

    initBattleUI( ) {

        let topCircleY = this.y - globals.GRID_BLOCK_PX
        let bottomCircleY = this.bottom + globals.GRID_BLOCK_PX

        this.buttons.topCircle = { 
            'x': this.x + this.width, 
            'y': topCircleY, 
            'text' : res.BATTLE_PUNCH_BUTTON, 'toolTip': res.BATTLE_PUNCH_TOOLTIP,
            'hint': res.BATTLE_PUNCH_HINT
        }
        this.buttons.topMiddleCircle = { 
            'x': this.x + ( this.width * 1.5 ),
            'y': topCircleY + ( ( bottomCircleY - topCircleY ) * 0.25 ), 
            'text' : res.BATTLE_MOVES_BUTTON, 'toolTip': res.BATTLE_MOVES_TOOLTIP,
            'hint': res.BATTLE_MOVES_HINT
        }
        this.buttons.middleCircle = { 
            'x': this.x + ( this.width * 1.75 ), 
            'y': topCircleY + ( ( bottomCircleY - topCircleY ) * 0.5 ), 
            'text' : res.BATTLE_DEFEND_BUTTON, 'toolTip': res.BATTLE_DEFEND_TOOLTIP,
            'hint': res.BATTLE_DEFEND_HINT
        }
        this.buttons.bottomMiddleCircle = { 
            'x': this.x + ( this.width * 1.5 ), 
            'y': topCircleY + ( ( bottomCircleY - topCircleY ) * 0.75 ), 
            'text' : res.BATTLE_ITEM_BUTTON, 'toolTip': res.BATTLE_ITEM_TOOLTIP,
            'hint': res.BATTLE_ITEM_HINT
        }
        this.buttons.bottomCircle = { 
            'x': this.x + this.width,
            'y': bottomCircleY, 
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
        })
    }
}

module.exports = {
    BattleSprite
}