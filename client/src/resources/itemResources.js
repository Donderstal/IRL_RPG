const { 
    ITEM_CATEGORY_ARMOR, ITEM_CATEGORY_CONSUMABLE, 
    ITEM_CATEGORY_MISC, ITEM_CATEGORY_WEAPON, 
    ARMOR_TYPE_HEAD, ARMOR_TYPE_UPPER_BODY,
    ARMOR_TYPE_LOWER_BODY, ARMOR_TYPE_ACCESSORY,
    EFFECT_TYPE_BUFF, EFFECT_TYPE_DEBUFF, ATT_PH_ATTACK,
    ATT_PH_DEFENSE, ATT_SP_ATTACK, ATT_SP_DEFENSE, ATT_SPEED, 
    ITEM_CATEGORY_KEY, ITEM_CATEGORY_USABLE, ATT_HEALTH_POINTS, ATT_POWER_POINTS
} = require('../game-data/globals')
const {
    MOVE_TYPE_HEAL
} = require('../game-data/moveGlobals');

const itemData = {
    "melee_weapon_1" : {
        "name" : "Brass knuckles",
        "category" : ITEM_CATEGORY_WEAPON,
        "price": 20,
        "png": "test-item",
        "effects": [ 
            [ EFFECT_TYPE_BUFF, ATT_PH_ATTACK, 10 ]
        ],
        "description": 
            "A pair of brass knuckles to up your game in fistfights. It's not much good if you're a wuss though."
    },
    "ranged_weapon_1" : {
        "name" : "Slingshot",
        "category" : ITEM_CATEGORY_WEAPON,
        "price": 20,
        "png": "test-item",
        "effects": [ 
            [ EFFECT_TYPE_BUFF, ATT_SP_ATTACK, 10 ]
        ],
        "description": 
            "A slingshot is a very mature and intimidating weapon. Strike fear into the hearts of your enemies!"
    },
    "hp_consumable_1" : {
        "name" : "Bread sandwich",
        "category" : ITEM_CATEGORY_CONSUMABLE,
        "type" : MOVE_TYPE_HEAL,
        "price": 10,
        "png": "test-item",
        "effects": [ 
            [ ATT_HEALTH_POINTS, 20 ]
        ],
        "description":
            "A FoodTek Bread Sandwich has all the nutrition deficits a modern person needs!"
    },
    "pp_consumable_1" : {
        "name" : "Weird drink",
        "category" : ITEM_CATEGORY_CONSUMABLE,
        "type" : MOVE_TYPE_HEAL,
        "price": 10,
        "png": "test-item",
        "effects": [ 
            [ ATT_POWER_POINTS, 20 ]
        ],
        "description":
            "Seems to be some kind of disgusting energy drink. For some reason, it's quite popular."
    },
    "shirt_armor_1" : {
        "name" : "Greasy shirt",
        "category" : ITEM_CATEGORY_ARMOR,
        "type": ARMOR_TYPE_UPPER_BODY,
        "price": 10,
        "png": "test-item",
        "effects": [ 
            [ EFFECT_TYPE_BUFF, ATT_PH_DEFENSE, 5 ]
        ],
        "description":
            "Dude, shouldn't you have cleaned this shirt before wearing it outside?"
    },
    "shirt_armor_2" : {
        "name" : "Padded shirt",
        "category" : ITEM_CATEGORY_ARMOR,
        "type": ARMOR_TYPE_UPPER_BODY,
        "price": 10,
        "png": "test-item",
        "effects": [ 
            [ EFFECT_TYPE_BUFF, ATT_PH_DEFENSE, 10 ]
        ],
        "description":
            "Stole it at the Renaissance fair. Looks dope!"
    },
    "shirt_armor_3" : {
        "name" : "Shiny unicorn shirt",
        "category" : ITEM_CATEGORY_ARMOR,
        "type": ARMOR_TYPE_UPPER_BODY,
        "price": 10,
        "png": "test-item",
        "effects": [ 
            [ EFFECT_TYPE_BUFF, ATT_SP_DEFENSE, 10 ]
        ],
        "description":
            "There's something about this shirt that just makes it stand out. "
    },
    "lower_body_armor_1" : {
        "name" : "Old lady shoes",
        "category" : ITEM_CATEGORY_ARMOR,
        "type": ARMOR_TYPE_LOWER_BODY,
        "price": 10,
        "png": "test-item",
        "effects": [ 
            [ EFFECT_TYPE_BUFF, ATT_SP_DEFENSE, 5 ]
        ],
        "description":
            "You know those shoes that old ladies wear? This is a pair of those. Is it leather or plastic?"
    },
    "old_sneakers_armor_2" : {
        "name" : "Old sneakers",
        "category" : ITEM_CATEGORY_ARMOR,
        "type": ARMOR_TYPE_LOWER_BODY,
        "price": 10,
        "png": "test-item",
        "effects": [ 
            [ EFFECT_TYPE_BUFF, ATT_SPEED, 5 ]
        ],
        "description":
            "Old sneakers with some stains on them. Is it coffee, dirt or something else?"
    },
    "dirty_beanie_armor_3" : {
        "name" : "Dirty beanie",
        "category" : ITEM_CATEGORY_ARMOR,
        "type": ARMOR_TYPE_HEAD,
        "price": 5,
        "png": "test-item",
        "effects": [ 
            [ EFFECT_TYPE_BUFF, ATT_PH_DEFENSE, 2 ],
            [ EFFECT_TYPE_BUFF, ATT_SP_DEFENSE, 2 ]
        ],
        "description":
            "There's some kind of logo on this thing, but it's so faded that it's hard to make out what it says."
    },
    "kitty_necklace_armor_3" : {
        "name" : "UwU kitty necklace",
        "category" : ITEM_CATEGORY_ARMOR,
        "type": ARMOR_TYPE_ACCESSORY,
        "price": 5,
        "png": "test-item",
        "effects": [ 
            [ EFFECT_TYPE_DEBUFF, ATT_PH_ATTACK, 2 ],
            [ EFFECT_TYPE_BUFF, ATT_SP_ATTACK, 2 ]
        ],
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
    },
    "key_1" : {
        "name" : "Old key",
        "category" : ITEM_CATEGORY_KEY,
        "price" : 0,
        "png": "test-item",
        "description" : "Just some key you found lying about. What could it be for?"
    },
    "usable_1" : {
        "name" : "Stink bomb",
        "category" : ITEM_CATEGORY_USABLE,
        "price" : 10,
        "png" : "test-item",
        "description" : "Use this bomb to make your opponents cringe in fear and disgust!"
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