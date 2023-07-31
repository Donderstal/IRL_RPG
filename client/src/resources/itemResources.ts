import { ItemCategoryEnum } from "../enumerables/ItemCategoryEnum";
import { initItemModel } from "../factories/modelFactory";
import type { ItemModel } from "../models/ItemModel";

const itemData = {
    "dirty_beanie_armor_3" : {
        "name" : "Dirty beanie",
        "category" : ItemCategoryEnum.wearable,
        "png": "test-item",
        "description":
            "There's some kind of logo on this thing, but it's so faded that it's hard to make out what it says."
    },
    "kitty_necklace_armor_3" : {
        "name" : "UwU kitty necklace",
        "category" : ItemCategoryEnum.wearable,
        "png": "test-item",
        "description":
            "A dingy plastic necklace. The kitty is pretty cute though!"
    },
    "phone_misc_1" : {
        "name" : "Tekphone 12 ( broken )",
        "category" : ItemCategoryEnum.miscellaneous,
        "png": "test-item",
        "description":
            "These phones were all the rage in 2036. Seems like this one has retired early."
    },
    "key_1" : {
        "name" : "Old key",
        "category" : ItemCategoryEnum.key,
        "png": "test-item",
        "description" : "Just some key you found lying about. What could it be for?"
    }
}

export const getItemDataById = ( itemId ): ItemModel => {
    if ( itemId in itemData ) {
        const item = itemData[itemId];
        item.key = itemId;
        return initItemModel( item );
    }
    else {
        console.log("Item with id " + itemId + " cannot be found");
        return null
    }
}

export const getRandomItemOfType = ( type: ItemCategoryEnum = null ): ItemModel => {
    let itemKeys = Object.keys( itemData )
    if ( type != null ) {
        itemKeys = itemKeys.filter( ( key ) => { return itemData[key]["category"] == type;});
    }

    const randomKey = itemKeys[ Math.floor(Math.random() * itemKeys.length) ];
    let item = itemData[ randomKey ];
    item.key = randomKey;
    return initItemModel( item );
}