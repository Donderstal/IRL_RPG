const canvasHelpers = require('../../helpers/canvasHelpers')
const mapHelpers = require('../../helpers/mapHelpers')
const globals = require('../../game-data/globals')
const state = require('../../game-data/state')

class I_Hitbox {
    constructor( x, y, radius ) {
        this.x          = x;
        this.y          = y;
        this.radius     = radius;
        this.innerRadius= radius / 2 
        this.collision  = false;
        this.top        = ( ) => { return this.y - this.radius }
        this.left       = ( ) => { return this.x - this.radius }
        this.right      = ( ) => { return this.x + this.radius }
        this.bottom     = ( ) => { return this.y + this.radius }
    }

    updateXy(newX, newY ) {
        if ( this.x != newX || this.y != newY  ) {
        this.x = newX;
        this.y = newY;            
        }
    }

    draw( x, y ) {
        this.updateXy( x, y )
        this.checkforCollision( )
        let frontCtx = canvasHelpers.getFrontCanvasContext( );
        frontCtx.beginPath( );
        frontCtx.arc( this.x, this.y, this.radius, 0, 2 * Math.PI );
        frontCtx.arc( this.x, this.y, this.innerRadius, 0, 2 * Math.PI );
        frontCtx.stroke( );
    }

    checkforCollision( ) {
        let playerHitBox = state.playerCharacter.sprite.hitbox;
        if ( !Object.is(this, playerHitBox) ) {
            let playerDirection = state.playerCharacter.sprite.direction
            if ( this.playerIsInVerticalRange( playerHitBox ) ) {
                if ( this.upFacingPlayerIsInRange( playerHitBox, playerDirection ) ) {
                    console.log('Up facing in range!')
                }
                else if ( this.downFacingPlayerIsInRange( playerHitBox, playerDirection ) ) {
                    console.log('Down facing in range!')
                }
            }
            else if ( this.playerIsInHorizontalRange( playerHitBox ) ) {
                if ( this.leftFacingPlayerIsInRange( playerHitBox, playerDirection ) ) {
                    console.log('Left facing in range!')
                }
                else if ( this.rightFacingPlayerIsInRange( playerHitBox, playerDirection ) ) {
                    console.log('Right facing in range!')
                }
            }
        }
    }

    playerIsInVerticalRange( playerHitBox ) {        
        return ( playerHitBox.x - playerHitBox.innerRadius ) > this.left() && ( playerHitBox.x + playerHitBox.innerRadius ) < this.right()
    }

    playerIsInHorizontalRange( playerHitBox ) {       
        return ( playerHitBox.y - playerHitBox.innerRadius ) > this.top() && ( playerHitBox.y + playerHitBox.innerRadius ) < this.bottom()
    }

    upFacingPlayerIsInRange( playerHitBox, playerDirection ) {
        return playerDirection == globals.FACING_UP && ( ( playerHitBox.y - playerHitBox.innerRadius ) < this.bottom( ) )
    }

    downFacingPlayerIsInRange( playerHitBox, playerDirection ) {
        return playerDirection == globals.FACING_DOWN  && ( ( playerHitBox.y + playerHitBox.innerRadius ) < this.top( ) ) 
    }

    leftFacingPlayerIsInRange( playerHitBox, playerDirection ) {
        return playerDirection == globals.FACING_LEFT && ( ( playerHitBox.x - playerHitBox.innerRadius ) < this.right( ) )
    }

    rightFacingPlayerIsInRange( playerHitBox, playerDirection ){
        return playerDirection == globals.FACING_RIGHT && ( ( playerHitBox.x + playerHitBox.innerRadius ) > this.left( ) )
    }

    dynamicRange(  ) {
        return
    }
}

module.exports = {
    I_Hitbox
}