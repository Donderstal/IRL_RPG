module.exports = {
    "Lamppost_1" : {
        "src": "lamppost.png",
        "dimensional_alignment": "STANDARD",
        "height_blocks": 5,
        "width_blocks": 1,
        "alignment": "BOTTOM_LEFT" ,
        "base_width_px": 22
    },
    "Bus_Stop" : {
        "src": "Bus_Stop.png",
        "dimensional_alignment": "STANDARD",
        "height_blocks": 4,
        "width_blocks": 1,
        "alignment": "BOTTOM_LEFT" ,
        "base_width_px": 32
    },
    "Car_A" : {
        "src": "car_a.png",
        "dimensional_alignment": "HORI_VERT",
        "hori_height_blocks": 3,
        "hori_width_blocks": 4,
        "vert_height_blocks": 3,
        "vert_width_blocks": 2,
        "alignment": "BOTTOM_LEFT",
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
}