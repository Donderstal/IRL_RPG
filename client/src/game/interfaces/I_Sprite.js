const canvasHelpers = require('../../helpers/canvasHelpers')
const mapHelpers = require('../../helpers/mapHelpers')
const globals = require('../../game-data/globals')

class Sprite {

    constructor ( start, spriteSheetSrc, typeOfStart, spriteSize, spriteDirection = 0 ) {   
        if ( spriteSize == "STRD" ) {
            this.width   = globals.STRD_SPRITE_WIDTH;
            this.height  = globals.STRD_SPRITE_HEIGHT;            
        }
        else if ( spriteSize == "LARG" ) {
            this.width   = globals.BATTLE_SPRITE_WIDTH;
            this.height  = globals.BATTLE_SPRITE_HEIGHT;   
        }
        else {
            this.width  = spriteSize.width;
            this.height = spriteSize.height;
        }

        this.left, this.right, this.top, this.bottom;

        this.sheetPosition  = 0
        this.frameCount    = 0
        this.direction     = spriteDirection;
        this.sheetSrc      = spriteSheetSrc
        this.sheet         = new Image();

       ( typeOfStart === 'CELL' ) ? this.initSpriteFromCell( start ) : this.initSpriteFromXy( start )

        this.loaded = false
        this.getSpriteAndDrawWhenLoaded( )
    }

    initSpriteFromCell( start ) {
        this.x       = 0
        this.y       = 0

        this.row     = start.row
        this.col     = start.col  
        this.calcXyFromCell()  
    }

    initSpriteFromXy( start ) {
        this.x       = start.x
        this.y       = start.y

        this.row     = 0
        this.col     = 0  
    }

    getSpriteAndDrawWhenLoaded( ) {
        if ( !this.loaded ) {
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
        const xy = mapHelpers.getXYOfCell(this.row, this.col)
        this.x = ( xy.x - (this.width - globals.GRID_BLOCK_PX) )
        this.y = ( xy.y - (this.height - globals.GRID_BLOCK_PX) )

        this.updateSpriteBorders( )
    }

    drawSprite( ) {
        canvasHelpers.drawFromImageToCanvas(
            "FRONT",
            this.sheet,
            this.sheetPosition * globals.MAP_SPRITE_WIDTH_IN_SHEET, 
            this.direction * globals.MAP_SPRITE_HEIGHT_IN_SHEET, 
            globals.MAP_SPRITE_WIDTH_IN_SHEET, globals.MAP_SPRITE_HEIGHT_IN_SHEET,
            this.x, this.y, this.width, this.height
        )

        this.updateSpriteBorders( )
    }

    clearSprite( ) {
        canvasHelpers.clearCanvasRectangle(
            "FRONT",
            this.x, this.y, this.width, this.height
        )
    } 

    setDestination( destination, endDirection ) {
        this.destination = destination
        this.type = "idle"
        this.destination.endDirection = endDirection
        this.destination.horizontal = ( this.x > destination.right ) ? "FACING_LEFT" : "FACING_RIGHT";
        this.destination.vertical = ( this.y > destination.bottom ) ? "FACING_UP" : "FACING_DOWN";

        this.inMovementAnimation = true;
        state.activeCinematic.activeScene.walkingToDestination = true;
    }

    goToDestination( ) {
        const destIsLeftOfSprite = this.destination.left <= this.x;
        const destIsRightOfSprite = this.destination.right >= this.x + this.width;
        const destIsBelowSprite = this.destination.bottom >= this.y + this.height;
        const destIsAboveSprite = this.destination.top <= this.y;

        let moving = false;

        if ( destIsLeftOfSprite && this.destination.horizontal == "FACING_LEFT" ) {
            this.x -= globals.MOVEMENT_SPEED;
            moving = true;
            this.direction = globals["FACING_LEFT"]
        }
        else if ( destIsAboveSprite && this.destination.vertical == "FACING_UP" ) {
            this.y -= globals.MOVEMENT_SPEED;
            moving = true;
            this.direction = globals["FACING_UP"]
        }
        else if ( destIsRightOfSprite && this.destination.horizontal == "FACING_RIGHT" ) {
            this.x += globals.MOVEMENT_SPEED;
            moving = true;
            this.direction = globals["FACING_RIGHT"];
        }
        else if ( destIsBelowSprite && this.destination.vertical == "FACING_DOWN" ) {
            this.y += globals.MOVEMENT_SPEED  
            moving = true;
            this.direction = globals["FACING_DOWN"]
        }

        if ( !moving ) {
            this.direction = (this.destination.endDirection) ? this.destination.endDirection : this.direction;
            this.inMovementAnimation = false;
            this.destination = {}
        }

        this.countFrame( );
    }

    countFrame ( ) {
        this.frameCount++;  
    
        if ( this.frameCount >= globals.FRAME_LIMIT) {
            this.frameCount = 0;
            this.sheetPosition++;
    
            if (this.sheetPosition >= 4) {
                this.sheetPosition = 0;
            }
        }
    }
}

module.exports = {
    Sprite
}