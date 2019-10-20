Readme last updated on October 20th, 2019

### IRL-RPG

RPG Game in Node.js, Svelte and HTML5 Canvas

#### INSTALLATION
NOTE: as of now the project is mostly experimental. You can download it, but it will only have limited functionalities.
The latest working version of IRL_RPG can be found on the Next branch
When we get to that point, the Master branch will contain the latest stable release

Clone the repo to a folder on your machine
Run ```
cd /path/to/IRL_RPG```
Then run ```
npm install```

Wait until all Node packages are installed.

Then run ```
NPM run dev```

This will compile the Javascript and assets
After everything is compiled, you can visit the app on localhost:5000

#### FEATURES
As of October 20th, 2019
* User is able to select a class, gender and character gender
* Basic wasd controls are present
* Player character can move and movement is animated
* A basic background is render
* PlayerCharacter object is added to gameState after initialization

#### DOCUMENTATION

*Basic Setup*
All game logic is handled seperately from the front end code.
All actual front-end code and direct user interaction will be handled by the Svelte files
There are two canvases: the background canvas contains the overworld and background, the front canvas contains the characters

*GfxContainer.svelte*
This file is the container of both canvases. Keyboard input is also registered here. The game is started by the ```startGame``` function in this file, which is called when the user clicks the Start Game button.

Donderstal
