const state = require('../../game-data/state')
const requestModeChange = require('../../game-data/changeMode').requestModeChange

class Cinematic {
    constructor( data ) {
        this.scenes = [];
        data.scenes.forEach( scene => {
            this.scenes.push( new Scene( scene ) );
        } )

        state.activeCinematic = this;
        requestModeChange('CINEMATIC')
        
        console.log(this)
    }
}

class Scene {
    constructor( data ) {
        this.type   = data.type;
        this.spriteName = data.spriteName;
        this.sprite = this.findSpriteByName( )
        if ( this.type == "SPEAK" ) {
            this.text = data.text;
        }
        if ( this.type == "MOVE" ) {
            this.destination = data.destination;
        }
        if ( this.type == "ANIM" ) {
            this.animName = data.animName;
            this.loop = data.loop;
        }
    }

    findSpriteByName( ) {
        state.currentMap.NPCs.forEach( ( NPC ) => {
            if ( this.spriteName == NPC.name ) {
                this.sprite = NPC
            }
        } )
    }
}

module.exports = {
    Cinematic
}