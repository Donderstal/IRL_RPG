const { GRID_BLOCK_PX } = require("../../game-data/globals");
const { MENU_MARGIN_TOP_DOWN, MENU_TAB_PARTY, MENU_TAB_INVENTORY, MENU_TYPE_MAP, MENU_TYPE_GAME } = require("../../game-data/uiGlobals");
const { I_MenuElement } = require("./I_MenuElement");

class ContentBubble extends I_MenuElement {
    constructor( startCol, startRow, cols, rows, type, content, rowStyles ) {
        super( startCol * GRID_BLOCK_PX, startRow * GRID_BLOCK_PX, cols, rows, rowStyles, ["B"] )

        this.type       = type;
        this.content    = content;
        this.originalX  = this.x;
        this.originalY  = this.y;
    }

    draw( ctx ) {
        if ( this.isActive ) {
            this.countFrameForAnimation( ctx );
        }
        super.drawElement( ctx );
        this.drawContents( ctx );
        this.reset( )
    }

    action( ) {
        alert.log(this.type)
    }

    reset( ) {
        this.inAnimation = false;
        this.x = this.originalX;
        this.y = this.originalY;
    }

    drawContents( ctx ) {
        switch( this.type ) {
            case MENU_TAB_PARTY:
                this.drawPartyBubble( ctx );
                break;
            case MENU_TAB_INVENTORY:
                this.drawInventoryBubble( ctx );
                break;
            case MENU_TYPE_MAP:
                this.drawMapBubble( ctx );
                break;
            case MENU_TYPE_GAME:
                this.drawGameBubble( ctx );
                break;
        }
    }

    drawPartyBubble( ctx ) {

    }

    drawInventoryBubble( ctx ) {
        if ( this.inAnimation ) {
            ctx.fillStyle = "yellow";
            ctx.fillText(this.content, this.x + (MENU_MARGIN_TOP_DOWN * GRID_BLOCK_PX), this.y + ( this.height / 2));
            ctx.fillText("x 1", (this.x + this.width) - ((MENU_MARGIN_TOP_DOWN * GRID_BLOCK_PX) + ctx.measureText("x 1").width), this.y + ( this.height / 2))
        }
        else {
            ctx.fillStyle = "black";
            ctx.fillText(this.content, this.x + (MENU_MARGIN_TOP_DOWN * GRID_BLOCK_PX), this.y + ( this.height / 2));
            ctx.fillText("x 1", (this.x + this.width) - ((MENU_MARGIN_TOP_DOWN * GRID_BLOCK_PX) + ctx.measureText("x 1").width), this.y + ( this.height / 2))
        }
    }

    drawMapBubble( ctx ) {

    }

    drawGameBubble( ctx ) {
        if ( this.inAnimation ) {
            ctx.fillStyle = "yellow";
            ctx.fillText(this.content, (this.x + (this.width / 2)) - ( ctx.measureText(this.content).width) / 2, this.y + ( this.height / 2));
        }
        else {
            ctx.fillStyle = "black";
            ctx.fillText(this.content, (this.x + (this.width / 2)) - ( ctx.measureText(this.content).width) / 2, this.y + ( this.height / 2));
        }
    }

    elementAnimation( ) {
        this.inAnimation = true;
    }

    activate( ) {
        this.isActive = true;
    }
}

module.exports = {
    ContentBubble
}