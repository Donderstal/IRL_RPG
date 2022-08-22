### LOG

#### AUG 21, 2022
* Retry and sidestep policy for pathfinding to avoid sprites getting stuck
* Restored neighbour map loading, fixing some bug in player sprite init
* Restored camerafocus and screenorientation detection

#### AUG 18, 2022
* Restored collision detection
* Integrating collision detection in pathfinding algorithms

#### AUG 15, 2022
* Restored cutscene functionalities

#### AUG 12, 2022
* Controller modules for actions, bubbles, cinematics, doors
* Moved some code around to fix references

#### AUG 8, 2022
* Cleaning code for cars, roads. Implementing models, enums.
* New car pathfinding algorithm. Car movement streamlined with sprite movement.
* Deleting old Car, MapObject, NPC, MapSprite classes

#### AUG, 4, 2022
* Implementing animationmodule and idleanimationModule
* Using SpriteFrame model for all sprite animations

#### JUL 27, 2022
* RandomAnimation and spriteMovement modules

#### JUL 24, 2022
* Basic setup for the new module system
* Implementing hitbox, action, door modules

#### JUL 20, 2022
* Finished javascript-to-typescript translation
* Scrapped distinction between MapObjects and Sprite classes

#### JUL 10, 2022
* Implementing typescript models and enumerables

#### JUL 6, 2022
* Started javascript-to-typescript translation

#### MAY 23, 2022
* Implementing new collision system for cars
* Refactored car pathfinding system

#### MAY 18, 2022
* Major overhaul of collision detection
* Sprite pathfinding based on new collision detection

#### APR 25, 2022
* Added new speaking sound effects

#### APR 24, 2022
* Quest system based on interaction triggers
* Sprites can be set to a map conditionally
* Now transferring active sprites to/from cinematic maps

#### APR 23, 2022
* Updating TypeWriter, new funcs for colored words in text

#### APR 15, 2022
* Added in-cinematic map-switching
* Moved map loading funcs out of Game class
* Various small tweaks to Scenes/Animations

#### MAR 30, 2022
* Cinematic camera focus can snap to and follow different sprites

#### MAR 29, 2022
* Doorcontroller class, door id system

#### MAR 27, 2022
* Tweaking CameraFocus to new landscape orientation

#### MAR 24, 2022
* ScreenOrientation class

#### MAR 23, 2022
* Landscape mode for the game on mobile phones

#### MAR 17, 2022
* Structure with globals and classes for generic menu setup

#### MAR 12, 2022
* Class profile structure for npcs

#### MAR 11, 2022
* Performance improvements, vision box update

#### MAR 6, 2022
* Cleaning up some menu code, globals for menu dimensions

#### MAR 2, 2022
* Refactored party/character to a more lightweight design
* Removing a ton of obsolete code relating to characters and battles

#### FEB 28, 2022
* Cleaning and simplifying equipment and inventory system

#### FEB 27, 2022
* Restored walk-in doors
* Python script for quickly importing neighbourhood from mapmaker

#### FEB 23, 2022
* Basic menu front end and speech bubbles for mobile phones

#### FEB 16, 2022
* Experimental setup for touch controls on mobile phones

#### FEB 12, 2022
* 'Camera' now follows the player around on smaller screens

#### FEB 11, 2022
* Restructured front-end code in a more Svelte way
* Proper account system setup for SPA

#### FEB 10, 2022
* Cookies and sessions for user log in

#### FEB 9, 2022
* Basic front-end reactivity to registration/inlogging errors
* Flask back end for account system, including emails

#### FEB 8, 2022
* Svelte front end for logging, registering, recovering password

#### FEB 7, 2022
* Setting up a Postgres database locally and on server

#### JAN 30, 2022
* Basic new menu designs and classes

#### JAN 25, 2022
* New ( temporary ) load game screen for inputting JSON files
* Functionalities for loading a game from a JSON save file

#### JAN 23, 2022
* Restored Save points on the map
* Refactored saving a game with a new Class

#### JAN 19, 2022
* Added a FrontgridCanvas class with element, for displaying the front tiles
* Added a VisionBox class to the Player sprite, for looking behind the FrontgridCanvas

#### JAN 12, 2022
* Added collectable sprites and a collectable registry

#### JAN 11, 2022
* Registry for story events

#### JAN 9, 2022
* BlockedArea class for non-sprite or tile based collision
* Implemented a Try-Catch pattern for smoother error handling

#### JAN 7, 2022
* Better sprite positioning in talking, move-to animtions

#### JAN 4, 2022
* Doors are now opened with action button
* Restored functionality for ActionSelectors

#### DEC 20, 2021
* Restoring and updating Story event and event registry

#### DEC 20, 2021
* Implementing new car intersection algorithm

#### DEC 8, 2021
* Fixed fatal repathing error that caused the game to crash

#### DEC 1, 2021
* Updating maps, sprite assets

#### NOV 30, 2021
* Implented transparent tiles to walk behind buildings

#### NOV 23, 2021
* Sprites now face toward player when speaking
* Added yes/no interaction speech bubbles

#### NOV 20, 2021
* Reworking Cinematic code to allow simultaneous animations in a Scene

#### NOV 17, 2021
* Fixed some bugs in sprite in-cinematic behavior

#### NOV 13, 2021
* Dynamic speech bubble dimensions, positions and alignment

#### NOV 11, 2021
* Added semi-random interactions to spawned sprites

#### NOV 7, 2021
* SpeechBubble controller class
* Added pixel speechBubbles and emotes

#### NOV 3, 2021
* Removed a ton of old / unused maps
* Removed battle code
* Neighbourhood class for overarching map settings

#### OCT 26, 2021
* Implementing new pathfinding with SpriteState class
* SpriteState class for more consistent state management

#### OCT 24, 2021
* Improved pathfinding algorithm
* Dummy tiles for out-of-grid destinations
* Destination instance for all sprites

#### OCT 21, 2021
* Adding in prototypes of Lennart's new maps
* Solved bugs with angled tiles, non-moving car positioning

#### OCT 20, 2021
* Fixed several bugs in the road and intersection system

#### OCT 19, 2021
* Predetermined car pathing algorithm
* Improving car location detection on intersections

#### OCT 17, 2021
* New and improved car turning system

#### OCT 15, 2021
* Fixed bugs in playing map music and spatial sound

#### OCT 14, 2021
* Functioning pedestrian crossing in Crossing class

#### OCT 12, 2021
* Intersection class for structured priority intersections

#### OCT 10, 2021
* RoadNetwork class for overarching road and intersections funcs
* TileSquare helper class for detecting sprites' location with trigger

#### OCT 9, 2021
* Improving pathfinding performace.
* Priorityqueue based pathfinding algorithm.

#### OCT 7, 2021
* Basic sound effects spatialization using AudioContext

#### OCT 3, 2021
* Pre-loading audio files on Game initialization

#### OCT 1, 2021
* Implementing sprite based doors

#### OCT 1, 2021
* Solved problems with randomly spawned sprites getting stuck
* Updating sprites, tilesheet data and code to new MapMaker map format

#### SEP 8, 2021
* Added random walking npc generation for a more lively city

#### SEP 7, 2021
* Added added new maps in a more urban style

#### SEP 2, 2021
* Added model for saving games as json files

#### SEP 1, 2021
* Refactored story code to less complex design

#### AUG 27, 2021
* Starting map can now be selected
* Implementing TypeWriter in regular speech bubbles

#### AUG 25, 2021
* Improved sprite movement in grid
* Better pathfinding detection of tiles blocked by sprites
* Sprites now handle repathing better when a tile becomes blocked

#### AUG 24, 2021
* Reduced complexity of data flow to set or unset a sprite
* Removed tile-based collision for non-tile sprites
* MapObject sprites now use HitboxGroup instances where possible

#### AUG 19, 2021
* Replaced a lot of strings with globals

#### AUG 15, 2021
* Added a ON_LEAVE & ON_ENTER anim chain for bus travel
* Added new Cinematic scene types: FADE_IN, CREATE_SPRITE, WAIT and more

#### AUG 10, 2021
* Cleaned and fixed various small interaction bugs
* Added an interactive testing map

#### AUG 8, 2021
* In-game restore points
* Added fader class for fade in/out animations

#### AUG 4, 2021
* Added a basic shop menu for buying/selling items

#### JUL 30, 2021
* Added locking / unlocking doors

#### JUL 25, 2021
* Bugfixing new interaction system
* Updated existing interactions

#### JUL 24, 2021
* Moved storyprogression code to a new StoryProgression class

#### JUL 22, 2021
* Implemented ActionSelector class for conditional events

#### JUL 21, 2021
* Now storing map interactions in seperate files

#### JUL 19, 2021
* Splitted long neighbourhood maps into single map files
* Added a loading screen for the game initialization

#### JUL 14, 2021
* Now pre-loading all assets when the game begins

#### JUL 13, 2021
* Fixed various battle UI issues
* Added a proper battle ending with xp count etc.
* Fixed some bugs in characters leveling, experience, stat effects

#### JUL 9, 2021
* Implemented usage of items in Battle mode and Map mode
* Added BattleMenu class to serve as in-battle UI
* Restored battle controls and action selection 

#### JUN 10, 2021
* Added new BattleSprites. Improved setup for fetching sprites based on classnames

#### JUN 6, 2021
* Game can now be started in debug mode and/or no story events mode

#### JUN 5, 2021
* Cinematic instances for all NPC interaction
* Enabled yes/no answers to a NPC question

#### JUN 3, 2021
* Restoring story cutscenes and events

#### MAY 30, 2021
* Fixed various small bugs in map mode

#### MAY 11, 2021
* Adding new map sprite images and resource code

#### MAY 7, 2021
* Utility Counter class to avoid code repetition

#### MAY 5, 2021
* Battle movement of sprites is now smoother and stable
* Streamlined road system. Fixed problems with car turning

#### MAY 3, 2021
* Bugfixing graphical effects code. Making effects available outside of battles
* Restoring battle textbox with new way of dynamically setting text
* Seperate class for car sprites

#### MAY 1, 2021
* Added a class based setup for graphical effects
* Integrating new effects setup in Battle move execution

#### APR 28, 2021
* Added tilesheets with color changes
* Added new sprites with talking animation

#### APR 27, 2021
* Sequential move execution in battles. Replacing dummy damage code with real moves
* New StatBar class for showing the active value of a character stat

#### APR 24, 2021
* BattleSprite class.
* Improving BattlePhase structure. Ordering chars on speed in move phase

#### APR 13, 2021
* Battle sprite animation and pathfinding in grid system

#### APR 8, 2021
* Reintroducting battle class, battle controls and battle phases.

#### APR 6, 2021
* Basic switching in/out of battles in the grid system

#### APR 4, 2021
* Move system based on new attributes

#### APR 2, 2021
* Adding functionalities to Members and Inventory tab
* Cleaning up the menucode, created some new utility functions

#### MAR 29, 2021
* Expanding Status menutab 
* Adding equipment functionalities tot Status tab

#### MAR 26, 2021
* Seperating MenuControls to another file. Storing Menu code in a class

#### MAR 25, 2021
* Using StatusEffects for equipped items so it affects a characters' attribute values

#### MAR 22, 2021
* Implementing new stat system based on CharacterAttributes and Attribute classes
* Setting up a basic but functional system for registering status effects

#### MAR 17, 2021
* Scrapping unused code and storing it on the Junk-Code branch for now

#### MAR 10, 2021
* Submenu for option selection in menu and modals

#### MAR 3, 2021
* Added modal Class for usage in menu

#### FEB 28, 2021
* Adding tabs and selectable buttons to in-game menu

#### FEB 28, 2021
* New classes for Item, Inventory
* Basic setup for an in-game menu

#### FEB 26, 2021
* New Party setup

#### FEB 17, 2021
* Minor bugfixes to animation
* New maps for showcasing animation funcs

#### FEB 14, 2021
* Implementing new pathfinding algorithm
* Semi-random NPC movement and animations
* New NPC types for generating different anims/movements

#### FEB 2, 2021
* Streamlining NPC movement and removing duplicate code

#### JAN 29, 2021
* Replacing I_Sound with new SoundController Class

#### JAN 19, 2021
* General code cleanup

#### JAN 18, 2021
* Removing state file and associated imports
* Cleaning up helpers files, removing obsolete funcs
* Cleaning up I_Sprite code. Adding new sprites

#### JAN 17, 2021
* Adding some shorthands + getters to Game class
* Now importing globals as vars instead of props

#### JAN 16, 2021
* Fixed inconsistencies in active tile logging

#### JAN 15, 2021
* Improving car collission with HitboxGroup
* Fixing intersections and end of road detection

#### JAN 10, 2021
* Added collision detection for cars
* HitboxGroup class for large MapObjects

#### JAN 7, 2021
* Adding basic animations for car sprites
* Adding basic animations for pigeon sprites
* Added a new part to the first neighbourhood

#### JAN 5, 2021
* Fixing bug in map-to-map travel
* Restored bus functionality with action confirm method

#### DEC 30, 2020
* Replacing some menu contents with dummy text

#### DEC 28, 2020
* Cleaning old map system code
* New file structure for map classes

#### DEC 27, 2020
* New sprite-based collision detection for player and NPCs
* Fixed collision bugs in characters. Collision is now consistent
* NPC movement now reacts to environment changes
* E.g. they stop walking if you cross their path

#### DEC 11, 2020
* Solved bug that made it possible for player to enter blocked tiles
* Fixed positioning problems
* Restored proper border collision 

#### DEC 10, 2020
* New Game class which wraps both Canvas classes
* Fixed doors, neighbours
* Fixed positioning calc bug

#### DEC 7, 2020,
* New data structure for game canvases imported from mapmaker tool
* Foreground and Background classes extend I_CanvasWithGrid
* Grid is now initialized with I_Grid and I_Tile classes
* Basic interactivity in new system

#### SEP 25
* Added a 'master room' with all sprites in the game

#### SEP 17
* Added 'letterbox' perspective to cinematics

#### SEP 14, 2020
* Scrapping redundant code
* Removing unused imports and exports

#### SEP 3, 2020
* Readded collision detection for map tiles
* Added Sam's new map design

#### SEP 3, 2020
* Adding basic special effects in battles
* Updating some ui elements
* Consistent setup with spacebar and z as controls

#### AUG 28, 2020
* New system for battle moves and animations
* New classes Move, AnimationStep
* New moveAnimations file for storing Move data

#### AUG 17, 2020
* Battle code cleanup and reorganization
* Expanding battleGlobals file

#### AUG 7, 2020
* New Battle class is instantiated on each battle
* New battleStaging state prop
* Adding some getters to UiWrapper and Battle Class

#### AUG 6, 2020
* Grouping all UI elements in BattleUIWrapper
* Improving scrolling through parties for target & move selection
* Fixed detection of active / defeated characters

#### AUG 2, 2020
* Refactoring attacks, now based on new attr system
* Dynamic stat bars now react to HP/AP changes
* Restoring mechanics for defeating characters and parties

#### JUL 29, 2020
* Cleaned up some regression bugs in battle code
* Implementing Barts ideas for the battle menu
* Restoring battle turn structure

#### JUL 26, 2020
* Removing old move selection
* New battleMenu class for all menu logic
* Improved look of battle ui and menus

#### JUL 25, 2020
* Setting up a new system for characters stats
* New Attributes class for use in characters
* New Tilesheet for first neighbourhood

#### JUL 13, 2020
* Restored some battle functionalities with new look
* New spritesheets for battles
* New setup for doing animations in a battle

#### JUN 29, 2020
* Added new maps for Downtown neighbourhood
* Adding a Bus stop for travel between neighbourhoods

#### JUN 28, 2020
* Adding music to main menu, sfx to cinematics
* Added animated sprites to main menu

#### JUN 26, 2020
* Implementing new front-end designs
* New front end with a proper Svelte set up
* Connecting new Front end inputs to game, updating StartGame funcs

#### JUN 24, 2020
* Added Cinematic and Scene Classes
* Scripted gameplay based on scripted event triggers
* Adjusting controllers and animationcontrollers to cinematic mode
* Added Xy pathfinding for Sprites in cinematics

#### JUN 15, 2020
* Added some new maps, a new tilesheet
* Adding MapObject class for non-player sprites on map

#### JUN 14, 2020
* Reordering some sprite animation functionalities
* Making some Sprite funcs more generic for use in cinematics

#### JUN 2, 2020
* Moving map & sheet data to client JS to reduce HTTP requests
* Cleaning up some NPCs from maps
* Adding a new Robot sprite

#### JUN 1, 2020,
* Experimental setup for story progression
* Added scripted events tied to story state
* Experimenting with triggering scripted events

#### MAY 18, 2020
* All Tilesheet are now updated
* Small fixes to collision detection
* Cleaning old NPC funcs

#### MAY 18, 2020
* Adjusted to new base size of tiles and sprites
* Added new tilesheets and spritesheets

#### MAY 17, 2020
* Improvied I_Hitbox implementation
* New class-based setup for blocked xy values in map

#### MAY 16, 2020
* Hitbox Class for collision and action detection on map
* Improving NPC Class
* Implementing Hitbox for Actions, NPCs, Player

#### MAY 14, 2020
* New setup with consistent FPS based on timestamps
* Significant improvement of stability and performance

#### MAY 13, 2020
* Seperated storage of map and tilesheet data

#### MAY 11, 2020
* New interface for textboxes in game
* Improved dynamic textbox sizing
* Removing the awfully complex old speechbubble code

#### MAY 4, 2020
* Dynamic globals based on screen height allow for responsive sizing
* Rearranging the main UI buttons
* Rudimentary touch controls

#### MAY 2, 2020
* New Party setup in battles now works properly
* Attacks are now executed in order based on ATH
* Move selection for multiple player chars

#### APR 28, 2020
* Experimental storing and retrieving of battle attacks and animations
* Experimental setup for a PartyvParty battle instead of 1v1
* Character attibutes and stats restructured

#### APR 23, 2020
* New system for selecting a move in Battle
* New 'wrapper' class for BattleSprite, BattleStats etc
* Removing some old character Gen code

#### APR 20, 2020
* Checking and cleaning old code in map
* New map sprites ( looking sharp!! )

#### APR 18, 2020
* New Start menu
* Adding 'debug mode' to game
* Reducing frequency of some func calls by requestAnimationFrame()

#### APR 8, 2020
* Battle shouts
* Cleaning up some battle code

#### APR 3, 2020
* Battle phase system is now functioning
* Added battle map, battle sprites and adjusted code to them
* Working on displaying text in container dynamically per phase

#### APR 2, 2020
* Cleaning up some leftover crud and console logs
* Finally cleared all circular dependencies 
* Experimental setup for battle phases

#### APR 1, 2020
* Improving new setup with controllers
* Moving some funcs from modules to respective controllers
* New modeChangeRequest helper for switching modes
* Updating animationController to new setup

#### MAR 31, 2020
* Experimenting with a resourcestring-like file
* Seperating 'controls' from 'controllers'

#### MAR 15, 2020
* Experimental moves and animations for Battle sprites
* Added gameController, which should be the location for starting or switching modes
* Moving battleText container Class to seperate file

#### MAR 10, 2020
* New folder structure
* Adding interfaces for sound, sprites (more will follow)
* Restructuring existing classes around new interfaces

#### MAR 8, 2020
* Added textContainer class, which will display battle Text
* Experimenting with filling up textContainer dynamically

#### MAR 7, 2020
* Added UI-buttons for player in battle
* Buttons are selectable and react to user input

#### MAR 5, 2020
* Animation and SFX for start and end of battles
* Added battlePiece class for battle sprites
* Added new Pixelart style font

#### MAR 4, 2020
* Added 'battle mode'
* Transitioning in and out of battles works

#### MAR 3, 2020
* Added 4 maps that make up the first level
* Reorganizing how maps are stored
* Adding improved generic tilesheet

#### FEB 25, 2020
* Loading and saving of games
* Games are now saved/loaded to/from the user's pc
* This is a temporary setup to postpone making user accounts etc.

#### FEB 20, 2020
* New text displaying functionalities
* Dynamic speech bubbles (Alpha)
* Cleaning up some redundant code and assets

#### FEB 16, 2020
* Removing old Svelte files and some old UI stuff

#### FEB 15, 2020
* Some changes to how the game is started, to support saved games in the future
* Rescaling the game to a larger size
* Cleaned up and improved the website UI and looks

#### FEB 12, 2020
* New helper file that stores action detection functionalities
* Fixing some bugs in the new action system

#### JAN 30, 2020
* Actions and Doors are now XY based instead of row/col based

#### JAN 21, 2020
* Added improved sprites sprites
* Recorded some try out sound effects
* Adding sound effects to actions

#### JAN 12, 2020
* Added some music
* New music playing functionalities
* Tweaking how NPC's and PC's are cleared and redrawn

#### JAN 10, 2019
* Improved way of adding blocked XY values, so blocked Xy values are not always squares
* Collision detection now less restricted to grid squares

#### JAN 9, 2020
* Two maps added
* Tweaks to map generation
* Player can now move between maps

#### DEC 18, 2019
* NPCs can now be animated by storing a path in a map JSON

#### DEC 15, 2019
* NPCs no longer disappear after contact with player
* Basic NPC actions
* Basic NPC collision detection

#### DEC 14, 2019
* Experiments with NPC generation
* New stylistic approach to outdoor maps

#### NOV 29, 2019
* Adding basic doors functionalities. 
* Code reorganization, split some files

#### NOV 28, 2019
* Improving the GamePiece class to suit NPCs and PCs
* Updated keyboards controls

#### NOV 25, 2019
* Centralised Canvas functionalities in new helper file

#### NOV 24, 2019
* Map borders detection
* Basic collision detection

#### NOV 20, 2019
* Map generation improvement, added useful xy and col/row logging funtionalities

#### NOV 9, 2019
* A functioning map generation system based on a tilesheet and a json file

#### NOV 4, 2019
* Basic server for serving JSON files which contain map information

#### OCT 19, 2019
* Introduced GamePiece class, which will be assigned to all characters

#### OCT 16, 2019
* User is able to select a class, gender and character name
* Basic controls are present, player can move and 
* Movement is animated with spritesheet