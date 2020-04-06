const initMoves = ( ) => {
    return {
        attack : (attacker, defender) => {
            let damage = attacker.stats.Attack * 2
            damage = ( Math.random() > 0.5 ) ? damage : ( Math.random() > 0.5 ) ? damage - 1 : damage + 1
            defender.receiveDamage(damage)
        },
        sing : (attacker, defender) => {
            const damage = attacker.stats.Sp_Attack
            defender.receiveSpDamage(damage)
        }            
    }                
}

module.exports = {
    initMoves
}