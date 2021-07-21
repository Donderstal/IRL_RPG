const BUS_TO_DOWTOWN = {
  "type": "BUS",
  "to": "my-neighbourhood/A2",
  "scenes": [
      {
        "type": "SPEAK",
        "spriteName": "Player",
        "sfx": "typing.mp3",
        "text": "Shall I take the bus to my neighbourhood?"
      }
  ]
}

const A2_TALKING_CHAD = {
  "type": "TEXT",
  "sfx": "voice-1.mp3",
  "scenes": [
    { "type": "SPEAK", "text": "Could you piss off?" },
    { "type": "SPEAK", "text": "Can't you see I'm minding my own business?" }
  ]
}

const A2_TALKING_NECKBEARD = {
  "type": "TEXT",
  "sfx": "mauww.mp3",
  "scenes": [
    { "type": "SPEAK", "text": "I'm an aspiring ninja, m'lady." }
  ]
}

const A2_TALKING_GIRL = {
  "type": "TEXT",
  "sfx": "poo-poo.mp3",
  "scenes": [
    { "type": "SPEAK", "text": "I used to date a level 24 Darkmage." }
  ]
}

const A2_TALKING_ROBOT = {
  "type": "TEXT",
  "sfx": "typing.mp3",
  "scenes": [
    { "type": "SPEAK", "text": "Hello, potential customer!" }
  ]
}

const A2_SUBMAP1_WOMAN = {
  "type": "TEXT",
  "sfx": "poo-poo.mp3",
  "scenes": [
    { "type": "SPEAK", "text": "There's this weird neckbeard in the back alley trying to connect my to my internet." }
  ]
}

const A2_SUBMAP1_ACTION_BIN  = {
  "row": 6,
  "col": 1,
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

const A2_SUBMAP3_WIFIGUY = {
  "type": "TEXT",
  "sfx": "voice-3.mp3",
  "scenes": [
    { "type": "SPEAK", "text": "The Wifi here sucks, man" }
  ]
}

const A2_SUBMAP2_LIFTING_CHAD = {
  "type": "TEXT",
  "sfx": "voice-1.mp3",
  "scenes": [
    { "type": "SPEAK", "text": "Do you even lift, bro?"}
  ]
}

module.exports = {
  BUS_TO_DOWTOWN, A2_SUBMAP2_LIFTING_CHAD, A2_TALKING_CHAD, A2_TALKING_NECKBEARD, A2_TALKING_GIRL, A2_TALKING_ROBOT, A2_SUBMAP1_WOMAN, A2_SUBMAP1_ACTION_BIN, A2_SUBMAP3_WIFIGUY, 
}