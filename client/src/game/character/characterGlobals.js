const INFLUENCER = "influencer"
const NECKBEARD = "neckbeard"
const CHAD = "chad"
const TUMBLR_GIRL = "tumblr_girl"

const MENTAL = "MENTAL"
const PHYSICAL = "PHYSICAL"
const SOCIAL = "SOCIAL"

const STRENGTH = "STRENGTH"
const AGILITY = "AGILITY"
const ENDURANCE = "ENDURANCE"
const INTELLIGENCE = "INTELLIGENCE"
const WILLPOWER = "WILLPOWER"
const SELF_AWARENESS = "SELF AWARENESS"
const CHARISMA = "CHARISMA"
const APPEARANCE = "APPEARANCE"
const SOCIALISATION = "SOCIALISATION"

const getAttributeGroup = ( skillName ) => {
    if ( skillName == SELF_AWARENESS || skillName == INTELLIGENCE || skillName == WILLPOWER ) {
        return MENTAL
    }
    if ( skillName == STRENGTH || skillName == AGILITY || skillName == ENDURANCE ) {
        return PHYSICAL
    }
    if ( skillName == APPEARANCE || skillName == CHARISMA || skillName == SOCIALISATION ) {
        return SOCIAL
    }
}

const CLASSPROFILE_INFLUENCER = {
    main: APPEARANCE,
    attributeGroup  : getAttributeGroup(APPEARANCE) 
}

const CLASSPROFILE_NECKBEARD = {
    main: INTELLIGENCE,
    attributeGroup  : getAttributeGroup(INTELLIGENCE) 
}

const CLASSPROFILE_CHAD = {
    main: STRENGTH,
    attributeGroup  : getAttributeGroup(STRENGTH) 
}

const CLASSPROFILE_TUMBLR_GIRL = {
    main            : WILLPOWER,
    attributeGroup  : getAttributeGroup(WILLPOWER) 
}

const BASE_TP_AND_HP = 20;

module.exports = {
    INFLUENCER,
    NECKBEARD,
    CHAD,
    TUMBLR_GIRL,
    STRENGTH,
    AGILITY,
    ENDURANCE,
    INTELLIGENCE,
    WILLPOWER,
    SELF_AWARENESS,
    CHARISMA,
    APPEARANCE,
    SOCIALISATION,
    MENTAL,
    PHYSICAL,
    SOCIAL,
    CLASSPROFILE_INFLUENCER,
    CLASSPROFILE_NECKBEARD,
    CLASSPROFILE_CHAD,
    CLASSPROFILE_TUMBLR_GIRL,
    BASE_TP_AND_HP
}