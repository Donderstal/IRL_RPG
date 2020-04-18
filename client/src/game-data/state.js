module.exports = {
    overworldMode : true,
    battleMode : false,
    cinematicMode : false,
    paused : false,
    listeningForPress : false,
    changeRequest : "NO",
    pressedKeys: { },
    currentMap : {
        map		: true,
        mapData : {}
    },
    battleState 	: {
        player  : {
            hasTurn : false
        },
        opponent   : {
            hasTurn : false
        },
        battlePhase : null
    },
    playerCharacter : {},
    debug : { 
        map: false,
        battle: false
    }
}
