Browser RPG Game in Flask, Svelte and HTML5 Canvas
The latest working version of IRL_RPG can be found on the Next branch
When we get to that point, the Master branch will contain the latest stable release

#### INSTALLATION

Clone the repo to a folder on your machine

You will need Python 3. You will also need to install Flask by running ```pip install flask```

Cd to the ```client``` folder
Then run ```npm install```

Wait until all Node packages are installed.

Open a new terminal window and run ```server.py``` to get the Flask server running. This will serve the game on localhost:5000

### LOG

#### JUL 29, 2020
* Cleaned up some regression bugs in battle code
* Implementing Barts idea's for the battle menu
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
