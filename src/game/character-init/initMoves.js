module.exports = {
    initMoves : ( classFocus ) => {

        // this is just some practice stuff for now, but it does work 
        // If you create two character instances, they can attack eachother
        // Nothing happens if a character's health reaches zero though...

        if ( classFocus = [ "STR", "CHA" ] ) {
            return {
                attack : (attacker, defender) => {
                    const damage = attacker.traits.STR
                    defender.receiveDamage(damage)
                },
                sing : (attacker, defender) => {
                    const damage = attacker.traits.INT
                    defender.receiveDamage(damage)
                }            
            }                
        }

        if ( classFocus = [ "INT" ] ) {
            return {
                correctGrammar : (attacker, defender) => {
                    const damage = attacker.traits.STR
                    defender.receiveDamage(damage)
                },
                sing : (attacker, defender) => {
                    const damage = attacker.traits.INT
                    defender.receiveDamage(damage)
                }            
            }                
        }

    }
}