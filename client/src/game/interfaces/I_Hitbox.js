const canvasHelpers = require('../../helpers/canvasHelpers')
const globals = require('../../game-data/globals')
const state = require('../../game-data/state')

class I_Hitbox {
    constructor( x, y, radius ) {
        this.x              = x;
        this.y              = y;
        this.radius         = radius;
        this.innerRadius    = radius / 2 
        this.collision      = false;
        this.top            = ( ) => { return this.y - this.radius }
        this.left           = ( ) => { return this.x - this.radius }
        this.right          = ( ) => { return this.x + this.radius }
        this.bottom         = ( ) => { return this.y + this.radius }
        this.innerTop       = ( ) => { return this.y - this.innerRadius }
        this.innerLeft      = ( ) => { return this.x - this.innerRadius }
        this.innerRight     = ( ) => { return this.x + this.innerRadius }
        this.innerBottom    = ( ) => { return this.y + this.innerRadius }
    }

    updateXy( newX, newY ) {
        if ( this.x != newX || this.y != newY  ) {
            this.x = newX;
            this.y = newY;            
        }
    }

    draw( x, y ) {
        this.updateXy( x, y )
        let frontCtx = canvasHelpers.getFrontCanvasContext( );
        frontCtx.beginPath( );
        frontCtx.arc( this.x, this.y, this.radius, 0, 2 * Math.PI );
        frontCtx.arc( this.x, this.y, this.innerRadius, 0, 2 * Math.PI );
        frontCtx.stroke( );
    }

    checkForActionRange( ) {
        let playerHitBox = state.playerCharacter.sprite.hitbox;
        if ( !Object.is(this, playerHitBox) ) {
            let playerDirection = state.playerCharacter.sprite.direction
            if ( this.playerIsInVerticalActionRange( playerHitBox ) ) {
                if ( this.upFacingPlayerIsInActionRadius( playerHitBox, playerDirection ) ) {
                    return true;
                }
                else if ( this.downFacingPlayerIsInActionRadius( playerHitBox, playerDirection ) ) {
                    return true;
                }
            }
            else if ( this.playerIsInHorizontalActionRange( playerHitBox ) ) {
                if ( this.leftFacingPlayerIsInActionRadius( playerHitBox, playerDirection ) ) {
                    return true;
                }
                else if ( this.rightFacingPlayerIsInActionRadius( playerHitBox, playerDirection ) ) {
                    return true;
                }
            }
            return false;
        }
    }

    checkForBlockedRange( ) {
        let playerHitBox = state.playerCharacter.sprite.hitbox;
        if ( !Object.is(this, playerHitBox) ) {
            let playerDirection = state.playerCharacter.sprite.direction
            if ( this.playerIsInVerticalBlockedRange( playerHitBox ) ) {
                if ( this.upFacingPlayerIsInBlockedRadius( playerHitBox, playerDirection ) ) {
                    return true;
                }
                else if ( this.downFacingPlayerIsInBlockedRadius( playerHitBox, playerDirection ) ) {
                    return true;
                }
            }
            else if ( this.playerIsInHorizontalBlockedRange( playerHitBox ) ) {
                if ( this.leftFacingPlayerIsInBlockedRadius( playerHitBox, playerDirection ) ) {
                    return true;
                }
                else if ( this.rightFacingPlayerIsInBlockedRadius( playerHitBox, playerDirection ) ) {
                    return true;
                }
            }
            return false;
        }
    }

    //////////////
    playerIsInVerticalBlockedRange( playerHitBox ) {        
        return ( playerHitBox.x - playerHitBox.innerRadius ) > ( this.left( ) - this.innerRadius ) 
        && ( playerHitBox.x + playerHitBox.innerRadius ) < ( this.right( ) + this.innerRadius )
    }

    playerIsInHorizontalBlockedRange( playerHitBox ) {       
        return ( playerHitBox.y - playerHitBox.innerRadius ) > ( this.top( ) - this.innerRadius )
        && ( playerHitBox.y + playerHitBox.innerRadius ) < ( this.bottom( ) + this.innerRadius )
    }

    /////////////
    playerIsInVerticalActionRange( playerHitBox ) {        
        return ( playerHitBox.x - playerHitBox.innerRadius ) > this.left( ) && ( playerHitBox.x + playerHitBox.innerRadius ) < this.right( )
    }

    playerIsInHorizontalActionRange( playerHitBox ) {       
        return ( playerHitBox.y - playerHitBox.innerRadius ) > this.top( ) && ( playerHitBox.y + playerHitBox.innerRadius ) < this.bottom( )
    }

    ///////////////////////////////////////////////////////////////////////////////////////////
    upFacingPlayerIsInBlockedRadius( playerHitBox, playerDirection ) {
        const playerIsFacingUp  =  playerDirection == globals.FACING_UP

        return playerIsFacingUp && ( playerHitBox.top( ) <= this.bottom( ) ) 
        && playerHitBox.top( ) <= this.innerBottom( ) && playerHitBox.top( ) > this.top( )
    }

    downFacingPlayerIsInBlockedRadius( playerHitBox, playerDirection ) {
        const playerIsFacingDown    =  playerDirection == globals.FACING_DOWN

        return playerIsFacingDown && ( playerHitBox.bottom( ) >= this.top( ) ) 
        && playerHitBox.bottom( ) >= this.innerTop( ) && playerHitBox.bottom( ) < this.bottom( )
    }

    leftFacingPlayerIsInBlockedRadius( playerHitBox, playerDirection ) {
        const playerIsFacingLeft    = playerDirection == globals.FACING_LEFT

        return playerIsFacingLeft && ( playerHitBox.left( ) <= this.right( ) ) 
        && playerHitBox.left( ) <= this.innerRight( ) && playerHitBox.left( ) > this.left( )
    }

    rightFacingPlayerIsInBlockedRadius( playerHitBox, playerDirection ){
        const playerIsFacingRight    = playerDirection == globals.FACING_RIGHT

        return playerIsFacingRight && ( playerHitBox.right( ) >= this.left( ) ) 
        && playerHitBox.right( ) >= this.innerLeft( ) && playerHitBox.right( ) < this.right( )
    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    upFacingPlayerIsInActionRadius( playerHitBox, playerDirection ) {
        const playerIsFacingUp  =  playerDirection == globals.FACING_UP

        return playerIsFacingUp && ( playerHitBox.top( ) <= this.innerBottom( ) ) && playerHitBox.top( ) > this.innerTop( )
    }

    downFacingPlayerIsInActionRadius( playerHitBox, playerDirection ) {
        const playerIsFacingDown    =  playerDirection == globals.FACING_DOWN

        return playerIsFacingDown && ( playerHitBox.bottom( ) >= this.innerTop( ) ) && playerHitBox.bottom( ) < this.innerBottom( )
    }

    leftFacingPlayerIsInActionRadius( playerHitBox, playerDirection ) {
        const playerIsFacingLeft    = playerDirection == globals.FACING_LEFT

        return playerIsFacingLeft && ( playerHitBox.left( ) <= this.innerRight( ) ) && playerHitBox.left( ) > this.innerLeft( )
    }

    rightFacingPlayerIsInActionRadius( playerHitBox, playerDirection ){
        const playerIsFacingRight    = playerDirection == globals.FACING_RIGHT

        return playerIsFacingRight && ( playerHitBox.right( ) >= this.innerLeft( ) ) && playerHitBox.right( ) < this.innerRight( )
    }
}

module.exports = {
    I_Hitbox
}