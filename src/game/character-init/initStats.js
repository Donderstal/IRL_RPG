// Initialize stats based on character traits

const calcStats = (traits) => {
    return {
        Health: getHealth(traits.END),
        Mana: getMana(traits.INT),
        Attack: getAttack(traits.STR, traits.AGI),
        Defense: getDefense(traits.STR, traits.END),
        Sp_Attack: getSpAttack(traits.INT, traits.AGI),
        Sp_Defense: getSpDefense(traits.INT, traits.END),
        Attack_Speed: traits.AGI,
        Experience: 0
    }
}

const getHealth = (endurance) => {
    return Math.round(endurance * 5)
}

const getMana = (intelligence) => {
    return Math.round(intelligence * 5)
}

const getAttack = (strength, agility) => {
    return Math.round((strength + agility) / 2)
}

const getDefense = (strength, endurance) => {
    return Math.round((strength + endurance) / 2)
}

const getSpAttack = (intelligence, agility) => {
    return Math.round((intelligence + agility) / 2)
}

const getSpDefense = (intelligence, endurance) => {
    return Math.round((intelligence + endurance) / 2)
}

module.exports = {
    calcStats
}