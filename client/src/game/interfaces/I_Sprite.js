const canvasHelpers = require('../../helpers/canvasHelpers')
const pathFinder = require('../../helpers/pathfindingHelpers')
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
        this.centerX = () => { return this.x + ( this.width / 2 ) };
        this.baseY = () => { return ( this.y + this.height ) - ( globals.GRID_BLOCK_PX / 2 ) };

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

    get destinationIsLeft( ) { 
        return this.isCar 
        ? this.destinationTile.x - this.width < this.left 
        : this.destinationTile.x <= this.left && this.destinationTile.direction == "FACING_LEFT";
    }
    get destinationIsRight( ) { 
        return this.isCar 
        ? this.destinationTile.x + GRID_BLOCK_PX + this.width > this.right
        : this.destinationTile.x + GRID_BLOCK_PX > this.right && this.destinationTile.direction == "FACING_RIGHT";
    }
    get destinationIsUp( ) { 
        return this.isCar 
        ? this.destinationTile.y - this.height < this.top 
        : this.destinationTile.y <= this.top + ( GRID_BLOCK_PX / 2 ) && this.destinationTile.direction == "FACING_UP";
    }    
    get destinationIsDown( ) { 
        return this.isCar 
        ? this.destinationTile.y + GRID_BLOCK_PX + this.height > this.bottom 
        : this.destinationTile.y + GRID_BLOCK_PX > this.bottom && this.destinationTile.direction == "FACING_DOWN";
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
     * @function goToDestination decide where to go based on sprites position compared to destination prop
     * @param {boolean} isBattle determines how y axis anims should be handled
     * call this.goEndToAnimation() if sprite has reached destination
     * call this.countFrame()
     */
    goToDestination( isBattle = false ) {
        this.moving = false;

        if ( this.destinationIsLeft  ) {
            this.x -= MOVEMENT_SPEED;
            this.moving = true;
            this.direction = globals["FACING_LEFT"]
        }
        else if ( this.destinationIsRight ) {
            this.x += MOVEMENT_SPEED;
            this.moving = true;
            this.direction = globals["FACING_RIGHT"];
        }

        if ( isBattle ) {
            if ( this.destinationIsUp ) {
                this.y -= MOVEMENT_SPEED;
            }
            else if ( this.destinationIsDown ) {
                this.y += MOVEMENT_SPEED  
            }
        }
        else if ( !this.moving ) {
            if ( this.destinationIsUp ) {
                this.y -= MOVEMENT_SPEED;
                this.moving = true;
                this.direction = globals["FACING_UP"]
            }
            else if ( this.destinationIsDown ) {
                this.y += MOVEMENT_SPEED  
                this.moving = true;
                this.direction = globals["FACING_DOWN"]
            }            
        }

        if ( !this.moving ) {
            if ( this.activeDestinationIndex + 1 < this.destinationTiles.length ) {
                this.activeDestinationIndex += 1; 
                this.destinationTile = this.destinationTiles[this.activeDestinationIndex].tile;    
            }
            else {
                this.stopMovement( );
                this.unsetDestination( );                
            }
        }
    }

    /**
     * @function initMovement set speed and direction of movement
     * @param {string} direction direction string to use in globals
     * @param {integer} speed optional speed param
     */
    initMovement( direction, speed = null ) {
        this.movingToDestination = true;
        this.movementSpeed = speed == null ? MOVEMENT_SPEED * ( Math.random( ) + 1 ) : speed;
    }

    /**
     * @function stopMovement unset movingToDestination
     */
    stopMovement( ) {
        this.movingToDestination = false;
    }

    /**
     * @function setDestination set destination to class. determine destinatonTile
     * @param {object} destination information about destination's grid location
     */
    setDestination( destination ) {
        this.destinationTiles = [];
        this.activeDestinationIndex;
        this.destination = destination;

        if ( !this.isCar ) {
            this.setDestinationList( )
        }
        else {
            this.destinationTile = globals.GAME.getTileOnCanvasAtCell( "FRONT", this.destination.col, this.destination.row );
        }
    }

    setDestinationList( ) {
        const lastTile = globals.GAME.getTileOnCanvasAtCell( "FRONT", this.col, this.row );
        const destination = globals.GAME.getTileOnCanvasAtCell( "FRONT", this.destination.col, this.destination.row )
        const pathIndexes = pathFinder.determineShortestPath( lastTile, destination, globals.GAME.BACK.grid ) 

        if ( !pathIndexes ) {
            this.unsetDestination( );
            return;
        }

        let lastIndex = lastTile.index;

        pathIndexes.forEach( ( pathIndex ) => {
            let tile = globals.GAME.getTileOnCanvasAtIndex( "BACK", pathIndex )
            tile.direction = pathIndex < lastIndex 
            ? pathIndex == lastIndex - 1 ? "FACING_LEFT" : "FACING_UP" 
            : pathIndex == lastIndex + 1 ? "FACING_RIGHT" : "FACING_DOWN" ;
            this.destinationTiles.push( { 
                tile,
            } )
            lastIndex = pathIndex;
        })

        this.activeDestinationIndex = 0;
        this.destinationTile = this.destinationTiles[this.activeDestinationIndex].tile;           
    }

    /**
     * @function unsetDestination set destination and destinationTile props to false
     */
    unsetDestination( ) {
        this.destination = false;
        this.destinationTile = false;
        this.destinationTiles = [];
        this.activeDestinationIndex = 0;
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