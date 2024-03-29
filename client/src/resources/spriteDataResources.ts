import { SpriteSheetAlignmentEnum } from "../enumerables/SpriteSheetAlignmentEnum";
import { DirectionEnum } from "../enumerables/DirectionEnum";
import {
    BALD_BEER_BELLY_GUY, BLACK_PONY_TAIL_LADY, BLONDE_BEER_BELLY_GUY, BLONDE_NERD_LADY, BURLY_GUY, BUSINESS_MAN,
    CAR_MECHANIC,
    CAR_SHACK_BOSS,
    DARK_HAIR_NERD_LADY, DORKY_GUY, FAT_BUFF_GUY, FAT_FEDORA_GUY, GRANNY, GREEN_HAIR_LADY, GREEN_SHIRTED_STRONG_GUY,
    MAIN_CHARACTER, MONKEY_CEO, PIGEON, PINK_HAIRED_FAT_GUY, PINK_HAIR_NERD_LADY, POLICE_MAN_1, POLICE_MAN_1_VISOR, POLICE_MAN_2, POLICE_MAN_2_VISOR, POLICE_ROBOT, POLICE_WOMAN_1, POLICE_WOMAN_1_VISOR, ROBOT, ROBOT_BLACK, ROBOT_GREY, ROBOT_WHITE, STRONG_GUY, SUNGLASSES_LADY,
    SUPERMARKET_MANAGER, TOUGH_GUY, TOUGH_GUY_WITH_COOL_HAIR, TOUGH_GUY_WITH_COOL_SHIRT, TOUGH_GUY_WITH_DARK_HAIR,
    WHITE_PONY_TAIL_LADY, YELLOW_SHIRT_LADY
} from "./spriteTypeResources";
import type { SpriteDataModel } from "../models/SpriteDataModel";
import { getSpriteFrameForPosition } from "../helpers/modelConversionHelpers";
import { CollectableType } from "../enumerables/CollectableTypeEnum";
import { CHARACTER_IDLE_ANIMS, COLLECTABLE_ANIMS, PIGEON_IDLE_ANIMS, SIGN_HORI_ANIMS, SIGN_VERT_ANIMS } from "../game-data/animationGlobals";
import { getSpritePng } from "../assets/sprites";

const ONE_BLOCK_SPRITE = {
    "dimensional_alignment": SpriteSheetAlignmentEnum.standard,
    "height_blocks": 1, "width_blocks": 1
}

const TWO_WIDE_SPRITE = {
    "dimensional_alignment": SpriteSheetAlignmentEnum.standard,
    "height_blocks": 1, "width_blocks": 2
}

const getTwoHighSprite = ( isGrounded ) => {
    return {
        "dimensional_alignment": SpriteSheetAlignmentEnum.standard,
        "grounded_at_bottom": isGrounded,
        "height_blocks": 2,
        "width_blocks": 1
    }
}

const getGroundedAtBottom = ( width, height ) => {
    return {
        "dimensional_alignment": SpriteSheetAlignmentEnum.standard,
        "grounded_at_bottom": true,
        "height_blocks": height,
        "width_blocks": width
    }
}

const getStandard = ( width, height ) => {
    return { "dimensional_alignment": SpriteSheetAlignmentEnum.standard,
        "height_blocks": width, "width_blocks": height}
}

const THREE_HIGH_SPRITE = {
    "dimensional_alignment": SpriteSheetAlignmentEnum.standard,
    "height_blocks": 3, "width_blocks": 1
}

const POSTER_SPRITE = {
    "dimensional_alignment": SpriteSheetAlignmentEnum.standard,
    "on_background": true, "height_blocks": 1.75, "width_blocks": 1.75,
}

const STANDARD_CAR = {
    "dimensional_alignment": "HORI_VERT", "isCar": true,
    "hori_height_blocks": 3, "hori_width_blocks": 4,
    "vert_height_blocks": 3, "vert_width_blocks": 2,
    "movement_frames": {
        [DirectionEnum.left]: [
            { "x": 0, "y": 384 },
            { "x": 0, "y": 576 }
        ],
        [DirectionEnum.up]: [
            { "x": 0, "y": 960 },
            { "x": 128, "y": 960 }
        ],
        [DirectionEnum.right]: [
            { "x": 0, "y": 0 },
            { "x": 0, "y": 192 }
        ],
        [DirectionEnum.down]: [
            { "x": 0, "y": 768 },
            { "x": 128, "y": 768 }
        ]
    }
}

const BUS = {
    "dimensional_alignment": "HORI_VERT", "isCar": true,
    "hori_height_blocks": 3, "hori_width_blocks": 4,
    "vert_height_blocks": 4, "vert_width_blocks": 2,
    "movement_frames": {
        [DirectionEnum.left]: [
            { "x": 0, "y": 384 },
            { "x": 0, "y": 576 }
        ],
        [DirectionEnum.up]: [
            { "x": 0, "y": 1024 },
            { "x": 128, "y": 1024 }
        ],
        [DirectionEnum.right]: [
            { "x": 0, "y": 0 },
            { "x": 0, "y": 192 }
        ],
        [DirectionEnum.down]: [
            { "x": 0, "y": 768 },
            { "x": 128, "y": 768 }
        ]
    }
}

const STANDARD_SHELVE = {
    "dimensional_alignment": SpriteSheetAlignmentEnum.standard,
    "width_blocks": 2,
    "height_blocks": 2,
    "grounded_at_bottom": true
}

const STANDARD_CHARACTER = {
    "dimensional_alignment": SpriteSheetAlignmentEnum.standard,
    "height_blocks": 1.75,
    "width_blocks": 1,
    "grounded_at_bottom": true,
    "is_character": true,
    "idle_animation": true,
    "idle_animations": CHARACTER_IDLE_ANIMS,
    "movement_frames": {
        [DirectionEnum.left]: [
            { "x": 0, "y": 112 },
            { "x": 64, "y": 112},
            { "x": 128, "y": 112 },
            { "x": 192, "y": 112 },
        ],
        [DirectionEnum.up]: [
            { "x": 0, "y": 336 },
            { "x": 64, "y": 336 },
            { "x": 128, "y": 336 },
            { "x": 192, "y": 336 }
        ],
        [DirectionEnum.right]: [
            { "x": 0, "y": 224 },
            { "x": 64, "y": 224 },
            { "x": 128, "y": 224 },
            { "x": 192, "y": 224 }
        ],
        [DirectionEnum.down]: [
            { "x": 0, "y": 0 },
            { "x": 64, "y": 0 },
            { "x": 128, "y": 0 },
            { "x": 192, "y": 0 },
        ]
    }
}

const getBackgroundItem = ( width, height ) => {
    return {
        "dimensional_alignment": SpriteSheetAlignmentEnum.standard,
        "on_background": true,
        "height_blocks": height,
        "width_blocks": width
    }
}

const getDoorOrWindow = ( width, height ) => {
    return {
        ...getBackgroundItem( width, height ),
        "door_or_window": true
    }
}


const getSignData = ( widthInBlocks, heightInBlocks, name ) => {
    return {
        "dimensional_alignment": SpriteSheetAlignmentEnum.standard,
        "width_blocks": widthInBlocks,
        "height_blocks": heightInBlocks,
        "not_grounded": true,
        "idle_animation": true,
        "idle_animations": name
    }
}

const getPosterData = ( widthInBlocks, heightInBlocks, name ) => {
    return {
        "dimensional_alignment": SpriteSheetAlignmentEnum.standard,
        "width_blocks": widthInBlocks,
        "height_blocks": heightInBlocks,
        "on_background": true,
        "idle_animation": true,
        "idle_animations": name
    }
}

const getCollectible = ( widthInBlocks, heightInBlocks, name, collectable_type ) => {
    return {
        "dimensional_alignment": SpriteSheetAlignmentEnum.standard,
        "height_blocks": heightInBlocks,
        "width_blocks": widthInBlocks,
        "collectable_type": collectable_type,
        "idle_animation": true,
        "idle_animations": name
    }
}

const getStandardDoorEast = ( src ) => {
    return {
        "src": src,
        ...getDoorOrWindow( 0.34375, 2.0625 )
    }
}

const getStandardDoorNorth = ( src ) => {
    return {
        "src": src,
        ...getDoorOrWindow( 1, .25 )
    }
}

const getStandardDoorWest = ( src ) => {
    return {
        "src": src,
        "tile_alignment": DirectionEnum.right,
        ...getDoorOrWindow( 0.34375, 2.0625 )
    }
}

const getStandardDoorSouth = ( src ) => {
    return {
        "src": src,
        ...getDoorOrWindow( 1, 1.53125 )
    }
}

const BAR_VERTICAL = {
    "dimensional_alignment": "STANDARD",
    "width_blocks": 1.8125,
    "height_blocks": 3.90625
}

const BAR_HORIZONTAL = {
    "dimensional_alignment": "STANDARD",
    "width_blocks": 5,
    "height_blocks": 2.28125
}

export const spriteData = {
    "banana": {
        "src": "Banana.png",
        ...getBackgroundItem( .5, .40625 )
    },
    "bar": {
        "src": "bar.png",
        ...getGroundedAtBottom( 9, 9 )
    },
    "Bar_A": {
        "src": "Bar_A.png",
        ...BAR_HORIZONTAL
    },
    "Bar_B": {
        "src": "Bar_B.png",
        ...BAR_HORIZONTAL
    },
    "Bar_C": {
        "src": "Bar_C.png",
        ...BAR_VERTICAL
    },
    "Bar_D": {
        "src": "Bar_D.png",
        ...BAR_VERTICAL
    },
    "bar_versionB": {
        "src": "bar_versionB.png",
        ...getGroundedAtBottom( 9, 4 )
    },
    "bar_lights": {
        "src": "bar_lights.png",
        ...getSignData( 4, 1, SIGN_HORI_ANIMS )
    },
    "bar_sign": {
        "src": "bar_sign.png",
        ...getSignData( 3, 2, SIGN_HORI_ANIMS )
    },
    "bar_sign_old": {
        "src": "bar_sign_old.png",
        ...getSignData( 1.8125, 1, SIGN_VERT_ANIMS )
    },
    "bar_stool": {
        "src": "bar_stool.png",
        ...getGroundedAtBottom( 0.625, 0.9375 )
    },
    "bench_a": {
        "src": "bench_a.png",
        ...TWO_WIDE_SPRITE
    },
    "Bench_Green": {
        "src": "bench_green.png",
        ...TWO_WIDE_SPRITE
    },
    "big_coffee_cup_left": {
        "src": "big_coffee_cup_left.png",
        "dimensional_alignment": SpriteSheetAlignmentEnum.standard,
        "height_blocks": 2,
        "width_blocks": 2,
        "not_grounded": true
    },
    "big_coffee_cup_right": {
        "src": "big_coffee_cup_right.png",
        "dimensional_alignment": SpriteSheetAlignmentEnum.standard,
        "height_blocks": 2,
        "width_blocks": 2,
        "not_grounded": true
    },
    "bin_a": {
        "src": "bin_a.png",
        ...ONE_BLOCK_SPRITE
    },
    "bin_hop": {
        "src": "bin_hop.png",
        ...ONE_BLOCK_SPRITE
    },
    "bin_x": {
        "src": "bin_x.png",
        ...ONE_BLOCK_SPRITE
    },
    "block": {
        "src": "Block.png",
        ...getBackgroundItem( 0.4375, 0.46875 )
    },
    "blue_couch_right": {
        "src": "blue_couch_right.png",
        ...THREE_HIGH_SPRITE
    },
    "blue_couch_north": {
        "src": "blue_couch_north.png",
        "dimensional_alignment": SpriteSheetAlignmentEnum.standard,
        "height_blocks": 1.3125, "width_blocks": 2.53125
    },
    "blue_couch_south": {
        "src": "blue_couch_south.png",
        "dimensional_alignment": SpriteSheetAlignmentEnum.standard,
        "height_blocks": 1.65625, "width_blocks": 2.53125
    },
    "blue_double_bed": {
        "src": "blue_double_bed.png",
        "dimensional_alignment": SpriteSheetAlignmentEnum.standard,
        "height_blocks": 2, "width_blocks": 2
    },
    "blue_lamp_left": {
        "src": "blue_lamp_left.png",
        ...getTwoHighSprite( true )
    },
    "blue_lamp_right": {
        "src": "blue_lamp_right.png",
        ...getTwoHighSprite( true )
    },
    "blue_single_bed": {
        "src": "blue_single_bed.png",
        ...getTwoHighSprite( false )
    },
    "boarded_window": {
        "src": "Boarded_Window.png",
        ...getBackgroundItem( 1.15625, 1.34375 )
    },
    "bolard_x": {
        "src": "bolard_x.png",
        ...ONE_BLOCK_SPRITE
    },
    "Bollard": {
        "src": "bollard.png",
        ...ONE_BLOCK_SPRITE
    },
    "boxes": {
        "src": "boxes.png",
        "dimensional_alignment": SpriteSheetAlignmentEnum.standard,
        "width_blocks": 2.09375,
        "height_blocks": 1.46875,
        "grounded_at_bottom": true
    },
    "bottle": {
        "src": "bottle.png",
        "dimensional_alignment": "STANDARD",
        "width_blocks": 0.15625,
        "height_blocks": 0.40625,
        "on_background": true
    },
    "bottle_hologram": {
        "src": "bottle_hologram.png",
        "dimensional_alignment": "STANDARD",
        "width_blocks": 1.125,
        "height_blocks": 1.15625,
        "not_grounded": true
    },
    "brown_chair" :{
        "src": "brown_chair.png",
        ...getGroundedAtBottom( 1, 1 )
    },
    "brown_chair_east" :{
        "src": "brown_chair_east.png",
        ...getGroundedAtBottom( 1, 1 )
    },
    "brown_chair_north" :{
        "src": "brown_chair_north.png",
        ...getGroundedAtBottom( 1, 1 )
    },
    "brown_chair_west" :{
        "src": "brown_chair_west.png",
        ...getGroundedAtBottom( 1, 1 )
    },
    "Bus_Stop": {
        "src": "Bus_Stop.png",
        "dimensional_alignment": SpriteSheetAlignmentEnum.standard,
        "grounded_at_bottom": true,
        "height_blocks": 4,
        "width_blocks": 1,
    },
    "cafe": {
        "src": "cafe.png",
        ...getGroundedAtBottom( 8, 8 )
    },
    "can_red_1": {
        "src": "Can_Z1.png",
        ...getBackgroundItem( 0.28125, 0.3125 )
    },
    "can_orange_1": {
        "src": "Can_Z2.png",
        ...getBackgroundItem( 0.28125, 0.3125 )
    },
    "cashier_desk_a": {
        "src": "cashier_desk_a.png",
        "dimensional_alignment": SpriteSheetAlignmentEnum.standard,
        "width_blocks": 1,
        "height_blocks": 2.5625,
    },
    "cashier_desk_b": {
        "src": "cashier_desk_b.png",
        ...getGroundedAtBottom( 3, 1.75 ),
    },
    "cashier_desk_c": {
        "src": "cashier_desk_c.png",
        "dimensional_alignment": SpriteSheetAlignmentEnum.standard,
        "width_blocks": 1,
        "height_blocks": 2.5625,
    },
    "chair_red_cushion": {
        "src": "chair_red_cushion.png",
        ...ONE_BLOCK_SPRITE
    },
    "chair_red_cushion_west": {
        "src": "chair_red_cushion_west.png",
        ...ONE_BLOCK_SPRITE
    },
    "chair_red_cushion_east": {
        "src": "chair_red_cushion_east.png",
        ...ONE_BLOCK_SPRITE
    },
    "chair_red_cushion_north": {
        "src": "chair_red_cushion_north.png",
        ...ONE_BLOCK_SPRITE
    },
    "computer_table": {
        "src": "computer_table.png",
        ...getTwoHighSprite( true )
    },
    "computer_table_with_chair": {
        "src": "computer_table_with_chair.png",
        ...getGroundedAtBottom( 1, 3 )
    },
    "Couch_Blue": {
        "src": "couch.png",
        ...THREE_HIGH_SPRITE
    },
    "couch_nice_left": {
        "src": "couch_nice_left.png",
        ...THREE_HIGH_SPRITE
    },
    "couch_nice_north": {
        "src": "couch_nice_north.png",
        "dimensional_alignment": SpriteSheetAlignmentEnum.standard,
        "grounded_at_bottom": true,
        "width_blocks": 2.28125,
        "height_blocks": 1.34375
    },
    "couch_nice_right": {
        "src": "couch_nice_right.png",
        ...THREE_HIGH_SPRITE
    },
    "couch_nice_south": {
        "src": "couch_nice_south.png",
        "dimensional_alignment": SpriteSheetAlignmentEnum.standard,
        "grounded_at_bottom": true,
        "width_blocks": 2.28125,
        "height_blocks": 1.59375
    },
    "couch_yello": {
        "src": "couch_yello.png",
        ...THREE_HIGH_SPRITE
    },
    "cover": {
        "src": "cover.png",
        ...getBackgroundItem( 0.8125, 0.78125 )
    },
    "crisps": {
        "src": "crisps.png",
        ...getBackgroundItem( 0.5, 0.46875 )
    },
    "detail": {
        "src": "detail.png",
        ...getBackgroundItem( 3.71875, 0.28125 )
    },
    "detail_door_top_left": {
        "src": "detail_Z2.png",
        ...getBackgroundItem( 0.3125, 0.78125 )
    },
    "detail_door_top_right": {
        "src": "detail_Z3.png",
        ...getBackgroundItem( 0.3125, 0.78125 )
    },
    "door_1": {
        "src": "Door_Z1.png",
        ...getDoorOrWindow( 1, 1.625 )
    },
    "door_2": {
        "src": "Door_Z2.png",
        ...getDoorOrWindow( 1, 1.8125 )
    },
    "door_3": {
        "src": "Door_Z3.png",
        ...getDoorOrWindow( 1, 1.75 )
    },
    "door_4": {
        "src": "Door_Z4.png",
        ...getDoorOrWindow( 1, 1.625 )
    },
    "door_5": {
        "src": "Door_Z5.png",
        ...getDoorOrWindow( 1.96875, 2.84375 )
    },
    "door_6": {
        "src": "Door_Z6.png",
        ...getDoorOrWindow( 1.96875, 2.4375 )
    },
    "door_7": {
        "src": "Door_Z7.png",
        ...getDoorOrWindow( 1.875, 2.09375 )
    },
    "elevator_door": {
        "src": "elevator_door.png",
        ...getDoorOrWindow( 1.21875, 1.71875 )
    },
    "flowers_a": {
        "src": "flowers_a.png",
        ...getGroundedAtBottom( 1.9375, 1.96875 ),
    },
    "Fire_Hydrant": {
        "src": "fire_hydrant.png",
        ...ONE_BLOCK_SPRITE
    },
    "Fridge": {
        "src": "Fridge.png",
        ...getTwoHighSprite( true )
    },
    "funz": {
        "src": "funz.png",
        ...getBackgroundItem( 2.375, 1.46875 )
    },
    "gang_z": {
        "src": "gang_z.png",
        ...getBackgroundItem( 3.46875, 1.6875 )
    },
    "gate_left": {
        "src": "gate_left.png",
        ...ONE_BLOCK_SPRITE
    },
    "gate_right": {
        "src": "gate_right.png",
        ...ONE_BLOCK_SPRITE
    },
    "gate_stuk1": {
        "src": "gate_stuk1.png",
        ...ONE_BLOCK_SPRITE,
        "blockedArea": {
            "left": 0,
            "top": 0.6875,
            "right": 1,
            "bottom": 1
        }
        // border - bottom = h20px w100%
    },
    "gate_stuk2": {
        "src": "gate_stuk2.png",
        ...TWO_WIDE_SPRITE,
        "blockedArea": {
            "left": 0,
            "top": 0.6875,
            "right": 2,
            "bottom": 1
        }
        // border - bottom = h20px w100%
    },
    "gate_stuk3": {
        "src": "gate_stuk3.png",
        ...ONE_BLOCK_SPRITE,
        "blockedArea": {
            "left": 0.6875,
            "top": 0,
            "right": 1,
            "bottom": 1
        }
        // border - bottom/right = h100% w20px
    },
    "gate_stuk4": {
        "src": "gate_stuk4.png",
        ...ONE_BLOCK_SPRITE,
        "blockedArea": {
            "left": 0.6875,
            "top": 0,
            "right": 1,
            "bottom": 1
        }
        // border - right = h100% w20px
    },
    "gate_stuk5": {
        "src": "gate_stuk5.png",
        ...getTwoHighSprite( false ),
        "blockedArea": {
            "left": 0.6875,
            "top": 0,
            "right": 1,
            "bottom": 2
        }
        // border - right = h100% w20px
    },
    "gate_stuk6": {
        "src": "gate_stuk6.png",
        ...ONE_BLOCK_SPRITE,
        "blockedArea": {
            "left": 0.6875,
            "top": 0.875,
            "right": 1,
            "bottom": 1
        }
        // border - right/bottom = h8px w20px
    },
    "gate_stuk7": {
        "src": "gate_stuk7.png",
        ...ONE_BLOCK_SPRITE,
        "blockedArea": {
            "left": 0.6875,
            "top": 0.375,
            "right": 1,
            "bottom": 1
        }
        // border - right/bottom = h40px w20px
    },
    "gate_stuk8": {
        "src": "gate_stuk8.png",
        ...ONE_BLOCK_SPRITE,
        "blockedArea": {
            "left": 0.6875,
            "top": 0.6875,
            "right": 1,
            "bottom": 1
        }
        // border - right/bottom = h20px w20px
    },
    "gate_stuk9": {
        "src": "gate_stuk9.png",
        ...ONE_BLOCK_SPRITE,
        "blockedArea": {
            "left": 0,
            "top": 0,
            "right": 0.3125,
            "bottom": 1
        }
        // border - left/bottom = h100% w20px
    },
    "gate_stuk10": {
        "src": "gate_stuk10.png",
        ...ONE_BLOCK_SPRITE,
        "blockedArea": {
            "left": 0,
            "top": 0,
            "right": 0.3125,
            "bottom": 1
        }
        // border - left = h100% w20px
    },
    "gate_stuk11": {
        "src": "gate_stuk11.png",
        ...getTwoHighSprite( false ),
        "blockedArea": {
            "left": 0,
            "top": 0,
            "right": 0.3125,
            "bottom": 2
        }
        // border - left = h100% w20px
    },
    "gate_stuk12": {
        "src": "gate_stuk12.png",
        ...ONE_BLOCK_SPRITE,
        "blockedArea": {
            "left": 0,
            "top": 0.875,
            "right": 0.3125,
            "bottom": 1
        }
        // border - left = h8px w20px
    },
    "gate_stuk13": {
        "src": "gate_stuk13.png",
        ...ONE_BLOCK_SPRITE,
        "blockedArea": {
            "left": 0,
            "top": 0.375,
            "right": 0.3125,
            "bottom": 1
        }
        // border - left = h40px w20px
    },
    "gate_stuk14": {
        "src": "gate_stuk14.png",
        ...ONE_BLOCK_SPRITE,
        "blockedArea": {
            "left": 0,
            "top": 0.6875,
            "right": 0.3125,
            "bottom": 1
        }
        // border - left/top = h20px w20px
    },
    "glass": {
        "src": "glass.png",
        "dimensional_alignment": "STANDARD",
        "width_blocks": 0.15625,
        "height_blocks": 0.3125,
        "on_background": true
    },
    "graff_z1": {
        "src": "Graff_Z1.png",
        ...getBackgroundItem( 1.3125, 1.125 )
    },
    "hotel_sign": {
        "src": "hotel_sign.png",
        ...getSignData( 1, 2.21875, SIGN_HORI_ANIMS)
    },
    "house_plant": {
        "src": "house_plant.png",
        ...getTwoHighSprite( false )
    },
    "inside_bin": {
        "src": "inside_bin.png",
        ...getGroundedAtBottom( 1, 1 )
    },
    "Jukebox": {
        "src": "Jukebox.png",
        ...getGroundedAtBottom( 1.1875, 1.90625 )
    },
    "lamp_red": {
        "src": "lamp_red.png",
        ...getTwoHighSprite( true )
    },
    "Lamppost_1": {
        "src": "lamppost.png",
        "dimensional_alignment": SpriteSheetAlignmentEnum.standard,
        "grounded_at_bottom": true,
        "height_blocks": 5,
        "width_blocks": 1,
    },
    "magazine_rack_a": {
        "src": "magazine_rack_a.png",
        ...getGroundedAtBottom( 2, 1.75 ),
    },
    "magazine_rack_b": {
        "src": "magazine_rack_b.png",
        ...getGroundedAtBottom( 1.78125, 1.15625 ),
    },
    "newspaper_trash": {
        "src": "newspaper.png",
        ...getBackgroundItem( 0.625, 0.4375 )
    },
    "no_entry_sign": {
        "src": "no_entry.png",
        "dimensional_alignment": SpriteSheetAlignmentEnum.standard,
        "grounded_at_bottom": true,
        "height_blocks": 1.375,
        "width_blocks": 2,
    },
    "office_chair": {
        "src": "office_chair.png",
        ...getTwoHighSprite( true )
    },
    "office_chair_south": {
        "src": "office_chair_south.png",
        "dimensional_alignment": SpriteSheetAlignmentEnum.standard,
        "grounded_at_bottom": true,
        "height_blocks": 1.21875,
        "width_blocks": 0.96875
    },
    "phone_table": {
        "src": "phone_table.png",
        ...ONE_BLOCK_SPRITE
    },
    "pillar_round_bottom_shaft": {
        "src": "pillar_z1.png",
        ...getGroundedAtBottom( 0.59375, 2.59375 )
    },
    "pillar_round_whole": {
        "src": "pillar_z2.png",
        ...getGroundedAtBottom( 0.59375, 3.03125 )
    },
    "pillar_round_top_shaft": {
        "src": "pillar_z3.png",
        ...getGroundedAtBottom( 0.59375, 1.4375 )
    },
    "pillar_round_top_peak": {
        "src": "pillar_z4.png",
        ...getGroundedAtBottom( 0.59375, 0.4375 )
    },
    "pillar_square_bottom_shaft": {
        "src": "pillar_z6.png",
        ...getGroundedAtBottom( 0.59375, 1.5 )
    },
    "pillar_square_whole": {
        "src": "pillar_z5.png",
        ...getGroundedAtBottom( 0.59375, 2.875 )
    },
    "pillar_square_top_shaft": {
        "src": "pillar_z7.png",
        ...getGroundedAtBottom( 0.59375, 1.4375 )
    },
    "pillar_square_middle_shaft": {
        "src": "pillar_z8.png",
        ...getGroundedAtBottom( 0.59375, 1.46875 )
    },
    "plant_yo": {
        "src": "plant_yo.png",
        ...getTwoHighSprite( true )
    },
    "plants": {
        "src": "plants.png",
        ...getTwoHighSprite( false )
    },
    "pot_plant_a": {
        "src": "pot_plant_a.png",
        ...ONE_BLOCK_SPRITE
    },
    "Poster_Cruise": {
        "src": "poster1.png",
        ...POSTER_SPRITE
    },
    "Poster_Cola": {
        "src": "poster2.png",
        ...POSTER_SPRITE
    },
    "Poster_Gronk": {
        "src": "poster3.png",
        ...POSTER_SPRITE
    },
    "Rug_01": {
        "src": "rug01.png",
        "dimensional_alignment": SpriteSheetAlignmentEnum.standard,
        "on_background": true,
        ...getBackgroundItem( 3, 4 )
    },
    "rug_boo": {
        "src": "rug_boo.png",
        ...getBackgroundItem( 3, 2 )
    },
    "rug_g1": {
        "src": "rug_g1.png",
        ...getBackgroundItem( 2, 2 )
    },
    "rug_g2": {
        "src": "rug_g2.png",
        ...getBackgroundItem( 2, 2 )
    },
    "shelves_a": {
        "src": "shelves_a.png",
        ...STANDARD_SHELVE,
    },
    "shelves_b": {
        "src": "shelves_b.png",
        ...STANDARD_SHELVE,
    },
    "shelves_c": {
        "src": "shelves_c.png",
        ...STANDARD_SHELVE,
    },
    "shelves_d": {
        "src": "shelves_d.png",
        ...STANDARD_SHELVE,
    },
    "shelves_e": {
        "src": "shelves_e.png",
        ...STANDARD_SHELVE,
    },
    "shelves_f": {
        "src": "shelves_f.png",
        ...getGroundedAtBottom( 2, 2.40625 ),
    },
    "shelves_side_a": {
        "src": "shelves_side_a.png",
        "tile_alignment": DirectionEnum.right,
        "dimensional_alignment": SpriteSheetAlignmentEnum.standard,
        "height_blocks": 3,
        "width_blocks": 0.84375
    },
    "shelves_side_b": {
        "src": "shelves_side_b.png",
        "dimensional_alignment": SpriteSheetAlignmentEnum.standard,
        "height_blocks": 3,
        "width_blocks": 0.5
    },
    "shelves_side_c": {
        "src": "shelves_side_c.png",
        "dimensional_alignment": SpriteSheetAlignmentEnum.standard,
        "height_blocks": 5,
        "width_blocks": 0.5
    },
    "shelves_side_d": {
        "src": "shelves_side_d.png",
        "dimensional_alignment": SpriteSheetAlignmentEnum.standard,
        "height_blocks": 3,
        "width_blocks": 0.84375
    },
    "shop_cupboard_a": {
        "src": "shop_cupboard_a.png",
        ...STANDARD_SHELVE
    },
    "shop_front": {
        "src": "Shop_front_Z1.png",
        ...getBackgroundItem( 2.53125, 2.375 )
    },
    "shop_shelves_a": {
        "src": "shop_shelves_a.png",
        ...STANDARD_SHELVE,
    },
    "shop_shelves_b": {
        "src": "shop_shelves_b.png",
        ...STANDARD_SHELVE,
    },
    "shop_window": {
        "src": "shop_window.png",
        ...getBackgroundItem( 3.53125, 1.96875 )
    },
    "Sign_01": {
        "src": "sign1.png",
        ...getPosterData( 1, 1.75, SIGN_HORI_ANIMS )
    },
    "Sign_02": {
        "src": "sign2.png",
        ...getPosterData( 1, 1.75, SIGN_HORI_ANIMS )
    },
    "Sign_03": {
        "src": "sign3.png",
        ...getPosterData( 1, 1, SIGN_HORI_ANIMS )
    },
    "Sign_04": {
        "src": "sign4.png",
        ...getPosterData( 1, 1, SIGN_HORI_ANIMS )
    },
    "Single_Bed": {
        "src": "single_bed.png",
        ...getTwoHighSprite( false )
    },
    "single_bed_north": {
        "src": "single_bed_north.png",
        ...getTwoHighSprite( false )
    },
    "single_bed_side": {
        "src": "single_bed_side.png",
        "dimensional_alignment": SpriteSheetAlignmentEnum.standard,
        "width_blocks": 1.5,
        "height_blocks": 1.3125
    },
    "Sink": {
        "src": "sink.png",
        ...THREE_HIGH_SPRITE
    },
    "Small_Table": {
        "src": "small_table.png",
        ...getGroundedAtBottom( 1, 1 )
    },
    "stairs_1": {
        "src": "Stairs_section1.png",
        ...getBackgroundItem( 1, 1 )
    },
    "stairs_2": {
        "src": "Stairs_section2.png",
        ...getBackgroundItem( 1, 2 )
    },
    "stairs_3": {
        "src": "Stairs_section3.png",
        ...getBackgroundItem( 1, 1 )
    },
    "stairs_4": {
        "src": "Stairs_section4.png",
        ...getBackgroundItem( 1, 3 )
    },
    "stairs_5": {
        "src": "Stairs_section5.png",
        ...getBackgroundItem( 1, 3 )
    },
    "stairs_6": {
        "src": "Stairs_section6.png",
        ...getBackgroundItem( 1, 3 )
    },
    "stairs_7": {
        "src": "Stairs_section7.png",
        ...getBackgroundItem( 1, 1 )
    },
    "stairs_8": {
        "src": "Stairs_section8.png",
        ...getBackgroundItem( 1, 1 )
    },
    "tableA": {
        "src": "tableA.png",
        ...getGroundedAtBottom( 1, 1.1875 )
    },
    "tableB": {
        "src": "tableD.png",
        ...getGroundedAtBottom( 1, 1.1875 )
    },
    "tableC": {
        "src": "tableC.png",
        ...getGroundedAtBottom( 1, 1.1875 )
    },
    "tableD": {
        "src": "tableD.png",
        ...getGroundedAtBottom( 1, 1.1875 )
    },
    "tires_1": {
        "src": "Tires_Z1.png",
        "dimensional_alignment": SpriteSheetAlignmentEnum.standard,
        "width_blocks": 0.84375,
        "height_blocks": 0.90625
    },
    "tires_2": {
        "src": "Tires_Z2.png",
        "dimensional_alignment": SpriteSheetAlignmentEnum.standard,
        "width_blocks": 0.78125,
        "height_blocks": 0.6875
    },
    "thing_a": {
        "src": "thing_a.png",
        "dimensional_alignment": SpriteSheetAlignmentEnum.standard,
        "height_blocks": 3,
        "width_blocks": 1
    },
    "thing_b": {
        "src": "thing_b.png",
        "dimensional_alignment": SpriteSheetAlignmentEnum.standard,
        "height_blocks": 2.015625,
        "width_blocks": 1
    },
    "toilet": {
        "src": "toilet.png",
        ...getGroundedAtBottom( 0.6875, 1.25 ),
    },
    "toilet_left": {
        "src": "toilet_left.png",
        ...getGroundedAtBottom( 1, 1.0625 ),
    },
    "toilet_right": {
        "src": "toilet_right.png",
        "tile_alignment": DirectionEnum.right,
        ...getGroundedAtBottom( 1, 1.0625 ),
    },
    "trash_1": {
        "src": "Trash_Z1.png",
        ...getBackgroundItem( 0.375, 0.28125 )
    },
    "trash_2": {
        "src": "Trash_Z2.png",
        ...getBackgroundItem( 0.40625, 0.21875 )
    },
    "trash_3": {
        "src": "Trash_Z3.png",
        ...getBackgroundItem( 0.46875, 0.3125 )
    },
    "trash_4": {
        "src": "Trash_Z4.png",
        ...getBackgroundItem( 0.5625, 0.53125 )
    },
    "tree": {
        "src": "tree.png",
        ...getGroundedAtBottom( 2, 3 )
    },
    "tree_plus_base": {
        "src": "tree_plus_base.png",
        ...getGroundedAtBottom( 2, 3 )
    },
    "tv": {
        "src": "tv.png",
        "dimensional_alignment": SpriteSheetAlignmentEnum.standard,
        "width_blocks": 1.34375,
        "height_blocks": 1.5625
    },
    "tv_side": {
        "src": "tv_side.png",
        "dimensional_alignment": SpriteSheetAlignmentEnum.standard,
        "width_blocks": 0.625,
        "height_blocks": 1.84375
    },
    "urinal": {
        "src": "urinal.png",
        ...getGroundedAtBottom( 0.6875, 1.09375 ),
    },
    "urinal_left": {
        "src": "urinal_left.png",
        ...getGroundedAtBottom( 0.53125, 1.03125 ),
    },
    "urinal_right": {
        "src": "urinal_right.png",
        "tile_alignment": DirectionEnum.right,
        ...getGroundedAtBottom( 0.53125, 1.03125 ),
    },
    "vegetables_a": {
        "src": "vegetables_a.png",
        ...THREE_HIGH_SPRITE
    },
    "vegetables_b": {
        "src": "vegetables_b.png",
        ...THREE_HIGH_SPRITE
    },
    "vegetables_c": {
        "src": "vegetables_c.png",
        ...getGroundedAtBottom( 1, 1.125 ),
    },
    "vegetables_d": {
        "src": "vegetables_d.png",
        ...getGroundedAtBottom( 1, 1.125 ),
    },
    "vent_1": {
        "src": "Vent_Z1.png",
        ...getBackgroundItem( 0.65625, 0.40625 )
    },
    "vent_2": {
        "src": "Vent_Z2.png",
        ...getBackgroundItem( 0.46875, 0.375 )
    },
    "vent_3": {
        "src": "Vent_Z3.png",
        ...getBackgroundItem( 0.84375, 0.8125 )
    },
    "vent_4": {
        "src": "Vent_Z4.png",
        ...getBackgroundItem( 0.84375, 0.8125 )
    },
    "vent_5": {
        "src": "Vent_Z5.png",
        ...getBackgroundItem( 0.65625, 0.5625 )
    },
    "wall_thing": {
        "src": "wall_thing.png",
        ...getGroundedAtBottom( 2, 1.625 ),
    },
    "wall_thing_b": {
        "src": "wall_thing_b.png",
        ...getGroundedAtBottom( 1, 1.625 ),
    },
    "wall_thing_c": {
        "src": "wall_thing_c.png",
        ...getGroundedAtBottom( 0.5, 1.625 ),
    },
    "water_puddle": {
        "src": "water_puddle.png",
        ...getBackgroundItem( 1, 1 )
    },
    "wheelie_bin_left": {
        "src": "wheelie_bin_Z1.png",
        "dimensional_alignment": SpriteSheetAlignmentEnum.standard,
        "width_blocks": 1.25,
        "height_blocks": 1.9375
    },
    "wheelie_bin_right": {
        "src": "wheelie_bin_Z2.png",
        "dimensional_alignment": SpriteSheetAlignmentEnum.standard,
        "width_blocks": 1.25,
        "height_blocks": 1.9375
    },
    "window_1": {
        "src": "Window_Z1.png",
        ...getDoorOrWindow( 1, 1.0625 )
    },
    "window_2": {
        "src": "Window_Z2.png",
        ...getDoorOrWindow( 1, 1.15625 )
    },
    "window_3": {
        "src": "Window_Z3.png",
        ...getDoorOrWindow( 1, 1.15625 )
    },
    "window_4": {
        "src": "Window_Z4.png",
        ...getDoorOrWindow( 1.59375, 1.15625 )
    },
    "window_5": {
        "src": "Window_Z5.png",
        ...getDoorOrWindow( 1, 1.15625 )
    },
    "window_6": {
        "src": "Window_Z6.png",
        ...getDoorOrWindow( 1, 1.15625 )
    },
    "window_7": {
        "src": "Window_Z7.png",
        ...getDoorOrWindow( 1.15625, 1 )
    },
    "window_8": {
        "src": "Window_Z8.png",
        ...getDoorOrWindow( 2.3125, 1.78125 )
    },
    "window_9": {
        "src": "Window_Z9.png",
        ...getDoorOrWindow( 1.15625, 1.3125 )
    },
    "window_10": {
        "src": "Window_Z10.png",
        ...getDoorOrWindow( 1, 1.3125 )
    },
    "yellow_chair": {
        "src": "yellow_chair.png",
        ...STANDARD_SHELVE
    },
    "yellow_lamp": {
        "src": "yellow_lamp.png",
        ...getTwoHighSprite( true )
    },
    "yellow_rug_a": {
        "src": "yellow_rug_a.png",
        ...getBackgroundItem( 4, 3 )
    },
    "yellow_rug_b": {
        "src": "yellow_rug_b.png",
        ...getBackgroundItem( 3, 2 )
    },
    "yellow_stand": {
        "src": "yellow_stand.png",
        ...ONE_BLOCK_SPRITE
    },
    "yum_mart_sign": {
        "src": "yum_mart.png",
        ...getBackgroundItem( 3.46875, 0.65625 )
    },

    // store shelves and fridges
    "Grocery-Shelves-Small-Side": {
        "src": "Grocery-Shelves-Small-Side.png",
        "dimensional_alignment": SpriteSheetAlignmentEnum.standard,
        "height_blocks": 2,
        "width_blocks": 0.5
    },
    "Grocery-Shelves-Large-Side": {
        "src": "Grocery-Shelves-Large-Side.png",
        "dimensional_alignment": SpriteSheetAlignmentEnum.standard,
        "height_blocks": 3,
        "width_blocks": 0.5
    },
    "Grocery-Shelves-Bread": {
        "src": "Grocery-Shelves-Bread.png",
        ...getTwoHighSprite( true )
    },
    "Grocery-Shelves-Small-A": {
        "src": "Grocery-Shelves-Small-A.png",
        ...getTwoHighSprite( true )
    },
    "Grocery-Shelves-Small-B": {
        "src": "Grocery-Shelves-Small-B.png",
        ...getTwoHighSprite( true )
    },
    "Grocery-Shelves-Small-Back": {
        "src": "Grocery-Shelves-Small-Back.png",
        ...getTwoHighSprite( true )
    },
    "Grocery-Shelves-Small-C": {
        "src": "Grocery-Shelves-Small-C.png",
        ...getTwoHighSprite( true )
    },
    "Store-Fridge-Drinks-A": {
        "src": "Store-Fridge-Drinks-A.png",
        ...getTwoHighSprite( true )
    },
    "Store-Fridge-Drinks-B": {
        "src": "Store-Fridge-Drinks-B.png",
        ...getTwoHighSprite( true )
    },
    "Store-Fridge-Small-A": {
        "src": "Store-Fridge-Small-A.png",
        ...getTwoHighSprite( true )
    },
    "Store-Fridge-Small-B": {
        "src": "Store-Fridge-Small-B.png",
        ...getTwoHighSprite( true )
    },
    "Store-Fridge-Small-C": {
        "src": "Store-Fridge-Small-C.png",
        ...getTwoHighSprite( true )
    },
    "Grocery-Shelves-Large-A": {
        "src": "Grocery-Shelves-Large-A.png",
        ...getGroundedAtBottom( 2, 2 )
    },
    "Grocery-Shelves-Large-B": {
        "src": "Grocery-Shelves-Large-B.png",
        ...getGroundedAtBottom( 2, 2 )
    },
    "Grocery-Shelves-Large-Back": {
        "src": "Grocery-Shelves-Large-Back.png",
        ...getGroundedAtBottom( 2, 2 )
    },
    "Grocery-Shelves-Large-C": {
        "src": "Grocery-Shelves-Large-C.png",
        ...getGroundedAtBottom( 2, 2 )
    },
    "Store-Fridge-Large-A": {
        "src": "Store-Fridge-Large-A.png",
        ...getGroundedAtBottom( 2, 2 )
    },
    "Store-Fridge-Large-B": {
        "src": "Store-Fridge-Large-B.png",
        ...getGroundedAtBottom( 2, 2 )
    },
    "Store-Fridge-Large-C": {
        "src": "Store-Fridge-Large-C.png",
        ...getGroundedAtBottom( 2, 2 )
    },
    "Store-Fridge-Dairy-Back": {
        "src": "Store-Fridge-Dairy-Back.png",
        ...getTwoHighSprite( true )
    },
    "Store-Fridge-Dairy-Large-Back": {
        "src": "Store-Fridge-Dairy-Large-Back.png",
        ...getGroundedAtBottom( 2, 2 )
    },

    // cars
    "car_a": {
        "src": "car_a.png",
        ...STANDARD_CAR
    },
    "car_a_colour_b": {
        "src": "car_a_colour_b.png",
        ...STANDARD_CAR
    },
    "car_b": {
        "src": "car_b.png",
        ...STANDARD_CAR
    },
    "car_b_colour_b": {
        "src": "car_b_colour_b.png",
        ...STANDARD_CAR
    },

    "car_c": {
        "src": "car_c.png",
        ...STANDARD_CAR
    },
    "car_d": {
        "src": "car_d.png",
        ...STANDARD_CAR
    },
    "car_police": {
        "src": "car_police.png",
        ...STANDARD_CAR
    },
    "bus": {
        "src": "bus.png",
        ...BUS
    },

    // collectible
    "collectable_coin": {
        "src": "coin.png",
        ...getCollectible( 0.75, 0.75, COLLECTABLE_ANIMS, CollectableType.coin )
    },
    "collectable_juice_can": {
        "src": "juice_can.png",
        ...getCollectible( 0.5625, 0.78125, COLLECTABLE_ANIMS, CollectableType.can )
    },

    // doors new
    // West
    "door_interior_west_blue": {
        ...getStandardDoorWest( "Door_interior_west_blue.png" )
    },
    "door_interior_west_green": {
        ...getStandardDoorWest( "Door_interior_west_green.png" )
    },
    "door_interior_west_light": {
        ...getStandardDoorWest( "Door_interior_west_light.png" )
    },

    // North
    "door_interior_north_blue": {
        ...getStandardDoorNorth( "Door_interior_north_blue.png" )
    },
    "door_interior_north_green": {
        ...getStandardDoorNorth( "Door_interior_north_green.png" )
    },
    "door_interior_north_light": {
        ...getStandardDoorNorth( "Door_interior_north_light.png" )
    },

    // East
    "door_interior_east_blue": {
        ...getStandardDoorEast( "Door_interior_east_blue.png" )
    },
    "door_interior_east_green": {
        ...getStandardDoorEast( "Door_interior_east_green.png" )
    },
    "door_interior_east_light": {
        ...getStandardDoorEast( "Door_interior_east_light.png" )
    },

    // South
    "door_interior_south_blue": {
        ...getStandardDoorSouth( "Door_interior_south_blue.png" )
    },
    "door_interior_south_green": {
        ...getStandardDoorSouth( "Door_interior_south_green.png" )
    },
    "door_interior_south_light": {
        ...getStandardDoorSouth( "Door_interior_south_light.png" )
    },

    // characters
    [FAT_FEDORA_GUY]: {
        "src": "neckbeard.png",
        ...STANDARD_CHARACTER
    },
    [TOUGH_GUY]: {
        "src": "chad.png",
        ...STANDARD_CHARACTER
    },
    [SUNGLASSES_LADY]: {
        "src": "woman.png",
        ...STANDARD_CHARACTER
    },
    [GRANNY]: {
        "src": "characterx3.png",
        ...STANDARD_CHARACTER
    },
    [TOUGH_GUY_WITH_COOL_HAIR]: {
        "src": 'characterx5.png',
        ...STANDARD_CHARACTER
    },
    [PIGEON]: {
        "src": "pigeon.png",
        ...STANDARD_CHARACTER,
        "idle_animations": PIGEON_IDLE_ANIMS
    },
    [BUSINESS_MAN]: {
        "src": "business_man.png",
        ...STANDARD_CHARACTER
    },
    [STRONG_GUY]: {
        "src": "chad_recolour01.png",
        ...STANDARD_CHARACTER
    },
    [BURLY_GUY]: {
        "src": "chad_recolour02.png",
        ...STANDARD_CHARACTER
    },
    [GREEN_SHIRTED_STRONG_GUY]: {
        "src": "chad_recolour03.png",
        ...STANDARD_CHARACTER
    },
    [DORKY_GUY]: {
        "src": "character_x1_recolour01.png",
        ...STANDARD_CHARACTER
    },
    [TOUGH_GUY_WITH_DARK_HAIR]: {
        "src": "characterx4.png",
        ...STANDARD_CHARACTER
    },
    [TOUGH_GUY_WITH_COOL_SHIRT]: {
        "src": "characterx5_recolour.png",
        ...STANDARD_CHARACTER
    },
    [FAT_BUFF_GUY]: {
        "src": "fats.png",
        ...STANDARD_CHARACTER
    },
    [BALD_BEER_BELLY_GUY]: {
        "src": "generic_balding_guy.png",
        ...STANDARD_CHARACTER
    },
    [BLONDE_BEER_BELLY_GUY]: {
        "src": "generic_blonde_guy.png",
        ...STANDARD_CHARACTER
    },
    [PINK_HAIRED_FAT_GUY]: {
        "src": "fats_recolour.png",
        ...STANDARD_CHARACTER
    },
    [YELLOW_SHIRT_LADY]: {
        "src": "new_girl.png",
        ...STANDARD_CHARACTER
    },
    [GREEN_HAIR_LADY]: {
        "src": "new_girl_recolour.png",
        ...STANDARD_CHARACTER
    },
    [SUPERMARKET_MANAGER]: {
        "src": "manager.png",
        ...STANDARD_CHARACTER
    },
    [MONKEY_CEO]: {
        "src": "monkey_ceo.png",
        ...STANDARD_CHARACTER
    },
    [WHITE_PONY_TAIL_LADY]: {
        "src": "pony_tail.png",
        ...STANDARD_CHARACTER
    },
    [BLACK_PONY_TAIL_LADY]: {
        "src": "pony_tail_recolour.png",
        ...STANDARD_CHARACTER
    },
    [ROBOT]: {
        "src": "robot.png",
        ...STANDARD_CHARACTER
    },
    [ROBOT_BLACK]: {
        "src": "Robot_black.png",
        ...STANDARD_CHARACTER
    },
    [ROBOT_GREY]: {
        "src": "Robot_grey.png",
        ...STANDARD_CHARACTER
    },
    [ROBOT_WHITE]: {
        "src": "Robot_white.png",
        ...STANDARD_CHARACTER
    },
    [PINK_HAIR_NERD_LADY]: {
        "src": "tumblr_girl.png",
        ...STANDARD_CHARACTER
    },
    [BLONDE_NERD_LADY]: {
        "src": "tumbler_girl_recolour01.png",
        ...STANDARD_CHARACTER
    },
    [DARK_HAIR_NERD_LADY]: {
        "src": "tumbler_girl_recolour02.png",
        ...STANDARD_CHARACTER
    },
    [MAIN_CHARACTER]: {
        "src": "Main_Character.png",
        ...STANDARD_CHARACTER
    },
    [POLICE_MAN_1]: {
        "src": "police_man_1.png",
        ...STANDARD_CHARACTER
    },
    [POLICE_MAN_2]: {
        "src": "police_man_2.png",
        ...STANDARD_CHARACTER
    },
    [POLICE_WOMAN_1]: {
        "src": "police_woman_1.png",
        ...STANDARD_CHARACTER
    },
    [POLICE_MAN_1_VISOR]: {
        "src": "police_man_1_visor.png",
        ...STANDARD_CHARACTER
    },
    [POLICE_MAN_2_VISOR]: {
        "src": "police_man_2_visor.png",
        ...STANDARD_CHARACTER
    },
    [POLICE_WOMAN_1_VISOR]: {
        "src": "police_woman_1_visor.png",
        ...STANDARD_CHARACTER
    },
    [POLICE_ROBOT]: {
        "src": "police-robot.png",
        ...STANDARD_CHARACTER
    },
    [CAR_MECHANIC]: {
        ...STANDARD_CHARACTER,
        "src": "car-mechanic-li.png"
    },
    [CAR_SHACK_BOSS]: {
        ...STANDARD_CHARACTER,
        "src": "car_shack_boss.png"
    }
}

export const initializeDataModels = (): void => {
    spriteDataModels = Object.entries( spriteData ).map( ( e ) => {
        const key = e[0];
        const value = e[1];
        const src = "/static/sprites/" + value["src"];
        let model: SpriteDataModel = null;

        model = {
            key: key,
            src: src,
            image: getSpritePng(src),
            dimensionalAlignment: value["dimensional_alignment"] as SpriteSheetAlignmentEnum,

            isCar: value["isCar"] !== undefined && value["isCar"],
            isCharacter: value["is_character"] !== undefined || value["is_character"],
            idleAnimation: value["idle_animation"] !== undefined || value["idle_animation"],
            canMove: value["movement_frames"] !== undefined,
            onBackground: value["on_background"] !== undefined || value["on_background"],
            notGrounded: value["not_grounded"] !== undefined || value["not_grounded"],
            groundedAtBottom: value["grounded_at_bottom"] !== undefined || value["grounded_at_bottom"],
            hasBlockedArea: value["blockedArea"] !== undefined || value["blockedArea"],
            isCollectable: value["collectable_type"] !== undefined || value["collectable_type"]
        };

        if ( value["dimensional_alignment"] == SpriteSheetAlignmentEnum.standard ) {
            model.widthBlocks = value["width_blocks"];
            model.heightBlocks = value["height_blocks"];
        }
        else if ( value["dimensional_alignment"] == SpriteSheetAlignmentEnum.horiVert ) {
            model.horiWidthBlocks = value["hori_width_blocks"];
            model.horiHeightBlocks = value["hori_height_blocks"];
            model.vertWidthBlocks = value["vert_width_blocks"];
            model.vertHeightBlocks = value["vert_height_blocks"];
        }

        if ( model.canMove ) {
            const dto = value["movement_frames"];
            const frames = {
                [DirectionEnum.left]: dto[DirectionEnum.left].map( ( e ) => { return getSpriteFrameForPosition( e, model ) } ),
                [DirectionEnum.up]: dto[DirectionEnum.up].map( ( e ) => { return getSpriteFrameForPosition( e, model ) } ),
                [DirectionEnum.right]: dto[DirectionEnum.right].map( ( e ) => { return getSpriteFrameForPosition( e, model ) } ),
                [DirectionEnum.down]: dto[DirectionEnum.down].map( ( e ) => { return getSpriteFrameForPosition( e, model ) } )
            }
            model.canMove = true;
            model.movementFrames = frames
        }

        if ( model.idleAnimation ) {
            model.idleAnimations = value["idle_animations"];
        }

        if ( model.isCollectable ) {
            model.collectableType = value["collectable_type"];
        }
        if ( value["tile_alignment"] !== undefined ) {
            model.tileAlignment = value["tile_alignment"];
        }

        if ( model.hasBlockedArea ) {
            model.blockedArea = value["blockedArea"];
        }

        return model;
    } )
}

let spriteDataModels: SpriteDataModel[] = null;

export const getDataModelByKey = ( key: string ): SpriteDataModel => {
    const filteredModels = spriteDataModels.filter( ( e ) => { return e.key === key } );
    if ( filteredModels.length === 1 ) {
        return filteredModels[0];
    }
    else {
        console.log(`Datamodel with key ${key} cannot be found.`)
        return null;
    }
}