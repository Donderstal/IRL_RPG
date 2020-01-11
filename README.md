ReadMe last updated on November 9h, 2019

### IRL-RPG

Online RPG Game in Flask, Svelte and HTML5 Canvas

NOTE: as of now the project is mostly experimental. You can download it, but it will only have limited functionalities.

The latest working version of IRL_RPG can be found on the Next branch
When we get to that point, the Master branch will contain the latest stable release

#### INSTALLATION

Clone the repo to a folder on your machine

You will need Python 3. You will also need to install Flask by running ```pip install flask```

Cd to the ```client``` folder
Then run ```npm install```

Wait until all Node packages are installed.

Open a new terminal window and rund ```server.py``` to get the Flask server running
Finally, run ```npm run autobuild``` in the client folder. This will start the svelte compiler and watch for changes

After everything is compiled, you can visit the app on localhost:5000

#### LOG

### JANUARY 10th, 2019
* Improved way of adding blocked XY values
* Collision detection now less restricted to grid squares

### JANUARY 9th, 2020
* Two maps added
* Tweaks to map generation
* Player can now move between maps

### DECEMBER 18th, 2019
* NPCs can now be animated by storing a path in a map JSON

### DECEMBER 15th, 2019
* NPCs no longer disappear after contact with player
* Basic NPC actions
* Basic NPC collision detection

### DECEMBER 14th, 2019
* Experiments with NPC generation
* New stylistic approach to outdoor maps

### NOVEMBER 29th, 2019
* Adding basic doors functionalities. 
* Code reorganization, split some files

### NOVEMBER 28th, 2019
* Improving the GamePiece class to suit NPCs and PCs
* Updated keyboards controls

### NOVEMBER 25th, 2019
* Centralised Canvas functionalities in new helper file

### NOVEMBER 24TH, 2019
* Map borders detection
* Basic collision detection

### NOVEMBER 20th, 2019
* Map generation improvement, added useful xy and col/row logging funtionalities

### NOVEMBER 9th, 2019
* A functioning map generation system based on a tilesheet and a json file

### NOVEMBER 4th, 2019
* Basic server for serving JSON files which contain map information

### OCTOBER 16th, 2019
* User is able to select a class, gender and character name
* Basic controls are present, player can move and 
* Movement is animated with spritesheet
