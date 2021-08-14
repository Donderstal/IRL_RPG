const { DEFAULT } = require("../../../../game-data/conditionGlobals")

const BUS_TO_DOWTOWN = [
  {
    "condition": {
      "type": DEFAULT
    },
    "action" : {
      "type": "BUS",
      "to": "downtown/A3",
      "scenes": [
          {
            "type": "SPEAK_YES_OR_NO",
            "spriteName": "Player",
            "sfx": "typing.mp3",
            "text": "Shall I take the bus downtown?",
            "pathYes": [
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
              {
                  "type": "MOVE_CAR", "col": 1,
                  "sprite": "bus.png", "direction": "FACING_LEFT",
                  "spriteName": "bus-test", "roadId": "road_1"
              },
              { "type": "FADE_SCREEN_OUT_IN", "sfx": "misc/random6.wav" }
          ],
          }
      ]
    }
  }
]

const A2_TALKING_CHAD = [
  {
    "condition": {
      "type": DEFAULT
    },
    "action" : {
      "type": "TEXT",
      "sfx": "voice-1.mp3",
      "scenes": [
        { "type": "SPEAK", "text": "Could you piss off?" },
        { "type": "SPEAK", "text": "Can't you see I'm minding my own business?" }
      ]
    }    
  }
]

const A2_TALKING_NECKBEARD = [
  {
    "condition" : {
      "type": DEFAULT
    },
    "action" : {
      "type": "TEXT",
      "sfx": "mauww.mp3",
      "scenes": [
        { "type": "SPEAK", "text": "I'm an aspiring ninja, m'lady." }
      ]
    }
  }
]

const A2_TALKING_GIRL = [
  {
    "condition" : {
      "type": DEFAULT
    },
    "action" : {
      "type": "TEXT",
      "sfx": "poo-poo.mp3",
      "scenes": [
        { "type": "SPEAK", "text": "I used to date a level 24 Darkmage." }
      ]
    }
  }
]

const A2_TALKING_ROBOT = [
  {
    "condition" : {
      "type": DEFAULT
    },
    "action" : {
      "type": "TEXT",
      "sfx": "typing.mp3",
      "scenes": [
        { "type": "SPEAK", "text": "Hello, potential customer!" }
      ]
    }
  }
]

const A2_SUBMAP1_WOMAN = [
  {
    "condition" : {
      "type": DEFAULT
    },
    "action" : {
      "type": "TEXT",
      "sfx": "poo-poo.mp3",
      "scenes": [
        { "type": "SPEAK", "text": "There's this weird neckbeard in the back alley trying to connect my to my internet." }
      ]
    }
  }
]

const A2_SUBMAP1_ACTION_BIN  = [
  {
    "row": 6,
    "col": 1,
    "condition" : {
      "type": DEFAULT
    },
    "action" : {
      "type": "TEXT",
      "scenes": [
        {
          "type": "SPEAK",
          "spriteName": "Player",
          "sfx": "typing.mp3",
          "text": "Is there a used condom in this bin?"
        }
      ]
    }
  }
]

const A2_SUBMAP3_WIFIGUY = [
  {
    "condition" : {
      "type": DEFAULT
    },
    "action" : {
      "type": "TEXT",
      "sfx": "voice-3.mp3",
      "scenes": [
        { "type": "SPEAK", "text": "The Wifi here sucks, man" }
      ]
    }
  }
]

const A2_SUBMAP2_LIFTING_CHAD = [
  {
    "condition" : {
      "type": DEFAULT
    },
    "action" : {
      "type": "TEXT",
      "sfx": "voice-1.mp3",
      "scenes": [
        { "type": "SPEAK", "text": "Do you even lift, bro?"}
      ]
    }
  }
]

module.exports = {
  BUS_TO_DOWTOWN, A2_SUBMAP2_LIFTING_CHAD, A2_TALKING_CHAD, A2_TALKING_NECKBEARD, A2_TALKING_GIRL, A2_TALKING_ROBOT, A2_SUBMAP1_WOMAN, A2_SUBMAP1_ACTION_BIN, A2_SUBMAP3_WIFIGUY, 
}