const moveAnimations    = require('./moveAnimations');
const animationRes      = require('../../../resources/animationResources')
const state             = require('../../../game-data/state');

class Move {
    constructor( moveData, isPlayer ) {
        console.log( "new move " +  moveData.name + "!")
        console.log(moveData)

        this.name       = moveData.name;
        this.desc       = moveData.desc;
        this.type       = moveData.type;
        this.attribute  = moveData.attribute;
        this.turns      = moveData.turns;
        this.factor     = moveData.factor;
        this.isPlayer   = isPlayer;

        this.activeStep = 0;
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
            this.steps.push( new AnimationStep( step, this.isPlayer ) )
        } );
    }

    setTarget( targetIndex ) {
        const opponentAtIndex = state.battleState.opponentParty.members[targetIndex] 
        const playerAtIndex = state.battleState.playerParty.members[targetIndex];
        this.target = this.isPlayer ? opponentAtIndex : playerAtIndex;
        this.steps.forEach( ( e ) => {
            e.target = this.target;
        })
        console.log('chose target for move: ' + this.name);
        console.log(this.target)
    }

    startAnimation( attacker ) {
        this.getNewTargetIfCurrentIsDead( );
        state.battleState.UI.setText( attacker.name + " uses " + attacker.nextMove.name + " on " + this.target.name )
        this.activateStep( attacker );
    }
    
    getNewTargetIfCurrentIsDead( ) {
        console.log(this.target)
        if ( this.target.isDefeated ) {
            const battle =  state.battleState;
            const targetParty = this.isPlayer ? battle.opponentParty: battle.playerParty
            this.setTarget( 
                targetParty.findNextActiveMemberIndex( "NEXT", false )
            );
        }
    }

    activateStep( attacker ) {
        this.steps.forEach( ( e ) => {
            e.animate( attacker );
            if ( e.damage == true ) {
                
            }
        })
    }

    goToNextAnimationStep( ) {

    }
}

class AnimationStep {
    constructor( stepData, isPlayer ) {
        console.log( "new step! ")
        console.log(stepData)

        this.type       = stepData.type;
        this.damage     = stepData.damage;
        this.effects    = stepData.effects;
        this.targetStep = stepData.targetStep;

        this.done = false;
        this.target, this.targetStep;

        this.initializeAnimationStep( stepData, isPlayer  );

        console.log(this)
        console.log('..end of new step')
    }

    initializeAnimationStep( stepData, isPlayer ) {
        switch( this.type ) {
            case "MOVE" :
                break;
            case "ANIM" :
                this.animationName = stepData.animationName + ( isPlayer ? "_L" : "_R" );
                this.animation = animationRes[this.animationName];
                console.log('setting animation..')
                console.log(this.animation)
                break;
            case "SHOUT" :
                break;
            default :
                console.log("animationType " + this.type + " is not valid");
        }
    }

    animate( character ) {
        switch( this.type ) {
            case "MOVE" :
                console.log('move')
                break;
            case "ANIM" :
                console.log('anim')
                character.animateAttack( this.animation );
                break;
            case "SHOUT" :
                console.log('shout')
                break;
            default :
                console.log("animationType " + this.type + " is not valid");
        }

        if ( this.targetStep ) {
            this.targetStepName = this.targetStep + ( this.target.isPlayer ? "_R" : "_L" );
            this.targetStep = animationRes[this.targetStepName];
            this.target.animateAttack( this.targetStep )
        }

        if ( this.effects ) {

        }
    }
}

module.exports = {
    Move
}