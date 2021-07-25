const { DEFAULT } = require("../../../../game-data/conditionGlobals")

const A3_SPEAK_CHAD = [
  {
    "condition": {
      "type": DEFAULT
    },
    "action": {
      "type": "TEXT",
      "sfx": "voice-1.mp3",
      "scenes": [
        { "type": "SPEAK", "text": "I sold my kidneys to pay for my new house." }
      ]
    }
  }
]

const A3_SPEAK_NERD = [
  {
    "condition": {
      "type": DEFAULT
    },
    "action" : {
      "type": "TEXT",
      "sfx": "voice-1.mp3",
      "scenes": [
        { "type": "SPEAK", "text": "I used to be a Brony, before the Great War" }
      ]
    }
  }
]

const A3_SPEAK_WOMAN = [
  {
    "condition": {
      "type": DEFAULT
    },
    "action" : {
      "type": "TEXT",
      "sfx": "voice-3.mp3",
      "scenes": [
        { "type": "SPEAK", "text": "I sold my house to pay for a new pair of kidneys." }
      ]
    }    
  }
]
const A1_SUBMAP1_SPEAK_SIR = [
  { 
    "condition": {
      "type": DEFAULT
    },
    "action" : {
      "type": "TEXT",
      "sfx": "voice-1.mp3",
      "scenes": [
        { "type": "SPEAK", "text": "Welcome to Hotel Le Canard. May I see your credit rating, please?" }
      ]
    }
  }
]

const A1_SUBMAP1_SPEAK_LADY = [
  {
    "condition": {
      "type": DEFAULT
    },
    "action" : {
      "type": "TEXT",
      "sfx": "voice-3.mp3",
      "scenes": [
        { "type": "SPEAK", "text": "Are you sure you're in the right place sir? You totally look like a hobo." }
      ]
    }    
  }
]
module.exports = {
  A3_SPEAK_CHAD, A3_SPEAK_NERD, A3_SPEAK_WOMAN, A1_SUBMAP1_SPEAK_SIR, A1_SUBMAP1_SPEAK_LADY
}