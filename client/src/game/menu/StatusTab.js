const { MenuTab } = require('../interfaces/I_MenuTab')
const { drawRect, writeTextLine } = require('../../helpers/canvasHelpers');
const globals = require('../../game-data/globals');
const { GRID_BLOCK_PX, CANVAS_WIDTH, CANVAS_HEIGHT, LARGE_FONT_LINE_HEIGHT, LARGE_FONT_SIZE } = require('../../game-data/globals');

class StatusMenuTab extends MenuTab {
    constructor( ) {
        super( "STATUS", "VERT", 6 )
        this.setButtonHeight( this.height / 6 );
        this.setButtonWidth( this.width / 5 );
        this.itemSubMenuOptions = [ "EQUIP", "UNEQUIP", "BACK" ]
        this.activeOption;
        this.activeCharacter = null;
        this.activeCharacterIndex = 0;
    }

    setButtons( ) {
        this.activeCharacter = globals.GAME.PARTY_MEMBERS[this.activeCharacterIndex];
        const equipmentNames = [ 
            { equipmentType: "WEAPON", item: this.activeCharacter.Equipment["Weapon"] },
            { equipmentType: "HEAD", item: this.activeCharacter.Equipment["Head"] },
            { equipmentType: "ACCESSORY", item: this.activeCharacter.Equipment["Accessory"] },
            { equipmentType: "UPPER BODY", item: this.activeCharacter.Equipment["UpperBody"] },
            { equipmentType: "LOWER BODY", item: this.activeCharacter.Equipment["LowerBody"] },
        ]

        this.setButtonsInColumn( ( CANVAS_WIDTH * .66 ) + ( GRID_BLOCK_PX / 2 ), equipmentNames );
        super.activateButtonAndSetSubMenuPosition( )
        this.activeItem = this.buttons[this.activeButton].content.equipmentType
    }

    activateNextCharacter( ) {
        this.buttons = [];
        if ( this.activeCharacterIndex + 1 == globals.GAME.PARTY_MEMBERS.length ) {
            this.activeCharacterIndex = 0;
        }
        else {
            this.activeCharacterIndex += 1
        }
        this.setButtons( );
    }

    activatePreviousCharacter( ) {
        this.buttons = [];
        if ( this.activeCharacterIndex - 1 < 0 ) {
            this.activeCharacterIndex = globals.GAME.PARTY_MEMBERS.length - 1;
        }
        else {
            this.activeCharacterIndex -= 1
        }
        this.setButtons( );
    }

    activateNextButtonInList( ) {
        super.activateNextButtonInList( )
        this.activeItem = this.buttons[this.activeButton].content.equipmentType;
    }

    activatePreviousButtonInList( ) {
        super.activatePreviousButtonInList( )
        this.activeItem = this.buttons[this.activeButton].content.equipmentType;
    }

    doActiveModalOption( ) {
        alert( this.activeItem.Name, this.modal.activeButton.text )
        this.unsetModal( );
    }

    doActiveSubMenuOption( optionIndex = null ) {
        const option = this.itemSubMenu.getActiveOption( optionIndex );

        switch( option ) {
            case this.itemSubMenuOptions[0]:
                this.activeOption = this.itemSubMenuOptions[0];
                this.setModal(
                    "Choose and item to equip to " + this.activeCharacter.Name,
                    this.activeOption
                )
                break;
            case this.itemSubMenuOptions[1]:
                this.activeOption = this.itemSubMenuOptions[1];
                this.setModal(
                    "Unequip the item?",
                    this.activeOption
                )
                break;
            case this.itemSubMenuOptions[2]:
                this.unsetModal( );
                break;
            default :
                console.log( option );
                break;
        }

        this.itemSubMenu.deActivate( );
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