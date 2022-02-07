const { GRID_BLOCK_PX, BATTLE_FONT_SIZE, BATTLE_FONT_LINE_HEIGHT } = require("../../game-data/globals")
const { BUBBLE_TOP, BUBBLE_MIDDLE, BUBBLE_BOTTOM } = require("../../game-data/textboxGlobals")
const { I_MenuElement } = require("./I_MenuElement")

const headerTabSlotsPositions = [
    [ 0, GRID_BLOCK_PX * 12, GRID_BLOCK_PX * 16, GRID_BLOCK_PX * 20 ],
    [ 0, GRID_BLOCK_PX * 4, GRID_BLOCK_PX * 16, GRID_BLOCK_PX * 20 ],
    [ 0, GRID_BLOCK_PX * 4, GRID_BLOCK_PX * 8, GRID_BLOCK_PX * 20 ],
    [ 0, GRID_BLOCK_PX * 4, GRID_BLOCK_PX * 8, GRID_BLOCK_PX * 12 ]
];

class MenuHeader {
    constructor( ) {
        this.activeIndex = 0
        this.buttons = [
            new HeaderButton(0, true, 'General'),
            new HeaderButton(GRID_BLOCK_PX * 12, false, 'Inventory'),
            new HeaderButton(GRID_BLOCK_PX * 16, false, 'Map'),
            new HeaderButton(GRID_BLOCK_PX * 20, false, 'Game')
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
            e.deActivate( )
        });

        this.buttons[this.activeIndex].activate( );

        headerTabSlotsPositions[this.activeIndex].forEach((e, index) => {
            let button = this.buttons[index];
            button.setX(e);
        })
    }
}

class HeaderButton extends I_MenuElement {
    constructor( x, isActive, text ) {
        let y = isActive ? 0 : GRID_BLOCK_PX;
        let columns = isActive ? 12 : 4;
        let rows = isActive ? 2 : 1;
        let rowStyles = isActive ? [ BUBBLE_TOP, BUBBLE_MIDDLE ] : [ BUBBLE_TOP ];

        super( x, y, columns, rows, rowStyles, ["B"], isActive )
        this.isActive = isActive;
        this.text = text;
    }

    elementAnimation( ctx ) {
        var tooltipWidth = ctx.measureText("e > ").width;
        ctx.fillText( " < q", this.x, (this.y + (this.height / 2)) + BATTLE_FONT_LINE_HEIGHT );
        ctx.fillText( "e > ", (this.x + this.width) - tooltipWidth, (this.y + (this.height / 2)) + BATTLE_FONT_LINE_HEIGHT );
    }

    drawElement( ctx ) {
        super.drawElement( ctx );
        ctx.font = BATTLE_FONT_SIZE + "px " + 'AuX DotBitC Xtra';
        ctx.fillStyle = "black";
        var textWidth = ctx.measureText(this.text).width;
        ctx.fillText( this.text, (this.x + (this.width / 2)) - (textWidth / 2), this.y + BATTLE_FONT_LINE_HEIGHT + (this.isActive ? + (this.height / 2) : 0) );

        if ( this.isActive ) {
            this.countFrameForAnimation( ctx );
        }
        else {
            this.drawBorders( ctx );
        }
    }

    deActivate( ) {
        this.isActive = false;
        this.initElement( 0, GRID_BLOCK_PX, 4, 1, [ BUBBLE_TOP ] );
    }

    activate( ) {
        this.isActive = true;
        this.initElement( 0, 0, 12, 2, [ BUBBLE_TOP, BUBBLE_MIDDLE ] );
    }

    setX( x ) {
        this.x = x;
    }
}

module.exports = {
    MenuHeader
}