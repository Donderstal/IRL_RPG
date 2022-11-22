import { ItemCategoryEnum } from '../../enumerables/ItemCategoryEnum';
import { getItemDataById } from '../../resources/itemResources';
import { getUiImage } from '../../assets/ui';

const uiSpritesFolder = "/static/ui/"
/**
 * The GameItem class is the base class for all items in the game.
 * The ItemTypeId corresponds to an object key in the itemResources file
 * Its in-game use is dependent on the Type and Category properties.
 */
export class GameItem {
    ItemTypeId: string;
    Name: string;
    Category: ItemCategoryEnum;
    SpriteSrc: string;
    Description: string;
    Image: HTMLImageElement;
    constructor( itemTypeId ) {

        const data = getItemDataById( itemTypeId )

        this.ItemTypeId = itemTypeId;
        this.Name       = data.name;
        this.Category   = data.category;
        this.SpriteSrc  = data.png;
        this.Description= data.description;
        this.Image = getUiImage( uiSpritesFolder + this.SpriteSrc + ".png" );
    }
    get canBeEquipped( ): boolean { 
        return this.Category === ItemCategoryEnum.wearable; 
    };
    get isKey(): boolean {
        return this.Category === ItemCategoryEnum.key;
    };
}