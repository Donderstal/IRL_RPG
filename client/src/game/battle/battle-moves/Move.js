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
        const opponentAtIndex = globals.GAME.BATTLE.opponentParty.members[targetIndex] 
        const playerAtIndex = globals.GAME.BATTLE.playerParty.members[targetIndex];
        this.target = this.isPlayer ? opponentAtIndex : playerAtIndex;
        this.steps.forEach( ( e ) => {
            e.setTarget( this.target, this.owner );
        })       
    }

    startAnimation( ) {
        globals.GAME.BATTLE.activeMove = this;
        this.getNewTargetIfCurrentIsDead( );
        globals.GAME.BATTLE.UI.setText( this.owner.name + " uses " + this.name + " on " + this.target.name )
        this.activateStep( );
    }
    
    getNewTargetIfCurrentIsDead( ) {
        if ( this.target.isDefeated ) {
            const battle =  globals.GAME.BATTLE;
            const targetParty = this.isPlayer ? battle.opponentParty: battle.playerParty
            this.setTarget( 
                targetParty.findNextActiveMemberIndex( "NEXT", false )
            );
        }
    }

    activateStep( ) {
        this.steps[this.activeStep].animate( this.owner );
        if ( this.steps[this.activeStep].damage == true ) {-
            this.owner.doMove( this.target );
        }
    }

    continueAnimationIfPossible( ) {
        console.log('hi...')
        if ( this.isLastStep ) {
            globals.GAME.BATTLE.actionButtonAllowed = true;
            this.resetMove( );
        }
        else {
            this.goToNextAnimationStep( );
        }
    }

    goToNextAnimationStep( ) {
        this.steps[this.activeStep].deActivate( this.owner );
        this.activeStep += 1;
        this.activateStep( );
    }

    resetMove( ) {
        globals.GAME.BATTLE.inMoveAnimation = false;
        globals.GAME.BATTLE.activeMove = null;

        this.activeStep = 0;
        this.target = null;
        this.steps.forEach( ( e ) => {
            e.resetStep( );
            e.deActivate( this.owner );
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

    isDone( battleSprite ) {
        switch( this.type ) {
            case "MOVE" :
                if ( battleSprite.inMovementAnimation ) {
                    return false;
                }
                break;
            case "ANIM" :
                if ( battleSprite.moving ) {
                    return false;
                }
                break;
            case "SHOUT" :
                break;
            default :
                console.log("animationType " + this.type + " is not valid");
        }

        return true;
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

        console.log('setting destination')
        console.log(this.destination)
        console.log('______________')
    }

    setTarget( target, owner ) {
        this.target = target
        console.log('new target for animationStep')
        console.log(this.target)
        console.log('______________')
        if ( this.type == "MOVE" ) {
            this.setDestination( target, owner )
        } 
    }

    deActivate( character ) {
        if ( this.effects ) {
            character.sprite.effectsActive = false;
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
                console.log('________________________')
                character.setDestinationAndStartWalking( this.destination, this.isPlayer ? 4 : 5 )
                break;
            case "ANIM" :
                console.log('ANIM STEP')
                console.log('________________________')
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
            character.sprite.effectsActive = true;
        }
    }
}

module.exports = {
    Move
}