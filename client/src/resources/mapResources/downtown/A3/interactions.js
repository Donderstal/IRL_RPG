const { DEFAULT } = require("../../../../game-data/conditionGlobals")

const BUS_TO_FIRST_NEIGHBOURHOOD = [
  {
    "condition" : {
      "type": DEFAULT
    },
    "action" : {
      "type": "BUS",
      "to": "my-neighbourhood/A2",
      "scenes": [
          {
            "type": "SPEAK_YES_OR_NO",
            "spriteName": "Player",
            "sfx": "typing.mp3",
            "text": "Shall I take the bus to my neighbourhood?"
          }
      ],
      "events": [
        {
          "trigger": "ON_LEAVE",
          "scenes": [
            {
              "type": "CREATE_CAR", 
              "sprite": "bus.png", "direction": "FACING_LEFT",
              "spriteName": "bus-test", "roadId": "road_1"
            },
            {
                "type": "MOVE_CAR", "col": 20,
                "sprite": "bus.png", "direction": "FACING_LEFT",
                "spriteName": "bus-test", "roadId": "road_1"
            },
            { 
                "type": "MOVE", "spriteName": "Player",
                "destination": { "row": 10, "col": 20 }
            },
            { 
                "type": "DELETE_SPRITE", "spriteName": "Player" 
            },
            { "type": "WAIT", "ms": 500 },
            {
                "type": "MOVE_CAR", "col": 1,
                "sprite": "bus.png", "direction": "FACING_LEFT",
                "spriteName": "bus-test", "roadId": "road_1"
            },
            { "type": "FADE_SCREEN_OUT", "sfx": "misc/random6.wav" }
          ]
        },
        {
          "trigger": "ON_ENTER",
          "scenes": [
            { "type": "FADE_SCREEN_IN" },
            {
              "type": "CREATE_CAR", 
              "sprite": "bus.png", "direction": "FACING_LEFT",
              "spriteName": "bus-test", "roadId": "road_1"
            },
            {
              "type": "MOVE_CAR", "col": 20,
              "sprite": "bus.png", "direction": "FACING_LEFT",
              "spriteName": "bus-test", "roadId": "road_1"
            },
            { "type": "WAIT", "ms": 500 },
            {
              "type": "CREATE_SPRITE", "direction": "FACING_DOWN",
              "spriteName": "Player", "row": 8, "col": 18,
            },
            { "type": "WAIT", "ms": 500 },
            {
              "type": "MOVE_CAR", "col": 1,
              "sprite": "bus.png", "direction": "FACING_LEFT",
              "spriteName": "bus-test", "roadId": "road_1"
            }
          ]
        }
      ]
    }
  }
]
  
  module.exports = {
    BUS_TO_FIRST_NEIGHBOURHOOD
  }