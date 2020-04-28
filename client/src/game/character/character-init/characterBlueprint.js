const initMoves = require('./initMoves')

class CharacterBlueprint {
    constructor( name, className ) {
        
        this.name           = name,
        this.gender         = ( className == "Influencer" || className == "Tumblr girl" ) ? "F" : "M",

        this.className      = className,
        this.job            = className
        
        this.level          = 1,
        this.experience     = 0
        this.attributes     = {
            STR     : 5,
            ATH	    : 5,
            END     : 5,
            WIS     : 5,
            INT     : 5,
            PER     : 5,
            MYS     : 5,
            CHA     : 5,
            FIN     : 5
        }

        this.attributeGroupTotals = { };
        this.getClassAttributes( );
        this.getAttributeGrouptotals( );
        
        this.stats          = {
            // Health determines how many blows you can take before you fall
            // Mana points give you the power to use special moves
            Health      : ( this.attributes.FIN * 2 ) + this.attributeGroupTotals.Physical,
            Mana        : ( this.attributes.MYS * 2 ) + this.attributeGroupTotals.Mental,

            // Attack is the base attack modifier for attacks from the Physical group
            // Defense is the base defence modifier for attacks from the Physical group
            Attack      : this.attributes.STR,
            Defense     : this.attributes.END,

            // Sp. Attack is the base attack modifier for attacks from the Mental group
            // Defense is the base defence modifier for attacks from the Mental group
            Sp_Attack   : this.attributes.INT,
            Sp_Defense  : this.attributes.WIS,
            
            // Speed determines who begins a battle or turn and your chance of fleeing
            // Evasion heightens the chance of evading enemy moves
            Speed       : this.attributes.ATH,
            Eva     	: this.attributes.PER,

            // Luck will help your character with all kinds of things, like critical hits
            Luck        : ( this.attributes.CHA * 2 ) + this.attributeGroupTotals.Social
        },

        this.moves          = initMoves.initMoves(this.className);

        console.log(this)
    }
    
    getAttributeGrouptotals( ) {
        this.attributeGroupTotals = {
            Physical: this.attributes.STR + this.attributes.ATH + this.attributes.END,
            Mental  : this.attributes.INT + this.attributes.WIS + this.attributes.PER,
            Social  : this.attributes.MYS + this.attributes.CHA + this.attributes.FIN
        }
    }

    getClassAttributes( ) {
        let params = []
        switch ( this.className ) {
            case "Neckbeard":
                params = [ { 
                    INT: 3, MYS: 2, WIS: 1, 
                    CHA: -3, END: -1, ATH: -2 
                } ];
                break;
            case "Influencer":
                params = [ { 
                    ATH: 2, CHA: 2, END: 1, 
                    WIS: -2, INT: -2, MYS: -1 
                } ];
                break;    
            case "Tumblr_Girl":
                params = [ { 
                    INT: 2, PER: 2, MYS: 1, 
                    STR: -2, ATH: -1, CHA: -1, FIN: -1 
                } ];
                break;           
            case "Chad":
                params = [ { 
                    STR: 3, END: 2, ATH: 2, 
                    WIS: -3, INT: -2, PER: -1, MYS: -1 
                } ];                    
                break;
        }

        this.updateAttributes( params )
    }

    updateAttributes ( valuesToUpdate ) {
        Object.entries(valuesToUpdate).forEach( (e) => {
            this.attributes[e.key] += e.value
        } )
    }

    setLevel ( level ) {
        this.level = level
    }

    setExperience ( xp ) {
        this.experience += xp
    }
}

module.exports = {
    CharacterBlueprint
}