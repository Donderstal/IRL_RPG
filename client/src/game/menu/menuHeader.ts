import { MENU_HEADER_INACTIVE_Y, MENU_HEADER_ACTIVE_COLUMNS, MENU_HEADER_INACTIVE_COLUMNS, MENU_HEADER_INACTIVE_ROWS, MENU_HEADER_ACTIVE_ROWS, MENU_HEADER_ACTIVE_ROWSTYLES, MENU_HEADER_INACTIVE_ROWSTYLES } from "../../game-data/uiGlobals";
import { I_MenuElement } from "./I_MenuElement";
import { BATTLE_FONT_SIZE } from "../../game-data/globals";
import { getTabXPosition } from "./menuHelpers";
import { mobileAgent } from "../../helpers/screenOrientation";

class HeaderButton extends I_MenuElement {
    index: number;
    text: string;
    constructor( index: number, activeIndex: number, text: string ) {
        const isActive = index === activeIndex;
        super( 
            getTabXPosition( index, activeIndex ), isActive ? 0 : MENU_HEADER_INACTIVE_Y, 
            isActive ? MENU_HEADER_ACTIVE_COLUMNS : MENU_HEADER_INACTIVE_COLUMNS, 
            isActive ? MENU_HEADER_ACTIVE_ROWS : MENU_HEADER_INACTIVE_ROWS, 
            isActive ? MENU_HEADER_ACTIVE_ROWSTYLES : MENU_HEADER_INACTIVE_ROWSTYLES, 
            ["B"], isActive 
        );
        this.index = index;
        this.text = text;
    }

    elementAnimation( ctx: OffscreenCanvasRenderingContext2D ): void {
        const tooltipWidth = ctx.measureText("e > ").width;
        ctx.fillText( " < q", this.x, this.y + (this.height / 2) );
        ctx.fillText( "e > ", (this.x + this.width) - tooltipWidth, this.y + (this.height / 2));
    }

    drawElement( ctx: OffscreenCanvasRenderingContext2D ): void {
        if ( ( mobileAgent && this.isActive ) || !mobileAgent ) {
            super.drawElement( ctx );     
            ctx.font = BATTLE_FONT_SIZE + "px " + 'PFRondaSeven';
            ctx.fillStyle = "black";
            const textWidth = ctx.measureText(this.text).width;
            ctx.fillText( this.text, (this.x + (this.width / 2)) - (textWidth / 2), this.y + this.height / 2); 
    
            if ( this.isActive ) {
                this.countFrameForAnimation( ctx );
            }
            else {
                this.drawBorders( ctx );
            }       
        }
    }

    deActivate( activeIndex: number ): void {
        this.isActive = false;
        this.initElement( 
            getTabXPosition( this.index, activeIndex ), MENU_HEADER_INACTIVE_Y, 
            MENU_HEADER_INACTIVE_COLUMNS, MENU_HEADER_INACTIVE_ROWS, 
            MENU_HEADER_INACTIVE_ROWSTYLES 
        );
    }

    activate( activeIndex: number ): void {
        this.isActive = true;
        this.initElement( 
            getTabXPosition( this.index, activeIndex ), 0, 
            MENU_HEADER_ACTIVE_COLUMNS, MENU_HEADER_ACTIVE_ROWS, 
            MENU_HEADER_ACTIVE_ROWSTYLES 
        );
    }

    setX( x: number ): void {
        this.x = x;
    }

    setY( y: number ): void {
        this.y = y;
    }
}

export class MenuHeader {
    activeIndex: number;
    buttons: HeaderButton[];
    constructor() {
        this.activeIndex = 0
        this.buttons = [
            new HeaderButton( 0, 0, 'Party' ),
            new HeaderButton( 1, 0, 'Inventory' ),
            new HeaderButton( 2, 0, 'Map' ),
            new HeaderButton( 3, 0, 'Game' )
        ]
    }

    draw( ctx: OffscreenCanvasRenderingContext2D ): void {
        this.buttons.forEach( ( e ) => {
            e.drawElement( ctx )
        } );
    }

    activateNext(): void {
        this.activeIndex = ( this.activeIndex + 1 ) > this.buttons.length - 1 ? 0 : this.activeIndex + 1;
        this.setActiveButton();
    }

    activatePrevious(): void {
        this.activeIndex = ( this.activeIndex - 1 ) < 0 ? this.buttons.length - 1 : this.activeIndex - 1;
        this.setActiveButton();
    }

    setActiveButton(): void {
        this.buttons.forEach( ( e ): void => {
            e.deActivate( this.activeIndex )
        } );

        this.buttons[this.activeIndex].activate( this.activeIndex );

        this.buttons.forEach( ( e, index ): void => {
            e.setX( getTabXPosition( index, this.activeIndex ) );
        } )
    }
}
