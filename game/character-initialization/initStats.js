module.exports = {
    calcStats : (traits) => {
        return calculateStats(traits)
    }
}

function calculateStats(traits) {
    return {
        Health: getHealth(traits.END),
        Mana: getMana(traits.INT),
        Attack: getAttack(traits.STR, traits.AGI),
        Defense: getDefense(traits.STR, traits.END),
        Sp_Attack: getAttack(traits.INT, traits.AGI),
        Sp_Defense: getDefense(traits.INT, traits.END),
        Attack_Speed: traits.AGI,
        Experience: 0
    }
}

function getHealth(endurance) {
    return Math.round(endurance * 5)
}

function getMana(intelligence) {
    return Math.round(intelligence * 5)
}

function getAttack(strength, agility) {
    return Math.round((strength + agility) / 2)
}

function getDefense(strength, endurance) {
    return Math.round((strength + endurance) / 2)
}

function getSpAttack(intelligence, agility) {
    return Math.round((intelligence + agility) / 2)
}

function getSpDefense(intelligence, endurance) {
    return Math.round((intelligence + endurance) / 2)
}