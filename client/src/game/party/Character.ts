import type { ItemModel } from '../../models/ItemModel';
import type { SpriteDataModel } from '../../models/SpriteDataModel';
import { getItemDataById } from '../../resources/itemResources';
import { getDataModelByKey } from '../../resources/spriteDataResources';

export class Character {
    Id: string;
    Name: string;
    EquippedItemId: string;
    SpriteModel: SpriteDataModel; 
    ClassName: string;
    Sfx: HTMLAudioElement;
    Skill: string;

    constructor( name: string, className: string, id: string ) { 
        this.SpriteModel = getDataModelByKey( className );
        this.Id = id;
        this.Name = name;
        this.ClassName = className;
    }

    get equippedItem(): ItemModel { return getItemDataById( this.EquippedItemId ); }

    unequipItem( ): void {
        this.EquippedItemId = null;
    }

    equipItem( itemToEquip: string ): void {
        this.EquippedItemId = itemToEquip;
    }
}