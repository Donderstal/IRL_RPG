const initMoves = require('./initMoves')
const Move = require('./initMoves').Move
const characterGlobals = require('../characterGlobals')

const getClassProfile = ( className ) => {
    switch ( className ) {
        case characterGlobals.NECKBEARD :
            return characterGlobals.CLASSPROFILE_NECKBEARD;
        case characterGlobals.INFLUENCER :
            return characterGlobals.CLASSPROFILE_INFLUENCER;
        case characterGlobals.CHAD : 
            return characterGlobals.CLASSPROFILE_CHAD;
        case characterGlobals.TUMBLR_GIRL :       
            return characterGlobals.CLASSPROFILE_TUMBLR_GIRL;
    }
}

const baseAttributeAdditionOdds = 15;

class CharacterBlueprint {
    constructor( name, className, level = 1 ) {
        
        this.name           = name
        this.className      = className
        this.classProfile   = getClassProfile( className );
        
        this.level          = level;
        this.experience     = level;

        this.attributes     = new characterAttributes( this.classProfile );
        this.attributes.setLevel( level );

        this.HP = this.attributes.HP,
        this.AP = this.attributes.AP,

        this.standardAttack = new Move(
            {
                name        : "Attack",
                desc        : "Attack the fools!.",
                type        : "BlablaLorem",
                attribute   : "STRENGTH",
                animation   : "PUNCH",
                moveTo      : true,
                factor      : 30
            } 
        )

        this.moves          = initMoves.initMoves(this.className);
    }

    getMoveResult( move, targetCharacter ) {
        console.log(' do move! ')
        console.log(targetCharacter) 
        let moveResult;
        moveResult = this.attackWithAttribute( move.attribute, move.factor );
        return targetCharacter.defendAndTakeDamage( move.attribute, moveResult )
    }

    attackWithAttribute( attribute, factor ) {
        console.log("Attakcing with: ")
        console.log(attribute, this.attributes[attribute], factor)
        const attackingAttribute = this.attributes[attribute];
        return attackingAttribute + ( Math.round( ( attackingAttribute / 100 )  * this.getNumberInRange( factor ) ) )
    }


    defendAndTakeDamage( attribute, amount ) {
        const defendingAttributeGroup = characterGlobals.getAttributeGroup( attribute );
        console.log("Defending with: ")
        console.log(defendingAttributeGroup, this.attributes[defendingAttributeGroup])
        return ( amount - this.attributes[defendingAttributeGroup] );
    }

    getNumberInRange( factor ) {
        return ( Math.floor( Math.random( ) * ( factor * 2 ) ) - factor );
    }
}

class characterAttributes {
    constructor ( classProfile ) {
        this.level = 1;
        this[characterGlobals.STRENGTH]       = 5;
        this[characterGlobals.AGILITY]        = 5;
        this[characterGlobals.ENDURANCE]     = 5;

        this[characterGlobals.INTELLIGENCE]    = 5;
        this[characterGlobals.WILLPOWER]      = 5;
        this[characterGlobals.SELF_AWARENESS] = 5;

        this[characterGlobals.CHARISMA]        = 5;
        this[characterGlobals.APPEARANCE]     = 5;
        this[characterGlobals.SOCIALISATION]  = 5;

        this.setClassProfileParams( classProfile )
        this.setLevel( 5 )
    }

    get [characterGlobals.PHYSICAL]( ) {
        return Math.round( ( this[characterGlobals.STRENGTH] + this[characterGlobals.AGILITY] + this[characterGlobals.ENDURANCE] ) / 3 )
    }

    get [characterGlobals.MENTAL]( ) {
        return Math.round( ( this[characterGlobals.INTELLIGENCE] + this[characterGlobals.WILLPOWER] + this[characterGlobals.SELF_AWARENESS] ) / 3 )
    }

    get [characterGlobals.SOCIAL]( ) {
        return Math.round( ( this[characterGlobals.CHARISMA] + this[characterGlobals.APPEARANCE] + this[characterGlobals.SOCIALISATION] ) / 3 )
    }

    get HP( ) {
        return characterGlobals.BASE_TP_AND_HP + Math.round( ( ( this[characterGlobals.PHYSICAL] + this[characterGlobals.PHYSICAL] + this[characterGlobals.SOCIAL] ) / 3 ) * 2 );
    }

    get AP( ) {
        return characterGlobals.BASE_TP_AND_HP + Math.round( ( ( this[characterGlobals.MENTAL] + this[characterGlobals.MENTAL] + this[characterGlobals.SOCIAL] ) / 3 ) );
    }

    setLevel( level ) {
        if ( level > this.level ) {
            const limit = ( level - this.level )
            for ( var i = 0; i < limit; i++ ) {
                this.allocatePointsOnLevelUp( )
            }
        }
    }

    allocatePointsOnLevelUp( ) {
        const pointsPerLevel = 3;        
        const pointsToAllocate = {};
        // For each of the three points to assign...
        for ( var i = 0; i < pointsPerLevel; i++ ) {
            this.allocatePointBasedOnRNG( pointsToAllocate );
        }

        for ( var attribute in pointsToAllocate ) {
            this[attribute] += pointsToAllocate[attribute]
        }

    }

    allocatePointBasedOnRNG( pointsToAllocate ) {
        const odds = Object.assign( {}, this.odds )
        const slots = Object.assign( {}, this.slots )

        const factor = Math.random() * 100;
        let iterator = 0;
        // ...loop through attributes 
        for ( var attribute in odds ) {
            if ( iterator <= factor && (odds[attribute] + iterator) > factor  ) {
                ( pointsToAllocate[attribute] == undefined ) ? pointsToAllocate[attribute] = 1 : pointsToAllocate[attribute] += 1;
                
                if ( pointsToAllocate[attribute] == slots[attribute] ) {
                    let percentToDivide = odds[attribute]
                    delete odds[attribute]
                    for ( var attribute in odds ) {
                        odds[attribute] += ( percentToDivide / odds.length )
                    }
                    
                }
                break;
            }
            else {
                iterator += odds[attribute]
            }
        }
    }

    setClassProfileParams( classProfile ) {
        this.setAttributePointSlots( classProfile );
        this.setAttributePointOdds( classProfile );
    }

    setAttributePointSlots( classProfile ) {
        this.slots = {
            [characterGlobals.STRENGTH]       : 1,
            [characterGlobals.AGILITY]        : 1,
            [characterGlobals.ENDURANCE]      : 1,
        
            [characterGlobals.INTELLIGENCE]   : 1,
            [characterGlobals.WILLPOWER]      : 1,
            [characterGlobals.SELF_AWARENESS] : 1,
        
            [characterGlobals.CHARISMA]       : 1,
            [characterGlobals.APPEARANCE]     : 1,
            [characterGlobals.SOCIALISATION]  : 1
        }
        this.slots[classProfile.main] += 1;

        if ( classProfile.attributeGroup == characterGlobals.PHYSICAL ) {
            this.slots[characterGlobals.STRENGTH] += 1;
            this.slots[characterGlobals.AGILITY] += 1;
            this.slots[characterGlobals.ENDURANCE] += 1;
        }
        else if ( classProfile.attributeGroup == characterGlobals.MENTAL ) {
            this.slots[characterGlobals.INTELLIGENCE] += 1;
            this.slots[characterGlobals.WILLPOWER] += 1;
            this.slots[characterGlobals.SELF_AWARENESS] += 1;
        }

        else if ( classProfile.attributeGroup == characterGlobals.SOCIAL ) {
            this.slots[characterGlobals.CHARISMA] += 1;
            this.slots[characterGlobals.APPEARANCE] += 1;
            this.slots[characterGlobals.SOCIALISATION] += 1;
        }

        if ( classProfile.secondary ) {
            this.slots[classProfile.secondary] += 1;
        }
    }

    setAttributePointOdds( classProfile ) {
        this.odds = {
            [characterGlobals.STRENGTH]       : 0,
            [characterGlobals.AGILITY]        : 0,
            [characterGlobals.ENDURANCE]      : 0,
        
            [characterGlobals.INTELLIGENCE]   : 0,
            [characterGlobals.WILLPOWER]      : 0,
            [characterGlobals.SELF_AWARENESS] : 0,
        
            [characterGlobals.CHARISMA]       : 0,
            [characterGlobals.APPEARANCE]     : 0,
            [characterGlobals.SOCIALISATION]  : 0
        };

        if ( classProfile.attributeGroup == characterGlobals.PHYSICAL ) {
            this.odds[characterGlobals.STRENGTH] = baseAttributeAdditionOdds + 5;
            this.odds[characterGlobals.AGILITY] = baseAttributeAdditionOdds + 5;
            this.odds[characterGlobals.ENDURANCE] = baseAttributeAdditionOdds + 5;
        }
        else if ( classProfile.attributeGroup == characterGlobals.MENTAL ) {
            this.odds[characterGlobals.INTELLIGENCE] = baseAttributeAdditionOdds + 5;
            this.odds[characterGlobals.WILLPOWER] = baseAttributeAdditionOdds + 5;
            this.odds[characterGlobals.SELF_AWARENESS] = baseAttributeAdditionOdds + 5;
        }
        else if ( classProfile.attributeGroup == characterGlobals.SOCIAL ) {
            this.odds[characterGlobals.CHARISMA] = baseAttributeAdditionOdds + 5;
            this.odds[characterGlobals.APPEARANCE] = baseAttributeAdditionOdds + 5;
            this.odds[characterGlobals.SOCIALISATION] = baseAttributeAdditionOdds + 5;
        }

        this.odds[classProfile.main] += 10;
        if ( classProfile.secondary ) {
            this.odds[classProfile.secondary] + 5;
        }

        this.calcOddsOfRemainingAttributes( )
    }

    calcOddsOfRemainingAttributes( ) {
        let iterator = 0;
        let remainingAttributes = 9;

        for ( var attribute in this.odds ) {
            iterator += this.odds[attribute]
            if ( this.odds[attribute] != 0 ) {
                remainingAttributes -= 1
            }
        }

        let oddsofRemainingAttributes = ( 100 - iterator ) / remainingAttributes

        for ( attribute in this.odds ) {
            if ( this.odds[attribute] == 0 ) {
                this.odds[attribute] = oddsofRemainingAttributes
            }
        }
    }
}

module.exports = {
    CharacterBlueprint
}