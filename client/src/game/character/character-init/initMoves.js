const Sound = require('../../interfaces/I_Sound').Sound

const initMoves = ( classFocus ) => {
    if ( classFocus = [ "STR", "CHA" ] ) {
        return {
            attack : (attacker, defender) => {
                const damage = attacker.stats.Attack * 1.5
                const sfx = new Sound( "misc/random5.wav", true )
                sfx.play()
                defender.receiveDamage(damage)
            },
            sing : (attacker, defender) => {
                const damage = attacker.stats.Sp_Attack
                defender.receiveSpDamage(damage)
            }            
        }                
    }

    if ( classFocus = [ "INT" ] ) {
        return {
            correctGrammar : (attacker, defender) => {
                const damage = attacker.stats.Attack * 1.5
                defender.receiveDamage(damage)
            },
            sing : (attacker, defender) => {
                const damage = attacker.stats.Sp_Attack
                defender.receiveSpDamage(damage)
            }            
        }                
    }

}

module.exports = {
    initMoves
}