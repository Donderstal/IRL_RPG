const { I_Effect } = require("../game/interfaces/I_Effect");
const { MOVEMENT_SPEED } = require("../game-data/globals");

const scripts = { 
    "FIRE_CIRCLE_FULL": {
        backEffect: { "name": "FIRE_CIRCLE_BACK", "loop": false },
        frontEffect: { "name": "FIRE_CIRCLE_FRONT", "loop": false },
        type: "FRONT_AND_BACK"
    },
    "FIRE_CIRCLE_FRONT": {
        frontEffect: { "name": "FIRE_CIRCLE_FRONT", "loop": false },
        type: "FRONT"
    },
    "FIRE_CIRCLE_BACK": {
        backEffect: { "name": "FIRE_CIRCLE_BACK", "loop": false },
        type: "BACK"
    },
    "FIRE_CIRCLE_MOVING": {
        backEffect: { "name": "FIRE_CIRCLE_BACK", "loop": false },
        frontEffect: { "name": "FIRE_CIRCLE_FRONT", "loop": false },
        type: "MOVING_FRONT_AND_BACK"
    },
    "FIRE_CIRCLE_FRONT_MOVING": {
        frontEffect: { "name": "FIRE_CIRCLE_FRONT", "loop": false },
        type: "MOVING_FRONT"
    },
    "STAR": {
        backEffect: { "name": "STAR", "loop": true },
        type: "BACK"
    },
    "STAR_MOVING" : {
        backEffect: { "name": "STAR", "loop": true },
        type: "MOVING_BACK"
    },
    "BLUE_SQUARE" : {
        backEffect: { "name": "BLUE_SQUARE", "loop": true },
        type: "BLUE_SQUARE"
    },
    "PURPLE_CROSS" : {
        backEffect: { "name": "PURPLE_CROSS", "loop": true },
        type: "PURPLE_CROSS"
    }
}
/**
 * Try to find a prop with given name in the scripts constant and return it.
 * If it can't be found, throw an error
 * @param {String} name 
 */
const getEffectScript = ( name ) => {
    console.log(name)
    try {
        name in scripts;
    }
    catch( error ) {
        throw( error );
    }
    finally {
        return scripts[name];
    }
}

class GraphicalEffect {
    constructor( script ) {
        this.effects = [];
        this.name   = script.name;
        this.front  = false;
        this.back   = false;
    }

    get destinationIsLeft( ) { return this.destinationX < this.x; };
    get destinationIsRight( ) { return this.destinationX > this.x + this.effectWidth; };
    get destinationIsUp( ) { return this.destinationY < this.y; };    
    get destinationIsDown( ) { return this.destinationY > this.y + this.effectHeight; };
    get effectWidth( ) { return this.front ? this.front.width : this.back.width; };
    get effectHeight( ) { return this.front ? this.front.height : this.back.height; };
    get isActive( ) { return ( this.front && this.front.active ) || ( this.back && this.back.active ) }
    /**
     * Set given values to this.x and this.y
     * @param {Number} x 
     * @param {Number} y 
     */
    setXY( x, y ) {
        this.x = x;
        this.y = y;
    }
    /**
     * Call this.setXY with given values. Then, call updateXY for each effect in this.effects
     * @param {Number} x 
     * @param {Number} y 
     */
    updateXY( x, y ) {
        this.setXY( x, y );
        this.effects.forEach( ( effect ) => {
            effect.updateXY( this.x, this.y )
        });
    }
    /**
     * If there is an I_Effect instance in the back prop, call its draw method
     * @param {Number} x 
     * @param {Number} y 
     */
    drawBack( x, y ) {
        if ( this.back ) {
            this.back.draw( x, y )
        }
    }
    /**
     * If there is an I_Effect instance in the front prop, call its draw method
     * @param {Number} x 
     * @param {Number} y 
     */
    drawFront( x, y ) {
        if ( this.front ) {
            this.front.draw( x, y );            
        }
    }
    /**
     * Instantiate a new I_Effect. Assign it to a prop depending on the value of layer and then push it to this.effects
     * @param {String} layer "B" || "F" indicates wether the effect should be assigned to front or back 
     * @param {Object} effectData object from the scripts constant in effectHelpers.js
     */
    initEffect( layer, effectData ) {
        const newEffect = new I_Effect( effectData.name, this.x, this.y )        

        if ( layer == "B" ) {
            this.back = newEffect;
        } 
        else if ( layer == "F" ) {
            this.front = newEffect;
        }
        this.effects.push( newEffect );
    }
    /**
     * If the sprite is not at its' x/y destination, move toward it.
     * If no move is possible, set movingToDestination to false
     */
    goToDestination( ) {
        let moving = false;
        let speed = MOVEMENT_SPEED;

        if ( this.destinationIsLeft  ) {
            moving = true;            
            this.x -= speed;
        }
        else if ( this.destinationIsRight ) {
            moving = true;            
            this.x += speed;
        }
        if ( this.destinationIsUp ) {
            moving = true;
            this.y -= (speed * .33);
        }
        else if ( this.destinationIsDown ) {
            moving = true;
            this.y += (speed * .33);
        }

        if ( !moving ) {
            this.movingToDestination = false;
        }
    }
    /**
     * Set given values to this.destinationX and this.destinationY prop
     * @param {Number} x 
     * @param {Number} y 
     */
    setDestination( x, y ) {
        this.destinationX = x;
        this.destinationY = y;
    }
    /**
     * If movingToDestination, call drawBack and/or drawFront if they are possible.
     * Then, call goToDestination.
     */
    drawAndMove( ) {
        if ( this.movingToDestination ) {
            if ( this.back ) {
                this.drawBack( this.x, this.y )
            }
            if ( this.front ) {
                this.drawFront( this.x, this.y )
            }
            this.goToDestination( );
        }
    }
}

class DoubleLayerEffect extends GraphicalEffect { 
    constructor( script, x, y ) {
        super( script );

        this.initEffect( "B", script.backEffect );
        this.initEffect( "F", script.frontEffect );
        this.updateXY( x, y );
    }
}

class SingleLayerEffect extends GraphicalEffect { 
    constructor( script, x, y, effectLayer ) {
        super( script );

        this.initEffect( effectLayer, effectLayer == "F" ? script.frontEffect : script.backEffect );
        this.updateXY( x, y );
    }
}

class MovingSingleLayerEffect extends SingleLayerEffect {
    constructor( script, x, y, effectLayer, endX, endY ) {
        super( script, x, y, effectLayer );
        this.movingToDestination = true;
        this.setDestination( endX, endY );
    }
}

class MovingDoubleLayerEffect extends DoubleLayerEffect {
    constructor( script, x, y, endX, endY ) {
        super( script, x, y );
        this.movingToDestination = true;
        this.setDestination( endX, endY );
    }
}
/**
 * Get a effectScript object with the given name by calling getEffectScript.
 * Then, instantiatie a appropriate GraphicalEffect extension based on the the script type.
 * @param {String} name 
 * @param {Number} x 
 * @param {Number} y 
 * @param {Number} endX 
 * @param {Number} endY 
 */
const getEffect = ( name, x, y, endX = null, endY = null ) => {
    const script = getEffectScript( name );
    switch( script.type ) {
        case "FRONT":
            return new SingleLayerEffect( script, x, y, "F" );
        case "BACK":
            return new SingleLayerEffect( script, x, y, "B" );
        case "BLUE_SQUARE":
            return new SingleLayerEffect( script, x, y, "B");
        case "PURPLE_CROSS":
            return new SingleLayerEffect( script, x, y, "B");
        case "FRONT_AND_BACK":
            return new DoubleLayerEffect( script, x, y );
        case "MOVING_FRONT":
            return new MovingSingleLayerEffect( script, x, y, "F", endX, endY );
        case "MOVING_BACK":
            return new MovingSingleLayerEffect( script, x, y, "B", endX, endY );
        case "MOVING_FRONT_AND_BACK":
            return new MovingDoubleLayerEffect( script, x, y, endX, endY );
        default:
            console.log("Effecttype " + script.type + " not recognised.");
            console.log(script)
    }
}

module.exports = {
    getEffect
}