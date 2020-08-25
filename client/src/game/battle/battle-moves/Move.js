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
        if ( this.target == null || this.target.index != targetIndex ) {
            this.target = this.isPlayer ? opponentAtIndex : playerAtIndex;
            this.steps.forEach( ( e ) => {
                e.setTarget( this.target, this.owner );
            })       
            console.log('chose ' + this.target.name + ' as target for move: ' + this.name + ' to be used by ' + this.owner.name);     
        }
    }

    startAnimation( ) {
        state.battleState.activeMove = this;
        this.getNewTargetIfCurrentIsDead( );
        state.battleState.UI.setText( this.owner.name + " uses " + this.name + " on " + this.target.name )
        this.activateStep( );
    }
    
    getNewTargetIfCurrentIsDead( ) {
        if ( this.target.isDefeated ) {
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
        this.type       = stepData.type;
        this.damage     = stepData.damage;
        this.effects    = stepData.effects;
        this.isPlayer   = isPlayer
        this.targetStep = stepData.targetStep;

        this.done = false;
        this.target,

        this.initializeAnimationStep( stepData, isPlayer  );
    }

    initializeAnimationStep( stepData, isPlayer ) {
        switch( this.type ) {
            case "MOVE" :
                this.destinationType = stepData.destination;
                this.destination = { };
                break;
            case "ANIM" :
                this.animationName = stepData.animationName + ( isPlayer ? "_L" : "_R" );
                this.animation = animationRes[this.animationName];
                break;
            case "SHOUT" :
                break;
            default :
                console.log("animationType " + this.type + " is not valid");
        }
    }

    setDestination( target, owner ) {
        switch( this.destinationType ) {
            case "TARGET" :
                this.destination = { 
                    'left': target.sprite.right, 
                    'right': target.sprite.left, 
                    'top': target.sprite.top, 
                    'bottom': target.sprite.bottom
                };
                break;
            case "START" :
                this.destination = { 
                    'left': owner.sprite.initialX, 
                    'right': owner.sprite.initialX + owner.sprite.width, 
                    'top': owner.sprite.initialY, 
                    'bottom': owner.sprite.initialY + owner.sprite.height
                };
                this.destination.endDirection = owner.sprite.initialRow;
                break;
        }
    }

    setTarget( target, owner ) {
        this.target = target
        if ( this.type == "MOVE" ) {
            this.setDestination( target, owner )
        } 
    }

    resetStep( ) {
        this.target = null;
        this.done = false;

        if ( this.type == "MOVE" ) {
            this.destination = null;
        }
    }

    animate( character ) {
        switch( this.type ) {
            case "MOVE" :
                console.log('MOVE STEP')
                character.setDestinationAndStartWalking( this.destination, this.isPlayer ? 4 : 5 )
                break;
            case "ANIM" :
                console.log('ANIM STEP')
                character.animateAttack( this.animation );
                break;
            case "SHOUT" :
                console.log('SHOUT STEP')
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