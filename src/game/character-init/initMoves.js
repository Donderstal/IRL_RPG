module.exports = {
    initMoves : ( classFocus ) => {
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