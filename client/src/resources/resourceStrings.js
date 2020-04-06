
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
    if ( className == "Neckbeard" && type == "FIGHT" ) {
        return NECKBEARD_FIGHT_SHOUTS[Math.floor(Math.random() * NECKBEARD_FIGHT_SHOUTS.length)];
    }
    if ( className == "Neckbeard" && type == "VICTORY" ) {
        return NECKBEARD_VICTORY_SHOUTS[Math.floor(Math.random() * NECKBEARD_VICTORY_SHOUTS.length)];
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
    "Flee while you can, weakling!"
]

const NECKBEARD_VICTORY_SHOUTS = [
    "My victory was worthy and righteous!",
    "That'll teach you not to mess with a Darkmage",
    "Your paladin, m'lady",
    "That was way more exhausting than WoW...",
    "Can I go home now?"
]

module.exports = {

    BATTLE_PUNCH_BUTTON     : "( 1 )",
    BATTLE_PUNCH_TOOLTIP    : "Punch",
    BATTLE_PUNCH_HINT       : "A standard punching attack, available to all characters",

    BATTLE_MOVES_BUTTON     : "( 2 )",
    BATTLE_MOVES_TOOLTIP    : "Moves",
    BATTLE_MOVES_HINT       : "use one of your special abilities, like taking on crushing debt",

    BATTLE_DEFEND_BUTTON    : "( 3 )",
    BATTLE_DEFEND_TOOLTIP   : "Defend",
    BATTLE_DEFEND_HINT      : "Take a defensive stance and await your opponents move",

    BATTLE_ITEM_BUTTON      : "( 4 )",
    BATTLE_ITEM_TOOLTIP     : "Item",
    BATTLE_ITEM_HINT        : "Check your bags for useful items and Whatsapp messages",

    BATTLE_FLEE_BUTTON      : "( 5 )",
    BATTLE_FLEE_TOOLTIP     : "Flee",
    BATTLE_FLEE_HINT        : "Flee courageously to fight another day!",

    getBattleResString,
    getBattleShout
}