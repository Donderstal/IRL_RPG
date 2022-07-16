import { GRID_BLOCK_PX } from "../../game-data/globals";
import { MENU_MARGIN_TOP_DOWN, MENU_TAB_PARTY, MENU_TAB_INVENTORY, MENU_TYPE_MAP, MENU_TYPE_GAME } from "../../game-data/uiGlobals";
import { I_MenuElement } from "./I_MenuElement";

export class ContentBubble extends I_MenuElement {
    type: string;
    content: string;
    originalX: number;
    originalY: number;
    inAnimation: boolean;
    constructor( startCol: number, startRow: number, cols: number, rows: number, type: string, content: string, rowStyles: string[] ) {
        super( startCol * GRID_BLOCK_PX, startRow * GRID_BLOCK_PX, cols, rows, rowStyles, ["B"] )

        this.type       = type;
        this.content    = content;
        this.originalX  = this.x;
        this.originalY  = this.y;
    }

    draw( ctx: CanvasRenderingContext2D ): void {
        if ( this.isActive ) {
            this.countFrameForAnimation( ctx );
        }
        super.drawElement( ctx );
        this.drawContents( ctx );
        this.reset( )
    }

    action(): void {
        console.log(this.type)
    }

    reset(): void {
        this.inAnimation = false;
        this.x = this.originalX;
        this.y = this.originalY;
    }

    drawContents( ctx: CanvasRenderingContext2D ): void {
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

    drawPartyBubble( ctx: CanvasRenderingContext2D ): void { }

    drawInventoryBubble( ctx: CanvasRenderingContext2D ): void {
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

    drawMapBubble( ctx: CanvasRenderingContext2D ): void { }

    drawGameBubble( ctx: CanvasRenderingContext2D ): void {
        if ( this.inAnimation ) {
            ctx.fillStyle = "yellow";
            ctx.fillText(this.content, (this.x + (this.width / 2)) - ( ctx.measureText(this.content).width) / 2, this.y + ( this.height / 2));
        }
        else {
            ctx.fillStyle = "black";
            ctx.fillText(this.content, (this.x + (this.width / 2)) - ( ctx.measureText(this.content).width) / 2, this.y + ( this.height / 2));
        }
    }

    elementAnimation( ): void {
        this.inAnimation = true;
    }

    activate(): void {
        this.isActive = true;
    }
}