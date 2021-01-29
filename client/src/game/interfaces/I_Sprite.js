const canvasHelpers = require('../../helpers/canvasHelpers')
const globals = require('../../game-data/globals')
const { 
    STRD_SPRITE_WIDTH, STRD_SPRITE_HEIGHT, BATTLE_SPRITE_WIDTH, BATTLE_SPRITE_HEIGHT,
    GRID_BLOCK_PX, MAP_SPRITE_WIDTH_IN_SHEET, MAP_SPRITE_HEIGHT_IN_SHEET,
    MOVEMENT_SPEED, FRAME_LIMIT
} = require( '../../game-data/globals' )


class Sprite {
    constructor ( tile, spriteSize, src, isCar = false ) {   
        if ( spriteSize == "STRD" ) {
            this.width   = STRD_SPRITE_WIDTH;
            this.height  = STRD_SPRITE_HEIGHT;            
        }
        else if ( spriteSize == "LARG" ) {
            this.width   = BATTLE_SPRITE_WIDTH;
            this.height  = BATTLE_SPRITE_HEIGHT;   
        }
        else {
            this.width  = spriteSize.width;
            this.height = spriteSize.height;
        }

        this.left, this.right, this.top, this.bottom;

        this.sheetFrameLimit= 4
        this.sheetPosition  = 0
        this.frameCount     = 0
        this.direction      = tile.spriteData.direction ? globals[tile.spriteData.direction] : 0;
        this.sheetSrc       = src
        this.sheet          = new Image();
        this.moving         = false;
        this.deleted        = false;
        this.isCar          = isCar

        this.setSpriteToGrid( tile, isCar )

        this.loaded = false
        this.getSpriteAndDrawWhenLoaded( )
    }

     /**
     * @function setSpriteToGrid determine a sprite's XY on the grid
     * @param {I_TIle} tile instance of I_Tile Class
     * @param {boolean} isCar check if the sprite is a car
     */
    setSpriteToGrid( tile, isCar ) {
        this.row = tile.row;
        this.col = tile.col;
        this.x = tile.x;
        
        this.y = ( isCar && this.direction == globals["FACING_UP"] ) ? tile.y + GRID_BLOCK_PX + this.height : tile.y - ( this.height - GRID_BLOCK_PX )
    }

     /**
     * @function setNewLocationInGrid fetch sprite starting tile and set it to the grid
     * @param cell row / column pair
     * @param {integer} cell.col integer representing a column
     * @param {integer} cell.row integer representing a row
     * @param {string} direction check if the sprite is a car
     */
    setNewLocationInGrid( cell, direction ) {
        let newTile = globals.GAME.getTileOnCanvasAtCell( 'FRONT', cell.col, cell.row )
        this.direction = globals[direction] != undefined ? globals[direction] : this.direction;
        newTile.setSpriteData( 'character', null )
        newTile.spriteId = "PLAYER"
        this.setSpriteToGrid( newTile );
    }

     /**
     * @function getSpriteAndDrawWhenLoaded set handler to sheet and draw on load
     */
    getSpriteAndDrawWhenLoaded( ) {
        if ( !this.loaded ) {
            this.sheet.onload = () => {
                this.loaded = true
                this.drawSprite()
            }

            this.sheet.src = this.sheetSrc            
        }
    }

     /**
     * @function updateSpriteBorders update sprite borders based on current x & y
     */
    updateSpriteBorders( ) {
        this.left   = this.x,
        this.right  = this.x + this.width,
        this.top    = this.y,
        this.bottom = this.y + this.height
    }

     /**
     * @function drawSprite draw sprite and call this.updateSpriteBorders() after
     */
    drawSprite( ) {
        canvasHelpers.drawFromImageToCanvas(
            "FRONT",
            this.sheet,
            this.sheetPosition * MAP_SPRITE_WIDTH_IN_SHEET, 
            this.direction * MAP_SPRITE_HEIGHT_IN_SHEET, 
            MAP_SPRITE_WIDTH_IN_SHEET, MAP_SPRITE_HEIGHT_IN_SHEET,
            this.x, this.y, this.width, this.height
        )

        this.updateSpriteBorders( )
    }
     /**
     * @function setDestination set destination data as prop to Sprite
     * @param destination object containing destination cell
     * @param {string} endDirection direction sprite should face at destination
     */
    setDestination( destination, endDirection ) {
        this.destination = destination
        this.type = "idle"
        this.destination.endDirection = endDirection
        this.destination.horizontal = ( this.x > destination.right ) ? "FACING_LEFT" : "FACING_RIGHT";
        this.destination.vertical = ( this.y > destination.bottom ) ? "FACING_UP" : "FACING_DOWN";

        this.inMovementAnimation = true;
    }

    /**
     * @function goToDestination decide where to go based on sprites position compared to destination prop
     * @param {boolean} isBattle determines how y axis anims should be handled
     * call this.goEndToAnimation() if sprite has reached destination
     * call this.countFrame()
     */
    goToDestination( isBattle = false ) {
        const destIsLeftOfSprite = this.destination.left < this.left;
        const destIsRightOfSprite = this.destination.right > this.right;
        const destIsAboveSprite = this.destination.top < this.top;
        const destIsBelowSprite = this.destination.bottom > this.bottom;

        let hasMoved = false;
        this.moving = false;

        if ( destIsLeftOfSprite && this.destination.horizontal == "FACING_LEFT" ) {
            this.x -= MOVEMENT_SPEED;
            this.moving = true;
            hasMoved = true
            this.direction = globals["FACING_LEFT"]
        }
        else if ( destIsRightOfSprite && this.destination.horizontal == "FACING_RIGHT" ) {
            this.x += MOVEMENT_SPEED;
            this.moving = true;
            hasMoved = true
            this.direction = globals["FACING_RIGHT"];
        }

        if ( isBattle ) {
            if ( destIsAboveSprite && this.destination.vertical == "FACING_UP" ) {
                this.y -= MOVEMENT_SPEED;
            }
            else if ( destIsBelowSprite && this.destination.vertical == "FACING_DOWN" ) {
                this.y += MOVEMENT_SPEED  
            }
        }
        else if ( !hasMoved ) {
            if ( destIsAboveSprite && this.destination.vertical == "FACING_UP" ) {
                this.y -= MOVEMENT_SPEED;
                this.moving = true;
                this.direction = globals["FACING_UP"]
            }
            else if ( destIsBelowSprite && this.destination.vertical == "FACING_DOWN" ) {
                this.y += MOVEMENT_SPEED  
                this.moving = true;
                this.direction = globals["FACING_DOWN"]
            }            
        }

        if ( !this.moving ) {
            this.endGoToAnimation( );
        }

        this.countFrame( );
    }

    /**
     * @function endGoToAnimation unset this.destination, this.inMovementAnimation
     */
    endGoToAnimation( ) {
        this.direction = (this.destination.endDirection) ? this.destination.endDirection : this.direction;
        this.inMovementAnimation = false;
        this.destination = {}
    }

    /**
     * @function countFrame increments this.frameCount. Change this.sheetPosition if over FRAME_LIMIT
     */
    countFrame ( ) {
        this.frameCount++;  
    
        if ( this.frameCount >= FRAME_LIMIT) {
            this.frameCount = 0;
            this.sheetPosition++;
    
            if (this.sheetPosition >= this.sheetFrameLimit) {
                this.sheetPosition = 0;
            }
        }
    }
}

module.exports = {
    Sprite
}