const { DEFAULT, SPEAK, SPEAK_YES_NO, EVENT_TALK } = require("../../../../game-data/conditionGlobals")

const PIDGEBERT_THUG = [
  {
    "condition" : {
      "type": DEFAULT
    },
    "action" : {
      "type": EVENT_TALK,
      "sfx": "battle-baba.mp3",
      "scenes": [
          { "type": SPEAK, "text": "If you mess with Pidgebert you mess with me!" }
      ]
    }
  }
]
  
const PIDGEBERT = [
  {
    "condition" : {
      "type": DEFAULT
    },
    "action" : {
      "type": EVENT_TALK,
      "sfx": "voice-1.mp3",
      "scenes": [
          { "type": SPEAK, "text": "Who you lookin at, shithead?" },
          { "type": SPEAK, "text": "I'm Pidgebert, the meanest pigeon in town!" },
          {
            "type": SPEAK_YES_NO, 
            "text": "Do you have problem with that, moron?",
            "pathYes": [
              { "type": SPEAK, "text": "You'll regret this when I poop on your head." }
            ],
            "pathNo": [
              { "type": SPEAK, "text": "I thought so, I'm the meanest!" }
            ]
          }
      ]
    }
  }
]
  
const PIDGEBERT_PIGEON = [
  {
    "condition" : {
      "type": DEFAULT
    },
    "action" : {
      "type": EVENT_TALK,
      "sfx": "voice-1.mp3",
      "scenes": [
          { "type": SPEAK, "text": "Pigeons of the world, unite!" }
      ]
    }
  }
]

  const PIDGEBERT_GRANDMA = [
    {
      "condition" : {
        "type": DEFAULT
      },
      "action" : {
        "type": EVENT_TALK,
        "sfx": "voice-2.mp3",
        "scenes": [
            { "type": SPEAK, "text": "Pidgebert is not like other pigeons, if you understand what I mean." }
        ]
      }
    }
  ]
  
  module.exports = {
    PIDGEBERT_THUG,
    PIDGEBERT,
    PIDGEBERT_PIGEON,
    PIDGEBERT_GRANDMA
  }