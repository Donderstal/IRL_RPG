const canvasHelpers = require('../../helpers/canvasHelpers')
const { 
    FACING_LEFT, FACING_UP, FACING_RIGHT, FACING_DOWN
} = require( '../../game-data/globals' );
const globals = require( '../../game-data/globals' );
const { COLOR_WHITE } = require( '../../game-data/uiGlobals' );
/**
 * The I_Hitbox interface is the base class of all in-game elements that should have collision detection.
 * It consists out of three circles, the inner, middle and outer.
 * The radius of these circles is dependent on the size of the sprite that owns the hitbox.
 * Collision is detected by comparing the xy values of two hitboxes.
 */
class I_Hitbox {
    constructor( x, y, radius ) {
        this.x              = x;
        this.y              = y;
        this.outerRadius    = radius * 1.5;
        this.radius         = radius;
        this.innerRadius    = radius / 2 
        this.collision      = false;
        this.arcColor       = COLOR_WHITE;
        this.outerTop       = ( ) => { return this.y - this.outerRadius }
        this.outerLeft      = ( ) => { return this.x - this.outerRadius }
        this.outerRight     = ( ) => { return this.x + this.outerRadius }
        this.outerBottom    = ( ) => { return this.y + this.outerRadius }       
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
        if ( globals.GAME.debugMode ) {
            this.draw( );
        }
    }

    draw( ) {
        let frontCtx = canvasHelpers.getFrontCanvasContext( );
        frontCtx.beginPath( );
        frontCtx.arc( this.x, this.y, this.outerRadius, 0, 2 * Math.PI );
        frontCtx.arc( this.x, this.y, this.radius, 0, 2 * Math.PI );
        frontCtx.arc( this.x, this.y, this.innerRadius, 0, 2 * Math.PI );
        frontCtx.strokeStyle = this.arcColor;
        frontCtx.stroke( );
    }

    checkForActionRange( targetHitbox, direction ) {
        if ( !targetHitbox ) {
            return false;
        }
        if ( this.targetIsInVerticalActionRange( targetHitbox ) ) {
            if ( this.upFacingTargetIsInActionRadius( targetHitbox, direction ) ) {
                return true;
            }
            else if ( this.downFacingTargetIsInActionRadius( targetHitbox, direction ) ) {
                return true;
            }
        }
        else if ( this.targetIsInHorizontalActionRange( targetHitbox ) ) {
            if ( this.leftFacingTargetIsInActionRadius( targetHitbox, direction ) ) {
                return true;
            }
            else if ( this.rightFacingTargetIsInActionRadius( targetHitbox, direction ) ) {
                return true;
            }
        }
        return false;
    }

    checkForBlockedRange( targetHitbox, direction ) {
        if ( !targetHitbox ) {
            return false;
        }
        if ( this.targetIsInVerticalBlockedRange( targetHitbox ) ) {
            if ( this.targetIsInUpBlockedRange( targetHitbox, direction ) ) {
                return true;
            }
            else if ( this.targetIsInDownBlockedRange( targetHitbox, direction ) ) {
                return true;
            }
        }
        else if ( this.targetIsInHorizontalBlockedRange( targetHitbox ) ) {
            if ( this.targetIsInLeftBlockedRange( targetHitbox, direction ) ) {
                return true;
            }
            else if ( this.targetIsInRightBlockedRange( targetHitbox, direction ) ) {
                return true;
            }
        }
        return false;
    }

    //BLOCKED//
    targetIsInVerticalBlockedRange( targetHitbox ) {        
        return this.x > targetHitbox.left( ) 
        && this.x < targetHitbox.right( )
    }
    targetIsInHorizontalBlockedRange( targetHitbox ) {       
        return this.y > targetHitbox.top( )
        && this.y < targetHitbox.bottom( )
    }

    targetIsInUpBlockedRange( targetHitbox, direction ) {
        const targetIsUp = this.top( ) > targetHitbox.top( );
        const topCollidesWithTargetBottom = this.top( ) <= targetHitbox.bottom( );

        return direction == FACING_UP && topCollidesWithTargetBottom && targetIsUp;
    }

    targetIsInDownBlockedRange( targetHitbox, direction ) {
        const targetIsBelow    = this.bottom( ) < targetHitbox.bottom( );
        const bottomCollidesWithTargetTop = this.bottom( ) >= targetHitbox.top( )

        return direction == FACING_DOWN && bottomCollidesWithTargetTop && targetIsBelow;
    }

    targetIsInLeftBlockedRange( targetHitbox, direction ) {
        const targetIsToTheLeft    = this.left( ) > targetHitbox.left( );
        const leftCollidesWithTargetRight = this.left( ) <= targetHitbox.right( );

        return direction == FACING_LEFT && leftCollidesWithTargetRight && targetIsToTheLeft;
    }

    targetIsInRightBlockedRange( targetHitbox, direction ){
        const targetIsToTheRight  = this.right( ) < targetHitbox.right( );
        const rightCollidesWithTargetLeft = this.right( ) >= targetHitbox.left( );

        return direction == FACING_RIGHT && rightCollidesWithTargetLeft && targetIsToTheRight;
    }

    //ACTION//
    targetIsInVerticalActionRange( targetHitbox ) {        
        return targetHitbox.x > this.outerLeft( ) 
        && targetHitbox.x < this.outerRight( )
    }
    targetIsInHorizontalActionRange( targetHitbox ) {       
        return targetHitbox.y > this.outerTop( ) 
        && targetHitbox.y < this.outerBottom( )
    }

    upFacingTargetIsInActionRadius( targetHitbox, direction ) {
        const targetIsFacingUp          = direction == FACING_DOWN;
        const thisIsAboveTarget         = targetHitbox.top( ) > this.innerTop( );
        const topIsInTargetOuterBottom  = targetHitbox.top( ) <= this.outerBottom( );

        return targetIsFacingUp && topIsInTargetOuterBottom && thisIsAboveTarget;
    }

    downFacingTargetIsInActionRadius( targetHitbox, direction ) {
        const targetIsFacingDown        = direction == FACING_UP;
        const thisIsBelowTarget         = targetHitbox.bottom( ) < this.innerBottom( );
        const bottomIsInTargetOuterTop  = targetHitbox.bottom( ) > this.outerTop( );

        return targetIsFacingDown && bottomIsInTargetOuterTop && thisIsBelowTarget;
    }

    leftFacingTargetIsInActionRadius( targetHitbox, direction ) {
        const targetIsFacingLeft        = direction == FACING_RIGHT;
        const thisIsLeftOfTarget        = targetHitbox.left( ) > this.innerLeft( );
        const leftIsInTargetOuterRight  = targetHitbox.left( ) < this.outerRight( );

        return targetIsFacingLeft && leftIsInTargetOuterRight  && thisIsLeftOfTarget;
    }

    rightFacingTargetIsInActionRadius( targetHitbox, direction ){
        const targetIsFacingRight       = direction == FACING_LEFT;
        const thisIsRightOfTarget       = targetHitbox.right( ) < this.innerRight( );
        const rightIsInTargetOuterLeft  = targetHitbox.right( ) > this.outerLeft( );

        return targetIsFacingRight && rightIsInTargetOuterLeft && thisIsRightOfTarget;
    }
}

module.exports = {
    I_Hitbox
}
