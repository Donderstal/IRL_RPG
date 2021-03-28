const { MenuTab } = require('../interfaces/I_MenuTab')
const { drawRect, writeTextLine, drawFromImageToCanvas } = require('../../helpers/canvasHelpers');
const globals = require('../../game-data/globals');
const { 
    GRID_BLOCK_PX, CANVAS_WIDTH, CANVAS_HEIGHT, LARGE_FONT_LINE_HEIGHT, LARGE_FONT_SIZE,
    ATT_HEALTH_POINTS, ATT_POWER_POINTS, ATT_PH_ATTACK, ATT_PH_DEFENSE,
    ATT_SP_ATTACK, ATT_SP_DEFENSE, ATT_SPEED, ATT_LUCK, 
    MAP_SPRITE_WIDTH_IN_SHEET, MAP_SPRITE_HEIGHT_IN_SHEET,
    STRD_SPRITE_WIDTH, STRD_SPRITE_HEIGHT,
    EQUIPMENT_KEY_WEAPON, EQUIPMENT_KEY_UPPERBODY,
    EQUIPMENT_KEY_LOWERBODY, EQUIPMENT_KEY_HEAD,
    EQUIPMENT_KEY_ACCESSORY
} = require('../../game-data/globals');

class StatusMenuTab extends MenuTab {
    constructor( ) {
        super( "STATUS", "VERT", 6 )
        this.setButtonHeight( this.height / 6 );
        this.setButtonWidth( this.width / 5 );
        this.itemSubMenuOptions = [ "EQUIP", "UNEQUIP", "BACK" ];

        this.redArrow = new Image();
        this.redArrow.src = "/static/ui/red_arrow.png";
        this.redArrow.onload = ( ) => {
            this.redArrow.loaded = true;
        };

        this.greenArrow = new Image();
        this.greenArrow.src = "/static/ui/green_arrow.png";
        this.greenArrow.onload = ( ) => {
            this.greenArrow.loaded = true;
        };

        this.activeOption;
        this.activeCharacter = null;
        this.activeCharacterIndex = 0;
    }

    getEquipmentData( ) {
        return [ 
            { equipmentType: EQUIPMENT_KEY_WEAPON, item: this.activeCharacter.Equipment[EQUIPMENT_KEY_WEAPON] },
            { equipmentType: EQUIPMENT_KEY_HEAD, item: this.activeCharacter.Equipment[EQUIPMENT_KEY_HEAD] },
            { equipmentType: EQUIPMENT_KEY_ACCESSORY, item: this.activeCharacter.Equipment[EQUIPMENT_KEY_ACCESSORY] },
            { equipmentType: EQUIPMENT_KEY_UPPERBODY, item: this.activeCharacter.Equipment[EQUIPMENT_KEY_UPPERBODY] },
            { equipmentType: EQUIPMENT_KEY_LOWERBODY, item: this.activeCharacter.Equipment[EQUIPMENT_KEY_LOWERBODY] },
        ]
    }

    setButtons( ) {
        this.activeCharacter = globals.GAME.PARTY_MEMBERS[this.activeCharacterIndex];
        this.setButtonsInColumn( ( CANVAS_WIDTH * .66 ) + ( GRID_BLOCK_PX / 2 ), this.getEquipmentData( ) );
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
        if ( this.activeOption == "EQUIP" && this.modal.activeButton.item != undefined  ) {
            this.unequipItemAtActiveEquipmentSlot( );
            globals.GAME.PLAYER_INVENTORY.equipItem( this.activeCharacter, this.modal.activeButton.item.ItemTypeId );
        }
        if ( this.activeOption == "UNEQUIP" && this.modal.activeButton.text == "YES" ) {
            this.unequipItemAtActiveEquipmentSlot( );
        }
        this.unsetModal( );
        this.refreshButtonContent( );
    }

    refreshButtonContent( ) {
        const equipmentData = this.getEquipmentData( );
        this.buttons.forEach( ( button, index ) => { 
            button.updateContent( equipmentData[index] );
        })
    }

    unequipItemAtActiveEquipmentSlot( ) {
        const IdOfCurrentItem = this.activeCharacter.getItemIdOfItemInEquipmentSlot( this.activeItem );
        if ( IdOfCurrentItem != null ) {
            globals.GAME.PLAYER_INVENTORY.unequipItem( this.activeCharacter, IdOfCurrentItem );
        }
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
        }

        this.itemSubMenu.deActivate( );
    }

    draw( ) {
        this.drawLeftPanel( );
        this.drawRightPanel( );
        super.draw( );
    }

    drawLeftPanel( ) {
        // placeholder canvas drawings until we get some nice menu sprites
        drawRect( "FRONT", 
            GRID_BLOCK_PX / 2, GRID_BLOCK_PX * 2, 
            ( CANVAS_WIDTH * .66 ) - GRID_BLOCK_PX, CANVAS_HEIGHT - ( GRID_BLOCK_PX * 2 ), 
        "#FADADD" )
        
        const statusTexts = [ 
            "CHARACTER", "NAME: " + this.activeCharacter.Name, "CLASS: " + this.activeCharacter.ClassName,
            "LEVEL: " + this.activeCharacter.Level, "EXPERIENCE: " + this.activeCharacter.Experience
        ];
        statusTexts.forEach( ( text, index ) => {
            this.drawCharacterInfo( text, index)
        })

        const attributes = [ 
            ATT_HEALTH_POINTS, ATT_POWER_POINTS , ATT_PH_ATTACK, ATT_PH_DEFENSE, 
            ATT_SP_ATTACK, ATT_SP_DEFENSE, ATT_SPEED, ATT_LUCK 
        ]
        attributes.forEach( ( attribute, index ) => {
            if ( index < 2 ) {
                this.drawHealthOrPowerLine( attribute, index )
            }
            else {
                this.drawAttributeLine( attribute, index )
            }
        })
    }

    drawCharacterInfo( text, index ) {
        writeTextLine( 
            text, 
            GRID_BLOCK_PX, ( GRID_BLOCK_PX * 2 ) + ( LARGE_FONT_LINE_HEIGHT * ( index + 1 ) ), 
            LARGE_FONT_SIZE, "#000000" 
        );
    }

    drawHealthOrPowerLine( key, index ) {
        let keyTexts = {};
        keyTexts[ATT_HEALTH_POINTS] = "HP: ";
        keyTexts[ATT_POWER_POINTS] = "PP: ";

        writeTextLine( 
            keyTexts[key], GRID_BLOCK_PX, ( this.height / 2 ) + ( GRID_BLOCK_PX * 2 ) + ( LARGE_FONT_LINE_HEIGHT * ( index + 1) ), 
            LARGE_FONT_SIZE, "#000000" 
        );
        writeTextLine(
            (key == ATT_HEALTH_POINTS ? this.activeCharacter.CurrentHitpoints : this.activeCharacter.CurrentPowerpoints) + " / ", 
            GRID_BLOCK_PX * 3.5, ( this.height / 2 ) + ( GRID_BLOCK_PX * 2 ) + ( LARGE_FONT_LINE_HEIGHT * ( index + 1) ),
            LARGE_FONT_SIZE, "#000000" 
        );
        writeTextLine( 
            this.activeCharacter.activeAttributeValues[key], 
            GRID_BLOCK_PX * 4, ( this.height / 2 ) + ( GRID_BLOCK_PX * 2 ) + ( LARGE_FONT_LINE_HEIGHT * ( index + 1) ), 
            LARGE_FONT_SIZE, "#000000" 
        );
        drawFromImageToCanvas(
            "FRONT", this.greenArrow, 
            0, 0, 768, 768, 
            GRID_BLOCK_PX * 5, ( this.height / 2 ) + ( GRID_BLOCK_PX * 2 ) + ( LARGE_FONT_LINE_HEIGHT * index ) + LARGE_FONT_SIZE, 
            LARGE_FONT_SIZE, LARGE_FONT_SIZE
        );   
    }

    drawAttributeLine( key, index ) {
        const keyTexts = {};
        keyTexts[ATT_PH_ATTACK] = "PHYSICAL ATTACK:";
        keyTexts[ATT_PH_DEFENSE] = "PHYSICAL DEFENSE:";
        keyTexts[ATT_SP_ATTACK] = "SPECIAL ATTACK:";
        keyTexts[ATT_SP_DEFENSE] = "SPECIAL DEFENSE:";
        keyTexts[ATT_SPEED] = "SPEED:";
        keyTexts[ATT_LUCK] = "LUCK:";

        writeTextLine( 
            keyTexts[key], 
            GRID_BLOCK_PX, ( this.height / 2 ) + ( GRID_BLOCK_PX * 2 ) + ( LARGE_FONT_LINE_HEIGHT * ( index + 1 ) ), 
            LARGE_FONT_SIZE, "#000000" 
        );
        writeTextLine( 
            this.activeCharacter.activeAttributeValues[key], 
            GRID_BLOCK_PX * 4, ( this.height / 2 ) + ( GRID_BLOCK_PX * 2 ) + ( LARGE_FONT_LINE_HEIGHT * ( index + 1 ) ), 
            LARGE_FONT_SIZE, "#000000" 
        );
        drawFromImageToCanvas(
            "FRONT", this.greenArrow, 
            0, 0, 768, 768, 
            GRID_BLOCK_PX * 5, ( this.height / 2 ) + ( GRID_BLOCK_PX * 2 ) + ( LARGE_FONT_LINE_HEIGHT * index ) + LARGE_FONT_SIZE, 
            LARGE_FONT_SIZE, LARGE_FONT_SIZE
        );   
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