const getMovesByClass = require('../character-resources/moves').getMovesByClass 

const initMoves = ( className ) => {
    const movesData = getMovesByClass( className ) 
    const moves = []
    movesData.forEach( ( e ) => {
        moves.push(new Move(e) )
    } )  

    return moves
}


class Move {
    constructor( move ) {
        this.name       = move.name
        this.desc       = move.desc

        this.type       = move.type
        this.attribute  = move.attribute
        this.animation  = move.animation
    }

    setMove( ) {
        switch( this.type ) {
            case "ATTACK":
                this.isSpAttack = false;
                return this.doDamage
            case "SP_ATTACK":
                this.isSpAttack = true;
                return this.doDamage
            
        }
    }

    // doDamage( bool isSpAttack, string moveAttribute, int duration = null )  
    doDamage( attacker, defender ) {
        let damage = ( this.isSpAttack ) ? attacker.stats.Sp_Attack : attacker.stats.Attack;
        damage += attacker.attributes[this.attribute];

        let baseDefence = ( this.isSpAttack ) ? defender.stats.Sp_Defense : defender.stats.Defense;
        defender.stats.HP ( ( damage - baseDefence ) > 0 ) ? damage - baseDefence : 0;
    }

    // doStatusEffect( string moveAttribute, string statusEffect, int duration )


    // doAttrOrStatChange( string moveAttribute, string targetValue, bool isAttribute, int duration )


    // doHeal( string moveAttribute, int duration = null )
    

}

module.exports = {
    initMoves
}