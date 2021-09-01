const { STORY_EVENTS } = require('../resources/storyChapters')
const { ScriptedEvent } = require('../game/cutscenes/ScriptedEvent');

class StoryProgression {
    constructor( ) {
        this.activeSceneIndex = 0;
        this.currentStoryEvent = new ScriptedEvent( STORY_EVENTS[this.activeSceneIndex]);
        this.setCurrentScriptedEvent( )
    }

    goToNextStoryScene( ) {
        this.activeSceneIndex++
        this.setCurrentScriptedEvent( )
    }

    setActiveSceneIndex( newIndex ) {
        this.activeSceneIndex = newIndex;
        this.setCurrentScriptedEvent( )
    }

    setCurrentScriptedEvent( ) {
        this.currentStoryEvent = new ScriptedEvent( STORY_EVENTS[this.activeSceneIndex]);
    }
}

module.exports = {
    StoryProgression
}