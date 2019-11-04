const Classes = require('./initClasses')

const classList = Classes.classEnumerable

module.exports = {
    getClass : ( className ) => {
        for ( var key in classList ) { 
            if ( key === className ) {
                console.log('got it!!')
                return classList[className]
            }
        }
    }
}

/*
const developer = new Classes.Developer()
const athlete = new Classes.Athlete()
 */
/* console.log( influencer.name + " and " + neckbeard.name + " enter the arena!"  )

console.log("Fight!!")

console.log("It's " + influencer.name + "'s turn!")

influencer.moves.attack(influencer, neckbeard)

console.log("It's " + neckbeard.name + "'s turn!")

neckbeard.moves.attack( neckbeard, influencer )

console.log('next round!!')

console.log("It's " + influencer.name + "'s turn!")

influencer.moves.attack(influencer, neckbeard)

console.log("It's " + neckbeard.name + "'s turn!")

neckbeard.moves.attack( neckbeard, influencer ) */

/* console.log(athlete)

console.log(developer) */

