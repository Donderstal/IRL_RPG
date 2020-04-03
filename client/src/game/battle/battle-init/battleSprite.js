const globals = require('../../../game-data/globals')
const battleButton = require('../battle-ui/battleButton').battleButton
const res   = require('../../../resources/resourceStrings')
const state = require('../../../game-data/state')
const canvasHelpers = require('../../../helpers/canvasHelpers')
let battleText;

const I_Sprite = require('../../interfaces/I_Sprite').Sprite

class BattleSprite extends I_Sprite {
    constructor ( start, spriteSheetSrc, spriteDirection = 0, isPlayer = false ) {
        super ( start, spriteSheetSrc, "XY", "LARG", spriteDirection ) 

        this.isPlayer       = isPlayer
        this.buttons        = {}
        this.buttonSprites  = []
        this.animating      = false;
        
        this.initialX       = this.x;
        this.destinationX   = null;
        this.initialDir     = this.direction;
        this.showUI         = false;
        this.hasActiveButton= false;

        this.moving         = false;
        this.returning      = false;

        if ( this.isPlayer ) {
            this.initBattleUI( )            
        }
    }
    
    activateUI( activate ) {
        this.showUI = activate
    }
    
    drawSprite( ) {
        if ( state.battleState.textContainer ) {
            battleText = state.battleState.textContainer
        }

        if ( this.moving ) {
            this.handleSpriteMovement()
        }

        let tilesheetX = ( this.isPlayer ) ? this.animLoop[this.direction] * 270 : this.animLoop[this.direction] * 270

        canvasHelpers.drawFromImageToCanvas(
            "FRONT",
            this.sheet,
            tilesheetX, 
            0, 
            270, 270,
            this.x, this.y, this.width, this.height
        )

        this.updateSpriteBorders( )

        if ( this.showUI ) {
            this.buttonSprites.forEach((e) => {
                e.drawButton( )
            })            
        }    
    }

    handleStaticAnimation( ) {
        this.frameCount++
        if ( this.frameCount >= ( globals.FRAME_LIMIT * 2 ) ) {
        
            this.frameCount = 0;
            if ( this.animIterator === 0 ) {
                this.animIterator = 1
            }
            else if ( this.animIterator === 1 ) {
                this.animIterator = 0
            }
        }    
    }

    moveSpriteToPlace( destinationX ) {
        this.moving = true;
        this.destinationX = destinationX;
    }

    handleSpriteMovement() {
        if ( this.x < ( this.destinationX - globals.MOVEMENT_SPEED ) && !this.returning ) {
            this.returning = true     
            const stringLiterals = { 
                name: state.battleState.player.character.name,
                target: state.battleState.opponent.character.name,
                damage: "0.111"
            }
            battleText.setText( res.getBattleResString( 'BATTLE_MOVE_HIT', stringLiterals ) )
        }
        else if ( this.x > this.destinationX && !this.returning ) {
            this.direction = globals['FACING_LEFT']
        }
        else if ( this.x > ( this.initialX - globals.MOVEMENT_SPEED ) && this.returning ) {
            this.x = this.initialX;
            this.direction = this.initialDir;
            this.returning = false;
            this.moving = false;
        }
        else if ( this.returning ) {
            this.direction = globals['FACING_RIGHT']
        }

        this.frameCount++;
   
        if ( this.direction == globals['FACING_LEFT'] ) {
            this.x -= globals.MOVEMENT_SPEED * 2  
        }

        if ( this.direction == globals['FACING_RIGHT'] ) {
            this.x += globals.MOVEMENT_SPEED * 2   
        }
    
        if ( this.frameCount >= globals.FRAME_LIMIT) {
            this.frameCount = 0;
            this.animIterator++;
    
            if (this.animIterator >= this.animLoop.length) {
                this.animIterator = 0;
            }
        }
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