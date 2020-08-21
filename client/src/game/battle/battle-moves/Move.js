const moveAnimations = require('./moveAnimations')

class Move {
    constructor( moveData ) {
        console.log( "new move " +  moveData.name + "!")
        console.log(moveData)

        this.name       = moveData.name;
        this.desc       = moveData.desc;
        this.type       = moveData.type;
        this.attribute  = moveData.attribute;
        this.turns      = moveData.turns;
        this.factor     = moveData.factor;

        this.target = null;
        this.steps = [ ];

        let animationData = moveAnimations[ moveData.animation ]

        this.initSteps( animationData );
        console.log(this)
        console.log('..end of move '  +  moveData.name)
    }

    initSteps( animationSteps ) {
        console.log(animationSteps)
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

        this.type = stepData.type;
        this.damage = stepData.damage;
        this.effects = stepData.effects;
        this.targetStep = stepData.targetStep;

        this.done = false;
        this.target, this.targetStep;
        console.log(this)
        console.log('..end of new step')
    }
}

module.exports = {
    Move
}