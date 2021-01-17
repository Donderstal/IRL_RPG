const canvasHelpers = require('../../helpers/canvasHelpers')
const { 
    FACING_LEFT, FACING_UP, FACING_RIGHT, FACING_DOWN
} = require( '../../game-data/globals' )

class I_Hitbox {
    constructor( x, y, radius ) {
        this.x              = x;
        this.y              = y;
        this.outerRadius    = radius * 1.5;
        this.radius         = radius;
        this.innerRadius    = radius / 2 
        this.collision      = false;
        this.arcColor       = "#FFFFFF";
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
    }

    draw( x, y ) {
        this.updateXy( x, y )
        let frontCtx = canvasHelpers.getFrontCanvasContext( );
        frontCtx.beginPath( );
        frontCtx.arc( this.x, this.y, this.outerRadius, 0, 2 * Math.PI );
        frontCtx.arc( this.x, this.y, this.radius, 0, 2 * Math.PI );
        frontCtx.arc( this.x, this.y, this.innerRadius, 0, 2 * Math.PI );
        frontCtx.strokeStyle = this.arcColor;
        frontCtx.stroke( );
    }

    checkForActionRange( targetHitbox, targetDirection ) {
        if ( targetHitbox == undefined ) {
            return false;
        }
        if ( this.targetIsInVerticalActionRange( targetHitbox ) ) {
            if ( this.upFacingTargetIsInActionRadius( targetHitbox, targetDirection ) ) {
                return true;
            }
            else if ( this.downFacingTargetIsInActionRadius( targetHitbox, targetDirection ) ) {
                return true;
            }
        }
        else if ( this.targetIsInHorizontalActionRange( targetHitbox ) ) {
            if ( this.leftFacingTargetIsInActionRadius( targetHitbox, targetDirection ) ) {
                return true;
            }
            else if ( this.rightFacingTargetIsInActionRadius( targetHitbox, targetDirection ) ) {
                return true;
            }
        }
        return false;
    }

    checkForBlockedRange( targetHitbox, targetDirection ) {
        if ( targetHitbox == undefined ) {
            return false;
        }
        if ( this.targetIsInVerticalBlockedRange( targetHitbox ) ) {
            if ( this.upFacingTargetIsInBlockedRadius( targetHitbox, targetDirection ) ) {
                return true;
            }
            else if ( this.downFacingTargetIsInBlockedRadius( targetHitbox, targetDirection ) ) {
                return true;
            }
        }
        else if ( this.targetIsInHorizontalBlockedRange( targetHitbox ) ) {
            if ( this.leftFacingTargetIsInBlockedRadius( targetHitbox, targetDirection ) ) {
                return true;
            }
            else if ( this.rightFacingTargetIsInBlockedRadius( targetHitbox, targetDirection ) ) {
                return true;
            }
        }
        return false;
    }

    //////////////
    targetIsInVerticalBlockedRange( targetHitbox ) {        
        return ( targetHitbox.x - targetHitbox.innerRadius ) > ( this.left( ) - this.innerRadius ) 
        && ( targetHitbox.x + targetHitbox.innerRadius ) < ( this.right( ) + this.innerRadius )
    }

    targetIsInHorizontalBlockedRange( targetHitbox ) {       
        return ( targetHitbox.y - targetHitbox.innerRadius ) > ( this.top( ) - this.innerRadius )
        && ( targetHitbox.y + targetHitbox.innerRadius ) < ( this.bottom( ) + this.innerRadius )
    }

    /////////////
    targetIsInVerticalActionRange( targetHitbox ) {        
        return targetHitbox.x > this.outerLeft( ) 
        && targetHitbox.x < this.outerRight( )
    }

    targetIsInHorizontalActionRange( targetHitbox ) {       
        return targetHitbox.y > this.outerTop( ) 
        && targetHitbox.y < this.outerBottom( )
    }

    ///////////////////////////////////////////////////////////////////////////////////////////
    upFacingTargetIsInBlockedRadius( targetHitbox, targetDirection ) {
        const targetIsFacingUp  = targetDirection == FACING_UP
        const thisIsAboveTarget = targetHitbox.top( ) > this.innerTop( );

        return targetIsFacingUp && ( targetHitbox.top( ) <= this.bottom( ) ) 
        && targetHitbox.top( ) <= this.innerBottom( ) && thisIsAboveTarget
    }

    downFacingTargetIsInBlockedRadius( targetHitbox, targetDirection ) {
        const targetIsFacingDown   = targetDirection == FACING_DOWN
        const thisIsBelowTarget    = targetHitbox.bottom( ) < this.innerBottom( )

        return targetIsFacingDown && ( targetHitbox.bottom( ) >= this.top( ) ) 
        && targetHitbox.outerBottom( ) >= this.innerTop( ) && thisIsBelowTarget
    }

    leftFacingTargetIsInBlockedRadius( targetHitbox, targetDirection ) {
        const targetIsFacingLeft    = targetDirection == FACING_LEFT
        const thisIsLeftOfTarget    = targetHitbox.left( ) > this.innerLeft( )

        return targetIsFacingLeft && ( targetHitbox.left( ) <= this.right( ) ) 
        && targetHitbox.left( ) <= this.innerRight( ) && thisIsLeftOfTarget
    }

    rightFacingTargetIsInBlockedRadius( targetHitbox, targetDirection ){
        const targetIsFacingRight   = targetDirection == FACING_RIGHT;
        const thisIsRightOfTarget   = targetHitbox.right( ) < this.innerRight( )

        return targetIsFacingRight && ( targetHitbox.right( ) >= this.left( ) ) 
        && targetHitbox.right( ) >= this.innerLeft( ) && thisIsRightOfTarget
    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    upFacingTargetIsInActionRadius( targetHitbox, direction ) {
        const targetIsFacingUp          = direction == FACING_DOWN;
        const thisIsAboveTarget         = targetHitbox.top( ) > this.innerTop( );
        const topIsInTargetOuterBottom  = targetHitbox.top( ) <= this.outerBottom( )

        return targetIsFacingUp && topIsInTargetOuterBottom && thisIsAboveTarget
    }

    downFacingTargetIsInActionRadius( targetHitbox, direction ) {
        const targetIsFacingDown        = direction == FACING_UP
        const thisIsBelowTarget         = targetHitbox.bottom( ) < this.innerBottom( )
        const bottomIsInTargetOuterTop  = targetHitbox.bottom( ) > this.outerTop( )

        return targetIsFacingDown && bottomIsInTargetOuterTop && thisIsBelowTarget
    }

    leftFacingTargetIsInActionRadius( targetHitbox, direction ) {
        const targetIsFacingLeft        = direction == FACING_RIGHT
        const thisIsLeftOfTarget        = targetHitbox.left( ) > this.innerLeft( )
        const leftIsInTargetOuterRight  = targetHitbox.left( ) < this.outerRight( )

        return targetIsFacingLeft && leftIsInTargetOuterRight  && thisIsLeftOfTarget
    }

    rightFacingTargetIsInActionRadius( targetHitbox, direction ){
        const targetIsFacingRight       = direction == FACING_LEFT
        const thisIsRightOfTarget       = targetHitbox.right( ) < this.innerRight( )
        const rightIsInTargetOuterLeft  = targetHitbox.right( ) > this.outerLeft( )

        return targetIsFacingRight && rightIsInTargetOuterLeft && thisIsRightOfTarget
    }
}

module.exports = {
    I_Hitbox
}
