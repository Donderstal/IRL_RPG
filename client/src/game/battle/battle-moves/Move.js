class Move {
    constructor( moveData ) {
        console.log( "new move! ")
        console.log(moveData)
        console.log('..end of new move')

        this.name       = moveData.name;
        this.desc       = moveData.desc;
        this.type       = moveData.type;
        this.attribute  = moveData.attribute;
        this.turns      = moveData.turns;
        this.factor     = moveData.factor;

        this.target = null;
        this.steps = [ ];

        this.initSteps( moveData.animation );
    }

    initSteps( animationSteps ) {
        animationSteps.forEach( (step) => {
            this.steps.push( new AnimationStep( step ) )
        } );
    }

    setTarget( targetIndex ) {
        this.target = targetIndex;
    }
}

class AnimationStep {
    constructor( stepData ) {
        console.log( "new step! ")
        console.log(stepData)
        console.log('..end of new move')

        this.type = stepData.type;
        this.damage = stepData.damage;
        this.effects = stepData.effects;
        this.targetStep = stepData.targetStep;

        this.done = false;
        this.target, this.targetStep;
    }
}

module.exports = {
    Move
}