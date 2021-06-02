  
const globals   = require('./globals')
const { chapterEvents } = require('../resources/eventResources')
const { eventScripts } = require('../resources/eventScripts')
const { ScriptedEvent } = require('../game/cutscenes/ScriptedEvent');

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
    let currentChapter = globals.GAME.currentChapter;
    if  ( currentChapter.activeScene == currentChapter.scenes.length ) {
        console.log( 'next chapter!' )
        currentChapter = chapters[currentChapter.id + 1]
        currentChapter.activeScene = 0 
    }
    else {
        console.log( 'next scene!' )
        currentChapter.activeScene++
    }
    currentChapter.scriptedEvents = [];
    chapterEvents[currentChapter.id][currentChapter.activeScene].forEach( (e) => {
        globals.GAME.currentChapter.scriptedEvents.push( new ScriptedEvent( e, eventScripts[e.scriptId] ) )
    })
    console.log(currentChapter)
    getScriptedEventsForMap(globals.GAME.activeMapName)
}

const startNewStory = ( ) => {
    globals.GAME.currentChapter = chapters[0];
    let currentChapter = globals.GAME.currentChapter;
    currentChapter.activeScene = 0 
    currentChapter.scriptedEvents = [];
    chapterEvents[currentChapter.id][currentChapter.activeScene].forEach( (e) => {
        currentChapter.scriptedEvents.push( new ScriptedEvent( e, eventScripts[e.scriptId] ) )
    })
    console.log(currentChapter)
}

const getScriptedEventsForMap = ( mapName ) => {
    let currentChapter = globals.GAME.currentChapter;
    globals.GAME.activeMap.scriptedEvents = []

    currentChapter.scriptedEvents.forEach( (e) => {
        if ( e.mapName == mapName ) {
            globals.GAME.activeMap.scriptedEvents.push( e )
        }
    })

    console.log("Events for current map... ")
    console.log(mapName)
    console.log(globals.GAME.currentChapter)
    console.log(globals.GAME.activeMap.scriptedEvents)
}


module.exports = {
    progressStory,
    getScriptedEventsForMap,
    startNewStory 
}