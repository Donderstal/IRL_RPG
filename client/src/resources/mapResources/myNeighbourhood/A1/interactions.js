const { 
  TEST_CLASSNAME_2, TEST_CLASSNAME_10, TEST_CLASSNAME_14, TEST_CLASSNAME_15, TEST_CLASSNAME_16
 } = require('../../../../game-data/globals')

const A1_MY_HOUSE_COMPUTER_ACTION = {
  "row": 6, "col": 1, "type": "TEXT",
  "scenes": [
    {
      "type": "SPEAK",
      "spriteName": "Player",
      "sfx": "typing.mp3",
      "text": "I <3 my computer",
    }
  ]
};
const A1_MY_HOUSE_FRIDGE_ACTION = {
  "row": 1, "col": 4, "type": "TEXT",
  "scenes": [
    {
      "type": "SPEAK",
      "spriteName": "Player",
      "sfx": "typing.mp3",
      "text": "This is my fridge. Sadly, there's nothing in it..."
    }
  ]
};
const A1_MY_HOUSE_STOVE_ACTION = {
  "row": 4, "col": 4, "type": "TEXT",
  "scenes": [
    {
      "type": "SPEAK",
      "spriteName": "Player",
      "sfx": "typing.mp3",
      "text": "I should clean this stove sometime",
    }
  ]
};  

const A1_LIFTING_CHAD = {
  "type": "TEXT",
  "sfx": "voice-1.mp3",
  "scenes": [
    { "type": "SPEAK", "text": "Do you even lift, bro?"}
  ]
}

const A1_BUSINESS_MAN = {
  "type": "TEXT",
  "sfx": "voice-1.mp3",
  "scenes": [
    { "type": "SPEAK", "text": "I'm working for the corporation. Business business business!" }
  ]
}

const A1_GIRL_OUTSIDE = {
  "type": "TEXT",
  "sfx": "voice-3.mp3",
  "scenes": [
    { "type": "SPEAK", "text": "I ate oysters for breakfast this morning. It was a terrible idea... " }
  ]
}

const A1_WOMAN_FIGHT = {
  "type": "BATTLE",
  "sfx": "voice-2.mp3",
  "scenes": [
    {
      "type": "SPEAK_YES_OR_NO",
      "text": "Are you looking to get your ass kicked?",
      "pathYes": false,
      "pathNo": [
        { "type": "SPEAK", "text": "That's a shame, honey" }
      ]
    }
  ],
  "party": [
    { "name": "Boze Bert", "className": TEST_CLASSNAME_2, "level": 5 },
    { "name": "Boze Berta", "className": TEST_CLASSNAME_10, "level": 5 },
    { "name": "Duifje", "className": TEST_CLASSNAME_16, "level": 5 },
  ], 
  "hasEvent": true,
  "events": [
    {
      "trigger": "ON_BATTLE_START",
      "scenes": [
        { "type": "ANIM", "animName": "LEFT_AND_RIGHT", "loop": false },
        { "type": "SPEAK", "text": "You'll regret this!" },
      ]
    },
    {
      "trigger": "ON_BATTLE_END",
      "scenes": [
        { "type": "ANIM", "animName": "TURN_SINGLE_CIRCLE", "loop": false },
        { "type": "SPEAK", "text": "Oh no, I got PWND!!" }
      ]
    }
  ],
}

const A1_MY_HOUSE_CHAD_FIGHT = {
  "type": "BATTLE",
  "sfx": "voice-1.mp3",
  "party": [
    { "name": "Boze Bert", "className": TEST_CLASSNAME_2, "level": 5 },
    { "name": "Boze Berta", "className": TEST_CLASSNAME_14, "level": 5 },
    { "name": "Duifje", "className": TEST_CLASSNAME_15, "level": 5 },
  ], 
  "scenes": [
    { "type": "SPEAK", "text": "I love fighting man!" },
    {
      "type": "SPEAK_YES_OR_NO",
      "text": "Want me to kick your ass?!",
      "pathYes": false,
      "pathNo": [
        { "type": "SPEAK", "text": "You're lucky you're a coward!" }
      ]
    }
  ],
  "hasEvent": true,
  "events": [
    {
      "trigger": "ON_BATTLE_START",
      "scenes": [
        { "type": "ANIM", "animName": "LIFT", "loop": false },
        { "type": "SPEAK", "text": "You'll regret this!", "sfx": "battle-baba.mp3" }
      ]
    },
    {
      "trigger": "ON_BATTLE_END",
      "scenes": [
        { "type": "ANIM", "animName": "TURN_SINGLE_CIRCLE", "loop": false },
        { "type": "SPEAK", "text": "Oh no, I got PWND!!" }
      ]
    }
  ]
}
  
module.exports = {
  A1_MY_HOUSE_COMPUTER_ACTION, A1_MY_HOUSE_FRIDGE_ACTION, A1_MY_HOUSE_STOVE_ACTION,
  A1_LIFTING_CHAD, A1_BUSINESS_MAN, A1_GIRL_OUTSIDE, A1_WOMAN_FIGHT, A1_MY_HOUSE_CHAD_FIGHT
}