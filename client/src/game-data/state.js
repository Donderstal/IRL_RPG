module.exports = {
    overworldMode : true,
    battleMode : false,
    cinematicMode : false,
    paused : false,
    activeCinematic : null,
    listeningForPress : false,
    changeRequest : "NO",
    pressedKeys: { },
    currentMap : {
        map		: true,
        mapData : {}
    },
    battleState 	: {
        player  : {
        },
        opponent   : {
        },
        battlePhase : null
    },
    battleStaging : {
        player              : [],
        opponent            : [],
        requestingBattle    : false
    },
    playerCharacter : {},
    debug : { 
        map: false,
        battle: false
    },
    blocked: []
}
