const canvas = require('../../helpers/canvasHelpers')
const map = require('../../helpers/mapHelpers')
const globals = require('../../game-data/globals')
const battleButton = require('../battle-ui/battleButton').battleButton
const res   = require('../../resources/resourceStrings')
const state = require('../../game-data/state')

class battlePiece {

    constructor ( start, spriteSheetSrc, spriteDirection = 0, isPlayer = false ) {        
        this.width   = globals.STRD_SPRITE_WIDTH  * 2;
        this.height  = globals.STRD_SPRITE_HEIGHT * 2;

        this.isPlayer= isPlayer
        this.buttons = {}
        this.buttonSprites = []

        this.left    = 0
        this.right   = 0
        this.top     = 0
        this.bottom  = 0

        this.animLoop      = [ 0, 1, 2, 3]
        this.animIterator  = 0
        this.frameCount    = 0
        this.direction     = spriteDirection;
        this.sheetSrc      = spriteSheetSrc
        this.sheet         = new Image();

        this.x       = 0
        this.y       = 0

        this.row     = start.row
        this.col     = start.col  
        this.calcXyFromCell()          

        this.loaded = false
        this.getSpriteAndDrawWhenLoaded( )
    }

    getSpriteAndDrawWhenLoaded( ) {
        if ( !this.loaded ) {
            if ( this.isPlayer ) {
                this.initBattleUI( )            
            }            
            this.sheet.onload = () => {
                this.loaded = true
                this.drawSprite()
            }

            this.sheet.src = this.sheetSrc            
        }
    }

    updateSpriteBorders( ) {
        this.left   = this.x,
        this.right  = this.x + this.width,
        this.top    = this.y,
        this.bottom = this.y + this.height
    }

    calcXyFromCell( ) {
        const xy = map.getXYOfCell(this.row, this.col)
        
        this.x = ( xy.x - (this.width - globals.GRID_BLOCK_PX) )
        this.y = ( xy.y - (this.height - globals.GRID_BLOCK_PX) )

        this.updateSpriteBorders( )
    }
    
    drawSprite( ) {
        canvas.drawFromImageToCanvas(
            "FRONT",
            this.sheet,
            this.animLoop[this.animIterator] * 37, 
            this.direction * 37, 
            37, 37,
            this.x, this.y, this.width, this.height
        )

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

    clearSprite( ) {
        canvas.clearCanvasRectangle(
            "FRONT",
            this.x, this.y, this.width, this.height
        )
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
    battlePiece
}