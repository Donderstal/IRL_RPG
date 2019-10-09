const initChar      = require('./character-init/initCharacter')
const initGamePiece = require('./overworld-init/initGamePiece')

module.exports = {
    getCharacter : ( className, name, gender ) => {

        
        console.log(initGamePiece.initGamePiece( 37, 37, 37, 'player'))
        console.log(initChar.getCharWithClass( className, name, gender ))


        return {
            
            characterState : initChar.getCharWithClass( className, name, gender ),
            characterPiece : initGamePiece.initGamePiece(37, 37, 37)               
        }
     
    }

}