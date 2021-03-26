const { MenuTab } = require('../interfaces/I_MenuTab')
const { drawRect, writeTextLine } = require('../../helpers/canvasHelpers');
const globals = require('../../game-data/globals');
const { GRID_BLOCK_PX, CANVAS_WIDTH, CANVAS_HEIGHT, LARGE_FONT_LINE_HEIGHT, LARGE_FONT_SIZE } = require('../../game-data/globals');

class StatusMenuTab extends MenuTab {
    constructor( ) {
        super( "STATUS", "VERT", 6 )
        this.setButtonHeight( this.height / 6 );
        this.setButtonWidth( this.width / 5 );
        this.itemSubMenuOptions = [ "EQUIP", "UNEGQUIP"]
        this.activeOption;
        this.activeCharacter = null;
        this.activeCharacterIndex = 0;
    }

    setButtons( selectedCharacterIndex = null ) {
        this.activeCharacter = selectedCharacterIndex == null ? globals.GAME.PARTY_MEMBERS[this.activeCharacterIndex] : selectedCharacter;
        const equipmentNames = [ 
            { equipmentType: "WEAPON", item: this.activeCharacter.Equipment["Weapon"] },
            { equipmentType: "HEAD", item: this.activeCharacter.Equipment["Head"] },
            { equipmentType: "ACCESSORY", item: this.activeCharacter.Equipment["Accessory"] },
            { equipmentType: "UPPER BODY", item: this.activeCharacter.Equipment["UpperBody"] },
            { equipmentType: "LOWER BODY", item: this.activeCharacter.Equipment["LowerBody"] },
        ]

        this.setButtonsInColumn( ( CANVAS_WIDTH * .66 ) + ( GRID_BLOCK_PX / 2 ), equipmentNames );
        this.activeItem = this.buttons[this.activeButton].content.equipmentType
        this.itemSubMenu.setXy( this.buttons[this.activeButton].x + this.buttons[this.activeButton].width, this.buttons[this.activeButton].y )
        this.itemSubMenu.initOptions( this.itemSubMenuOptions );
    }

    handleActionButton( ) {
        if ( !this.itemSubMenu.isActive && !this.modal ) {
            this.itemSubMenu.activate( );
        }
        else if ( this.itemSubMenu.isActive && !this.modal ) {
            this.doActiveSubMenuOption( );
        }
        else if ( this.modal ) {
            this.doActiveModalOption( );
        }
    }

    draw( ) {
        this.drawLeftPanel( );
        this.drawRightPanel( );
        super.draw( );
    }

    drawLeftPanel( ) {
        drawRect( "FRONT", 
            GRID_BLOCK_PX / 2, GRID_BLOCK_PX * 2, 
            ( CANVAS_WIDTH * .66 ) - GRID_BLOCK_PX, CANVAS_HEIGHT - ( GRID_BLOCK_PX * 2 ), 
        "#FADADD" )
        writeTextLine( "CHARACTER", GRID_BLOCK_PX, ( GRID_BLOCK_PX * 2 ) + LARGE_FONT_LINE_HEIGHT, LARGE_FONT_SIZE, "#000000" );
        writeTextLine( "NAME: " + this.activeCharacter.Name, GRID_BLOCK_PX, ( GRID_BLOCK_PX * 2 ) + ( LARGE_FONT_LINE_HEIGHT * 2 ), LARGE_FONT_SIZE, "#000000" );
        writeTextLine( "CLASS: " + this.activeCharacter.ClassName, GRID_BLOCK_PX, ( GRID_BLOCK_PX * 2 ) + ( LARGE_FONT_LINE_HEIGHT * 3 ), LARGE_FONT_SIZE, "#000000" );
        writeTextLine( "LEVEL: " + this.activeCharacter.Level, GRID_BLOCK_PX, ( GRID_BLOCK_PX * 2 ) + ( LARGE_FONT_LINE_HEIGHT * 4 ), LARGE_FONT_SIZE, "#000000" );
        writeTextLine( "EXPERIENCE: " + this.activeCharacter.Experience, GRID_BLOCK_PX, ( GRID_BLOCK_PX * 2 ) + ( LARGE_FONT_LINE_HEIGHT * 5 ), LARGE_FONT_SIZE, "#000000" );
    }

    drawRightPanel( ) {
        drawRect( "FRONT", 
            ( CANVAS_WIDTH * .66 ) + ( GRID_BLOCK_PX / 2 ), GRID_BLOCK_PX * 2, 
            ( CANVAS_WIDTH * .33 ) - GRID_BLOCK_PX, CANVAS_HEIGHT - ( GRID_BLOCK_PX * 2 ), 
        "#FADADD" )
        writeTextLine( "EQUIPMENT", GRID_BLOCK_PX + ( CANVAS_WIDTH * .66 ), ( GRID_BLOCK_PX * 2 ) + LARGE_FONT_LINE_HEIGHT, LARGE_FONT_SIZE, "#000000" )
        writeTextLine( "Previous character - [ A ]", ( CANVAS_WIDTH * .66 ) + GRID_BLOCK_PX, CANVAS_HEIGHT - ( GRID_BLOCK_PX * 2 ) - (LARGE_FONT_LINE_HEIGHT * 2), LARGE_FONT_SIZE, "#000000" );
        writeTextLine( "Next character - [ D ]", ( CANVAS_WIDTH * .66 ) + GRID_BLOCK_PX, CANVAS_HEIGHT - ( GRID_BLOCK_PX * 2 ) - LARGE_FONT_LINE_HEIGHT, LARGE_FONT_SIZE, "#000000" );
    }
}

module.exports = { 
    StatusMenuTab
}