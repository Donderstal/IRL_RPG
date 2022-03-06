const { GRID_BLOCK_PX, BATTLE_FONT_SIZE, BATTLE_FONT_LINE_HEIGHT, DISPLAY_MODE_PORTRAIT, DISPLAY_MODE_LANDSCAPE } = require("../../game-data/globals")
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
            new HeaderButton(1, false, 'Inventory'),
            new HeaderButton(2, false, 'Map'),
            new HeaderButton(3, false, 'Game')
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
            DISPLAY_MODE_PORTRAIT ? button.setY(0) : button.setX(e);
        })
    }
}

class HeaderButton extends I_MenuElement {
    constructor( index, isActive, text ) {
        let startingPositions = headerTabSlotsPositions[0];

        let x = DISPLAY_MODE_PORTRAIT 
            ? 0
            : startingPositions[index]; 
        let y = DISPLAY_MODE_PORTRAIT 
            ? 0
            : isActive ? 0 : GRID_BLOCK_PX;
        let columns = DISPLAY_MODE_PORTRAIT 
            ? 8 
            : isActive ? 12 : 4;
        let rows = DISPLAY_MODE_PORTRAIT 
            ? 1
            : isActive ? 2 : 1;
        let rowStyles = DISPLAY_MODE_PORTRAIT 
            ? isActive ? [ BUBBLE_TOP ] : [ BUBBLE_TOP ]
            : isActive ? [ BUBBLE_TOP, BUBBLE_MIDDLE ] : [ BUBBLE_TOP ];

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
        if ( ( DISPLAY_MODE_PORTRAIT && this.isActive ) || DISPLAY_MODE_LANDSCAPE ) {
            super.drawElement( ctx );            
        }

        ctx.font = BATTLE_FONT_SIZE + "px " + 'AuX DotBitC Xtra';
        ctx.fillStyle = "black";
        var textWidth = ctx.measureText(this.text).width;
        if ( DISPLAY_MODE_LANDSCAPE || ( DISPLAY_MODE_PORTRAIT && this.isActive ))
        ctx.fillText( this.text, (this.x + (this.width / 2)) - (textWidth / 2), this.y + BATTLE_FONT_LINE_HEIGHT + (this.isActive ? + (this.height / 2) : 0) ); 

        if ( this.isActive && DISPLAY_MODE_LANDSCAPE ) {
            this.countFrameForAnimation( ctx );
        }
        else {
            this.drawBorders( ctx );
        }
    }

    deActivate( ) {
        this.isActive = false;
        DISPLAY_MODE_PORTRAIT ? this.initElement( 0, 0, 0, 0, [ BUBBLE_TOP ] ) : this.initElement( 0, GRID_BLOCK_PX, 4, 1, [ BUBBLE_TOP ] );
    }

    activate( ) {
        this.isActive = true;
        DISPLAY_MODE_PORTRAIT ? this.initElement( 0, 0, 8, 1, [ BUBBLE_TOP ] ) : this.initElement( 0, 0, 12, 2, [ BUBBLE_TOP, BUBBLE_MIDDLE ] );
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