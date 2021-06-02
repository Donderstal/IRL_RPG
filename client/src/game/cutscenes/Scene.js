const globals               = require('../../game-data/globals')

class Scene {
    constructor( data ) {
        this.type   = data.type;
        this.spriteName = data.spriteName;
        this.sfx = ( data.sfx ) ? data.sfx : false;
        this.setAction( data )
    }

    setAction( data ) {
        if ( this.type == "SPEAK" ) {
            this.text = data.text;
        }

        if ( this.type == "MOVE" ) {
            if ( typeof data.destination === 'string' || data.destination instanceof String ) {
                const sprite = this.getSpriteByName( data.destination )                
                data.destination = { 
                    'col': sprite.col, 
                    'row': sprite.row 
                };

                const startingCell = this.getSpriteCell( );
                if ( startingCell.row < data.destination.row ) {
                    data.destination.row -= 1;
                }
                else if ( startingCell.row > data.destination.row ) {
                    data.destination.row += 1;
                }
                else if ( startingCell.col < data.destination.col ) {
                    data.destination.col -= 1;
                }
                else if ( startingCell.col > data.destination.col ) {
                    data.destination.col += 1;
                }
            }

            this.destination = data.destination;
            this.walkingToDestination = true;            
        }

        if ( this.type == "ANIM" ) {
            this.animName = data.animName;
            this.endDirection = ( data.endDirection ) ? globals[data.endDirection] : false;
            this.loop = data.loop;
        }

        this.setAnimToSprite( );
    }

    getSpriteCell( ) {
        const sprite = this.getSpriteByName( )
        return { 'row': sprite.row, 'col': sprite.col }
    }

    setAnimToSprite( ) {
        const sprite = this.getSpriteByName( )
        sprite.setAnimation(this)      
    }

    getSpriteByName( name = this.spriteName ) {
        const spriteArray = name == "Player" ? globals.GAME.PLAYER : globals.GAME.FRONT.allSprites.filter( ( e ) => { return e.name == name;} );
        return name == "Player" ? spriteArray : spriteArray[0];
    }
} 

module.exports = {
    Scene
}