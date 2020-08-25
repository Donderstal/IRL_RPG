const moveAnimations    = require('./moveAnimations');
const animationRes      = require('../../../resources/animationResources')
const state             = require('../../../game-data/state');

class Move {
    constructor( moveData, moveOwner ) {
        this.name       = moveData.name;
        this.desc       = moveData.desc;
        this.type       = moveData.type;
        this.attribute  = moveData.attribute;
        this.turns      = moveData.turns;
        this.factor     = moveData.factor;

        this.owner      = moveOwner
        this.isPlayer   = moveOwner.isPlayer;

        this.activeStep = 0;
        this.target     = null;
        this.steps      = [ ];

        let animationData = moveAnimations[ moveData.animation ]

        this.initSteps( animationData );
    }

    get isLastStep( ) { return ( this.activeStep + 1 == this.steps.length ) }

    initSteps( animationSteps ) {
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
        console.log('chose ' + this.target.name + ' target for move: ' + this.name);
    }

    startAnimation( ) {
        state.battleState.activeMove = this;
        this.getNewTargetIfCurrentIsDead( );
        state.battleState.UI.setText( this.owner.name + " uses " + this.name + " on " + this.target.name )
        this.activateStep( );
    }
    
    getNewTargetIfCurrentIsDead( ) {
        if ( this.target.isDefeated ) {
            console.log( 'target of move is dead... ')
            console.log('getting new target for ' +  this.owner.name + "'s move named " + this.name)
            const battle =  state.battleState;
            const targetParty = this.isPlayer ? battle.opponentParty: battle.playerParty
            this.setTarget( 
                targetParty.findNextActiveMemberIndex( "NEXT", false )
            );
        }
    }

    activateStep( ) {
        this.steps[this.activeStep].animate( this.owner );
        if ( this.steps[this.activeStep].damage == true ) {
            this.owner.doMove( this.target );
        }
    }

    continueAnimationIfPossible( ) {
        if ( this.isLastStep ) {
            this.resetMove( );
        }
        else {
            this.goToNextAnimationStep( );
        }
    }

    goToNextAnimationStep( ) {
        this.activeStep += 1;
        this.activateStep( );
    }

    resetMove( ) {
        state.battleState.inMoveAnimation = false;
        state.battleState.activeMove = null;

        this.activeStep = 0;
        this.target = null;
        this.steps.forEach( ( e ) => {
            e.resetStep( );
        } )
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
        this.target,

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

    resetStep( ) {
        this.target = null;
        this.done = false;
    }

    animate( character ) {
        switch( this.type ) {
            case "MOVE" :
                console.log('move')
                state.battleState.activeMove.continueAnimationIfPossible( );
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