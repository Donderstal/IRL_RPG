module.exports = {
    initMoves : ( classFocus ) => {
        if ( classFocus = [ "STR", "CHA" ] ) {
            return {
                attack : (attacker, defender) => {
                    const damage = attacker.traits.STR
                    console.log ( attacker.name + "'s strength is " + attacker.traits.STR )
                    console.log(attacker.name + " uses attack!!")
                    defender.receiveDamage(damage)
                },
                sing : (attacker, defender) => {
                    const damage = attacker.traits.INT
                    console.log(attacker.name + 'Sing!!')
                    defender.receiveDamage(damage)
                }            
            }                
        }

        if ( classFocus = [ "INT" ] ) {
            return {
                correctGrammar : (attacker, defender) => {
                    const damage = attacker.traits.STR
                    console.log(attacker.name + " uses attack!!")
                    defender.receiveDamage(damage)
                },
                sing : (attacker, defender) => {
                    const damage = attacker.traits.INT
                    console.log(attacker.name + 'Sing!!')
                    defender.receiveDamage(damage)
                }            
            }                
        }

    }
}