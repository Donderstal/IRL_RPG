const { 
    ITEM_CATEGORY_ARMOR, ITEM_CATEGORY_CONSUMABLE, 
    ITEM_CATEGORY_MISC, ITEM_CATEGORY_WEAPON, 
    ARMOR_TYPE_HEAD, ARMOR_TYPE_UPPER_BODY, 
    ARMOR_TYPE_LOWER_BODY, ARMOR_TYPE_ACCESSORY
} = require('../game-data/globals')

const itemData = {
    "melee_weapon_1" : {
        "name" : "Brass knuckles",
        "category" : ITEM_CATEGORY_WEAPON,
        "price": 20,
        "png": "test-item",
        "description": 
            "A pair of brass knuckles to up your game in fistfights. It's not much good if you're a wuss though."
    },
    "ranged_weapon_1" : {
        "name" : "Slingshot",
        "category" : ITEM_CATEGORY_WEAPON,
        "price": 20,
        "png": "test-item",
        "description": 
            "A slingshot is a very mature and intimidating weapon. Strike fear into the hearts of your enemies!"
    },
    "hp_consumable_1" : {
        "name" : "Bread sandwich",
        "category" : ITEM_CATEGORY_CONSUMABLE,
        "price": 10,
        "png": "test-item",
        "description":
            "A FoodTek Bread Sandwich has all the nutrition deficits a modern person needs!"
    },
    "shirt_armor_1" : {
        "name" : "Greasy shirt",
        "category" : ITEM_CATEGORY_ARMOR,
        "type": ARMOR_TYPE_UPPER_BODY,
        "price": 10,
        "png": "test-item",
        "description":
            "Dude, shouldn't you have cleaned this shirt before wearing it outside?"
    },
    "old_sneakers_armor_2" : {
        "name" : "Old sneaker",
        "category" : ITEM_CATEGORY_ARMOR,
        "type": ARMOR_TYPE_LOWER_BODY,
        "price": 10,
        "png": "test-item",
        "description":
            "Old sneaker with some stains on them. Is it coffee, dirt or something else?"
    },
    "dirty_beanie_armor_3" : {
        "name" : "Dirty beanie",
        "category" : ITEM_CATEGORY_ARMOR,
        "type": ARMOR_TYPE_HEAD,
        "price": 5,
        "png": "test-item",
        "description":
            "There's some kind of logo on this thing, but it's so faded that it's hard to make out what it says."
    },
    "kitty_necklace_armor_3" : {
        "name" : "Dirty beanie",
        "category" : ITEM_CATEGORY_ARMOR,
        "type": ARMOR_TYPE_ACCESSORY,
        "price": 5,
        "png": "test-item",
        "description":
            "A dingy plastic necklace. The kitty is pretty cute though!"
    },
    "phone_misc_1" : {
        "name" : "Tekphone 12 ( broken )",
        "category" : ITEM_CATEGORY_MISC,
        "price": 50,
        "png": "test-item",
        "description":
            "These phones were all the rage in 2036. Seems like this one has retired early."
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

module.exports = {
    getItemDataById
}