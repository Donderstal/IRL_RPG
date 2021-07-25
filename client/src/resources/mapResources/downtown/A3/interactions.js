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
      ]
    }
  }
]
  
  module.exports = {
    BUS_TO_FIRST_NEIGHBOURHOOD
  }