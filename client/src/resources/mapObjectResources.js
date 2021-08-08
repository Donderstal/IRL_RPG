const ONE_BLOCK_SPRITE = {
    "dimensional_alignment": "STANDARD",
    "height_blocks": 1, "width_blocks": 1
}

const TWO_WIDE_SPRITE = { 
    "dimensional_alignment": "STANDARD",
    "height_blocks": 1, "width_blocks": 2
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
        "FACING_LEFT" : [
            { "x": 0, "y": 384 },
            { "x": 0, "y": 576 }
        ],
        "FACING_UP" : [
            { "x": 0, "y": 960 },
            { "x": 128, "y": 960 }
        ],
        "FACING_RIGHT" : [
            { "x": 0, "y": 0 },
            { "x": 0, "y": 192 }
        ],
        "FACING_DOWN" : [
            { "x": 0, "y": 768 },
            { "x": 128, "y": 768 }
        ]
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
    "Bollard" :{
        "src": "bollard.png",
        ...ONE_BLOCK_SPRITE
    },
    "Bus_Stop" : {
        "src": "Bus_Stop.png",
        "dimensional_alignment": "STANDARD",
        "grounded_at_bottom": true,
        "height_blocks": 4,
        "width_blocks": 1
    },   
    "Computer_With_Table" : {
        "src": "computer_table.png",
        ...THREE_HIGH_SPRITE
    },
    "Couch_Blue" : {
        "src": "couch.png",
        ...THREE_HIGH_SPRITE
    },
    "Fire_Hydrant" :{
        "src": "fire_hydrant.png",
        ...ONE_BLOCK_SPRITE
    },
    "Fridge" : {
        "src": "fridge.png",
        "dimensional_alignment": "STANDARD",
        "height_blocks": 2,
        "width_blocks": 1
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
    "Rug_01" : { 
        "src": "rug01.png",
        "dimensional_alignment": "STANDARD",
        "on_background": true,
        "height_blocks": 4,
        "width_blocks": 3
    },
    "Single_Bed" : { 
        "src": "single_bed.png",
        "dimensional_alignment": "STANDARD",
        "height_blocks": 2,
        "width_blocks": 1
    },
    "Sink" : { 
        "src": "sink.png",
        ...THREE_HIGH_SPRITE
    },
    "Small_Table" : {
        "src": "small_table.png",
        ...ONE_BLOCK_SPRITE
    },
    "Lamppost_1" : {
        "src": "lamppost.png",
        "dimensional_alignment": "STANDARD",
        "grounded_at_bottom": true,
        "height_blocks": 5,
        "width_blocks": 1,
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
    }
}