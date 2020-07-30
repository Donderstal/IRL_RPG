
const getBattleResString = ( template, literals = null ) => {
    switch ( template ) {
        case 'BATTLE_BEGIN_TURN'  : 
            return `${literals.name}s turn begins!`
        case 'BATTLE_CHOOSE_MOVE' :
            return "Choose your move!"
        case 'BATTLE_USE_MOVE'    : 
            return `${literals.name} uses ${literals.move}!`
        case 'BATTLE_MOVE_HIT'    : 
            return `${literals.name} hits ${literals.target} for ${literals.damage} damage!`
        case 'BATTLE_MOVE_MISS'   : 
            return `${literals.target} evades ${literals.move}!`
        case 'BATTLE_STAT_DOWN'   : 
            return `${literals.target}'s ${literals.stat} drops!`
        case 'BATTLE_STAT_UP'     : 
            return `${literals.name}s ${literals.stat} is bolstered!`    
        case 'BATTLE_USE_ITEM'    : 
            return `${literals.name} uses ${literals.item}`    
        case 'BATTLE_FAIL'        : 
            return `${literals.name}s move failed! At least they tried...`    
    }
}

const getBattleShout = ( className, type ) => {
    if ( className == "neckbeard" ) {
        if ( type == "FIGHT" ) {
            return NECKBEARD_FIGHT_SHOUTS[ Math.floor(Math.random() * NECKBEARD_FIGHT_SHOUTS.length) ];
        }
        if ( type == "VICTORY" ) {
            return NECKBEARD_VICTORY_SHOUTS[ Math.floor(Math.random() * NECKBEARD_VICTORY_SHOUTS.length) ];
        }
    }

    if ( className == "influencer" ) {
        if ( type == "FIGHT" ) {
            return INFLUENCER_FIGHT_SHOUTS[ Math.floor(Math.random() * INFLUENCER_FIGHT_SHOUTS.length) ];
        }
        if ( type == "VICTORY" ) {
            return INFLUENCER_VICTORY_SHOUTS[ Math.floor(Math.random() * INFLUENCER_VICTORY_SHOUTS.length) ];
        }
    }

    if ( className == "chad" ) {
        if ( type == "FIGHT" ) {
            return CHAD_FIGHT_SHOUTS[ Math.floor(Math.random() * CHAD_FIGHT_SHOUTS.length) ];
        }
        if ( type == "VICTORY" ) {
            return CHAD_VICTORY_SHOUTS[ Math.floor(Math.random() * CHAD_VICTORY_SHOUTS.length) ];
        }
    }

    if ( className == "tumblr_girl" ) {
        if ( type == "FIGHT" ) {
            return TUMBLR_GIRL_FIGHT_SHOUTS[ Math.floor(Math.random() * TUMBLR_GIRL_FIGHT_SHOUTS.length) ];
        }
        if ( type == "VICTORY" ) {
            return TUMBLR_GIRL_VICTORY_SHOUTS[ Math.floor(Math.random() * TUMBLR_GIRL_VICTORY_SHOUTS.length) ];
        }
    }
}

const NECKBEARD_FIGHT_SHOUTS = [
    "For the Horde!",
    "Gamers, rise up!",
    "Where is your god now??",
    "Kamehameha!",
    "So you have chosen war!",
    "Scared yet, n00b?",
    "Do not insult my honor!",
    "Call of Duty prepared me for this!"
]

const NECKBEARD_VICTORY_SHOUTS = [
    "That'll teach you not to mess with a Darkmage",
    "Your paladin, m'lady",
    "That was way more exhausting than WoW...",
    "Can I go home now? Mom made me dinner"
]

const INFLUENCER_FIGHT_SHOUTS = [
    "Creep!",
    "#Damage",
    "Stop following me!",
    "Oh. My. God.",
    "#BossBabe"
]

const INFLUENCER_VICTORY_SHOUTS = [
    "I want to thank all my subscribers <3",
    "#FitGirl #Hashtag",
    "Felt cute might delete later idk"
]

const CHAD_FIGHT_SHOUTS = [
    "I can feel the 'roids, bruh!",
    "Damn bruh, you suck",
    "Incel bitches!",
    "My balls are regular sized dude",
    "I hate long words, man"
]

const CHAD_VICTORY_SHOUTS = [
    "Sarah conner get to da chopper",
    "Incel bitches...",
    "Who's your chaddy?"
]

const TUMBLR_GIRL_FIGHT_SHOUTS = [
    "Respect demikin pansexuals!",
    "Smash patriarchy!",
    "Nazi bastards!",
    "Oh. My. God.",
    "RIP Tumblr"
]

const TUMBLR_GIRL_VICTORY_SHOUTS = [
    "That's what happens when you trigger me",
    "Feminist DESTROYS you with LOGIC and FACTS",
    "#BodyPositivity"
]

module.exports = {

    BATTLE_BUTTON_1     : "1",
    BATTLE_BUTTON_2     : "2",
    BATTLE_BUTTON_3     : "3",    
    BATTLE_BUTTON_4     : "4",
    BATTLE_BUTTON_5     : "5",

    BATTLE_PUNCH_TOOLTIP    : "Punch",
    BATTLE_PUNCH_HINT       : "A standard punching attack, available to all characters",

    BATTLE_MOVES_TOOLTIP    : "Moves",
    BATTLE_MOVES_HINT       : "use one of your special abilities, like taking on crushing debt",

    BATTLE_DEFEND_TOOLTIP   : "Defend",
    BATTLE_DEFEND_HINT      : "Take a defensive stance and await your opponents move",

    BATTLE_ITEM_TOOLTIP     : "Item",
    BATTLE_ITEM_HINT        : "Check your bags for useful items and Whatsapp messages",

    BATTLE_FLEE_TOOLTIP     : "Flee",
    BATTLE_FLEE_HINT        : "Flee courageously to fight another day!",

    getBattleResString,
    getBattleShout
}