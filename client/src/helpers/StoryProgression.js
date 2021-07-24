const { storyChapters } = require('../resources/storyChapters')
const { eventScripts } = require('../resources/storyAnimationScripts')
const { ScriptedEvent } = require('../game/cutscenes/ScriptedEvent');
const globals = require('../game-data/globals');

class StoryProgression {
    constructor( ) {
        this.activeChapterIndex = 0;
        this.activeSceneIndex   = 0;
        this.activeEventIndex   = 0;

        this.chapters       = [];
        this.chapterScenes  = [];
        this.sceneEvents  = [];

        this.startNewStory( );
    }

    get activeChapter( ) { return this.chapters[this.activeChapterIndex]; }
    get activeScene( ) { return this.chapterScenes[this.activeSceneIndex]; }
    get activeEvent( ) { return this.sceneEvents[this.activeEventIndex]; }
    get activeEventId( ) { return "" + this.activeChapterIndex + "_" + this.activeSceneIndex + "_" + this.activeEventIndex }
    
    startNewStory( ) {
        this.chapters       = storyChapters;
        this.eventScripts   = eventScripts;
        this.activateCurrentChapter( );
        this.getScriptedEventsForMap( globals.GAME.activeMapName )
    }

    activateCurrentChapter( ) {
        this.chapterScenes = this.chapters[this.activeChapterIndex];
        let sceneEventScripts = this.eventScripts[this.activeEventId]; 
        sceneEventScripts.scenes.forEach( ( e, index ) => {
            this.sceneEvents.push( new ScriptedEvent( this.activeScene, e ) )
        } )
    }

    goToNextSceneEvent( ) {
        console.log(this.activeEventId)
        if ( this.activeEventIndex + 1 == this.sceneEvents.length ) {
            this.goToNextScene( )
        }
        else {
            this.activeEventIndex++
        }
    }

    goToNextChapterScene( ) {
        console.log(this.activeEventId)
        if ( this.activeSceneIndex + 1 == this.chapterScenes.length ) {
            this.goToNextChapter( )
        }
        else {
            this.activeSceneIndex++
        }
    }

    goToNextChapter( ) {
        console.log(this.activeEventId)
        this.activeChapterIndex++
        this.activateCurrentChapter( );
    }

    getScriptedEventsForMap( mapName ) {
        globals.GAME.activeMap.scriptedEvents = [];
        this.sceneEvents.forEach( ( e ) => {
            if ( e.mapName == mapName ) {
                globals.GAME.activeMap.scriptedEvents.push( e );
            }
        })
    }
}

module.exports = {
    StoryProgression
}