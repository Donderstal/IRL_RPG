const { 
    ITEM_CATEGORY_MISC, ITEM_CATEGORY_KEY, ITEM_CATEGORY_WEARABLE
} = require('../game-data/globals')

const itemData = {
    "dirty_beanie_armor_3" : {
        "name" : "Dirty beanie",
        "category" : ITEM_CATEGORY_WEARABLE,
        "png": "test-item",
        "description":
            "There's some kind of logo on this thing, but it's so faded that it's hard to make out what it says."
    },
    "kitty_necklace_armor_3" : {
        "name" : "UwU kitty necklace",
        "category" : ITEM_CATEGORY_WEARABLE,
        "png": "test-item",
        "description":
            "A dingy plastic necklace. The kitty is pretty cute though!"
    },
    "phone_misc_1" : {
        "name" : "Tekphone 12 ( broken )",
        "category" : ITEM_CATEGORY_MISC,
        "png": "test-item",
        "description":
            "These phones were all the rage in 2036. Seems like this one has retired early."
    },
    "key_1" : {
        "name" : "Old key",
        "category" : ITEM_CATEGORY_KEY,
        "png": "test-item",
        "description" : "Just some key you found lying about. What could it be for?"
    }
}

const getItemDataById = ( itemId ) => {
    if ( itemId in itemData ) {
        return itemData[itemId]
    }
    else {
        console.log("Item with id " + itemId + " cannot be found");
        return null
    }
}

const getRandomItemOfType = ( type = null ) => {
    let itemKeys = Object.keys( itemData )
    if ( type != null ) {
        itemKeys = itemKeys.filter( ( key ) => { return itemData[key]["category"] == type;});
    }

    const randomKey = itemKeys[ Math.floor(Math.random() * itemKeys.length) ];
    let item = itemData[ randomKey ];
    item.key = randomKey;
    return item;
}

module.exports = {
    getItemDataById,
    getRandomItemOfType
}