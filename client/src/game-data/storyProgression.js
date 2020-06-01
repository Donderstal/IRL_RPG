const state = require('./state')
const chapterEvents = require('./eventResources').chapterEvents
const eventScripts = require('./eventScripts').eventScripts

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
    const currentChapter = state.currentChapter;
    if  ( currentChapter.activeScene == currentChapter.scenes.length ) {
        console.log( 'next chapter!' )
        state.currentChapter = chapters[currentChapter.id + 1]
        state.currentChapter.activeScene = 0 
    }
    else {
        console.log( 'next scene!' )
        state.currentChapter.activeScene++
    }
    state.currentChapter.scriptedEvents = [];
    chapterEvents[state.currentChapter.id][state.currentChapter.activeScene].forEach( (e) => {
        state.currentChapter.scriptedEvents.push( new I_ScriptedEvent( e, eventScripts[e.scriptId] ) )
    })
    console.log(state.currentChapter)
    getScriptedEventsForMap(state.currentMap.mapData.mapName)
}

const startNewStory = ( ) => {
    state.currentChapter = chapters[0];
    state.currentChapter.activeScene = 0 
    state.currentChapter.scriptedEvents = [];
    chapterEvents[state.currentChapter.id][state.currentChapter.activeScene].forEach( (e) => {
        state.currentChapter.scriptedEvents.push( new I_ScriptedEvent( e, eventScripts[e.scriptId] ) )
    })
    console.log(state.currentChapter)
}

const getScriptedEventsForMap = ( mapName ) => {
    state.currentMap.scriptedEvents = []

    state.currentChapter.scriptedEvents.forEach( (e) => {
        if ( e.mapName == mapName ) {
            state.currentMap.scriptedEvents.push( e )
        }
    })

    console.log("Events for current map... ")
    console.log(mapName)
    console.log(state.currentMap.scriptedEvents)
}


module.exports = {
    progressStory,
    getScriptedEventsForMap,
    startNewStory 
}