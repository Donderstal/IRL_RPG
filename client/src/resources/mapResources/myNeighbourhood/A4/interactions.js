const { DEFAULT, SPEAK, EVENT_TALK } = require("../../../../game-data/conditionGlobals")

const A4_SUBMAP1_SPEAK_WOMAN = [
  {
    "condition" : {
      "type" : DEFAULT
    },
    "action" : {
      "type": EVENT_TALK,
      "sfx": "poo-poo.mp3",
      "scenes": [
          { "type": SPEAK, "text": "I'm always making big bucks you know. I just can't help it!" }
      ]
    }
    
  }
]
const A4_SUBMAP2_SPEAK_WOMAN = [
  {
    "condition" : {
      "type" : DEFAULT
    },
    "action" : {
      "type": EVENT_TALK,
      "sfx": "voice-3.mp3",
      "scenes": [ 
        { "type": SPEAK, "text": "I'm just here to make some money until my Instagram account takes off." }
      ]
    }
  }
]

const A4_SUBMAP2_SPEAK_GUY1 = [
  { 
    "condition" : {
      "type" : DEFAULT
    },
    "action" : {
      "type": EVENT_TALK,
      "sfx": "voice-1.mp3",
      "scenes": [
        { "type": SPEAK, "text": "You sure you want something, nerd?" },
        { "type": SPEAK, "text": "This stuff might blow your brains out!" }
      ]
    }
  }
]

const A4_SUBMAP2_SPEAK_GUY2 = [
  {
    "condition" : {
      "type" : DEFAULT
    },
    "action" : {
      "type": EVENT_TALK,
      "sfx": "voice-1.mp3",
      "scenes": [
        { "type": SPEAK, "text": "The Yum-mart sells the best 'roid in town, man!" }
      ]
    }
  }
]

const A4_SUBMAP2_SPEAK_MANAGER = [
  {
    "condition" : {
      "type" : DEFAULT
    },
    "action" : {
      "type": EVENT_TALK,
      "sfx": "voice-2.mp3",
      "scenes": [
        { "type": SPEAK, "text": "What could be better than seeing all these happy customers trust our high quality products?" }
      ]
    }
  }  
]

const A4_SUBMAP2_SPEAK_GIRL = [
  {
    "condition" : {
      "type" : DEFAULT
    },
    "action" : {
      "type": EVENT_TALK,
      "sfx": "voice-3.mp3",
      "scenes": [
        { "type": SPEAK, "text": "I wish we had a better stores than Yum-mart in our neighbourhood." }
      ]
    }
  }
]

const A4_SUBMAP2_SIGN_ACTION_SCENES = [
  {
    "type": SPEAK,
    "spriteName": "Player",
    "sfx": "typing.mp3",
    "text": "The sign reads: 'Caution! Yum-mart cannot be held responsible for any injuries caused by wet floors.'"
  }
]

const A4_SUBMAP2_SIGN_ACTION_R4C7 = [
  {
    "row": 4, "col": 7,
    "condition" : {
      "type" : DEFAULT
    },
    "action" : {
      "type": EVENT_TALK,
      "scenes": A4_SUBMAP2_SIGN_ACTION_SCENES
    }
  }
]


const A4_SUBMAP2_SIGN_ACTION_R1C11 = [
  {
    "row": 1, "col": 11,
    "condition" : {
      "type" : DEFAULT
    },
    "action" : {
      "type": EVENT_TALK,
      "scenes": A4_SUBMAP2_SIGN_ACTION_SCENES
    }
  }
]

const A4_SUBMAP2_ICECREAM_ACTION = [
  {
    "row": 2, "col": 6,
    "condition" : {
      "type" : DEFAULT
    },
    "action" : {
      "type": EVENT_TALK,
      "scenes": [
        {
          "type": SPEAK,
          "spriteName": "Player",
          "sfx": "typing.mp3",
          "text": "Now on sale: Jen and Berry's ice cream!'"
        }
      ]
    }
  }
]

const A4_SUBMAP2_VEGGIES_ACTION_SCENES = [
  {
    "type": SPEAK,
    "spriteName": "Player",
    "sfx": "typing.mp3",
    "text": "These veggies don't look that fresh..."
  }
]

const A4_SUBMAP2_VEGGIES_ACTION_R5C3 = [
  { 
    "row": 5, "col": 3,
    "condition" : {
      "type" : DEFAULT
    },
    "action" : {
      "type": EVENT_TALK,
      "scenes": A4_SUBMAP2_VEGGIES_ACTION_SCENES
    }
  }
]

const A4_SUBMAP2_VEGGIES_ACTION_R5C5 = [
  {
    "row": 5, "col": 5,
    "condition" : {
      "type" : DEFAULT
    },
    "action" : {
      "type": EVENT_TALK,
      "scenes": A4_SUBMAP2_VEGGIES_ACTION_SCENES
    }
  }
]

const A4_SUBMAP2_RODITOS_ACTION = [
  {
    "row": 8, "col": 1,
    "condition" : {
      "type" : DEFAULT
    },
    "action" : {
      "type": EVENT_TALK,
      "scenes": [
        {
          "type": SPEAK,
          "spriteName": "Player",
          "sfx": "typing.mp3",
          "text": "They're all out of Roditos."
        }
      ]
    }
    
  }
]

module.exports = {
  A4_SUBMAP1_SPEAK_WOMAN, A4_SUBMAP2_SPEAK_WOMAN, A4_SUBMAP2_SPEAK_GUY1, A4_SUBMAP2_SPEAK_GUY2, A4_SUBMAP2_SPEAK_MANAGER, A4_SUBMAP2_SPEAK_GIRL,
  A4_SUBMAP2_SIGN_ACTION_R4C7, A4_SUBMAP2_SIGN_ACTION_R1C11, A4_SUBMAP2_ICECREAM_ACTION, A4_SUBMAP2_VEGGIES_ACTION_R5C3, 
  A4_SUBMAP2_VEGGIES_ACTION_R5C5,  A4_SUBMAP2_RODITOS_ACTION
}