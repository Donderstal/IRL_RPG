const { FACING_RIGHT, FACING_LEFT, FACING_UP, FACING_DOWN } = require("../game-data/globals")

const ONE_BLOCK_SPRITE = {
    "dimensional_alignment": "STANDARD",
    "height_blocks": 1, "width_blocks": 1
}

const TWO_WIDE_SPRITE = { 
    "dimensional_alignment": "STANDARD",
    "height_blocks": 1, "width_blocks": 2
}

const getTwoHighSprite = ( isGrounded ) => {
    return {
        "dimensional_alignment": "STANDARD",
        "grounded_at_bottom": isGrounded,
        "height_blocks": 2,
        "width_blocks": 1
    }
}

const THREE_HIGH_SPRITE = {
    "dimensional_alignment": "STANDARD",
    "height_blocks": 3, "width_blocks": 1
}

const POSTER_SPRITE = {
    "dimensional_alignment": "STANDARD", "not_grounded": true,
    "height_blocks": 1.75, "width_blocks": 1.75,
}

const STANDARD_CAR = {
    "dimensional_alignment": "HORI_VERT", "isCar" : true,
    "hori_height_blocks": 3, "hori_width_blocks": 4,
    "vert_height_blocks": 3, "vert_width_blocks": 2,
    "movement_frames" : { 
        [FACING_LEFT] : [
            { "x": 0, "y": 384 },
            { "x": 0, "y": 576 }
        ],
        [FACING_UP] : [
            { "x": 0, "y": 960 },
            { "x": 128, "y": 960 }
        ],
        [FACING_RIGHT] : [
            { "x": 0, "y": 0 },
            { "x": 0, "y": 192 }
        ],
        [FACING_DOWN] : [
            { "x": 0, "y": 768 },
            { "x": 128, "y": 768 }
        ]
    }
}

const BUS = {
    "dimensional_alignment": "HORI_VERT", "isCar" : true,
    "hori_height_blocks": 3, "hori_width_blocks": 6,
    "vert_height_blocks": 4, "vert_width_blocks": 3,
    "movement_frames" : {
        [FACING_LEFT] : [
            { "x": 0, "y": 384 },
            { "x": 0, "y": 576 }
        ],
        [FACING_UP] : [
            { "x": 0, "y": 1024 },
            { "x": 192, "y": 1024 }
        ],
        [FACING_RIGHT] : [
            { "x": 0, "y": 0 },
            { "x": 0, "y": 192 }
        ],
        [FACING_DOWN] : [
            { "x": 0, "y": 768 },
            { "x": 192, "y": 768 }
        ]
    }
    
}

const STANDARD_SHELVE = {
    "dimensional_alignment": "STANDARD",
    "width_blocks": 2,
    "height_blocks": 2,
    "grounded_at_bottom": true
}

const getBackgroundItem = ( width, height ) => {
    return {
        "dimensional_alignment": "STANDARD",
        "on_background": true,
        "height_blocks": height,
        "width_blocks": width
    }
}

const getSignData = ( heightInBlocks ) => {
    return {
        "dimensional_alignment": "STANDARD",
        "height_blocks": heightInBlocks,
        "width_blocks": 1,
        "not_grounded": true,
        "idle_animation": true
    }
}

module.exports = {
    "bench_a" :{
        "src": "bench_a.png",
        ...TWO_WIDE_SPRITE
    },
    "Bench_Green" :{
        "src": "bench_green.png",
        ...TWO_WIDE_SPRITE
    },
    "bin_a" :{
        "src": "bin_a",
        ...ONE_BLOCK_SPRITE
    },
    "bin_hop" :{
        "src": "bin_hop.png",
        ...ONE_BLOCK_SPRITE
    },
    "bin_x" :{
        "src": "bollard.png",
        ...ONE_BLOCK_SPRITE
    },
    "blue_couch_right" : {
        "src": "blue_couch_right.png",
        ...THREE_HIGH_SPRITE
    },
    "blue_double_bed" : {
        "src": "blue_double_bed.png",
        "dimensional_alignment": "STANDARD",
        "height_blocks": 2, "width_blocks": 2
    },
    "blue_lamp_left" : {
        "src": "blue_lamp_left.png",
        ...getTwoHighSprite( true )
    },
    "blue_lamp_right" : {
        "src": "blue_lamp_right.png",
        ...getTwoHighSprite( true )
    },
    "blue_lamp_right" : {
        "src": "blue_single_bed.png",
        ...getTwoHighSprite( false )
    },
    "bolard_x" :{
        "src": "bolard_x.png",
        ...ONE_BLOCK_SPRITE
    },
    "Bollard" :{
        "src": "bollard.png",
        ...ONE_BLOCK_SPRITE
    },
    "brown_chair" :{
        "src": "brown_chair.png",
        ...ONE_BLOCK_SPRITE
    },
    "Bus_Stop" : {
        "src": "Bus_Stop.png",
        "dimensional_alignment": "STANDARD",
        "grounded_at_bottom": true,
        "height_blocks": 4,
        "width_blocks": 1
    },   
    "chair_red_cushion" :{
        "src": "chair_red_cushion.png",
        ...ONE_BLOCK_SPRITE
    },
    "computer_table" : {
        "src": "computer_table.png",
        ...getTwoHighSprite( false )
    },
    "Couch_Blue" : {
        "src": "couch.png",
        ...THREE_HIGH_SPRITE
    },
    "couch_nice_left" : {
        "src": "couch_nice_left.png",
        ...THREE_HIGH_SPRITE
    },
    "couch_nice_right" : {
        "src": "couch_nice_right.png",
        ...THREE_HIGH_SPRITE
    },
    "couch_yello" : {
        "src": "couch_yello.png",
        ...THREE_HIGH_SPRITE
    },
    "Fire_Hydrant" :{
        "src": "fire_hydrant.png",
        ...ONE_BLOCK_SPRITE
    },
    "Fridge" : {
        "src": "Fridge.png",
        ...getTwoHighSprite( false )
    },
    "gate_left" : {
        "src": "gate_left.png",
        ...ONE_BLOCK_SPRITE
    },
    "gate_right" : {
        "src": "gate_right.png",
        ...ONE_BLOCK_SPRITE
    },
    "house_plant" : {
        "src": "house_plant.png",
        ...getTwoHighSprite( false )
    },
    "inside_bin" : {
        "src": "inside_bin.png",
        ...ONE_BLOCK_SPRITE
    },
    "lamp_red" : {
        "src": "lamp_red.png",
        ...getTwoHighSprite( true )
    },
    "Lamppost_1" : {
        "src": "lamppost.png",
        "dimensional_alignment": "STANDARD",
        "grounded_at_bottom": true,
        "height_blocks": 5,
        "width_blocks": 1,
    },
    "office_chair" : {
        "src": "office_chair.png",
        ...getTwoHighSprite( false )
    },
    "phone_table" : {
        "src": "phone_table.png",
        ...ONE_BLOCK_SPRITE
    },
    "plant_yo" : {
        "src": "plant_yo.png",
        ...getTwoHighSprite( false )
    },
    "pot_plant_a" : {
        "src": "pot_plant_a.png",
        ...ONE_BLOCK_SPRITE
    },
    "Poster_Cruise" : {
        "src": "poster1.png",
        ...POSTER_SPRITE
    },
    "Poster_Cola" : {
        "src": "poster2.png",
        ...POSTER_SPRITE
    },
    "Poster_Gronk" : {
        "src": "poster3.png",
        ...POSTER_SPRITE
    },
    "Rug_01" : { 
        "src": "rug01.png",
        "dimensional_alignment": "STANDARD",
        "on_background": true,
        ...getBackgroundItem( 3, 4 )
    },
    "rug_boo" : { 
        "src": "rug_boo.png",
        ...getBackgroundItem( 3, 2 )
    },
    "rug_g1" : { 
        "src": "rug_g1.png",
        ...getBackgroundItem( 2, 2 )
    },
    "rug_g2" : { 
        "src": "rug_g2.png",
        ...getBackgroundItem( 2, 2 )
    },
    "shop_cupboard_a" : {
        "src": "shop_cupboard_a.png",
        ...STANDARD_SHELVE
    },
    "shop_shelves_a" : {
        "src": "shop_shelves_a.png",
        ...STANDARD_SHELVE
    },
    "shop_shelves_b" : {
        "src": "shop_shelves_b.png",
        ...STANDARD_SHELVE
    },
    "Sign_01" : {
        "src": "sign1.png",
        ...getSignData( 1.75 )
    },
    "Sign_02" : {
        "src": "sign2.png",
        "dimensional_alignment": "STANDARD",
        ...getSignData( 1.75 )
    },
    "Sign_03" : {
        "src": "sign3.png",
        "dimensional_alignment": "STANDARD",
        ...getSignData( 1 )
    },
    "Sign_04" : {
        "src": "sign4.png",
        "dimensional_alignment": "STANDARD",
        ...getSignData( 1 )
    },
    "Single_Bed" : { 
        "src": "single_bed.png",
        ...getTwoHighSprite( false )
    },
    "Sink" : { 
        "src": "sink.png",
        ...THREE_HIGH_SPRITE
    },
    "Small_Table" : {
        "src": "small_table.png",
        ...ONE_BLOCK_SPRITE
    },
    "yellow_chair" : {
        "src": "yellow_chair",
        ...STANDARD_SHELVE
    },
    "yellow_lamp" : {
        "src": "yellow_lamp.png",
        ...getTwoHighSprite( true )
    },
    "yellow_rug_a" : { 
        "src": "yellow_rug_a.png",
        ...getBackgroundItem( 4, 3 )
    },
    "yellow_rug_a" : { 
        "src": "yellow_rug_a.png",
        ...getBackgroundItem( 3, 2 )
    },
    "yellow_stand" : { 
        "src": "yellow_stand.png",
        ...ONE_BLOCK_SPRITE
    },
    // cars
    "car_a" : {
        "src": "car_a.png",
        ...STANDARD_CAR
    },
    "car_b" : {
        "src": "car_b.png",
        ...STANDARD_CAR
    },
    "car_c" : {
        "src": "car_c.png",
        ...STANDARD_CAR
    },
    "car_d" : {
        "src": "car_d.png",
        ...STANDARD_CAR
    },
    "bus" : {
        "src": "bus.png",
        ...BUS
    }
}