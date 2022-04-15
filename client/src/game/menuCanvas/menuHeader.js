const { 
    GRID_BLOCK_PX, BATTLE_FONT_SIZE
} = require("../../game-data/globals")
const { 
    MENU_HEADER_INACTIVE_Y, MENU_HEADER_ACTIVE_COLUMNS, MENU_HEADER_INACTIVE_COLUMNS, 
    MENU_HEADER_INACTIVE_ROWS, MENU_HEADER_ACTIVE_ROWS,
    MENU_HEADER_ACTIVE_ROWSTYLES, MENU_HEADER_INACTIVE_ROWSTYLES 
} = require("../../game-data/uiGlobals");
const { I_MenuElement } = require("./I_MenuElement")
const globals = require("../../game-data/globals");

const getTabXPosition = ( index, activeIndex ) => {
    if ( globals.SCREEN.MOBILE ) {
        return 0;
    }
    return (index * ( 4 * GRID_BLOCK_PX )) + (( activeIndex < index ) ? 8 * GRID_BLOCK_PX : 0 * GRID_BLOCK_PX);
}

class MenuHeader {
    constructor( ) {
        this.activeIndex = 0
        this.buttons = [
            new HeaderButton(0, 0, 'Party'),
            new HeaderButton(1, 0, 'Inventory'),
            new HeaderButton(2, 0, 'Map'),
            new HeaderButton(3, 0, 'Game')
        ]
    }

    draw( ctx ) {
        this.buttons.forEach((e)=>{
            e.drawElement( ctx )
        });
    }

    activateNext( ) {
        this.activeIndex = ( this.activeIndex + 1 ) > this.buttons.length - 1 ? 0 : this.activeIndex + 1;
        this.setActiveButton( );
    }

    activatePrevious( ) {
        this.activeIndex = ( this.activeIndex - 1 ) < 0 ? this.buttons.length - 1 : this.activeIndex - 1;
        this.setActiveButton( );
    }

    setActiveButton( ) {
        this.buttons.forEach((e)=>{
            e.deActivate(this.activeIndex)
        });

        this.buttons[this.activeIndex].activate(this.activeIndex);

        this.buttons.forEach((e, index) => {
            e.setX(getTabXPosition( index, this.activeIndex ));
        })
    }
}

class HeaderButton extends I_MenuElement {
    constructor( index, activeIndex, text ) {
        const isActive = index == activeIndex;
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

    elementAnimation( ctx ) {
        var tooltipWidth = ctx.measureText("e > ").width;
        ctx.fillText( " < q", this.x, this.y + (this.height / 2) );
        ctx.fillText( "e > ", (this.x + this.width) - tooltipWidth, this.y + (this.height / 2));
    }

    drawElement( ctx ) {
        if ( ( globals.SCREEN.MOBILE && this.isActive ) || !globals.SCREEN.MOBILE ) {
            super.drawElement( ctx );     
            ctx.font = BATTLE_FONT_SIZE + "px " + 'PFRondaSeven';
            ctx.fillStyle = "black";
            var textWidth = ctx.measureText(this.text).width;
            ctx.fillText( this.text, (this.x + (this.width / 2)) - (textWidth / 2), this.y + this.height / 2); 
    
            if ( this.isActive ) {
                this.countFrameForAnimation( ctx );
            }
            else {
                this.drawBorders( ctx );
            }       
        }
    }

    deActivate( activeIndex ) {
        this.isActive = false;
        this.initElement( 
            getTabXPosition( this.index, activeIndex ), MENU_HEADER_INACTIVE_Y, 
            MENU_HEADER_INACTIVE_COLUMNS, MENU_HEADER_INACTIVE_ROWS, 
            MENU_HEADER_INACTIVE_ROWSTYLES 
        );
    }

    activate( activeIndex ) {
        this.isActive = true;
        this.initElement( 
            getTabXPosition( this.index, activeIndex ), 0, 
            MENU_HEADER_ACTIVE_COLUMNS, MENU_HEADER_ACTIVE_ROWS, 
            MENU_HEADER_ACTIVE_ROWSTYLES 
        );
    }

    setX( x ) {
        this.x = x;
    }

    setY( y ) {
        this.y = y;
    }
}

module.exports = {
    MenuHeader
}