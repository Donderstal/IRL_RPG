import { Effect } from "../game/core/Effect";
import { MOVEMENT_SPEED } from "../game-data/globals";
import { EffectLayerEnum } from "../enumerables/EffectLayerEnum";
import { EffectScriptTypes } from "../enumerables/EffectScriptTypes";

const scripts = { 
    "FIRE_CIRCLE_FULL": {
        backEffect: { "name": "FIRE_CIRCLE_BACK", "loop": false },
        frontEffect: { "name": "FIRE_CIRCLE_FRONT", "loop": false },
        type: EffectScriptTypes.frontAndBack
    },
    "FIRE_CIRCLE_FRONT": {
        frontEffect: { "name": "FIRE_CIRCLE_FRONT", "loop": false },
        type: EffectScriptTypes.front
    },
    "FIRE_CIRCLE_BACK": {
        backEffect: { "name": "FIRE_CIRCLE_BACK", "loop": false },
        type: EffectScriptTypes.back
    },
    "FIRE_CIRCLE_MOVING": {
        backEffect: { "name": "FIRE_CIRCLE_BACK", "loop": false },
        frontEffect: { "name": "FIRE_CIRCLE_FRONT", "loop": false },
        type: EffectScriptTypes.movingBackAndFront
    },
    "FIRE_CIRCLE_FRONT_MOVING": {
        frontEffect: { "name": "FIRE_CIRCLE_FRONT", "loop": false },
        type: EffectScriptTypes.movingFront
    },
    "STAR": {
        backEffect: { "name": "STAR", "loop": true },
        type: EffectScriptTypes.back
    },
    "STAR_MOVING" : {
        backEffect: { "name": "STAR", "loop": true },
        type: EffectScriptTypes.back
    },
    "BLUE_SQUARE" : {
        backEffect: { "name": "BLUE_SQUARE", "loop": true },
        type: EffectScriptTypes.blueSquare
    },
    "PURPLE_CROSS" : {
        backEffect: { "name": "PURPLE_CROSS", "loop": true },
        type: EffectScriptTypes.purpleCross
    }
}

const getEffectScript = ( name: string ): { backEffect; frontEffect; type: EffectScriptTypes } => {
    if ( name in scripts ) {
        return scripts[name];
    }
    else {
        return null;
    }

}

export class GraphicalEffect {
    name: string;
    front: Effect;
    back: Effect;
    effects: Effect[];

    x: number;
    y: number;
    destinationX: number;
    destinationY: number;
    movingToDestination: boolean;
    constructor( script ) {
        this.effects = [];
        this.name   = script.name;
        this.front  = null;
        this.back   = null;
    }

    get destinationIsLeft( ): boolean { return this.destinationX < this.x; };
    get destinationIsRight(): boolean { return this.destinationX > this.x + this.effectWidth; };
    get destinationIsUp(): boolean { return this.destinationY < this.y; };    
    get destinationIsDown(): boolean { return this.destinationY > this.y + this.effectHeight; };
    get effectWidth(): number { return this.front ? this.front.width : this.back.width; };
    get effectHeight(): number { return this.front ? this.front.height : this.back.height; };
    get isActive(): boolean { return ( this.front && this.front.active ) || ( this.back && this.back.active ) }

    setXY( x: number, y: number ): void {
        this.x = x;
        this.y = y;
    }

    updateXY( x: number, y: number ): void {
        this.setXY( x, y );
        this.effects.forEach( ( effect ) => {
            effect.updateXY( this.x, this.y )
        });
    }

    drawBack( x: number, y: number ): void {
        if ( this.back ) {
            this.back.draw( x, y )
        }
    }

    drawFront( x: number, y: number ): void {
        if ( this.front ) {
            this.front.draw( x, y );            
        }
    }

    initEffect( layer, effectData ) {
        const newEffect = new Effect( effectData.name, this.x, this.y )        

        if ( layer === EffectLayerEnum.back ) {
            this.back = newEffect;
        } 
        else if ( layer === EffectLayerEnum.front ) {
            this.front = newEffect;
        }
        this.effects.push( newEffect );
    }

    goToDestination( ): void {
        let moving = false;
        const speed = MOVEMENT_SPEED;

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

    setDestination( x: number, y: number ): void{
        this.destinationX = x;
        this.destinationY = y;
    }

    drawAndMove( ): void {
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

        this.initEffect( EffectLayerEnum.back, script.backEffect );
        this.initEffect( EffectLayerEnum.front, script.frontEffect );
        this.updateXY( x, y );
    }
}

class SingleLayerEffect extends GraphicalEffect { 
    constructor( script, x, y, effectLayer ) {
        super( script );

        this.initEffect( effectLayer, effectLayer === EffectLayerEnum.front ? script.frontEffect : script.backEffect );
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

export const getEffect = ( name: string, x: number, y: number, endX: number = null, endY: number = null ): GraphicalEffect => {
    const script = getEffectScript( name );
    switch( script.type ) {
        case EffectScriptTypes.front:
            return new SingleLayerEffect( script, x, y, EffectLayerEnum.front );
        case EffectScriptTypes.back:
            return new SingleLayerEffect( script, x, y, EffectLayerEnum.back );
        case EffectScriptTypes.blueSquare:
            return new SingleLayerEffect( script, x, y, EffectLayerEnum.back);
        case EffectScriptTypes.purpleCross:
            return new SingleLayerEffect( script, x, y, EffectLayerEnum.back);
        case EffectScriptTypes.frontAndBack:
            return new DoubleLayerEffect( script, x, y );
        case EffectScriptTypes.movingFront:
            return new MovingSingleLayerEffect( script, x, y, EffectLayerEnum.front, endX, endY );
        case EffectScriptTypes.movingBack:
            return new MovingSingleLayerEffect( script, x, y, EffectLayerEnum.back, endX, endY );
        case EffectScriptTypes.movingBackAndFront:
            return new MovingDoubleLayerEffect( script, x, y, endX, endY );
    }
}