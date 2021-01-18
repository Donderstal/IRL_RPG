const globals   = require('./globals')
const chapterEvents = require('../resources/eventResources').chapterEvents
const eventScripts = require('../resources/eventScripts').eventScripts

const I_ScriptedEvent = require('../game/interfaces/I_ScriptedEvent').I_ScriptedEvent

const chapters = [
    {
        id: 0,
        scenes: [ 0, 1, 2, 3 ]
    },
    {
        id: 1,
        scenes: [ 0, 1, 2, 3, 4, 5 ]
    },
    {
        id: 2,
        scenes: [ 0, 1, 2, 3, 4, 5 ]
    },
    {
        id: 3,
        scenes: [ 0, 1, 2, 3, 4, 5 ]
    },
    {
        id: 4,
        scenes: [ 0, 1, 2, 3, 4, 5 ]
    },
    {
        id: 5,
        scenes: [ 0, 1, 2, 3, 4, 5 ]
    }
]

const progressStory = ( ) => {
    const currentChapter = globals.GAME.currentChapter;
    if  ( currentChapter.activeScene == currentChapter.scenes.length ) {
        console.log( 'next chapter!' )
        globals.GAME.currentChapter = chapters[currentChapter.id + 1]
        globals.GAME.currentChapter.activeScene = 0 
    }
    else {
        console.log( 'next scene!' )
        globals.GAME.currentChapter.activeScene++
    }
    globals.GAME.currentChapter.scriptedEvents = [];
    chapterEvents[globals.GAME.currentChapter.id][globals.GAME.currentChapter.activeScene].forEach( (e) => {
        globals.GAME.currentChapter.scriptedEvents.push( new I_ScriptedEvent( e, eventScripts[e.scriptId] ) )
    })
    console.log(globals.GAME.currentChapter)
    getScriptedEventsForMap(globals.GAME.activeMapName)
}

const startNewStory = ( ) => {
    globals.GAME.currentChapter = chapters[0];
    globals.GAME.currentChapter.activeScene = 0 
    globals.GAME.currentChapter.scriptedEvents = [];
    chapterEvents[globals.GAME.currentChapter.id][globals.GAME.currentChapter.activeScene].forEach( (e) => {
        globals.GAME.currentChapter.scriptedEvents.push( new I_ScriptedEvent( e, eventScripts[e.scriptId] ) )
    })
    console.log(globals.GAME.currentChapter)
}

const getScriptedEventsForMap = ( mapName ) => {
    globals.GAME.activeMap.scriptedEvents = []

    globals.GAME.currentChapter.scriptedEvents.forEach( (e) => {
        if ( e.mapName == mapName ) {
            globals.GAME.activeMap.scriptedEvents.push( e )
        }
    })

    console.log("Events for current map... ")
    console.log(mapName)
    console.log(globals.GAME.activeMap.scriptedEvents)
}


module.exports = {
    progressStory,
    getScriptedEventsForMap,
    startNewStory 
}