const { GRID_BLOCK_PX, FACING_LEFT, FACING_UP, FACING_RIGHT, FACING_DOWN } = require('../../../game-data/globals');
const { drawRect } = require('../../../helpers/canvasHelpers');

class BlockedArea {
    constructor( parent, blockedCoordinates ) {
        this.blockedCoordinates = blockedCoordinates;
        this.parentX = parent.x;
        this.parentY = parent.y;        
    }

    get leftBorderPosition( ) { return this.parentX + ( this.blockedCoordinates.left * GRID_BLOCK_PX ) };
    get topBorderPosition( ) { return this.parentY + ( this.blockedCoordinates.top * GRID_BLOCK_PX ) };
    get rightBorderPosition( ) { return this.parentX + ( this.blockedCoordinates.right * GRID_BLOCK_PX ) };
    get bottomBorderPosition( ) { return this.parentY + ( this.blockedCoordinates.bottom * GRID_BLOCK_PX ) };

    updateParentLocation( parent ) {
        this.parentX = parent.x;
        this.parentY = parent.y;
    }

    checkForCollision( hitbox, direction ) {
        if (this.spriteIsLeftAndFacingRight( hitbox, direction ) && this.spriteInVerticalRange(hitbox)) {
            return hitbox.right() > this.leftBorderPosition;
        }
        else if (this.spriteIsAboveAndFacingDown( hitbox, direction ) && this.spriteInHorizontalRange(hitbox)) {
            return hitbox.bottom( ) > this.topBorderPosition;
        }
        else if (this.spriteIsRightAndFacingLeft( hitbox, direction ) && this.spriteInVerticalRange(hitbox)) {
            return hitbox.left( ) < this.rightBorderPosition;
        }
        else if (this.spriteIsBelowAndFacingUp( hitbox, direction ) && this.spriteInHorizontalRange(hitbox)) {
            return hitbox.top( ) < this.bottomBorderPosition;
        }
    }

    spriteIsLeftAndFacingRight( hitbox, direction ) { return direction == FACING_RIGHT && hitbox.innerRight() < this.rightBorderPosition; }
    spriteIsAboveAndFacingDown( hitbox, direction ) { return direction == FACING_DOWN && hitbox.innerBottom() < this.bottomBorderPosition; }
    spriteIsRightAndFacingLeft( hitbox, direction ) { return direction == FACING_LEFT && hitbox.innerLeft() > this.leftBorderPosition; }
    spriteIsBelowAndFacingUp( hitbox, direction ) { return direction == FACING_UP && hitbox.innerTop() > this.topBorderPosition; }

    spriteInHorizontalRange( hitbox ) { 
        return (hitbox.x >= this.leftBorderPosition && hitbox.x <= this.rightBorderPosition)
        || (hitbox.innerLeft() > this.leftBorderPosition && hitbox.innerLeft() < this.rightBorderPosition)
        || (hitbox.innerRight() > this.leftBorderPosition && hitbox.innerRight() < this.rightBorderPosition); }
    spriteInVerticalRange( hitbox ) { 
        return (hitbox.y >= this.topBorderPosition && hitbox.y <= this.bottomBorderPosition)
        || (hitbox.innerBottom() > this.topBorderPosition && hitbox.innerBottom() < this.bottomBorderPosition)
        || (hitbox.innerTop() > this.topBorderPosition && hitbox.innerTop() < this.bottomBorderPosition); 
    }

    // spriteInHorizontalRange( hitbox ) { return hitbox.x >= this.leftBorderPosition && hitbox.x <= this.rightBorderPosition; }
    // spriteInVerticalRange( hitbox ) { return hitbox.y >= this.topBorderPosition && hitbox.y <= this.bottomBorderPosition; }
}

module.exports = {
    BlockedArea
}