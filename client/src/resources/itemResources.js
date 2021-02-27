const { ITEM_CATEGORY_ARMOR, ITEM_CATEGORY_CONSUMABLE, ITEM_CATEGORY_MISC, ITEM_CATEGORY_WEAPON } = require('../game-data/globals')
const itemData = {
    "melee_weapon_1" : {
        "name" : "Brass knuckles",
        "category" : ITEM_CATEGORY_WEAPON,
        "price": 20
    },
    "ranged_weapon_1" : {
        "name" : "Slingshot",
        "category" : ITEM_CATEGORY_WEAPON,
        "price": 20
    },
    "hp_consumable_1" : {
        "name" : "Bread sandwich",
        "category" : ITEM_CATEGORY_CONSUMABLE,
        "price": 10
    },
    "shirt_armor_1" : {
        "name" : "Greasy shirt",
        "category" : ITEM_CATEGORY_ARMOR,
        "price": 10
    },
    "phone_misc_1" : {
        "name" : "Tekphone 12 ( broken )",
        "category" : ITEM_CATEGORY_MISC,
        "price": 50
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