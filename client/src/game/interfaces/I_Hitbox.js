const canvasHelpers = require('../../helpers/canvasHelpers')
const { 
    FACING_LEFT, FACING_UP, FACING_RIGHT, FACING_DOWN
} = require( '../../game-data/globals' );
const globals = require( '../../game-data/globals' );
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
    /**
     * Update the xy location of the hitbox
     * @param {Number} newX represents a in-canvas location on the X axis 
     * @param {Number} newY represents a in-canvas location on the Y axis 
     */
    updateXy( newX, newY ) {
        if ( this.x != newX || this.y != newY  ) {
            this.x = newX;
            this.y = newY;            
        }
        if ( globals.GAME.debugMode ) {
            this.draw( );
        }
    }
    /**
     * Draw the hitbox circles. Only used for testing and debugging purposes
     * @param {Number} x represents a in-canvas location on the X axis 
     * @param {Number} y represents a in-canvas location on the Y axis 
     */
    draw( ) {
        let frontCtx = canvasHelpers.getFrontCanvasContext( );
        frontCtx.beginPath( );
        frontCtx.arc( this.x, this.y, this.outerRadius, 0, 2 * Math.PI );
        frontCtx.arc( this.x, this.y, this.radius, 0, 2 * Math.PI );
        frontCtx.arc( this.x, this.y, this.innerRadius, 0, 2 * Math.PI );
        frontCtx.strokeStyle = this.arcColor;
        frontCtx.stroke( );
    }
    /**
     * Checks if the targetHitbox is in the outer range of method owner Hitbox. Return a boolean.
     * @param {I_Hitbox} targetHitbox - Hitbox that needs to be checked for collision
     * @param {Number} targetDirection - number representing the direction the target is facing
     */
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
    /**
     * Checks if the targetHitbox is in the inner range of method owner Hitbox. Return a boolean.
     * @param {I_Hitbox} targetHitbox - Hitbox that needs to be checked for collision
     * @param {Number} targetDirection - number representing the direction the target is facing
     */
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
    /**
     * Return true if the innerCircle x of the Target hitbox is in the outerCircle x of this hitbox
     * @param {I_Hitbox} targetHitbox 
     */
    targetIsInVerticalBlockedRange( targetHitbox ) {        
        return targetHitbox.innerLeft( ) > this.outerLeft( ) 
        && targetHitbox.innerRight( ) < this.outerRight( )
    }
    /**
     * Return true if the innerCircle y of the Target hitbox is in the outerCircle y of this hitbox
     * @param {I_Hitbox} targetHitbox 
     */
    targetIsInHorizontalBlockedRange( targetHitbox ) {       
        return targetHitbox.innerTop( ) > this.outerTop( )
        && targetHitbox.innerBottom( ) < this.outerBottom( )
    }
    /**
     * Return true if the center x of the Target hitbox is in the outerCircle x of this hitbox
     * @param {I_Hitbox} targetHitbox 
     */
    targetIsInVerticalActionRange( targetHitbox ) {        
        return targetHitbox.x > this.outerLeft( ) 
        && targetHitbox.x < this.outerRight( )
    }
    /**
     * Return true if the center y of the Target hitbox is in the outerCircle y of this hitbox
     * @param {I_Hitbox} targetHitbox 
     */
    targetIsInHorizontalActionRange( targetHitbox ) {       
        return targetHitbox.y > this.outerTop( ) 
        && targetHitbox.y < this.outerBottom( )
    }
    /**
     * If the target is facing up, is below this hitbox and target top y is smaller than this innerbottom Y, return true
     * @param {I_Hitbox} targetHitbox - Hitbox that needs to be checked for collision
     * @param {Number} targetDirection - number representing the direction the target is facing
     */
    upFacingTargetIsInBlockedRadius( targetHitbox, targetDirection ) {
        const targetIsFacingUp  = targetDirection == FACING_UP;
        const thisIsAboveTarget = targetHitbox.top( ) > this.innerTop( );
        const targetTopIsInInnerRadius = targetHitbox.top( ) <= this.innerBottom( );

        return targetIsFacingUp && targetTopIsInInnerRadius && thisIsAboveTarget;
    }
    /**
     * If the target is facing down, is above this hitbox and target bottom y is larger than this innertop Y, return true
     * Checking for down facing target collision slightly deviaties from the other checks because of the 2D perspective in the game
     * @param {I_Hitbox} targetHitbox - Hitbox that needs to be checked for collision
     * @param {Number} targetDirection - number representing the direction the target is facing
     */
    downFacingTargetIsInBlockedRadius( targetHitbox, targetDirection ) {
        const targetIsFacingDown   = targetDirection == FACING_DOWN;
        const thisIsBelowTarget    = targetHitbox.bottom( ) < this.innerBottom( );
        const targetOuterBottomIsInInnerRadius = targetHitbox.outerBottom( ) >= this.innerTop( )

        return targetIsFacingDown &&  targetOuterBottomIsInInnerRadius && thisIsBelowTarget;
    }
    /**
     * If the target is facing left, is right of this hitbox and target left x is smaller than this innerright x, return true
     * @param {I_Hitbox} targetHitbox - Hitbox that needs to be checked for collision
     * @param {Number} targetDirection - number representing the direction the target is facing
     */
    leftFacingTargetIsInBlockedRadius( targetHitbox, targetDirection ) {
        const targetIsFacingLeft    = targetDirection == FACING_LEFT;
        const thisIsLeftOfTarget    = targetHitbox.left( ) > this.innerLeft( );
        const targetLeftIsInInnerRadius = targetHitbox.left( ) <= this.innerRight( );

        return targetIsFacingLeft && targetLeftIsInInnerRadius && thisIsLeftOfTarget;
    }
    /**
     * If the target is facing right, is left of this hitbox and target right x is larger than this innerleft x, return true
     * @param {I_Hitbox} targetHitbox - Hitbox that needs to be checked for collision
     * @param {Number} targetDirection - number representing the direction the target is facing
     */
    rightFacingTargetIsInBlockedRadius( targetHitbox, targetDirection ){
        const targetIsFacingRight   = targetDirection == FACING_RIGHT;
        const thisIsRightOfTarget   = targetHitbox.right( ) < this.innerRight( );
        const targetRightIsInInnerRadius = targetHitbox.right( ) >= this.innerLeft( );

        return targetIsFacingRight && targetRightIsInInnerRadius && thisIsRightOfTarget;
    }
    /**
     * If the target is facing up, is below this hitbox and target top y is smaller than this outerbottom Y, return true
     * @param {I_Hitbox} targetHitbox - Hitbox that needs to be checked for collision
     * @param {Number} targetDirection - number representing the direction the target is facing
     */
    upFacingTargetIsInActionRadius( targetHitbox, direction ) {
        const targetIsFacingUp          = direction == FACING_DOWN;
        const thisIsAboveTarget         = targetHitbox.top( ) > this.innerTop( );
        const topIsInTargetOuterBottom  = targetHitbox.top( ) <= this.outerBottom( );

        return targetIsFacingUp && topIsInTargetOuterBottom && thisIsAboveTarget;
    }
    /**
     * If the target is facing down, is above this hitbox and target bottom y is larger than this outertop Y, return true
     * @param {I_Hitbox} targetHitbox - Hitbox that needs to be checked for collision
     * @param {Number} targetDirection - number representing the direction the target is facing
     */
    downFacingTargetIsInActionRadius( targetHitbox, direction ) {
        const targetIsFacingDown        = direction == FACING_UP;
        const thisIsBelowTarget         = targetHitbox.bottom( ) < this.innerBottom( );
        const bottomIsInTargetOuterTop  = targetHitbox.bottom( ) > this.outerTop( );

        return targetIsFacingDown && bottomIsInTargetOuterTop && thisIsBelowTarget;
    }
    /**
     * If the target is facing left, is right of this hitbox and target left x is smaller than this outerright x, return true
     * @param {I_Hitbox} targetHitbox - Hitbox that needs to be checked for collision
     * @param {Number} targetDirection - number representing the direction the target is facing
     */
    leftFacingTargetIsInActionRadius( targetHitbox, direction ) {
        const targetIsFacingLeft        = direction == FACING_RIGHT;
        const thisIsLeftOfTarget        = targetHitbox.left( ) > this.innerLeft( );
        const leftIsInTargetOuterRight  = targetHitbox.left( ) < this.outerRight( );

        return targetIsFacingLeft && leftIsInTargetOuterRight  && thisIsLeftOfTarget;
    }
    /**
     * If the target is facing right, is left of this hitbox and target right x is larger than this outerleft x, return true
     * @param {I_Hitbox} targetHitbox - Hitbox that needs to be checked for collision
     * @param {Number} targetDirection - number representing the direction the target is facing
     */
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
