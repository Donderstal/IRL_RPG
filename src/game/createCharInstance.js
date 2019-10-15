const initChar      = require('./character-init/initCharacter')
const initGamePiece = require('./overworld-init/initGamePiece')

module.exports = {
    getCharacter : ( className, name, gender ) => {

        return {
            
            characterState : initChar.getCharWithClass( className, name, gender ),
            characterPiece : initGamePiece.initGamePiece(37, 37, 37)               
        }
     
    }

}