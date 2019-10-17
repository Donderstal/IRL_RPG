module.exports = {
    calcSkills : (traits) => {
        let baseSkills = initSkills(traits)
        return initCombinedSkills(baseSkills)
    }
}

// this is just some dummy stuff for now
// skills are assigned to character instances
// but they don't do anything yet

const initSkills = function(traits) {
    return {
        //Strength skills
        Muscle : {
            skillLevel: traits.STR,
            skillXP: 0,
            skillDesc: "Muscle determines the weight you can carry. Important for Heavy Weapons."
        },
        Fitness : {
            skillLevel: traits.STR,
            skillXP: 0,
            skillDesc: "Fitness determines how long you can run. Also imporant for Attractiveness and Acrobatics."
        },

        //Endurance skills
        Willpower : {
            skillLevel: traits.END,
            skillXP: 0,
            skillDesc: "Willpower influences your Learning skill and the amount of mana your spells cost."
        },
        Perseverance : {
            skillLevel: traits.END,
            skillXP: 0,
            skillDesc: "Perseverance influences your Heavy Weapons skills and reduces the amount of damage you take."
        },
        
        //Intelligence skills
        Perception : {
            skillLevel: traits.INT,
            skillXP: 0,
            skillDesc: "Perception allows you to see your enemies weakness. It's also important for Learning and Light Weapons."
        },
        Wisdom : {
            skillLevel: traits.INT,
            skillXP: 0,
            skillDesc: "Wisdom influences your Trustworthyness. It also determines which spells you can use."
        },

        //Agility skills
        Athletics : {
            skillLevel: traits.AGI,
            skillXP: 0,
            skillDesc: "Determines your running speed. Also influences Light Weapons and Acrobatics."
        },
        Sneak : {
            skillLevel: traits.AGI,
            skillXP: 0,
            skillDesc: "Determines succes at sneaking and stealing. Also influences your Dodge skills."
        },

        //Charisma skills
        Speech : {
            skillLevel: traits.CHA,
            skillXP: 0,
            skillDesc: "Important for getting information out of people. Has influence on your Trustworthyness and Attractiveness."
        },
        Beauty : {
            skillLevel: traits.CHA,
            skillXP: 0,
            skillDesc: "Can be used to distract or beguile NPC's and enemies. Strongly influences your Attractiveness."
        },

        //Finance skills
        Bartering : {
            skillLevel: traits.FIN,
            skillXP: 0,
            skillDesc: "A high bartering skill can considerably decrease the prices you have to pay for items and assets."
        },
        Credit_Rating : {
            skillLevel: traits.FIN,
            skillXP: 0,
            skillDesc: "Influences trustworthyness. Determines the amount of money you can loan and the amount of interest you pay."
        }

    }

}

const initCombinedSkills = function (skills) {
    //Combined skills
    skills.Trustworthyness = {
        skillLevel: calcTrustworthyness(skills),
        skillXP: 0,
        skillDesc: "Trustworthyness is especially important to Finance and Charisma oriented characters. Influences your reputation with parents and CEO's."
    },
    skills.Attractiveness = {
        skillLevel: calcAttractiveness(skills),
        skillXP: 0,
        skillDesc: "Of high importance to Charisma oriented characters, Attractiveness gives you a wide range of small advantages in the game."
    },
    skills.Acrobatics = {
        skillLevel: calcAcrobatics(skills),
        skillXP: 0,
        skillDesc: "Determines your jumping height and flexibility."
    },
    skills.Learning = {
        skillLevel: calcLearning(skills),
        skillXP: 0,
        skillDesc: "Influences the speed at which you master new spells, weapons and professions."
    },
    skills.Light_Weapons = {
        skillLevel: calcLightWeapons(skills),
        skillXP: 0,
        skillDesc: "Influences your light weapon damage and proficiency."
    },
    skills.Heavy_Weapons = {
        skillLevel: calcHeavyWeapons(skills),
        skillXP: 0,
        skillDesc: "Influences your heavy weapon damage and proficiency."
    },
    skills.Dodge = {
        skillLevel: calcDodge(skills),
        skillXP: 0,
        skillDesc: "Determines you chances at evading enemy attacks"
    }

    return skills
}

const calcTrustworthyness = function(skills) {
    return Math.round(( skills.Credit_Rating.skillLevel + skills.Speech.skillLevel + skills.Wisdom.skillLevel ) / 3)
}

const calcAttractiveness = function(skills) {
    return Math.round(( skills.Speech.skillLevel + (skills.Beauty.skillLevel * 2) + skills.Fitness.skillLevel ) / 4)
}

const calcAcrobatics = function(skills) {
    return Math.round(( skills.Fitness.skillLevel + skills.Athletics.skillLevel ) / 2)
}

const calcLearning = function(skills) {
    return Math.round(( skills.Willpower.skillLevel + skills.Perception.skillLevel ) / 2)
}

const calcLightWeapons = function(skills) {
    return Math.round(( skills.Athletics.skillLevel + skills.Perception.skillLevel ) / 2)
}

const calcHeavyWeapons = function(skills) {
    return Math.round(( skills.Muscle.skillLevel + skills.Perseverance.skillLevel ) / 2)
}

const calcDodge = function(skills) {
    return Math.round(( skills.Perception.skillLevel + skills.Sneak.skillLevel ) / 2)
}